// ./express-server/models/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import Todo from '../models/todo.server.model';
export const getTodos = (req,res) => {
  Todo.find().exec((err,todos) => {
      console.log(err)
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    console.log(todos)
return res.json({'success':true,'message':'Todos fetched successfully',todos});
  });
}
export const addTodo = (req,res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':'Todo added successfully',todo});
  })
}
export const updateTodo = (req,res) => {
  Todo.findOneAndUpdate({ name:req.params.name }, req.body, { new:true }, (err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    return res.json({'success':true,'message':'Updated successfully',todo});
  })
}
export const getTodo = (req,res) => {
  Todo.find({name:req.params.name}).exec((err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(todo.length){
      return res.json({'success':true,'message':'Todo fetched by name successfully',todo});
    }
    else{
      return res.json({'success':false,'message':'Todo with the given name not found'});
    }
  })
}
export const deleteTodo = (req,res) => {
  Todo.findByIdAndRemove(req.params.name, (err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':todo.name+' deleted successfully'});
  })
}