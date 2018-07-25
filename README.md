# Kpop News Scraper

Kpop News Scraper is a web scraper that retrieves articles from the front page of AllKpop.com to provide a quick way to view news articles and save the web links to the articles.

## Live version
Go [here](https://polar-depths-15878.herokuapp.com/) to view the app.

## About the Application

### Folder Structure

After following the steps in the Installation section, your folder should look like this:

```
kpop-news-scraper/
  models/
    Article.js
    index.js
    Note.js
  node_modules/
  public/
    assets/
        css/
            stylesheet.css
        js/
            app.js
  views/
    layouts/
        main.handlebars
    index.handlebars
  .gitignore
  package-lock.json
  package.json
  README.md
  server.js
```
* `models/Article.js` and `models/Note.js` contains mongoose objects that model the schema for the Articles and Note collections.
* `public/assets/css/stylesheet.js` contains custom css for Article card and Add Note Form.
* `public/assets/js/app.js` contains jQuery Ajax calls to end points in `server.js`.
* `views/layouts/main.handlebars` handlebars template that renders whole page.
* `views/index.handlebars` handlebars template that renders HTML for Saved Articles and Home Page.
* `server.js` Contains logic to connect to mongo database. Creates mongoose collections in `models` folder. Contains following api end points:
```
URL: / 
Method: GET 
Description: Retrieves unsaved articles

URL: /saved
Method: GET 
Description: Retrieves saved articles

URL: /save/:id
Method: PUT
Description: Updates article document and sets `isSaved` field to true or false

URL: /scrape
Method: GET
Description: Retrieves link to article, article image, article summary, and article title from allkpop.com

URL: /article/:id
Method: GET
Description: Get notes added for an article

URL: /newnote/:id
Method: POST
Description: Adds a new note and associated with article id
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Install the following programs if they aren't on your local machine.

Node (LTS) - http://nodejs.org

MongoDB (Community Edition) - https://www.mongodb.com/download-center?jmp=nav#community


### Installing

Clone [this](https://github.com/crystalodi/kpop-news-scraper.git) github repository to a folder on your computer using a command line program.

```
git clone https://github.com/crystalodi/kpop-news-scraper.git
```

Navigate to the folder the repository was cloned into and run npm install to create the `node_modules` folder needed to run the application

```
cd kpop-news-scraper
npm install
```

Start the server and application

```
npm start
```

Open a web browser and type http://localhost:3000. Your should see this:


## How to Use

### Scrape for New Articles
To scrape for new articles, click the Scrape New Articles Link in the navbar. Scrape New Articles will send a get request to `/scrape` endpoint in server.js and insert any new articles into the Articles collection. After scrape is complete, the app page will refresh to display the new articles.

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/navbar_1.png">

### Save an Article
To Save an article, click the link to the Home Page in the navbar. Find an article and below the image and short summary associated with the article, click the link that says Save Article. This will will trigger a put request to `/save/:id` where `:id` is equal to the unique id that was created when the article was scraped and inserted into the Articles collection. It sets the isSaved field to true. The page will refresh and the article will not appear on the home page.

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/navbar_3.png">


<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/save_an_article.jpg" width="50%">


### View and Add Comment(s) to Article

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/view_add_comment.png" width="50%">


<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/save_an_article.jpg" width="50%" height="100%">

### Remove a Saved Article

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/navbar_2.png" width="50%" height="100%">

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/saved_articles.jpg" width="50%" height="100%">

<img src="https://raw.githubusercontent.com/crystalodi/kpop-news-scraper/master/images/remove_from_saved.jpg" width="50%" height="100%">

## Built With

* [NodeJS](https://nodejs.org/) - The web framework used
* [Express](https://expressjs.com/) - Used to create web server
* [Mongoose](http://mongoosejs.com/) - Used to create mongodb collections and relationships with other collections.
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars/) - Used to generate layout
* [Materialize CSS](https://materializecss.com/) - CSS Framework used to add styling to layout.
* [Cheerio](https://www.npmjs.com/package/cheerio) - Node Package that executes jQuery from web server to scrape web site.
* [Request](https://www.npmjs.com/package/request) - HTTP client that retrieves website HTML.
* [Body Parser](https://www.npmjs.com/package/body-parser) - Middleware for parsing body sent for POST requests.

## Authors

* **Crystal Odi** - *Initial work* - [crystalodi](https://github.com/crystalodi)


## Acknowledgments

* Stack Overflow
* Express Documentation
* Mongoose Documentation
* MongoDB Documentation
* AllKpop.com
* Mozilla Developer's Network

