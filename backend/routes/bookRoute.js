import express from 'express'
const router=express.Router()
import { Book } from "../models/bookModel.js";

router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error);
    }
  });
  router.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(500).json({ success: false });
    }
    res.send(book);
  });
  router.post("/", async (req, res) => {
    let book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    book = await book.save();
    if (!book) return res.status(500).send("The book cannot be created");
    res.send(book);
  });
  router.put("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid book Id");
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      },
      { new: true }
    );
  
    if (!book) return res.status(500).send("the book cannot be updated!");
  
    res.send(book);
  });
  router.delete('/:id', (req, res)=>{
      Book.findByIdAndRemove(req.params.id).then(book =>{
          if(book) {
              return res.status(200).json({success: true, message: 'the book is deleted!'})
          } else {
              return res.status(404).json({success: false , message: "book not found!"})
          }
      }).catch(err=>{
         return res.status(500).json({success: false, error: err}) 
      })
  })
  
export default router