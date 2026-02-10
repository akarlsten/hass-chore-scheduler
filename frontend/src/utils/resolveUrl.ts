import { HomeAssistant, HassEntity } from '@types'

/**
 * Resolve an entity_picture attribute to an absolute URL.
 *
 * HA entity pictures are often relative paths (e.g. /api/image/serve/<id>/512x512).
 * On desktop these resolve fine against the HA origin, but on Cast (Nest Hub) the
 * page origin is cast.home-assistant.io so relative URLs break.
 *
 * Prepending hass.hassUrl makes the URL absolute so the Cast service worker can
 * intercept the request and attach the auth token.
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

  // Relative path — prefix with the HA instance URL when available
  const hassUrl = (hass as any)?.hassUrl as string | undefined
  if (hassUrl && picture.startsWith('/')) {
    return `${hassUrl}${picture}`
  }

  // Fallback: return as-is (works on desktop where origin matches)
  return picture
}
