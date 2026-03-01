import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create Categories
  const categoryTravelGear = await prisma.category.create({
    data: {
      name: 'Travel Gear',
      description: 'High-quality equipment for your journey.',
    },
  })

  const categoryLocalCrafts = await prisma.category.create({
    data: {
      name: 'Local Crafts',
      description: 'Authentic Sri Lankan handcrafted goods.',
    },
  })

  // Create Products
  const products = [
    {
      name: 'Premium Canvas Backpack',
      description: 'Durable, weather-resistant backpack perfect for hiking the Ella trails.',
      price: 120.0,
      images: ['https://placehold.co/600x800/e2e8f0/1e293b?text=Backpack'],
      categoryId: categoryTravelGear.id,
    },
    {
      name: 'Ceylon Sapphire Necklace',
      description: 'Handcrafted silver necklace featuring a brilliant blue Ceylon sapphire.',
      price: 350.0,
      images: ['https://placehold.co/600x800/e2e8f0/1e293b?text=Sapphire'],
      categoryId: categoryLocalCrafts.id,
    },
    {
      name: 'Tropical Safari Hat',
      description: 'Wide-brimmed protection for your Yala National Park safari adventures.',
      price: 45.0,
      images: ['https://placehold.co/600x800/e2e8f0/1e293b?text=Safari+Hat'],
      categoryId: categoryTravelGear.id,
    },
    {
      name: 'Artisan Wooden Mask',
      description: 'Traditional carved wooden mask used in Sri Lankan cultural dances.',
      price: 85.0,
      images: ['https://placehold.co/600x800/e2e8f0/1e293b?text=Wooden+Mask'],
      categoryId: categoryLocalCrafts.id,
    }
  ]

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
