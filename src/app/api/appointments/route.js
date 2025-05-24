import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/overview/appointments.json'
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
  const appointments = readData()
  return Response.json({
    message: 'appointments fetched successfully',
    data: appointments,
  })
}

export async function POST(req) {
  try {
    const newAppointments = await req.json()
    const appointmentsList = readData()
    newAppointments.id =
      appointmentsList.length > 0 ? appointmentsList.length + 1 : 1
    appointmentsList.unshift(newAppointments)
    writeData(appointmentsList)
    return Response.json(
      {
        message: 'appointments created successfully',
        data: newAppointments,
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
    const updatedAppointments = await req.json()
    const allAppointments = readData()
    const index = allAppointments.findIndex(
      (appointment) => appointment.id === updatedAppointments.id
    )
    if (index !== -1) {
      allAppointments[index] = updatedAppointments
      writeData(allAppointments)
      return Response.json({
        message: 'Appointments updated successfully',
        data: updatedAppointments,
      })
    } else {
      return Response.json(
        {
          message: 'Appointments not found',
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
    const allAppointments = readData()
    const filteredAppointments = allAppointments.filter(
      (appointment) => appointment.id !== id
    )

    if (allAppointments.length === filteredAppointments.length) {
      return Response.json(
        {
          message: `Appointments with ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredAppointments)
      return Response.json({
        data: id,
        message: 'Appointments successfully deleted',
      })
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
