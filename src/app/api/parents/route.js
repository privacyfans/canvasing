import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/parents/parents-list.json'
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
  const parentsList = readData()
  return Response.json({
    message: 'Parents List fetched successfully',
    data: parentsList,
  })
}

export async function POST(req) {
  try {
    const newParent = await req.json()
    const parentsList = readData()
    newParent.id = parentsList.length > 0 ? parentsList.length + 1 : 1
    parentsList.push(newParent)
    writeData(parentsList)
    return Response.json(
      {
        message: 'Parents added successfully',
        data: newParent,
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
    const updatedParents = await req.json()
    const parentList = readData()
    const index = parentList.findIndex(
      (parent) => parent.id === updatedParents.id
    )
    if (index !== -1) {
      parentList[index] = updatedParents
      writeData(parentList)
      return Response.json({
        message: 'Parents updated successfully',
        data: updatedParents,
      })
    } else {
      return Response.json(
        {
          message: 'Parents not found',
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
    const parentsList = readData()

    const filteredParents = parentsList.filter((parent) => parent.id !== id)

    if (parentsList.length === filteredParents.length) {
      return Response.json(
        {
          message: `Parents ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredParents)
      return Response.json({
        data: id,
        message: 'Parents successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting parent:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
