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
    relativityStream: {
        title: "🔬 Einstein's Relativity - Live SSE Timing",
        chunks: [
            { text: 'The ', delay: 0 },
            { text: 'concept ', delay: 1 },
            { text: 'of ', delay: 2 },
            { text: 'relativity, ', delay: 1 },
            { text: 'introduced ', delay: 16 },
            { text: 'by ', delay: 1 },
            { text: 'Albert ', delay: 2 },
            { text: 'Einstein, ', delay: 2 },
            { text: 'revolutionized ', delay: 5 },
            { text: 'our ', delay: 4 },
            { text: 'understanding ', delay: 1 },
            { text: 'of ', delay: 2 },
            { text: 'physics ', delay: 13 },
            { text: 'and ', delay: 18 },
            { text: 'the ', delay: 11 },
            { text: 'universe. ', delay: 15 },
            { text: 'It ', delay: 1 },
            { text: 'consists ', delay: 10 },
            { text: 'of ', delay: 14 },
            { text: 'two ', delay: 2 },
            { text: 'main ', delay: 8 },
            { text: 'theories: ', delay: 10 },
            { text: 'Special ', delay: 17 },
            { text: 'Relativity ', delay: 18 },
            { text: 'and ', delay: 1 },
            { text: 'General ', delay: 2 },
            { text: 'Relativity.\n\n', delay: 1 },
            { text: '### ', delay: 2 },
            { text: 'Special ', delay: 5 },
            { text: 'Relativity\n', delay: 1 },
            { text: 'Published ', delay: 2 },
            { text: 'in ', delay: 1 },
            { text: '1905, ', delay: 17 },
            { text: 'Special ', delay: 2 },
            { text: 'Relativity ', delay: 2 },
            { text: 'focuses ', delay: 1 },
            { text: 'on ', delay: 1 },
            { text: 'the ', delay: 2 },
            { text: 'physics ', delay: 1 },
            { text: 'of ', delay: 1 },
            { text: 'objects ', delay: 2 },
            { text: 'moving ', delay: 1 },
            { text: 'at ', delay: 1 },
            { text: 'constant ', delay: 2 },
            { text: 'speeds, ', delay: 18 },
            { text: 'particularly ', delay: 1 },
            { text: 'near ', delay: 1 },
            { text: 'the ', delay: 2 },
            { text: 'speed ', delay: 1 },
            { text: 'of ', delay: 1 },
            { text: 'light. ', delay: 2 },
            { text: 'Its ', delay: 1 },
            { text: 'key ', delay: 2 },
            { text: 'principles ', delay: 2 },
            { text: 'include:\n', delay: 2 },
            { text: '1. ', delay: 1 },
            { text: '**The ', delay: 2 },
            { text: 'Speed ', delay: 15 },
            { text: 'of ', delay: 1 },
            { text: 'Light ', delay: 1 },
            { text: 'is ', delay: 2 },
            { text: 'Constant**: ', delay: 1 },
            { text: 'The ', delay: 2 },
            { text: 'speed ', delay: 1 },
            { text: 'of ', delay: 1 },
            { text: 'light ', delay: 2 },
            { text: 'in ', delay: 1 },
            { text: 'a ', delay: 2 },
            { text: 'vacuum ', delay: 1 },
            { text: 'is ', delay: 1 },
            { text: 'the ', delay: 2 },
            { text: 'same ', delay: 1 },
            { text: 'for ', delay: 1 },
            { text: 'all ', delay: 2 },
            { text: 'observers, ', delay: 1 },
            { text: 'regardless ', delay: 2 },
            { text: 'of ', delay: 15 },
            { text: 'their ', delay: 1 },
            { text: 'motion.\n', delay: 1 },
            { text: '2. ', delay: 2 },
            { text: '**Relativity ', delay: 1 },
            { text: 'of ', delay: 2 },
            { text: 'Simultaneity**: ', delay: 1 },
            { text: 'Events ', delay: 1 },
            { text: 'that ', delay: 2 },
            { text: 'appear ', delay: 16 },
            { text: 'simultaneous ', delay: 1 },
            { text: 'to ', delay: 1 },
            { text: 'one ', delay: 2 },
            { text: 'observer ', delay: 1 },
            { text: 'may ', delay: 2 },
            { text: 'not ', delay: 2 },
            { text: 'be ', delay: 2 },
            { text: 'simultaneous ', delay: 3 },
            { text: 'to ', delay: 3 },
            { text: 'another ', delay: 2 },
            { text: 'moving ', delay: 3 },
            { text: 'observer.\n', delay: 2 },
            { text: '3. ', delay: 15 },
            { text: '**Time ', delay: 3 },
            { text: 'Dilation**: ', delay: 2 },
            { text: 'Time ', delay: 2 },
            { text: 'slows ', delay: 3 },
            { text: 'down ', delay: 2 },
            { text: 'for ', delay: 2 },
            { text: 'objects ', delay: 3 },
            { text: 'moving ', delay: 3 },
            { text: 'close ', delay: 3 },
            { text: 'to ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'speed ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'light ', delay: 4 },
            { text: 'relative ', delay: 3 },
            { text: 'to ', delay: 3 },
            { text: 'a ', delay: 3 },
            { text: 'stationary ', delay: 18 },
            { text: 'observer.\n', delay: 3 },
            { text: '4. ', delay: 3 },
            { text: '**Length ', delay: 4 },
            { text: 'Contraction**: ', delay: 3 },
            { text: 'Objects ', delay: 3 },
            { text: 'moving ', delay: 3 },
            { text: 'at ', delay: 3 },
            { text: 'high ', delay: 3 },
            { text: 'speeds ', delay: 3 },
            { text: 'appear ', delay: 3 },
            { text: 'shorter ', delay: 3 },
            { text: 'in ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'direction ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'motion.\n', delay: 17 },
            { text: '5. ', delay: 3 },
            { text: '**Mass-Energy ', delay: 3 },
            { text: 'Equivalence**: ', delay: 3 },
            { text: 'Expressed ', delay: 3 },
            { text: 'by ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'famous ', delay: 4 },
            { text: 'equation ', delay: 3 },
            { text: '\\(E ', delay: 3 },
            { text: '= ', delay: 19 },
            { text: 'mc^2\\), ', delay: 3 },
            { text: 'it ', delay: 3 },
            { text: 'shows ', delay: 3 },
            { text: 'that ', delay: 4 },
            { text: 'mass ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'energy ', delay: 3 },
            { text: 'are ', delay: 3 },
            { text: 'interchangeable.\n\n', delay: 3 },
            { text: '### ', delay: 3 },
            { text: 'General ', delay: 3 },
            { text: 'Relativity\n', delay: 3 },
            { text: 'Published ', delay: 3 },
            { text: 'in ', delay: 3 },
            { text: '1915, ', delay: 18 },
            { text: 'General ', delay: 3 },
            { text: 'Relativity ', delay: 4 },
            { text: 'extends ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'principles ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'Special ', delay: 3 },
            { text: 'Relativity ', delay: 3 },
            { text: 'to ', delay: 3 },
            { text: 'include ', delay: 3 },
            { text: 'gravity ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'acceleration. ', delay: 3 },
            { text: 'Its ', delay: 18 },
            { text: 'key ', delay: 3 },
            { text: 'ideas ', delay: 4 },
            { text: 'include:\n', delay: 3 },
            { text: '1. ', delay: 3 },
            { text: '**Gravity ', delay: 3 },
            { text: 'as ', delay: 3 },
            { text: 'Curved ', delay: 3 },
            { text: 'Spacetime**: ', delay: 3 },
            { text: 'Massive ', delay: 3 },
            { text: 'objects ', delay: 3 },
            { text: 'like ', delay: 3 },
            { text: 'planets ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'stars ', delay: 16 },
            { text: 'warp ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'fabric ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'spacetime, ', delay: 3 },
            { text: 'creating ', delay: 3 },
            { text: 'what ', delay: 3 },
            { text: 'we ', delay: 3 },
            { text: 'perceive ', delay: 3 },
            { text: 'as ', delay: 3 },
            { text: 'gravity.\n', delay: 3 },
            { text: '2. ', delay: 17 },
            { text: '**Gravitational ', delay: 3 },
            { text: 'Time ', delay: 3 },
            { text: 'Dilation**: ', delay: 3 },
            { text: 'Time ', delay: 3 },
            { text: 'runs ', delay: 3 },
            { text: 'slower ', delay: 3 },
            { text: 'in ', delay: 3 },
            { text: 'stronger ', delay: 3 },
            { text: 'gravitational ', delay: 16 },
            { text: 'fields.\n', delay: 3 },
            { text: '3. ', delay: 3 },
            { text: '**The ', delay: 3 },
            { text: 'Equivalence ', delay: 3 },
            { text: 'Principle**: ', delay: 3 },
            { text: 'The ', delay: 3 },
            { text: 'effects ', delay: 3 },
            { text: 'of ', delay: 5 },
            { text: 'gravity ', delay: 3 },
            { text: 'are ', delay: 2 },
            { text: 'indistinguishable ', delay: 3 },
            { text: 'from ', delay: 3 },
            { text: 'acceleration.\n', delay: 3 },
            { text: '4. ', delay: 3 },
            { text: '**Predictions**: ', delay: 19 },
            { text: 'General ', delay: 3 },
            { text: 'Relativity ', delay: 3 },
            { text: 'predicts ', delay: 3 },
            { text: 'phenomena ', delay: 3 },
            { text: 'like ', delay: 3 },
            { text: 'black ', delay: 3 },
            { text: 'holes, ', delay: 3 },
            { text: 'gravitational ', delay: 3 },
            { text: 'waves, ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'the ', delay: 2 },
            { text: 'bending ', delay: 3 },
            { text: 'of ', delay: 17 },
            { text: 'light ', delay: 3 },
            { text: 'by ', delay: 3 },
            { text: 'gravity ', delay: 3 },
            { text: '(gravitational ', delay: 3 },
            { text: 'lensing).\n\n', delay: 3 },
            { text: 'These ', delay: 3 },
            { text: 'theories ', delay: 3 },
            { text: 'have ', delay: 3 },
            { text: 'been ', delay: 3 },
            { text: 'confirmed ', delay: 3 },
            { text: 'through ', delay: 16 },
            { text: 'experiments ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'observations, ', delay: 3 },
            { text: 'such ', delay: 3 },
            { text: 'as ', delay: 3 },
            { text: 'GPS ', delay: 3 },
            { text: 'systems ', delay: 3 },
            { text: 'relying ', delay: 3 },
            { text: 'on ', delay: 18 },
            { text: 'time ', delay: 3 },
            { text: 'dilation ', delay: 3 },
            { text: 'corrections ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'detection ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'gravitational ', delay: 3 },
            { text: 'waves. ', delay: 3 },
            { text: 'Relativity ', delay: 2 },
            { text: 'has ', delay: 3 },
            { text: 'profoundly ', delay: 19 },
            { text: 'impacted ', delay: 4 },
            { text: 'science, ', delay: 3 },
            { text: 'technology, ', delay: 3 },
            { text: 'and ', delay: 3 },
            { text: 'our ', delay: 3 },
            { text: 'understanding ', delay: 3 },
            { text: 'of ', delay: 3 },
            { text: 'the ', delay: 3 },
            { text: 'cosmos.', delay: 15 },
        ],
        isMarkdown: true,
        hasRealTiming: true
    },
    salinasValley: {
        title: "🎯 Salinas Valley - Live SSE Timing",
        chunks: [
            { text: 'The Salinas Valley is in Northern California. It is a long narrow swale between two ', delay: 0 },
            { text: 'ranges of mountains, and the Salinas River winds and twists up the center until it ', delay: 376 },
            { text: 'falls at last into Monterey Bay.\n\nI remember my childhood names for grasses and secret ', delay: 21 },
            { text: 'flowers. I remember where a toad may live and what time the birds awaken in ', delay: 85 },
            { text: 'the summer—and what trees and seasons smelled like—how people looked and walked and smelled even. ', delay: 25 },
            { text: 'The memory of odors is very rich.\n\nI remember that the Gabilan Mountains to the ', delay: 120 },
            { text: 'east of the valley were light gay mountains full of sun and loveliness and a ', delay: 99 },
            { text: 'kind of invitation, so that you wanted to climb into their warm foothills almost as ', delay: 100 },
            { text: 'you want to climb into the lap of a beloved mother. They were beckoning mountains ', delay: 105 },
            { text: 'with a brown grass love. The Santa Lucias stood up against the sky to the ', delay: 111 },
            { text: 'west and kept the valley from the open sea, and they were dark and brooding—unfriendly ', delay: 355 },
            { text: 'and dangerous. I always found in myself a dread of west and a love of ', delay: 107 },
            { text: 'east. Where I ever got such an idea I cannot say, unless it could be ', delay: 37 },
            { text: 'that the morning came over the peaks of the Gabilans and the night drifted back ', delay: 98 },
            { text: 'from the ridges of the Santa Lucias. It may be that the birth and death ', delay: 169 },
            { text: 'of the day had some part in my feeling about the two ranges of mountains.\n\n', delay: 86 },
            { text: 'From both sides of the valley little streams slipped out of the hill canyons and ', delay: 98 },
            { text: 'fell into the bed of the Salinas River. In the winter of wet years the ', delay: 95 },
            { text: 'streams ran full-freshet, and they swelled the river until sometimes it raged and boiled, bank ', delay: 108 },
            { text: 'full, and then it was a destroyer. The river tore the edges of the farm ', delay: 27 },
            { text: 'lands and washed whole acres down; it toppled barns and houses into itself, to go ', delay: 112 },
            { text: 'floating and bobbing away. It trapped cows and pigs and sheep and drowned them in ', delay: 911 },
            { text: 'its muddy brown water and earned them to the sea. Then when the late spring ', delay: 105 },
            { text: 'came, the river drew in from its edges and the sand banks appeared. And in ', delay: 30 },
            { text: "the summer the river didn't run at all above ground. Some pools would be left ", delay: 75 },
            { text: 'in the deep swirl places under a high bank. The tules and grasses grew back, ', delay: 96 },
            { text: 'and willows straightened up with the flood debris in their upper branches. The Salinas was ', delay: 110 },
            { text: 'only a part-time river. The summer sun drove it underground. It was not a fine ', delay: 102 },
            { text: 'river at all, but it was the only one we had and so we boasted ', delay: 105 },
            { text: 'about it—how dangerous it was in a wet winter and how dry it was in ', delay: 29 },
            { text: "a dry summer. You can boast about anything if it's all you have. Maybe the ", delay: 118 },
            { text: 'less you have, the more you are required to boast.\n\nThe floor of the Salinas ', delay: 774 },
            { text: 'Valley, between the ranges and below the foothills, is level because this valley used to ', delay: 12 },
            { text: 'be the bottom of a hundred-mile inlet from the sea. The river mouth at Moss ', delay: 26 },
            { text: 'Landing was centuries ago the entrance to this long inland water. Once, fifty miles down ', delay: 54 },
            { text: 'the valley, my father bored a well. The drill came up first with topsoil and ', delay: 57 },
            { text: 'then with gravel and then with white sea sand full of shells and even pieces ', delay: 29 },
            { text: 'of whalebone. There were twenty feet of sand and then black earth again, and even ', delay: 82 },
            { text: 'a piece of redwood, that imperishable wood that does not rot. Before the inland sea ', delay: 92 },
            { text: 'the valley must have been a forest. And those things had happened right under our ', delay: 59 },
            { text: 'feet. And it seemed to me sometimes at night that I could feel both the ', delay: 35 },
            { text: 'sea and the redwood forest before it.\n\nOn the wide level acres of the valley ', delay: 72 },
            { text: 'the topsoil lay deep and fertile. It required only a rich winter of rain to ', delay: 91 },
            { text: 'make it break forth in grass and flowers. The spring flowers in a wet year ', delay: 111 },
            { text: 'were unbelievable. The whole valley floor, and the foothills too, would be carpeted with lupins ', delay: 134 },
            { text: 'and poppies. Once a woman told me that colored flowers would seem more bright if ', delay: 159 },
            { text: 'you added a few white flowers to give the colors definition. Every petal of blue ', delay: 136 },
            { text: 'lupin is edged with white, so that a field of lupins is more blue than ', delay: 125 },
            { text: 'you can imagine. And mixed with these were splashes of California poppies. These too are ', delay: 154 },
            { text: 'of a burning color—not orange, not gold, but if pure gold were liquid and could ', delay: 198 },
            { text: 'raise a cream, that golden cream might be like the color of the poppies. When ', delay: 154 },
            { text: 'their season was over the yellow mustard came up and grew to a great height. ', delay: 320 },
            { text: 'When my grandfather came into the valley the mustard was so tall that a man ', delay: 34 },
            { text: 'on horseback showed only his head above the yellow flowers. On the uplands the grass ', delay: 307 },
            { text: 'would be strewn with buttercups, with hen-and-chickens, with black-centered yellow violets. And a little later ', delay: 116 },
            { text: 'in the season there would be red and yellow stands of Indian paintbrush. These were ', delay: 83 },
            { text: 'the flowers of the open places exposed to the sun.\n\nUnder the live oaks, shaded ', delay: 203 },
            { text: 'and dusky, the maidenhair flourished and gave a good smell, and under the mossy banks ', delay: 218 },
            { text: 'of the water courses whole clumps of five-fingered ferns and goldy-backs hung down. Then there ', delay: 118 },
            { text: 'were harebells, tiny lanterns, cream white and almost sinful looking, and these were so rare ', delay: 114 },
            { text: 'and magical that a child, finding one, felt singled out and special all day long.\n\n', delay: 97 },
            { text: 'When June came the grasses headed out and turned brown, and the hills turned a ', delay: 99 },
            { text: 'brown which was not brown but a gold and saffron and red—an indescribable color. And ', delay: 106 },
            { text: 'from then on until the next rains the earth dried and the streams stopped. Cracks ', delay: 106 },
            { text: 'appeared on the level ground. The Salinas River sank under its sand. The wind blew ', delay: 114 },
            { text: 'down the valley, picking up dust and straws, and grew stronger and harsher as it ', delay: 26 },
            { text: 'went south. It stopped in the evening. It was a rasping nervous wind, and the ', delay: 111 },
            { text: "dust particles cut into a man's skin and burned his eyes. Men working in the ", delay: 229 },
            { text: 'fields wore goggles and tied handkerchiefs around their noses to keep the dirt out.\n\nThe ', delay: 21 },
            { text: 'valley land was deep and rich, but the foothills wore only a skin of topsoil ', delay: 99 },
            { text: 'no deeper than the grass roots; and the farther up the hills you went, the ', delay: 97 },
            { text: 'thinner grew the soil, with flints sticking through, until at the brush line it was ', delay: 114 },
            { text: 'a kind of dry flinty gravel that reflected the hot sun blindingly.\n\nI have spoken ', delay: 153 },
            { text: 'of the rich years when the rainfall was plentiful. But there were dry years too, ', delay: 56 },
            { text: 'and they put a terror on the valley. The water came in a thirty-year cycle. ', delay: 13 },
            { text: 'There would be five or six wet and wonderful years when there might be nineteen ', delay: 388 },
            { text: 'to twenty-five inches of rain, and the land would shout with grass. Then would come ', delay: 63 },
            { text: 'six or seven pretty good years of twelve to sixteen inches of rain. And then ', delay: 207 },
            { text: 'the dry years would come, and sometimes there would be only seven or eight inches ', delay: 133 },
            { text: 'of rain. The land dried up and the grasses headed out miserably a few inches ', delay: 123 },
            { text: 'high and great bare scabby places appeared in the valley. The live oaks got a ', delay: 203 },
            { text: 'crusty look and the sagebrush was gray. The land cracked and the springs dried up ', delay: 11 },
            { text: 'and the cattle listlessly nibbled dry twigs. Then the farmers and the ranchers would be ', delay: 216 },
            { text: 'filled with disgust for the Salinas Valley. The cows would grow thin and sometimes starve ', delay: 94 },
            { text: 'to death. People would have to haul water in barrels to their farms just for ', delay: 16 },
            { text: 'drinking. Some families would sell out for nearly nothing and move away. And it never ', delay: 109 },
            { text: 'failed that during the dry years the people forgot about the rich years, and during ', delay: 116 },
            { text: 'the wet years they lost all memory of the dry years. It was always that ', delay: 121 },
            { text: 'way.', delay: 4732 }
        ],
        isMarkdown: true,
        hasRealTiming: true
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

        // Handle chunks as either strings or objects with {text, delay}
        const chunkText = typeof chunk === 'string' ? chunk : chunk.text;
        const chunkDelay = typeof chunk === 'object' && chunk.delay !== undefined ? chunk.delay : null;

        // Log chunk arrival for visualization
        logChunkArrival(chunkText, isLastChunk);

        typewriter.addChunk(chunkText);
        chunkIndex++;

        // Update progress for progressive announcements
        updateStreamingProgress();

        // Get demo type to determine streaming speed
        const demoKey = demoSelect.value;
        const isFastBurst = demoKey === 'fastBurst';
        const isTechnicalDeep = demoKey === 'technicalDeep';
        const isCodeGeneration = demoKey === 'codeGeneration';
        const isSlowDemo = demoKey === 'slowStream';
        const isRealTiming = demoKey === 'salinasValley';

        // For rush demo, send chunks instantly after 60% to build up massive queue
        let delay;
        if (isRealTiming && chunkDelay !== null) {
            // Use real timing from SSE stream transcriptedTimestamp
            delay = chunkDelay;
        } else if (isRushDemo && chunkIndex > chunks.length * 0.6) {
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

    // Enable built-in cursor rendering (renderCursor: true)
    config.renderCursor = true;
    config.cursorBlinkMs = 500;

    // Create typewriter service with simplified config
    // With renderCursor: true, the service handles cursor rendering internally
    currentTypewriter = new TypewriterService(
        (text) => {
            // Update callback - text already includes cursor when visible
            stats.frameCount++;
            stats.charCount = text.length;
            updateStats();

            // Update message bubble (cursor is already included in text as HTML)
            // Always use innerHTML since cursor marker is HTML, even for plain text
            if (demo.isMarkdown) {
                currentMessageElement.innerHTML = parseMarkdown(text);
            } else {
                // For plain text, preserve line breaks but allow cursor HTML
                const textWithBreaks = text.replace(/\n/g, '<br>');
                currentMessageElement.innerHTML = textWithBreaks;
            }

            // Auto-scroll
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        {
            isMarkdown: demo.isMarkdown,
            config: config
        }
    );

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
