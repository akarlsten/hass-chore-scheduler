import { HomeAssistant, HassEntity } from '@types'

/**
 * Resolve an entity_picture attribute to an absolute URL.
 *
 * HA entity pictures are often relative paths (e.g. /api/image/serve/<id>/512x512).
 * On desktop these resolve fine against the HA origin, but on Cast (Nest Hub) the
 * page origin is cast.home-assistant.io so relative URLs break.
 *
 * NOTE: hass.hassUrl is a METHOD (not a string) — call it with the path.
 */
export function resolveEntityPicture(
  hass: HomeAssistant | undefined,
  entity: HassEntity | undefined
): string | undefined {
  const picture = entity?.attributes?.entity_picture as string | undefined
  if (!picture) return undefined

  // Already absolute — nothing to do
  if (picture.startsWith('http://') || picture.startsWith('https://')) {
    return picture
  }

  // hass.hassUrl is a method in HA frontend: hassUrl(path?) => absolute URL
  if (picture.startsWith('/')) {
    const h = hass as any
    if (typeof h?.hassUrl === 'function') {
      try { return h.hassUrl(picture) } catch { /* fall through */ }
    }
    // Fallback: try auth.data.hassUrl (string)
    const base = h?.auth?.data?.hassUrl as string | undefined
    if (base) {
      return `${base}${picture}`
    }
  }

  // Fallback: return as-is (works on desktop where origin matches)
  return picture
}
