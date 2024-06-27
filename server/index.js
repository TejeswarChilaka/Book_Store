import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Book-Store");
});

app.post("/books", async (req, res) => {
    try {
      const { title, author, publishYear } = req.body;
      
      if (!title || !author || !publishYear) {
        return res.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      
      const newBook = { title, author, publishYear };
      const book = await Book.create(newBook);
      
      return res.status(201).send(book); // Send the created book with 201 status
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
// app.post("/books", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res.status(400).send({
//         message: "Send all required fields: title, author, publishYear",
//       });
//     }
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       publishYear: req.body.publishYear,
//     };
//     const book = await Book.create(newBook);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

app.get(
    '/books', async (req,res) => {
        try{
            const books = await Book.find({});
            return res.status(200).json(books);
        }
        catch(error){
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
    }
);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
