import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/order/orders-list.json'
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
  const orderslist = readData()
  return Response.json({
    message: 'Order List fetched successfully',
    data: orderslist,
  })
}

export async function POST(req) {
  try {
    const newOrder = await req.json()
    const ordersList = readData()
    newOrder.id = ordersList.length > 0 ? ordersList.length + 1 : 1
    ordersList.unshift(newOrder)
    writeData(ordersList)
    return Response.json(
      {
        message: 'Orders List created successfully',
        data: newOrder,
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
    const updatedOrder = await req.json()
    const allOrders = readData()
    const index = allOrders.findIndex((order) => order.id === updatedOrder.id)
    if (index !== -1) {
      allOrders[index] = updatedOrder
      writeData(allOrders)
      return Response.json({
        message: 'Orders List updated successfully',
        data: updatedOrder,
      })
    } else {
      return Response.json(
        {
          message: 'Orders List not found',
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
    const ordersData = readData()

    const filteredOrders = ordersData.filter((order) => order.id !== id)

    if (ordersData.length === filteredOrders.length) {
      return Response.json(
        {
          message: `Order with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredOrders)
      return Response.json({
        data: id,
        message: 'Orders List record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting Order:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
