'use strict';

const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
const server = express();
const superagent = require('superagent');
server.use(express.urlencoded({ extended: true }));


server.set('view engine', 'ejs');


server.use(express.static('./public'));


server.get('/hello',(req,res) =>{
    res.render('./pages/index')
})

server.get('/new',(req,res) =>{
    let title = req.query.title;
    let author = req.query.author;
    let key = process.env.GOOGLE_API_KEY
    let url =''
    superagent.get(url)
    .then(result =>{
        let booksArray = result.body.items.volumeInfo.map((item)=>{
            return new Book(item)
        })
        res.render('/show', { books: books })

    })
    .catch(()=>{
        errorHandler('Error in getting data from Google Books API')
    })

})

server.post('/searches',(req,res) =>{
    res.render('./pages/new')
})

function Book(book) {
    this.title = book.title;
    this.url = book.imageLinks.smallThumbnail;
    this.authors = book.authors[0];
    this.description = book.description;

}



server.get('/', (req, res) => {
    console.log('hhhhh')

    res.render('./pages/index');
})

function errorHandler(errors) {
    server.use('*',(req,res)=>{
        res.status(500).send(errors);
    })
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
