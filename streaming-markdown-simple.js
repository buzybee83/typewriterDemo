/**
 * Streaming Markdown Simple Demo
 * EXACT implementation from POC - TypewriterService → value property → markdown rendering
 * Uses chunks from codebase mock data (packages/acc-lex-components/src/lwc/runtime_copilot/mockLibrary/mockData/markdown.js)
 */

// Exact chunks from codebase mockData/markdown.js
const CAKE_RECIPE_CHUNKS = [
    'Sure, I ',
    'can help ',
    'with that!',
    " Here's a ",
    'simple re',
    'cipe for ',
    'a classic ',
    'vanilla c',
    'ake:\n\n###',
    ' Ingredie',
    'nts:\n- 2 ',
    '1/2 cups ',
    'all-purpo',
    'se flour\n',
    '- 2 1/2 ',
    'tsp bakin',
    'g powder\n',
    '- 1/2 tsp',
    ' salt\n- 1 ',
    '1/4 cups ',
    'unsalted ',
    'butter, ro',
    'om tempe',
    'rature\n- 2',
    ' cups gra',
    'nulated s',
    'ugar\n- 4 ',
    'large egg',
    's, room t',
    'emperature',
    '\n- 1 tsp v',
    'anilla ex',
    'tract\n- 1',
    ' cup whole',
    ' milk, roo',
    'm tempera',
    'ture\n\n###',
    ' Instructi',
    'ons:\n1. *',
    '*Preheat ',
    'your oven to 350°F',
    '(175°C). Grease',
    'and flour two 9-in',
    'ch round cake pans',
    '.\n2. **Mix dry',
    'ingredients**: In',
    ' a medium bowl,',
    ' whisk togeth',
    'er the flour,',
    ' baking pow',
    'der, and salt.',
    '\n3. **Cream but',
    'ter and sugar:',
    ' In a large bowl,',
    ' beat the butter',
    'and sugar until',
    ' light and fluffy.',
    '\n4. **Add eggs an',
    'd vanilla**: Bea',
    't in the eggs on',
    'e at a time, the',
    'n stir in the va',
    'nilla extract.',
    '\n5. **Combine we',
    't and dry**: Gra',
    'dually add the f',
    'lour mixture to ',
    'the butter mixtu',
    're, alternating ',
    'with the milk.',
    ' Begin and end w',
    'ith the flour mix',
    'ture. Mix until',
    ' just combined.',
    '\n6. **Bake**: Div',
    'ide the batter e',
    'venly between th',
    'e prepared pans.',
    ' Bake for 25-30',
    ' minutes, or unti',
    'l a toothpick in',
    'to the center com',
    'es out clean.\n7. **',
    'Cool**: Allow th',
    'e cakes to cool ',
    'completely.\n\n### O',
    'ptional Frosting:\nY',
    'ou can frost yo',
    'ur cake with you',
    'r favorite frosting',
    '. A simple buttercr',
    'eam or cream che',
    'ese frosting wor',
    'ks great!\n\nThis i',
    's a [hyperlink tex',
    't](https://example.com)',
    ' Enjoy your homemade',
    ' vanilla cake!'
];

// Cursor constants (from codebase streamObserver/util.js)
const CURSOR_MARKER = '<span style="user-select:none;pointer-events:none;font-weight:400;color:black;font-size:1.35em;line-height:0">▏</span>';
const CURSOR_MARKER_CODE = '▏';
const CURSOR_BLINK_MS = 500;

// State
let currentTypewriter = null;
let currentMessageBubble = null;
let cursorVisible = false;
let cursorBlinkOn = true;
let blinkInterval = null;

// Performance tracking
let performanceStats = {
    frameCount: 0,
    startTime: 0,
    parseTimes: [],
    charCount: 0
};

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const speedInput = document.getElementById('speedInput');
const delayInput = document.getElementById('delayInput');
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skipBtn');
const clearBtn = document.getElementById('clearBtn');

// Performance display elements
const frameCountEl = document.getElementById('frameCount');
const durationEl = document.getElementById('duration');
const charCountEl = document.getElementById('charCount');
const parseAvgEl = document.getElementById('parseAvg');
const parseMaxEl = document.getElementById('parseMax');
const fpsEl = document.getElementById('fps');

// Event listeners
startBtn.addEventListener('click', startStreaming);
skipBtn.addEventListener('click', skipStreaming);
clearBtn.addEventListener('click', clearChat);

/**
 * Check if text currently ends inside an unclosed fenced code block
 * From codebase: streamObserver/util.js _isInsideCodeBlock
 * @param {string} text
 * @returns {boolean}
 */
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

/**
 * Get the appropriate cursor marker based on context
 * From codebase: streamObserver/util.js getCursor
 * @param {string} text
 * @returns {string}
 */
function getCursor(text) {
    return isInsideCodeBlock(text) ? CURSOR_MARKER_CODE : CURSOR_MARKER;
}

/**
 * Start cursor blinking (only when idle)
 * From codebase: streamObserver/util.js startBlink
 */
function startBlink() {
    if (blinkInterval) return;
    cursorBlinkOn = true;

    blinkInterval = setInterval(() => {
        // Only toggle when animation is idle (not actively typing)
        if (currentTypewriter && !currentTypewriter.isAnimating()) {
            cursorBlinkOn = !cursorBlinkOn;
            flushValue();
        }
    }, CURSOR_BLINK_MS);
}

/**
 * Stop cursor blinking
 * From codebase: streamObserver/util.js stopBlink
 */
function stopBlink() {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    cursorBlinkOn = true;
}

/**
 * Push current displayed text (± cursor) to the component
 * This is the EXACT flow from POC:
 * 1. Get raw text from TypewriterService
 * 2. Add cursor inline if visible
 * 3. Set value property
 * 4. Value change triggers rendering (like renderedCallback in BaseMarkdownText)
 *
 * From codebase: streamObserver/util.js flushValue
 */
function flushValue() {
    if (!currentMessageBubble || !currentTypewriter) {
        return;
    }

    const animatedText = currentTypewriter.getDisplayedText();

    // Append the right cursor: HTML in normal text, plain char in code blocks
    const valueToSet = cursorVisible
        ? animatedText + getCursor(animatedText)
        : animatedText;

    // Simulate setting childComponent.value (which triggers rendering)
    renderMarkdownValue(valueToSet);
}

/**
 * Render markdown value (simulates BaseMarkdownText.renderedCallback)
 * This is what happens when childComponent.value is set in the POC
 *
 * Jitter reduction strategies (without deferred parsing):
 * 1. Throttled scrolling (every 3 frames)
 * 2. CSS containment + GPU acceleration
 * 3. View Transitions API for smooth content changes
 * 4. CSS animations on new elements
 */

let scrollThrottle = 0;

function renderMarkdownValue(value) {
    if (!currentMessageBubble) return;

    // Measure parse time
    const parseStart = performance.now();

    // Parse markdown (marked.parse like BaseMarkdownText does)
    let html = marked.parse(value);

    // Sanitize (sanitizeHTML like BaseMarkdownText does)
    html = sanitizeHTML(html).trim();

    const parseEnd = performance.now();
    const parseTime = parseEnd - parseStart;

    // Track performance
    performanceStats.parseTimes.push(parseTime);
    performanceStats.frameCount++;
    performanceStats.charCount = currentTypewriter?.getDisplayedText().length || 0;

    // Update DOM (like BaseMarkdownText innerHTML)
    currentMessageBubble.innerHTML = html;

    // Add link listeners (like BaseMarkdownText.addLinkClickListeners)
    addLinkClickListeners(currentMessageBubble);

    // Update performance display
    updatePerformanceDisplay();

    // Throttled scroll - only every 3 frames to reduce layout thrashing
    scrollThrottle++;
    if (scrollThrottle % 3 === 0) {
        // Use requestAnimationFrame for smooth scrolling
        requestAnimationFrame(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }
}

/**
 * Update performance metrics display
 */
function updatePerformanceDisplay() {
    frameCountEl.textContent = performanceStats.frameCount;
    charCountEl.textContent = performanceStats.charCount;

    if (performanceStats.startTime) {
        const elapsed = (performance.now() - performanceStats.startTime) / 1000;
        durationEl.textContent = elapsed.toFixed(1);
        fpsEl.textContent = Math.round(performanceStats.frameCount / elapsed);
    }

    if (performanceStats.parseTimes.length > 0) {
        const sum = performanceStats.parseTimes.reduce((a, b) => a + b, 0);
        const avg = sum / performanceStats.parseTimes.length;
        const max = Math.max(...performanceStats.parseTimes);

        parseAvgEl.textContent = avg.toFixed(2);
        parseMaxEl.textContent = max.toFixed(2);
    }
}

/**
 * Add link click listeners
 * From codebase: BaseMarkdownText.addLinkClickListeners
 */
function addLinkClickListeners(container) {
    const links = container.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                if (confirm(`Open link: ${href}?`)) {
                    window.open(href, '_blank');
                }
            }
        });
    });
}

/**
 * Add message bubble to chat
 */
function addMessage(role, content = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    if (role === 'assistant') {
        // Create markdown wrapper for assistant messages
        const markdownDiv = document.createElement('div');
        markdownDiv.className = 'markdown-wrapper';
        if (content) {
            markdownDiv.innerHTML = content;
        }
        bubbleDiv.appendChild(markdownDiv);
    } else {
        bubbleDiv.textContent = content;
    }

    messageDiv.appendChild(bubbleDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return role === 'assistant' ? bubbleDiv.querySelector('.markdown-wrapper') : bubbleDiv;
}

/**
 * Start streaming
 * This simulates the POC flow:
 * StreamObserver.resolveMarkdown → TypewriterService.addChunk → callback sets value
 */
function startStreaming() {
    // Cleanup previous
    if (currentTypewriter) {
        currentTypewriter.destroy();
    }
    stopBlink();

    // Reset performance stats
    performanceStats = {
        frameCount: 0,
        startTime: performance.now(),
        parseTimes: [],
        charCount: 0
    };

    // Add user message
    addMessage('user', 'Can you help me make a cake?');

    // Create assistant message bubble
    currentMessageBubble = addMessage('assistant', '');

    // Get settings
    const charsPerFrame = parseInt(speedInput.value);
    const frameDelayMs = parseInt(delayInput.value);

    // Reset cursor state
    cursorBlinkOn = true;
    cursorVisible = false;
    scrollThrottle = 0; // Reset scroll throttle

    // Create TypewriterService with EXACT POC callback pattern
    // From codebase: streamObserver/util.js initTypewriterService
    currentTypewriter = new TypewriterService(
        (animatedText) => {
            // EXACT POC implementation:
            // Append the right cursor: HTML in normal text, plain char in code blocks
            const valueToSet = cursorVisible
                ? animatedText + getCursor(animatedText)
                : animatedText;

            // Set value (triggers rendering like childComponent.value = valueToSet)
            renderMarkdownValue(valueToSet);
        },
        {
            isMarkdown: true,
            onCursorChange: (visible) => {
                cursorVisible = visible;
                if (visible) {
                    startBlink();
                } else {
                    stopBlink();
                }
            }
        }
    );

    // Update config
    currentTypewriter.updateConfig({ charsPerFrame, frameDelayMs });

    // UI state
    startBtn.disabled = true;
    skipBtn.disabled = false;

    // Simulate streaming (like StreamObserver receiving chunks)
    simulateStreaming(CAKE_RECIPE_CHUNKS);
}

/**
 * Simulate streaming chunks
 * This simulates what happens in the POC when chunks arrive from the LLM
 */
function simulateStreaming(chunks) {
    let chunkIndex = 0;

    function sendNextChunk() {
        if (chunkIndex >= chunks.length) {
            // Stream complete
            setTimeout(() => {
                if (currentTypewriter) {
                    currentTypewriter.skipToEnd();
                }
                startBtn.disabled = false;
                skipBtn.disabled = true;
            }, 500);
            return;
        }

        const chunk = chunks[chunkIndex];
        // This is like resolveMarkdown calling typewriterService.addChunk(delta)
        currentTypewriter.addChunk(chunk);
        chunkIndex++;

        // Random delay between chunks (simulates real streaming)
        const delay = Math.random() * 150 + 100; // 100-250ms
        setTimeout(sendNextChunk, delay);
    }

    sendNextChunk();
}

/**
 * Skip streaming
 */
function skipStreaming() {
    if (currentTypewriter) {
        currentTypewriter.skipToEnd();
        stopBlink();
        skipBtn.disabled = true;
        startBtn.disabled = false;
    }
}

/**
 * Clear chat
 */
function clearChat() {
    chatContainer.innerHTML = '';
    stopBlink();

    if (currentTypewriter) {
        currentTypewriter.destroy();
        currentTypewriter = null;
    }

    currentMessageBubble = null;
    startBtn.disabled = false;
    skipBtn.disabled = true;

    // Reset performance display
    performanceStats = {
        frameCount: 0,
        startTime: 0,
        parseTimes: [],
        charCount: 0
    };
    updatePerformanceDisplay();
}

/**
 * Initial welcome message
 */
window.addEventListener('DOMContentLoaded', () => {
    const welcome = addMessage('assistant', '');

    welcome.innerHTML = `
        <strong>Streaming Markdown - EXACT POC Implementation</strong><br><br>
        This demo uses the <strong>exact flow</strong> from the POC:<br><br>
        1. <strong>TypewriterService</strong> → animates text + cursor<br>
        2. <strong>Value property</strong> → triggers render (like childComponent.value)<br>
        3. <strong>BaseMarkdownText</strong> → parses & sanitizes<br><br>
        <strong>✨ Smoothness Enhancements:</strong><br>
        • CSS animations for fade-in effects<br>
        • GPU-accelerated transforms<br>
        • Throttled scrolling<br><br>
        Using <strong>exact markdown chunks</strong> from mockLibrary/mockData/markdown.js<br><br>
        Click "Start Streaming" to begin!
    `;
    updatePerformanceDisplay();
});
