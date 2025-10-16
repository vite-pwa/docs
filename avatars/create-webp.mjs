import fg from 'fast-glob'
import sharp from 'sharp'

async function createWebp() {
  /** @type {string[]} */
  const images = await fg('./avatars/*.png', { absolute: false })
  for (const image of images) {
    await sharp(image).resize({ width: 128, height: 128 }).webp({ quality: 100 }).toFile(
      image.replace('./avatars/', './public/team-avatars/').replace('.png', '.webp'),
    )
  }
}

createWebp()
