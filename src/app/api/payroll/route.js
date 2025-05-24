import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/payroll/employee_salary.json'
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
  const salaryList = readData()
  return Response.json({
    message: 'salary data fetched successfully',
    data: salaryList,
  })
}

export async function POST(req) {
  try {
    const newSalary = await req.json()
    const salaryList = readData()
    newSalary.id = salaryList.length > 0 ? salaryList.length + 1 : 1
    salaryList.unshift(newSalary)
    writeData(salaryList)
    return Response.json(
      {
        message: 'salary data added successfully',
        data: newSalary,
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
    const updatedSalary = await req.json()
    const salaryList = readData()
    const index = salaryList.findIndex(
      (customer) => customer.id === updatedSalary.id
    )
    if (index !== -1) {
      salaryList[index] = updatedSalary
      writeData(salaryList)
      return Response.json({
        message: 'salary data updated successfully',
        data: updatedSalary,
      })
    } else {
      return Response.json(
        {
          message: 'salary not found',
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
    const salaryList = readData()

    const filteredSalary = salaryList.filter(
      (departmant) => departmant.id !== id
    )

    if (salaryList.length === filteredSalary.length) {
      return Response.json(
        {
          message: `salary ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredSalary)
      return Response.json({
        data: id,
        message: 'salary data successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting salary:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
