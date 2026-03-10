/**
 * Markdown utilities extracted from baseMarkdownText component
 */

/**
 * Inserts citation markers into markdown text and returns the updated text
 *
 * @param {string} markdownText markdown text
 * @param {Array} citedReferences citedReferences
 * @param {string} linkText citation link text
 * @returns {string} markdown text with citation markers inserted
 */
function insertCitationsMarkers(markdownText, citedReferences, linkText) {
    const citationMarkersMap = getCitationMarkersMap(citedReferences);
    const citationLocations = getCitationLocations(citationMarkersMap);

    citationLocations.forEach((location) => {
        const sources = citationMarkersMap[location];

        let citationMarkers = '';
        sources.forEach((source) => {
            const linkTitle = getLinkTitle(linkText, source);
            citationMarkers = `${citationMarkers}[[${source}]](# "${linkTitle}")`;
        });
        markdownText =
            markdownText.slice(0, location) +
            citationMarkers +
            ' ' +
            markdownText.slice(location, markdownText.length);
    });
    return markdownText;
}

/**
 * Returns a map of citation locations to sources {10: [1,2], 20: [2]}
 *
 * @param {Array} citedReferences cited references
 * @returns {object} citation markers map
 */
function getCitationMarkersMap(citedReferences) {
    const citationMarkersMap = {};
    citedReferences.forEach((citedReference, index) => {
        citedReference.inlineMetadata?.forEach((inlineMetadata) => {
            const location = inlineMetadata.location;
            if (citationMarkersMap[location]) {
                citationMarkersMap[location].push(index + 1);
            } else {
                citationMarkersMap[location] = [index + 1];
            }
        });
    });
    return citationMarkersMap;
}

/**
 *
 * @param {object} citationMarkersMap citation markers map
 * @returns {Array} sorted array of citation locations in descending order
 */
function getCitationLocations(citationMarkersMap) {
    return Object.keys(citationMarkersMap)
        .map((value) => parseInt(value, 10))
        .sort((a, b) => b - a);
}

/**
 * Gets the link title for a source
 *
 * @param {string} linkText navigation link text
 * @param {number} sourceId source id
 * @returns {string} link title
 */
function getLinkTitle(linkText, sourceId) {
    return linkText.replace('{0}', sourceId.toString());
}

/**
 * @param {string} value source text
 * @returns {number} source id
 * Returns 1 for value [1]
 */
function extractSourceId(value) {
    const sourceText = value.slice(1, value.length - 1);
    return parseInt(sourceText, 10);
}

/**
 * Sanitize configuration for DOMPurify
 * Extracted from sanitizeConfig.js
 */
const tagsWhitelist = [
    'a', 'abbr', 'acronym', 'address', 'b', 'br', 'big', 'blockquote',
    'caption', 'cite', 'code', 'col', 'colgroup', 'del', 'div', 'dl',
    'dd', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i',
    'img', 'ins', 'kbd', 'li', 'ol', 'mark', 'p', 'param', 'pre', 'q',
    's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'table',
    'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'tt', 'u', 'ul', 'var',
    'strike', 'font'
];

const attrWhitelist = [
    'accept', 'action', 'align', 'alt', 'autocomplete', 'background',
    'bgcolor', 'border', 'cellpadding', 'cellspacing', 'checked', 'cite',
    'class', 'clear', 'color', 'cols', 'colspan', 'coords', 'datetime',
    'default', 'dir', 'disabled', 'download', 'enctype', 'face', 'for',
    'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id',
    'ismap', 'label', 'lang', 'list', 'loop', 'low', 'max', 'maxlength',
    'media', 'method', 'min', 'multiple', 'name', 'noshade', 'novalidate',
    'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'poster',
    'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required',
    'rev', 'reversed', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected',
    'shape', 'size', 'span', 'srclang', 'start', 'src', 'step', 'style',
    'summary', 'tabindex', 'target', 'title', 'type', 'usemap', 'valign',
    'value', 'width', 'xmlns', 'data-fileid'
];

const uriAllowList = [
    'ftp', 'ftps', 'http', 'https', 'mailto', 'tel', 'callto',
    'cid', 'xmpp', 'ciscotel', 'navision'
];

const uriAllowListString = uriAllowList.join('|');
const allowedUriRegString = `^(?:(?:${uriAllowListString}):|[^a-z]|[a-z+.\\-]+(?:[^a-z+.\\-:]|$))`;
const allowedUriRegEx = new RegExp(allowedUriRegString, 'i');

const sanitizeConfig = {
    ALLOWED_TAGS: tagsWhitelist,
    ALLOWED_ATTR: attrWhitelist,
    ALLOWED_URI_REGEXP: allowedUriRegEx,
    ALLOW_UNKNOWN_PROTOCOLS: false
};

/**
 * Sanitize HTML using DOMPurify
 *
 * @param {string} html HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
function sanitizeHTML(html) {
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(html, sanitizeConfig);
    }
    // Fallback if DOMPurify is not available
    console.warn('DOMPurify not loaded, returning unsanitized HTML');
    return html;
}

/**
 * Render markdown with citations
 *
 * @param {string} value Markdown content
 * @param {Array} citedReferences Array of citation references
 * @returns {string} Sanitized HTML
 */
function renderMarkdown(value, citedReferences = null) {
    let content = value;

    // Insert citations if provided
    if (citedReferences && citedReferences.length > 0) {
        content = insertCitationsMarkers(
            value,
            citedReferences,
            'View source {0}'
        );
    }

    // Parse markdown
    const html = marked.parse(content);

    // Sanitize
    return sanitizeHTML(html);
}
