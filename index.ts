import express from "express";

const app = express();
const port = 3456;

const quotes = [
  {
    id: 1,
    quote: "The purpose of our lives is to be happy.",
    firstName: "Dalai",
    lastName: "Lama",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Dalailama1_20121014_4639.jpg",
    age: "87 Years Old",
  },
  {
    id: 2,
    quote: "Get busy living or get busy dying.",
    firstName: "Stephen",
    lastName: "King",
    image: "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
    age: "74 Years Old",
  },
  {
    id: 3,
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    firstName: "Les",
    lastName: "Brown",
    image:
      "https://cdn.motivationgrid.com/wp-content/uploads/2014/02/les_brown-true.jpg",
    age: "77 Years Old",
  },
];

app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((quote) => quote.id === id);

  res.send(match);
});

app.post("/quotes", (req, res) => {
  const newQuotes = {
    id: quotes[quotes.length - 1].id + 1,
    quote: req.body.quote,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.body.image,
    age: req.body.age,
  };

  quotes.push(newQuotes);
  res.send(newQuotes);
});

app.listen(port, () => {
  console.log(`Yeyy! http://localhost:${port}`);
});
