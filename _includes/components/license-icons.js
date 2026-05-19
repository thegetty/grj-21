//
// CUSTOMIZED FILE
// Remove SVG icons from EPUB output as they cause validation issues
//
import { html } from '#lib/common-tags/index.js'

export default function (eleventyConfig) {
  return function (license) {
    const abbreviations = license
      .abbreviation
      .toLowerCase()
      .split(' ')
      .flatMap((item) => item.split('-'))

    const icons = abbreviations.map((abbr) => {
      return html`
        <svg class="quire-copyright__icon">
          <use xlink:href="#${abbr}"></use>
        </svg>
      `
    })

    return html`
      <a class="quire-copyright__icon__link" href="${license.url}" rel="license" target="_blank" data-outputs-exclude="epub">
        ${icons.join(' ')}
      </a>
    `
  }
}
