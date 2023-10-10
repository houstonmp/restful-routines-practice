const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));  //For form encoded data
app.use(express.json()); //For parsing json data

app.get('/', (req, res) => {
    res.render("index.ejs");
})
app.get('/tacos', (req, res) => {
    console.log("Got GET Request", req.body)

    res.send("GET /tacos response")
})
app.post('/tacos', (req, res) => {
    console.log("Got POST Request", req.body)
    const { meat, qty } = req.body;
    res.send(`Ok! Here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("On port 3000")
})