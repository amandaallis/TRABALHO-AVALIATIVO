const express = require("express");
const prisma = require("../database/prisma.js");
const { user } = require("../database/prisma.js");
const router = express.Router();
const { cadastroReceitas, todasReceitas, deletarReceita, receitasById, updateReceitas } = require("../database/receitas.js");
const auth = require("../middleware/auth.js");

router.post("/cadastroReceitas", auth, async (req, res) => {
    const { name, description, preparationTime, User } = req.body
    const { user_id } = req;
    const { userId } = user_id;
    const novaReceita = await cadastroReceitas({ name, description, preparationTime, User, userId })
    console.log(novaReceita)
    res.send({
        novaReceita
    })
})

router.put("/atualizarReceitas/:id", auth, async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const { name, description, preparationTime, User } = req.body;
        const { user_id } = req;
        const { userId } = user_id;
        const dados = { name, description, preparationTime, User, userId }
        const receitasAtualizadas = await updateReceitas(dados, id);

        console.log(receitasAtualizadas)
        res.json({
            mensage: "teste atualização"
        })
    }

    catch (error) {
        next(error)
    }

})

router.get("/todasReceitas", auth, async (req, res) => {
    const { user_id } = req;
    const { userId } = user_id;
    const receitas = await todasReceitas(userId);
    console.log(receitas)
    res.send({
        receitas
    })
})

router.delete("/deletarReceita/:id", auth, async (req, res, next) => {
    const { user_id } = req;
    const { userId } = user_id;
    const id = Number(req.params.id);

    try {

        //if (prisma.user.id) {
        if (!await receitasById(id, userId)) return res.status(406).json({ mensage: "Receita não encontrada." });
        await deletarReceita(id);
        res.json({
            mensage: "Item deletado com sucesso."
        })
    }

    catch (err) {
        next(err);
    }
})

module.exports = {
    router
}
