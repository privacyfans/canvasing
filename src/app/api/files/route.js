import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/filemanager/files.json'
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

// GET Method
export async function GET() {
  try {
    const files = readData()
    return new Response(
      JSON.stringify({ message: 'files fetched successfully', data: files }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error fetching files:', error)
    return new Response(
      JSON.stringify({ message: 'Internal server error', data: null }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// POST Method
export async function POST(req) {
  try {
    const body = await req.json()
    const filesList = readData()
    body.id = filesList.length > 0 ? filesList.length + 1 : 1
    filesList.push(body)
    writeData(filesList)

    return new Response(
      JSON.stringify({ message: 'files created successfully', data: body }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({ message: 'Internal server error', data: null }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// PUT Method
export async function PUT(req) {
  try {
    const updatedfiles = await req.json()
    const allfiles = readData()
    const index = allfiles.findIndex((files) => files.id === updatedfiles.id)

    if (index !== -1) {
      allfiles[index] = updatedfiles
      writeData(allfiles)

      return new Response(
        JSON.stringify({
          message: 'files updated successfully',
          data: updatedfiles,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({ message: 'files not found', data: null }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({ message: 'Internal server error', data: null }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// DELETE Method
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const filesData = readData()
    const filteredfiles = filesData.filter((files) => files.id !== id)

    if (filesData.length === filteredfiles.length) {
      return new Response(
        JSON.stringify({ message: `files with ID ${id} not found` }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else {
      writeData(filteredfiles)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'files record successfully deleted',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({ message: 'Internal server error', data: null }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
