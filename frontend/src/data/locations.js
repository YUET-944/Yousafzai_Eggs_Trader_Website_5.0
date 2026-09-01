/**
 * Contact Map Locations
 * Single centralized data structure for map pins shown on the Contact page map.
 * 
 * - Mardan: Verified exact company coordinates.
 * - Attock: Temporary city-level geographic coordinates (exact company coordinates pending).
 * - Peshawar: Temporary city-level geographic coordinates (exact company coordinates pending).
 */

export const CONTACT_LOCATIONS = [
  {
    name: 'Mardan',
    lat: 34.1907961,
    lng: 72.0485732,
    exact: true,
    // SVG coordinate mapping for Pakistan visual map viewBox (27 28 1628 1544)
    x: 1152,
    y: 349,
    labelAnchor: 'start',
    labelDx: 28,
    labelDy: 10,
  },
  {
    name: 'Attock',
    lat: 33.7667,
    lng: 72.3601,
    exact: false,
    x: 1172,
    y: 445,
    labelAnchor: 'start',
    labelDx: 28,
    labelDy: 10,
  },
  {
    name: 'Peshawar',
    lat: 34.0151,
    lng: 71.5249,
    exact: false,
    x: 1096,
    y: 390,
    labelAnchor: 'end',
    labelDx: -26,
    labelDy: 10,
  },
];

export default CONTACT_LOCATIONS;
