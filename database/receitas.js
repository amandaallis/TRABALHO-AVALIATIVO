const prisma = require("./prisma.js");

const cadastroReceitas = ((dados) => {
    console.log(dados)
    const { name, description, preparationTime, userId } = dados
    return prisma.receitas.create({
        data: {
            name, description, preparationTime, user_id: userId
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

const receitasById = ((id) => {
    return prisma.receitas.findFirst({
        where: {
            id: id
        }
    })
})

const deletarReceita = ((id, userId) => {
    return prisma.receitas.delete({
        where: {
            user_id: userId,
            id: id,
        }
    })
})

module.exports = {
    cadastroReceitas,
    todasReceitas,
    receitasById,
    deletarReceita
}
