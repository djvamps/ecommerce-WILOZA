import Image from "next/image"
import Link from "next/link"
import { createBucketClient } from "@cosmicjs/sdk"

import { BuyButton } from "@/components/buy-button"

import SizeSelector from "./SizeSelector"

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
})

export default async function PoloDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const data = await cosmic.objects
    .findOne({ type: "polos", slug: params.slug })
    .props("title,metadata,slug")

  const polo = data.object

  if (!polo) {
    return (
      <div className="p-10 text-center text-white">Producto no encontrado</div>
    )
  }

  const imageUrl =
    polo.metadata?.polo_para_frontend?.url || polo.metadata?.imagen?.url

  const precio = polo.metadata?.precio ? Number(polo.metadata.precio) : 50

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Imagen del Producto */}
        <div className="flex items-center justify-center rounded-2xl bg-[#0d0e11] p-8">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={polo.title}
              width={800}
              height={600}
              priority
              className="h-auto max-h-[500px] w-full object-contain"
            />
          )}
        </div>

        {/* Información y Compra */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="mb-2 text-4xl font-extrabold text-white">
              {polo.title}
            </h1>
            <p className="text-3xl font-bold text-[#00c980]">S/ {precio}</p>
          </div>

          {/* Botón de compra único con modal e imagen */}
          <BuyButton
            productName={polo.title}
            price={precio}
            imageUrl={imageUrl}
            slug={polo.slug}
          />

          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Polo de algodón reactivo de alta densidad. Corte oversize premium
            con estampados en serigrafía digital.
          </p>
        </div>
      </div>
    </main>
  )
}
