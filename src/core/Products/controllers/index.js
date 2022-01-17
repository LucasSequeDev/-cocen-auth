const getProductsController = ( req , res) => {
    try {
        res.send(req.user)
    } catch(error) {
        res.status(500).json({ message: 'Ocurrio un error en el servidor.' });
    }
}
module.exports = {getProductsController }

