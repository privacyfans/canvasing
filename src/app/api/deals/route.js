import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/crm/crmdeal.json')

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
  const deals = readData()
  return Response.json({
    message: 'Deals fetched successfully',
    data: deals,
  })
}

export async function POST(req) {
  try {
    const newDeal = await req.json()
    const dealList = readData()
    newDeal.id = dealList.length > 0 ? dealList.length + 1 : 1
    dealList.push(newDeal)
    writeData(dealList)
    return Response.json(
      {
        message: 'Deal created successfully',
        data: newDeal,
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
    const updatedLead = await req.json()
    const allLeads = readData()
    const index = allLeads.findIndex((lead) => lead.id === updatedLead.id)
    if (index !== -1) {
      allLeads[index] = updatedLead
      writeData(allLeads)
      return Response.json({
        message: 'Deal updated successfully',
        data: updatedLead,
      })
    } else {
      return Response.json(
        {
          message: 'Deal not found',
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
    const leadsData = readData()

    const filteredLeads = leadsData.filter((lead) => lead.id !== id)

    if (leadsData.length === filteredLeads.length) {
      return Response.json(
        {
          message: `Deal with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredLeads)
      return Response.json({
        data: id,
        message: 'Deal record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting Lead:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
