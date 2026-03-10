# Typewriter Demo - Salesforce LWC Deployment

Self-contained Lightning Web Component package for demonstrating the typewriter effect with live markdown rendering.

## 📦 Package Contents

This is a **self-contained package** (Option A) with no external Salesforce dependencies:

```
force-app/main/default/lwc/
├── typewriterService/           # Self-contained animation engine
│   ├── typewriterService.js     # Core TypewriterService class
│   └── typewriterService.js-meta.xml
│
├── baseMarkdownText/            # Self-contained markdown renderer
│   ├── baseMarkdownText.html    # Template with manual DOM
│   ├── baseMarkdownText.js      # Markdown parsing controller
│   ├── baseMarkdownText.css     # Exact styles from codebase
│   ├── baseMarkdownText.js-meta.xml
│   ├── sanitizeConfig.js        # DOMPurify config
│   └── lib/
│       └── marked.js            # Exact marked.js from codebase
│
└── typewriterDemo/              # Demo component
    ├── typewriterDemo.html      # Chat interface
    ├── typewriterDemo.js        # Controller with StreamObserver pattern
    ├── typewriterDemo.css       # UI styles
    └── typewriterDemo.js-meta.xml  # Exposed for Experience Cloud
```

## ✨ Features

### Exact POC Implementation
- **TypewriterService** - Character-by-character animation (from `runtime_copilot_base/common`)
- **BaseMarkdownText** - Live markdown parsing using exact `marked.js` from codebase
- **StreamObserver pattern** - Simulates streaming without LLM connection
- **Cursor blinking** - JavaScript-driven blink during idle pauses
- **Inline cursor** - HTML cursor with `line-height:0` for proper positioning

### Performance Testing
Real-time metrics displayed:
- **Frames** - Total animation frames rendered
- **Duration** - Streaming time in seconds
- **Chars** - Current character count
- **FPS** - Frames per second

### Jitter Reduction
- CSS `contain` for layout optimization
- GPU acceleration with `will-change`
- Throttled scrolling (every 3 frames)
- Smooth animations for new content

## 🚀 Deployment to Salesforce

### Prerequisites
- Salesforce org (Developer Edition, Sandbox, or Production)
- Salesforce CLI installed: `npm install -g @salesforce/cli`
- VS Code with Salesforce Extension Pack (recommended)

### Option 1: Quick Deploy with Salesforce CLI

1. **Authenticate to your org:**
   ```bash
   cd /Users/gmoreira/typewriter-demo/salesforce-deploy
   sf org login web --alias typewriter-demo
   ```

2. **Deploy to org:**
   ```bash
   sf project deploy start --target-org typewriter-demo
   ```

3. **Verify deployment:**
   ```bash
   sf project deploy report
   ```

### Option 2: VS Code Deploy

1. Open `/Users/gmoreira/typewriter-demo/salesforce-deploy` in VS Code
2. Connect to org: `Cmd+Shift+P` → "SFDX: Authorize an Org"
3. Right-click `force-app` folder → "SFDX: Deploy Source to Org"

### Option 3: Create Unlocked Package

1. **Create package:**
   ```bash
   sf package create \
     --name "Typewriter Demo" \
     --description "Streaming markdown typewriter demo" \
     --package-type Unlocked \
     --path force-app
   ```

2. **Create package version:**
   ```bash
   sf package version create \
     --package "Typewriter Demo" \
     --installation-key-bypass \
     --wait 20
   ```

3. **Install in target org:**
   ```bash
   sf package install --package <version-id> --target-org <org-alias>
   ```

## 🎯 Adding to Experience Cloud Site

After deployment:

1. **Navigate to Experience Builder:**
   - Setup → Digital Experiences → All Sites
   - Select your site (or create new one)
   - Click "Builder"

2. **Add Component to Page:**
   - Open page in Builder
   - In Components panel, search "Typewriter Demo"
   - Drag `c-typewriter-demo` to page
   - Component should be full-width for best experience

3. **Configure Site Permissions:**
   - In Builder, click Settings → Security & Privacy
   - Ensure guest users can access if needed

4. **Publish Site:**
   - Click "Publish" in top right
   - Visit site to test demo

## 🎮 Using the Demo

### Streaming Scenarios

The demo includes **6 different scenarios** that mimic ACC/CWC streaming behavior:

#### 1. **Quick Answer (Short)**
- Fast streaming with short response
- Delay: 50-100ms between chunks
- Example: "What is a CRM?"

#### 2. **Detailed Answer (Long)**
- Long detailed response with variable delays
- Delay: 100-250ms between chunks
- Example: Cake recipe (98 chunks, ~1600 characters)
- Includes headers, lists, bold text, and hyperlinks

#### 3. **Mixed Chunks**
- Combination of short and long chunks
- Delay: 80-200ms between chunks
- Example: Salesforce platform overview

#### 4. **Error Recovery** 🔴
- Demonstrates mid-stream error handling
- Shows error → replacement message flow
- Simulates connection interruption
- Automatically recovers with new message

#### 5. **Code Example (Fast)**
- Fast streaming with code blocks
- Delay: 40-80ms between chunks
- Tests markdown code fence parsing

#### 6. **Slow Thinking**
- Slow, deliberate streaming
- Delay: 200-400ms between chunks
- Simulates complex reasoning

### Controls
- **Scenario Selector** - Choose streaming scenario
- **Speed** - Characters per frame (1-10)
  - Lower = smoother but slower
  - Higher = faster but may feel choppy
- **Frame Delay** - Milliseconds between frames (16-100ms)
  - 16ms = ~60fps (fastest)
  - 40ms = ~25fps (default)
  - 60ms+ = noticeable delay
- **Start Streaming** - Begin selected scenario
- **Skip Animation** - Jump to end of animation
- **Clear Chat** - Reset the demo

### Recommended Settings
For best smoothness with live markdown:
- **Speed:** 2-3 chars/frame
- **Frame Delay:** 50-60ms

This reduces parse operations while maintaining responsive feel.

## 🔴 Error Recovery Flow

The **Error Recovery** scenario demonstrates mid-stream error handling:

1. **Normal Streaming** - Starts streaming like usual
2. **Error Detected** - Hits `__ERROR__` marker in chunk stream
3. **Connection Lost** - Shows "⚠️ Connection interrupted. Retrying..." message
4. **Recovery** - After 1.5s delay:
   - Removes error message
   - Resets TypewriterService
   - Creates new assistant message
   - Streams replacement content
5. **Complete** - Finishes with replacement message

This mimics real ACC/CWC behavior when:
- Network connection is interrupted
- LLM stream fails mid-response
- Backend needs to retry/regenerate

## 📊 Performance Metrics

The demo tracks:
- **Frames** - Number of animation frames rendered
- **Duration** - Total time elapsed during streaming
- **Chars** - Characters displayed so far
- **FPS** - Current frames per second

Parse times (Avg/Max) would require instrumentation in BaseMarkdownText.

## 🎯 Streaming Delay Patterns

Each scenario uses different delay patterns to mimic various streaming speeds:

| Scenario | Min Delay | Max Delay | Avg Delay | Purpose |
|----------|-----------|-----------|-----------|---------|
| Quick Answer | 50ms | 100ms | 75ms | Fast, responsive answers |
| Detailed Answer | 100ms | 250ms | 175ms | Realistic LLM streaming |
| Mixed Chunks | 80ms | 200ms | 140ms | Variable pacing |
| Error Recovery | 120ms | 180ms | 150ms | Moderate, with error |
| Code Example | 40ms | 80ms | 60ms | Fast code generation |
| Slow Thinking | 200ms | 400ms | 300ms | Thoughtful responses |

These delays simulate network latency and LLM token generation speed.

## 🔧 Technical Details

### TypewriterService
Self-contained animation engine with:
- Queue management for incoming chunks
- Adaptive speed (increases when queue builds)
- Cursor visibility callbacks
- Config: `FRAME_DELAY_MS`, `CHARS_PER_FRAME_*`, queue thresholds

### BaseMarkdownText
Simplified markdown renderer with:
- `marked.js` library (exact from codebase)
- DOMPurify sanitization via `lightning/purifyLib`
- Manual DOM updates with `lwc:dom="manual"`
- Exact CSS styles from `runtime_copilot_base/baseMarkdownText`

### StreamObserver Pattern
Simulates streaming without LLM:
- Sends chunks with random delays (100-250ms)
- Mimics real streaming behavior
- Uses exact cake recipe chunks from mockData

### Value Flow
```
TypewriterService.addChunk(delta)
    ↓
Callback: animatedText + cursor
    ↓
childComponent.value = text
    ↓
BaseMarkdownText.renderedCallback()
    ↓
marked.parse() → sanitizeHTML() → innerHTML
```

## 🐛 Troubleshooting

### Component not appearing in Experience Builder
- Check deployment: `sf project deploy report`
- Verify `isExposed=true` in typewriterDemo.js-meta.xml
- Refresh Builder page

### Errors during deployment
- Check API version compatibility (using 62.0)
- Ensure org has LWC enabled
- Review deployment errors: `sf project deploy report --verbose`

### Jittery animation
- Try increasing chars/frame (2-3)
- Increase frame delay (50-60ms)
- Check browser performance (GPU acceleration enabled)

### Cursor not showing
- Verify HTML cursor not being stripped by sanitization
- Check browser console for errors
- Ensure `line-height:0` style is applied

## 📝 Mock Data

Uses exact chunks from codebase:
```
packages/acc-lex-components/src/lwc/runtime_copilot/mockLibrary/mockData/markdown.js
```

The vanilla cake recipe with 98 chunks (~1600 characters) including:
- Headers (###)
- Lists (ordered and unordered)
- Bold text (**text**)
- Hyperlinks ([text](url))

## 🔗 Related Files in Original Codebase

- `runtime_copilot_base/common/typewriterService.js` - Original TypewriterService
- `runtime_copilot_base/baseMarkdownText/` - Original markdown component
- `runtime_copilot_base/streamObserver/` - Production implementation
- `runtime_copilot/mockLibrary/mockData/markdown.js` - Test data source

## 📄 License

This demo package is extracted from the ui-copilot-components codebase for testing purposes.
