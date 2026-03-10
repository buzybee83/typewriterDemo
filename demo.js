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

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const demoSelect = document.getElementById('demoSelect');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const delayRange = document.getElementById('delayRange');
const delayValue = document.getElementById('delayValue');
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skipBtn');
const clearBtn = document.getElementById('clearBtn');
const frameCountEl = document.getElementById('frameCount');
const durationEl = document.getElementById('duration');
const charCountEl = document.getElementById('charCount');
const statusEl = document.getElementById('status');

// Initialize
speedRange.addEventListener('input', (e) => {
    speedValue.textContent = e.target.value;
});

delayRange.addEventListener('input', (e) => {
    delayValue.textContent = e.target.value;
});

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
}

// Simulate streaming: Send chunks with delays
function simulateStreaming(chunks, typewriter, isMarkdown) {
    let chunkIndex = 0;

    function sendNextChunk() {
        if (chunkIndex >= chunks.length) {
            // All chunks sent - wait a brief moment then skip to end
            statusEl.textContent = 'Stream complete';
            setTimeout(() => {
                // Skip to end to immediately hide cursor and finish animation
                if (typewriter && typewriter.hasPendingContent()) {
                    typewriter.skipToEnd();
                }
                skipBtn.disabled = true;
                startBtn.disabled = false;
                statusEl.textContent = 'Ready';
            }, 300);
            return;
        }

        const chunk = chunks[chunkIndex];
        typewriter.addChunk(chunk);
        chunkIndex++;

        // Random delay between chunks to simulate real streaming
        const delay = Math.random() * 400 + 200; // 200-600ms
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

    // Get current settings
    const charsPerFrame = parseInt(speedRange.value);
    const frameDelayMs = parseInt(delayRange.value);

    // Track cursor state
    let showCursor = true;

    // Create typewriter service
    currentTypewriter = new TypewriterService(
        (text) => {
            // Update callback - called on each frame
            stats.frameCount++;
            stats.charCount = text.length;
            updateStats();

            // Update message bubble
            if (demo.isMarkdown) {
                currentMessageElement.innerHTML = parseMarkdown(text);
                // Add cursor if visible
                if (showCursor) {
                    currentMessageElement.innerHTML += '<span class="typewriter-cursor"></span>';
                }
            } else {
                currentMessageElement.textContent = text;
                // Add cursor if visible
                if (showCursor) {
                    const cursor = document.createElement('span');
                    cursor.className = 'typewriter-cursor';
                    currentMessageElement.appendChild(cursor);
                }
            }

            // Auto-scroll
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        {
            isMarkdown: demo.isMarkdown,
            onCursorChange: (visible) => {
                // Cursor visibility callback
                showCursor = visible;
                if (!visible && currentMessageElement) {
                    // Remove cursor when hidden - update content without cursor
                    const text = currentTypewriter.getDisplayedText();
                    if (demo.isMarkdown) {
                        currentMessageElement.innerHTML = parseMarkdown(text);
                    } else {
                        currentMessageElement.textContent = text;
                    }
                }
            }
        }
    );

    // Update config
    currentTypewriter.updateConfig({
        charsPerFrame,
        frameDelayMs
    });

    // Update UI
    startBtn.disabled = true;
    skipBtn.disabled = false;
    statusEl.textContent = 'Streaming...';

    // Start simulated streaming
    simulateStreaming(demo.chunks, currentTypewriter, demo.isMarkdown);

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
        startBtn.disabled = false;
        statusEl.textContent = 'Skipped';
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
    statusEl.textContent = 'Ready';
    startBtn.disabled = false;
    skipBtn.disabled = true;
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
                        `<strong>Welcome! 👋</strong><br><br>
                        This demo showcases streaming text animation with typewriter effects.<br><br>
                        <strong>Try it out:</strong>
                        <ul>
                            <li>Select a demo from the dropdown</li>
                            <li>Click "Start Demo" to see the animation</li>
                            <li>Adjust settings with the ⚙️ icon</li>
                        </ul>
                        Ready when you are!`
                    );
                    welcomeShown = true;
                }, 300);
            }
        }, { once: true });
    }
});
