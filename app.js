//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Tech Talks mostly shares articles and guides related to new gadgets such as TV, mobile, tablets, laptops and gaming devices as well. Apart from this it also covers podcasts, videos and photos related to latest technology trends. Also, it comes really handy for comparing websites or new gadgets at the same time on this website easily. You will surely be going to get a lot of valuable information through reading this website on the daily basis.";
const aboutContent = "Tech Talks is the definitive guide to this connected life.Technology isn't all about bits and processors. It's the car with no driver, human organs printed in a lab and leisurely flights into space. It's the future and we're here to tell you all about it. Since 2021, Tech Talks has exhaustively covered cutting edge devices and the technology that powers them. As we enter our second decade, we're looking beyond the gadgets themselves to explore how they impact our lives.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-prashant:Test123@cluster0.xqu7s.mongodb.net/blogDB",{useNewUrlParser:true});

const itemSchema={
  name:String,
  content:String
};

const Tile=mongoose.model("Tile",itemSchema);


app.get("/",function(req,res) {
  Tile.find({},function(err,posts) {
    res.render('home',{startCon:homeStartingContent,
     posts:posts,
    });
  });
});

app.get("/about",function(req,res) {
  res.render('about',{about:aboutContent});
});

app.get("/contact",function(req,res) {
  res.render('contact');
});

app.get("/compose",function(req,res) {
  res.render('compose');
});

app.get("/posts/:postId",function(req,res) {
  parm=req.params.postId;

 Tile.findOne({_id:parm},function(err,post) {
     res.render('post',{
          title:post.name,
          cxt:post.content
        });
 });

});

app.post("/compose",function(req,res) {
  const inp=req.body.title;
  const cont=req.body.postbody;
  const item1=new Tile({
    name:inp,
    content:cont
  });
  item1.save();
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
