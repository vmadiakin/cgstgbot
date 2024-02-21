const {PrismaClient} = require("@prisma/client");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const prisma = new PrismaClient();

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        // Проверяем, есть ли пользователь в БД
        const user = await prisma.user.findUnique({
            where: {
                chatId: chatId, // Используем chatId как значение id
            },
        });
        if (!user) {
            // Если пользователя нет, добавляем его в БД
            await prisma.user.create({
                data: {
                    chatId: msg.chat.id,
                    is_bot: msg.from.is_bot,
                    first_name: msg.from.first_name,
                    last_name: msg.from.last_name,
                    username: msg.from.username,
                    language_code: msg.from.language_code,
                },
            });
        }

        await bot.sendMessage(chatId, 'Привет! Как дела ?');
    }
});

// Закрытие соединения с Prisma при завершении работы
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
