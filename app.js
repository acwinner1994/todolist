//jshint esversion:6
//xxx
//ww
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=[];
let workitems=[];
let today=new Date();
let options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
let day=today.toLocaleDateString("en-US",options);

app.get("/",function(req,res){
  res.render("todolist",{listTitle:day,items:items});
});

app.post("/",function(req,res){
  let item=req.body.next_item;
  items.push(item);
  res.redirect("/");
});

app.get("/work",function(req,res){
  res.render("todolist",{listTitle:"work list",items:workitems});
});

app.post("/work",function(req,res){
  let item=req.body.next_item;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(process.env.PORT||3000,function(){
  console.log("server started!");
});
