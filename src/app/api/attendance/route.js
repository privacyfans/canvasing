import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/staff/attendance.json'
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
  const staffAttendance = readData()
  return Response.json({
    message: 'staff attendance fetched successfully',
    data: staffAttendance,
  })
}

export async function POST(req) {
  try {
    const newAttendance = await req.json()
    const staffAttendance = readData()
    newAttendance.id =
      staffAttendance.length > 0 ? staffAttendance.length + 1 : 1
    staffAttendance.push(newAttendance)
    writeData(staffAttendance)
    return Response.json(
      {
        message: 'attendance added successfully',
        data: newAttendance,
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
    const updatedStaffAttendance = await req.json()
    const staffAttendance = readData()
    const index = staffAttendance.findIndex(
      (staff) => staff.id === updatedStaffAttendance.id
    )
    if (index !== -1) {
      staffAttendance[index] = updatedStaffAttendance
      writeData(staffAttendance)
      return Response.json({
        message: 'attendance updated successfully',
        data: updatedStaffAttendance,
      })
    } else {
      return Response.json(
        {
          message: 'attendance not found',
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
    const staffAttendance = readData()
    const filteredAttendance = staffAttendance.filter(
      (staff) => staff.id !== id
    )

    if (staffAttendance.length === filteredAttendance.length) {
      return Response.json(
        {
          message: `Attendance member ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredAttendance)
      return Response.json({
        data: id,
        message: 'Attendance successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting attendance:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
