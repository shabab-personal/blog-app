import express from "express"
import bodyParser from "body-parser";


const app = express()

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/post", (req, res) => {
    console.log("Post request received");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
