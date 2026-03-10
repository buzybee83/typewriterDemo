# Typewriter Demo - LWC Version

A Lightning Web Component (LWC) implementation of the streaming markdown demo with typewriter effect.

## 📁 Component Structure

```
lwc-demo/
└── typewriterDemo/
    ├── typewriterDemo.html       # Component template
    ├── typewriterDemo.js          # Component controller
    ├── typewriterDemo.css         # Component styles
    └── typewriterDemo.js-meta.xml # Component metadata
```

## 🔧 Installation

### Option 1: Copy to Your Codebase

Copy the `typewriterDemo` folder to your LWC directory:

```bash
# If in packages/acc-lex-components/src/lwc/
cp -r /Users/gmoreira/typewriter-demo/lwc-demo/typewriterDemo ./

# Or in packages/cwc-components/src/lwc/
cp -r /Users/gmoreira/typewriter-demo/lwc-demo/typewriterDemo ./
```

### Option 2: Add to Existing Package

1. Copy `typewriterDemo` folder to your LWC components directory
2. Component will be available as `<namespace-typewriter-demo>` in templates

## 📦 Dependencies

This component requires these imports from your codebase:

```javascript
import { TypewriterService } from 'runtime_copilot_base/common';
// Used by: runtime_copilot_base-base-markdown-text component
```

The component also expects `runtime_copilot_base-base-markdown-text` to be available.

## 🎯 Usage

### In App Builder / Lightning Page

1. Navigate to App Builder
2. Add "Typewriter Demo" component to page
3. Save and activate

### In Another LWC Component

```html
<template>
    <namespace-typewriter-demo></namespace-typewriter-demo>
</template>
```

## ✨ Features

### Exact POC Implementation

- **TypewriterService** - Character-by-character animation (from `runtime_copilot_base/common`)
- **BaseMarkdownText** - Live markdown parsing and rendering
- **StreamObserver pattern** - Simulates streaming without LLM connection
- **Cursor blinking** - JavaScript-driven blink during idle pauses
- **Inline cursor** - HTML cursor with `line-height:0` for proper positioning

### Performance Tracking

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

### Configurable Settings

- **Speed** - Characters per frame (1-10)
- **Frame Delay** - Milliseconds between frames (16-100ms)

## 🎮 Controls

- **Start Streaming** - Begin the cake recipe animation
- **Skip Animation** - Jump to end of animation
- **Clear Chat** - Reset the demo

## 📊 Mock Data

Uses exact chunks from codebase:
```
packages/acc-lex-components/src/lwc/runtime_copilot/mockLibrary/mockData/markdown.js
```

The vanilla cake recipe with 98 chunks (~1600 characters) including:
- Headers (###)
- Lists (unordered and ordered)
- Bold text (**text**)
- Hyperlinks ([text](url))

## 🔍 How It Works

### 1. Simulated Streaming
```javascript
simulateStreaming(chunks) {
    // Sends chunks with random delays (100-250ms)
    // Mimics real LLM streaming behavior
}
```

### 2. TypewriterService Integration
```javascript
this._typewriterService = new TypewriterService(
    (animatedText) => {
        // Callback: update value with cursor
        host.childComponent.value = valueToSet;
    },
    { isMarkdown: true }
);
```

### 3. Value Flow
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

## 🎨 Customization

### Adjust Animation Speed

In `typewriterDemo.js`:
```javascript
charsPerFrame = 2;  // Change from 1 to 2-3 for smoother animation
frameDelayMs = 50;  // Change from 40 to 50-60ms for less jitter
```

### Modify Mock Content

Replace `CAKE_RECIPE_CHUNKS` array with your own content chunks.

### Styling

Edit `typewriterDemo.css` to match your design system:
- Message bubble colors
- Font sizes
- Spacing
- Animations

## 🚧 Differences from Production POC

✅ **Same:**
- TypewriterService logic
- Cursor implementation
- Markdown parsing flow
- Performance characteristics

⚠️ **Different:**
- Simulated streaming (no real LLM)
- Self-contained (no MessageContext wire)
- No citation support
- Simplified StreamObserver pattern

## 💡 Recommended Settings

For best smoothness with live markdown:
- **Speed:** 2-3 chars/frame
- **Frame Delay:** 50-60ms

This reduces parse operations while maintaining responsive feel.

## 🐛 Troubleshooting

### Component not found
Make sure `runtime_copilot_base-base-markdown-text` is available in your namespace.

### TypewriterService import fails
Check that `runtime_copilot_base/common` exports TypewriterService.

### Jittery animation
Try increasing chars/frame (2-3) and frame delay (50-60ms).

### Cursor not showing
Verify cursor HTML is not being stripped by sanitization.

## 📝 Notes

- This is a **standalone demo component** for testing purposes
- Not intended for production use without integration into your app's context
- Performance metrics are approximate (parse times not tracked from BaseMarkdownText)
- Uses LWC best practices (@track, @api, lifecycle hooks)

## 🔗 Related Files in Codebase

- `runtime_copilot_base/streamObserver/streamObserver.js` - Production implementation
- `runtime_copilot_base/streamObserver/util.js` - TypewriterService initialization
- `runtime_copilot_base/common/typewriterService.js` - Core service
- `runtime_copilot_base/baseMarkdownText/` - Markdown rendering component
