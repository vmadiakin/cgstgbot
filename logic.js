const { greetings, FromBotFailure, registrationCongratulations, mainMenu, phrases } = require("./phrases");
const { WELCOMEBONUS } = require("./bonus");
const {mainKeyboard} = require("./keyboards");

function getUserInfo(msg) {
    const chatId = msg.chat.id;
    const userLanguage = msg.from.language_code;
    return { chatId, userLanguage };
}

function getPhrase(userLanguage, title) {
    return phrases[title[userLanguage]] || phrases[title['en']]
}

async function handleStartCommand(bot, msg, prismaInstance) { // изменил название переменной
    const { chatId, userLanguage } = getUserInfo(msg);
    const greetingMessage = greetings[userLanguage] || greetings['en'];
    const fromBotFailureMessage = FromBotFailure[userLanguage] || FromBotFailure['en'];
    const registrationCongratulationsMessage = registrationCongratulations[userLanguage] || registrationCongratulations['en'];
    if (msg.from.is_bot) {
        await bot.sendMessage(chatId, fromBotFailureMessage);
        return;
    }

    const user = await prismaInstance.user.findUnique({
        where: {
            chatId: chatId,
        },
    });

    await bot.sendMessage(chatId, greetingMessage, { reply_markup: JSON.stringify(mainKeyboard) });
    if (!user) {
        try {
            await prismaInstance.$transaction(async (prisma) => {
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

                await bot.sendMessage(chatId, registrationCongratulationsMessage);
            });
        } catch (error) {
            console.error('Ошибка при создании пользователя и/или транзакции:', error);
        }
    }
}

async function handleMenuCommand(bot, msg) {
    const { chatId, userLanguage } = getUserInfo(msg);
    const mainMenuMessage = mainMenu[userLanguage] || mainMenu['en'];
    // Отправляем inline клавиатуру
    await bot.sendMessage(chatId, mainMenuMessage, {
        reply_markup: JSON.stringify(mainKeyboard),
    });
}

async function handleInfoCommand(bot, msg) {
    await bot.sendMessage(msg.chat.id, 'This is the info command.');
}

module.exports = { handleStartCommand, handleMenuCommand, handleInfoCommand };
