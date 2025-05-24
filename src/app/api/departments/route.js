import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/departments/department.json'
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
  const departmentList = readData()
  return Response.json({
    message: 'departments fetched successfully',
    data: departmentList,
  })
}

export async function POST(req) {
  try {
    const newDepartment = await req.json()
    const departmentList = readData()
    newDepartment.id = departmentList.length > 0 ? departmentList.length + 1 : 1
    departmentList.unshift(newDepartment)
    writeData(departmentList)
    return Response.json(
      {
        message: 'department added successfully',
        data: newDepartment,
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
    const updatedDepartment = await req.json()
    const departmentList = readData()
    const index = departmentList.findIndex(
      (department) => department.id === updatedDepartment.id
    )
    if (index !== -1) {
      departmentList[index] = updatedDepartment
      writeData(departmentList)
      return Response.json({
        message: 'department updated successfully',
        data: updatedDepartment,
      })
    } else {
      return Response.json(
        {
          message: 'department not found',
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
    const departmentList = readData()

    const filteredDepartment = departmentList.filter(
      (department) => department.id !== id
    )

    if (departmentList.length === filteredDepartment.length) {
      return Response.json(
        {
          message: `department ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredDepartment)
      return Response.json({
        data: id,
        message: 'department successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting department:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
