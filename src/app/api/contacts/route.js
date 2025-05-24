import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/apidata/crm/crmcontact.json')

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
  const contacts = readData()
  return Response.json({
    message: 'Contacts fetched successfully',
    data: contacts,
  })
}

export async function POST(req) {
  try {
    const newContact = await req.json()
    const contactsList = readData()
    newContact.id = contactsList.length > 0 ? contactsList.length + 1 : 1
    contactsList.push(newContact)
    writeData(contactsList)
    return Response.json(
      {
        message: 'Contact created successfully',
        data: newContact,
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
    const updatedContact = await req.json()
    const allContacts = readData()
    const index = allContacts.findIndex(
      (contact) => contact.id === updatedContact.id
    )
    if (index !== -1) {
      allContacts[index] = updatedContact
      writeData(allContacts)
      return Response.json({
        message: 'Contact updated successfully',
        data: updatedContact,
      })
    } else {
      return Response.json(
        {
          message: 'Contact not found',
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
    const contactsData = readData()

    const filteredContacts = contactsData.filter((contact) => contact.id !== id)

    if (contactsData.length === filteredContacts.length) {
      return Response.json(
        {
          message: `Contact with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredContacts)
      return Response.json({
        data: id,
        message: 'Contact record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting contact:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
