var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var request = require("request");
var db = require("./models");
var Article = db.Article;
var Note = db.Note;
var PORT = 3000 || process.env.PORT;
var app = express();

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//express handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/kpopHeadLines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res){
    db.Article.find({isSaved: false})
    .then(function(articles){
        res.render("index", {data: articles});
    })
    .catch(function(err){
        res.render("index", {data: err});
    });
});
app.get("/scrape", function(req, res){
    request("http://allkpop.com/", function(error, response, html){
        var $ = cheerio.load(html);
        $("div#article-headline-left article.list").each(function(i, element){
            var result = {};
            result.title = $(element).find(".text").children("h1").children("a").text() || "";
            result.articleLink = $(element).find(".text").children("h1").children("a").attr("href") || "";
            result.summary = $(element).find(".text").children("p").text() || "";
            result.imageURL = $(element).find(".image").children("a").children("img").attr("data-cfsrc") || "";
            console.log(result);
            var newPost = new Article(result);
            newPost.buildArticleURL();
            db.Article.create(newPost).then(function(article){
                console.log(article);
            })
            .catch(function(err){
                console.log(err.message);
            });
        });
        
    });
    res.redirect("/");
});

app.listen(PORT, function(){
    console.log("now listening on port " + PORT);
});