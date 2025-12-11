//
// CUSTOMIZED FILE
// Removed markdownify processing from pageTitleElement as it was already being markdownified elsewhere, line 69
// Don't link to section landing pages marked as `linked_page: false`
//
/* eslint-disable camelcase */

import { html, oneLine } from '#lib/common-tags/index.js'

/**
 * Renders a TOC list item
 *
 * @param     {Object} context
 * @param     {String} params
 * @property  {Array} children - The TOC page item's child pages
 * @property  {String} page - The TOC item's page data
 * @property  {String} presentation How the TOC should display. Possible values: ['abstract', 'brief']
 *
 * @return {String} TOC list item markup
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const icon = eleventyConfig.getFilter('icon')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const { contributorDivider } = eleventyConfig.globalData.config.tableOfContents

  return function (params) {
    const {
      children = '',
      classes = [],
      page,
      presentation
    } = params

    const {
      abstract,
      contributor: pageContributors,
      label,
      linked_page: linkedPage,
      short_title,
      subtitle,
      summary,
      title
    } = page.data

    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    const isPage = linkedPage == false ? false : true

    const pageContributorsElement = pageContributors
      ? `<span class="contributor-divider">${contributorDivider}</span><span class="contributor">${contributors({ context: pageContributors, format: 'string' })}</span>`
      : ''

    let pageTitleElement
    if (presentation === 'brief') {
      pageTitleElement = short_title || title
    } else {
      pageTitleElement = oneLine`${pageTitle({ label, subtitle, title })}${pageContributorsElement}`
    }

    const arrowIcon = `<span class="arrow" data-outputs-exclude="epub,pdf">${icon({ type: 'arrow-forward', description: '' })}</span>`

    // Returns abstract with any links stripped out
    const abstractText =
      presentation === 'abstract' && (abstract || summary)
        ? `<div class="abstract-text">${removeHTML(markdownify(abstract))}</div>`
        : ''

    let mainElement = `${pageTitleElement}${isPage && !children ? arrowIcon : ''}`

    if (isPage) {
      mainElement = `<a href="${page.url}">${mainElement}</a>`
    } else {
      mainElement = `<span class="no-landing">${mainElement}</span>`
    }

    return html`
      <li class="${classes.join(' ')}">
        ${mainElement}
        ${abstractText}
        ${children}
      </li>
    `
  }
}
