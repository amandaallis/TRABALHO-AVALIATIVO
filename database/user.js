const prisma = require("./prisma.js");

const newUser = ((user) => {
    return prisma.user.create({
        data: user
    })
});

const findUserByEmail = ((email) => {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
});

module.exports = {
    newUser,
    findUserByEmail
}