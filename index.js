const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

// method-override allows PATCH or DELETE requests where the client doesn't support it.
const methodOverride = require('method-override');
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));  //For form encoded data
app.use(express.json()); //For parsing json data

// Query word to look for in the form client
app.use(methodOverride('_method'));

let comments = [
    {
        id: 'ced7d1a4-49d2-4464-9829-5b8619096e92',
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: 'f41ac2de-3bfd-46bd-b645-3124130e3a57',
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 'a612afa2-7b18-4800-a004-47e2bdf05375',
        username: 'Sk8terBoi',
        comment: 'Please delete your account, Todd'
    },
    {
        id: '89d7dd2e-4f9e-4e18-8605-b445c58408f9',
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
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(el => el.id === id);
    res.render('comments/editComment', { ...foundComment });
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    res.redirect('/comments');
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(el => el.id === id);
    foundComment.comment = newCommentText;
    console.log("Patching:", foundComment, newCommentText)
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(el => el.id !== id);
    res.redirect('/comments')
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