const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const day = require(__dirname + "/date.js")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

let newItems = ["Buy food", "Cook it", "Bon appetit"];
let workItems = [];

app.get("/", (req,res) => {


    res.render("list", {
        listTitle: day,
        newListItems: newItems,
    })

})

app.get("/work", (req, res) => {

    res.render("list", {
        listTitle: 'Work List',
        newListItems: workItems,

    })
})

app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    if(req.body.list === 'Work List'){
        if(newItem !== ''){
            workItems.push(newItem);
        }
        res.redirect("work")
    }else{
        if(newItem !== '') {
            newItems.push(newItem)
        }
        res.redirect("/");
    }

})

app.listen(port, () => {
    console.log(`Listening port ${port}`);
})