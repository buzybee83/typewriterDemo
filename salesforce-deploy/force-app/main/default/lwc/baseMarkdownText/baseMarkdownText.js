import { LightningElement, api } from 'lwc';
import { marked } from './lib/marked';

/**
 * Simplified BaseMarkdownText component for standalone demo
 * Renders markdown content with live parsing
 * Note: Uses innerHTML directly for demo purposes. In production, use proper sanitization.
 */
export default class BaseMarkdownText extends LightningElement {
    _value = '';

    /**
     * The markdown content to render
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.renderMarkdown();
    }

    /**
     * Get the formatted value of the markdown content
     * @returns {string}
     */
    @api
    getFormattedValue() {
        return String(this.value);
    }

    renderedCallback() {
        this.renderMarkdown();
    }

    renderMarkdown() {
        const container = this.template.querySelector('.markdown-wrapper');
        if (container && this._value) {
            try {
                const startTime = performance.now();
                const parsed = marked.parse(this._value);
                const parseTime = performance.now() - startTime;

                // Note: For this demo, we're using innerHTML directly
                // In production, you should use lightning/purifyLib or similar sanitization
                // eslint-disable-next-line @lwc/lwc/no-inner-html
                container.innerHTML = parsed.trim();

                // Dispatch parse time event for performance tracking
                this.dispatchEvent(new CustomEvent('markdownparsed', {
                    detail: {
                        parseTime,
                        contentLength: this._value.length
                    },
                    bubbles: true,
                    composed: true
                }));
            } catch (e) {
                console.error('BaseMarkdownText: Error rendering markdown', e);
            }
        }
    }
}
