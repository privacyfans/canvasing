import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/projects/grid.json')

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

// GET method: Fetch project grid
export async function GET() {
  const projectsGrid = readData()
  return Response.json({
    message: 'Projects grid fetched successfully',
    data: projectsGrid,
  })
}

// POST method: Create a new project record
export async function POST(req) {
  try {
    const newProject = await req.json()
    const projectsGrid = readData()
    newProject.id = projectsGrid.length > 0 ? projectsGrid.length + 1 : 1
    projectsGrid.push(newProject)
    writeData(projectsGrid)
    return Response.json(
      {
        message: 'Projects Grid created successfully',
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

// PUT method: Update an existing project record
export async function PUT(req) {
  try {
    const updatedProject = await req.json()
    const allProjects = readData()
    const index = allProjects.findIndex(
      (project) => project.id === updatedProject.id
    )
    if (index !== -1) {
      allProjects[index] = updatedProject
      writeData(allProjects)
      return Response.json({
        message: 'Projects Grid updated successfully',
        data: updatedProject,
      })
    } else {
      return Response.json(
        {
          message: 'Projects Grid not found',
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

// DELETE method: Delete a project record
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const projectsData = readData()

    const filteredProjects = projectsData.filter((project) => project.id !== id)

    if (projectsData.length === filteredProjects.length) {
      return Response.json(
        {
          message: `Project with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredProjects)

      return Response.json({
        data: id,
        message: 'Projects Grid record successfully deleted',
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
