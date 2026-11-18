const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-Help" },
];
let nextId = 3;

app.get("/books", (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(
      books.filter((b) => b.category.toLowerCase() === category.toLowerCase())
    );
  }
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author, category } = req.body;
  if (!title || !author || !category) {
    return res
      .status(400)
      .json({ message: "title, author and category are required" });
  }
  const book = { id: nextId++, title, author, category };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author, category } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (category) book.category = category;

  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deleted[0] });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
