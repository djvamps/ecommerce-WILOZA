"use client"
import { siteConfig } from "@/config/site"
import { useCart } from "@/lib/cart-context"
import { MainNav } from "@/components/main-nav"
// Puedes importar un icono de carrito o usar el SVG directo como abajo

export function SiteHeader() {
  const { totalItems, setIsOpen } = useCart()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-900 text-white backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex items-center space-x-4">
          {/* Botón de Carrito con el diseño estándar */}
          <button 
          onClick={() => setIsOpen(true)}
            className="relative p-2 text-white hover:text-gray-300 transition flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 border border-zinc-700 shadow-sm"
            aria-label="Ver carrito"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            
           {/* Burbuja Verde con el Número de Ítems */}
  {totalItems > 0 && (
    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
      {totalItems}
    </span>
  )}
          </button>
        </div>
      </div>
    </header>
  )
}