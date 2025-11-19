import express from 'express';
import { addFood,listFood ,removeFood} from '../controllers/foodController.js';
import multer from 'multer'; //image storing system

const foodRouter = express.Router()

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
      return cb(null,`${Date.now()}${file.originalname}`) //to avoid same name files
    }
})

const upload = multer({storage:storage}) //uploading image

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove", removeFood);





export default foodRouter;