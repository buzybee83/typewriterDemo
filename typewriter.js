/**
 * TypewriterService - Manages typewriter animation for streaming text content
 *
 * Receives delta chunks (phrases/sentences) and animates them character-by-character.
 * Designed to make streaming feel faster by providing immediate visual feedback.
 */
class TypewriterService {
    /** @type {string[]} Queue of delta chunks waiting to be animated */
    _queue = [];

    /** @type {string} Current chunk being animated */
    _currentChunk = '';

    /** @type {number} Character position within current chunk */
    _charIndex = 0;

    /** @type {string} Total text displayed to user so far */
    _displayedText = '';

    /** @type {number|null} Animation frame ID for cleanup */
    _animationFrameId = null;

    /** @type {Function} Callback to update the component with animated text */
    _onUpdate = null;

    /** @type {Function|null} Callback to notify cursor visibility changes */
    _onCursorChange = null;

    /** @type {boolean} Whether the service has been destroyed */
    _isDestroyed = false;

    /** @type {number} Timestamp when animation started (for timeout safety) */
    _startTime = 0;

    /** @type {boolean} Whether this is markdown content (affects animation speed) */
    _isMarkdown = false;

    /** @type {boolean} Current cursor visibility state */
    _cursorVisible = false;

    /** @type {number|null} Idle timer — hides cursor if no new chunk arrives */
    _idleTimerId = null;

    /** @type {boolean} Rush mode flag */
    _rushMode = false;

    /** @type {number} Rush mode chars per frame */
    _rushCharsPerFrame = 0;

    /** How long (ms) to wait after queue empties before hiding cursor */
    static IDLE_CURSOR_TIMEOUT_MS = 1500;

    // Configuration
    static CONFIG = {
        // Plain text: chars per frame at normal speed
        CHARS_PER_FRAME_TEXT: 1,
        // Markdown: higher because each frame triggers a full re-parse + sanitize
        CHARS_PER_FRAME_MARKDOWN: 1,
        // Catching up when queue builds up
        CHARS_PER_FRAME_CATCHING_UP: 5,
        // Queue thresholds for adaptive speed (lower = catches up sooner)
        QUEUE_THRESHOLD_MEDIUM: 45,
        QUEUE_THRESHOLD_HIGH: 80,
        QUEUE_THRESHOLD_CRITICAL: 120,
        MAX_ANIMATION_TIME_MS: 15000, // Safety timeout
        // Delay between frames in ms (>0 = use setTimeout for visible typing)
        FRAME_DELAY_MS: 40
    };

    /**
     * Create a new TypewriterService
     * @param {Function} onUpdate - Callback called with updated text: (displayedText: string) => void
     * @param {Object} options - Configuration options
     * @param {boolean} options.isMarkdown - Whether content is markdown (affects animation speed)
     * @param {Function} options.onCursorChange - Callback for cursor visibility: (visible: boolean) => void
     */
    constructor(onUpdate, options = {}) {
        this._onUpdate = onUpdate;
        this._isMarkdown = options.isMarkdown || false;
        this._onCursorChange = options.onCursorChange || null;
    }

    /**
     * Notify the owning component about cursor visibility change.
     * The component renders/hides the cursor in its own template.
     * @param {boolean} visible - Whether cursor should be visible
     * @private
     */
    _setCursorVisible(visible) {
        if (this._cursorVisible === visible) {
            return;
        }
        this._cursorVisible = visible;
        try {
            if (this._onCursorChange) {
                this._onCursorChange(visible);
            }
        } catch (e) {
            console.error('TypewriterService: Error in onCursorChange callback', e);
        }
    }

    /**
     * Add a delta chunk to the animation queue
     * Called when a new chunk arrives from the stream
     * @param {string} deltaText - The new text chunk to animate
     */
    addChunk(deltaText) {
        if (this._isDestroyed || !deltaText) return;

        this._queue.push(deltaText);

        // Cancel idle timer — new content arrived
        this._cancelIdleTimer();

        // Start animating if not already running
        if (!this._animationFrameId) {
            this._startTime = Date.now();
            this._setCursorVisible(true);
            this._animate();
        }
    }

    /**
     * Main animation loop - reveals characters from the queue
     * Uses requestAnimationFrame for smooth 60fps animation
     * @private
     */
    _animate() {
        if (this._isDestroyed) return;

        // Safety timeout - if animation runs too long, skip to end
        if (Date.now() - this._startTime > TypewriterService.CONFIG.MAX_ANIMATION_TIME_MS) {
            console.warn('TypewriterService: Animation timeout, skipping to end');
            this.skipToEnd();
            return;
        }

        // If current chunk is exhausted, get next from queue
        if (this._charIndex >= this._currentChunk.length) {
            if (this._queue.length === 0) {
                // Nothing more to animate — pause and wait for next chunk.
                // Start an idle timer: if no new chunk arrives, hide cursor.
                this._animationFrameId = null;
                this._startIdleTimer();
                return;
            }
            // Get next chunk from queue
            this._currentChunk = this._queue.shift();
            this._charIndex = 0;
        }

        // Calculate how many characters to reveal this frame
        const charsToAdd = this._getCharsPerFrame();

        // Extract characters to add
        const endIndex = Math.min(this._charIndex + charsToAdd, this._currentChunk.length);
        const newChars = this._currentChunk.slice(this._charIndex, endIndex);

        // Update state
        this._charIndex = endIndex;
        this._displayedText += newChars;

        // Notify the component
        try {
            this._onUpdate(this._displayedText);
        } catch (e) {
            console.error('TypewriterService: Error in onUpdate callback', e);
            // Continue animation despite error
        }

        // Schedule next frame — rush mode always uses rAF for smooth fast finish
        const { FRAME_DELAY_MS } = TypewriterService.CONFIG;
        if (!this._rushMode && FRAME_DELAY_MS > 0) {
            this._animationFrameId = setTimeout(() => this._animate(), FRAME_DELAY_MS);
        } else {
            this._animationFrameId = requestAnimationFrame(() => this._animate());
        }
    }

    /**
     * Calculate characters to reveal per frame based on queue size
     * Adaptive speed: increases when animation falls behind streaming
     * @private
     * @returns {number} Number of characters to reveal this frame
     */
    _getCharsPerFrame() {
        // Rush mode overrides normal speed calculation
        if (this._rushMode && this._rushCharsPerFrame) {
            return this._rushCharsPerFrame;
        }

        const { CONFIG } = TypewriterService;

        // Calculate total pending characters (how far behind we are)
        const queuedChars = this._queue.reduce((sum, chunk) => sum + chunk.length, 0);
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const totalPending = queuedChars + remainingInCurrent;

        // Adaptive speed based on how far behind animation is
        if (totalPending > CONFIG.QUEUE_THRESHOLD_CRITICAL) {
            return CONFIG.CHARS_PER_FRAME_CATCHING_UP;
        }
        if (totalPending > CONFIG.QUEUE_THRESHOLD_HIGH) {
            return this._isMarkdown ? 8 : 4;
        }
        if (totalPending > CONFIG.QUEUE_THRESHOLD_MEDIUM) {
            return this._isMarkdown ? 6 : 3;
        }

        // Base speed — markdown uses higher rate to reduce expensive re-parses
        return this._isMarkdown
            ? CONFIG.CHARS_PER_FRAME_MARKDOWN
            : CONFIG.CHARS_PER_FRAME_TEXT;
    }

    /**
     * Cancel any pending animation (works for both setTimeout and requestAnimationFrame)
     * @private
     */
    _cancelAnimation() {
        if (this._animationFrameId) {
            const { FRAME_DELAY_MS } = TypewriterService.CONFIG;
            if (FRAME_DELAY_MS > 0) {
                clearTimeout(this._animationFrameId);
            } else {
                cancelAnimationFrame(this._animationFrameId);
            }
            this._animationFrameId = null;
        }
    }

    /**
     * Start an idle timer that hides the cursor if no new chunk arrives.
     * Called when the animation loop pauses (queue empty).
     * @private
     */
    _startIdleTimer() {
        this._cancelIdleTimer();
        this._idleTimerId = setTimeout(() => {
            this._idleTimerId = null;
            // Still idle (no new chunks arrived) — hide cursor
            if (!this._animationFrameId && this._cursorVisible) {
                this._setCursorVisible(false);
                // Send final update without cursor
                try {
                    this._onUpdate(this._displayedText);
                } catch (e) {
                    console.error('TypewriterService: Error in idle onUpdate', e);
                }
            }
        }, TypewriterService.IDLE_CURSOR_TIMEOUT_MS);
    }

    /**
     * Cancel the idle timer (new chunk arrived or service is being cleaned up).
     * @private
     */
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

    /**
     * Skip animation and show all remaining content immediately
     */
    skipToEnd() {
        if (this._isDestroyed) return;

        // Cancel ongoing animation and idle timer
        this._cancelAnimation();
        this._cancelIdleTimer();

        // Hide cursor - streaming is complete
        this._setCursorVisible(false);

        // Append all remaining content
        if (this._currentChunk) {
            this._displayedText += this._currentChunk.slice(this._charIndex);
        }
        this._displayedText += this._queue.join('');

        // Clear state
        this._queue = [];
        this._currentChunk = '';
        this._charIndex = 0;

        // Final update
        try {
            this._onUpdate(this._displayedText);
        } catch (e) {
            console.error('TypewriterService: Error in final onUpdate', e);
        }
    }

    /**
     * Get the current displayed text
     * @returns {string} The text currently shown to the user
     */
    getDisplayedText() {
        return this._displayedText;
    }

    /**
     * Check if animation is currently running
     * @returns {boolean} True if animation is in progress
     */
    isAnimating() {
        return this._animationFrameId !== null;
    }

    /**
     * Check if there's content waiting to be animated
     * @returns {boolean} True if queue has content
     */
    hasPendingContent() {
        return this._queue.length > 0 || this._charIndex < this._currentChunk.length;
    }

    /**
     * Reset the service to initial state
     */
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

    /**
     * Clean up resources - MUST be called when done
     */
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

    /**
     * Update configuration (allows dynamic speed changes)
     * @param {Object} config - Configuration updates
     */
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
