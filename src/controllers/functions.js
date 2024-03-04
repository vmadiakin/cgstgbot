
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

module.exports = {getUserInfo, generateRandomReferralCode}