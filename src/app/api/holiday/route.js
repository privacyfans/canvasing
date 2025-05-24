import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/staff/holiday.json'
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
  const holiday = readData()
  return Response.json({
    message: 'holidayList fetched successfully',
    data: holiday,
  })
}

export async function POST(req) {
  try {
    const newHoliday = await req.json()
    const holidayList = readData()
    newHoliday.id = holidayList.length > 0 ? holidayList.length + 1 : 1
    holidayList.push(newHoliday)
    writeData(holidayList)
    return Response.json(
      {
        message: 'holiday added successfully',
        data: newHoliday,
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
    const updatedHoliday = await req.json()
    const holidayList = readData()
    const index = holidayList.findIndex(
      (holiday) => holiday.id === updatedHoliday.id
    )
    if (index !== -1) {
      holidayList[index] = updatedHoliday
      writeData(holidayList)
      return Response.json({
        message: 'holiday updated successfully',
        data: updatedHoliday,
      })
    } else {
      return Response.json(
        {
          message: 'holiday not found',
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
    const holidayList = readData()

    const filteredHoliday = holidayList.filter((holiday) => holiday.id !== id)

    if (holidayList.length === filteredHoliday.length) {
      return Response.json(
        {
          message: `Holiday ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredHoliday)
      return Response.json({
        data: id,
        message: 'Holiday successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting holiday:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
