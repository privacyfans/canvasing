import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/invoice/invoices-list.json'
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
  const invoiceList = readData()
  return Response.json({
    message: 'Invoice list fetched successfully',
    data: invoiceList,
  })
}

export async function POST(req) {
  try {
    const newInvoiceRecord = await req.json()
    const invoiceList = readData()
    newInvoiceRecord.id = invoiceList.length > 0 ? invoiceList.length + 1 : 1
    invoiceList.push(newInvoiceRecord)
    writeData(invoiceList)
    return Response.json(
      {
        message: 'Invoice record created successfully',
        data: newInvoiceRecord,
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
    const updateInvoice = await req.json()
    const invoiceList = readData()
    const index = invoiceList.findIndex(
      (invoice) => invoice.id === updateInvoice.id
    )
    if (index !== -1) {
      invoiceList[index] = updateInvoice
      writeData(invoiceList)
      return Response.json({
        message: 'Invoice record updated successfully',
        data: updateInvoice,
      })
    } else {
      return Response.json(
        {
          message: 'Invoice record not found',
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
    const invoiceList = readData()

    const filteredInvoiceList = invoiceList.filter(
      (invoice) => invoice.id !== id
    )

    if (invoiceList.length === filteredInvoiceList.length) {
      return Response.json(
        {
          message: `Invoice record with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredInvoiceList)
      return Response.json({
        data: id,
        message: 'Invoice record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
