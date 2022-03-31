const router = require('express').Router();
const multer = require('multer');
const conn = require('../../dbConnection');
const {PythonShell} =require('python-shell');

// Configure Storage
let storage = multer.diskStorage({

// Setting directory on disk to save uploaded files
destination: function (req, file, cb) {
      cb(null, 'Routes/IMGS/')
  },

// Setting name of file saved
filename: function (req, file, cb) {
    let name = file.fieldname + "_" + file.originalname
    cb(null, name)
    let options = {
      mode: 'text',
      pythonPath: '/usr/bin/python3',
      pythonOptions: ['-u'], // get print results in real-time
      args: [name] //An argument which can be accessed in the script using sys.argv[1]
    };
    PythonShell.run('Routes/IMGS/dcmToIm.py', options, function (err, result){
      if (err) console.log(err);
      // result is an array consisting of messages collected
      //during execution of script.
      console.log('result: ', result.toString());
});
  }
})

const upload = multer({storage: storage});

// define the about route
router.post('/uploadfile', upload.single('file'), (req, res, next) => {
  const file = req.file
  //console.log(file);
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      console.log(error);
      return next(error)
  }
  res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
  })

}, (error, req, res, next) => {
  res.status(400).send({
      error: error.message
  })
})


router.get('/', (req, res)=>{
  const {id} = req.params
  let sql = 'SELECT * FROM imagenes'    
  conn.query(sql,[id], (err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
})

router.get('/imagenes/:path', (req,res) => {
  console.log(req.params)
  console.log(__dirname)
  const path = req.params.path;
  res.sendFile( __dirname+`/public/${path}` );
})

module.exports = router;

