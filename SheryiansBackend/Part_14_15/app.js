const express = require("express");
const app = express();
const PORT = 5000;

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// set jwt in cookie
app.get("/", (req, res) => {
  let token = jwt.sign({ email: "devdachirag@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("Server Started");
});

// get jwt token from cookie
app.get("/decodecookie", (req, res) => {
  let decoded = jwt.verify(req.cookies.token, "secret");
  res.send(decoded);
});

// get cookie
app.get("/readCookie", (req, res) => {
  console.log(req.cookies);
  res.send("Read Cookie");
});

// encrypt password in hash
app.get("/encryptPassword", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("Chirag@878787", salt, function (err, hash) {
      console.log(hash);
    });
  });
  res.send("done");
});

// decrypt and comapre hash password with user password
app.get("/dcryptPassword", (req, res) => {
  res.send("Read");
  bcrypt.compare(
    "Chirag@878787",
    "$2b$10$ISfDSmFLhEQwKBy3OaShqe0kl5B9MR7m8638iDSmuAsoiGQ.S0Nhi",
    function (err, result) {
      console.log(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
