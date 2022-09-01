import express from "express";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())
const port = 3456;let quotes = [
  {
    id: 1,
    quote: "The purpose of our lives is to be happy.",
    firstName: "Dalai",
    lastName: "Lama",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Dalailama1_20121014_4639.jpg",
    age: 87  
  },
  {
    id: 2,
    quote: "Get busy living or get busy dying.",
    firstName: "Stephen",
    lastName: "King",
    image: "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
    age: 74
  },
  {
    id: 3,
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    firstName: "Les",
    lastName: "Brown",
    image:
      "https://cdn.motivationgrid.com/wp-content/uploads/2014/02/les_brown-true.jpg",
    age: 77
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
  let errors: string[] = []

  if(typeof req.body.quote !== 'string'){
    errors.push('Quote not given or not a string')
  }

  if(typeof req.body.firstName !== 'string'){
    errors.push('First Name not found or not a string')
  }

  if(typeof req.body.lastName !== 'string'){
    errors.push('Last Name not found or not a string')
  }

  if(typeof req.body.image !== 'string'){
    errors.push('Image not found or not a string')
  }

  if(typeof req.body.age !== 'number'){
    errors.push('Age not found or not a number')
  }

  if (errors.length === 0){
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
} else{
  res.status(404).send({errors})
}
});

app.delete("/quotes/:id",(req, res) => {
  const id = Number(req.params.id)
  const indexToDelete = quotes.findIndex(quote => quote.id === id)

  if (indexToDelete  > -1){
    quotes = quotes.filter(quote => quote.id !== id)
    res.send('Quote delete successfully.')
  } else {
    res.status(404).send('Quote not found.')
  }
})

app.listen(port, () => {
  console.log(`Yeyy! http://localhost:${port}`);
});
