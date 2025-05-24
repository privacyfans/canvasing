import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/exam/exam-list.json'
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
  const examList = readData()
  return Response.json({
    message: 'Exam list fetched successfully',
    data: examList,
  })
}

export async function POST(req) {
  try {
    const newExam = await req.json()
    const examList = readData()
    newExam.id = examList.length > 0 ? examList.length + 1 : 1
    examList.push(newExam)
    writeData(examList)
    return Response.json(
      {
        message: 'Exam added successfully',
        data: newExam,
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
    const updatedExam = await req.json()
    const examList = readData()
    const index = examList.findIndex((exam) => exam.id === updatedExam.id)
    if (index !== -1) {
      examList[index] = updatedExam
      writeData(examList)
      return Response.json({
        message: 'Exam list updated successfully',
        data: updatedExam,
      })
    } else {
      return Response.json(
        {
          message: 'Exam not found',
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
    const examList = readData()

    const filteredExam = examList.filter((exam) => exam.id !== id)

    if (examList.length === filteredExam.length) {
      return Response.json(
        {
          message: `Exam ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredExam)

      return Response.json({
        data: id,
        message: 'Exam successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting exam:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
