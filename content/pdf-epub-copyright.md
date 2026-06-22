---
title: Copyright
layout: base.11ty.js
order: 5
classes:
  - copyright
outputs:
  - epub
  - pdf
toc: false
menu: false
---

**Getty Research Journal** {.no-bottom-margin}

{{ publication.description.full }}

**Information for Scholars** {.no-bottom-margin}

The manuscripts in this issue were peer reviewed through a double-masked process in which the identities of the authors and reviewers remained anonymous. “The Getty Peacock Fresco: Unraveling Its History Through Technical and Historical Investigations” by Kenneth Lapatin, Marie Svoboda, Sierra Schiano, Monica Ganio, and Karen Trentelman, and “Becoming Simone Forti: California, 1970–72” by Megan Metcalf received single-anonymous review. “‘This Show Is So Metal’: The Curators of *Lumen: The Art and Science of Light* in Conversation” received editorial review.

To submit a manuscript, please visit
[grj.scholasticahq.com](https://grj.scholasticahq.com).
General inquiries may be sent to 
GRJ@getty.edu.

{% for press in publication.publisher %}
**Published by the {{ press.name }}, {{ press.location }}** {.no-bottom-margin}
{{ press.address | markdownify }}
{% endfor %}

{% copyright %}

**Cover**
**David Alfaro Siqueiros (Mexican, 1896–1974)**. *América tropical oprimida y destrozada por los imperialismos* (Tropical America oppressed and destroyed by imperialism) (detail), 1932, fresco applied with Arium on cement, 5.5 × 25 m. Los Angeles, Italian Hall, El Pueblo de Los Angeles Historic Monument. Art © 2026 Artists Rights Society (ARS), New York / SOMAAP, Mexico City. Photograph courtesy Thomas Hartman, IQ Magic; photo composite: James Jackson.

<div class="identifitiers">

ISSN {{ publication.identifier.issn }}
E-ISSN {{ publication.identifier.e_issn }} {.small-caps}

ISBN ONLINE {{ publication.identifier.isbn_html }}
ISBN PDF {{ publication.identifier.isbn_pdf }}
ISBN EPUB {{ publication.identifier.isbn_epub }}
ISBN PAPERBACK {{ publication.identifier.isbn_paperback }} {.small-caps}

</div>
