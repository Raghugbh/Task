const express = require("express");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017"
const app = express()
app.listen(3000, () => console.log("Server ready"))


mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("company")
    }

)
let db, companydata
console.log("connected");
mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("company")
        companydata = db.collection("companydata")
    }
)

app.use(express.json())

app.post("/companyinfo", (req, res) => {
    const name = req.body.name
    companydata.insertOne({ name: name }, (err, result) => { console.log(result) })

})