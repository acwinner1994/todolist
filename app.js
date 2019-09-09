//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var items=[];

var today=new Date();
var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
var day=today.toLocaleDateString("en-US",options);

app.get("/",function(req,res){
  res.render("todolist",{day:day,items:items});
});

app.post("/",function(req,res){
  var item=req.body.next_item;
  items.push(item);
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("server started!");
});
