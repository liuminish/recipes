const express = require('express');
const path = require('path')
const imagesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const fileupload = require('express-fileupload');
imagesRouter.use(fileupload());

const readChunk = require('read-chunk');
const imageType = require('image-type');

// GET one image
imagesRouter.get('/:name', (req, res, next) => {

    const options = {
        root: path.join('/root/recipes/server/images/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      const fileName = req.params.name
      res.sendFile(fileName, options, (err) => {
        if (err) {
          next(err)
        } else {
          res.status(200).send(fileName)
        }
      })
})

// POST/add one image
imagesRouter.post('/', (req, res, next) => {

    const fileName = req.files.myImage.name
    console.log(fileName)
    const uploadPath = path.resolve('images', fileName);

    req.files.myImage.mv(uploadPath, (err) => {
        if (err) {
            next(err)
        } else {
            res.status(201).json({name: fileName})
        }
    })
})

module.exports = imagesRouter