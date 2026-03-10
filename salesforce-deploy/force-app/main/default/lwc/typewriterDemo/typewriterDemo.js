import { LightningElement, track } from 'lwc';
import { TypewriterService } from 'c/typewriterService';

// Streaming Scenarios - mimicking ACC/CWC behavior
const STREAMING_SCENARIOS = {
    // Quick short response - fast streaming
    quickAnswer: {
        label: 'Quick Answer (Short)',
        userMessage: 'What is a CRM?',
        chunks: [
            'A CRM ', '(Customer ', 'Relationship ', 'Management) ', 'is a ', 'system ',
            'that helps ', 'businesses ', 'manage ', 'interactions ', 'with ', 'customers ',
            'and ', 'potential ', 'customers.'
        ],
        delay: { min: 50, max: 100 }
    },

    // Long detailed response - variable delays
    detailedAnswer: {
        label: 'Detailed Answer (Long)',
        userMessage: 'Can you help me make a cake?',
        chunks: [
            'Sure, I can help with that! ',
            "Here's a simple recipe for ",
            'a classic vanilla cake:\n\n',
            '### Ingredients:\n',
            '- 2 1/2 cups all-purpose flour\n',
            '- 2 1/2 tsp baking powder\n',
            '- 1/2 tsp salt\n',
            '- 1 1/4 cups unsalted butter, room temperature\n',
            '- 2 cups granulated sugar\n',
            '- 4 large eggs, room temperature\n',
            '- 1 tsp vanilla extract\n',
            '- 1 cup whole milk, room temperature\n\n',
            '### Instructions:\n',
            '1. **Preheat your oven** to 350°F (175°C). ',
            'Grease and flour two 9-inch round cake pans.\n',
            '2. **Mix dry ingredients**: ',
            'In a medium bowl, whisk together ',
            'the flour, baking powder, and salt.\n',
            '3. **Cream butter and sugar**: ',
            'In a large bowl, beat the butter and sugar ',
            'until light and fluffy.\n',
            '4. **Add eggs and vanilla**: ',
            'Beat in the eggs one at a time, ',
            'then stir in the vanilla extract.\n',
            '5. **Combine wet and dry**: ',
            'Gradually add the flour mixture ',
            'to the butter mixture, alternating with the milk. ',
            'Begin and end with the flour mixture. ',
            'Mix until just combined.\n',
            '6. **Bake**: Divide the batter evenly ',
            'between the prepared pans. ',
            'Bake for 25-30 minutes, or until ',
            'a toothpick into the center comes out clean.\n',
            '7. **Cool**: Allow the cakes to cool completely.\n\n',
            '### Optional Frosting:\n',
            'You can frost your cake with ',
            'your favorite frosting. ',
            'A simple buttercream or ',
            'cream cheese frosting works great!\n\n',
            'This is a [hyperlink text](https://example.com) ',
            'Enjoy your homemade vanilla cake!'
        ],
        delay: { min: 100, max: 250 }
    },

    // Mixed chunk sizes - some short, some long
    mixedChunks: {
        label: 'Mixed Chunks',
        userMessage: 'Tell me about Salesforce',
        chunks: [
            'Salesforce is ', 'a leading ', 'cloud-based ', 'CRM platform.\n\n',
            '**Key Features:**\n',
            '- Sales Cloud: Manage your sales pipeline and customer relationships\n',
            '- Service Cloud: Provide excellent customer support\n',
            '- Marketing Cloud: Create personalized marketing campaigns\n',
            '- Platform: Build custom apps with Lightning and Apex\n\n',
            'It helps businesses of all sizes ', 'connect with customers, ',
            'streamline processes, ', 'and boost productivity.'
        ],
        delay: { min: 80, max: 200 }
    },

    // Mid-stream error scenario
    errorRecovery: {
        label: 'Error Recovery',
        userMessage: 'Explain quantum computing',
        chunks: [
            'Quantum computing ', 'is a revolutionary ', 'technology that ',
            'uses principles of ', 'quantum mechanics ',
            // ERROR MARKER - will be detected and trigger replacement
            '__ERROR__',
            'to process information.'
        ],
        replacementChunks: [
            "It seems I'm unable to access the help documentation at the moment. ",
            "Would you like me to escalate this issue to a live agent for further assistance?"
        ],
        delay: { min: 120, max: 180 }
    },

    // Code example with fast streaming
    codeExample: {
        label: 'Code Example (Fast)',
        userMessage: 'Show me a JavaScript function',
        chunks: [
            "Here's a ", 'simple ', 'JavaScript ', 'function:\n\n',
            '```javascript\n',
            'function ', 'calculateTotal', '(items) {\n',
            '  return ', 'items.reduce', '((sum, item) => ', 'sum + item.price', ', 0);\n',
            '}\n',
            '```\n\n',
            'This function ', 'calculates ', 'the total price ', 'of all items ',
            'in an array.'
        ],
        delay: { min: 40, max: 80 }
    },

    // Slow thinking response
    slowThinking: {
        label: 'Slow Thinking',
        userMessage: 'What is the meaning of life?',
        chunks: [
            'This is ', 'a profound ', 'question...\n\n',
            'The meaning of life ', 'varies for each ', 'individual, ',
            'but many find ', 'purpose through:\n\n',
            '- **Relationships**: ', 'Connecting with ', 'others\n',
            '- **Growth**: ', 'Learning and ', 'self-improvement\n',
            '- **Contribution**: ', 'Making a positive ', 'impact\n',
            '- **Joy**: ', 'Finding moments ', 'of happiness\n\n',
            'Ultimately, ', 'meaning is ', 'something we ', 'create through ',
            'our choices ', 'and actions.'
        ],
        delay: { min: 200, max: 400 }
    },

    // Realistic code explanation with multiple code blocks
    realisticCode: {
        label: 'Realistic Code Stream',
        userMessage: 'How do I create a REST API endpoint in Node.js?',
        chunks: [
            "I'll help you create a REST API endpoint in Node.js using Express. ",
            "Here's a complete example:\n\n",
            "## 1. Install Dependencies\n\n",
            "First, install Express:\n\n",
            "```bash\n",
            "npm install express\n",
            "```\n\n",
            "## 2. Create the Server\n\n",
            "Here's a basic Express server with a REST endpoint:\n\n",
            "```javascript\n",
            "const express = require('express');\n",
            "const app = express();\n",
            "const PORT = 3000;\n\n",
            "// Middleware to parse JSON\n",
            "app.use(express.json());\n\n",
            "// Sample data\n",
            "let users = [\n",
            "  { id: 1, name: 'Alice', email: 'alice@example.com' },\n",
            "  { id: 2, name: 'Bob', email: 'bob@example.com' }\n",
            "];\n\n",
            "// GET endpoint - retrieve all users\n",
            "app.get('/api/users', (req, res) => {\n",
            "  res.json(users);\n",
            "});\n\n",
            "// GET endpoint - retrieve single user\n",
            "app.get('/api/users/:id', (req, res) => {\n",
            "  const user = users.find(u => u.id === parseInt(req.params.id));\n",
            "  if (!user) {\n",
            "    return res.status(404).json({ error: 'User not found' });\n",
            "  }\n",
            "  res.json(user);\n",
            "});\n\n",
            "// POST endpoint - create new user\n",
            "app.post('/api/users', (req, res) => {\n",
            "  const newUser = {\n",
            "    id: users.length + 1,\n",
            "    name: req.body.name,\n",
            "    email: req.body.email\n",
            "  };\n",
            "  users.push(newUser);\n",
            "  res.status(201).json(newUser);\n",
            "});\n\n",
            "// Start server\n",
            "app.listen(PORT, () => {\n",
            "  console.log(`Server running on http://localhost:${PORT}`);\n",
            "});\n",
            "```\n\n",
            "## 3. Test the API\n\n",
            "You can test your endpoints using curl:\n\n",
            "```bash\n",
            "# Get all users\n",
            "curl http://localhost:3000/api/users\n\n",
            "# Get single user\n",
            "curl http://localhost:3000/api/users/1\n\n",
            "# Create new user\n",
            "curl -X POST http://localhost:3000/api/users \\\n",
            "  -H \"Content-Type: application/json\" \\\n",
            "  -d '{\"name\":\"Charlie\",\"email\":\"charlie@example.com\"}'\n",
            "```\n\n",
            "This creates a basic REST API with:\n",
            "- **GET /api/users** - Returns all users\n",
            "- **GET /api/users/:id** - Returns a specific user\n",
            "- **POST /api/users** - Creates a new user\n\n",
            "You can extend this with PUT and DELETE endpoints for a complete CRUD API."
        ],
        delay: { min: 100, max: 180 }
    }
};

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
    chatMaxWidth = 480;
    isStreaming = false;
    skipDisabled = true;
    selectedScenario = 'quickAnswer';
    isChatMinimized = true;
    showQueueStats = true;
    showAdvancedSettings = false;

    // Advanced TypewriterService Config
    charsPerFrameMedium = 3;
    charsPerFrameHigh = 4;
    charsPerFrameCatchingUp = 5;
    queueThresholdMedium = 45;
    queueThresholdHigh = 80;
    queueThresholdCritical = 120;
    maxAnimationTimeMs = 10000;
    idleCursorTimeoutMs = 1500;
    rushToEndDurationMs = 5000;

    @track queueStats = {
        queueLength: 0,
        queuedChars: 0,
        remainingInCurrent: 0,
        totalPending: 0,
        currentSpeed: 0,
        isAnimating: false,
        rushMode: false,
        statusText: 'Idle'
    };

    // Custom scenario management
    @track customScenarios = {};
    @track showCustomScenarioForm = false;
    @track customScenarioTitle = '';
    @track customScenarioJson = '';
    @track customScenarioError = '';

    _typewriterService = null;
    _streamObserverHost = null;
    _messageId = 0;
    _performanceStats = {
        frameCount: 0,
        startTime: 0,
        parseTimes: [],
        scrollThrottle: 0
    };
    _currentAssistantMsgId = null;
    _errorRecoveryTriggered = false;
    _markdownParseTimes = [];

    // Scenario options for dropdown (built-in + custom)
    get scenarioOptions() {
        const builtInOptions = Object.keys(STREAMING_SCENARIOS).map(key => ({
            label: STREAMING_SCENARIOS[key].label,
            value: key
        }));

        const customOptions = Object.keys(this.customScenarios).map(key => ({
            label: `${this.customScenarios[key].label} (Custom)`,
            value: `custom_${key}`
        }));

        return [...builtInOptions, ...customOptions];
    }

    get hasCustomScenarios() {
        return Object.keys(this.customScenarios).length > 0;
    }

    get customScenariosArray() {
        return Object.keys(this.customScenarios).map(key => ({
            key,
            label: this.customScenarios[key].label
        }));
    }

    get chatWidthStyle() {
        return `max-width: ${this.chatMaxWidth}px`;
    }

    get actionButtonsDisabled() {
        return this.isChatMinimized || this.isStreaming;
    }

    get skipButtonDisabled() {
        return this.isChatMinimized || this.skipDisabled;
    }

    get scenarioControlsDisabled() {
        return this.isChatMinimized || this.isStreaming;
    }

    get advancedSettingsLabel() {
        return this.showAdvancedSettings ? 'Hide Advanced Settings' : 'Show Advanced Settings';
    }

    get advancedSettingsIcon() {
        return this.showAdvancedSettings ? 'utility:chevronup' : 'utility:chevrondown';
    }

    get exampleScenarioJson() {
        return `{
  "userMessage": "Hello, how are you?",
  "chunks": [
    "I'm doing ",
    "great! ",
    "Thanks for ",
    "asking."
  ],
  "delay": {
    "min": 100,
    "max": 200
  }
}`;
    }

    get queueBarStyle() {
        const maxChars = this.queueThresholdCritical;
        const percentage = Math.min(100, (this.queueStats.totalPending / maxChars) * 100);
        let color = '#28a745'; // Green

        if (this.queueStats.totalPending > this.queueThresholdHigh) {
            color = '#dc3545'; // Red
        } else if (this.queueStats.totalPending > this.queueThresholdMedium) {
            color = '#ffc107'; // Yellow
        }

        return `width: ${percentage}%; background-color: ${color};`;
    }

    get queueStatusClass() {
        if (!this.queueStats.isAnimating) return 'stat-value status-idle';
        if (this.queueStats.rushMode) return 'stat-value status-rush';
        if (this.queueStats.totalPending > this.queueThresholdHigh) {
            return 'stat-value status-catching-up';
        }
        return 'stat-value status-normal';
    }

    toggleQueueStats() {
        this.showQueueStats = !this.showQueueStats;
    }

    handleMarkdownParsed(event) {
        const { parseTime } = event.detail;
        this._markdownParseTimes.push(parseTime);
        this.updateStatsDisplay();
    }

    connectedCallback() {
        // Load custom scenarios from localStorage
        this.loadCustomScenarios();
    }

    toggleChatMinimized() {
        this.isChatMinimized = !this.isChatMinimized;

        // Add welcome message when first opened
        if (!this.isChatMinimized && this.messages.length === 0) {
            this.addMessage(false, `**Welcome to Streaming Markdown Demo**\n\nThis demo showcases:\n• 6 built-in streaming scenarios\n• Custom scenario creation\n• Live markdown rendering\n• Performance metrics\n\nSelect a scenario from the left panel and click "Start Streaming" to begin!`);
        }
    }

    loadCustomScenarios() {
        try {
            const stored = localStorage.getItem('typewriter_custom_scenarios');
            if (stored) {
                this.customScenarios = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load custom scenarios:', e);
            this.customScenarios = {};
        }
    }

    saveCustomScenarios() {
        try {
            localStorage.setItem('typewriter_custom_scenarios', JSON.stringify(this.customScenarios));
        } catch (e) {
            console.error('Failed to save custom scenarios:', e);
        }
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

    handleMaxWidthChange(event) {
        this.chatMaxWidth = parseInt(event.target.value, 10);
    }

    toggleAdvancedSettings() {
        this.showAdvancedSettings = !this.showAdvancedSettings;
    }

    handleMediumSpeedChange(event) {
        this.charsPerFrameMedium = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.CHARS_PER_FRAME_MEDIUM = this.charsPerFrameMedium;
    }

    handleHighSpeedChange(event) {
        this.charsPerFrameHigh = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.CHARS_PER_FRAME_HIGH = this.charsPerFrameHigh;
    }

    handleCatchUpSpeedChange(event) {
        this.charsPerFrameCatchingUp = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.CHARS_PER_FRAME_CATCHING_UP = this.charsPerFrameCatchingUp;
    }

    handleThresholdMediumChange(event) {
        this.queueThresholdMedium = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.QUEUE_THRESHOLD_MEDIUM = this.queueThresholdMedium;
    }

    handleThresholdHighChange(event) {
        this.queueThresholdHigh = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.QUEUE_THRESHOLD_HIGH = this.queueThresholdHigh;
    }

    handleThresholdCriticalChange(event) {
        this.queueThresholdCritical = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.QUEUE_THRESHOLD_CRITICAL = this.queueThresholdCritical;
    }

    handleMaxAnimationTimeChange(event) {
        this.maxAnimationTimeMs = parseInt(event.target.value, 10);
        TypewriterService.CONFIG.MAX_ANIMATION_TIME_MS = this.maxAnimationTimeMs;
    }

    handleIdleCursorTimeoutChange(event) {
        this.idleCursorTimeoutMs = parseInt(event.target.value, 10);
        TypewriterService.IDLE_CURSOR_TIMEOUT_MS = this.idleCursorTimeoutMs;
    }

    handleRushToEndDurationChange(event) {
        this.rushToEndDurationMs = parseInt(event.target.value, 10);
    }

    handleScenarioChange(event) {
        this.selectedScenario = event.target.value;
    }

    toggleCustomScenarioForm() {
        this.showCustomScenarioForm = !this.showCustomScenarioForm;
        if (!this.showCustomScenarioForm) {
            this.resetCustomScenarioForm();
        }
    }

    resetCustomScenarioForm() {
        this.customScenarioTitle = '';
        this.customScenarioJson = '';
        this.customScenarioError = '';
    }

    handleCustomTitleChange(event) {
        this.customScenarioTitle = event.target.value;
    }

    handleCustomJsonChange(event) {
        this.customScenarioJson = event.target.value;
        this.customScenarioError = '';
    }

    saveCustomScenario() {
        // Validate title
        if (!this.customScenarioTitle.trim()) {
            this.customScenarioError = 'Title is required';
            return;
        }

        // Validate and parse JSON
        let scenarioData;
        try {
            scenarioData = JSON.parse(this.customScenarioJson);
        } catch (e) {
            this.customScenarioError = `Invalid JSON: ${e.message}`;
            return;
        }

        // Validate required fields
        if (!scenarioData.userMessage) {
            this.customScenarioError = 'JSON must include "userMessage" field';
            return;
        }
        if (!Array.isArray(scenarioData.chunks) || scenarioData.chunks.length === 0) {
            this.customScenarioError = 'JSON must include "chunks" array with at least one item';
            return;
        }
        if (!scenarioData.delay || !scenarioData.delay.min || !scenarioData.delay.max) {
            this.customScenarioError = 'JSON must include "delay" object with "min" and "max" properties';
            return;
        }

        // Create scenario key from title
        const key = this.customScenarioTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');

        // Save scenario
        this.customScenarios = {
            ...this.customScenarios,
            [key]: {
                label: this.customScenarioTitle,
                ...scenarioData
            }
        };
        this.saveCustomScenarios();

        // Reset form and close
        this.resetCustomScenarioForm();
        this.showCustomScenarioForm = false;

        // Select the new scenario
        this.selectedScenario = `custom_${key}`;
    }

    deleteCustomScenario(event) {
        const key = event.target.dataset.key;
        const newScenarios = { ...this.customScenarios };
        delete newScenarios[key];
        this.customScenarios = newScenarios;
        this.saveCustomScenarios();

        // If deleted scenario was selected, switch to default
        if (this.selectedScenario === `custom_${key}`) {
            this.selectedScenario = 'quickAnswer';
        }
    }

    addMessage(isUser, content) {
        const messageId = `msg-${this._messageId++}`;
        const message = {
            id: messageId,
            isUser,
            isAssistant: !isUser,
            content,
            cssClass: isUser ? 'message user' : 'message assistant'
        };
        this.messages = [...this.messages, message];
        return messageId;
    }

    updateMessageContent(messageId, content) {
        // Create a new array with updated message content to trigger reactivity
        this.messages = this.messages.map(msg => {
            if (msg.id === messageId) {
                return { ...msg, content };
            }
            return msg;
        });
    }

    removeMessage(messageId) {
        this.messages = this.messages.filter(msg => msg.id !== messageId);
    }

    async startStreaming() {
        // Open chat if minimized
        if (this.isChatMinimized) {
            this.isChatMinimized = false;
        }

        // Get selected scenario (built-in or custom)
        let scenario;
        if (this.selectedScenario.startsWith('custom_')) {
            const customKey = this.selectedScenario.substring(7); // Remove 'custom_' prefix
            scenario = this.customScenarios[customKey];
        } else {
            scenario = STREAMING_SCENARIOS[this.selectedScenario];
        }

        if (!scenario) {
            console.error('Invalid scenario selected');
            return;
        }

        // Cleanup previous
        if (this._typewriterService) {
            this._typewriterService.destroy();
        }

        // Reset flags
        this._errorRecoveryTriggered = false;

        // Reset stats for new message
        this._performanceStats = {
            frameCount: 0,
            startTime: performance.now(),
            parseTimes: [],
            scrollThrottle: 0
        };
        this._markdownParseTimes = [];
        this.updateStatsDisplay();

        // Add user message
        this.addMessage(true, scenario.userMessage);

        // Wait a brief moment for DOM to update
        await new Promise(resolve => setTimeout(resolve, 50));

        // Add assistant message (empty initially)
        this._currentAssistantMsgId = this.addMessage(false, '');

        // Wait for DOM update with longer delay to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Initialize TypewriterService (like initTypewriterService in util.js)
        this.initTypewriterService();

        // Update UI state
        this.isStreaming = true;
        this.skipDisabled = false;

        // Start simulated streaming with scenario-specific delays
        this.simulateStreaming(scenario.chunks, scenario.delay, scenario);
    }

    initTypewriterService() {
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

        const startBlink = () => {
            if (blinkInterval) return;
            cursorBlinkOn = true;
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            blinkInterval = setInterval(() => {
                if (this._typewriterService && !this._typewriterService.isAnimating()) {
                    cursorBlinkOn = !cursorBlinkOn;
                    // Update message content with blink
                    const text = this._typewriterService.getDisplayedText();
                    const valueToSet = cursorVisible && cursorBlinkOn
                        ? text + getCursor(text)
                        : text;
                    this.updateMessageContent(this._currentAssistantMsgId, valueToSet);
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

                // Update the message content directly
                this.updateMessageContent(this._currentAssistantMsgId, valueToSet);

                // Track performance
                this._performanceStats.frameCount++;
                this.updateStatsDisplay();

                // Update queue stats
                this.updateQueueStats();

                // Throttled scroll
                this._performanceStats.scrollThrottle++;
                if (this._performanceStats.scrollThrottle % 3 === 0) {
                    requestAnimationFrame(() => {
                        const messagesContainer = this.template.querySelector('.messages-container');
                        if (messagesContainer) {
                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        }
                    });
                }
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

    simulateStreaming(chunks, delayConfig, scenario) {
        let chunkIndex = 0;

        const sendNextChunk = () => {
            if (chunkIndex >= chunks.length) {
                // Stream complete - rush to finish any remaining content
                // If there's still content in the queue, speed up animation
                // to finish within configured duration instead of cutting it off abruptly
                if (this._typewriterService && this._typewriterService.hasPendingContent()) {
                    this._typewriterService.rushToEnd(this.rushToEndDurationMs);
                }
                this.isStreaming = false;
                this.skipDisabled = true;
                return;
            }

            const chunk = chunks[chunkIndex];

            // Check for error marker
            if (chunk === '__ERROR__' && !this._errorRecoveryTriggered) {
                this._errorRecoveryTriggered = true;
                // Trigger error recovery after a delay
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                setTimeout(() => {
                    this.handleMidStreamError(scenario);
                }, 1000);
                chunkIndex++;
                return;
            }

            this._typewriterService.addChunk(chunk);
            chunkIndex++;

            // Variable delay based on scenario
            const minDelay = delayConfig?.min || 100;
            const maxDelay = delayConfig?.max || 250;
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;

            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(sendNextChunk, delay);
        };

        sendNextChunk();
    }

    handleMidStreamError(scenario) {
        // Detect message replacement: the error replaces the streaming message
        // This matches the codebase pattern in streamObserver/util.js

        // Reset TypewriterService to stop animation
        if (this._typewriterService) {
            this._typewriterService.reset();
        }

        // Show the replacement message immediately (no animation for error messages)
        // Join all replacement chunks to form the complete error/replacement message
        const replacementMessage = scenario.replacementChunks
            ? scenario.replacementChunks.join('')
            : '⚠️ An error occurred during streaming.';

        // Update the current message content immediately (no typewriter animation)
        this.updateMessageContent(this._currentAssistantMsgId, replacementMessage);

        // Mark streaming as complete
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.isStreaming = false;
            this.skipDisabled = true;
        }, 500);
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

        // Don't reset stats - keep them visible until next message
        // This allows analyzing performance of the last message

        // Only reset queue stats to show idle state
        this.queueStats = {
            queueLength: 0,
            queuedChars: 0,
            remainingInCurrent: 0,
            totalPending: 0,
            currentSpeed: 0,
            isAnimating: false,
            rushMode: false,
            statusText: 'Idle'
        };
    }

    updateStatsDisplay() {
        const elapsed = this._performanceStats.startTime
            ? (performance.now() - this._performanceStats.startTime) / 1000
            : 0;

        const fps = elapsed > 0
            ? Math.round(this._performanceStats.frameCount / elapsed)
            : 0;

        // Calculate markdown parse times
        let parseAvg = 0;
        let parseMax = 0;
        if (this._markdownParseTimes.length > 0) {
            const sum = this._markdownParseTimes.reduce((a, b) => a + b, 0);
            parseAvg = sum / this._markdownParseTimes.length;
            parseMax = Math.max(...this._markdownParseTimes);
        }

        this.stats = {
            frames: this._performanceStats.frameCount,
            duration: elapsed.toFixed(1),
            chars: this._typewriterService?.getDisplayedText().length || 0,
            parseAvg: parseAvg.toFixed(2),
            parseMax: parseMax.toFixed(2),
            parseCount: this._markdownParseTimes.length,
            fps
        };
    }

    updateQueueStats() {
        if (this._typewriterService) {
            const stats = this._typewriterService.getQueueStats();

            let statusText = 'Idle';
            if (stats.isAnimating) {
                if (stats.rushMode) {
                    statusText = 'Rush Mode';
                } else if (stats.totalPending > this.queueThresholdHigh) {
                    statusText = 'Catching Up';
                } else if (stats.totalPending > this.queueThresholdMedium) {
                    statusText = 'Busy';
                } else {
                    statusText = 'Normal';
                }
            }

            this.queueStats = {
                ...stats,
                statusText
            };
        }
    }
}
