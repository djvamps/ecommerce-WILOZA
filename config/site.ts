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
  description:
    "Ropa streetwear oversize diseñada para desarrolladores y diseñadores UX/UI que valoran tanto la sintaxis limpia como la estética impecable. Diseños con actitud, algodón premium de máximo confort para largas sesiones de trabajo y un fit moderno que conecta tu pasión tech con la cultura urbana. Explora la colección y lleva tu setup outfit al siguiente nivel.",
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
