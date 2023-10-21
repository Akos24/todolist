import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url))

var listItem = 0
var items = [];

var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDay();

var date = new Date(year, month, day);
month = date.toLocaleString('default', { month: 'long' });
date = year + " " + month + " " + day;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    items = [];
    listItem = 0;
    res.render("index.ejs", {listItem: listItem, date: date});
});

app.post("/new", (req, res) => {
    var innerText = req.body["text"];
    items.push(innerText);
    listItem++;
    res.render("index.ejs", {listItem: listItem, date: date, text: items});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});