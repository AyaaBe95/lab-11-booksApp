'use strict';

const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
const server = express();
const superagent = require('superagent');
server.use(express.urlencoded({ extended: true }));


server.set('view engine', 'ejs');


server.use(express.static('./public'));

server.get('/', (req,res) => {
    res.render('./pages/index');
})


server.get('/hello',(req,res) =>{
    res.render('./pages/index')
})


server.get('/new', (req,res) => {
    res.render('/pages/searches/new');
})

server.post('/new', (req,res) =>{
    let search= req.query.search;
    // let title = req.query.title;
    // let author = req.query.author;
    let key = process.env.GOOGLE_API_KEY;
    let url;
    if ($('#title').is(":checked"))
    {
    url = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:keyes&key=${key}`
    }else{
        url =`https://www.googleapis.com/books/v1/volumes?q=${search}+inauthor:keyes&key=${key}`;
    }
    superagent.get(url)
    .then(result => {
        let booksArray = result.body.items.volumeInfo.map((item)=>{
            return new Book(item);
    })
    $('button').click(()=>{

        res.render('./pages/searches/show',{bookData:booksArray});
    })
    })
    .catch(()=>{
        errorHandler('Error in getting data from BooksAPI');
    })
});

// server.post('/searches',(req,res) =>{
//     res.render('./pages/new')
// })

function Book(book) {
    this.title = book.title;
    this.url = book.imageLinks.smallThumbnail;
    this.authors = book.authors[0];
    this.description = book.description;

}



function errorHandler(errors) {
    server.use('*',(req,res)=>{
        res.status(500).send(errors);
    })
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})