import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/appointments/appointments.json'
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
  const appointmentList = readData()
  return Response.json({
    message: 'appointments data fetched successfully',
    data: appointmentList,
  })
}

export async function POST(req) {
  try {
    const newAppointments = await req.json()
    const AppointmentsList = readData()
    newAppointments.id =
      AppointmentsList.length > 0 ? AppointmentsList.length + 1 : 1
    AppointmentsList.push(newAppointments)
    writeData(AppointmentsList)
    return Response.json(
      {
        message: 'Appointments add successfully',
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
    const appointmentList = readData()
    const index = appointmentList.findIndex(
      (appointment) => appointment.id === updatedAppointments.id
    )
    if (index !== -1) {
      appointmentList[index] = updatedAppointments
      writeData(appointmentList)
      return Response.json({
        message: 'appointment updated successfully',
        data: updatedAppointments,
      })
    } else {
      return Response.json(
        {
          message: 'appointment not found',
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
    const appointmentList = readData()
    const filteredAppointment = appointmentList.filter(
      (appointment) => appointment.id !== id
    )

    if (appointmentList.length === filteredAppointment.length) {
      return Response.json(
        {
          message: `Appointment ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredAppointment)
      return Response.json({
        data: id,
        message: 'Appointment record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting Appointment:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
