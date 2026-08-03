import { createDesign, createLocation } from "./defaults";
import type { SignDesign } from "./types";

/** Seed community gallery — local-first until a backend is added. */
export const seedGallery: SignDesign[] = [
  {
    ...createDesign("food-drive"),
    id: "seed-food-hope",
    title: "Hope Pantry Weekend",
    authorName: "Maya Chen",
    published: true,
    rating: 4.9,
    forks: 128,
    locations: [
      createLocation({
        id: "seed-loc-1",
        name: "Hope Pantry",
        address: "410 Oak Avenue",
        city: "Madison",
        state: "WI",
        zip: "53703",
      }),
    ],
  },
  {
    ...createDesign("back-to-school"),
    id: "seed-school-bags",
    title: "Backpack Blessings",
    authorName: "Lincoln PTA",
    published: true,
    rating: 4.8,
    forks: 86,
    themeId: "community-blue",
    locations: [
      createLocation({
        id: "seed-loc-2",
        name: "Lincoln Elementary",
        address: "55 School Road",
        city: "Ann Arbor",
        state: "MI",
        zip: "48104",
      }),
    ],
  },
  {
    ...createDesign("winter-essentials"),
    id: "seed-winter-warmth",
    title: "Coat Drive Downtown",
    authorName: "Neighbors United",
    published: true,
    rating: 4.7,
    forks: 64,
    locations: [
      createLocation({
        id: "seed-loc-3",
        name: "City Hall Lobby",
        address: "1 Civic Plaza",
        city: "Portland",
        state: "OR",
        zip: "97204",
      }),
    ],
  },
  {
    ...createDesign("church"),
    id: "seed-church-care",
    title: "Sunday Essentials Collection",
    authorName: "Grace Fellowship",
    published: true,
    rating: 4.9,
    forks: 41,
    locations: [
      createLocation({
        id: "seed-loc-4",
        name: "Grace Fellowship",
        address: "220 Fellowship Lane",
        city: "Asheville",
        state: "NC",
        zip: "28801",
        website: "https://example.com",
        qrTarget: "website",
      }),
    ],
  },
  {
    ...createDesign("pet-supplies"),
    id: "seed-pets",
    title: "Paws & Pantry",
    authorName: "River City Rescue",
    published: true,
    rating: 4.6,
    forks: 39,
  },
  {
    ...createDesign("disaster-relief"),
    id: "seed-relief",
    title: "Storm Recovery Essentials",
    authorName: "Volunteer Corps",
    published: true,
    rating: 5,
    forks: 152,
  },
];
