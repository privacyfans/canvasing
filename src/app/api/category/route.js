import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/category-list.json'
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
  const category = readData()
  return Response.json({
    message: 'Category fetched successfully',
    data: category,
  })
}

export async function POST(req) {
  try {
    const newProject = await req.json()
    const category = readData()
    newProject.id = category.length > 0 ? category.length + 1 : 1
    category.unshift(newProject)
    writeData(category)
    return Response.json(
      {
        message: 'Category created successfully',
        data: newProject,
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
    const updatedProject = await req.json()
    const allCategories = readData()
    const index = allCategories.findIndex(
      (project) => project.id === updatedProject.id
    )
    if (index !== -1) {
      allCategories[index] = updatedProject
      writeData(allCategories)
      return Response.json({
        message: 'Category updated successfully',
        data: updatedProject,
      })
    } else {
      return Response.json(
        {
          message: 'Category not found',
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
    const categoryData = readData()

    const filteredCategories = categoryData.filter(
      (project) => project.id !== id
    )

    if (categoryData.length === filteredCategories.length) {
      return Response.json(
        {
          message: `Category with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredCategories)
      return Response.json({
        data: id,
        message: 'Category record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
