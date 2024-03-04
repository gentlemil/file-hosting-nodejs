const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
  //
});



app.listen(port, () => {
  console.log(`Server uruchomiony na porcie: ${port}`);
});