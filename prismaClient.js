const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

global.prisma = prisma // Attach Prisma client to the global object

module.exports = prisma
