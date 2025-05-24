import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/checkout.init.json'
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
  const checkoutAddress = readData()
  return Response.json({
    message: 'All checkout address fetched successfully',
    data: checkoutAddress,
  })
}

export async function POST(req) {
  try {
    const newAddress = await req.json()
    const checkoutAddress = readData()
    newAddress.id = checkoutAddress.length > 0 ? checkoutAddress.length + 1 : 1
    checkoutAddress.push(newAddress)
    writeData(checkoutAddress)
    return Response.json(
      {
        message: 'New address created successfully',
        data: newAddress,
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
    const updatedAddress = await req.json()
    const checkoutAddress = readData()
    const index = checkoutAddress.findIndex(
      (address) => address.id === updatedAddress.id
    )
    if (index !== -1) {
      checkoutAddress[index] = updatedAddress
      writeData(checkoutAddress)
      return Response.json({
        message: 'Address updated successfully',
        data: updatedAddress,
      })
    } else {
      return Response.json(
        {
          message: 'Address not found',
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
    const checkoutAddress = readData()

    const filteredAddress = checkoutAddress.filter(
      (address) => address.id !== id
    )

    if (checkoutAddress.length === filteredAddress.length) {
      return Response.json(
        {
          message: `Address with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredAddress)
      return Response.json({
        data: id,
        message: 'Address successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting address:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
