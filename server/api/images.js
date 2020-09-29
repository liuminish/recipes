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

// POST/add one imagem
imagesRouter.post('/', (req, res, next) => {
  console.log('hiii')
    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
    const buffer = readChunk.sync(req.files.myImage, 0, 12);
    const fileType = imageType(buffer).ext;

    const fileName = makeid(10) + '.' + fileType;
    console.log(fileName)
    const uploadPath = path.resolve('images', fileName);

    req.files.myImage.mv(uploadPath, (err) => {
        if (err) {
            next(err)
        } else {
            res.status(201).json({path: fileName})
        }
    })
})

module.exports = imagesRouter