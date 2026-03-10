import { LightningElement, track } from 'lwc';
import { TypewriterService } from 'runtime_copilot_base/common';

// Exact chunks from codebase mockData/markdown.js
const CAKE_RECIPE_CHUNKS = [
    'Sure, I ', 'can help ', 'with that!', " Here's a ", 'simple re', 'cipe for ',
    'a classic ', 'vanilla c', 'ake:\n\n###', ' Ingredie', 'nts:\n- 2 ', '1/2 cups ',
    'all-purpo', 'se flour\n', '- 2 1/2 ', 'tsp bakin', 'g powder\n', '- 1/2 tsp',
    ' salt\n- 1 ', '1/4 cups ', 'unsalted ', 'butter, ro', 'om tempe', 'rature\n- 2',
    ' cups gra', 'nulated s', 'ugar\n- 4 ', 'large egg', 's, room t', 'emperature',
    '\n- 1 tsp v', 'anilla ex', 'tract\n- 1', ' cup whole', ' milk, roo', 'm tempera',
    'ture\n\n###', ' Instructi', 'ons:\n1. *', '*Preheat ', 'your oven to 350°F',
    '(175°C). Grease', 'and flour two 9-in', 'ch round cake pans', '.\n2. **Mix dry',
    'ingredients**: In', ' a medium bowl,', ' whisk togeth', 'er the flour,',
    ' baking pow', 'der, and salt.', '\n3. **Cream but', 'ter and sugar:',
    ' In a large bowl,', ' beat the butter', 'and sugar until', ' light and fluffy.',
    '\n4. **Add eggs an', 'd vanilla**: Bea', 't in the eggs on', 'e at a time, the',
    'n stir in the va', 'nilla extract.', '\n5. **Combine we', 't and dry**: Gra',
    'dually add the f', 'lour mixture to ', 'the butter mixtu', 're, alternating ',
    'with the milk.', ' Begin and end w', 'ith the flour mix', 'ture. Mix until',
    ' just combined.', '\n6. **Bake**: Div', 'ide the batter e', 'venly between th',
    'e prepared pans.', ' Bake for 25-30', ' minutes, or unti', 'l a toothpick in',
    'to the center com', 'es out clean.\n7. **', 'Cool**: Allow th', 'e cakes to cool ',
    'completely.\n\n### O', 'ptional Frosting:\nY', 'ou can frost yo',
    'ur cake with you', 'r favorite frosting', '. A simple buttercr',
    'eam or cream che', 'ese frosting wor', 'ks great!\n\nThis i',
    's a [hyperlink tex', 't](https://example.com)', ' Enjoy your homemade',
    ' vanilla cake!'
];

export default class TypewriterDemo extends LightningElement {
    @track messages = [];
    @track stats = {
        frames: 0,
        duration: '0.0',
        chars: 0,
        parseAvg: '0.0',
        parseMax: '0.0',
        fps: 0
    };

    charsPerFrame = 1;
    frameDelayMs = 40;
    isStreaming = false;
    skipDisabled = true;

    _typewriterService = null;
    _streamObserverHost = null;
    _messageId = 0;
    _performanceStats = {
        frameCount: 0,
        startTime: 0,
        parseTimes: [],
        scrollThrottle: 0
    };

    connectedCallback() {
        // Add welcome message
        this.addMessage(false, `<strong>Streaming Markdown - LWC Demo</strong><br><br>
            This LWC component demonstrates:<br><br>
            • <strong>TypewriterService</strong> - from runtime_copilot_base/common<br>
            • <strong>BaseMarkdownText</strong> - live markdown rendering<br>
            • <strong>StreamObserver pattern</strong> - simulated streaming<br><br>
            Using exact chunks from mockLibrary/mockData/markdown.js<br><br>
            Click "Start Streaming" to begin!`);
    }

    disconnectedCallback() {
        if (this._typewriterService) {
            this._typewriterService.destroy();
        }
    }

    handleSpeedChange(event) {
        this.charsPerFrame = parseInt(event.target.value, 10);
    }

    handleDelayChange(event) {
        this.frameDelayMs = parseInt(event.target.value, 10);
    }

    addMessage(isUser, content) {
        const message = {
            id: `msg-${this._messageId++}`,
            isUser,
            isAssistant: !isUser,
            content,
            cssClass: isUser ? 'message user' : 'message assistant'
        };
        this.messages = [...this.messages, message];
        return message;
    }

    async startStreaming() {
        // Cleanup previous
        if (this._typewriterService) {
            this._typewriterService.destroy();
        }

        // Reset stats
        this._performanceStats = {
            frameCount: 0,
            startTime: performance.now(),
            parseTimes: [],
            scrollThrottle: 0
        };
        this.updateStatsDisplay();

        // Add user message
        this.addMessage(true, 'Can you help me make a cake?');

        // Add assistant message (empty initially)
        const assistantMsg = this.addMessage(false, '');

        // Wait for DOM update
        await new Promise(resolve => setTimeout(resolve, 0));

        // Get the child component (BaseMarkdownText)
        const childComponent = this.template.querySelector('[data-streaming-component]');

        if (!childComponent) {
            console.error('Child component not found');
            return;
        }

        // Create StreamObserver-like host
        this._streamObserverHost = {
            childComponent,
            isMarkdown: true,
            _previousStreamMessage: ''
        };

        // Initialize TypewriterService (like initTypewriterService in util.js)
        this.initTypewriterService();

        // Update UI state
        this.isStreaming = true;
        this.skipDisabled = false;

        // Start simulated streaming
        this.simulateStreaming(CAKE_RECIPE_CHUNKS);
    }

    initTypewriterService() {
        const host = this._streamObserverHost;

        // Cursor state
        let cursorVisible = false;
        let cursorBlinkOn = true;
        let blinkInterval = null;

        const CURSOR_MARKER = '<span style="user-select:none;pointer-events:none;font-weight:400;color:black;font-size:1.35em;line-height:0">▏</span>';
        const CURSOR_MARKER_CODE = '▏';
        const CURSOR_BLINK_MS = 500;

        // Check if inside code block
        const isInsideCodeBlock = (text) => {
            let inside = false;
            const lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trimStart().startsWith('```')) {
                    inside = !inside;
                }
            }
            return inside;
        };

        const getCursor = (text) => {
            return isInsideCodeBlock(text) ? CURSOR_MARKER_CODE : CURSOR_MARKER;
        };

        const flushValue = () => {
            if (!host.childComponent || !this._typewriterService) {
                return;
            }
            const text = this._typewriterService.getDisplayedText();
            const valueToSet = cursorVisible && cursorBlinkOn
                ? text + getCursor(text)
                : text;

            // Track performance (parsing happens in BaseMarkdownText.renderedCallback)
            this._performanceStats.frameCount++;
            this.updateStatsDisplay();

            // Throttled scroll
            this._performanceStats.scrollThrottle++;
            if (this._performanceStats.scrollThrottle % 3 === 0) {
                requestAnimationFrame(() => {
                    const chatContainer = this.template.querySelector('.chat-container');
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                });
            }

            host.childComponent.value = valueToSet;
        };

        const startBlink = () => {
            if (blinkInterval) return;
            cursorBlinkOn = true;
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            blinkInterval = setInterval(() => {
                if (this._typewriterService && !this._typewriterService.isAnimating()) {
                    cursorBlinkOn = !cursorBlinkOn;
                    flushValue();
                }
            }, CURSOR_BLINK_MS);
        };

        const stopBlink = () => {
            if (blinkInterval) {
                clearInterval(blinkInterval);
                blinkInterval = null;
            }
            cursorBlinkOn = true;
        };

        // Create TypewriterService
        this._typewriterService = new TypewriterService(
            (animatedText) => {
                const valueToSet = cursorVisible
                    ? animatedText + getCursor(animatedText)
                    : animatedText;

                // Track performance
                this._performanceStats.frameCount++;
                this.updateStatsDisplay();

                // Throttled scroll
                this._performanceStats.scrollThrottle++;
                if (this._performanceStats.scrollThrottle % 3 === 0) {
                    requestAnimationFrame(() => {
                        const chatContainer = this.template.querySelector('.chat-container');
                        if (chatContainer) {
                            chatContainer.scrollTop = chatContainer.scrollHeight;
                        }
                    });
                }

                host.childComponent.value = valueToSet;
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
        this._typewriterService.updateConfig({
            charsPerFrame: this.charsPerFrame,
            frameDelayMs: this.frameDelayMs
        });
    }

    simulateStreaming(chunks) {
        let chunkIndex = 0;

        const sendNextChunk = () => {
            if (chunkIndex >= chunks.length) {
                // Stream complete
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                setTimeout(() => {
                    if (this._typewriterService) {
                        this._typewriterService.skipToEnd();
                    }
                    this.isStreaming = false;
                    this.skipDisabled = true;
                }, 500);
                return;
            }

            const chunk = chunks[chunkIndex];
            this._typewriterService.addChunk(chunk);
            chunkIndex++;

            // Random delay between chunks
            const delay = Math.random() * 150 + 100;
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(sendNextChunk, delay);
        };

        sendNextChunk();
    }

    skipStreaming() {
        if (this._typewriterService) {
            this._typewriterService.skipToEnd();
            this.isStreaming = false;
            this.skipDisabled = true;
        }
    }

    clearChat() {
        this.messages = [];
        if (this._typewriterService) {
            this._typewriterService.destroy();
            this._typewriterService = null;
        }
        this.isStreaming = false;
        this.skipDisabled = true;
        this._performanceStats = {
            frameCount: 0,
            startTime: 0,
            parseTimes: [],
            scrollThrottle: 0
        };
        this.updateStatsDisplay();
    }

    updateStatsDisplay() {
        const elapsed = this._performanceStats.startTime
            ? (performance.now() - this._performanceStats.startTime) / 1000
            : 0;

        const fps = elapsed > 0
            ? Math.round(this._performanceStats.frameCount / elapsed)
            : 0;

        this.stats = {
            frames: this._performanceStats.frameCount,
            duration: elapsed.toFixed(1),
            chars: this._typewriterService?.getDisplayedText().length || 0,
            parseAvg: '0.0', // Would need to track in BaseMarkdownText
            parseMax: '0.0',
            fps
        };
    }
}
