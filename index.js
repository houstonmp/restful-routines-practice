const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));  //For form encoded data
app.use(express.json()); //For parsing json data

const comments = [
    {
        id: 'id1',
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: 'id2',
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 'id3',
        username: 'Sk8terBoi',
        comment: 'Please delete your account, Todd'
    },
    {
        id: 'id4',
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
app.get('/comments/new', (req, res) => {
    res.render('comments/newComment');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(el => el.id == id)
    res.render('comments/show', { ...comment })
})

app.listen(3000, () => {
    console.log("On port 3000")
})


// app.get('/', (req, res) => {
//     res.render("index.ejs");
// })
// app.get('/tacos', (req, res) => {
//     console.log("Got GET Request", req.body)

//     res.send("GET /tacos response")
// })
// app.post('/tacos', (req, res) => {
//     console.log("Got POST Request", req.body)
//     const { meat, qty } = req.body;
//     res.send(`Ok! Here are your ${qty} ${meat} tacos`)
// })