import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/school/library/books-list.json'
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
  const bookList = readData()
  return Response.json({
    message: 'BookList fetched successfully',
    data: bookList,
  })
}

export async function POST(req) {
  try {
    const newBook = await req.json()
    const bookList = readData()
    newBook.id = bookList.length > 0 ? bookList.length + 1 : 1
    bookList.push(newBook)
    writeData(bookList)
    return Response.json(
      {
        message: 'Book added successfully',
        data: newBook,
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
    const updatedBook = await req.json()
    const bookList = readData()
    const index = bookList.findIndex((book) => book.id === updatedBook.id)
    if (index !== -1) {
      bookList[index] = updatedBook
      writeData(bookList)
      return Response.json({
        message: 'Book list updated successfully',
        data: updatedBook,
      })
    } else {
      return Response.json(
        {
          message: 'Book not found',
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
    const bookList = readData()

    const filteredBook = bookList.filter((book) => book.id !== id)

    if (bookList.length === filteredBook.length) {
      return Response.json(
        {
          message: `Book ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredBook)
      return Response.json({
        data: id,
        message: 'Book successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting book:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
