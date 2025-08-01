import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req,file,cb){  //destination ye batata h ki user jo file dega use locil me kaha rakhana h
        cb(null,"./public/temp")
    },
    filename: function(req,file,cb){ //ye batata h ki file name kya hoga jab cloudinary me store hoga to
        cb(null,file.originalname)
    }
})

export const upload = multer({
     storage,
})