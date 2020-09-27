// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); /*express.json parses incoming requests with JSON payloads and is based on body-parser.*/
app.use(express.static('public'));

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    /*res.send('Hello World');*/
    res.send(Buffer.from('<p>some html</p>'));
  })
  .post((req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
  });

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}!`);
});
