const express = require("express");
const { connectDB } = require("./database/mongodb");
const path = require("path");
const routes = require("./routes/router");
//const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();



app.use(express.static(path.join(__dirname, "../frontend/public")));


console.log(__dirname);

//app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);




connectDB().then(() => {
    app.listen(8000, () => {
        console.log("Server running on port 8000");
    });
});