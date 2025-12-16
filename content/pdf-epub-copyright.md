---
title: "Masthead"
layout: base.11ty.js
order: 3
classes:
  - masthead
outputs:
  - epub
  - pdf
toc: false
menu: false 
---

{%- if publication.title -%}
<h1 class="masthead_title">{{ publication.title | markdownify }}</h1>
{%- endif -%}

<div class="masthead_info">

**Number {{ publication.series_issue_number }} • {{ publication.pub_date | date: "%Y" }}**

{% for editor in publication.series_editors %}
- {{ editor | markdownify }}
{% endfor %}

**Getty Research Journal Editorial Advisory Committee** {.no-bottom-margin}

{{ publication.series_advisory_committee | markdownify }}

{% for member in publication.project_team %}
- {{ member | markdownify }}
{% endfor %}

</div>