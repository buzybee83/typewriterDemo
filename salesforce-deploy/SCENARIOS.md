# Streaming Scenarios - Technical Details

## Overview

The typewriter demo now includes 6 different streaming scenarios that mimic ACC/CWC behavior with:
- Variable chunk sizes (short and long phrases)
- Different delay patterns (fast to slow streaming)
- Mid-stream error recovery
- Realistic streaming simulation

## Scenario Definitions

### 1. Quick Answer (Short)
```javascript
userMessage: 'What is a CRM?'
chunks: 15 small chunks
delay: { min: 50, max: 100 }
```
**Purpose**: Fast, responsive answers for simple queries

**Behavior**:
- Very short response (~100 characters)
- Fast streaming (50-100ms delays)
- Tests quick rendering performance

---

### 2. Detailed Answer (Long)
```javascript
userMessage: 'Can you help me make a cake?'
chunks: 98 chunks (~1600 characters)
delay: { min: 100, max: 250 }
```
**Purpose**: Long-form content with markdown formatting

**Features**:
- Headers (###)
- Ordered and unordered lists
- Bold text (**text**)
- Hyperlinks ([text](url))
- Multiple paragraphs

**Behavior**:
- Realistic LLM streaming pace
- Tests markdown parsing performance
- Exercises adaptive speed (queue management)

---

### 3. Mixed Chunks
```javascript
userMessage: 'Tell me about Salesforce'
chunks: Mix of short/medium/long chunks
delay: { min: 80, max: 200 }
```
**Purpose**: Variable chunk sizes mimicking natural LLM output

**Chunk Patterns**:
- Short: 2-10 characters (words/phrases)
- Medium: 10-30 characters (sentences)
- Long: 30-80 characters (full blocks)

**Features**:
- Bold headers
- List formatting
- Multi-line chunks

---

### 4. Error Recovery
```javascript
userMessage: 'Explain quantum computing'
chunks: 6 chunks → __ERROR__ → 13 replacement chunks
delay: { min: 120, max: 180 }
```
**Purpose**: Demonstrate mid-stream error handling

**Error Flow**:
1. Normal streaming (6 chunks)
2. `__ERROR__` marker detected
3. Wait 1000ms
4. Show error message: "⚠️ Connection interrupted. Retrying..."
5. Wait 1500ms
6. Remove error message
7. Reset TypewriterService
8. Create new assistant message
9. Stream replacement content (13 chunks)

**Replacement Content**:
- Apologizes for error
- Provides complete answer
- Tests message replacement logic

---

### 5. Code Example (Fast)
```javascript
userMessage: 'Show me a JavaScript function'
chunks: 16 chunks with code fence
delay: { min: 40, max: 80 }
```
**Purpose**: Fast code generation with syntax

**Features**:
- Code fence (```)
- Inline cursor switches to plain-text inside code
- Fast streaming (40-80ms)

**Tests**:
- Code block detection
- Cursor rendering in code vs prose
- Fast markdown parsing

---

### 6. Slow Thinking
```javascript
userMessage: 'What is the meaning of life?'
chunks: 27 chunks
delay: { min: 200, max: 400 }
```
**Purpose**: Slow, thoughtful responses

**Behavior**:
- Very slow streaming (200-400ms delays)
- Gives impression of "thinking"
- Tests user patience and cursor blinking

---

## Implementation Details

### Chunk Stream Structure

All chunks are pre-split to simulate real streaming:

```javascript
const STREAMING_SCENARIOS = {
    scenarioName: {
        label: 'Display Name',
        userMessage: 'User prompt',
        chunks: ['chunk1', 'chunk2', ...],
        delay: { min: 100, max: 250 },
        replacementChunks: [...] // Optional for error recovery
    }
}
```

### Delay Calculation

```javascript
const minDelay = delayConfig?.min || 100;
const maxDelay = delayConfig?.max || 250;
const delay = Math.random() * (maxDelay - minDelay) + minDelay;
```

Random delays simulate:
- Network latency variation
- LLM token generation timing
- Backend processing time

### Error Detection

```javascript
if (chunk === '__ERROR__' && !this._errorRecoveryTriggered) {
    this._errorRecoveryTriggered = true;
    setTimeout(() => {
        this.handleMidStreamError(scenario);
    }, 1000);
    return;
}
```

### Message Replacement Flow

```javascript
handleMidStreamError(scenario) {
    // 1. Reset typewriter
    this._typewriterService.reset();
    
    // 2. Remove current message
    this.messages = this.messages.filter(...);
    
    // 3. Show error indicator
    const errorMsg = this.addMessage(...);
    
    // 4. After delay, replace
    setTimeout(async () => {
        // Remove error
        this.messages = this.messages.filter(...);
        
        // Add new message
        this._currentAssistantMsg = this.addMessage(false, '');
        
        // Reinit typewriter
        this.initTypewriterService();
        
        // Stream replacement
        this.simulateStreaming(scenario.replacementChunks, ...);
    }, 1500);
}
```

---

## UI Components

### Scenario Selector
```html
<lightning-combobox
    name="scenario"
    value={selectedScenario}
    options={scenarioOptions}
    onchange={handleScenarioChange}
    disabled={isStreaming}
></lightning-combobox>
```

Dynamically populated from `STREAMING_SCENARIOS` keys.

### Styling
```css
.scenario-selector {
    margin-bottom: 16px;
    padding: 12px;
    background: #f0f4ff;
    border-radius: 6px;
    border: 1px solid #b8d4ff;
}
```

---

## Testing Matrix

| Scenario | Chunk Count | Char Count | Markdown Features | Special Behavior |
|----------|-------------|------------|-------------------|------------------|
| Quick Answer | 15 | ~100 | None | Fast pace |
| Detailed Answer | 98 | ~1600 | Headers, lists, bold, links | Full markdown |
| Mixed Chunks | 12 | ~400 | Headers, lists | Variable chunks |
| Error Recovery | 6 + 13 | ~300 | Bold | Error → Replace |
| Code Example | 16 | ~250 | Code fence | Code cursor |
| Slow Thinking | 27 | ~600 | Headers, lists, bold | Very slow |

---

## Performance Characteristics

### Expected Streaming Times (with default config)

| Scenario | Expected Duration | FPS | Notes |
|----------|------------------|-----|-------|
| Quick Answer | 2-3 seconds | 20-25 | Fast, no queue buildup |
| Detailed Answer | 20-25 seconds | 20-25 | Long, queue management |
| Mixed Chunks | 5-8 seconds | 20-25 | Moderate length |
| Error Recovery | 8-12 seconds | 15-20 | Includes 2.5s pause |
| Code Example | 3-5 seconds | 25-30 | Fast, small chunks |
| Slow Thinking | 15-20 seconds | 15-20 | Very slow, many pauses |

*Actual times vary with user-configured speed/delay settings*

---

## Extending with New Scenarios

To add a new scenario:

1. **Add to STREAMING_SCENARIOS**:
```javascript
const STREAMING_SCENARIOS = {
    myScenario: {
        label: 'My Custom Scenario',
        userMessage: 'User prompt here',
        chunks: ['chunk1', 'chunk2', ...],
        delay: { min: 100, max: 200 }
    }
};
```

2. **Split long text into chunks**:
```javascript
// Manually split at natural boundaries
const text = "Hello world. This is a test.";
chunks: ['Hello ', 'world. ', 'This is ', 'a test.']

// Or split by character count
const chunkSize = 10;
const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g'));
```

3. **For error scenarios, add replacementChunks**:
```javascript
chunks: ['Starting...', '__ERROR__', 'end'],
replacementChunks: ['Retrying...', 'Success!']
```

4. **Test different delay patterns**:
```javascript
// Very fast
delay: { min: 20, max: 50 }

// Normal
delay: { min: 100, max: 250 }

// Slow
delay: { min: 300, max: 500 }
```

---

## Files Modified

- `typewriterDemo.js` - Added scenarios, error handling
- `typewriterDemo.html` - Added scenario selector
- `typewriterDemo.css` - Styled scenario selector
- `README.md` - Documented scenarios
- `SCENARIOS.md` - This file (technical details)
