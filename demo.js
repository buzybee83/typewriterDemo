// Demo Content Library
const DEMO_CONTENT = {
    simple: {
        title: "Simple Greeting",
        chunks: [
            "Hello! ",
            "I'm here to ",
            "demonstrate the ",
            "typewriter effect. ",
            "This makes streaming ",
            "text feel more ",
            "responsive and ",
            "engaging! 😊"
        ],
        isMarkdown: false
    },
    markdown: {
        title: "Rich Markdown Response",
        chunks: [
            "# Order Update\n\n",
            "Here's a comprehensive ",
            "update on your order ",
            "**#AC-1200**.\n\n",
            "## Shipping Details\n\n",
            "Your package is currently ",
            "**in transit** and ",
            "estimated to arrive by ",
            "**February 18, 2026**.\n\n",
            "- **Carrier:** FedEx\n",
            "- **Tracking:** `TRACK-2024`\n",
            "- **Origin:** San Francisco\n\n",
            "> **Note:** You can track ",
            "your package in real-time!\n\n",
            "Would you like me to:\n",
            "1. Resend confirmation\n",
            "2. Update delivery address\n",
            "3. Request a return"
        ],
        isMarkdown: true
    },
    code: {
        title: "Code Example",
        chunks: [
            "Here's how to ",
            "implement a fetch ",
            "request in JavaScript:\n\n",
            "```javascript\n",
            "async function ",
            "fetchData(url) {\n",
            "  try {\n",
            "    const response = ",
            "await fetch(url);\n",
            "    if (!response.ok) {\n",
            "      throw new Error(",
            "'Failed to fetch');\n",
            "    }\n",
            "    const data = ",
            "await response.json();\n",
            "    return data;\n",
            "  } catch (error) {\n",
            "    console.error(error);\n",
            "  }\n",
            "}\n",
            "```\n\n",
            "This function handles ",
            "errors gracefully and ",
            "returns the parsed JSON data."
        ],
        isMarkdown: true
    },
    conversation: {
        title: "Multi-Turn Conversation",
        chunks: [
            "I understand you're ",
            "looking for help with ",
            "your recent order. ",
            "Let me pull up the details ",
            "for you...\n\n",
            "✅ Found it! ",
            "Your order #12345 ",
            "is currently being ",
            "processed.\n\n",
            "**Status:** Preparing for shipment\n",
            "**Expected:** 2-3 business days\n\n",
            "Is there anything else ",
            "you'd like to know about ",
            "this order?"
        ],
        isMarkdown: true
    },
    long: {
        title: "Long Detailed Response",
        chunks: [
            "# Comprehensive Guide\n\n",
            "Let me provide a detailed ",
            "explanation of how the ",
            "typewriter effect works.\n\n",
            "## How It Works\n\n",
            "The typewriter service receives ",
            "chunks of text as they arrive ",
            "from the server. Instead of ",
            "displaying them all at once, ",
            "it queues them and reveals ",
            "characters progressively.\n\n",
            "### Key Features\n\n",
            "1. **Adaptive Speed** - ",
            "Animation speeds up when ",
            "the queue builds up\n",
            "2. **Smooth Animation** - ",
            "Uses requestAnimationFrame ",
            "for 60fps smoothness\n",
            "3. **Cursor Indicator** - ",
            "Shows a blinking cursor ",
            "during animation\n",
            "4. **Safety Measures** - ",
            "Includes timeouts and ",
            "error handling\n\n",
            "## Benefits\n\n",
            "- **Better UX** - Users see ",
            "immediate feedback\n",
            "- **Feels Faster** - Activity ",
            "appears instantly\n",
            "- **More Engaging** - Natural ",
            "typing rhythm\n\n",
            "```javascript\n",
            "// Example usage\n",
            "const typewriter = new ",
            "TypewriterService(\n",
            "  (text) => {\n",
            "    element.textContent = text;\n",
            "  }\n",
            ");\n\n",
            "typewriter.addChunk('Hello ');\n",
            "typewriter.addChunk('World!');\n",
            "```\n\n",
            "This creates a smooth, ",
            "character-by-character ",
            "reveal that makes streaming ",
            "feel more responsive and ",
            "professional. The effect is ",
            "particularly effective for ",
            "chat interfaces and AI ",
            "assistants where the typing ",
            "animation mimics natural ",
            "conversation flow."
        ],
        isMarkdown: true
    },
    rushDemo: {
        title: "Rush Mode Demo (Watch Speed Tier!)",
        chunks: [
            "# Understanding Rush Mode\n\n",
            "This demo showcases the **rush mode** feature, which activates when a stream ends ",
            "but there's still content in the animation queue.\n\n",
            "## How It Works\n\n",
            "Instead of abruptly cutting off the animation with `skipToEnd()`, ",
            "the typewriter smoothly speeds up to finish within a configured time budget (default: 5 seconds).\n\n",
            "### Watch the Speed Tier Indicator!\n\n",
            "As this message streams, you'll notice:\n",
            "1. **NORMAL** (green) - Initial baseline speed\n",
            "2. Then the stream will end mid-animation...\n",
            "3. **RUSH** (purple, pulsing) - Smooth acceleration to finish!\n\n",
            "## Technical Details\n\n",
            "```javascript\n",
            "// When stream ends with pending content\n",
            "if (typewriter.hasPendingContent()) {\n",
            "    // Instead of: typewriter.skipToEnd();\n",
            "    typewriter.rushToEnd(5000); // Finish in 5s\n",
            "}\n",
            "```\n\n",
            "### Benefits of Rush Mode\n\n",
            "- **Smooth finish** - No jarring cuts\n",
            "- **Predictable timing** - Complete within time budget\n",
            "- **Better UX** - Users see the full content animate\n",
            "- **Configurable** - Adjust `rushToEndMs` in settings\n\n",
            "## Comparison: Skip vs Rush\n\n",
            "| Method | Behavior | Use Case |\n",
            "|--------|----------|----------|\n",
            "| `skipToEnd()` | Instant display | User clicks Skip button |\n",
            "| `rushToEnd(ms)` | Smooth speedup | Stream ends naturally |\n\n",
            "### Algorithm\n\n",
            "Rush mode calculates the optimal chars-per-frame:\n\n",
            "```javascript\n",
            "const totalRemaining = queue + currentChunk;\n",
            "const frames = maxMs / 16; // 60fps\n",
            "const charsPerFrame = totalRemaining / frames;\n",
            "```\n\n",
            "This ensures smooth rendering at 60fps while meeting the time budget.\n\n",
            "## Adaptive Speed System\n\n",
            "The typewriter has multiple speed tiers:\n\n",
            "### Normal Operation\n",
            "- **NORMAL** - 1 char/frame (baseline)\n",
            "- **MEDIUM** - 3 chars/frame (queue > 45 chars)\n",
            "- **HIGH** - 5 chars/frame (queue > 80 chars)\n",
            "- **CRITICAL** - 10 chars/frame (queue > 120 chars)\n\n",
            "### Special Modes\n",
            "- **RUSH** - Variable speed to finish in time budget\n",
            "- **IDLE** - Paused, waiting for more chunks\n\n",
            "## Configuration\n\n",
            "You can tune these settings:\n",
            "- **Rush to End Duration** - Time budget for smooth finish (1-10s)\n",
            "- **Queue Thresholds** - When to trigger speed tiers\n",
            "- **Adaptive Speed Tiers** - How fast each tier runs\n\n",
            "## Real-World Usage\n\n",
            "In production, rush mode activates when:\n",
            "1. API stream completes: `onStreamEnd` fires\n",
            "2. Animation still has queued content\n",
            "3. Instead of cutting off, smoothly accelerate\n",
            "4. Complete within 5 seconds\n",
            "5. User sees full content without jarring jumps\n\n",
            "### Code Example\n\n",
            "```typescript\n",
            "// In streamObserver/util.ts\n",
            "export function finalizeStreamingText(host) {\n",
            "    if (host._typewriterService.hasPendingContent()) {\n",
            "        // Smooth finish instead of skip\n",
            "        host._typewriterService.rushToEnd(5000);\n",
            "        return; // Let it finish naturally\n",
            "    }\n",
            "    // No pending content, clean up immediately\n",
            "    service.skipToEnd();\n",
            "}\n",
            "```\n\n",
            "## Try It Yourself!\n\n",
            "Watch the **Speed Tier** indicator change from **NORMAL** to **RUSH** (purple, pulsing) ",
            "as this message finishes. The animation will smoothly accelerate to complete within your ",
            "configured rush duration!\n\n",
            "This demonstrates how the typewriter provides a polished, professional streaming experience.\n\n",
            "---\n\n",
            "## Additional Technical Details\n\n",
            "The rush mode feature is particularly useful in production environments where:\n\n",
            "- Network latency varies significantly\n",
            "- API responses come in bursts\n",
            "- You want guaranteed completion times\n",
            "- Users expect smooth, predictable animations\n\n",
            "### Performance Characteristics\n\n",
            "Rush mode maintains smooth 60fps animation while adaptively adjusting speed. ",
            "The algorithm ensures that even with variable network conditions, ",
            "the user experience remains consistent and professional.\n\n",
            "### Integration Examples\n\n",
            "Here's how different teams can use rush mode:\n\n",
            "1. **Customer Service** - Ensure complete responses within SLA timeframes\n",
            "2. **Sales Tools** - Provide snappy, responsive AI interactions\n",
            "3. **Documentation** - Generate formatted docs with predictable timing\n",
            "4. **Code Generation** - Display code smoothly regardless of payload size\n\n",
            "This extensive content ensures you can see the rush mode acceleration clearly!"
        ],
        isMarkdown: true
    }
};

// Demo State
let currentTypewriter = null;
let currentMessageElement = null;
let stats = {
    frameCount: 0,
    startTime: 0,
    charCount: 0
};

// Screen reader announcer
let announcerElement = null;
function announce(message, priority = 'polite') {
    if (!announcerElement) {
        announcerElement = document.createElement('div');
        announcerElement.setAttribute('role', 'status');
        announcerElement.setAttribute('aria-live', priority);
        announcerElement.setAttribute('aria-atomic', 'true');
        announcerElement.className = 'visually-hidden';
        document.body.appendChild(announcerElement);
    }

    // Clear then set to ensure announcement
    announcerElement.textContent = '';
    setTimeout(() => {
        announcerElement.textContent = message;
    }, 100);
}

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const demoSelect = document.getElementById('demoSelect');
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skipBtn');
const clearBtn = document.getElementById('clearBtn');
const frameCountEl = document.getElementById('frameCount');
const durationEl = document.getElementById('duration');
const charCountEl = document.getElementById('charCount');
const queueSizeEl = document.getElementById('queueSize');
const charsPerFrameCurrentEl = document.getElementById('charsPerFrameCurrent');
const speedTierEl = document.getElementById('speedTier');
const statusEl = document.getElementById('status');

// Initialize
startBtn.addEventListener('click', startDemo);
skipBtn.addEventListener('click', skipAnimation);
clearBtn.addEventListener('click', clearChat);

// Helper: Parse markdown to HTML
function parseMarkdown(text) {
    if (typeof marked !== 'undefined') {
        return marked.parse(text);
    }
    // Fallback: simple text with line breaks
    return text.replace(/\n/g, '<br>');
}

// Helper: Add message to chat
function addMessage(role, initialContent = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.setAttribute('role', 'article');
    messageDiv.setAttribute('aria-label', `${role === 'user' ? 'User' : 'Assistant'} message`);

    if (role === 'user') {
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'user-message-bubble';
        bubbleDiv.textContent = initialContent;
        messageDiv.appendChild(bubbleDiv);
    } else {
        // Assistant message with avatar
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'assistant-message-wrapper';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'assistant-avatar';
        avatarDiv.textContent = '🤖';
        avatarDiv.setAttribute('aria-hidden', 'true');

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'assistant-message-bubble';
        if (initialContent) {
            bubbleDiv.innerHTML = initialContent;
        }

        wrapperDiv.appendChild(avatarDiv);
        wrapperDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(wrapperDiv);

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        return bubbleDiv;
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return messageDiv.querySelector('.user-message-bubble') || messageDiv;
}

// Helper: Update stats display
function updateStats() {
    frameCountEl.textContent = stats.frameCount;
    charCountEl.textContent = stats.charCount;

    if (stats.startTime) {
        const elapsed = (Date.now() - stats.startTime) / 1000;
        durationEl.textContent = elapsed.toFixed(1) + 's';
    }

    // Update queue stats if typewriter service exists
    if (currentTypewriter) {
        const queueStats = currentTypewriter.getQueueStats();
        queueSizeEl.textContent = queueStats.totalPending;
        charsPerFrameCurrentEl.textContent = queueStats.currentSpeed;

        // Determine speed tier and apply styling
        speedTierEl.className = 'stat-value'; // Reset classes

        if (queueStats.rushMode) {
            speedTierEl.textContent = 'RUSH';
            speedTierEl.classList.add('speed-rush');
        } else if (!queueStats.isAnimating) {
            speedTierEl.textContent = 'IDLE';
            charsPerFrameCurrentEl.textContent = '-';
        } else {
            // Get config to check thresholds
            const queueThresholdCritical = parseInt(document.getElementById('queueThresholdCritical').value);
            const queueThresholdHigh = parseInt(document.getElementById('queueThresholdHigh').value);
            const queueThresholdMedium = parseInt(document.getElementById('queueThresholdMedium').value);

            if (queueStats.totalPending > queueThresholdCritical) {
                speedTierEl.textContent = 'CRITICAL';
                speedTierEl.classList.add('speed-critical');
            } else if (queueStats.totalPending > queueThresholdHigh) {
                speedTierEl.textContent = 'HIGH';
                speedTierEl.classList.add('speed-high');
            } else if (queueStats.totalPending > queueThresholdMedium) {
                speedTierEl.textContent = 'MEDIUM';
                speedTierEl.classList.add('speed-medium');
            } else {
                speedTierEl.textContent = 'NORMAL';
                speedTierEl.classList.add('speed-normal');
            }
        }
    }
}

// Simulate streaming: Send chunks with delays
function simulateStreaming(chunks, typewriter, isMarkdown, rushToEndMs, isRushDemo = false) {
    let chunkIndex = 0;

    function sendNextChunk() {
        if (chunkIndex >= chunks.length) {
            // All chunks sent - let animation finish naturally, cursor will hide after idle timeout
            statusEl.textContent = 'Stream complete';
            announce('Stream complete, finishing animation');
            // If there's still content pending (queue or current chunk), rush to finish smoothly
            if (typewriter && typewriter.hasPendingContent()) {
                typewriter.rushToEnd(rushToEndMs);
            }
            // Disable skip button and reset speed tier after animation completes
            setTimeout(() => {
                skipBtn.disabled = true;
                startBtn.disabled = !isChatOpen();
                statusEl.textContent = 'Ready';
                // Reset speed tier display when done
                if (!typewriter || !typewriter.isAnimating()) {
                    queueSizeEl.textContent = '0';
                    charsPerFrameCurrentEl.textContent = '-';
                    speedTierEl.textContent = '-';
                    speedTierEl.className = 'stat-value';
                }
            }, rushToEndMs + 500);
            return;
        }

        const chunk = chunks[chunkIndex];
        typewriter.addChunk(chunk);
        chunkIndex++;

        // For rush demo, send chunks instantly after 60% to build up massive queue
        let delay;
        if (isRushDemo && chunkIndex > chunks.length * 0.6) {
            // Send remaining chunks instantly to create huge backlog for rush mode
            delay = 0;
        } else {
            // Random delay between chunks to simulate real streaming
            delay = Math.random() * 400 + 200; // 200-600ms
        }
        setTimeout(sendNextChunk, delay);
    }

    // Start streaming
    sendNextChunk();
}

// Start demo
function startDemo() {
    // Cleanup previous demo
    if (currentTypewriter) {
        currentTypewriter.destroy();
    }

    // Reset stats
    stats = {
        frameCount: 0,
        startTime: Date.now(),
        charCount: 0
    };

    // Get selected demo
    const demoKey = demoSelect.value;
    const demo = DEMO_CONTENT[demoKey];

    // Add user message
    addMessage('user', `Show me: ${demo.title}`);

    // Create assistant message bubble
    currentMessageElement = addMessage('assistant', '');

    // Get all config settings from the settings panel
    const config = {
        charsPerFrame: parseInt(document.getElementById('charsPerFrame').value),
        charsPerFrameMarkdown: parseInt(document.getElementById('charsPerFrameMarkdown').value),
        charsPerFrameMedium: parseInt(document.getElementById('charsPerFrameMedium').value),
        charsPerFrameHigh: parseInt(document.getElementById('charsPerFrameHigh').value),
        charsPerFrameCatchingUp: parseInt(document.getElementById('charsPerFrameCatchingUp').value),
        queueThresholdMedium: parseInt(document.getElementById('queueThresholdMedium').value),
        queueThresholdHigh: parseInt(document.getElementById('queueThresholdHigh').value),
        queueThresholdCritical: parseInt(document.getElementById('queueThresholdCritical').value),
        maxAnimationTimeMs: parseInt(document.getElementById('maxAnimationTimeMs').value),
        frameDelayMs: parseInt(document.getElementById('frameDelayMs').value),
        idleCursorTimeoutMs: parseInt(document.getElementById('idleCursorTimeoutMs').value)
    };

    // Get rushToEndMs separately for use in simulateStreaming
    const rushToEndMs = parseInt(document.getElementById('rushToEndMs').value);

    // Cursor markers (matching POC implementation)
    const CURSOR_MARKER = '<span style="user-select:none;pointer-events:none;font-weight:400;color:black;font-size:1.35em;line-height:0">▏</span>';
    const CURSOR_MARKER_CODE = '▏';

    // Check if we're inside a code block
    function isInsideCodeBlock(text) {
        let inside = false;
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trimStart().startsWith('```')) {
                inside = !inside;
            }
        }
        return inside;
    }

    // Get appropriate cursor based on context
    function getCursor(text) {
        return isInsideCodeBlock(text) ? CURSOR_MARKER_CODE : CURSOR_MARKER;
    }

    // Track cursor state
    let cursorVisible = false;
    let cursorBlinkOn = true;
    let blinkInterval = null;

    // Push current text with cursor to display
    function flushValue() {
        if (!currentTypewriter) return;
        const text = currentTypewriter.getDisplayedText();
        const valueToSet = cursorVisible && cursorBlinkOn
            ? text + getCursor(text)
            : text;
        if (demo.isMarkdown) {
            currentMessageElement.innerHTML = parseMarkdown(valueToSet);
        } else {
            currentMessageElement.textContent = valueToSet;
        }
    }

    // Start cursor blinking (only when idle, not during active animation)
    function startBlink() {
        if (blinkInterval) return;
        cursorBlinkOn = true;
        blinkInterval = setInterval(() => {
            // Only toggle blink when animation is idle (not actively typing)
            // During active animation, _animate() drives updates and cursor stays solid
            if (currentTypewriter && !currentTypewriter.isAnimating()) {
                cursorBlinkOn = !cursorBlinkOn;
                flushValue();
            }
        }, 500);
    }

    function stopBlink() {
        if (blinkInterval) {
            clearInterval(blinkInterval);
            blinkInterval = null;
        }
        cursorBlinkOn = true;
    }

    // Create typewriter service with full config
    currentTypewriter = new TypewriterService(
        (text) => {
            // Update callback - called on each frame during active animation
            stats.frameCount++;
            stats.charCount = text.length;
            updateStats();

            // During active animation, cursor is always solid (cursorBlinkOn stays true)
            // Append cursor inline to the text value (POC approach)
            const valueToSet = cursorVisible
                ? text + getCursor(text)
                : text;

            // Update message bubble
            if (demo.isMarkdown) {
                currentMessageElement.innerHTML = parseMarkdown(valueToSet);
            } else {
                currentMessageElement.textContent = valueToSet;
            }

            // Auto-scroll
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        {
            isMarkdown: demo.isMarkdown,
            config: config,
            onCursorChange: (visible) => {
                // Cursor visibility callback
                cursorVisible = visible;
                if (visible) {
                    startBlink();
                } else {
                    stopBlink();
                    // Send final update without cursor
                    flushValue();
                }
            }
        }
    );

    // Clean up blink interval on destroy
    const originalDestroy = currentTypewriter.destroy.bind(currentTypewriter);
    currentTypewriter.destroy = () => {
        stopBlink();
        originalDestroy();
    };

    // Update UI
    startBtn.disabled = true;
    skipBtn.disabled = false;
    statusEl.textContent = 'Streaming...';
    announce(`Starting ${demo.title} demo`);

    // Start simulated streaming
    const isRushDemo = demoKey === 'rushDemo';
    simulateStreaming(demo.chunks, currentTypewriter, demo.isMarkdown, rushToEndMs, isRushDemo);

    // Update stats periodically
    const statsInterval = setInterval(() => {
        if (!currentTypewriter || !currentTypewriter.isAnimating()) {
            clearInterval(statsInterval);
            return;
        }
        updateStats();
    }, 100);
}

// Skip animation
function skipAnimation() {
    if (currentTypewriter) {
        currentTypewriter.skipToEnd();
        skipBtn.disabled = true;
        startBtn.disabled = !isChatOpen();
        statusEl.textContent = 'Skipped';
        announce('Animation skipped to end');
    }
}

// Clear chat
function clearChat() {
    chatContainer.innerHTML = '';
    if (currentTypewriter) {
        currentTypewriter.destroy();
        currentTypewriter = null;
    }
    stats = {
        frameCount: 0,
        startTime: 0,
        charCount: 0
    };
    updateStats();
    // Reset speed tier display
    queueSizeEl.textContent = '0';
    charsPerFrameCurrentEl.textContent = '-';
    speedTierEl.textContent = '-';
    speedTierEl.className = 'stat-value';
    statusEl.textContent = 'Ready';
    startBtn.disabled = !isChatOpen();
    skipBtn.disabled = true;
    announce('Chat cleared');
}

// Initial welcome message - show when chat opens
let welcomeShown = false;

// Listen for chat window opening
const originalChatFabClick = document.getElementById('chatFab')?.addEventListener;
window.addEventListener('DOMContentLoaded', () => {
    const chatFab = document.getElementById('chatFab');
    const chatWindow = document.getElementById('chatWindow');

    // Override the click handler to add welcome message
    if (chatFab) {
        chatFab.addEventListener('click', () => {
            if (!welcomeShown) {
                setTimeout(() => {
                    addMessage('assistant',
                        `<strong>Hi! I'm your Agentforce Service Agent.</strong><br><br>
                        This demo showcases streaming text animation with adaptive typewriter effects.<br><br>
                        <strong>How to use:</strong>
                        <ul>
                            <li>Select a demo scenario from the left panel</li>
                            <li>Click <strong>Start Demo</strong> to see the animation</li>
                            <li>Adjust settings in collapsible sections:
                                <ul>
                                    <li><strong>Type Speed</strong> - Characters per frame</li>
                                    <li><strong>Adaptive Speed Tiers</strong> - Catch-up speeds</li>
                                    <li><strong>Queue Thresholds</strong> - When to speed up</li>
                                    <li><strong>Timing</strong> - Cursor and rush settings</li>
                                </ul>
                            </li>
                            <li>Watch the <strong>Speed Tier</strong> indicator change colors!</li>
                        </ul>
                        <strong>Key Features:</strong>
                        <ul>
                            <li>Character-by-character reveal</li>
                            <li>Adaptive speed (catches up automatically)</li>
                            <li>Smart cursor (detects code blocks)</li>
                            <li>Live markdown parsing</li>
                            <li>Rush mode for smooth finishes</li>
                        </ul>
                        Ready to see it in action?`
                    );
                    welcomeShown = true;
                }, 300);
            }
        }, { once: true });
    }
});
