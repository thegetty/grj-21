//
// CUSTOMIZED FILE
// Display subtitles and contributors in sidebar menu
// Don't link to pages marked as `linked_page: false`
//
/**
 * Renders a menu item
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 * @property      {Object}  data Page data
 * @property      {String}  title Page title
 * @property      {String}  url Page url
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const { contributorDivider } = eleventyConfig.globalData.config.tableOfContents

  return function (params) {
    const { currentURL, page } = params
    const { data, url } = page
    const { contributor: pageContributors, label, linked_page: linkedPage, subtitle, title } = data

    const titleText = pageTitle({ label, subtitle, title })

    const contributorText = pageContributors 
      ? `${contributorDivider}${contributors({ context: pageContributors, format: 'string' })}` 
      : ''

    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    // const isPage = !!layout
    const isPage = linkedPage == false ? false : true
    return isPage
      ? `<a href="${url}" class="${currentURL === url ? 'active' : ''}">${titleText}${contributorText}</a>`
      : `<span class="no-landing">${titleText}</span>`
  }
}
