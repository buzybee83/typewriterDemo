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

    /** @type {string|undefined} Last speed tier for logging */
    _lastSpeedTier = undefined;

    /** @type {Object} Configuration */
    _config = {};

    /** @type {number} Last frame timestamp for throttling */
    _lastFrameTime = 0;

    // Default configuration
    static CONFIG = {
        charsPerFrame: 1,
        charsPerFrameMarkdown: 1,
        charsPerFrameMedium: 3,
        charsPerFrameHigh: 5,
        charsPerFrameCatchingUp: 10,
        queueThresholdMedium: 45,
        queueThresholdHigh: 80,
        queueThresholdCritical: 120,
        maxAnimationTimeMs: 15000,
        frameDelayMs: 35,  // Frame-skipping throttle (0 = every frame at 60fps)
        idleCursorTimeoutMs: 1500,
        rushToEndMs: 5000
    };

    /**
     * Create a new TypewriterService
     * @param {Function} onUpdate - Callback called with updated text: (displayedText: string) => void
     * @param {Object} options - Configuration options
     * @param {boolean} options.isMarkdown - Whether content is markdown (affects animation speed)
     * @param {Function} options.onCursorChange - Callback for cursor visibility: (visible: boolean) => void
     * @param {Object} options.config - Partial config overrides
     */
    constructor(onUpdate, options = {}) {
        this._onUpdate = onUpdate;
        this._isMarkdown = options.isMarkdown || false;
        this._onCursorChange = options.onCursorChange || null;
        this._config = { ...TypewriterService.CONFIG, ...options.config };
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
     * Add a text chunk to the animation queue.
     * This is called each time a streaming delta arrives from the server.
     * @param {string} deltaText - The new text to add
     */
    addChunk(deltaText) {
        if (this._isDestroyed || !deltaText) {
            return;
        }

        const wasAnimating = this._animationFrameId !== null;
        this._queue.push(deltaText);

        // Cancel idle timer — new content arrived
        this._cancelIdleTimer();

        // Start animating if not already running
        if (!this._animationFrameId) {
            this._startTime = Date.now();
            this._lastFrameTime = performance.now();
            this._setCursorVisible(true);
            this._animate();
        }
    }

    /**
     * Main animation loop using requestAnimationFrame with frame-skipping for throttling.
     * Always uses rAF for smooth 60fps, but skips frames to achieve desired delay.
     * @private
     */
    _animate() {
        if (this._isDestroyed) {
            return;
        }

        // Always schedule next frame first (for smooth 60fps loop)
        this._animationFrameId = requestAnimationFrame(() => this._animate());

        // Frame-skipping throttle: only update if enough time has passed
        const now = performance.now();
        const { frameDelayMs } = this._config;
        if (!this._rushMode && frameDelayMs > 0) {
            const elapsed = now - this._lastFrameTime;
            if (elapsed < frameDelayMs) {
                // Not enough time passed - skip this frame
                return;
            }
            this._lastFrameTime = now;
        }

        // Safety timeout - if animation runs too long, skip to end
        const elapsedTotal = Date.now() - this._startTime;
        if (elapsedTotal > this._config.maxAnimationTimeMs) {
            console.warn('TypewriterService: Animation exceeded max time, skipping to end');
            this.skipToEnd();
            return;
        }

        // If current chunk is exhausted, get next from queue
        if (this._charIndex >= this._currentChunk.length) {
            if (this._queue.length === 0) {
                // Nothing more to animate — pause and wait for next chunk.
                // Start an idle timer: if no new chunk arrives, hide cursor.
                this._animationFrameId = null;
                this._lastFrameTime = 0;
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
        const endIndex = Math.min(
            this._charIndex + charsToAdd,
            this._currentChunk.length
        );
        const newChars = this._currentChunk.slice(this._charIndex, endIndex);

        // Update state
        this._charIndex = endIndex;
        this._displayedText += newChars;

        // Notify the component
        try {
            if (this._onUpdate) {
                this._onUpdate(this._displayedText);
            }
        } catch (e) {
            console.error('TypewriterService: Error in onUpdate callback', e);
        }
    }

    /**
     * Calculate how many characters to add this frame based on queue size.
     * Uses adaptive speed: more characters when queue is large (catching up).
     * @returns {number} Number of characters to add this frame
     * @private
     */
    _getCharsPerFrame() {
        // Rush mode overrides normal speed calculation
        if (this._rushMode && this._rushCharsPerFrame) {
            return this._rushCharsPerFrame;
        }

        const cfg = this._config;

        // Calculate total pending characters (how far behind we are)
        const queuedChars = this._queue.reduce(
            (sum, chunk) => sum + chunk.length,
            0
        );
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const totalPending = queuedChars + remainingInCurrent;

        // Adaptive speed based on how far behind animation is
        let charsPerFrame;
        let speedTier;
        if (totalPending > cfg.queueThresholdCritical) {
            charsPerFrame = cfg.charsPerFrameCatchingUp;
            speedTier = 'critical';
        } else if (totalPending > cfg.queueThresholdHigh) {
            charsPerFrame = cfg.charsPerFrameHigh;
            speedTier = 'high';
        } else if (totalPending > cfg.queueThresholdMedium) {
            charsPerFrame = cfg.charsPerFrameMedium;
            speedTier = 'medium';
        } else {
            charsPerFrame = this._isMarkdown
                ? cfg.charsPerFrameMarkdown
                : cfg.charsPerFrame;
            speedTier = 'normal';
        }

        // Log only on speed tier changes to reduce noise
        if (this._lastSpeedTier !== speedTier) {
            this._lastSpeedTier = speedTier;
        }

        return charsPerFrame;
    }

    /**
     * Cancel ongoing animation frame.
     * @private
     */
    _cancelAnimation() {
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        this._lastFrameTime = 0;
    }

    /**
     * Start idle timer to hide cursor after a delay if no new chunks arrive.
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
                    if (this._onUpdate) {
                        this._onUpdate(this._displayedText);
                    }
                } catch (e) {
                    console.error('TypewriterService: Error in onUpdate callback during idle', e);
                }
            }
        }, this._config.idleCursorTimeoutMs);
    }

    /**
     * Cancel idle timer.
     * @private
     */
    _cancelIdleTimer() {
        if (this._idleTimerId) {
            clearTimeout(this._idleTimerId);
            this._idleTimerId = null;
        }
    }

    /**
     * Speed up animation to finish within the time budget (keeps animating, just faster).
     * @param {number} maxMs - Maximum time in ms to finish animation (uses config.rushToEndMs if not provided)
     */
    rushToEnd(maxMs) {
        const rushMs = maxMs !== undefined ? maxMs : this._config.rushToEndMs;

        if (this._isDestroyed) {
            return;
        }

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
        const frames = Math.floor(rushMs / rushFrameMs);
        const charsPerFrame = Math.max(1, Math.ceil(totalRemaining / frames));

        // Override the per-frame calculation for the remainder of this animation
        this._rushCharsPerFrame = charsPerFrame;

        // Switch to requestAnimationFrame for smooth rush regardless of current frameDelayMs
        this._rushMode = true;

        // If animation was paused (idle), restart it
        if (!this._animationFrameId) {
            this._cancelIdleTimer();
            this._animate();
        }
    }

    /**
     * Immediately display all remaining content without animation.
     * Called when user clicks "Skip" or when stream completes.
     */
    skipToEnd() {
        if (this._isDestroyed) {
            return;
        }

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
            if (this._onUpdate) {
                this._onUpdate(this._displayedText);
            }
        } catch (e) {
            console.error('TypewriterService: Error in onUpdate callback during skipToEnd', e);
        }
    }

    /**
     * Get the currently displayed text.
     * @returns {string} Currently displayed text
     */
    getDisplayedText() {
        return this._displayedText;
    }

    /**
     * Check if animation is currently running.
     * @returns {boolean} True if animating
     */
    isAnimating() {
        return this._animationFrameId !== null;
    }

    /**
     * Check if there's pending content in the queue or current chunk.
     * @returns {boolean} True if there's pending content
     */
    hasPendingContent() {
        return (
            this._queue.length > 0 ||
            this._charIndex < this._currentChunk.length
        );
    }

    /**
     * Get queue statistics for monitoring.
     * @returns {Object} Queue statistics
     */
    getQueueStats() {
        const queuedChars = this._queue.reduce((sum, c) => sum + c.length, 0);
        const remainingInCurrent = this._currentChunk.length - this._charIndex;
        const totalPending = queuedChars + remainingInCurrent;

        return {
            queueLength: this._queue.length,
            queuedChars,
            remainingInCurrent,
            totalPending,
            currentSpeed: this._getCharsPerFrame(),
            isAnimating: this.isAnimating(),
            rushMode: this._rushMode
        };
    }

    /**
     * Reset the service to initial state.
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
        this._lastFrameTime = 0;
        this._rushMode = false;
        this._rushCharsPerFrame = 0;
        this._lastSpeedTier = undefined;
    }

    /**
     * Update configuration dynamically.
     * @param {Object} config - Configuration overrides
     */
    updateConfig(config) {
        this._config = { ...this._config, ...config };
    }

    /**
     * Clean up resources. Must be called when component is destroyed.
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
}
