import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import AuthRouter from './app/Auth/routes';

const app = express();
// ENV import

// Settings
app.set('port',process.env.PORT || 4005);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", AuthRouter);

// Not found
app.use( (req,res) => {
    res.status(404).send("Resourse not found")
})


app.listen(app.get('port'), async () => {

    console.log(`Server on port ${app.get('port')}`);
});
