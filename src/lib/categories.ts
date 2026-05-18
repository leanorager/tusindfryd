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
      "Gå på opdagelse i hele udvalget af håndplukkede vintage møbler og interiør. Hos Tusindfryd finder du nøje udvalgte fund med fokus på kvalitet, karakter og lang levetid. Hvert møbel er valgt med blik for æstetik, originalitet og de spor, der gør vintage interiør personligt.",
    filter: null,
  },
  {
    slug: "nyheder",
    title: "Nyheder",
    description:
      "Se de nyeste fund i shoppen. Her samles de seneste tilføjelser af vintage møbler og interiør, udvalgt for deres kvalitet, form og særlige karakter. Udvalget ændrer sig løbende, da hvert møbel er unikt og kun findes i begrænset antal.",
    filter: "Ny",
  },
  {
    slug: "sofaer",
    title: "Sofaer",
    description:
      "Find håndplukkede vintage sofaer med fokus på komfort, kvalitet og tidløst design. Udvalget rummer sofaer med karakter, originale detaljer og materialer, der er valgt til at holde længe. Hver sofa er nøje udvalgt som et møbel, der kan danne et roligt og personligt samlingspunkt i hjemmet.",
    filter: "Sofa",
  },
  {
    slug: "stole",
    title: "Stole",
    description:
      "Gå på opdagelse i vintage stole med personlighed, form og funktion. Udvalget består af håndplukkede spisebordsstole, loungestole og enkeltstående fund, hvor kvalitet, originalitet og æstetik går hånd i hånd. Hver stol er valgt for sit udtryk og sin evne til at tilføje karakter til indretningen.",
    filter: "Stol",
  },
  {
    slug: "borde",
    title: "Borde",
    description:
      "Find vintage borde med stærke materialer, rene linjer og et tidløst udtryk. Udvalget rummer alt fra sofaborde og spiseborde til mindre sideborde, der er udvalgt for deres kvalitet, funktion og særlige detaljer. Hvert bord er valgt med blik for både hverdagsbrug og æstetisk værdi.",
    filter: "Bord",
  },
  {
    slug: "lamper",
    title: "Lamper",
    description:
      "Se udvalget af vintage lamper, der skaber stemning, varme og karakter i hjemmet. Hver lampe er håndplukket med fokus på form, materialer og et udtryk, der kan holde over tid. Udvalget rummer både dekorative og funktionelle lamper, der tilfører rummet personlighed.",
    filter: "Lampe",
  },
  {
    slug: "taeppe",
    title: "Tæpper",
    description:
      "Find vintage tæpper med tekstur, farve og historie. Udvalget er udvalgt med blik for kvalitet, materialer og det rolige fundament, et tæppe kan skabe i indretningen. Hvert tæppe bidrager med varme, dybde og karakter til rummet uden at tage fokus fra helheden.",
    filter: "Tæppe",
  },
  {
    slug: "opbevaring",
    title: "Opbevaring",
    description:
      "Gå på opdagelse i vintage opbevaring, hvor funktion og æstetik mødes. Udvalget rummer skabe, reoler, kommoder og andre opbevaringsmøbler med fokus på kvalitet, anvendelighed og lang levetid. Hvert møbel er valgt som en praktisk løsning med et personligt og tidløst udtryk.",
    filter: "Opbevaring",
  },
  {
    slug: "andet",
    title: "Andet",
    description:
      "Her finder du de særlige vintage fund, der ikke passer ind i én fast kategori. Udvalget kan rumme mindre møbler, interiør og unikke objekter, der er valgt for deres kvalitet, form og karakter. Små detaljer, der kan give hjemmet personlighed og gøre indretningen mere levende.",
    filter: "Andet",
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
