import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/crm/crmlead.json')

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
  const leads = readData()
  return Response.json({
    message: 'Leads fetched successfully',
    data: leads,
  })
}

export async function POST(req) {
  try {
    const newLead = await req.json()
    const leadsList = readData()
    newLead.id = leadsList.length > 0 ? leadsList.length + 1 : 1
    leadsList.push(newLead)
    writeData(leadsList)
    return Response.json(
      {
        message: 'Lead created successfully',
        data: newLead,
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
        message: 'Lead updated successfully',
        data: updatedLead,
      })
    } else {
      return Response.json(
        {
          message: 'Lead not found',
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
          message: `Lead with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredLeads)
      return Response.json({
        data: id,
        message: 'Lead record successfully deleted',
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
