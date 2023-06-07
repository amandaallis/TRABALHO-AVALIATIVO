const prisma = require("./prisma.js");

const cadastroReceitas = ((dados) => {
    const { name, description, preparationTime, userId } = dados
    return prisma.receitas.create({
        data: {
            name, description, preparationTime, user_id: userId
        }
    })
})

const updateReceitas = ((receitas, id) => {
    const { name, description, preparationTime, User, userId } = receitas;

    console.log(User);

    return prisma.receitas.update({
        where: {
            id: id
        },
        data: {
            name,
            description,
            preparationTime,
        }
    })
})

const todasReceitas = ((userId) => {
    return prisma.receitas.findMany({
        where: {
            user_id: userId
        }
    });
})

const receitasById = ((id, userId) => {
    return prisma.receitas.findFirst({
        where: {
            id: id,
            user_id: userId
        },
    })
})

const deletarReceita = ((id) => {
    return prisma.receitas.delete({
        where: {
            id: id,
        }
    })
})

module.exports = {
    cadastroReceitas,
    todasReceitas,
    receitasById,
    deletarReceita,
    updateReceitas,
}
