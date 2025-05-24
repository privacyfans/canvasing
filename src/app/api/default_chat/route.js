import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/chat/chat.json')

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
  const userChatList = readData()
  return Response.json({
    message: 'User Chat List fetched successfully',
    data: userChatList,
  })
}

export async function POST(req) {
  try {
    const newUserChat = await req.json()
    const userChatList = readData()
    newUserChat.id = userChatList.length > 0 ? userChatList.length + 1 : 1
    userChatList.push(newUserChat)
    writeData(userChatList)
    return Response.json(
      {
        message: 'New user chat created successfully',
        data: newUserChat,
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
    const updatedChatRecord = await req.json()
    const userChatList = readData()
    const index = userChatList.findIndex(
      (chat) => chat.id === updatedChatRecord.id
    )
    if (index !== -1) {
      userChatList[index] = updatedChatRecord
      writeData(userChatList)
      return Response.json({
        message: 'Chat Record updated successfully',
        data: updatedChatRecord,
      })
    } else {
      return Response.json(
        {
          message: 'Chat Record not found',
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
    const userChatList = readData()

    const filterChatList = userChatList.filter((chat) => chat.id !== id)

    if (userChatList.length === filterChatList.length) {
      return Response.json(
        {
          message: `Chat Record with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filterChatList)
      return Response.json({
        data: id,
        message: 'Chat record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting chat:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
