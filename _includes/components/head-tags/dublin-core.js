//
// CUSTOMIZED FILE
// Update and clean-up handling for social sharing
//
/* eslint-disable camelcase */

/**
 * Renders <head> meta and link tags
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  data
 *
 * @return     {String}  HTML meta and link elements
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const { publication } = eleventyConfig.globalData
  const { description, series_issue_number, title } = publication

  return function ({ page }) {
    const socialAuthor = contributors({ context: page.pageContributors, format: 'string' })
    const socialAuthorConnector = ', by '
    const socialAuthorString = socialAuthorConnector.concat(removeHTML(socialAuthor))

    const socialDescription = ( page.abstract ) 
      ? page.abstract
      : description.one_line || description.full
  
    const socialTitle = ( page.layout == 'cover' )
      ? title.concat( ' ', series_issue_number )
      : ( page.abstract )
      ? page.title.concat( socialAuthorString, ' | ', title, ' ', series_issue_number )
      : page.title.concat( ' | ', title, ' ', series_issue_number )
      
    const links = [
      { rel: 'schema.dcterms', href: 'https://purl.org/dc/terms/' }
    ]

    const meta = [
      {
        name: 'dcterms.title',
        content: socialTitle },
      {
        name: 'dcterms.date',
        content: publication.pub_date
      },
      {
        name: 'dcterms.description',
        content: socialDescription
      },
      {
        name: 'dcterms.identifier',
        content: publication.identifier.isbn && publication.identifier.isbn.replace(/-/g, '')
      },
      {
        name: 'dcterms.language',
        content: publication.language
      },
      {
        name: 'dcterms.rights',
        content: publication.copyright
      }
    ]

    publication.contributor.forEach((contributor) => {
      const { type, full_name, first_name, last_name } = contributor
      const name = full_name || `${first_name} ${last_name}`
      switch (type) {
        case 'primary':
          meta.push({ name: 'dcterms.creator', content: name })
          break
        case 'secondary':
          meta.push({ name: 'dcterms.contributor', content: name })
          break
        default:
          break
      }
    })

    publication.publisher.forEach(({ name, location }) => {
      meta.push({
        name: 'dcterms.publisher',
        content: `${name}, ${location}`
      })
    })

    publication.subject.forEach(({ name }) => {
      meta.push({
        name: 'dcterms.subject',
        content: name
      })
    })

    const linkTags = links.map(({ rel, href }) => (
      `<link rel="${rel}" href="${href}">`
    ))

    const metaTags = meta.map(({ name, content }) => (
      `<meta name="${name}" content="${content}">`
    ))

    return `
    ${linkTags.join('\n')}
    ${metaTags.join('\n')}
    `
  }
}
