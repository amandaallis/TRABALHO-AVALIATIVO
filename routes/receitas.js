const express = require("express");
const router = express.Router();
const { cadastroReceitas, todasReceitas, deletarReceita, receitasById, updateReceitas } = require("../database/receitas.js");
const auth = require("../middleware/auth.js");

router.post("/cadastroReceitas", auth, async (req, res) => {
    try {
        const { name, description, preparationTime } = req.body
        const { user_id } = req;
        const novaReceita = await cadastroReceitas({ name, description, preparationTime, user_id })
        res.send({
            novaReceita
        })
    } catch (err) {
        res.send(err);
    }
})

router.put("/atualizarReceitas/:id", auth, async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const { name, description, preparationTime } = req.body;
        const { user_id } = req;
        const dados = { name, description, preparationTime }
        const teste = await receitasById(id, user_id);
        if (!teste) throw new Error("Receita não encontrada");
        const receitasAtualizadas = await updateReceitas(id, dados);

        console.log(receitasAtualizadas)
        res.json({
            mensage: "Atualizado com sucesso"
        })
    } catch (error) {
        next(error)
    }

})

router.get("/todasReceitas", auth, async (req, res, next) => {
    try {
        const { user_id } = req;
        const receitas = await todasReceitas(user_id);
        if (!receitas) throw new Error("Não existe receitas vinculadas a esse usuário");
        res.json({
            receitas
        })
    }
    catch (error) {
        next(error);
    }

})

router.delete("/deletarReceita/:id", auth, async (req, res, next) => {
    const { user_id } = req;
    const id = Number(req.params.id);

    try {
        if (!await receitasById(id, user_id)) return res.status(406).json({ mensage: "Receita não encontrada." });
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
