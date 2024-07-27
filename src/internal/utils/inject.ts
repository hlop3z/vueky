/**
 * The CSS class prefix used for custom styles.
 */
const prefixCSS = "gui-design";

/**
 * Injects replaceable CSS.
 * @param {string} code - The CSS code to inject.
 * @param {string} id - The ID of the style element to inject the code into.
 */
export const injectCSS = (code: string, id: string = "main") =>
  injectCSSBase({ code, id });

/**
 * Base function for injecting replaceable CSS.
 * @param {object} options - Options for injecting CSS.
 * @param {string} options.code - The CSS code to inject.
 * @param {string} options.id - The ID of the style element to inject the code into.
 */
function injectCSSBase({ code, id }: { code: string; id: string }) {
  const elem = getStyle(id);
  elem.textContent = removeSpace(code);
}

/**
 * Gets the style element with the specified ID, creating one if it doesn't exist.
 * @param {string} id - The ID of the style element to retrieve or create.
 * @returns {HTMLElement} - The style element with the specified ID.
 */
export function getStyle(id: string): HTMLElement {
  const found = window.document.querySelectorAll(`[${prefixCSS}="${id}"]`);
  if (found.length > 0) {
    return found[0] as HTMLElement;
  } else {
    const style = window.document.createElement("style");
    style.setAttribute(prefixCSS, id);
    window.document.head.append(style);
    return style;
  }
}

/**
 * Cleans up CSS code by removing extra spaces and newlines.
 * @param {string} text - The CSS code to clean up.
 * @returns {string} - The cleaned up CSS code.
 */
export function removeSpace(text: string): string {
  return text
    .replace(/\s\s+/g, " ")
    .replace(/\r?\n|\r/g, "")
    .trim();
}

export default injectCSS;
