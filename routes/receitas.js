const express = require("express");
const router = express.Router();
const { cadastroReceitas, todasReceitas, deletarReceita, receitasById } = require("../database/receitas.js");
const auth = require("../middleware/auth.js");

router.post("/cadastroReceitas", auth, async (req, res) => {
    const { name, description, preparationTime, User, user_id } = req.body
    const novaReceita = await cadastroReceitas({ name, description, preparationTime, User, user_id })
    console.log(novaReceita)
    res.send({
        novaReceita
    })
})

router.get("/todasReceitas", auth, async (req, res) => {
    const receitas = await todasReceitas();
    console.log(receitas)
    res.send({
        receitas
    })
})

router.delete("/deletarReceita/:id", auth, async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        if (!await receitasById(id)) return res.status(406).json({ mensage: "Receita não encontrada." });
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
