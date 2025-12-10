//
// CUSTOMIZED FILE
// Add block for journal masthead info, and remove related resource and other format blocks
//
import { html } from '#lib/common-tags/index.js'

/**
 * Renders the "Other Formats" and "Resources" sections of the menu
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 */
export default function (eleventyConfig) {
  const 
    { identifier,
      resource_link: resourceLinks, 
      title } = eleventyConfig.globalData.publication

  return function () {
    if (!Array.isArray(resourceLinks)) return ''

    const linkList = eleventyConfig.getFilter('linkList')

    const mastheadLinks = resourceLinks.filter(({ type }) => type === 'masthead')

    const mastheadElement = mastheadLinks.length
      ? html`
        <div class="quire-menu__formats quire-menu__formats--masthead-links">
          <h6>${title}</h6>
          <div>
            ${linkList({ links: mastheadLinks, classes: ['menu-list'] })}
            <p class="small-caps--lowercase">ISSN: ${identifier.issn}<br />
            E-ISSN: ${identifier.e_issn}</p>
          </div>
        </div>`
      : ''

    return html`
      ${mastheadElement}
    `
  }
}
