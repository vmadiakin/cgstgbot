const { phrasesFromLanguage} = require("./phrases");
const { WELCOMEBONUS, REFERRALWELCOMEBONUS} = require("./bonus");
const { mainKeyboard, balanceKeyboard, pourWaterKeyboard, referralKeyboard, supportKeyboard} = require("./keyboards");
const Logger = require("./logger");
const logger = new Logger('TelegramApp');

function getUserInfo(msg) {
    try {
    const chatId = msg.chat?.id || msg.from?.id;
    const userLanguage = msg.from.language_code;
    return { chatId, userLanguage };
    } catch (error) {
        logger.error(`Ошибка при выполнении функции "getUserInfo":`, error);
    }
}

async function generateRandomReferralCode(prisma) {
    let code = "";
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const codeLength = 10;

    const isCodeUnique = async (codeToCheck) => {
        const existingUser = await prisma.user.findFirst({
            where: {
                referral_code: codeToCheck,
            },
        });
        return !existingUser;
    };

    do {
        code = "";
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
    } while (!(await isCodeUnique(code)));

    return code;
}

async function handleStartCommand(bot, msg, prismaInstance) {
    const { chatId, userLanguage } = getUserInfo(msg);
    const greetingMessage = phrasesFromLanguage['greetings'][userLanguage] || phrasesFromLanguage['greetings']['en'];
    const fromBotFailureMessage = phrasesFromLanguage['fromBotFailure'][userLanguage] || phrasesFromLanguage['fromBotFailure']['en'];
    const registrationCongratulationsMessage = phrasesFromLanguage['registrationCongratulations'][userLanguage] || phrasesFromLanguage['registrationCongratulations']['en'];
    const refereeRegistrationCongratulationsMessage = phrasesFromLanguage['refereeRegistrationCongratulations'][userLanguage] || phrasesFromLanguage['refereeRegistrationCongratulations']['en'];
    const referralRegistrationCongratulationsMessage = phrasesFromLanguage['referralRegistrationCongratulations'][userLanguage] || phrasesFromLanguage['referralRegistrationCongratulations']['en'];
    const referralCodeMatch = /\/start\s+(\w+)/.exec(msg.text);
    const referralCode = referralCodeMatch ? referralCodeMatch[1] : null;
    logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} отправил команду /start`);
    if (msg.from.is_bot) {
        try {
        await bot.sendMessage(chatId, fromBotFailureMessage);
        return;
        } catch (error) {
            console.error('Ошибка при отправке сообщения "fromBotFailureMessage"', error);
        }
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
                        water_machine_id: null,
                        referral_code: await generateRandomReferralCode(prisma),
                        balance: {
                            create: {
                                money: 0,
                                bonuses: 0
                            },
                        },

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
                let referrerUser = null;
                if (referralCode !== null) {
                    referrerUser = await prisma.user.findUnique({
                        where: {
                            referral_code: referralCode,
                        },
                    });
                    // Извлекаем реферальный код из команды /start
                    logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} использует реферальный код: ${referralCode} пользователя ${referrerUser.username} с Id ${referrerUser.id}`);
                }

                if (referrerUser) {
                    await prisma.referral.create({
                        data: {
                            referrerId: referrerUser.id,
                            refereeId: newUser.id,
                        },
                    });

                    await prisma.balanceTransaction.create({
                        data: {
                            amountBonuses: REFERRALWELCOMEBONUS,
                            type: 'DEPOSIT',
                            description: 'Referral Bonus',
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
                                increment: REFERRALWELCOMEBONUS
                            }
                        }
                    });

                    await bot.sendMessage(chatId, `${refereeRegistrationCongratulationsMessage} ${referrerUser.first_name} ${referrerUser.last_name}`);
                    await bot.sendMessage(referrerUser.chatId, `${referralRegistrationCongratulationsMessage} ${newUser.first_name} ${newUser.last_name}`);
                }
            });
        } catch (error) {
            logger.error('Ошибка при создании пользователя и/или транзакции:', error);
        }
    }
}

async function handleMenuCommand(bot, msg) {
    const { chatId, userLanguage } = getUserInfo(msg);
    const mainMenuMessage = phrasesFromLanguage['mainMenu'][userLanguage] || phrasesFromLanguage['mainMenu']['en'];
    // Отправляем inline клавиатуру
    logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} отправил команду /menu`);
    try {
    await bot.sendMessage(chatId, mainMenuMessage, {
        reply_markup: JSON.stringify(mainKeyboard(userLanguage)),
    });
    } catch (error) {
        console.error('Ошибка при отправке клавиатуры "mainKeyboard"', error);
    }
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
    const pourWaterMenuMessage = phrasesFromLanguage['pourWaterMenu'][userLanguage] || phrasesFromLanguage['pourWaterMenu']['en'];
    const referralMenuMessage = phrasesFromLanguage['referralMenu'][userLanguage] || phrasesFromLanguage['referralMenu']['en'];
    const generateReferralInviteLinkMessage1 = phrasesFromLanguage['generateReferralInviteLink1'][userLanguage] || phrasesFromLanguage['generateReferralInviteLink1']['en'];
    const generateReferralInviteLinkMessage2 = phrasesFromLanguage['generateReferralInviteLink2'][userLanguage] || phrasesFromLanguage['generateReferralInviteLink2']['en'];
    const supportMenuMessage = phrasesFromLanguage['supportMenu'][userLanguage] || phrasesFromLanguage['supportMenu']['en'];

    // Запрос к базе данных для получения данных пользователя
    const user = await prisma.user.findUnique({
        where: {
            chatId: chatId,
        },
        include: {
            balance: true,
        },
    });

    // Ваша логика обработки callbackQuery
    switch (data) {
        case "balance":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Баланс"`);
            try {
            await bot.sendMessage(chatId, balanceMenuMessage, {
                reply_markup: JSON.stringify(balanceKeyboard(userLanguage)),
            });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Баланс":`, error);
            }
            break;
        case "checkBalanceAction":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Проверить баланс"`);
            try {
            if (user) {
                await bot.sendMessage(chatId, `${user.first_name} ${user.last_name} ${checkBalanceMessage1} ${user.balance.money} ${checkBalanceMessage2} ${user.balance.bonuses} ${checkBalanceMessage3}`, {
                    reply_markup: JSON.stringify(balanceKeyboard(userLanguage)),
                });
            } else {
                // Обработка ситуации, когда пользователь не найден в базе данных
                await bot.sendMessage(chatId, "Ошибка при получении баланса. Пожалуйста, повторите попытку позже.");
            }
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Проверить баланс":`, error);
            }
            break;
        case "replenishBalanceAction":
            // Ваш код для действия "Проверить баланс"
            break;
        case "goBack":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Назад"`);
            // Отправить основное меню
            try {
            await bot.sendMessage(chatId, mainMenuMessage, {
                reply_markup: JSON.stringify(mainKeyboard(userLanguage)),
            });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Назад":`, error);
            }
            break;
        case "pourWater":
            try {
                logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Налить воду"`);
                const userOzoneSetting = user.ozone_setting
                const userWaterMachineSelection = user.water_machine_id
                await bot.sendMessage(chatId, pourWaterMenuMessage, {
                    reply_markup: JSON.stringify(pourWaterKeyboard(userLanguage, userOzoneSetting, userWaterMachineSelection)),
                });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Налить воду":`, error);
            }
            break;
        case "referralProgram":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Реферальная программа"`);
            try {
                await bot.sendMessage(chatId, referralMenuMessage, {
                    reply_markup: JSON.stringify(referralKeyboard(userLanguage)),
                });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Реферальная программа":`, error);
            }
            break;
        case "referralInviteLink":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Ссылка для приглашения"`);
            try {
            if (user) {
                await bot.sendMessage(chatId, `${generateReferralInviteLinkMessage1} https://t.me/CokGuselSuBot?start=${user.referral_code} ${generateReferralInviteLinkMessage2}`);
            }
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Ссылка для приглашения":`, error);
            }
            break;
        case "support":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Поддержка"`);
            try {
                await bot.sendMessage(chatId, supportMenuMessage, {
                    reply_markup: JSON.stringify(supportKeyboard(userLanguage)),
                });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Поддержка":`, error);
            }
            break;
        case "supportProblem":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Сообщить о проблеме"`);
            try {
                // Отправка первого вопроса
                const question1 = 'Введите номер аппарата:';
                bot.sendMessage(chatId, question1, { reply_markup: { force_reply: true } })
                    .then(async (sentMessage1) => {
                        console.log('Вопрос 1 отправлен:', sentMessage1);

                        // Получение ответа на первый вопрос
                        const answer1 = await new Promise(resolve => {
                            bot.on('message', (response1) => {
                                if (response1.chat.id === chatId && response1.reply_to_message.message_id === sentMessage1.message_id) {
                                    resolve(response1.text);
                                }
                            });
                        });
                        console.log('Ответ пользователя на вопрос 1:', answer1);

                        // Отправка второго вопроса
                        const question2 = 'Опишите проблему:';
                        bot.sendMessage(chatId, question2, { reply_markup: { force_reply: true } })
                            .then(async (sentMessage2) => {
                                console.log('Вопрос 2 отправлен:', sentMessage2);

                                // Получение ответа на второй вопрос
                                const answer2 = await new Promise(resolve => {
                                    bot.on('message', (response2) => {
                                        if (response2.chat.id === chatId && response2.reply_to_message.message_id === sentMessage2.message_id) {
                                            resolve(response2.text);
                                        }
                                    });
                                });
                                console.log('Ответ пользователя на вопрос 2:', answer2);

                                // Ваши дальнейшие действия с ответами пользователя
                            })
                            .catch((error) => {
                                console.error('Ошибка при отправке второго вопроса:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Ошибка при отправке первого вопроса:', error);
                    });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Сообщить о проблеме":`, error);
            }
            break;
        case "supportCooperation":
            logger.log(`Пользователь ${msg.chat.username} с userId ${msg.chat.id} нажал кнопку "Сотрудничество"`);
            try {
                const keyboard = {
                    inline_keyboard: [
                        [{ text: 'Сотрудничество', web_app: {url: 'https://premier.one/'}}]
                    ]
                };

                await bot.sendMessage(chatId, supportMenuMessage, {
                    reply_markup: JSON.stringify(keyboard),
                });
            } catch (error) {
                logger.error(`Ошибка при нажатии пользователем ${msg.chat.username} с userId ${msg.chat.id} кнопки "Сотрудничество":`, error);
            }
            break;
        default:
            // Обработка других вариантов
            break;

    }
}

module.exports = { handleStartCommand, handleMenuCommand, handleInfoCommand, handleCallbackQuery };
