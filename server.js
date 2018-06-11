var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var request = require("request");
var db = require("./models");
var Article = db.Article;
var Note = db.Note;
var PORT = process.env.PORT || 3000;
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
    db.Article.find({isSaved: false}).sort({dateCreated: 'desc'})
    .then(function(articles){
        res.render("index", {data: articles});
    })
    .catch(function(err){
        res.render("index", {data: err});
    });
});

app.get("/saved", function(req, res){
    db.Article.find({isSaved: true}).sort({dateCreated: 'desc'})
    .then(function(articles){
        res.render("index", {data: articles});
    })
    .catch(function(err){
        res.render("index", {data: err});
    });
});

app.put("/save/:id", function(req, res){
    db.Article.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {isSaved: true}).then(function(data){
        res.json(data)
    }).catch(function(err){
        throw err;
    })
})

app.post("/scrape", function(req, res){
    request("http://allkpop.com/", function(error, response, html){
        var $ = cheerio.load(html);
        $("div#article-headline-left article.list").each(function(i, element){
            var result = {};
            result.title = $(element).find(".text").children("h1").children("a").text() || "";
            result.articleLink = $(element).find(".text").children("h1").children("a").attr("href") || "";
            result.summary = $(element).find(".text").children("p").text() || "";
            result.imageURL = $(element).find(".image").children("a").children("img").attr("data-cfsrc") || "";
            var newPost = new Article(result);
            newPost.buildArticleURL();
            db.Article.create(newPost).then(function(article){
                console.log(article);
            })
            .catch(function(err){
                console.log("Duplicate key or validation error");
            });
        });
        
    });
    res.status(200).send();
});

app.get("/article/:id", function(req, res){
    db.Article.findOne({_id: mongoose.Types.ObjectId(req.params.id)})
    .populate("notes")
    .then(function(article){
      res.json(article)
    })
    .catch(function(err){
      res.json(err)
    })
})
app.post("/newnote/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
})
app.listen(PORT, function(){
    console.log("now listening on port " + PORT);
});