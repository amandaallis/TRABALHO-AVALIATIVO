const prisma = require("./prisma.js");

const cadastroReceitas = ((dados) => {
    const { name, description, preparationTime, user_id } = dados;
    return prisma.receitas.create({
        data: {
            name, description, preparationTime, user_id
        }
    })
})

const updateReceitas = ((id, receitas) => {
    const { name, description, preparationTime } = receitas;

    return prisma.receitas.update({
        where: {
            id
        },
        data: {
            name,
            description,
            preparationTime,
        }
    })
})

const todasReceitas = ((user_id) => {
    return prisma.receitas.findMany({
        where: {
            user_id,
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
            id,
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
