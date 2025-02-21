const express = require("express");
const cors = require("cors");
const app = express();

const { initializerDatabase} = require("./db/db.connection");
const { BooksReducer } = require("./book.model");

app.use(cors());
app.use(express.json());
initializerDatabase()

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/books", async (req, res) => {
  try {
    const allbooks = await BooksReducer.find();
    res.json(allbooks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  const { bookName, author, genre } = req.body;

  try {
    const bookData = new BooksReducer({ bookName, author, genre });
    await bookData.save();
    res.status(201).json(bookData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await BooksReducer.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const updateBookData=async (id,dataToBeUpdated) => {
  try {
    const updated=await BooksReducer.findByIdAndUpdate(id,dataToBeUpdated,{new:true})
    return updated
  } catch (error) {
    throw error
  }
}
app.put("/books/:id",async (req,res) => {
  try {
    const updated=await updateBookData(req.params.id,req.body)
    if(updated){
      res.status(200).json(updated)
    }else{
      res.status(404).json({error:"Data Not Found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
