const express = require("express");

const PORT = 3000;

const users = [
  {
    id: 0,
    name: "Boby",
  },
  {
    id: 1,
    name: "Lucy",
  },
];

const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} - ${delta} ms`);
});

app.use(express.json());

app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing user name",
    });
  }
  const newUser = {
    id: users.length,
    name: req.body.name,
  };
  users.push(newUser);
  res.json(newUser);
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = users[userId];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: "User does not exist",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
