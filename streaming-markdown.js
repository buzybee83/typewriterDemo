/**
 * Streaming Markdown Chat Demo
 * Combines TypewriterService with BaseMarkdownText rendering
 */

// Demo content with markdown and citations
const STREAMING_DEMOS = {
    citations: {
        title: "Order Status with Citations",
        userMessage: "Can you give me an update on my order?",
        chunks: [
            "# Order Update\n\n",
            "Based on your account information, ",
            "here are the key details about order **#AC-1200**.\n\n",
            "## Shipping Status\n\n",
            "Your package is currently **in transit** ",
            "and estimated to arrive by **February 20, 2026**. ",
            "The carrier has confirmed pickup and processing.\n\n",
            "## Order Details\n\n",
            "- **Status:** Processing\n",
            "- **Carrier:** FedEx Express\n",
            "- **Tracking:** `TRACK2024AC1200`\n",
            "- **Items:** 3 items\n\n",
            "Recent activity shows your order was picked ",
            "and is moving through the distribution network. ",
            "All items have been confirmed in stock.\n\n",
            "> **Note:** You can track your package in real-time ",
            "using the tracking number above.\n\n",
            "For billing questions, please review your invoice history ",
            "or contact our support team."
        ],
        citations: [
            {
                type: "record",
                value: "00QSB000007Je7P2AS",
                inlineMetadata: [
                    { location: 18, claim: "Account information" },
                    { location: 85, claim: "Order details" }
                ]
            },
            {
                type: "record",
                value: "a0QSB000000XYZ123",
                inlineMetadata: [
                    { location: 150, claim: "Shipping status" }
                ]
            },
            {
                type: "link",
                value: "https://tracking.fedex.com",
                inlineMetadata: [
                    { location: 320, claim: "Carrier tracking" }
                ]
            },
            {
                type: "record",
                value: "inv-2024-5678",
                inlineMetadata: [
                    { location: 550, claim: "Invoice history" }
                ]
            }
        ]
    },
    code: {
        title: "API Integration Example",
        userMessage: "How do I integrate with your API?",
        chunks: [
            "# API Integration Guide\n\n",
            "Here's how to get started with our API.\n\n",
            "## Authentication\n\n",
            "First, obtain your API key from the dashboard. ",
            "Then include it in the request headers:\n\n",
            "```javascript\n",
            "const apiKey = 'your_api_key_here';\n",
            "const headers = {\n",
            "  'Authorization': `Bearer ${apiKey}`,\n",
            "  'Content-Type': 'application/json'\n",
            "};\n",
            "```\n\n",
            "## Making Requests\n\n",
            "Use the fetch API to make requests:\n\n",
            "```javascript\n",
            "async function getData() {\n",
            "  try {\n",
            "    const response = await fetch(\n",
            "      'https://api.example.com/v1/data',\n",
            "      { headers }\n",
            "    );\n",
            "    \n",
            "    if (!response.ok) {\n",
            "      throw new Error('Request failed');\n",
            "    }\n",
            "    \n",
            "    const data = await response.json();\n",
            "    return data;\n",
            "  } catch (error) {\n",
            "    console.error('Error:', error);\n",
            "  }\n",
            "}\n",
            "```\n\n",
            "## Rate Limits\n\n",
            "- **Free tier:** 100 requests/hour\n",
            "- **Pro tier:** 1,000 requests/hour\n",
            "- **Enterprise:** Unlimited\n\n",
            "Check the `X-RateLimit-Remaining` header ",
            "in responses to track your usage."
        ],
        citations: [
            {
                type: "link",
                value: "https://docs.example.com/api",
                inlineMetadata: [
                    { location: 60, claim: "API documentation" }
                ]
            },
            {
                type: "link",
                value: "https://dashboard.example.com",
                inlineMetadata: [
                    { location: 110, claim: "Dashboard access" }
                ]
            }
        ]
    },
    table: {
        title: "Feature Comparison",
        userMessage: "What are the differences between plans?",
        chunks: [
            "# Plan Comparison\n\n",
            "Here's a detailed comparison of our subscription tiers.\n\n",
            "## Pricing Plans\n\n",
            "| Feature | Basic | Pro | Enterprise |\n",
            "|---------|-------|-----|------------|\n",
            "| **Users** | 5 | 50 | Unlimited |\n",
            "| **Storage** | 10 GB | 100 GB | 1 TB |\n",
            "| **API Calls** | 1K/day | 10K/day | Unlimited |\n",
            "| **Support** | Email | Priority | 24/7 Dedicated |\n",
            "| **Analytics** | Basic | Advanced | Enterprise |\n",
            "| **Price** | $10/mo | $50/mo | Custom |\n\n",
            "## Key Features\n\n",
            "### Basic Tier\n",
            "- Essential features for small teams\n",
            "- Community support\n",
            "- Monthly billing\n\n",
            "### Pro Tier\n",
            "- Everything in Basic, plus:\n",
            "- Priority support\n",
            "- Advanced analytics\n",
            "- Custom integrations\n",
            "- Annual billing discount\n\n",
            "### Enterprise Tier\n",
            "- Everything in Pro, plus:\n",
            "- Dedicated account manager\n",
            "- Custom SLA\n",
            "- On-premises deployment option\n",
            "- White-label solutions\n\n",
            "> **Special Offer:** Get 2 months free ",
            "with annual billing on Pro or Enterprise plans!"
        ],
        citations: [
            {
                type: "link",
                value: "https://example.com/pricing",
                inlineMetadata: [
                    { location: 50, claim: "Full pricing details" }
                ]
            },
            {
                type: "link",
                value: "https://example.com/compare",
                inlineMetadata: [
                    { location: 400, claim: "Feature comparison" }
                ]
            }
        ]
    },
    conversation: {
        title: "Troubleshooting Help",
        userMessage: "My app isn't connecting to the database",
        chunks: [
            "I'll help you troubleshoot the database connection issue.\n\n",
            "## Quick Diagnostics\n\n",
            "Let me check a few things:\n\n",
            "1. ✅ **Database server status:** Online\n",
            "2. ✅ **Network connectivity:** Confirmed\n",
            "3. ⚠️ **Connection pool:** Near capacity\n\n",
            "## Identified Issue\n\n",
            "Your connection pool is at **95% capacity**. ",
            "This can cause connection timeouts.\n\n",
            "## Recommended Solution\n\n",
            "Update your configuration:\n\n",
            "```javascript\n",
            "const dbConfig = {\n",
            "  host: 'db.example.com',\n",
            "  pool: {\n",
            "    min: 5,\n",
            "    max: 20  // Increase from 10\n",
            "  },\n",
            "  idleTimeoutMillis: 30000,\n",
            "  connectionTimeoutMillis: 2000\n",
            "};\n",
            "```\n\n",
            "## Additional Steps\n\n",
            "1. **Restart the application** to apply changes\n",
            "2. **Monitor connection metrics** for 24 hours\n",
            "3. **Review slow queries** that may be holding connections\n\n",
            "This should resolve the connection issues. ",
            "Let me know if you need further assistance!"
        ],
        citations: [
            {
                type: "record",
                value: "case-2024-DB-001",
                inlineMetadata: [
                    { location: 120, claim: "System diagnostics" }
                ]
            },
            {
                type: "link",
                value: "https://docs.example.com/database/pooling",
                inlineMetadata: [
                    { location: 250, claim: "Connection pooling guide" }
                ]
            },
            {
                type: "link",
                value: "https://monitoring.example.com",
                inlineMetadata: [
                    { location: 500, claim: "Monitoring dashboard" }
                ]
            }
        ]
    }
};

// Cursor constants (from codebase)
const CURSOR_MARKER = '<span style="user-select:none;pointer-events:none;font-weight:400;color:black;font-size:1.35em;line-height:0">▏</span>';
const CURSOR_MARKER_CODE = '▏';
const CURSOR_BLINK_MS = 500;

// State
let currentTypewriter = null;
let currentMessageBubble = null;
let currentDemo = 'citations';
let cursorBlinkOn = true;
let blinkInterval = null;

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const citationsContainer = document.getElementById('citationsContainer');
const demoSelect = document.getElementById('demoSelect');
const speedInput = document.getElementById('speedInput');
const delayInput = document.getElementById('delayInput');
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skipBtn');
const clearBtn = document.getElementById('clearBtn');

// Event listeners
demoSelect.addEventListener('change', (e) => {
    currentDemo = e.target.value;
});

startBtn.addEventListener('click', startStreaming);
skipBtn.addEventListener('click', skipStreaming);
clearBtn.addEventListener('click', clearChat);

/**
 * Check if text currently ends inside an unclosed fenced code block
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
 * @param {string} text
 * @returns {string}
 */
function getCursor(text) {
    return isInsideCodeBlock(text) ? CURSOR_MARKER_CODE : CURSOR_MARKER;
}

// Add message bubble to chat
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

// Render citations panel
function renderCitations(citations) {
    citationsContainer.innerHTML = '';

    if (!citations || citations.length === 0) {
        citationsContainer.innerHTML = '<p style="color: #999; font-size: 12px;">No citations</p>';
        return;
    }

    citations.forEach((citation, index) => {
        const card = document.createElement('div');
        card.className = 'citation-card';
        card.innerHTML = `
            <div>
                <span class="citation-number">${index + 1}</span>
                <span class="citation-type ${citation.type}">${citation.type}</span>
            </div>
            <div class="citation-value" title="${citation.value}">
                ${citation.value}
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.add('active');
            setTimeout(() => card.classList.remove('active'), 2000);
        });

        citationsContainer.appendChild(card);
    });
}

// Add link click listeners to markdown content
function addMarkdownLinkListeners(container) {
    const links = container.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const text = link.textContent;

            // Citation link
            if (href === '#' && text.match(/\[\d+\]/)) {
                e.preventDefault();
                const sourceId = extractSourceId(text);
                handleCitationClick(sourceId);
            }
            // Regular link
            else if (href !== '#') {
                e.preventDefault();
                if (confirm(`Open link: ${href}?`)) {
                    window.open(href, '_blank');
                }
            }
        });
    });
}

// Handle citation click
function handleCitationClick(sourceId) {
    const cards = citationsContainer.querySelectorAll('.citation-card');
    cards.forEach((card, index) => {
        if (index === sourceId - 1) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => card.classList.remove('active'), 2000);
        }
    });
}

/**
 * Start cursor blinking (only when idle)
 */
function startCursorBlink() {
    if (blinkInterval) return;
    cursorBlinkOn = true;

    blinkInterval = setInterval(() => {
        // Only blink when animation is idle
        if (currentTypewriter && !currentTypewriter.isAnimating()) {
            cursorBlinkOn = !cursorBlinkOn;
            updateMarkdownWithCursor();
        }
    }, CURSOR_BLINK_MS);
}

/**
 * Stop cursor blinking
 */
function stopCursorBlink() {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
}

/**
 * Update markdown content with cursor
 * Follows the exact order from codebase:
 * 1. Get raw text
 * 2. Insert citation markers
 * 3. Add cursor to raw text
 * 4. Parse markdown
 * 5. Sanitize
 */
function updateMarkdownWithCursor() {
    if (!currentMessageBubble || !currentTypewriter) return;

    let text = currentTypewriter.getDisplayedText();
    const citations = STREAMING_DEMOS[currentDemo].citations;

    // Step 1: Insert citations into raw markdown
    if (citations && citations.length > 0) {
        text = insertCitationsMarkers(text, citations, 'View source {0}');
    }

    // Step 2: Add cursor to raw markdown text BEFORE parsing
    const cursorVisible = currentTypewriter.isAnimating() || currentTypewriter.hasPendingContent();
    if (cursorVisible && cursorBlinkOn) {
        text = text + getCursor(text);
    }

    // Step 3: Parse markdown
    let html = marked.parse(text);

    // Step 4: Sanitize (cursor HTML will be preserved because span + style are whitelisted)
    html = sanitizeHTML(html);

    currentMessageBubble.innerHTML = html;

    // Add link listeners
    addMarkdownLinkListeners(currentMessageBubble);
}

// Start streaming
function startStreaming() {
    // Cleanup previous
    if (currentTypewriter) {
        currentTypewriter.destroy();
    }
    stopCursorBlink();

    const demo = STREAMING_DEMOS[currentDemo];

    // Add user message
    addMessage('user', demo.userMessage);

    // Create assistant message bubble
    currentMessageBubble = addMessage('assistant', '');

    // Render citations immediately
    renderCitations(demo.citations);

    // Get settings
    const charsPerFrame = parseInt(speedInput.value);
    const frameDelayMs = parseInt(delayInput.value);

    // Reset cursor state
    cursorBlinkOn = true;

    // Create typewriter with markdown rendering
    currentTypewriter = new TypewriterService(
        (text) => {
            // During active animation, cursor stays solid (no blink)
            cursorBlinkOn = true;
            updateMarkdownWithCursor();

            // Auto-scroll
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        {
            isMarkdown: true,
            onCursorChange: (visible) => {
                if (visible) {
                    startCursorBlink();
                } else {
                    stopCursorBlink();
                    updateMarkdownWithCursor();
                }
            }
        }
    );

    // Update config
    currentTypewriter.updateConfig({ charsPerFrame, frameDelayMs });

    // UI state
    startBtn.disabled = true;
    skipBtn.disabled = false;

    // Start cursor blinking
    startCursorBlink();

    // Simulate streaming
    simulateStreaming(demo.chunks);
}

// Simulate streaming chunks
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
        currentTypewriter.addChunk(chunk);
        chunkIndex++;

        // Random delay between chunks
        const delay = Math.random() * 400 + 300; // 300-700ms
        setTimeout(sendNextChunk, delay);
    }

    sendNextChunk();
}

// Skip streaming
function skipStreaming() {
    if (currentTypewriter) {
        currentTypewriter.skipToEnd();
        stopCursorBlink();
        updateMarkdownWithCursor();
        skipBtn.disabled = true;
        startBtn.disabled = false;
    }
}

// Clear chat
function clearChat() {
    chatContainer.innerHTML = '';
    citationsContainer.innerHTML = '<p style="color: #999; font-size: 12px;">Citations will appear during streaming</p>';

    stopCursorBlink();

    if (currentTypewriter) {
        currentTypewriter.destroy();
        currentTypewriter = null;
    }

    currentMessageBubble = null;
    startBtn.disabled = false;
    skipBtn.disabled = true;
}

// Initial welcome message
window.addEventListener('DOMContentLoaded', () => {
    const welcome = addMessage('assistant', '');
    welcome.innerHTML = `
        <strong>Welcome to the Streaming Markdown Chat Demo! 👋</strong><br><br>
        This demo combines:<br>
        • <strong>TypewriterService</strong> - Character-by-character animation<br>
        • <strong>BaseMarkdownText</strong> - Markdown rendering with citations<br>
        • <strong>Live formatting</strong> - See markdown as it streams<br><br>
        Select a demo type and click "Start Streaming" to see it in action!
    `;
});
