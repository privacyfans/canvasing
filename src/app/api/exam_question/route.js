import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/exam/question.json'
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
  const questionList = readData()
  return Response.json({
    message: 'Exam question List fetched successfully',
    data: questionList,
  })
}

export async function POST(req) {
  try {
    const newQuestion = await req.json()
    const questionList = readData()
    newQuestion.id = questionList.length > 0 ? questionList.length + 1 : 1
    questionList.push(newQuestion)
    writeData(questionList)
    return Response.json(
      {
        message: 'Question created successfully',
        data: newQuestion,
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
    const updatedQuestion = await req.json()
    const questionList = readData()
    const index = questionList.findIndex(
      (question) => question.id === updatedQuestion.id
    )
    if (index !== -1) {
      questionList[index] = updatedQuestion
      writeData(questionList)
      return Response.json({
        message: 'Question updated successfully',
        data: updatedQuestion,
      })
    } else {
      return Response.json(
        {
          message: 'Question not found',
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
    const questionList = readData()

    const filteredQuestion = questionList.filter(
      (question) => question.id !== id
    )

    if (questionList.length === filteredQuestion.length) {
      return Response.json(
        {
          message: `Question ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredQuestion)

      return Response.json({
        data: id,
        message: 'Question successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting question:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
