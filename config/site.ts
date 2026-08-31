export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WILOZA",
  description: "Tienda de ropa oversize y streetwear para desarrolladores.",
  mainNav: [
    {
      title: "Catálogo",
      href: "/",
    },
    {
      title: "Colecciones",
      href: "/#colecciones",
    },
    {
      title: "Contacto",
      href: "/#contacto",
    },
  ],
  links: {
    x: "https://x.com/cosmicjs",
    github: "https://github.com/cosmicjs/cosmic-next-template",
    docs: "https://www.cosmicjs.com/docs",
    login: "https://app.cosmicjs.com/login",
  },
}
