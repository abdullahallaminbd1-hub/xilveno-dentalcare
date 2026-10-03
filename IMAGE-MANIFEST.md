# BrightSmile image-slot manifest

The approved WordPress reference has **no uploaded media attachments**. Every image currently renders the theme's original generated SVG fallback art. Keep those fallbacks until a final photograph is supplied; image crops and section dimensions are defined by the original CSS and must not be changed when replacing an image.

| Image slot | File / purpose | Page(s) and rendering location | Recommended source |
|---|---|---|---|
| `home_hero` | Main clinic/hero photograph | Home, large hero image; square frame | 1200 × 1200 px, 1:1 |
| `home_about` | Practice interior | Home, About preview split | 1200 × 900 px, 4:3 |
| `about_main` | Main practice image | About, first content split | 1200 × 900 px, 4:3 |
| `about_reception` | Reception | About, “Inside the practice” gallery | 1200 × 900 px, 4:3 |
| `about_treatment` | Treatment room | About, “Inside the practice” gallery | 1200 × 900 px, 4:3 |
| `about_waiting` | Waiting area | About, “Inside the practice” gallery | 1200 × 900 px, 4:3 |
| `contact_map` | Optional location image, under existing map panel | Contact, location/map card | 1200 × 800 px, 3:2 |
| `service_<slug>` | Treatment image for each published treatment | Services card and that treatment's detail card | 1200 × 750 px, 16:10 |
| `team_<slug>` | Portrait for each fictional team profile | Team card and that profile's detail card | 900 × 1125 px, 4:5 |

The concrete `service_<slug>` slots are `service_general-dentistry`, `service_cosmetic-dentistry`, `service_teeth-whitening`, `service_dental-implants`, `service_emergency-dentistry`, and `service_preventive-care`. The concrete `team_<slug>` slots are `team_elena-marsh`, `team_marcus-hale`, `team_priya-nair`, and `team_tomas-berg`. Team entries share the `/services/<slug>/` detail template in the approved source.

## Upload, replace, and remove

The Worker keeps the slot-to-R2 object mapping in the dedicated D1 `image_slots` table and serves each image through `/media/<slot>`. The UI markup references the slot, not an R2 URL. This leaves templates unchanged when image files are replaced.

Use the single central Admin at `https://xilveno.shop/admin/`. Choose **BrightSmile Dental**, then open **Images** to manage the approved slots and **Media Library** to manage uploaded BrightSmile media. Choose an image for a slot, upload a replacement, edit its alt text, or remove it to restore the approved fallback artwork. The central Admin writes only to BrightSmile's dedicated D1/R2 resources; no separate BrightSmile Admin is provided.

For local development only, the image helper is also available:

```powershell
npm run image -- set home_hero "C:\path\to\hero.webp"
npm run image -- set home_hero "C:\path\to\replacement.webp"
npm run image -- remove home_hero
```

Append `--local` after the file path or slot to use Wrangler's local D1/R2 stores during development. Without it, the script updates the production Cloudflare resources. It validates the slot and file signature, writes/replaces the stable R2 object key, then updates D1. Removing a slot deletes its D1 mapping before deleting the R2 object, immediately restoring the generated artwork fallback. The same procedure applies to every slot above. Do not upload patient or identifiable clinical images to this fictional demo.
