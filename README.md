# Component Demos

Standalone demonstrations of streaming text components extracted from the ui-copilot-components codebase.

## 🎯 Demos Included

### 1. Typewriter Effect (`index.html`)
Demonstrates streaming text animation with character-by-character reveal.

**Features:**
- **Character-by-character animation** - Smooth reveal of streaming text
- **Adaptive speed** - Automatically speeds up when queue builds up
- **Blinking cursor** - Visual indicator during animation
- **Markdown support** - Live parsing with formatting preserved
- **Configurable** - Adjust animation speed and frame delay
- **Multiple demos** - See different content types in action

### 2. Markdown Renderer (`markdown-demo.html`)
Showcases markdown rendering with citations, sanitization, and link handling.

**Features:**
- **Citation markers** - Inline reference markers like [1], [2]
- **HTML sanitization** - Secure rendering with DOMPurify
- **Rich markdown** - Headers, lists, code blocks, tables, links
- **Link handling** - Click events and navigation
- **Event logging** - Track user interactions
- **Multiple examples** - Citations, code, tables, and more

## 📦 What's Included

### Typewriter Effect Files
- `index.html` - Main demo page with chat interface
- `typewriter.js` - TypewriterService class (core animation engine)
- `demo.js` - Demo logic and sample content

### Markdown Renderer Files
- `markdown-demo.html` - Markdown demo page
- `markdown-utils.js` - Citation insertion and sanitization utilities
- `markdown-demo.js` - Demo logic with multiple examples

### Shared Files
- `index-select.html` - Demo selection landing page
- `README.md` - This file
- `package.json` - Project metadata

## 🎯 Quick Start

### Option 1: GitHub Pages

1. Create a new repository on GitHub
2. Upload these files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your demo will be live at `https://yourusername.github.io/repo-name`

### Option 2: Local Server

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (install http-server first: npm install -g http-server)
http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000/index-select.html` in your browser to choose a demo.

Or navigate directly:
- Typewriter Effect: `http://localhost:8000/index.html`
- Markdown Renderer: `http://localhost:8000/markdown-demo.html`

### Option 3: JSFiddle

1. Go to [JSFiddle](https://jsfiddle.net/)
2. Copy `index.html` content to the HTML panel (remove `<head>`, `<script>` tags - keep only body content)
3. Copy `typewriter.js` to the JavaScript panel
4. Copy `demo.js` to the JavaScript panel (append below typewriter.js)
5. Add external resource: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
6. Copy CSS from `<style>` section to the CSS panel
7. Click "Run" to see it in action

### Option 4: CodePen

1. Go to [CodePen](https://codepen.io/)
2. Copy HTML body content to HTML panel
3. Copy CSS to CSS panel
4. Copy both JS files to JS panel
5. Add external script: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
6. The demo will run automatically

## 🎮 How to Use

### Typewriter Effect Demo

1. **Select a demo type** from the dropdown:
   - Simple Text - Basic greeting
   - Rich Markdown - Order update with formatting
   - Code Example - JavaScript code snippet
   - Conversation - Multi-turn chat simulation
   - Long Response - Comprehensive guide

2. **Adjust settings**:
   - **Animation Speed** - Characters per frame (1-10)
   - **Frame Delay** - Milliseconds between frames (16-100ms)

3. **Click "Start Demo"** to begin the animation

4. **Click "Skip Animation"** to jump to the end

5. **Click "Clear Chat"** to reset

### Markdown Renderer Demo

1. **Select a demo type** from the dropdown:
   - With Citations - Response with inline citation markers
   - Rich Markdown - All markdown features showcase
   - Code Examples - Multiple programming languages
   - Tables & Lists - Data presentation examples

2. **Click "Render Demo"** to see the rendered output

3. **Click citation links** (e.g., [1], [2]) in the text to highlight the corresponding source

4. **Click citation cards** in the right panel to jump to that citation in the text

5. **Hover over regular links** to see the URL

6. **Check the event log** at the bottom to see all interactions

## 🔧 Integration Guide

### Basic Usage

```javascript
// Create a typewriter service
const typewriter = new TypewriterService(
    (text) => {
        // Update callback - called on each frame
        element.textContent = text;
    },
    {
        isMarkdown: false,  // Set to true for markdown content
        onCursorChange: (visible) => {
            // Optional: Handle cursor visibility
            cursor.style.display = visible ? 'inline' : 'none';
        }
    }
);

// Add chunks as they arrive from your stream
typewriter.addChunk("Hello ");
typewriter.addChunk("world! ");
typewriter.addChunk("How are you?");

// Skip to end when done
typewriter.skipToEnd();

// Clean up when component is destroyed
typewriter.destroy();
```

### With Markdown

```javascript
const typewriter = new TypewriterService(
    (text) => {
        // Parse markdown and update DOM
        element.innerHTML = marked.parse(text);
    },
    { isMarkdown: true }
);
```

### Configuration

```javascript
// Update animation settings dynamically
typewriter.updateConfig({
    charsPerFrame: 2,    // Characters per frame
    frameDelayMs: 30     // Frame delay in milliseconds
});
```

## 🔧 Markdown Renderer Integration

### Basic Usage

```javascript
// Render markdown without citations
const html = renderMarkdown('# Hello\n\nThis is **markdown**');
element.innerHTML = html;
```

### With Citations

```javascript
// Define citations
const citations = [
    {
        type: "record",
        value: "00QSB000007Je7P2AS",
        inlineMetadata: [
            { location: 50, claim: "Source reference" }
        ]
    },
    {
        type: "link",
        value: "https://example.com/docs",
        inlineMetadata: [
            { location: 120, claim: "Documentation" }
        ]
    }
];

// Render with citations
const html = renderMarkdown('Your text content here', citations);
element.innerHTML = html;

// Add click listeners
element.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sourceId = extractSourceId(link.textContent);
        // Handle citation click
        console.log(`Citation ${sourceId} clicked`);
    });
});
```

### Citation Data Structure

```javascript
{
    type: "record" | "link",     // Citation type
    value: string,                // Record ID or URL
    inlineMetadata: [             // Where to insert markers
        {
            location: number,     // Character position in text
            claim: string         // Description for this reference
        }
    ]
}
```

### Custom Sanitization

```javascript
// Modify sanitizeConfig in markdown-utils.js
const sanitizeConfig = {
    ALLOWED_TAGS: [...],
    ALLOWED_ATTR: [...],
    ALLOWED_URI_REGEXP: /pattern/,
    ALLOW_UNKNOWN_PROTOCOLS: false
};
```

## 📊 Performance

The typewriter effect is designed for optimal performance:

- **Base speed**: 1 char/frame at 40ms delay (~25fps)
- **Adaptive catch-up**: Speeds up when queue builds (3-5 chars/frame)
- **Markdown overhead**: ~0.14ms per parse (negligible at 25fps)
- **CPU usage**: <1% for typical responses

## 🎨 Customization

### Cursor Styling

```css
.typewriter-cursor {
    background: #667eea;  /* Change cursor color */
    width: 2px;           /* Change cursor width */
    animation-duration: 1s; /* Change blink speed */
}
```

### Message Bubble Styling

```css
.message.assistant .message-bubble {
    background: white;
    color: #333;
    border-radius: 18px;
    /* Customize appearance */
}
```

## 🔍 How It Works

1. **Chunk Queuing**: Incoming text chunks are added to a queue
2. **Character Animation**: The service reveals characters frame-by-frame
3. **Adaptive Speed**: Animation speeds up if queue builds (prevents lag)
4. **Cursor Management**: Blinking cursor appears during animation
5. **Safety Measures**: Timeouts prevent infinite animations

### Architecture

```
Stream Chunks → TypewriterService → Animation Loop → Update Callback → DOM
                       ↓
                 Queue Management
                       ↓
                 Adaptive Speed
                       ↓
                 Cursor Control
```

## 📝 API Reference

### TypewriterService

#### Constructor

```javascript
new TypewriterService(onUpdate, options)
```

**Parameters:**
- `onUpdate` (Function): Callback called with updated text on each frame
- `options.isMarkdown` (boolean): Whether content is markdown
- `options.onCursorChange` (Function): Callback for cursor visibility changes

#### Methods

- `addChunk(deltaText)` - Add text chunk to animation queue
- `skipToEnd()` - Show all remaining content immediately
- `rushToEnd(maxMs)` - Speed up to finish within time budget
- `getDisplayedText()` - Get current displayed text
- `isAnimating()` - Check if animation is running
- `hasPendingContent()` - Check if queue has content
- `reset()` - Reset to initial state
- `destroy()` - Clean up resources
- `updateConfig(config)` - Update animation settings

## 🐛 Troubleshooting

**Animation is too fast/slow:**
- Adjust "Animation Speed" (chars/frame)
- Adjust "Frame Delay" (ms between frames)

**Markdown not rendering:**
- Make sure marked.js is loaded
- Check browser console for errors
- Verify `isMarkdown: true` is set

**Cursor not showing:**
- Check that `onCursorChange` callback is working
- Verify cursor CSS is present

**Memory issues:**
- Call `destroy()` when done
- Clear chat periodically for long sessions

## 📄 License

This is a demonstration/testing tool extracted from the ui-copilot-components codebase.

## 🤝 Original Source

Extracted from: `ui-copilot-components/packages/acc-lex-components/src/lwc/runtime_copilot_base/common/typewriterService.js`

For the full production implementation, see the original codebase.

## 💡 Tips

- Use **1 char/frame @ 40ms** for authentic typewriter feel
- Use **2-3 chars/frame @ 25ms** for faster, smoother animation
- Markdown parsing is fast enough for 1 char/frame (live formatting)
- Adaptive speed ensures animation never falls behind stream

## 🚧 What's Different from Production

### Typewriter Effect
This standalone demo simplifies some aspects for easier testing:

- ✅ Core TypewriterService is identical
- ✅ Animation logic is unchanged
- ✅ Adaptive speed works the same
- ⚠️ Cursor implementation is simplified (inline HTML instead of component-based)
- ⚠️ No LWC framework dependencies
- ⚠️ Simulated streaming instead of real API calls

### Markdown Renderer
The markdown demo extracts core functionality:

- ✅ Citation insertion logic is identical
- ✅ Sanitization config is identical
- ✅ Markdown parsing works the same
- ⚠️ No LWC framework dependencies
- ⚠️ No routing service integration
- ⚠️ No work object preview support
- ⚠️ Simplified event handling (no custom events bubbling)
- ⚠️ Uses CDN versions of marked.js and DOMPurify

## 📞 Questions?

This is a standalone extraction for testing purposes. For the production implementation, refer to the main `ui-copilot-components` repository.
