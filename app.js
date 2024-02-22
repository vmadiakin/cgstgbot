require('dotenv').config();
const token = process.env.TOKEN;
const {Telegram} = require('./telegram.js');
const {Logic} = require('./logic');
const telegram = new Telegram(token);
const logic = new Logic()
async function processTelegramMessage(msg) {
    const chatId = msg.chat.id;
    const answer = await logic.processMessage(msg)
    console.log('answer', answer)
    if (answer?.message.length > 1) {
        for( let i = 0 ; i < answer.message.length; i++) {
            if( i === 0) {
                await telegram.sendMessage(chatId, answer.message[i], {reply_markup: JSON.stringify(answer.keyBoard)});
            } else {
                await telegram.sendMessage(chatId, answer.message[i])
            }
        }
    } else if (answer?.message.length === 0 ){
        await telegram.sendMessage(chatId, answer.message[0], {reply_markup: JSON.stringify(answer.keyBoard)});
    } else {
        await telegram.sendMessage(chatId, 'Извините, произошла ошибка' );
    }
}
telegram.onStart(async msg => {
    console.log(`Получено стартовое сообщение от ${msg.chat.username} с userId ${msg.chat.id} и текстом "${msg.text}"`);
    await processTelegramMessage(msg)
});

telegram.onMessage(async msg => {
    console.log(`Получено сообщение от ${msg.chat.username} с userId ${msg.chat.id} и текстом "${msg.text}"`);
    await processTelegramMessage(msg)
});



// const { PrismaClient } = require("@prisma/client");
//
// const {WELCOMEBONUS} = require("./bonus");
// const {greetings, FromBotFailure, registrationCongratulations, mainMenu} = require("./messages");
// const {mainKeyboard} = require("./keyboards");
// require('dotenv').config();
// const token = process.env.TOKEN;
// const bot = new TelegramBot(token, { polling: true });


// bot.on('message', async (msg) => {
//     // const chatId = msg.chat.id;
//     // const text = msg.text;
//     // const userLanguage = msg.from.language_code;
//     // const greetingMessage = greetings[userLanguage] || greetings['en'];
//     // const fromBotFailureMessage = FromBotFailure[userLanguage] || FromBotFailure['en'];
//     // const registrationCongratulationsMessage = registrationCongratulations[userLanguage] || registrationCongratulations['en'];
//     // const mainMenuMessage = mainMenu[userLanguage] || mainMenu['en'];
//
//     // Проверяем, является ли отправитель ботом
//     if (msg.from.is_bot) {
//         await bot.sendMessage(chatId, fromBotFailureMessage);
//         return; // Прерываем выполнение функции для ботов
//     }
//
//     if (text === '/start') {
//         // Проверяем, есть ли пользователь в БД
//         const user = await prisma.user.findUnique({
//             where: {
//                 chatId: chatId,
//             },
//         });
//
//         await bot.sendMessage(chatId, greetingMessage,{reply_markup: JSON.stringify(mainKeyboard),
//         });
//         if (!user) {
//             try {
//                 await prisma.$transaction(async (prisma) => {
//                     const newUser = await prisma.user.create({
//                         data: {
//                             chatId: msg.chat.id,
//                             is_bot: msg.from.is_bot,
//                             first_name: msg.from.first_name,
//                             last_name: msg.from.last_name,
//                             username: msg.from.username,
//                             language_code: msg.from.language_code,
//                             balance: {
//                                 create: {
//                                     money: 0,
//                                     bonuses: 0
//                                 }
//                             }
//                         },
//                         include: {
//                             balance: true
//                         },
//                     });
//
//                     // Зачисляем 50 бонусов через транзакцию
//                     await prisma.balanceTransaction.create({
//                         data: {
//                             amountBonuses: WELCOMEBONUS,
//                             type: 'DEPOSIT',
//                             description: 'Welcome Bonus',
//                             user: {
//                                 connect: {
//                                     id: newUser.id
//                                 }
//                             },
//                             balance: {
//                                 connect: {
//                                     id: newUser.balance.id
//                                 }
//                             }
//                         },
//                     });
//
//                     // Обновляем баланс, добавляя 50 бонусов
//                     await prisma.balance.update({
//                         where: {
//                             id: newUser.balance.id
//                         },
//                         data: {
//                             bonuses: {
//                                 increment: WELCOMEBONUS
//                             }
//                         }
//                     });
//
//                     await bot.sendMessage(chatId, registrationCongratulationsMessage);
//                 });
//             } catch (error) {
//                 console.error('Ошибка при создании пользователя и/или транзакции:', error);
//             }
//         }
//     }
//
//     if (text === '/menu') {
//         // Отправляем inline клавиатуру
//         await bot.sendMessage(chatId, mainMenuMessage,{reply_markup: JSON.stringify(mainKeyboard),
//         });
//     }
//
// });
// Закрытие соединения с Prisma при завершении работы
// process.on('SIGINT', async () => {
//     await prisma.$disconnect();
//     process.exit(0);
// });