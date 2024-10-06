const { validateTransaction } = require('../services/transactionService');

exports.validateTransaction = async (req, res) => {
    try {
        const { token, amount, date } = req.body;

        const result = await validateTransaction(token, amount, date);

        if (result.status === 'succeeded') {
            res.status(200).json({
                message: 'Transacción validada exitosamente',
                result
            });
        } else {
            res.status(400).json({
                message: 'Error al validar la transacción',
                result
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error });
        console.log(error)
    }
};
