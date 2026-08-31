"use client"

import { useState } from "react"

interface CheckoutModalProps {
  productName: string
  size: string
  quantity: number
  price: number
  imageUrl?: string
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({
  productName,
  size,
  quantity,
  price,
  imageUrl,
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const [method, setMethod] = useState<"yape" | "contraentrega">("yape")
  const [address, setAddress] = useState("")

  if (!isOpen) return null

  const handleConfirmOrder = () => {
    const phoneNumber = "51992870423"
    const paymentText =
      method === "yape"
        ? "Pago por Yape (Adjunto la captura del pago)"
        : "Pago Contra Entrega"

    const message =
      `*¡Hola WILOZA! Quiero confirmar mi pedido:*%0A%0A` +
      `*Producto:* ${productName}%0A` +
      `*Talla:* ${size}%0A` +
      `*Cantidad:* ${quantity}%0A` +
      `*Total:* S/ ${price}%0A` +
      `*Método de Pago:* ${paymentText}%0A` +
      `*Dirección de Envío:* ${address || "A coordinar"}`

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121318] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-lg font-bold">Finalizar Pedido</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Resumen con Talla y Cantidad */}
        <div className="my-4 flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#0d0e11] p-3">
          {imageUrl && (
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#121318] p-1">
              <img
                src={imageUrl}
                alt={productName}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div>
            <p className="font-bold text-white">{productName}</p>
            <p className="text-xs text-zinc-400">
              Talla: <span className="font-bold text-white">{size}</span> |
              Cantidad: <span className="font-bold text-white">{quantity}</span>
            </p>
            <p className="text-sm font-bold text-emerald-400">
              Total: S/ {price}
            </p>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setMethod("yape")}
            className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
              method === "yape"
                ? "border-[#742284] bg-[#742284]/20 text-white"
                : "border-zinc-800 bg-[#0d0e11] text-zinc-400"
            }`}
          >
            Yape (QR)
          </button>
          <button
            onClick={() => setMethod("contraentrega")}
            className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
              method === "contraentrega"
                ? "border-emerald-500 bg-emerald-500/20 text-white"
                : "border-zinc-800 bg-[#0d0e11] text-zinc-400"
            }`}
          >
            Contra Entrega
          </button>
        </div>

        {method === "yape" && (
          <div className="mb-4 flex flex-col items-center rounded-xl border border-zinc-800 bg-[#0d0e11] p-4">
            <p className="mb-2 text-xs text-zinc-400">
              Escanea el QR con tu app de Yape:
            </p>
            <div className="relative flex h-48 w-48 items-center justify-center rounded-lg bg-white p-2">
              <img
                src="/qr-yape.png"
                alt="QR Yape WILOZA"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Envía la captura al WhatsApp tras realizar el pago.
            </p>
          </div>
        )}

        {method === "contraentrega" && (
          <div className="mb-4">
            <label className="mb-1 block text-xs text-zinc-400">
              Dirección de entrega en Lima:
            </label>
            <input
              type="text"
              placeholder="Ej: Av. Brasil 123, Jesús María"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-[#0d0e11] p-3 text-sm focus:border-zinc-600 focus:outline-none"
            />
          </div>
        )}

        <button
          onClick={handleConfirmOrder}
          className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-black transition hover:bg-emerald-600"
        >
          Confirmar Pedido por WhatsApp
        </button>
      </div>
    </div>
  )
}
