import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/staff/staff.json'
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
    const staffList = readData()
    return new Response(
      JSON.stringify({
        message: 'Staff Members fetched successfully',
        data: staffList,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching staff:', error)
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
    const newStaff = await request.json()
    const staffList = readData()
    newStaff.id = staffList.length > 0 ? staffList.length + 1 : 1
    staffList.push(newStaff)
    writeData(staffList)
    return new Response(
      JSON.stringify({
        message: 'Staff member created successfully',
        data: newStaff,
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
    const updatedStaff = await request.json()
    const staffList = readData()
    const index = staffList.findIndex((staff) => staff.id === updatedStaff.id)
    if (index !== -1) {
      staffList[index] = updatedStaff
      writeData(staffList)
      return new Response(
        JSON.stringify({
          message: 'Staff Member updated successfully',
          data: updatedStaff,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Staff Member not found',
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
    const staffList = readData()

    const filteredStaff = staffList.filter((staff) => staff.id !== id)

    if (staffList.length === filteredStaff.length) {
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
          message: 'Staff Member successfully deleted',
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
