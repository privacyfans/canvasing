import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/chat/group.json')

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
  const groupChatList = readData()
  return Response.json({
    message: 'Group chat list fetched successfully',
    data: groupChatList,
  })
}

export async function POST(req) {
  try {
    const newGroupChat = await req.json()
    const groupChatList = readData()
    newGroupChat.id = groupChatList.length > 0 ? groupChatList.length + 1 : 1
    groupChatList.push(newGroupChat)
    writeData(groupChatList)
    return Response.json(
      {
        message: 'New group chat created successfully',
        data: newGroupChat,
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
    const updateGroupChat = await req.json()
    const groupChatList = readData()
    const index = groupChatList.findIndex(
      (chat) => chat.id === updateGroupChat.id
    )
    if (index !== -1) {
      groupChatList[index] = updateGroupChat
      writeData(groupChatList)
      return Response.json({
        message: 'Group chat record updated successfully',
        data: updateGroupChat,
      })
    } else {
      return Response.json(
        {
          message: 'Group chat record not found',
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
    const groupChatList = readData()

    const filterChatList = groupChatList.filter((chat) => chat.id !== id)

    if (groupChatList.length === filterChatList.length) {
      return Response.json(
        {
          message: `Group chat record with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filterChatList)

      return Response.json({
        data: id,
        message: 'Group chat record successfully deleted',
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
