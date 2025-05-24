import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/hospital/patients/patients.json'
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
  const patientsList = readData()
  return Response.json({
    message: 'patientsList fetched successfully',
    data: patientsList,
  })
}

export async function POST(req) {
  try {
    const newAddPatients = await req.json()
    const patientsList = readData()
    newAddPatients.id = patientsList.length > 0 ? patientsList.length + 1 : 1
    patientsList.push(newAddPatients)
    writeData(patientsList)
    return Response.json(
      {
        message: 'Patients added successfully',
        data: newAddPatients,
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
    const updatedPatients = await req.json()
    const patientsList = readData()
    const index = patientsList.findIndex(
      (patients) => patients.id === updatedPatients.id
    )
    if (index !== -1) {
      patientsList[index] = updatedPatients
      writeData(patientsList)
      return Response.json({
        message: 'patients List updated successfully',
        data: updatedPatients,
      })
    } else {
      return Response.json(
        {
          message: 'patients not found',
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
    const patientsList = readData()

    const filteredPatients = patientsList.filter((staff) => staff.id !== id)

    if (patientsList.length === filteredPatients.length) {
      return Response.json(
        {
          message: `patients ID ${id} not found`,
        },
        { status: 404 }
      )
    } else {
      writeData(filteredPatients)
      return Response.json({
        data: id,
        message: 'Patients record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting patient:', error)
    return Response.json(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}
