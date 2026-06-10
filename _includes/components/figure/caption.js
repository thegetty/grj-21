//
// CUSTOMIZED FILE
// Add longdesc support
//
import { oneLine } from '#lib/common-tags/index.js'

/**
 * Figure caption and credit
 * @param      {Object} eleventyConfig  eleventy configuration
 *
 * @param      {Object} params
 * @property   {String} figure
 * @property   {String} content
 * @return     {String}  An HTML <figcaption> element
 */
export default function (eleventyConfig) {
  const markdownify = eleventyConfig.getFilter('markdownify')
  const figureMediaEmbedUrl = eleventyConfig.getFilter('figureMediaEmbedUrl')
  return function ({ caption, credit, content = '', id, longdesc, mediaId, mediaType }) {
    const { sourceUrl } = figureMediaEmbedUrl({ mediaId, mediaType })
    const mediaSourceLink = sourceUrl
      ? `<span class="q-figure__caption-embed-link"><a href="${sourceUrl}"><em>${sourceUrl}</em></a></span>`
      : ''
    const longDescElement = longdesc ? `<details class="q-figure__longdesc visually-hidden" id="${id}-longdesc" data-outputs-exclude="pdf"><summary>Image Description</summary>${longdesc}</details>` : ''
    return oneLine`
      <figcaption class="q-figure__caption">
        ${mediaSourceLink}
        ${markdownify(content)}
        <span class="q-figure__caption-content">${markdownify(caption || '')}</span>
        <span class="q-figure__credit">${markdownify(credit || '')}</span>
        ${longDescElement}
      </figcaption>
    `
  }
}
