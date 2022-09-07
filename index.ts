import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = Database("./db/data.db", { verbose: console.log });

const app = express();
app.use(cors());
app.use(express.json());
const port = 3456;

const getQuotes = db.prepare(`
SELECT * FROM Quotes
`);

const getQuotesById = db.prepare(`
SELECT * FROM Quotes WHERE id=?
`);


const createSingleQuote = db.prepare(`
INSERT INTO Quotes (quote, first_name, last_name, image, age) VALUES (?, ?, ?, ?, ?)
`);

app.get("/quotes", (req, res) => {
  const Quotes = getQuotes.all();
  res.send(Quotes);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quote = getQuotesById.get(id);

  if (quote) {
    res.send(quote);
  } else {
    res.status(404).send({ error: "Quote not found!" });
  }
});

app.post("/quotes", (req, res) => {
  const quote = req.body.quote
  const first_name = req.body.firstName
  const last_name = req.body.lastName
  const image = req.body.image
  const age = req.body.age

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

  if (errors.length > 0) {
   res.status(400).send({errors})

  }else{
    const info = createSingleQuote.run(quote, first_name, last_name, image, age)
    const Quote = getQuotesById.get(info.lastInsertRowid)
    res.send(Quote)
  }
  });

// app.delete("/quotes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const indexToDelete = quotes.findIndex((quote) => quote.id === id);

//   if (indexToDelete > -1) {
//     quotes = quotes.filter((quote) => quote.id !== id);
//     res.send("Quote delete successfully.");
//   } else {
//     res.status(404).send("Quote not found.");
//   }
// });

// app.patch("/quotes/:id", (req, res) => {
//   let id = Number(req.params.id);
//   let match = quotes.find((quote) => quote.id === id);

//   if (match) {
//     if (req.body.quote) {
//       match.quote = req.body.quote;
//     }

//     if (req.body.firstName) {
//       match.firstName = req.body.firstName;
//     }

//     if (req.body.lastName) {
//       match.lastName = req.body.lastName;
//     }

//     if (req.body.image) {
//       match.image = req.body.image;
//     }

//     if (req.body.age) {
//       match.age = req.body.age;
//     }

//     res.send(match);
//   } else {
//     res.status(404).send("Quote not found");
//   }
// });

app.listen(port, () => {
  console.log(`Yeyy! http://localhost:${port}`);
});
