import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/chat/contact.json')

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
  const contactChatList = readData()
  return Response.json({
    message: 'Contact List fetched successfully',
    data: contactChatList,
  })
}

export async function POST(req) {
  try {
    const newContactChat = await req.json()
    const contactChatList = readData()
    newContactChat.id =
      contactChatList.length > 0 ? contactChatList.length + 1 : 1
    contactChatList.push(newContactChat)
    writeData(contactChatList)
    return Response.json(
      {
        message: 'New contact created successfully',
        data: newContactChat,
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
    const updatedContactChatRecord = await req.json()
    const contactChatList = readData()
    const index = contactChatList.findIndex(
      (chat) =>
        chat.id === updatedContactChatRecord.id &&
        chat.roomId === updatedContactChatRecord.roomId
    )
    if (index !== -1) {
      contactChatList[index] = updatedContactChatRecord
      writeData(contactChatList)
      return Response.json({
        message: 'Contact Record updated successfully',
        data: updatedContactChatRecord,
      })
    } else {
      return Response.json(
        {
          message: 'Contact Record not found',
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
    const contactChatList = readData()

    const filteredContactList = contactChatList.filter((chat) => chat.id !== id)

    if (contactChatList.length === filteredContactList.length) {
      return Response.json(
        {
          message: `Contact Record with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredContactList)
      return Response.json({
        data: id,
        message: 'Contact record successfully deleted',
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
