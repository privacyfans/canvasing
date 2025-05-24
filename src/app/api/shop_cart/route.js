import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/shop-cart.json'
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

// GET method: Fetch shop cart data
export async function GET() {
  const shopCartData = readData()
  return Response.json({
    message: 'Shop cart data fetched successfully',
    data: shopCartData,
  })
}

// POST method: Create a new shop cart record
export async function POST(req) {
  try {
    const newShopCart = await req.json()
    const shopCartData = readData()
    newShopCart.id = shopCartData.length > 0 ? shopCartData.length + 1 : 1
    shopCartData.push(newShopCart)
    writeData(shopCartData)
    return Response.json(
      {
        message: 'Shop cart data created successfully',
        data: newShopCart,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}

// PUT method: Update a shop cart record
export async function PUT(req) {
  try {
    const updatedShopCart = await req.json()
    const shopCartData = readData()
    const index = shopCartData.findIndex(
      (cart) => cart.id === updatedShopCart.id
    )
    if (index !== -1) {
      shopCartData[index] = updatedShopCart
      writeData(shopCartData)
      return Response.json({
        message: 'Shop cart Record updated successfully',
        data: updatedShopCart,
      })
    } else {
      return Response.json(
        {
          message: 'Shop cart Record not found',
          data: null,
        },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}

// DELETE method: Delete a shop cart record
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const shopCartData = readData()

    const filteredShopCartData = shopCartData.filter((cart) => cart.id !== id)

    if (shopCartData.length === filteredShopCartData.length) {
      return Response.json(
        {
          message: `Shop cart with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredShopCartData)
      return Response.json({
        data: id,
        message: 'Shop cart record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting shop cart:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
