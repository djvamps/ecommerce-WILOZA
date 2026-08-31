import { NextResponse } from "next/server"
import { createBucketClient } from "@cosmicjs/sdk"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
})

export async function POST(req: Request) {
  try {
    const { slug, size, quantity } = await req.json()

    const data = await cosmic.objects
      .findOne({ type: "polos", slug })
      .props("title,metadata")

    const polo = data.object

    if (!polo) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    const priceInSol = Number(polo.metadata?.precio || 50)
    const imageUrl =
      polo.metadata?.polo_para_frontend?.url || polo.metadata?.imagen?.url

    const selectedQuantity = Number(quantity) || 1
    const selectedSize = size || "M"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pen",
            product_data: {
              name: `${polo.title} - Talla ${selectedSize}`,
              images: imageUrl ? [imageUrl] : [],
            },
            unit_amount: Math.round(priceInSol * 100),
          },
          quantity: selectedQuantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/polos/${slug}`,
      metadata: {
        productSlug: slug,
        selectedSize: selectedSize,
        quantity: String(selectedQuantity),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
