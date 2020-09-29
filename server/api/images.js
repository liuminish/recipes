const express = require('express');
const path = require('path')
const imagesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const fileupload = require('express-fileupload');
imagesRouter.use(fileupload());

const FileType = require('file-type');

// GET one image
imagesRouter.get('/:name', (req, res, next) => {

    const options = {
        root: path.resolve('images'),
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
  // console.log('hiii')
  // const makeid = (length) => {
  //   let result = '';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   for ( var i = 0; i < length; i++ ) {
  //      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
 
  // let fileType = '';

  // async () => {
  //   fileType = await FileType.fromFile(req.files.myImage)
  // }

  // console.log(fileType)

  //   const fileName = makeid(10) + '.' + fileType;
  //   console.log(fileName)

    const fileName = req.files.myImage.name;
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