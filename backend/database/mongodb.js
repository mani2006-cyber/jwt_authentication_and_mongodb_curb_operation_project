const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);


async function connectDB() {

    try {
        await client.connect();
        console.log("mongodb connected ");
    } catch (err) {
        console.log("connection failed");
    }

}

function getDB() {
    return db = client.db("userdb");;
}

function contactdetailes() {
    return client.db("student_information");
}

module.exports = { connectDB, getDB, contactdetailes };