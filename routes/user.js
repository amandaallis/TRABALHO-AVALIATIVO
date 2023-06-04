const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { newUser, findUserByEmail } = require("../database/user.js");
const { auth } = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, email } = req.body;
    const emailIsUsed = await findUserByEmail(email);
    if (!emailIsUsed) {
        const password = bcrypt.hashSync(req.body.password, 15);
        const teste = await newUser({ name, email, password });
        res.json({ name, email })
    }
    else {
        res.status(409).json({ message: "O e-mail já está cadastrado." });
    }
})

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await findUserByEmail(email)
    const isSamePassaword = bcrypt.compareSync(password, user.password);
    if (!email) return res.status(401).send();
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


})

module.exports = {
    router
}
