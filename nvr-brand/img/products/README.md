# Product photos

Drop a file in this folder named after the product and it appears on the
storefront automatically. No code, no config.

```
img/products/void-05.jpg   →   VOID/05, the heavyweight polo
```

`.jpg`, `.png` and `.webp` are all tried. Until a file exists, that
product shows a drawn garment outline labelled **Illustration** — never
a fake photo. Put a real file here and the label disappears.

`js/garments.js` holds the logic.

---

## Product ids

| File | Product |
|---|---|
| `void-01.jpg` | Heavyweight tee |
| `void-02.jpg` | Boxy hoodie |
| `void-03.jpg` | Wide cargo pant |
| `void-04.jpg` | Baggy utility pant |
| `void-05.jpg` | **Heavyweight polo** |
| `signal-01.jpg` | Reflective shell |
| `signal-02.jpg` | Hi-vis cap |
| `orbit-01.jpg` | Gradient long sleeve |
| `orbit-02.jpg` | Orbital print tee |
| `static-01.jpg` | Glitch washed tee |
| `static-02.jpg` | Noise sweat |
| `ascent-01.jpg` | Numbered drop tee |
| `ascent-02.jpg` | Limited fleece |

---

## How to shoot it

A phone is fine. The light is what matters.

**Light — the whole thing.**
Stand the garment by a window. Not under a bulb. Not at night. A bulb
gives you orange shadows and a shiny plastic look. A window gives you
the colour the cloth actually is, which is the only reason to take the
photo at all.

No direct sun on the garment — it blows the colour out. Indirect
daylight is what you want.

**Lay it flat.**
Garment flat, sleeves folded in, collar squared. Camera directly
above, parallel to the floor. If you shoot at an angle the garment
looks a different shape than it is, and people send it back.

**Kill the shadows.**
One window, nothing else switched on. Shadows should be soft, not
hard-edged. If you see a crisp black shadow under the sleeve, move the
garment further from the wall.

**Square crop, plain background.**
Floor, bedspread, clean table — anything that isn't busy. The garment
fills most of the frame with a little room around the edges.

**Show the label and the weight.**
One extra shot: the care label held flat and readable. If you claim
300gsm, a photo of the label is what makes people believe it. Same for
the NVR tag.

**No filters, no sharpening, no "look at this" edits.**
The photo's job is to be accurate. A washed-out Instagram edit on a
garment that arrives darker is a refund.

---

## For each piece you want three shots

1. **Flat front** — the main one. This is what fills the card.
2. **Detail** — collar, stitching, print, the thick rib.
3. **Worn** — someone in it, facing away or at an angle. This is what
   actually sells a fit.

Only the first one is wired into the storefront. The other two belong
in the WhatsApp reply when someone asks to see it — which is exactly
what a buyer means by *"make i see."*

---

## Seller photos

Sellers upload their own through the seller page and those go to
Supabase storage. This folder is only for NVR's own pieces.