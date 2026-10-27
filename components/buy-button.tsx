"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
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
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingStripe, setLoadingStripe] = useState(false)
  const handleAddToCart = () => {
    addItem({
      id: slug || productName,
      title: productName,
      price: price,
      quantity: quantity,
      size: selectedSize,
      imageUrl: imageUrl || "",
    })
  }
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        {/* Selector de Cantidad */}
        <div className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 w-full sm:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-4 sm:hidden">Cantidad</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-900 font-bold hover:bg-gray-100 transition"
            >
              -
            </button>
            <span className="w-8 text-center text-lg font-bold text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-900 font-bold hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Botón Añadir al Pedido */}
        <button
  type="button"
  onClick={handleAddToCart}
  className="flex-1 border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-900 hover:text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
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
  <span>AÑADIR AL PEDIDO</span>
</button>
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
