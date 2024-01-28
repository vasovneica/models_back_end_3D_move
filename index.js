import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as PostController from "./controllers/PostController.js";




mongoose.connect(
    'mongodb+sxxx',

).then(() => { console.log("DB OK"); })
    .catch((err) => console.log("DB error", err));

const app = express();

const storage= multer.diskStorage({
    destination:(_, __,cb)=>{
        cb(null,"uploads");

    },
    filename:(_, file,cb)=>{
        cb(null,file.originalname);

    }
});

const upload=multer({storage});


app.use(express.json());

app.use(cors());

app.use("/uploads",express.static("uploads"));

app.get("/posts",PostController.getAll )

app.get("/tags",PostController.getLastTags )

app.get("/posts/:id",PostController.getOne)


app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server OK");
})