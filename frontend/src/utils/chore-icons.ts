/**
 * Auto-detect MDI icon based on chore name keywords.
 * Supports English and Swedish with fuzzy prefix matching.
 *
 * Each entry is a list of keyword variants that map to the same icon.
 * Keywords use prefix matching — "damm" matches "dammsuga", "dammtorka", etc.
 */

interface IconRule {
  keywords: string[]
  icon: string
}

const ICON_RULES: IconRule[] = [
  // Cleaning / Städning
  { keywords: ["vacuum", "dammsug", "dammsu"], icon: "mdi:vacuum" },
  { keywords: ["mop", "mopp", "skur"], icon: "mdi:creation" },
  { keywords: ["dust", "damm", "torka av"], icon: "mdi:spray" },
  { keywords: ["clean", "städ", "rengör", "putsa"], icon: "mdi:spray-bottle" },
  { keywords: ["wipe", "torka"], icon: "mdi:spray" },
  { keywords: ["scrub", "skrubba"], icon: "mdi:brush" },
  { keywords: ["sweep", "sopa", "broom", "kvast"], icon: "mdi:broom" },

  // Kitchen / Kök
  { keywords: ["dish", "disk", "tallrik"], icon: "mdi:dishwasher" },
  { keywords: ["cook", "laga mat", "matlagning"], icon: "mdi:pot-steam" },
  { keywords: ["grocer", "handla", "shop", "inköp", "inkop", "affär"], icon: "mdi:cart" },
  { keywords: ["trash", "garbage", "sopor", "soptunna", "avfall", "kasta"], icon: "mdi:trash-can" },
  { keywords: ["recycl", "återvinn", "atervinn", "sorter"], icon: "mdi:recycle" },
  { keywords: ["compost", "kompost"], icon: "mdi:leaf" },

  // Laundry / Tvätt
  { keywords: ["laundry", "tvätt", "tvatt"], icon: "mdi:washing-machine" },
  { keywords: ["wash", "tvätta", "tvatta"], icon: "mdi:washing-machine" },
  { keywords: ["iron", "stryk", "stryka"], icon: "mdi:tshirt-crew" },
  { keywords: ["fold", "vik", "vika"], icon: "mdi:tshirt-crew" },

  // Outdoor / Utomhus
  { keywords: ["lawn", "gräsmatta", "grasmatta", "mow", "klipp gräs", "gräsklipp"], icon: "mdi:mower-bag" },
  { keywords: ["garden", "trädgård", "tradgard", "odla"], icon: "mdi:flower" },
  { keywords: ["plant", "växt", "vaxt", "blomm"], icon: "mdi:flower" },
  { keywords: ["water", "vattna"], icon: "mdi:watering-can" },
  { keywords: ["snow", "snö", "sno", "skotta"], icon: "mdi:snowflake" },
  { keywords: ["rake", "kratta", "löv", "lov"], icon: "mdi:leaf" },

  // Pets / Husdjur
  { keywords: ["dog", "hund"], icon: "mdi:dog" },
  { keywords: ["cat", "katt"], icon: "mdi:cat" },
  { keywords: ["pet", "husdjur", "djur"], icon: "mdi:paw" },
  { keywords: ["feed", "mata", "foder"], icon: "mdi:food-drumstick" },
  { keywords: ["walk", "promen", "rast"], icon: "mdi:walk" },
  { keywords: ["litter", "kattlåd", "kattlad", "kattsan"], icon: "mdi:cat" },

  // Home / Hemmet
  { keywords: ["bed", "säng", "sang", "bädd"], icon: "mdi:bed" },
  { keywords: ["bathroom", "badrum", "toalett", "toilet", "wc"], icon: "mdi:toilet" },
  { keywords: ["shower", "dusch"], icon: "mdi:shower" },
  { keywords: ["window", "fönster", "fonster"], icon: "mdi:window-open" },
  { keywords: ["floor", "golv"], icon: "mdi:floor-plan" },
  { keywords: ["mail", "post", "brev"], icon: "mdi:mailbox" },

  // Misc / Övrigt
  { keywords: ["bill", "räkning", "rakning", "faktur"], icon: "mdi:receipt-text" },
  { keywords: ["pay", "betal"], icon: "mdi:credit-card" },
  { keywords: ["medic", "medicin", "läkemedel"], icon: "mdi:pill" },
  { keywords: ["vitamin"], icon: "mdi:pill" },
  { keywords: ["exercis", "workout", "träna", "trana", "motion"], icon: "mdi:dumbbell" },
]

const DEFAULT_ICON = "mdi:checkbox-marked-circle-outline"

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
}

function matchesAtWordBoundary(text: string, keyword: string): boolean {
  const idx = text.indexOf(keyword)
  if (idx === -1) return false
  return idx === 0 || /[\s\-_,;:(\/]/.test(text[idx - 1])
}

export function getChoreIcon(choreName: string): string {
  const normalized = normalize(choreName)
  const lower = choreName.toLowerCase()

  for (const rule of ICON_RULES) {
    for (const keyword of rule.keywords) {
      const normKeyword = normalize(keyword)

      if (matchesAtWordBoundary(normalized, normKeyword)) {
        return rule.icon
      }

      if (keyword !== normKeyword && matchesAtWordBoundary(lower, keyword)) {
        return rule.icon
      }
    }
  }

  return DEFAULT_ICON
}
