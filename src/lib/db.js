const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis

globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient()

const prisma = globalForPrisma.prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

module.exports = { prisma }
