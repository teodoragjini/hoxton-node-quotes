import express from "express";

const app = express();
const port = 3456;

const quotes = [
  {
    id: 1,
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
  },
  {
    id: 2,
    quote: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    id: 3,
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    author: "Les Brown",
  },
];

app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.listen(port, () => {
  console.log(`Yeyy! http://localhost:${port}`);
});
