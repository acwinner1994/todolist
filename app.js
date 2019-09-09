//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=[];

let today=new Date();
let options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
let day=today.toLocaleDateString("en-US",options);

app.get("/",function(req,res){
  res.render("todolist",{day:day,items:items});
});

app.post("/",function(req,res){
  let item=req.body.next_item;
  items.push(item);
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("server started!");
});
