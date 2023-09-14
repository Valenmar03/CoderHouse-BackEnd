import multer from "multer";
import __dirname from '../utils.js';

const storage = multer.diskStorage({
    destination:function(req, file, callback){
        //if(file.mimetype == 'jpg'){
            callback(null, `${__dirname}/public/Images`)
        /* } else if(file.mimetype == 'pdf'){
            callback(null, `${__dirname}/public/Documents`)
        } */

    },
    filename: function(req, file, callback){
        callback(null, `hola`)
    }
})


const uploader = multer({storage})

export default uploader