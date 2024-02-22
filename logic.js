const {mainKeyboard} = require("./keyboards");
const {WELCOMEBONUS} = require("./bonus");
const {greetings, FromBotFailure, registrationCongratulations, mainMenu} = require("./messages");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
class Logic {
    async processMessage (msg) {
        const chatId = msg.chat.id;
        const text = msg.text;
        const userLanguage = msg.from.language_code;
        const greetingMessage = greetings[userLanguage] || greetings['en'];
        const fromBotFailureMessage = FromBotFailure[userLanguage] || FromBotFailure['en'];
        const registrationCongratulationsMessage = registrationCongratulations[userLanguage] || registrationCongratulations['en'];
        const mainMenuMessage = mainMenu[userLanguage] || mainMenu['en'];

        if (text === '/start') {
            const user = await prisma.user.findUnique({
                where: {
                    chatId: chatId,
                },
            });

            if (!user) {
                try {
                    await prisma.$transaction(async (prisma) => {
                        const newUser = await prisma.user.create({
                            data: {
                                chatId: msg.chat.id,
                                is_bot: msg.from.is_bot,
                                first_name: msg.from.first_name,
                                last_name: msg.from.last_name,
                                username: msg.from.username,
                                language_code: msg.from.language_code,
                                balance: {
                                    create: {
                                        money: 0,
                                        bonuses: 0
                                    }
                                }
                            },
                            include: {
                                balance: true
                            },
                        });

                        // Зачисляем 50 бонусов через транзакцию
                        await prisma.balanceTransaction.create({
                            data: {
                                amountBonuses: WELCOMEBONUS,
                                type: 'DEPOSIT',
                                description: 'Welcome Bonus',
                                user: {
                                    connect: {
                                        id: newUser.id
                                    }
                                },
                                balance: {
                                    connect: {
                                        id: newUser.balance.id
                                    }
                                }
                            },
                        });

                        // Обновляем баланс, добавляя 50 бонусов
                        await prisma.balance.update({
                            where: {
                                id: newUser.balance.id
                            },
                            data: {
                                bonuses: {
                                    increment: WELCOMEBONUS
                                }
                            }
                        });
                    });

                    return { message: [greetingMessage, registrationCongratulationsMessage], keyBoard: mainKeyboard}
                } catch (error) {
                    console.error('Ошибка при создании пользователя и/или транзакции:', error);
                    // логика если не прошла регистрация
                    return { message: ['извините, что то пошло не так'], keyBoard: mainKeyboard}
                }
            } else {
                return { message: [greetingMessage], keyBoard: mainKeyboard}
            }
        }

        if ( text === '/menu') {

        }
    }
}

module.exports = {Logic}