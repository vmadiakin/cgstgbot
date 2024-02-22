const TelegramBot = require('node-telegram-bot-api');
const { handleStartCommand, handleMenuCommand, handleInfoCommand } = require('./logic');

class CommandHandler {
    constructor(token, prisma) {
        this.bot = new TelegramBot(token, { polling: true });
        this.prisma = prisma;

        this.bot.on('message', async (msg) => {
            await this.handleCommand(msg);
        });
    }

    async handleCommand(msg) {
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
                // Handle other commands or do nothing
                break;
        }
    }

}

module.exports = { CommandHandler };
