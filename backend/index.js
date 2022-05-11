import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; //mongodb://0.0.0.0:27017/store

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log(`Connected with mongoose on ${MONGO_URI}`);
    })
    .catch(console.dir);

app.listen(PORT, () => console.log(`Listening on ${PORT} `));
