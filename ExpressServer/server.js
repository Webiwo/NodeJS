const express = require("express");

const PORT = 3000;

const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url}: ${delta} ms`);
});

app.use(express.json());

// routes
app.use("/users", require("./routes/users.router"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
