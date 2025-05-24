import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/product/product-grid.json'
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
  const productGrids = readData()
  return Response.json({
    message: 'Products fetched successfully',
    data: productGrids,
  })
}

export async function POST(req) {
  try {
    const newProductGrid = await req.json()
    const productGridsList = readData()
    newProductGrid.id =
      productGridsList.length > 0 ? productGridsList.length + 1 : 1
    productGridsList.push(newProductGrid)
    writeData(productGridsList)
    return Response.json(
      {
        message: 'Product grid created successfully',
        data: newProductGrid,
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

export async function PUT(req) {
  try {
    const updatedProductGrid = await req.json()
    const allProductGrids = readData()
    const index = allProductGrids.findIndex(
      (grid) => grid.id === updatedProductGrid.id
    )
    if (index !== -1) {
      allProductGrids[index] = updatedProductGrid
      writeData(allProductGrids)
      return Response.json({
        message: 'Product grid updated successfully',
        data: updatedProductGrid,
      })
    } else {
      return Response.json(
        {
          message: 'Product grid not found',
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

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const productsGridData = readData()

    const filteredProductGrid = productsGridData.filter(
      (grid) => grid.id !== id
    )

    if (productsGridData.length === filteredProductGrid.length) {
      return Response.json(
        {
          message: `Product with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredProductGrid)

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
