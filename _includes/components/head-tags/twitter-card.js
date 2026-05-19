//
// CUSTOMIZED FILE
// Update and clean-up handling for social sharing
//
/* eslint-disable camelcase */
import escape from 'html-escape'
import path from 'node:path'

/**
 * Renders <head> <meta> data tags for Twitter Cards
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  globalData
 *
 * @return     {String}  HTML meta and link elements
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const { publication } = eleventyConfig.globalData
  const { description, promo_image, series_issue_number, title, url } = publication

  return function({ page }) {
    const socialAuthor = contributors({ context: page.pageContributors, format: 'string' })
    const socialAuthorConnector = ', by '
    const socialAuthorString = socialAuthorConnector.concat(removeHTML(socialAuthor))

    const socialDescription = ( page.abstract ) 
      ? page.abstract
      : description.one_line || description.full
    
    const socialThumbnail = url.concat('_assets/images/', promo_image )
    
    const socialTitle = ( page.layout == 'cover' )
      ? title.concat( ' ', series_issue_number )
      : ( page.abstract )
      ? page.title.concat( socialAuthorString, ' | ', title, ' ', series_issue_number )
      : page.title.concat( ' | ', title, ' ', series_issue_number )

    const meta = [
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:site',
        content: page.canonicalURL
      },
      {
        name: 'twitter:title',
        content: socialTitle
      },
      {
        name: 'twitter:description',
        content: socialDescription
      },
      {
        name: 'twitter:image',
        content: socialThumbnail
      }
    ]

    const metaTags = meta.map(({ name, content }) => (
      `<meta name="${name}" content="${escape(content)}">`
    ))
    return `${metaTags.join('\n')}`
  }
}
