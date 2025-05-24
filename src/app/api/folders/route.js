import { NextResponse } from 'next/server'

import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(
  process.cwd(),
  'src/apidata/filemanager/folders.json'
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

// Handle GET request
export async function GET() {
  try {
    const folders = readData()
    return NextResponse.json({
      message: 'Folders fetched successfully',
      data: folders,
    })
  } catch (error) {
    console.error('Error fetching folders:', error)
    return NextResponse.json(
      { message: 'Internal server error', data: null },
      { status: 500 }
    )
  }
}

// Handle POST request
export async function POST(request) {
  try {
    const newFolders = await request.json()
    const folderList = readData()
    newFolders.id = folderList.length > 0 ? folderList.length + 1 : 1
    folderList.push(newFolders)
    writeData(folderList)

    return NextResponse.json(
      {
        message: 'Folders created successfully',
        data: newFolders,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating folders:', error)
    return NextResponse.json(
      { message: 'Internal server error', data: null },
      { status: 500 }
    )
  }
}

// Handle PUT request
export async function PUT(request) {
  try {
    const updatedFolders = await request.json()
    const allFolders = readData()
    const index = allFolders.findIndex(
      (folder) => folder.id === updatedFolders.id
    )
    if (index !== -1) {
      allFolders[index] = updatedFolders
      writeData(allFolders)
      return NextResponse.json({
        message: 'Folders updated successfully',
        data: updatedFolders,
      })
    } else {
      return NextResponse.json(
        { message: 'Folders not found', data: null },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error updating folders:', error)
    return NextResponse.json(
      { message: 'Internal server error', data: null },
      { status: 500 }
    )
  }
}

// Handle DELETE request
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const foldersData = readData()

    const filteredFolders = foldersData.filter((folder) => folder.id !== id)

    if (foldersData.length === filteredFolders.length) {
      return NextResponse.json(
        { message: `Folder with ID ${id} not found` },
        { status: 404 }
      )
    } else {
      writeData(filteredFolders)
      return NextResponse.json({
        data: id,
        message: 'Folder record successfully deleted',
      })
    }
  } catch (error) {
    console.error('Error deleting folders:', error)
    return NextResponse.json(
      { message: 'Internal server error', data: null },
      { status: 500 }
    )
  }
}
