const multer = require('multer');
const path = require('path');
module.exports.files={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/upload/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      
      return storage;
},

allowedFile:function(req, file, cb) {
    
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only  files are allowed!';
        return cb(new Error('Only  files are allowed!'), false);
    }
    cb(null, true);
}


}