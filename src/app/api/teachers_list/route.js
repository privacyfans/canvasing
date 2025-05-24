import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/teachers/teachers-list.json'
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
    const teacherList = readData()
    return new Response(
      JSON.stringify({
        message: 'Teacher List fetched successfully',
        data: teacherList,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching teacher list:', error)
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
    const newTeacherList = await request.json()
    const teacherList = readData()
    newTeacherList.id = teacherList.length > 0 ? teacherList.length + 1 : 1
    teacherList.push(newTeacherList)
    writeData(teacherList)
    return new Response(
      JSON.stringify({
        message: 'Teacher added successfully',
        data: newTeacherList,
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
    const updatedTeacherList = await request.json()
    const teacherList = readData()
    const index = teacherList.findIndex(
      (teacher) => teacher.id === updatedTeacherList.id
    )
    if (index !== -1) {
      teacherList[index] = updatedTeacherList
      writeData(teacherList)
      return new Response(
        JSON.stringify({
          message: 'Teacher List updated successfully',
          data: updatedTeacherList,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Teacher List not found',
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
    const teacherList = readData()

    const filteredTeacherList = teacherList.filter(
      (teacher) => teacher.id !== id
    )

    if (teacherList.length === filteredTeacherList.length) {
      return new Response(
        JSON.stringify({
          message: `Teacher ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredTeacherList)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Teacher successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting teacher:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
