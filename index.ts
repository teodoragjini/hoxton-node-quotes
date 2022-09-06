import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = Database('./db/data.db',{ verbose: console.log })

const app = express();
app.use(cors());
app.use(express.json());
const port = 3456;

app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((quote) => quote.id === id);

  res.send(match);
});

app.post("/quotes", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.quote !== "string") {
    errors.push("Quote not given or not a string");
  }

  if (typeof req.body.firstName !== "string") {
    errors.push("First Name not found or not a string");
  }

  if (typeof req.body.lastName !== "string") {
    errors.push("Last Name not found or not a string");
  }

  if (typeof req.body.image !== "string") {
    errors.push("Image not found or not a string");
  }

  if (typeof req.body.age !== "number") {
    errors.push("Age not found or not a number");
  }

  if (errors.length === 0) {
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
  } else {
    res.status(404).send({ errors });
  }
});

app.delete("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexToDelete = quotes.findIndex((quote) => quote.id === id);

  if (indexToDelete > -1) {
    quotes = quotes.filter((quote) => quote.id !== id);
    res.send("Quote delete successfully.");
  } else {
    res.status(404).send("Quote not found.");
  }
});

app.patch("/quotes/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = quotes.find((quote) => quote.id === id);

  if (match) {
    if (req.body.quote) {
      match.quote = req.body.quote;
    }

    if (req.body.firstName) {
      match.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      match.lastName = req.body.lastName;
    }

    if (req.body.image) {
      match.image = req.body.image;
    }

    if (req.body.age) {
      match.age = req.body.age;
    }

    res.send(match);
  } else {
    res.status(404).send("Quote not found");
  }
});

app.listen(port, () => {
  console.log(`Yeyy! http://localhost:${port}`);
});
