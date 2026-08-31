"use client"

import { useState } from "react"

interface SizeSelectorProps {
  slug: string
}

export default function SizeSelector({ slug }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [loading, setLoading] = useState<boolean>(false)

  const sizes = ["S", "M", "L", "XL"]

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, size: selectedSize }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error al procesar el pago: " + (data.error || ""))
      }
    } catch (error) {
      console.error(error)
      alert("Error de conexión al procesar el pago.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Seleccionar Talla
        </p>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              translate="no"
              onClick={() => setSelectedSize(size)}
              className={`flex h-12 min-w-12 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all ${
                selectedSize === size
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-[#00c980] py-4 font-bold text-zinc-950 transition-all hover:bg-[#00b070] disabled:opacity-50"
      >
        {loading ? "Procesando..." : "Proceder al Pago"}
      </button>
    </div>
  )
}
