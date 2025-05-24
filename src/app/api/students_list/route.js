import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/students/students-list.json'
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
    const studentList = readData()
    return new Response(
      JSON.stringify({
        message: 'Student List fetched successfully',
        data: studentList,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching student list:', error)
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
    const newStudentList = await request.json()
    const studentList = readData()
    newStudentList.id = studentList.length > 0 ? studentList.length + 1 : 1
    studentList.push(newStudentList)
    writeData(studentList)
    return new Response(
      JSON.stringify({
        message: 'Student added successfully',
        data: newStudentList,
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
    const updatedStudentList = await request.json()
    const studentList = readData()
    const index = studentList.findIndex(
      (student) => student.id === updatedStudentList.id
    )
    if (index !== -1) {
      studentList[index] = updatedStudentList
      writeData(studentList)
      return new Response(
        JSON.stringify({
          message: 'Student List updated successfully',
          data: updatedStudentList,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Student List not found',
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
    const studentList = readData()

    const filteredStudentList = studentList.filter(
      (student) => student.id !== id
    )

    if (studentList.length === filteredStudentList.length) {
      return new Response(
        JSON.stringify({
          message: `Student ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredStudentList)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Student successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
