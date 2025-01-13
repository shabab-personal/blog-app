import express from "express"
import bodyParser from "body-parser";



var posts = []

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index.ejs", {blog_posts: posts});
});
app.use(express.static("public"));

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

app.post("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index); // Get and parse index
    if (index >= 0 && index < posts.length) {
        console.log("Editing post at index " + index);
        const post = posts[index];
        res.render("edit.ejs", { index: index, post: post });

    } else {
        res.redirect("/");
    }
   
});
app.post("/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < posts.length) {
        posts[index] = {
            title: req.body.title,
            content: req.body.content
        };
        res.redirect("/");
    } else {
        res.redirect("/");
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
