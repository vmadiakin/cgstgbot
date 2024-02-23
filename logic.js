const { greetings, FromBotFailure, registrationCongratulations, mainMenu, phrases, balanceMenu, phrasesFromLanguage} = require("./phrases");
const { WELCOMEBONUS } = require("./bonus");
const {mainKeyboard, balanceKeyboard} = require("./keyboards");
const Logger = require("./logger");
const logger = new Logger('TelegramApp');

function getUserInfo(msg) {
    const chatId = msg.chat?.id || msg.from?.id;
    const userLanguage = msg.from.language_code;
    return { chatId, userLanguage };
}

async function handleStartCommand(bot, msg, prismaInstance) { // изменил название переменной
    const { chatId, userLanguage } = getUserInfo(msg);
    const greetingMessage = phrasesFromLanguage['greetings'][userLanguage] || phrasesFromLanguage['greetings']['en'];
    const fromBotFailureMessage = phrasesFromLanguage['fromBotFailure'][userLanguage] || phrasesFromLanguage['fromBotFailure']['en'];
    const registrationCongratulationsMessage = phrasesFromLanguage['registrationCongratulations'][userLanguage] || phrasesFromLanguage['registrationCongratulations']['en'];
    logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} отправил команду /start`);
    if (msg.from.is_bot) {
        await bot.sendMessage(chatId, fromBotFailureMessage);
        return;
    }

    const user = await prismaInstance.user.findUnique({
        where: {
            chatId: chatId,
        },
    });

    await bot.sendMessage(chatId, greetingMessage, { reply_markup: JSON.stringify(mainKeyboard(userLanguage)) });
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
    const mainMenuMessage = phrasesFromLanguage['mainMenu'][userLanguage] || phrasesFromLanguage['mainMenu']['en'];
    // Отправляем inline клавиатуру
    logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} отправил команду /menu`);
    await bot.sendMessage(chatId, mainMenuMessage, {
        reply_markup: JSON.stringify(mainKeyboard(userLanguage)),
    });
}

async function handleInfoCommand(bot, msg) {
    await bot.sendMessage(msg.chat.id, 'This is the info command.');
}

async function handleCallbackQuery(bot, callbackQuery, prisma) {
    const data = callbackQuery.data;
    const msg = callbackQuery.message;
    const { chatId, userLanguage } = getUserInfo(callbackQuery);
    const balanceMenuMessage = phrasesFromLanguage['balanceMenu'][userLanguage] || phrasesFromLanguage['balanceMenu']['en'];
    const checkBalanceMessage1 = phrasesFromLanguage['checkBalance1'][userLanguage] || phrasesFromLanguage['checkBalance1']['en'];
    const checkBalanceMessage2 = phrasesFromLanguage['checkBalance2'][userLanguage] || phrasesFromLanguage['checkBalance2']['en'];
    const checkBalanceMessage3 = phrasesFromLanguage['checkBalance3'][userLanguage] || phrasesFromLanguage['checkBalance3']['en'];
    const mainMenuMessage = phrasesFromLanguage['mainMenu'][userLanguage] || phrasesFromLanguage['mainMenu']['en'];
    // Ваша логика обработки callbackQuery
    switch (data) {
        case "balance":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Баланс"`);
            await bot.sendMessage(chatId, balanceMenuMessage, {
                reply_markup: JSON.stringify(balanceKeyboard(userLanguage)),
            });
            break;
        case "checkBalanceAction":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Проверить баланс"`);
            // Запрос к базе данных для получения баланса пользователя
            const user = await prisma.user.findUnique({
                where: {
                    chatId: chatId,
                },
                include: {
                    balance: true,
                },
            });

            if (user) {
                await bot.sendMessage(chatId, `${user.first_name} ${user.last_name} ${checkBalanceMessage1} ${user.balance.money} ${checkBalanceMessage2} ${user.balance.bonuses} ${checkBalanceMessage3}`, {
                    reply_markup: JSON.stringify(balanceKeyboard(userLanguage)),
                });
            } else {
                // Обработка ситуации, когда пользователь не найден в базе данных
                await bot.sendMessage(chatId, "Ошибка при получении баланса. Пожалуйста, повторите попытку позже.");
            }
            break;
        case "replenishBalanceAction":
            // Ваш код для действия "Проверить баланс"
            break;
        case "goBack":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Назад"`);
            // Отправить основное меню
            await bot.sendMessage(chatId, mainMenuMessage, {
                reply_markup: JSON.stringify(mainKeyboard(userLanguage)),
            });
            break;
        default:
            // Обработка других вариантов
            break;
    }
}

module.exports = { handleStartCommand, handleMenuCommand, handleInfoCommand, handleCallbackQuery };
