import express from "express"
import bodyParser from "body-parser";



var posts = []

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index.ejs", {blog_posts: posts});
});

app.post("/post", (req, res) => {
    var content = {
        title: req.body.title,
        content: req.body.content
    }
    console.log("here goes a push!")
    posts.push(content);
    res.redirect("/")
    

});


app.post("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index); // Get and parse index
    if (index >= 0 && index < posts.length) {
        console.log(`Deleting post at index ${index}`);
        posts.splice(index, 1); // Remove the post at the specified index
    }
    res.redirect("/"); // Redirect back to home page after deletion
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
