---
title: "About This Issue"
layout: page
classes: 
  - masthead
order: 500
outputs:
  - html
---

Number {{ publication.series_issue_number }} • {{ publication.pub_date | date: "%Y" }} {style="color: var(--accent-color);"}

{{ publication.description.full }}

<div class="masthead_info remove-paragraph-indent">

{% for editor in publication.series_editors %}
- {{ editor | markdownify }}
{% endfor %}

**Getty Research Journal Editorial Advisory Committee**
{{ publication.series_advisory_committee | markdownify }}

</div>

{% backmatter %}

{% for person in publication.project_team %}
- {{ person | markdownify }}
{% endfor %}

<div class="other-formats">

## Other Formats

{% for link in publication.resource_link %}
{% if link.type == "other-format" %}
- [{{ link.name }}]({{ link.url }})
{% endif %}
{% endfor %}

[DOI:]{.small-caps--lowercase} {{ publication.identifier.doi }}

</div>
<div class="revision-history">

## Revision History

{{ publication.revision_statement | markdownify }}

{% for revision in publication.revision_history %}

### {{ revision.date }} {.small-caps}

{% for item in revision.summary %}
- {{ item | markdownify }}
{% endfor %}

{% endfor %}

</div>
<div class="scolars-info">

## Information for Scholars

The manuscripts in this issue were peer reviewed through a double-masked process in which the identities of the authors and reviewers remained anonymous. “‘This Show Is So Metal’: The Curators of *Lumen: The Art and Science of Light* in Conversation” received editorial review.

To submit a manuscript, please visit
[grj.scholasticahq.com](https://grj.scholasticahq.com).
General inquiries may be sent to 
GRJ@getty.edu.

</div>
<div class="copyright">

## Copyright

{{ config.quire_credit_line | markdownify }}

{% copyright %}

</div>
<div class="publisher">

{% for press in publication.publisher %}
**Published by the {{ press.name }}, {{ press.location }}**
{{ press.address | markdownify }}
{% endfor %}

</div>
<div class="cover-image-credits">

**Cover**
TK

</div>
<div class="identifiers">

## {{ publication.title }}

{% for link in publication.resource_link %}
{% if link.type == "masthead" %}
- [{{ link.name }}]({{ link.url }}) {.highlight-link}
{% endif %}
{% endfor %}

ISSN: {{ publication.identifier.issn }}
E-ISSN: {{ publication.identifier.e_issn }} {.small-caps--lowercase}

</div>

{% endbackmatter %}