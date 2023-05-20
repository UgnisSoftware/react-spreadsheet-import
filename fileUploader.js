const express = require("express")
const multer = require("multer")

const upload = multer({ dest: "uploads/" })

const app = express()

app.post("/upload", upload.single("file"), function (req, res) {
  res.json({ message: `Successfully uploaded file ${req.file.originalname}` })
})

app.listen(3000)
