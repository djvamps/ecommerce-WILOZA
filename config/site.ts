export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  mainNav: {
    title: string
    href: string
  }[]
  links: {
    x: string
    github: string
    docs: string
    login: string
  }
}

export const siteConfig: SiteConfig = {
  name: "WILOZA",
  description: "Tienda de ropa oversize y streetwear para desarrolladores.",
  url: "https://wiloza.vercel.app", // Cambia por tu dominio real
  ogImage: "https://wiloza.vercel.app/wiloza_fanpage.png", // Ruta a tu imagen de vista previa
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
