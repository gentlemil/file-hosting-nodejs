const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer = require('multer')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/../views'))
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename(req, file, cb) {
    const name = `${Date.now()}-${file.originalname}`
    cb(null, name)
  },
})

const fileFilter = (req, file, cb) => {
  const whitelist = ['image/png']

  if (whitelist.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Niedozwolone rozszerzenie. Dozwolone jedynie: .png'))
  }
}

app.get('/', (req, res) => {
  res.render('home')
})

app.post(
  '/',
  multer({ storage, fileFilter }).single('file'),
  (err, req, res, next) => {
    if (err) {
      console.log('#########')
      console.log(err)
      return res.render('home', {
        error: err,
      })
    }
    next()
  },
  (req, res) => {
    res.render('home', {
      fileURL: req.headers.host + '/uploads/' + req.file.filename,
    })
  }
)

app.listen(port, () => {
  console.log(`Server uruchomiony na porcie: ${port}`)
})
