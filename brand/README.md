# Brand assets

`rosica-wordmark-gold-master.png` is the supplied Rosica wordmark, exactly as
delivered. It is the master: **do not redraw, retrace, recolour or rebuild the
wordmark from type.** It is a registered mark.

`public/images/rosica-wordmark-gold.png` is the web copy — the same artwork with
its transparent margins trimmed so it can be laid out tightly. It is generated
from the master and nothing else. If the master is replaced, regenerate it:

    npx sharp-cli -i brand/rosica-wordmark-gold-master.png \
      -o public/images/rosica-wordmark-gold.png trim

The favicon (`src/app/icon.png`) is the botanical glyph cropped out of the same
artwork, placed on the brand cream. It is not a redrawing either.

This folder is deliberately outside `public/`, so the master is not web-served.
