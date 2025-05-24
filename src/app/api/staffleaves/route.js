import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/staff/leaves.json'
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
  try {
    const staffLeave = readData()
    return new Response(
      JSON.stringify({
        message: 'Staff Leave fetched successfully',
        data: staffLeave,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching staff leave:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const newStaffLeave = await request.json()
    const staffLeave = readData()
    newStaffLeave.id =
      staffLeave.length > 0 ? staffLeave[staffLeave.length - 1].id + 1 : 1
    staffLeave.push(newStaffLeave)
    writeData(staffLeave)
    return new Response(
      JSON.stringify({
        message: 'Staff Leave created successfully',
        data: newStaffLeave,
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const updatedStaffLeave = await request.json()
    const staffLeave = readData()
    const index = staffLeave.findIndex(
      (customer) => customer.id === updatedStaffLeave.id
    )
    if (index !== -1) {
      staffLeave[index] = updatedStaffLeave
      writeData(staffLeave)
      return new Response(
        JSON.stringify({
          message: 'Staff Leave updated successfully',
          data: updatedStaffLeave,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Staff Leave not found',
          data: null,
        }),
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const staffLeave = readData()

    const filteredStaff = staffLeave.filter((staff) => staff.id !== id)

    if (staffLeave.length === filteredStaff.length) {
      return new Response(
        JSON.stringify({
          message: `Staff Member ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredStaff)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Staff Leave successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting staff:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
