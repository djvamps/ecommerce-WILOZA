"use client"

import { useState } from "react"

import { CheckoutModal } from "./checkout-modal"

interface BuyButtonProps {
  productName: string
  price: number
  imageUrl?: string
  slug: string
}

const SIZES = ["S", "M", "L", "XL"]

export function BuyButton({
  productName,
  price,
  imageUrl,
  slug,
}: BuyButtonProps) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingStripe, setLoadingStripe] = useState(false)

  const unitPrice = price
  const totalPrice = unitPrice * quantity

  const handleStripeCheckout = async () => {
    try {
      setLoadingStripe(true)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          size: selectedSize,
          quantity,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error al iniciar el pago con Stripe")
      }
    } catch (err) {
      console.error(err)
      alert("Ocurrió un error al conectar con Stripe")
    } finally {
      setLoadingStripe(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de Talla */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Seleccionar Talla
        </p>
        <div className="flex gap-3">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex h-10 w-12 items-center justify-center rounded-xl border text-sm font-bold transition ${
                selectedSize === size
                  ? "border-emerald-500 bg-white text-black"
                  : "border-zinc-800 bg-[#121318] text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Cantidad */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Cantidad
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#121318] text-lg font-bold text-white hover:border-zinc-700"
          >
            -
          </button>
          <span className="w-8 text-center text-lg font-bold text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#121318] text-lg font-bold text-white hover:border-zinc-700"
          >
            +
          </button>
        </div>
      </div>

      {/* Botones de Pago */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleStripeCheckout}
          disabled={loadingStripe}
          className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-black transition duration-200 hover:bg-emerald-600 disabled:opacity-50"
        >
          {loadingStripe
            ? "Cargando..."
            : `Proceder al Pago (S/ ${totalPrice})`}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3.5 font-bold text-emerald-400 transition duration-200 hover:bg-emerald-500/20"
        >
          Comprar por WhatsApp
        </button>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        size={selectedSize}
        quantity={quantity}
        price={totalPrice}
        imageUrl={imageUrl}
      />
    </div>
  )
}
