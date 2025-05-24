import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/wishlist.json'
)

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8')
  return JSON.parse(jsonData)
}

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing file:', error)
  }
}

export async function GET() {
  try {
    const wishlist = readData()
    return new Response(
      JSON.stringify({
        message: 'Wishlist fetched successfully',
        data: wishlist,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const newWishListRecord = await request.json()
    const wishlist = readData()
    newWishListRecord.id = wishlist.length > 0 ? wishlist.length + 1 : 1
    wishlist.push(newWishListRecord)
    writeData(wishlist)
    return new Response(
      JSON.stringify({
        message: 'Wishlist created successfully',
        data: newWishListRecord,
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const updatedWishListRecord = await request.json()
    const wishlist = readData()
    const index = wishlist.findIndex(
      (wish) => wish.id === updatedWishListRecord.id
    )
    if (index !== -1) {
      wishlist[index] = updatedWishListRecord
      writeData(wishlist)
      return new Response(
        JSON.stringify({
          message: 'Wishlist Record updated successfully',
          data: updatedWishListRecord,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Wishlist Record not found',
          data: null,
        }),
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const wishlist = readData()

    const filteredWishlist = wishlist.filter((wish) => wish.id !== id)

    if (wishlist.length === filteredWishlist.length) {
      return new Response(
        JSON.stringify({
          message: `Wishlist with ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredWishlist)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Wishlist record successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting wishlist:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
