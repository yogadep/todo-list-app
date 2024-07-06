import express from "express";
import { activityRouter } from "./routes/activityRouter.js";
import { connect } from "./library/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/activities', activityRouter);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connect();
        app.listen(PORT, ()=>{
            console.log(`server berjalan di port: ${PORT}`);
        })
    } catch (error) {
        console.log('gagal terhubung ke database');
    }
}

startServer()

// const activity = mongoose.model('Activity', {
//     name:{
//         type: String,
//         required: true
//     },
//     status: {
//         type: Boolean,
//         default: false
//     }

// })
// const activ = new activity({
//     name: 'playing'
// })

// activ.save()
//     .then(result => console.log(result))
//     .catch(error => console.log(error))