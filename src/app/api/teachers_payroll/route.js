import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/teachers/payroll.json'
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
    const payrollList = readData()
    return new Response(
      JSON.stringify({
        message: 'Teacher payroll fetched successfully',
        data: payrollList,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching payroll:', error)
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
    const newPayroll = await request.json()
    const payrollList = readData()
    newPayroll.id = payrollList.length > 0 ? payrollList.length + 1 : 1
    payrollList.push(newPayroll)
    writeData(payrollList)
    return new Response(
      JSON.stringify({
        message: 'Teacher payroll created successfully',
        data: newPayroll,
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
    const updatedPayroll = await request.json()
    const payrollList = readData()
    const index = payrollList.findIndex(
      (staff) => staff.id === updatedPayroll.id
    )
    if (index !== -1) {
      payrollList[index] = updatedPayroll
      writeData(payrollList)
      return new Response(
        JSON.stringify({
          message: 'Teacher payroll updated successfully',
          data: updatedPayroll,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Teacher payroll not found',
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
    const payrollList = readData()

    const filteredPayroll = payrollList.filter((staff) => staff.id !== id)

    if (payrollList.length === filteredPayroll.length) {
      return new Response(
        JSON.stringify({
          message: `Payroll ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredPayroll)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Payroll successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting payroll:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
