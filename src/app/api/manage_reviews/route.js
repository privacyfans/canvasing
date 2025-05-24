import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/ecommerce/manage-reviews.json'
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
  const reviews = readData()
  return Response.json({
    message: 'User Reviews fetched successfully',
    data: reviews,
  })
}

export async function POST(req) {
  try {
    const newUserReview = await req.json()
    const reviewList = readData()
    newUserReview.id = reviewList.length > 0 ? reviewList.length + 1 : 1
    reviewList.push(newUserReview)
    writeData(reviewList)
    return Response.json(
      {
        message: 'User Review created successfully',
        data: newUserReview,
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
    const updatedReview = await req.json()
    const allUserReviews = readData()
    const index = allUserReviews.findIndex(
      (customer) => customer.id === updatedReview.id
    )
    if (index !== -1) {
      allUserReviews[index] = updatedReview
      writeData(allUserReviews)
      return Response.json({
        message: 'Review updated successfully',
        data: updatedReview,
      })
    } else {
      return Response.json(
        {
          message: 'Review not found',
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
    const allUserReviews = readData()

    const filterReviews = allUserReviews.filter((review) => review.id !== id)

    if (allUserReviews.length === filterReviews.length) {
      return Response.json(
        {
          message: `User Review with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filterReviews)
      return Response.json({
        data: id,
        message: 'Review successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting customer:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
