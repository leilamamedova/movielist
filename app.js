const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongodb_URI = 'mongodb+srv://leilam_ova:HelloBaby19@restaurant.aproe.mongodb.net/MovieDB?retryWrites=true&w=majority'
mongoose.connect(mongodb_URI, {useNewUrlParser:true, useUnifiedTopology:true});

const Schema = new mongoose.Schema (
    {
        title: String,
        favorite: String
    }
)

const MovieList = mongoose.model("MovieList", Schema)

app.get("/", function(req,res) {
    MovieList.find({}, function(err,movies) {
        if(err) {
            console.log(err);
        }else{
            res.render("list", {myMovie: movies});
        } 
    })     
});

app.post("/", function(req,res) {
    let movie = req.body.newMovie;
    let fav = req.body.checkBox;
    const newMovie = new MovieList (
        {
            title: movie,
            favorite: fav
        }
    )
    newMovie.save();  

    res.redirect("/");
});

app.post("/delete", function(req,res) {
    const deletedId = req.body.deleteBtn;
    MovieList.findByIdAndRemove(deletedId, function(err){
        if(!err) {
            res.redirect("/")
        }else{
            console.log(err);
        }
    })   
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);