import Entry from "./Entry";

export default class TableOfContents {
  #entries = new Array();

  /**
   * Initializes a new instance of the TableOfContents class.
   *
   * @param {Array} entries - The entries to be stored in the table of contents.
   * @return {void} This function does not return a value.
   */
  constructor(entries) {
    this.#entries = entries;
  }

  /**
   * Creates a TableOfContents instance from an XML document.
   *
   * @param {Document} doc - The XML document to parse.
   * @param {...String} selectors - The selectors to search for in order of importance.
   * @return {TableOfContents} A new TableOfContents instance containing entries parsed from the XML document.
   */
  static fromXml(doc) {
    let selectors = Array.from(arguments).map((arg) =>
      typeof arg === "string" ? arg.toLowerCase().trim() : arg
    );
    selectors.shift();

    // Take a comma separated string of html selectors
    const items = [...doc.querySelectorAll(selectors.join(","))];
    //const items = [...doc.querySelectorAll("part, chapter, appendix")];

    const entries = items.map((item) => {
      return new Entry(
        item.getAttribute("name"),
        item.getAttribute("label"),
        item.id
      );
    });
    return new TableOfContents(entries);
  }

  /**
   * Returns all entries in the table of contents.
   *
   * @return {Array} An array of Entry objects.
   */
  getEntries() {
    return this.#entries;
  }

  /**
   * Converts the table of contents to a node tree.
   *
   * @return {HTMLElement} The root element of the table of contents node tree.
   */
  toNodeTree() {
    // Make our table of contents root element
    const root = document.createElement("div");
    root.setAttribute("class", "toc-content");

    let entries = this.#entries.map((entry) => {
      return entry.toNode();
    });

    // Loop through our chapters and add them to the table of contents
    entries.forEach((node) => {
      // Make our table of contents item

      root.appendChild(node);
    });

    return root;
  }

  /**
   * Sets the active class on the table of contents item with the specified ID selector.
   *
   * @param {string} idSelector - The ID selector of the table of contents item.
   * @return {void} This function does not return anything.
   */
  static setActive(idSelector) {
    idSelector = "#" + idSelector;
    let tocItem = document.querySelector(idSelector);
    tocItem.setAttribute("class", "toc-active toc-item");
  }

  /**
   * Removes the specified class from all child elements of the given node.
   *
   * @param {HTMLElement} node - The parent node.
   * @param {string} className - The class name to be removed.
   * @return {void} This function does not return a value.
   */
  static removeClass(node, className) {
    // Remove the active class from the table of contents.

    [...node.children].map((child) => {
      child.classList.remove(className);
    });
  }
}
