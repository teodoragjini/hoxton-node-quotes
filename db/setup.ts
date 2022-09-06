import Database from "better-sqlite3";
const db = Database("./db/data.db", { verbose: console.log });

function QuotesEvolution() {
  const Quotes = [
    {
      id: 1,
      quote: "The purpose of our lives is to be happy.",
      firstName: "Dalai",
      lastName: "Lama",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/55/Dalailama1_20121014_4639.jpg",
      age: 87,
    },
    {
      id: 2,
      quote: "Get busy living or get busy dying.",
      firstName: "Stephen",
      lastName: "King",
      image: "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
      age: 74,
    },
    {
      id: 3,
      quote:
        "Too many of us are not living our dreams because we are living our fears.",
      firstName: "Les",
      lastName: "Brown",
      image:
        "https://cdn.motivationgrid.com/wp-content/uploads/2014/02/les_brown-true.jpg",
      age: 77,
    },
  ];
  const createQuotesTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS Quotes ( 
      id INTEGER,
      quote TEXT,
      first_name TEXT,
      last_name TEXT,
      image TEXT,
      age INTERGER,
      PRIMARY KEY (id)
      );`);

  createQuotesTable.run();

  const deleteAllQuotes = db.prepare(`
        DELETE FROM Quotes 
      `);
  deleteAllQuotes.run();

  const createSingleQuote = db.prepare(`
      INSERT INTO Quotes (quote, first_name, last_name, image, age) VALUES (?, ?, ?, ?, ?)
      `);
  for (let Quote of Quotes) {
    createSingleQuote.run(
      Quote.quote,
      Quote.firstName,
      Quote.lastName,
      Quote.image,
      Quote.age
    );
  }
}

QuotesEvolution();
