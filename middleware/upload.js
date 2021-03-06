const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png'|| file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/WEBP'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = {upload}