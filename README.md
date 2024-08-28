# Inline Table of Contents Component

## Overview

The Inline Table of Contents (ToC) Component dynamically generates a table of contents from XML data and inserts it directly into your HTML page. This component is ideal for creating organized and navigable content structures for documentation, articles, or any content-heavy website.

## Features

- **Dynamic ToC Generation:** Automatically builds a table of contents based on XML data.
- **Inline Integration:** Retrieve the entries in the ToC to parse with any view method you wish
- **Customizable leaf names:** Fits any ToC, passing in any number of query selectors to find in the ToC XML file.

## Installation

To use the Inline ToC component, you can install it via NPM
```bash
npm install @ocdla/Table-Of-Contents
```

Then, import it in your JavaScript file:
```javascript
import TableOfContents from "@ocdla/table-of-contents";
```

## Usage

- After loading your XML file, build your index.
- You can then retrieve the entries.

```javascript
import TableOfContents from "@ocdla/table-of-contents";

// XML in this context is any fetched and parsed XML document

// Create a table of contents from the XML loaded.
// The first argument is the document. All following string arguments are the specific leaf nodes of the XML document that you want to grab.
// This assumes you've narrowed it down to the specific book you want.
const index = TableOfContents.fromXml(XML, "part", "chapter", "appendix");

// Get our entries in our toc as an array
const tocEntries = index.getEntries();

// Create an HTML node tree from our index
const nodeTree = index.toNode();

// Entries have a number of instance variables to access
tocEntries.foreach((entry) => {
  // Returns the id attribute of the related XML entry
  // EX: 'fsm-1'
  entry.getId();

  // Returns a path based on the id, replacing any '-' with a '/'
  // EX: '/fsm/1'
  entry.getHref();

  // Returns the name attribute of the related XML entry
  entry.getName();

  // Returns the label attribute of the related XML entry
  entry.getHeading();

  // Returns true if chapter is included in the label attribute
  entry.isChapter();

  // Returns anything left of the first '-' in the id attribute
  entry.getBook();

  // Returns anything after the first '-' but before the second
  entry.getUnit();
}
```

## TODO
- This element will tie heavily in with routing. Given a larger XML index to pull from, you first need to specify what book you want to look at. The current document has only one book. As we move to more books, we will need a way to narrow the XML down.
- Some of the naming is very specific and ties it more to BON. I think the `Entry` object can be updated in a way that it reads all attributes of an entry in the XML file. This would make it much more universally expandable.
- Some of the naming is also confusing. `getHeading()` relating to `this.#label` for example was from a refactor. This would be resolved with the above entry I think.
