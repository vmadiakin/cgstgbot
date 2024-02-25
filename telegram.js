const TelegramBot = require('node-telegram-bot-api');
const { handleStartCommand, handleMenuCommand, handleInfoCommand, handleCallbackQuery} = require('./logic');
const Logger = require("./logger");
const logger = new Logger('TelegramApp');

class CommandHandler {
    constructor(token, prisma) {
        this.bot = new TelegramBot(token, { polling: true });
        this.prisma = prisma;

        this.bot.on('message', async (msg) => {
            await this.handleCommand(msg);
        });

        this.bot.on('callback_query', async (callbackQuery) => {
            await handleCallbackQuery(this.bot, callbackQuery, this.prisma);
        });
    }

    async handleCommand(msg) {
        try {
        const command = msg.text.trim().toLowerCase();


        switch (command) {
            case '/start':
                await handleStartCommand(this.bot, msg, this.prisma);
                break;

            case '/menu':
                await handleMenuCommand(this.bot, msg, this.prisma);
                break;

            case '/info':
                await handleInfoCommand(this.bot, msg, this.prisma);
                break;

            default:
                await handleStartCommand(this.bot, msg, this.prisma);
                break;
        }
        } catch (error) {
            logger.error(`Ошибка при отправки пользователем ${msg.chat.username} с userId ${msg.chat.id} сообщения:`, error);
        }
    }

}

module.exports = { CommandHandler };
