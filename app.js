//jshint esversion:6
//xxx
//ww
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const mongoose=require("mongoose");
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:test123@cluster0-b4qcr.mongodb.net/toDoListDB",{useNewUrlParser:true});

const todoSchema=new mongoose.Schema({
  name:String
});

//todoM is the collection name
const todoM=mongoose.model("todoM",todoSchema);

// todoM.insertMany([{name:"1"},{name:"2"},{name:"333"}],function(err){
//   if(err){
//     console.log(err);
//   }
// });

let is=[];
todoM.find(function(err,items){
  if(err){console.log(err);}
  items.forEach(function(i){
      console.log(i.name);
      is.push(i.name);
  })
});

app.get("/",function(req,res){

  res.render("todolist",{items:is});
});

app.post("/",function(req,res){
  const newTodo=new todoM({name:req.body.next_item});
  is.push(req.body.next_item);
  newTodo.save();

  res.redirect("/");
});

app.post("/delete",function(req,res){
  const cbox=req.body.cbox;

  todoM.deleteOne({name:cbox},function(err){});
  var index=is.indexOf(cbox);
  if (index!==-1) is.splice(index,1);
  res.redirect("/");
});



app.listen(process.env.PORT||3000,function(){
  console.log("server started!");
});
