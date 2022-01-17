const express = require('express')
const cors = require('cors') 
const morgan = require('morgan')
const AuthRouter = require('./app/Auth/routes') 
const PingRouter = require('./app/Ping/routes') 
const CoreProductsRouter = require('./core/Products/routes') 

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
app.use("/ping", PingRouter);
app.use("/api/auth", AuthRouter);

app.use("/core/products", CoreProductsRouter);

// Not found
app.use( (req,res) => {
    res.status(404).send("Resourse not found")
})


app.listen(app.get('port'), async () => {

    console.log(`Server on port ${app.get('port')}`);
});
