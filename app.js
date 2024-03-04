require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const token = process.env.TOKEN;
const {CommandHandler} = require("./src/controllers/telegram");
const prisma = new PrismaClient();

const commandHandler = new CommandHandler(token, prisma);
console.log('Bot is running...');

