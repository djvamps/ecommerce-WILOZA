import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="max-w-xl mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-bold text-emerald-400 mb-4">
        ¡Pago Exitoso!
      </h1>
      <p className="text-zinc-400 mb-8">
        Tu pedido ha sido procesado con éxito. Nos pondremos en contacto para
        coordinar la entrega.
      </p>
      <Link
        href="/"
        className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-lg"
      >
        Volver al catálogo
      </Link>
    </main>
  )
}
