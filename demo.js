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
    fastBurst: {
        title: "Fast Burst Streaming (rapid small chunks)",
        chunks: [
            "# API Documentation\n\n",
            "The Agentforce Streaming API ",
            "provides real-time message ",
            "delivery for AI-powered ",
            "conversations. ",
            "This guide covers ",
            "authentication, ",
            "request formats, ",
            "and best practices.\n\n",
            "## Authentication\n\n",
            "All requests require ",
            "a valid JWT token ",
            "obtained from the ",
            "`/agentforce/bootstrap` ",
            "endpoint. ",
            "The token includes:\n",
            "- Agent ID\n",
            "- Session context\n",
            "- Expiration time\n",
            "- Scope permissions\n\n",
            "**Example:**\n```bash\n",
            "curl 'https://api.salesforce.com",
            "/agentforce/bootstrap?",
            "agentid=ABC123&",
            "isPreview=true'\n```\n\n",
            "## Streaming Protocol\n\n",
            "Messages are delivered ",
            "via Server-Sent Events ",
            "(SSE) over HTTP. ",
            "Each event contains ",
            "a JSON payload with ",
            "message metadata and ",
            "content chunks.\n\n",
            "**Event Types:**\n",
            "- `TextChunk` - ",
            "Partial text\n",
            "- `LightningChunk` - ",
            "Component data\n",
            "- `Inform` - ",
            "Complete message\n",
            "- `EndOfTurn` - ",
            "Stream end\n",
            "- `Error` - ",
            "Failure state\n\n",
            "## Integration\n\n",
            "```javascript\n",
            "import { streamMessages } ",
            "from 'force/ldsAdapters",
            "CopilotStreaming';\n\n",
            "async function stream",
            "Conversation(msg) {\n",
            "  const req = {\n",
            "    sessionId: await ",
            "getSessionId(),\n",
            "    inputPayload: ",
            "{ text: msg },\n",
            "    version: '1.0'\n",
            "  };\n\n",
            "  for await (const item ",
            "of await streamMessages(",
            "req)) {\n",
            "    if (item.message.type ",
            "=== 'EndOfTurn') ",
            "break;\n",
            "    if (item.message.type ",
            "=== 'TextChunk') {\n",
            "      const text = item.",
            "message.result[0].",
            "value.value;\n",
            "      typewriter.addChunk(",
            "text);\n",
            "    }\n",
            "  }\n",
            "}\n```\n\n",
            "## Performance\n\n",
            "**Chunk Size:**\n",
            "Optimal sizes: ",
            "20-100 characters. ",
            "Smaller chunks = ",
            "more responsive UI. ",
            "Larger chunks = ",
            "reduced network calls.\n\n",
            "**Adaptive Speed:**\n",
            "- Normal: 1 char/frame\n",
            "- Medium: 3 chars/frame\n",
            "- High: 5 chars/frame\n",
            "- Critical: 10+ chars/frame\n\n",
            "## Error Handling\n\n",
            "**Network Failures:**\n",
            "Implement exponential ",
            "backoff with max ",
            "3 retries.\n\n",
            "```javascript\n",
            "const controller = ",
            "new AbortController();\n",
            "try {\n",
            "  await streamMessages(req, ",
            "{ signal: controller.",
            "signal });\n",
            "} catch (err) {\n",
            "  if (err.name === ",
            "'AbortError') {\n",
            "    console.log('Cancelled');\n",
            "  } else {\n",
            "    await retryWithBackoff(",
            "req);\n",
            "  }\n",
            "}\n```\n\n",
            "## Rate Limits\n\n",
            "- Session: 100 req/min\n",
            "- Agent: 1000 sessions\n",
            "- Message: 10KB max\n",
            "- Stream: 5min max\n\n",
            "Exceeding limits returns ",
            "HTTP 429 with ",
            "Retry-After header.\n\n",
            "## Best Practices\n\n",
            "1. Connection pooling\n",
            "2. Graceful degradation\n",
            "3. Buffer management\n",
            "4. Memory monitoring\n",
            "5. Metrics logging\n\n",
            "## Security\n\n",
            "**Token Refresh:**\n",
            "Refresh JWT tokens ",
            "before expiration ",
            "(at 80% of TTL).\n\n",
            "**Content Validation:**\n",
            "Sanitize all content:\n",
            "```javascript\n",
            "const sanitized = ",
            "DOMPurify.sanitize(",
            "chunk);\n```\n\n",
            "## Support\n\n",
            "- API Reference: ",
            "developer.salesforce.com\n",
            "- GitHub Samples\n",
            "- Community Forum\n",
            "- Status Page\n\n",
            "For issues, contact ",
            "Salesforce Support ",
            "with trace IDs.\n\n",
            "---\n",
            "*Version 2.0*"
        ],
        isMarkdown: true
    },
        technicalDeep: {
        title: "Technical Deep Dive (rapid chunks)",
        chunks: [
          "# TypewriterService\n\n",
          "## Architecture\n\n",
          "The TypewriterService ",
          "is a critical component ",
          "for managing real-time ",
          "text animation.\n\n",
          "It provides adaptive ",
          "speed control, ",
          "queue management, ",
          "and smooth completion.\n\n",
          "## Animation Loop\n\n",
          "Uses requestAnimation",
          "Frame for smooth ",
          "60fps rendering:\n\n",
          "```typescript\n",
          "private _animate() {\n",
          "  // Safety check\n",
          "  if (Date.now() - ",
          "this._startTime > ",
          "this._config.maxMs) {\n",
          "    this.skipToEnd();\n",
          "    return;\n",
          "  }\n\n",
          "  // Get next chunk\n",
          "  if (this._charIndex >= ",
          "this._currentChunk.",
          "length) {\n",
          "    if (this._queue.",
          "length === 0) {\n",
          "      this._animating = ",
          "false;\n",
          "      return;\n",
          "    }\n",
          "    this._currentChunk = ",
          "this._queue.shift();\n",
          "    this._charIndex = 0;\n",
          "  }\n\n",
          "  // Adaptive speed\n",
          "  const charsToAdd = ",
          "this._getCharsPerFrame();\n",
          "  const newChars = ",
          "this._currentChunk.",
          "slice(this._charIndex, ",
          "this._charIndex + ",
          "charsToAdd);\n  \n",
          "  this._charIndex += ",
          "charsToAdd;\n",
          "  this._displayedText += ",
          "newChars;\n",
          "  this._onUpdate(this.",
          "_displayedText);\n  \n",
          "  requestAnimationFrame(",
          "() => this._animate());\n",
          "}\n```\n\n",
          "## Adaptive Speed\n\n",
          "Dynamically adjusts ",
          "based on queue depth:\n\n",
          "**Speed Tiers:**\n",
          "1. Normal: 1 char/frame\n",
          "   - Queue < 45 chars\n",
          "   - Natural typing\n\n",
          "2. Medium: 3 chars/frame\n",
          "   - Queue 45-80 chars\n",
          "   - Slight speedup\n\n",
          "3. High: 5 chars/frame\n",
          "   - Queue 80-120 chars\n",
          "   - Active catch-up\n\n",
          "4. Critical: 10+ chars\n",
          "   - Queue > 120 chars\n",
          "   - Maximum speed\n\n",
          "### Algorithm\n\n",
          "```typescript\n",
          "_getCharsPerFrame() {\n",
          "  const queuedChars = ",
          "this._queue.reduce(",
          "(sum, c) => sum + ",
          "c.length, 0);\n",
          "  const remaining = ",
          "this._currentChunk.",
          "length - this.",
          "_charIndex;\n",
          "  const total = ",
          "queuedChars + ",
          "remaining;\n\n",
          "  if (total > ",
          "this._config.",
          "criticalThreshold) {\n",
          "    return this._config.",
          "charsPerFrameCritical;\n",
          "  } else if (total > ",
          "this._config.",
          "highThreshold) {\n",
          "    return this._config.",
          "charsPerFrameHigh;\n",
          "  } else if (total > ",
          "this._config.",
          "mediumThreshold) {\n",
          "    return this._config.",
          "charsPerFrameMedium;\n",
          "  }\n",
          "  return this._config.",
          "charsPerFrame;\n",
          "}\n```\n\n",
          "## Rush Mode\n\n",
          "Smooth acceleration ",
          "when stream ends:\n\n",
          "```typescript\n",
          "rushToEnd(maxMs = 5000) {\n",
          "  const remaining = ",
          "this.getTotalPending();\n",
          "  \n  if (remaining === 0) {\n",
          "    this.skipToEnd();\n",
          "    return;\n",
          "  }\n  \n",
          "  const frames = ",
          "maxMs / 16; // 60fps\n",
          "  const charsPerFrame = ",
          "Math.ceil(remaining / ",
          "frames);\n  \n",
          "  this._rushChars = ",
          "charsPerFrame;\n",
          "  this._rushMode = true;\n",
          "  \n  if (!this._animating) {\n",
          "    this._animate();\n",
          "  }\n",
          "}\n```\n\n",
          "## Performance\n\n",
          "**Memory:**\n",
          "- Base: ~2KB/instance\n",
          "- Queue: ~1 byte/char\n",
          "- Peak: < 100KB\n\n",
          "**CPU:**\n",
          "- Normal: < 1% core\n",
          "- Rush: 2-3% core\n\n",
          "**Latency:**\n",
          "- Chunk add: < 1ms\n",
          "- Frame render: < 0.5ms\n",
          "- Total: 16-35ms\n\n",
          "## Safety\n\n",
          "**Timeout:**\n",
          "Auto-skip after ",
          "15 seconds.\n\n",
          "**Idle Cursor:**\n",
          "Hides after 1.5s ",
          "of no chunks.\n\n",
          "**Cleanup:**\n",
          "```typescript\n",
          "destroy() {\n",
          "  this._isDestroyed = ",
          "true;\n",
          "  this._cancelAnimation();\n",
          "  this._queue = [];\n",
          "  this._onUpdate = null;\n",
          "}\n```\n\n",
          "## Integration\n\n",
          "```typescript\n",
          "const tw = new ",
          "TypewriterService(\n",
          "  (text) => el.innerHTML = ",
          "marked.parse(text)\n",
          ");\n\n",
          "for await (const chunk ",
          "of streamMessages(req)) {\n",
          "  if (chunk.type === ",
          "'TextChunk') {\n",
          "    tw.addChunk(chunk.",
          "value);\n",
          "  } else if (chunk.type ",
          "=== 'EndOfTurn') {\n",
          "    tw.rushToEnd(5000);\n",
          "    break;\n",
          "  }\n",
          "}\n```\n\n",
          "Perfect for smooth ",
          "streaming text! ✨"
],
        isMarkdown: true
    },
        codeGeneration: {
        title: "Code Generation (rapid chunks)",
        chunks: [
          "Let me generate a ",
          "React component:\n\n",
          "## StreamingChat\n\n",
          "```typescript\n",
          "import React, { ",
          "useState, useEffect, ",
          "useRef } from 'react';\n",
          "import { ",
          "TypewriterService ",
          "} from './Typewriter';\n\n",
          "interface Message {\n",
          "  id: string;\n",
          "  role: 'user' | ",
          "'assistant';\n",
          "  content: string;\n",
          "  timestamp: Date;\n",
          "}\n\n",
          "export const ",
          "StreamingChat = () => {\n",
          "  const [messages, ",
          "setMessages] = ",
          "useState<Message[]>([]);\n",
          "  const [input, ",
          "setInput] = ",
          "useState('');\n",
          "  const [streaming, ",
          "setStreaming] = ",
          "useState(false);\n\n",
          "  const typewriter = ",
          "useRef<Typewriter",
          "Service>(null);\n\n",
          "  useEffect(() => {\n",
          "    typewriter.current = ",
          "new TypewriterService(\n",
          "      (text) => {\n",
          "        setMessages(prev => ",
          "updateLast(prev, text));\n",
          "      },\n",
          "      { isMarkdown: true }\n",
          "    );\n\n",
          "    return () => {\n",
          "      typewriter.current",
          "?.destroy();\n",
          "    };\n",
          "  }, []);\n\n",
          "  const handleSend = ",
          "async () => {\n",
          "    if (!input.trim()) ",
          "return;\n\n",
          "    const userMsg = {\n",
          "      id: Date.now().",
          "toString(),\n",
          "      role: 'user',\n",
          "      content: input,\n",
          "      timestamp: ",
          "new Date()\n",
          "    };\n\n",
          "    setMessages(prev => ",
          "[...prev, userMsg]);\n",
          "    setInput('');\n",
          "    setStreaming(true);\n\n",
          "    try {\n",
          "      for await (const ",
          "chunk of stream(input)) {\n",
          "        typewriter.current",
          "?.addChunk(chunk);\n",
          "      }\n",
          "    } finally {\n",
          "      setStreaming(false);\n",
          "    }\n",
          "  };\n\n",
          "  return (\n",
          "    <div className=\"chat\">\n",
          "      <div className=\"",
          "messages\">\n",
          "        {messages.map(",
          "msg => (\n",
          "          <Message ",
          "key={msg.id} ",
          "{...msg} />\n",
          "        ))}\n",
          "      </div>\n\n",
          "      <div className=\"",
          "input-area\">\n",
          "        <input\n",
          "          value={input}\n",
          "          onChange={e => ",
          "setInput(e.target.",
          "value)}\n",
          "          onKeyPress={e => ",
          "e.key === 'Enter' && ",
          "handleSend()}\n",
          "          disabled={streaming}\n",
          "        />\n",
          "        <button\n",
          "          onClick={handleSend}\n",
          "          disabled={!input || ",
          "streaming}\n",
          "        >\n",
          "          Send\n",
          "        </button>\n",
          "      </div>\n",
          "    </div>\n",
          "  );\n",
          "};\n```\n\n",
          "## Styling\n\n",
          "```css\n",
          ".chat {\n",
          "  display: flex;\n",
          "  flex-direction: ",
          "column;\n",
          "  height: 100vh;\n",
          "  max-width: 800px;\n",
          "  margin: 0 auto;\n",
          "}\n\n",
          ".messages {\n",
          "  flex: 1;\n",
          "  overflow-y: auto;\n",
          "  padding: 20px;\n",
          "  gap: 16px;\n",
          "}\n\n",
          ".message {\n",
          "  display: flex;\n",
          "  gap: 12px;\n",
          "  padding: 12px;\n",
          "  border-radius: ",
          "12px;\n",
          "  background: white;\n",
          "}\n\n",
          ".message.user {\n",
          "  background: #667eea;\n",
          "  color: white;\n",
          "  margin-left: auto;\n",
          "}\n\n",
          ".input-area {\n",
          "  display: flex;\n",
          "  gap: 12px;\n",
          "  padding: 20px;\n",
          "}\n\n",
          ".input-area input {\n",
          "  flex: 1;\n",
          "  padding: 12px;\n",
          "  border: 1px solid ",
          "#ddd;\n",
          "  border-radius: 24px;\n",
          "}\n\n",
          ".input-area button {\n",
          "  padding: 12px 24px;\n",
          "  background: #667eea;\n",
          "  color: white;\n",
          "  border: none;\n",
          "  border-radius: 24px;\n",
          "}\n```\n\n",
          "## Features\n\n",
          "✅ Real-time streaming\n",
          "✅ Typewriter animation\n",
          "✅ Markdown support\n",
          "✅ Auto-scroll\n",
          "✅ Responsive design\n\n",
          "Production ready! 🚀"
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
    },
    slowStream: {
        title: "Slow Stream (500-1000ms delays)",
        chunks: [
            "# Slow Streaming Demo\n\n",
            "This demonstrates slower ",
            "streaming behavior where ",
            "chunks arrive with longer ",
            "delays between them.\n\n",
            "## Real-World Scenario\n\n",
            "In production, slow streaming ",
            "can occur when:\n",
            "- Backend is processing ",
            "complex requests\n",
            "- Network latency is high\n",
            "- API rate limits are active\n",
            "- Model is generating ",
            "thoughtful responses\n\n",
            "## Queue Behavior\n\n",
            "With slower chunk arrival:\n",
            "- Queue stays mostly empty\n",
            "- Animation stays in NORMAL tier\n",
            "- Smooth, natural typing rhythm\n",
            "- Cursor blinks between chunks\n\n",
            "## User Experience\n\n",
            "Slower streaming feels:\n",
            "- More deliberate\n",
            "- Human-like pacing\n",
            "- Easy to read along\n",
            "- Less overwhelming\n\n",
            "## Configuration\n\n",
            "```javascript\n",
            "// Slow stream simulation\n",
            "const delay = Math.random() ",
            "* 500 + 500;\n",
            "// 500-1000ms delays\n",
            "```\n\n",
            "## Comparison\n\n",
            "**Fast Stream:**\n",
            "- 100-500ms delays\n",
            "- Queue builds up\n",
            "- Adaptive speed kicks in\n\n",
            "**Slow Stream:**\n",
            "- 500-1000ms delays\n",
            "- Queue stays empty\n",
            "- Steady natural pace\n\n",
            "## When to Use\n\n",
            "Slow streaming works well for:\n",
            "- Long-form content\n",
            "- Educational material\n",
            "- Step-by-step instructions\n",
            "- Thoughtful AI responses\n\n",
            "This demo shows how the ",
            "typewriter handles slower ",
            "pacing gracefully! 🐢"
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

// Get selected screen reader strategy
function getScreenReaderStrategy() {
    const selected = document.querySelector('input[name="srStrategy"]:checked');
    return selected ? selected.value : 'complete';
}

// Configure message container for screen reader based on strategy
function configureMessageAccessibility(messageElement, phase) {
    const strategy = getScreenReaderStrategy();

    if (strategy === 'immediate') {
        // Announce everything as it streams
        messageElement.setAttribute('aria-live', 'polite');
        messageElement.removeAttribute('aria-hidden');
    } else if (strategy === 'progressive' || strategy === 'complete') {
        // Hide during streaming, reveal at end
        if (phase === 'streaming') {
            messageElement.setAttribute('aria-live', 'off');
            messageElement.setAttribute('aria-hidden', 'true');
            messageElement.setAttribute('aria-busy', 'true');
        } else if (phase === 'complete') {
            messageElement.setAttribute('aria-live', 'polite');
            messageElement.removeAttribute('aria-hidden');
            messageElement.removeAttribute('aria-busy');
        }
    }
}

// Track streaming progress for progressive announcements
let streamingProgress = {
    totalChunks: 0,
    currentChunk: 0,
    announcedMilestones: new Set()
};

function resetStreamingProgress(totalChunks) {
    streamingProgress = {
        totalChunks: totalChunks,
        currentChunk: 0,
        announcedMilestones: new Set()
    };
}

function updateStreamingProgress() {
    const strategy = getScreenReaderStrategy();
    if (strategy !== 'progressive') return;

    streamingProgress.currentChunk++;
    const percent = (streamingProgress.currentChunk / streamingProgress.totalChunks) * 100;

    // Announce at 25%, 50%, 75% milestones
    const milestones = [25, 50, 75];
    for (const milestone of milestones) {
        if (percent >= milestone && !streamingProgress.announcedMilestones.has(milestone)) {
            announce(`Response ${milestone}% complete`);
            streamingProgress.announcedMilestones.add(milestone);
            break;
        }
    }
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
const chunkLogEl = document.getElementById('chunkLog');
const chunkCountEl = document.getElementById('chunkCount');
const clearLogBtn = document.getElementById('clearLogBtn');

// Chunk log state
let chunkLogData = [];
let lastChunkTime = 0;
let chunkLogStartTime = 0;

// Chunk log functions
function clearChunkLog() {
    chunkLogData = [];
    lastChunkTime = 0;
    chunkLogStartTime = 0;
    updateChunkLogDisplay();
}

function logChunkArrival(chunk, isLastChunk) {
    const now = Date.now();

    // Initialize start time on first chunk
    if (chunkLogData.length === 0) {
        chunkLogStartTime = now;
        lastChunkTime = now;
    }

    // Calculate delay from previous chunk
    const delay = lastChunkTime ? now - lastChunkTime : 0;
    lastChunkTime = now;

    // Create log entry
    const logEntry = {
        time: ((now - chunkLogStartTime) / 1000).toFixed(2),
        size: chunk.length,
        delay: delay,
        content: chunk.slice(0, 40).replace(/\n/g, '↵'),
        isLast: isLastChunk
    };

    chunkLogData.push(logEntry);
    updateChunkLogDisplay();
}

function updateChunkLogDisplay() {
    if (!chunkLogEl) return;

    // Update count
    chunkCountEl.textContent = `${chunkLogData.length} chunks received`;

    // Clear and rebuild log
    if (chunkLogData.length === 0) {
        chunkLogEl.innerHTML = '<div class="chunk-log-empty">No chunks yet - start a demo to see chunks arrive</div>';
        return;
    }

    chunkLogEl.innerHTML = chunkLogData.map((entry, index) => {
        const isLast = index === chunkLogData.length - 1 && entry.isLast;
        const delayClass = entry.delay < 100 ? 'delay-fast' : entry.delay < 500 ? 'delay-medium' : 'delay-slow';

        return `
            <div class="chunk-log-entry${isLast ? ' chunk-log-last' : ''}">
                <span class="chunk-time">${entry.time}s</span>
                <span class="chunk-size">${entry.size}ch</span>
                <span class="chunk-delay ${delayClass}">${entry.delay}ms</span>
                <span class="chunk-content">${entry.content}${entry.content.length >= 40 ? '...' : ''}</span>
                ${isLast ? '<span class="chunk-last-flag">🏁</span>' : ''}
            </div>
        `;
    }).join('');

    // Auto-scroll to bottom
    chunkLogEl.scrollTop = chunkLogEl.scrollHeight;
}

// Initialize
startBtn.addEventListener('click', startDemo);
skipBtn.addEventListener('click', skipAnimation);
clearBtn.addEventListener('click', clearChat);
clearLogBtn.addEventListener('click', clearChunkLog);

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

        // Configure accessibility for streaming
        configureMessageAccessibility(bubbleDiv, 'streaming');

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

        // Determine speed tier and apply styling
        speedTierEl.className = 'stat-value'; // Reset classes

        // Check if animation is complete (not animating and no pending content)
        if (!queueStats.isAnimating && queueStats.totalPending === 0) {
            speedTierEl.textContent = '-';
            charsPerFrameCurrentEl.textContent = '-';
        } else if (queueStats.rushMode) {
            speedTierEl.textContent = 'RUSH';
            speedTierEl.classList.add('speed-rush');
            charsPerFrameCurrentEl.textContent = queueStats.currentSpeed;
        } else if (!queueStats.isAnimating) {
            speedTierEl.textContent = 'IDLE';
            charsPerFrameCurrentEl.textContent = '-';
        } else {
            charsPerFrameCurrentEl.textContent = queueStats.currentSpeed;

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

    // Initialize progress tracking
    resetStreamingProgress(chunks.length);

    function sendNextChunk() {
        if (chunkIndex >= chunks.length) {
            // All chunks sent - let animation finish naturally, cursor will hide after idle timeout
            statusEl.textContent = 'Stream complete';

            // Configure message as complete for screen readers
            if (currentMessageElement) {
                configureMessageAccessibility(currentMessageElement, 'complete');
            }

            // Announce based on strategy
            const strategy = getScreenReaderStrategy();
            if (strategy === 'complete') {
                announce('Response complete. New message available.');
            } else if (strategy === 'progressive') {
                announce('Response complete');
            }
            // 'immediate' doesn't need end announcement - already announced everything

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
        const isLastChunk = (chunkIndex >= chunks.length - 1);

        // Log chunk arrival for visualization
        logChunkArrival(chunk, isLastChunk);

        typewriter.addChunk(chunk);
        chunkIndex++;

        // Update progress for progressive announcements
        updateStreamingProgress();

        // Get demo type to determine streaming speed
        const demoKey = demoSelect.value;
        const isFastBurst = demoKey === 'fastBurst';
        const isTechnicalDeep = demoKey === 'technicalDeep';
        const isCodeGeneration = demoKey === 'codeGeneration';
        const isSlowDemo = demoKey === 'slowStream';

        // For rush demo, send chunks instantly after 60% to build up massive queue
        let delay;
        if (isRushDemo && chunkIndex > chunks.length * 0.6) {
            // Send remaining chunks instantly to create huge backlog for rush mode
            delay = 0;
        } else if (isTechnicalDeep) {
            // Technical deep dive: 30-200ms delays
            delay = Math.random() * 170 + 30; // 30-200ms
        } else if (isFastBurst) {
            // Fast burst: 10-100ms delays between small chunks (extremely fast)
            delay = Math.random() * 90 + 10; // 10-100ms
        } else if (isCodeGeneration) {
            // Code generation: 100-500ms delays
            delay = Math.random() * 400 + 100; // 100-500ms
        } else if (isSlowDemo) {
            // Slow stream: 500-1000ms delays between chunks
            delay = Math.random() * 500 + 500; // 500-1000ms
        } else {
            // Adaptive chunk delivery based on animation speed
            // Faster settings (low frameDelay, high charsPerFrame) get faster chunk delivery
            const frameDelay = parseInt(document.getElementById('frameDelayMs').value) || 0;
            const charsPerFrame = parseInt(document.getElementById('charsPerFrame').value) || 1;

            // Calculate animation rate (chars per second)
            const frameTime = frameDelay || 16; // 0 = 16ms (rAF)
            const charsPerSecond = (charsPerFrame / frameTime) * 1000;

            // Adjust chunk delay to keep queue fed
            // Fast animation (100+ chars/sec) = short delays (50-150ms)
            // Slow animation (20 chars/sec) = longer delays (200-600ms)
            if (charsPerSecond > 100) {
                delay = Math.random() * 100 + 50; // 50-150ms
            } else if (charsPerSecond > 50) {
                delay = Math.random() * 150 + 100; // 100-250ms
            } else {
                delay = Math.random() * 400 + 200; // 200-600ms (original)
            }
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

    // Clear chunk log for new demo
    clearChunkLog();

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

    // Announce start based on strategy
    const strategy = getScreenReaderStrategy();
    if (strategy === 'progressive') {
        announce(`Generating response for ${demo.title}`);
    } else if (strategy === 'complete') {
        announce('Generating response');
    }
    // 'immediate' doesn't need start announcement - will announce content as it comes

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
