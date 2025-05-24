import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/events/events_list.json'
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
  const eventList = readData()
  return Response.json({
    message: 'eventList fetched successfully',
    data: eventList,
  })
}

export async function POST(req) {
  try {
    const newEvent = await req.json()
    const eventList = readData()
    newEvent.id = eventList.length > 0 ? eventList.length + 1 : 1
    eventList.push(newEvent)
    writeData(eventList)
    return Response.json(
      {
        message: 'eventList created successfully',
        data: newEvent,
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
    const updatedEvent = await req.json()
    const eventList = readData()
    const index = eventList.findIndex((event) => event.id === updatedEvent.id)
    if (index !== -1) {
      eventList[index] = updatedEvent
      writeData(eventList)
      return Response.json({
        message: 'event updated successfully',
        data: updatedEvent,
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

    const filteredEvent = eventList.filter((event) => event.id !== id)

    if (eventList.length === filteredEvent.length) {
      return Response.json(
        {
          message: `event ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredEvent)

      return Response.json({
        data: id,
        message: 'event successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
