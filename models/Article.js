var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        trim: true,
        type: String,
        required: "Title is required"
    },
    articleLink: {
       trim: true,
       type: String,
       required: "Link is required",
       unique: true
    },
    summary: {
        trim: true,
        type: String,
        required: "Summary is required"
    },
    isSaved: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    imageURL: {
        type: String,
        default: "http://via.placeholder.com/350x150"
    },
    notes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Note"
        }
      ]
});

ArticleSchema.methods.buildArticleURL = function() {
    var secondPart = this.articleLink;
    this.articleLink = "http://allkpop.com" + secondPart;
    return this.articleLink;
};
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;