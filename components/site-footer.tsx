import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#0a0a0a] text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Marca / Descripción */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-black tracking-wider text-white">
              {siteConfig.name}
            </span>
            <p className="text-sm text-zinc-400">{siteConfig.description}</p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Tienda
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Todos los Polos
                </Link>
              </li>
              <li>
                <Link
                  href="/#colecciones"
                  className="transition-colors hover:text-white"
                >
                  Nuevos Lanzamientos
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Soporte
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Envíos y Entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto / Métodos de Pago */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Atención
            </h4>
            <p className="text-sm text-zinc-400">
              Atención inmediata y envíos a todo el Perú.
            </p>
            <p className="mt-2 text-sm font-bold text-[#00c980]">
              S/ Soles Peruanos
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/60 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
