//
// CUSTOMIZED FILE
// Add series number and year to menu header, as well as download links
//
/* eslint-disable camelcase */

import { html } from '#lib/common-tags/index.js'

/**
 * Publication title block in menu
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 * @property   {String}  currentURL
 * @property   {Array|String}   contributors - publication contributors array or string override
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const siteTitle = eleventyConfig.getFilter('siteTitle')
  const { contributor: publicationContributors, contributor_as_it_appears, identifier, resource_link: resourceLinks, series_issue_number, pub_date } = eleventyConfig.globalData.publication

  return function (params) {
    const { currentURL } = params
    const isHomePage = currentURL === '/'

    const homePageLinkOpenTag = isHomePage ? '' : '<a class="quire-menu__header__title-link" href="/">'
    const homePageLinkCloseTag = isHomePage ? '' : '</a>'

    const pubYear = pub_date.getFullYear()
    const issueContent = `Number ${series_issue_number} • ${pubYear}`

    const contributorContent = contributor_as_it_appears || contributors({ context: publicationContributors, format: 'string', type: 'primary' })

    const contributorElement = contributorContent
      ? `<span class="visually-hidden">Contributors: </span>${contributorContent}`
      : ''
    
    const linkList = eleventyConfig.getFilter('linkList')
    const otherFormats = resourceLinks.filter(({ type }) => type === 'other-format')
    
    const otherFormatElement = otherFormats.length
      ? html`${linkList({ links: otherFormats, classes: ['menu-list'] })}`
      : ''

    return html`
      <header class="quire-menu__header">
        <div class="quire-menu__header-wrapper">
        ${homePageLinkOpenTag}
          <h4 class="quire-menu__header__title">
            <span class="visually-hidden">Site Title: </span>
            ${siteTitle()}
          </h4>
        ${homePageLinkCloseTag}
        <div class="quire-menu__header__issue-info">
          ${issueContent}
        </div>
        </div>
        <div class="quire-menu__header__formats" role="complementary" aria-label="downloads">
          ${otherFormatElement}
          <a class="quire-menu__header__doi-link" href="${identifier.doi}">${identifier.doi}</a>
        </div>
      </header>
    `
  }
}
