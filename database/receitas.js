const prisma = require("./prisma.js");

const cadastroReceitas = ((dados) => {
    return prisma.receitas.create({
        data: dados
    })
})

const todasReceitas = (() => {
    return prisma.receitas.findMany();
})

const receitasById = ((id) => {
    return prisma.receitas.findFirst({
        where: {
            id: id
        }
    })
})

const deletarReceita = ((id) => {
    return prisma.receitas.delete({
        where: {
            id: id
        }
    })
})

module.exports = {
    cadastroReceitas,
    todasReceitas,
    receitasById,
    deletarReceita
}
