//
// CUSTOMIZED FILE
// Add section name (based on directory) above article title
// Add elements for PDF footers, with last names for contributors
//
import { html } from '#lib/common-tags/index.js'
import path from 'node:path'

import checkFormat from '../../_plugins/collections/filters/output.js'

/**
 * Publication page header
 *
 * @param      {Object}  eleventyConfig
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const slugify = eleventyConfig.getFilter('slugify')
  const titleCase = eleventyConfig.getFilter('titleCase')

  const { labelDivider } = eleventyConfig.globalData.config.pageTitle
  const { imageDir } = eleventyConfig.globalData.config.figures

  const pdfConfig = eleventyConfig.globalData.config.pdf

  /**
   * @function checkPagePDF
   *
   * @param {Object} config pdf object from Quire config
   * @param {Array<string>,string,undefined} outputs outputs setting from page frontmatter
   * @param {bool} frontmatterSetting pdf page setting from page frontmatter
   *
   * Check if the PDF link should be generated for this page
   */
  const checkPagePDF = (config, outputs, frontmatterSetting) => {
    // Is the output being created?
    if (!checkFormat('pdf', { data: { outputs } })) {
      return false
    }

    // Are the footer links set?
    if (config.pagePDF.accessLinks.find((al) => al.header === true) === undefined) {
      return false
    }

    // Return the core logic check
    return (config.pagePDF.output === true && frontmatterSetting !== false) || frontmatterSetting === true
  }

  const {
    pub_date: pubDate,
    series_issue_number: issueNumber,
    title: pubTitle
  } = eleventyConfig.globalData.publication

  return function (params) {
    const {
      byline_format: bylineFormat,
      contributor,
      filePathStem,
      image,
      label,
      pageContributors,
      short_title: shortTitle,
      subtitle,
      title,
      outputs,
      page_pdf_output: pagePDFOutput,
      key
    } = params

    const classes = ['quire-page__header', 'hero']

    if (title === 'title page' || title === 'half title page') {
      classes.push('is-screen-only')
    }

    const pageLabel = label
      ? `<span class="label">${label}<span class="visually-hidden">${labelDivider}</span></span>`
      : ''

    const imageElement = image
      ? html`
          <section
            class="${classes} hero__image"
            style="background-image: url('${path.join(imageDir, image)}');"
          >
          </section>
        `
      : ''

    const contributorsElement = pageContributors
      ? html`
          <div class="quire-page__header__contributor">
            ${contributors({ context: pageContributors, format: bylineFormat })}
          </div>
        `
      : ''

    let downloadLink = ''
    const paths = filePathStem ? filePathStem.match(/[^\/]+/g) : ''
    const section = paths.length - 2
    const sectionName = paths.length > 1 ? titleCase(paths[section].replaceAll('-', ' ')) : ''

    if (checkPagePDF(pdfConfig, outputs, pagePDFOutput)) {
      const text = pdfConfig.pagePDF.accessLinks.find((al) => al.header === true).label
      const href = path.join(pdfConfig.outputDir, `${pdfConfig.filename}-${slugify(key)}.pdf`)
      downloadLink = html`
        <div class="quire-download" data-outputs-exclude="epub,pdf">
          <a class="quire-download__link" href="${href}" download><span>${text}</span><svg class="quire-download__link__icon"><use xlink:href="#download-icon"></use></svg></a>
        </div>
      `
    }

    const sectionElement = sectionName ? `<span class="section-name" data-outputs-exclude="epub,pdf">${sectionName}</span>` : ''

    const lastNames = contributor && contributor.length == 1 ? `${contributor[0].last_name}`
      : contributor && contributor.length == 2 ? `${contributor[0].last_name} and ${contributor[1].last_name}`
      : ''

    return html`
      <section class="${classes}">
        <div class="hero-body">
          <h1 class="quire-page__header__title" id="${slugify(title)}">
            ${sectionElement}
            ${pageLabel}
            ${pageTitle({ title, subtitle })}
          </h1>
          ${contributorsElement}
          ${downloadLink}
          <span class="pdf-footers__title">${lastNames} / ${markdownify(shortTitle || title)}</span>
          <span class="pdf-footers__issue">${pubTitle}, No. ${issueNumber} (${pubDate.getFullYear()})</span>
        </div>
      </section>
      ${imageElement}
    `
  }
}
