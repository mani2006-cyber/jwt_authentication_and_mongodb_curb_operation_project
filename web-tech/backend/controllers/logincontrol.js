const { getDB } = require("../database/mongodb");
const { gettoken } = require("../auth/auth.js");
const bcrypt = require("bcrypt");

const index = (req, res) => {

    res.status(200).send(" server is listening : ");

}

const loginpost = async(req, res) => {


    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ message: "username is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "password is required" });
    }

    try {

        const db = getDB();

        const user = await db.collection("users").findOne({ username });


        if (!user) {

            return res.status(404).json({ message: "user does not exists" });

        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {

            return res.status(401).json({ message: "incorrect password ... " });

        }

        const token = gettoken({ username });


        res.status(200).json({ token, username });



    } catch (err) {
        return res.status(500).json({ message: "SERVER ERROR " });
    }


};


const signuppost = async(req, res) => {

    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ "message": "username is required" });
    }
    if (!password) {
        return res.status(400).json({ "message": "password is required" });
    }

    try {

        const db = getDB();

        const existuser = await db.collection("users").findOne({ username });

        if (existuser) {

            return res.status(409).json({ message: "user already exists" });

        }

        const hash = await bcrypt.hash(password, 10);

        const result = await db.collection("users").insertOne({ username, password: hash });

        return res.status(201).json({ message: "successfully inserted" });



    } catch (err) {

        return res.status(500).json({ message: "server is not responding" });

    }


}

resetpassword = (req, res) => {

    const { username } = req.user;

    if (!username) {
        return res.status(400).json({ message: "username is required" });
    }

    res.status(200).json({ username });


}




module.exports = { index, loginpost, signuppost, resetpassword };