process.env.NODE_ENV = 'test';

const request = require('supertest');
// const Book = require("../models/book");
const app = require('../app');
const db = require("../db");

// let book_isbn;


let data = {
    isbn: '1234567',
    amazon_url: 'http://a.co/eob',
    author: 'John M',
    language: 'english',
    pages: 3,
    publisher: 'Homeprint Press',
    title: 'Testing with supertest',
    year: 2021
}



beforeEach(async function(){
    const result = await db.query(
        `INSERT INTO books (
            isbn,
            amazon_url,
            author,
            language,
            pages,
            publisher,
            title,
            year
       ) 
         VALUES (
           ${data.isbn},
           ${data.amazon_url},
           ${data.author},
           ${data.language},
           ${data.pages},
           ${data.publisher},
           ${data.title},
           ${data.year}
            )`
        );
        // book_isbn = result.rows[0].isbn;
         });

        

afterEach(async function(){
    await db.query(`DELETE FROM books`);
    });



// describe("GET /books", () => {
//     test ("Get all books", async () =>{
//         const res = await request(app).get("/books");
//         expect(res.statusCode).toBe(200);
//     })
// });


describe("GET /books/:isbn", () => {
    test ("Get a book", async () =>{
        const res = await request(app).get(`/books/${data.isbn}`);
        expect(res.statusCode).toBe(200);
    })
});



// describe("POST /books", () => {
//     test("Creating a new book", async () => {
//         const res = await request(app).post("/books").send({
//                 "isbn": "0691161518",
//                 "amazon_url": "http://a.co/eobPtX2",
//                 "author": "Matthew Lane",
//                 "language": "english",
//                 "pages": 264,
//                 "publisher": "Princeton University Press",
//                 "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
//                 "year": 2017
//         });
//         expect(res.statusCode).toBe(201)
//     })
// })


// describe("DELETE /books/:id", () => {
//     test("Deletes a book", async () => {
//         const res = await request(app).delete(`books/${book_isbn}`);
//         expect(res.body).toEqual({message: "Book deleted"});
//     })
// })
