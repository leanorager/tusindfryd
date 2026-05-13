export type CategoryConfig = {
  slug: string;
  title: string;
  description: string;
  filter: string | null;
};

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "alt",
    title: "Shop Alt",
    description:
      "SS25 continues our exploration of illusion and form, creating a deeper connection to Danish heritage and identity. Traditional elements such as the fisherman's zip are reinterpreted with a fresh, youthful lens. Drawing inspiration from interior design, the collection embraces tactile surfaces, structural patterns, and a quiet elegance found in everyday objects",
    filter: null,
  },
  {
    slug: "nyheder",
    title: "Nyheder",
    description: "De nyeste tilføjelser til vores kollektion.",
    filter: "Ny",
  },
  {
    slug: "sofaer",
    title: "Sofaer",
    description: "",
    filter: "Sofa",
  },
  {
    slug: "stole",
    title: "Stole",
    description: "",
    filter: "Stol",
  },
  {
    slug: "borde",
    title: "Borde",
    description: "",
    filter: "Bord",
  },
  {
    slug: "lamper",
    title: "Lamper",
    description: "",
    filter: "Lampe",
  },
  {
    slug: "taeppe",
    title: "Tæpper",
    description: "",
    filter: "Tæppe",
  },
  {
    slug: "opbevaring",
    title: "Opbevaring",
    description: "",
    filter: "Opbevaring",
  },
  {
    slug: "andet",
    title: "Andet",
    description: "",
    filter: "Andet",
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
