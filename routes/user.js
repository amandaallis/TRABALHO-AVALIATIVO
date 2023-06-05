const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { newUser, findUserByEmail } = require("../database/user.js");
const { auth } = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, email } = req.body;
    const emailIsUsed = await findUserByEmail(email);
    try {
        if (!emailIsUsed) {
            const password = bcrypt.hashSync(req.body.password, 15);
            const teste = await newUser({ name, email, password });
            res.json({ name, email })
        }
        else {
            res.status(409).json({ message: "O e-mail já está cadastrado." });
        }
    }
    catch (err) {
        console.log(err);
    }

})

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await findUserByEmail(email);
        if (!email) return res.status(401).send("Não existe usuário com esses dados. Tente novamente.");
        const isSamePassaword = bcrypt.compareSync(password, user.password);
        if (!isSamePassaword) return res.status(401).send("Não existe usuário com esses dados. Tente novamente.");
        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
            },
            process.env.SECRET
        );

        res.json({
            success: true,
            token,
        });
    }

    catch (err) {
        console.log(err);
        res.send();
    }
})

module.exports = {
    router
}
