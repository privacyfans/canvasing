import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/events/events_grid.json'
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
  const eventListGrid = readData()
  return Response.json({
    message: 'eventGrid fetched successfully',
    data: eventListGrid,
  })
}

export async function POST(req) {
  try {
    const newEventGrid = await req.json()
    const eventGrid = readData()
    newEventGrid.id = eventGrid.length > 0 ? eventGrid.length + 1 : 1
    eventGrid.push(newEventGrid)
    writeData(eventGrid)
    return Response.json(
      {
        message: 'eventGrid created successfully',
        data: newEventGrid,
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
    const updatedEventGrid = await req.json()
    const eventGrid = readData()
    const index = eventGrid.findIndex(
      (event) => event.id === updatedEventGrid.id
    )
    if (index !== -1) {
      eventGrid[index] = updatedEventGrid
      writeData(eventGrid)
      return Response.json({
        message: 'eventGrid updated successfully',
        data: updatedEventGrid,
      })
    } else {
      return Response.json(
        {
          message: 'event not found',
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
    const eventList = readData()

    const filteredEventGrid = eventList.filter((event) => event.id !== id)

    if (eventList.length === filteredEventGrid.length) {
      return Response.json(
        {
          message: `eventGrid ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredEventGrid)

      return Response.json({
        data: id,
        message: 'eventGrid successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting eventGrid:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
