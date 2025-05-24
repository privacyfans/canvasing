import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/product/product_list.json'
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

// GET method: Fetch product list
export async function GET() {
  const productLists = readData()
  return Response.json({
    message: 'Products fetched successfully',
    data: productLists,
  })
}

// POST method: Create a new product list
export async function POST(req) {
  try {
    const newProductList = await req.json()
    const productLists = readData()
    newProductList.id = productLists.length > 0 ? productLists.length + 1 : 1
    productLists.push(newProductList)
    writeData(productLists)
    return Response.json(
      {
        message: 'Product list created successfully',
        data: newProductList,
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

// PUT method: Update an existing product list
export async function PUT(req) {
  try {
    const updatedProductList = await req.json()
    const allProductLists = readData()
    const index = allProductLists.findIndex(
      (list) => list.id === updatedProductList.id
    )
    if (index !== -1) {
      allProductLists[index] = updatedProductList
      writeData(allProductLists)
      return Response.json({
        message: 'Product list updated successfully',
        data: updatedProductList,
      })
    } else {
      return Response.json(
        {
          message: 'Product list not found',
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

// DELETE method: Delete a product list
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const productLists = readData()

    const filteredProductList = productLists.filter((list) => list.id !== id)

    if (productLists.length === filteredProductList.length) {
      return Response.json(
        {
          message: `Product with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredProductList)

      return Response.json({
        data: id,
        message: 'Product record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
