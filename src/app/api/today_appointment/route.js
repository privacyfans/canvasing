import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/appointments/today_appointment.json'
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
  try {
    const todayAppointmentList = readData()
    return new Response(
      JSON.stringify({
        message: 'Appointments data fetched successfully',
        data: todayAppointmentList,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const newTodayAppointments = await request.json()
    const todayAppointmentsList = readData()
    newTodayAppointments.id =
      todayAppointmentsList.length > 0 ? todayAppointmentsList.length + 1 : 1
    todayAppointmentsList.push(newTodayAppointments)
    writeData(todayAppointmentsList)
    return new Response(
      JSON.stringify({
        message: 'Appointments added successfully',
        data: newTodayAppointments,
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const updatedTodayAppointments = await request.json()
    const todayAppointmentList = readData()
    const index = todayAppointmentList.findIndex(
      (appointment) => appointment.id === updatedTodayAppointments.id
    )
    if (index !== -1) {
      todayAppointmentList[index] = updatedTodayAppointments
      writeData(todayAppointmentList)
      return new Response(
        JSON.stringify({
          message: 'Appointment updated successfully',
          data: updatedTodayAppointments,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          message: 'Appointment not found',
          data: null,
        }),
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const todayAppointmentList = readData()

    const filteredTodayAppointment = todayAppointmentList.filter(
      (appointment) => appointment.id !== id
    )

    if (todayAppointmentList.length === filteredTodayAppointment.length) {
      return new Response(
        JSON.stringify({
          message: `Appointment ID ${id} not found`,
        }),
        { status: 404 }
      )
    } else {
      writeData(filteredTodayAppointment)

      return new Response(
        JSON.stringify({
          data: id,
          message: 'Appointment record successfully deleted',
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error deleting Appointment:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        data: null,
      }),
      { status: 500 }
    )
  }
}
