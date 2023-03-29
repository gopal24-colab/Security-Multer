const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const crypto = require("crypto");
const env = require("dotenv");
const cookie = require("cookie-parser");
env.config();
const secret = crypto.randomBytes(16).toString("hex"); /* Salt */
// console.log(secret);
const bcrypt = require("bcrypt");
const saltRound = 12;
const myTextPass = "Password";
const jwt = require("jsonwebtoken");
app.use(cookie());
/*
(async function () {
  const hashedPass = await bcrypt.hash(myTextPass, saltRound);
  console.log(hashedPass);

  const passMatch = await bcrypt.compare(myTextPass, hashedPass);
  console.log(passMatch);
})();
*/
const secret_key = "mySecrectKeyIsHere(!@#!!@#!!hello)(#@$#@324))";
const data = "My Name is GOPAL SASMAL , I'm a backend developer";
let jwt_token = jwt.sign({ payload: data }, secret_key);
// console.log(jwt);
app.get("/", (req, res) => {
  res.cookie("login", jwt_token, { httpOnly: true });
  res.json({ message: "Welcome to my coding world" });
});
app.get("/getUser", (req, res) => {
  console.log(req.cookies.login);

  if (req.cookies.login != undefined) {
    const isVarified = jwt.verify(req.cookies.login, secret_key);
    if (isVarified) res.json({ message: "User varified" });
    else res.json({ message: "user not authiniticated" });
  } else {
    res.json({ message: "login page" });
  }
});

app.listen(PORT, (err) => {
  if (err) console.log(`Error occured due to $$$ ${err}`);
  else console.log(`server connected on port http://localhost:${PORT}`);
});
