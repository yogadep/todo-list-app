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
        console.log('gagal terhubung ke server');
    }
}

startServer()
