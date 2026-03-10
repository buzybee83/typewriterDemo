/**
 * BaseMarkdownText Component Demo
 * Showcases markdown rendering, citations, sanitization, and link handling
 */

// Demo content library
const DEMO_CONTENT = {
    citations: {
        title: "Response with Citations",
        markdown: `Based on your account information, here are the key details:

Your current subscription plan includes premium support and advanced analytics features. The subscription renews on March 15, 2026, with automatic billing to your registered payment method.

Recent activity shows your team has been actively using the collaboration tools, with significant engagement in the project management module. System performance has been optimal with 99.9% uptime over the past 30 days.

For any billing questions, you can review your invoice history in the account dashboard or contact our support team directly.`,
        citations: [
            {
                type: "record",
                value: "00QSB000007Je7P2AS",
                inlineMetadata: [
                    { location: 37, claim: "Account information" },
                    { location: 110, claim: "Subscription details" }
                ]
            },
            {
                type: "link",
                value: "https://docs.example.com/billing",
                inlineMetadata: [
                    { location: 210, claim: "Subscription renewal" }
                ]
            },
            {
                type: "record",
                value: "a0QSB000000XYZ123",
                inlineMetadata: [
                    { location: 305, claim: "Activity report" }
                ]
            },
            {
                type: "link",
                value: "https://status.example.com",
                inlineMetadata: [
                    { location: 450, claim: "System performance" }
                ]
            }
        ]
    },
    rich: {
        title: "Rich Markdown Features",
        markdown: `# Comprehensive Markdown Guide

This demo showcases all the markdown features supported by the **BaseMarkdownText** component.

## Text Formatting

You can use *italic text*, **bold text**, ***bold and italic***, and ~~strikethrough~~ text. There's also \`inline code\` for technical terms.

## Lists

### Unordered List
- First item with **bold text**
- Second item with *italic*
  - Nested item one
  - Nested item two
- Third item with \`code\`

### Ordered List
1. Primary step
2. Secondary step
   1. Sub-step alpha
   2. Sub-step beta
3. Final step

## Code Blocks

Here's a JavaScript example:

\`\`\`javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}
\`\`\`

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> **Pro Tip:** Always validate user input before processing!

## Links

Visit our [Documentation](https://example.com/docs) for more information.

## Horizontal Rules

Content above the line.

---

Content below the line.`,
        citations: []
    },
    code: {
        title: "Code Examples",
        markdown: `# Code Showcase

## Python Example

\`\`\`python
def calculate_fibonacci(n):
    """Calculate nth Fibonacci number"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Generate first 10 Fibonacci numbers
fib_sequence = [calculate_fibonacci(i) for i in range(10)]
print(f"Fibonacci sequence: {fib_sequence}")
\`\`\`

## SQL Query

\`\`\`sql
SELECT
    u.username,
    u.email,
    COUNT(o.order_id) as total_orders,
    SUM(o.amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.status = 'active'
GROUP BY u.user_id, u.username, u.email
HAVING COUNT(o.order_id) > 5
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

## Shell Commands

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests with coverage
npm test -- --coverage
\`\`\`

## Inline Code

Use \`npm install\` to install packages, \`git commit -m "message"\` to commit changes, and \`docker-compose up\` to start services.`,
        citations: []
    },
    table: {
        title: "Tables & Lists",
        markdown: `# Data Presentation

## Feature Comparison Table

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users | 5 | 50 | Unlimited |
| Storage | 10 GB | 100 GB | 1 TB |
| Support | Email | Priority | 24/7 Dedicated |
| API Access | ❌ | ✅ | ✅ |
| Custom Domain | ❌ | ✅ | ✅ |
| Analytics | Basic | Advanced | Enterprise |
| Price/Month | $10 | $50 | $200 |

## Task Checklist

- [x] Set up project repository
- [x] Configure CI/CD pipeline
- [x] Implement authentication
- [ ] Add payment integration
- [ ] Deploy to production
- [ ] Monitor performance

## System Requirements

### Minimum Requirements
- **CPU:** 2 cores
- **RAM:** 4 GB
- **Storage:** 20 GB SSD
- **OS:** Windows 10, macOS 10.15+, Ubuntu 20.04+

### Recommended Requirements
- **CPU:** 4+ cores
- **RAM:** 8+ GB
- **Storage:** 50+ GB NVMe SSD
- **OS:** Latest stable versions
- **Network:** 100 Mbps connection

## Priority Levels

1. **Critical** 🔴
   - Security vulnerabilities
   - Data loss issues
   - Service outages

2. **High** 🟠
   - Performance degradation
   - User-facing bugs
   - Integration failures

3. **Medium** 🟡
   - UI inconsistencies
   - Minor feature issues
   - Documentation gaps

4. **Low** 🟢
   - Cosmetic improvements
   - Nice-to-have features
   - Code refactoring`,
        citations: []
    }
};

// State
let currentDemo = 'citations';
let eventCount = 0;

// DOM Elements
const markdownOutput = document.getElementById('markdownOutput');
const citationsContainer = document.getElementById('citationsContainer');
const demoSelect = document.getElementById('demoSelect');
const renderBtn = document.getElementById('renderBtn');
const clearBtn = document.getElementById('clearBtn');
const eventLog = document.getElementById('eventLog');

// Initialize
demoSelect.addEventListener('change', (e) => {
    currentDemo = e.target.value;
    logEvent(`Selected demo: ${DEMO_CONTENT[currentDemo].title}`);
});

renderBtn.addEventListener('click', renderCurrentDemo);
clearBtn.addEventListener('click', clearDemo);

// Log events
function logEvent(message) {
    eventCount++;
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    const timestamp = new Date().toLocaleTimeString();
    eventItem.innerHTML = `
        <span class="event-time">${timestamp}</span> - ${message}
    `;
    eventLog.insertBefore(eventItem, eventLog.firstChild);

    // Keep only last 5 events
    while (eventLog.children.length > 5) {
        eventLog.removeChild(eventLog.lastChild);
    }
}

// Render markdown
function renderCurrentDemo() {
    const demo = DEMO_CONTENT[currentDemo];

    logEvent(`Rendering: ${demo.title}`);

    // Render markdown with citations
    const html = renderMarkdown(demo.markdown, demo.citations);
    markdownOutput.innerHTML = html;

    // Add click listeners to links
    addLinkClickListeners();

    // Render citations panel
    renderCitations(demo.citations);

    logEvent(`Rendered successfully (${demo.citations.length} citations)`);
}

// Add link click listeners
function addLinkClickListeners() {
    const links = markdownOutput.querySelectorAll('a');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const text = link.textContent;

            // Check if it's a citation link
            if (href === '#' && text.match(/\[\d+\]/)) {
                e.preventDefault();
                const sourceId = extractSourceId(text);
                handleCitationClick(sourceId);
            } else if (href !== '#') {
                e.preventDefault();
                handleHyperlinkClick(href, text);
            }
        });
    });
}

// Handle citation link click
function handleCitationClick(sourceId) {
    logEvent(`Citation clicked: [${sourceId}]`);

    // Highlight citation card
    const cards = citationsContainer.querySelectorAll('.citation-card');
    cards.forEach((card, index) => {
        if (index === sourceId - 1) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => card.classList.remove('active'), 2000);
        } else {
            card.classList.remove('active');
        }
    });
}

// Handle hyperlink click
function handleHyperlinkClick(url, text) {
    logEvent(`Hyperlink clicked: ${text.substring(0, 30)}...`);

    // In a real implementation, this would use routing service
    // For demo, just show alert
    if (confirm(`Navigate to: ${url}?`)) {
        window.open(url, '_blank');
    }
}

// Render citations panel
function renderCitations(citations) {
    citationsContainer.innerHTML = '';

    if (!citations || citations.length === 0) {
        citationsContainer.innerHTML = '<p style="color: #999; font-size: 14px;">No citations in this demo</p>';
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
            <div style="margin-top: 8px; font-size: 11px; color: #999;">
                ${citation.inlineMetadata.length} reference${citation.inlineMetadata.length > 1 ? 's' : ''}
            </div>
        `;

        card.addEventListener('click', () => {
            handleCitationClick(index + 1);
            logEvent(`Citation card clicked: [${index + 1}]`);
        });

        citationsContainer.appendChild(card);
    });
}

// Clear demo
function clearDemo() {
    markdownOutput.innerHTML = '<p style="color: #999;">Select a demo and click "Render Demo"</p>';
    citationsContainer.innerHTML = '<p style="color: #999; font-size: 14px;">Citations will appear here</p>';
    logEvent('Demo cleared');
}

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    renderCurrentDemo();
    logEvent('Demo initialized');
});
