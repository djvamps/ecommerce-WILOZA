import Image from "next/image"
import Link from "next/link"
import { createBucketClient } from "@cosmicjs/sdk"

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
})

export default async function HomePage() {
  const data = await cosmic.objects
    .find({ type: "polos" })
    .props("slug,title,metadata")

  const polos = data.objects || []

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {polos.map((polo: any, index: number) => {
          const imageUrl =
            polo.metadata?.polo_para_frontend?.url || polo.metadata?.imagen?.url

          const precio = polo.metadata?.precio
            ? Number(polo.metadata.precio).toFixed(0)
            : "50"

          return (
            <Link
              key={polo.slug}
              href={`/polos/${polo.slug}`}
              className="bg-[#121318] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-square w-full bg-[#0d0e11] flex items-center justify-center p-6 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={polo.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <span className="text-zinc-600">Sin imagen</span>
                )}
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <h2 className="text-xl font-bold text-white tracking-tight mb-2">
                  {polo.title}
                </h2>
                <p className="text-emerald-400 font-bold text-lg">
                  S/ {precio}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
