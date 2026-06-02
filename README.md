This is the repository for *Getty Research Journal, No. 21*. This issue of the journal was first published September 2026, by the Getty Research Institute. It is available online at https://www.getty.edu/publications/getty-research-journal/21/ and may be downloaded there free of charge in PDF and EPUB formats.

The [*Getty Research Journal*](https://www.getty.edu/publications/getty-research-journal/) presents peer-reviewed articles on the visual arts of all cultures, regions, and time periods. Topics often relate to Getty collections, initiatives, and broad research interests. The journal welcomes a diversity of perspectives and methodological approaches, and seeks to include work that expands narratives on global culture. 

## Using this Repository

This publication was created using [Quire](http://quire.getty.edu)™, a free and open-source multiformat publishing tool from Getty.

We are dedicated to maintaining this publication for years to come at the permanent URL, https://www.getty.edu/publications/getty-research-journal/21/, and in its PDF and EPUB formats. Any post-publication updates to the journal will be made as formal revisions, and thoroughly documented here in the repository as well as in an itemized list in the online edition.

The primary content pieces of the journal can be found in the `content` directory. The `main` branch represents the current, published edition at all times, and the `revisions` branch, when present, will show changes currently under consideration. We invite you to submit suggestions or corrections via pull request on the revisions branch, by posting an issue, or by emailing us at [pubsinfo@getty.edu](mailto:pubsinfo@getty.edu).

## Development Notes

This project was last built with the following software versions:

- Node 22.21.1
- Quire CLI 1.0.0-rc.33

### Branches

| branch | about |
| --- | --- |
| `main` | The primary branch |
| `first-pages`, `second-pages`, `final-team-pages`, `final-department-pages`, `final-pages`| Versions of the project at various stages |
| `forthcoming` | A static placeholder page that was displayed at the book’s final URL on getty.edu prior to publication |
| `revisions` | Any revisions currently under consideration but not yet published |

### Figure Images Submodule

Many of figure images for *Getty Research Journal, No. 21* are licensed from third parties for use exclusively in this publication. As such, they are kept in a separate, private repository, https://github.com/thegetty/grj-21-images/, which is linked to this main publication repository as a submodule in `content/_assets/images/figures/`. When cloning this repo for further development, you’ll need access permissions for the private repository and will need to clone recursively in order to clone both the main repo and the submodule.

```
git clone --recursive https://github.com/thegetty/grj-21.git
```

### Previewing the Online Edition Locally

1. Install Node.js 22.21.1 and verify with with `node --version`

2. Install the Quire CLI with `npm install -g @thegetty/quire-cli@1.0.0-rc.33`

3. Clone this repository and select the appropriate branch

4. Run `npm install` to install the project dependencies (this just needs to be done once when first cloning the project, or whenever the core template/code files are updated)

5. Temporarily change the `url` in `content/_data/publication.yaml` to `http://localhost:8080`

6. See the preview with `quire preview`

### Creating a PDF Version

1. Temporarily switch `url` in publication.yaml to `url: 'http://localhost:8080'`

2. Run `quire build`

3. If the PDF will be sent to digital printer, run the following command to ensure color profiles are correct:

    ```
    magick mogrify -profile bin/adobe-rgb-1998.icm _site/iiif/**/print-image.jpg
    ```

4. With PrinceXML 15.3 installed, run `quire pdf --lib prince`

### Creating an EPUB Version

1. Temporarily switch `url` in publication.yaml to `url: 'http://localhost:8080'`

2. Run `quire build`

3. Run `quire epub`

4. Use a tool like , to unzip the resulting EPUB file, and in `getty-research-journal-21/ops/package.opf` add the following metadata items

    ```
    <meta property="schema:accessibilitySummary">This publications meets baseline accessibility standards</meta>
    <meta property="schema:accessMode">textual</meta>
    <meta property="schema:accessMode">visual</meta>
    <meta property="schema:accessModeSufficient">textual</meta>
    <meta property="schema:accessModeSufficient">textual,visual</meta>
    <meta property="schema:accessibilityFeature">alternativeText</meta>
    <meta property="schema:accessibilityFeature">structuralNavigation</meta>
    <meta property="schema:accessibilityFeature">tableOfContents</meta>
    <meta property="schema:accessibilityHazard">noFlashingHazard</meta>
    <meta property="schema:accessibilityHazard">noMotionSimulationHazard</meta>
    <meta property="schema:accessibilityHazard">noSoundHazard</meta>
    ```

5. Delete the original EPUB file and use the same tool to repackage the raw files into a new EPUB

6. Run the resulting file through epubcheck-5.0.0 and Ace by DAISY accessibility checker to ensure there aren't any validation or accessibility errors or warnings.

### Customizations

#### Implemented for GRJ 21

**_plugins/markdown/index.js**
Added subscript and superscript plugins 

**_includes/components/analytics.js**
**_layouts/base.11ty.js**
Update for Getty's google tag manager implementation of GA4

**_includes/components/copyright/licensing.js**
Updated the image exclusions language and moved print/pdf statement to new location

**_includes/components/head.js**
**_includes/components/head-tags/dublin-core.js**
**_includes/components/head-tags/opengraph.js**
**_includes/components/head-tags/twitter-card.js**
Update and clean-up handling for social sharing

**_includes/components/icons.js**
Replace default `fullscreen-icon` with a 600 weight version to match caption styles

**_includes/components/license-icons.js**
Remove SVG icons from EPUB output as they cause validation issues

**_includes/components/menu/header.js**
Add series number and year to menu header, as well as download links

**_includes/components/menu/item.js**
Display subtitles and contributors in sidebar menu; and don't link to section landing pages marked as `linked_page: false`

**_includes/components/menu/resources.js**
Add block for journal masthead info, and classes to others for css selecting

**_includes/components/menu/index.js**
Remove Chicago and MLA page citations from sidebar

**_includes/components/navigation.js**
Wrapp nav labels in missing span to enable hiding on mobile

**_includes/components/page-header.js**
**_layouts/essay.liquid**
Add section name (based on directory) above article title; and add elements for PDF footers

**_includes/components/table-of-contents/item/list.js**
Removed markdownify processing from pageTitleElement as it was already being markdownified elsewhere, and this let to straight apostrophes being processed when we didn't want them to be; and don't link to section landing pages marked as `linked_page: false`

**_includes/page-tools.liquid**
**_layouts/essay.liquid**
**_layouts/page.liquid**
Add page-tools include to display PDF download, DOI, abstract, and Cite

**_layouts/cover.liquid**
Add journal issue info and publisher, remove contributor

**_plugins/markdown/index.js**
Add Markdown plugins for super and subscript; add lang as an allowedAttributes for markdown

**_plugins/shortcodes/figureGroup.js**
Added caption and class parameters that can be fed in from shortcode; and simplified HTML markup to remove rows

**content/_computed/eleventyComputed.js**
Changed pagination so next/prev pages can be overridden on individual pages; and added menu_link and toc_link properties, so items in menus and toc can appear without a link to the page

**content/_assets/styles/epub.scss**
Added completely new CSS for the EPUB output

**content/_assets/fonts/index.scss**
**content/_assets/styles/variables.scss**
Add @import call for Typekit fonts; and update variables for GRJ

## License 

© 2026 J. Paul Getty Trust

The text of this work is licensed under a [Creative Commons Attribution‑NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). All images are reproduced with the permission of the rights holders acknowledged in captions and are expressly excluded from the CC BY-NC license covering the rest of this publication. These images may not be reproduced, copied, transmitted, or manipulated without consent from the owners, who reserve all rights. 

This publication uses [Skolar PE](https://rosettatype.com/SkolarPE) and [Skolar Sans PE](https://rosettatype.com/SkolarSansPE), designed by David Březina and © Rosetta Type Foundry s.r.o. The Typekit service used to deliver these fonts is provided specifically for this project by Adobe and is subject to their [Terms of Use](http://www.adobe.com/products/eulas/tou_typekit). © 2009-2023 Adobe Systems Incorporated. All Rights Reserved.

This publication was created using [Quire](http://quire.getty.edu)™, a free and open-source multiformat publishing tool from Getty that available under a [BSD 3-Clause](https://github.com/thegetty/quire/blob/main/LICENSE) license.