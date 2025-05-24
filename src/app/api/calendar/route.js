import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/calendar/calendar.json'
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
  const calendar = readData()
  return Response.json({
    message: 'Calendar fetched successfully',
    data: calendar,
  })
}

export async function POST(req) {
  try {
    const newProject = await req.json()
    const calendar = readData()
    newProject.id = calendar.length > 0 ? calendar.length + 1 : 1
    calendar.unshift(newProject)
    writeData(calendar)
    return Response.json(
      {
        message: 'Calendar created successfully',
        data: newProject,
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
    const updatedProject = await req.json()
    const allCalendars = readData()
    const index = allCalendars.findIndex(
      (project) => project.id === updatedProject.id
    )
    if (index !== -1) {
      allCalendars[index] = updatedProject
      writeData(allCalendars)
      return Response.json({
        message: 'Calendar updated successfully',
        data: updatedProject,
      })
    } else {
      return Response.json(
        {
          message: 'Calendar not found',
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
    const calendarsData = readData()

    const filteredCalendars = calendarsData.filter(
      (project) => project.id !== id
    )

    if (calendarsData.length === filteredCalendars.length) {
      return Response.json(
        {
          message: `Project with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredCalendars)
      return Response.json({
        data: id,
        message: 'Calendar record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
