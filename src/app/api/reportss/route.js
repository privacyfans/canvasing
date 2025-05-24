import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/overview/report.json'
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

// GET method: Fetch reports
export async function GET() {
  const reports = readData()
  return Response.json({
    message: 'Reports fetched successfully',
    data: reports,
  })
}

// POST method: Create a new report
export async function POST(req) {
  try {
    const newReports = await req.json()
    const reportsList = readData()
    newReports.id = reportsList.length > 0 ? reportsList.length + 1 : 1
    reportsList.unshift(newReports)
    writeData(reportsList)
    return Response.json(
      {
        message: 'Reports created successfully',
        data: newReports,
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

// PUT method: Update a report
export async function PUT(req) {
  try {
    const updatedReports = await req.json()
    const allReports = readData()
    const index = allReports.findIndex(
      (report) => report.id === updatedReports.id
    )
    if (index !== -1) {
      allReports[index] = updatedReports
      writeData(allReports)
      return Response.json({
        message: 'Reports updated successfully',
        data: updatedReports,
      })
    } else {
      return Response.json(
        {
          message: 'Reports not found',
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

// DELETE method: Delete a report
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const allReports = readData()

    const filteredReports = allReports.filter((report) => report.id !== id)

    if (allReports.length === filteredReports.length) {
      return Response.json(
        {
          message: `Reports with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredReports)

      return Response.json({
        data: id,
        message: 'Reports successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting report:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
