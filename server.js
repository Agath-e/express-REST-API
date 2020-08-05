const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.send(db);
});
  
app.get('/testimonials/:id', (req, res) => {
    res.send(db.filter(item => item.id == req.params.id));
  });

app.get('/testimonials/random', (req, res) => {
  const randomItem = db[Math.floor(Math.random()*db.length)];
  res.send(randomItem);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body
    const payload = {
        id: uuid(),
        author: author,
        text: text, 
      };
      db.push(payload);
    res.send({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;

  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
  }

  const opinion = db.filter(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db[index] = changedTestimonial;
    res.send({message: 'OK'});
});

app.delete('/testimonials:id', (req, res) => {
    const opinion = db.filter(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db.splice(index, 1);

    res.send({message: 'OK'});
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });