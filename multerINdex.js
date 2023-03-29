const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use(express.static("uploads"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", upload.single("yourpic"), (req, res) => {
  console.log(req.file);
  res.render("image", { url: req.file.filename });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
