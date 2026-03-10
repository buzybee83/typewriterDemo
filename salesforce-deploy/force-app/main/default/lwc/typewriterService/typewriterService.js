/**
 * TypewriterService - Manages typewriter animation for streaming text content
 * Copied from: runtime_copilot_base/common/typewriterService.js
 *
 * Receives delta chunks (phrases/sentences) and animates them character-by-character.
 *
 * ACCURACY NOTE: This POC has been aligned to match production behavior exactly.
 *
 * Changes made to match production (Feb 2026):
 * - Unified CHARS_PER_FRAME (removed separate TEXT/MARKDOWN constants)
 * - Removed markdown-aware 2x speed multipliers in adaptive logic
 * - Changed FRAME_DELAY_MS from 40ms to 35ms to match production
 * - All content types now animate at same speed (1/3/4/5 chars/frame)
 *
 * POC-specific enhancements (not in production):
 * - getQueueStats() method for visualization
 * - updateConfig() method for runtime configuration
 *
 * Potential future production enhancements (removed from POC):
 * - Markdown-aware adaptive speeds: Using 2x speed (6/8 chars/frame) for markdown
 *   at medium/high queue states reduced markdown parsing overhead. Consider if
 *   markdown rendering performance becomes an issue.
 */
export class TypewriterService {
    _queue = [];
    _currentChunk = '';
    _charIndex = 0;
    _displayedText = '';
    _animationFrameId = null;
    _onUpdate = null;
    _onCursorChange = null;
    _isDestroyed = false;
    _startTime = 0;
    _isMarkdown = false;
    _cursorVisible = false;
    _idleTimerId = null;
    _rushMode = false;
    _rushCharsPerFrame = 0;

    static IDLE_CURSOR_TIMEOUT_MS = 1500;
    static CONFIG = {
        // Base animation speed: chars per frame at normal speed
        // NOTE: POC originally had separate TEXT/MARKDOWN speeds with markdown 2x faster
        // at medium/high thresholds. Removed to match production behavior.
        // See _getCharsPerFrame() comments for details.
        CHARS_PER_FRAME: 1,
        CHARS_PER_FRAME_MEDIUM: 3,
        CHARS_PER_FRAME_HIGH: 4,
        CHARS_PER_FRAME_CATCHING_UP: 5,
        QUEUE_THRESHOLD_MEDIUM: 45,
        QUEUE_THRESHOLD_HIGH: 80,
        QUEUE_THRESHOLD_CRITICAL: 120,
        MAX_ANIMATION_TIME_MS: 15000,
        FRAME_DELAY_MS: 35  // Production value (was 40ms in original POC)
    };

    constructor(onUpdate, options = {}) {
        this._onUpdate = onUpdate;
        this._isMarkdown = options.isMarkdown || false;
        this._onCursorChange = options.onCursorChange || null;
    }

    _setCursorVisible(visible) {
        if (this._cursorVisible === visible) return;
        this._cursorVisible = visible;
        try {
            if (this._onCursorChange) this._onCursorChange(visible);
        } catch (e) {
            console.error('TypewriterService: Error in onCursorChange', e);
        }
    }

    addChunk(deltaText) {
        if (this._isDestroyed || !deltaText) return;
        this._queue.push(deltaText);
        this._cancelIdleTimer();
        if (!this._animationFrameId) {
            this._startTime = Date.now();
            this._setCursorVisible(true);
            this._animate();
        }
    }

    _animate() {
        if (this._isDestroyed) return;
        if (Date.now() - this._startTime > TypewriterService.CONFIG.MAX_ANIMATION_TIME_MS) {
            this.skipToEnd();
            return;
        }
        if (this._charIndex >= this._currentChunk.length) {
            if (this._queue.length === 0) {
                this._animationFrameId = null;
                this._startIdleTimer();
                return;
            }
            this._currentChunk = this._queue.shift();
            this._charIndex = 0;
        }
        const charsToAdd = this._getCharsPerFrame();
        const endIndex = Math.min(this._charIndex + charsToAdd, this._currentChunk.length);
        const newChars = this._currentChunk.slice(this._charIndex, endIndex);
        this._charIndex = endIndex;
        this._displayedText += newChars;
        try {
            this._onUpdate(this._displayedText);
        } catch (e) {
            console.error('TypewriterService: Error in onUpdate', e);
        }
        const { FRAME_DELAY_MS } = TypewriterService.CONFIG;
        if (!this._rushMode && FRAME_DELAY_MS > 0) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            this._animationFrameId = setTimeout(() => this._animate(), FRAME_DELAY_MS);
        } else {
            this._animationFrameId = requestAnimationFrame(() => this._animate());
        }
    }

    _getCharsPerFrame() {
        if (this._rushMode && this._rushCharsPerFrame) return this._rushCharsPerFrame;

        const { CONFIG } = TypewriterService;
        const queuedChars = this._queue.reduce((sum, chunk) => sum + chunk.length, 0);
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const totalPending = queuedChars + remainingInCurrent;

        // Adaptive speed based on how far behind animation is
        if (totalPending > CONFIG.QUEUE_THRESHOLD_CRITICAL) {
            return CONFIG.CHARS_PER_FRAME_CATCHING_UP;
        }
        if (totalPending > CONFIG.QUEUE_THRESHOLD_HIGH) {
            return CONFIG.CHARS_PER_FRAME_HIGH;
            // POC NOTE: Originally returned markdown-aware speeds:
            //   return this._isMarkdown ? 8 : 4;
            // Rationale: Markdown parsing is expensive, so 2x speed reduces parse operations.
            // Removed to match production. Consider re-adding if markdown performance is issue.
        }
        if (totalPending > CONFIG.QUEUE_THRESHOLD_MEDIUM) {
            return CONFIG.CHARS_PER_FRAME_MEDIUM;
            // POC NOTE: Originally returned markdown-aware speeds:
            //   return this._isMarkdown ? 6 : 3;
            // Same rationale as above. Production treats all content uniformly.
        }

        // Base speed - consistent for all content types
        return CONFIG.CHARS_PER_FRAME;
    }

    _cancelAnimation() {
        if (this._animationFrameId) {
            const { FRAME_DELAY_MS } = TypewriterService.CONFIG;
            if (FRAME_DELAY_MS > 0) clearTimeout(this._animationFrameId);
            else cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
    }

    _startIdleTimer() {
        this._cancelIdleTimer();
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this._idleTimerId = setTimeout(() => {
            this._idleTimerId = null;
            if (!this._animationFrameId && this._cursorVisible) {
                this._setCursorVisible(false);
                try {
                    this._onUpdate(this._displayedText);
                } catch (e) {
                    console.error('TypewriterService: Error in idle onUpdate', e);
                }
            }
        }, TypewriterService.IDLE_CURSOR_TIMEOUT_MS);
    }

    _cancelIdleTimer() {
        if (this._idleTimerId) {
            clearTimeout(this._idleTimerId);
            this._idleTimerId = null;
        }
    }

    /**
     * Speed up the animation to finish all remaining content within a time budget.
     * Unlike skipToEnd(), this keeps animating visually — just faster.
     * @param {number} maxMs - Maximum milliseconds to finish (default 5000)
     */
    rushToEnd(maxMs = 5000) {
        if (this._isDestroyed) return;

        // Calculate total remaining characters
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const queuedChars = this._queue.reduce((sum, c) => sum + c.length, 0);
        const totalRemaining = remainingInCurrent + queuedChars;

        if (totalRemaining === 0) {
            this.skipToEnd();
            return;
        }

        // Calculate chars-per-frame needed to finish within the budget.
        // Use a fixed 16ms frame interval (requestAnimationFrame) for smoothness.
        const rushFrameMs = 16;
        const frames = Math.floor(maxMs / rushFrameMs);
        const charsPerFrame = Math.max(1, Math.ceil(totalRemaining / frames));

        // Override the per-frame calculation for the remainder of this animation
        this._rushCharsPerFrame = charsPerFrame;

        // Switch to requestAnimationFrame for smooth rush regardless of current FRAME_DELAY_MS
        this._rushMode = true;

        // If animation was paused (idle), restart it
        if (!this._animationFrameId) {
            this._cancelIdleTimer();
            this._animate();
        }
    }

    skipToEnd() {
        if (this._isDestroyed) return;
        this._cancelAnimation();
        this._cancelIdleTimer();
        this._setCursorVisible(false);
        if (this._currentChunk) this._displayedText += this._currentChunk.slice(this._charIndex);
        this._displayedText += this._queue.join('');
        this._queue = [];
        this._currentChunk = '';
        this._charIndex = 0;
        try {
            this._onUpdate(this._displayedText);
        } catch (e) {
            console.error('TypewriterService: Error in final onUpdate', e);
        }
    }

    getDisplayedText() {
        return this._displayedText;
    }

    isAnimating() {
        return this._animationFrameId !== null;
    }

    hasPendingContent() {
        return this._queue.length > 0 || this._charIndex < this._currentChunk.length;
    }

    getQueueStats() {
        const queuedChars = this._queue.reduce((sum, chunk) => sum + chunk.length, 0);
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const totalPending = queuedChars + remainingInCurrent;
        const currentSpeed = this._getCharsPerFrame();

        return {
            queueLength: this._queue.length,
            queuedChars,
            remainingInCurrent,
            totalPending,
            currentSpeed,
            isAnimating: this._animationFrameId !== null,
            rushMode: this._rushMode
        };
    }

    reset() {
        this._cancelAnimation();
        this._cancelIdleTimer();
        this._setCursorVisible(false);
        this._queue = [];
        this._currentChunk = '';
        this._charIndex = 0;
        this._displayedText = '';
        this._startTime = 0;
        this._rushMode = false;
        this._rushCharsPerFrame = 0;
    }

    destroy() {
        this._isDestroyed = true;
        this._cancelAnimation();
        this._cancelIdleTimer();
        this._setCursorVisible(false);
        this._queue = [];
        this._currentChunk = '';
        this._onUpdate = null;
        this._onCursorChange = null;
    }

    updateConfig(config = {}) {
        if (config.charsPerFrame !== undefined) {
            TypewriterService.CONFIG.CHARS_PER_FRAME_TEXT = config.charsPerFrame;
            TypewriterService.CONFIG.CHARS_PER_FRAME_MARKDOWN = config.charsPerFrame;
        }
        if (config.frameDelayMs !== undefined) {
            TypewriterService.CONFIG.FRAME_DELAY_MS = config.frameDelayMs;
        }
    }
}
