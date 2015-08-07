module.exports = function (app) {
  var Book = require('../models/book.js');
  var findBooks;
  var findById;
  var addNewBook;
  var updateBook;
  var deleteBoo;

  findBooks = function (req, res) {
    console.log("GET - /books");

    return Book.find(function (err, books) {
      if (!err) {
        return res.send(books);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
   });
  };

  findById = function (req, res) {
    console.log("GET - /book/:id");
    return Book.findById(req.params.id, function(err, book) {

      if (!book) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        return res.send({ status: 'OK', book: book });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  addNewBook = function (req, res) {
    console.log('POST - /book');
    console.log(req.body);

    var book = new Book({
      name: req.body.name,
      author: req.body.author,
      editorial: req.body.editorial,
      edition: req.body.edition,
      country: req.body.country,
      price: req.body.price,
      pages: req.body.pages
    });

    book.save(function (err) {
      if (!err) {
        console.log("Book created");
        return res.send({ status: 'OK', book:book });
      } else {
        console.log(err);
        if (err.name === 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  };

  updateBook = function(req, res) {
    console.log("PUT - /book/:id");
    console.log(req.body);
    return Book.findById(req.params.id, function (err, book) {
      if (!book) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.name !== null) book.name = req.body.name;
      if (req.body.author !== null) book.author = req.body.author;
      if (req.body.editorial !== null) book.editorial = req.body.editorial;
      if (req.body.edition !== null) book.edition = req.body.edition;
      if (req.body.country !== null) book.country  = req.body.country;
      if (req.body.price !== null) book.price = req.body.price;
      if (req.body.pages !== null) book.pages = req.body.pages;

      return book.save(function(err) {
        if (!err) {
          console.log('Updated');
          return res.send({ status: 'OK', book:book });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
    });
  };

  deleteBook = function (req, res) {
    console.log("DELETE - /book/:id");
    return Book.findById(req.params.id, function(err, book) {
      if (!book) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return book.remove(function(err) {
        if (!err) {
          console.log('Removed book');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s', res.statusCode, err.message);
          return res.send({ error: 'Server error' });
        }
      });
    });
  };

  app.get('/books', findBooks);
  app.get('/book/:id', findById);
  app.post('/book', addNewBook);
  app.put('/book/:id', updateBook);
  app.delete('/book/:id', deleteBook);

};


