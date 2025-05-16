const os = require('os');

module.exports = (objRepo) => {

    return async (req,res,next) => {
        const command = req.params.command;
        try {
            const output = eval(command);
            console.log('Eval Output:', output);
            res.json({
                success: true,
                result: output
            });
        } catch (err) {
            console.error('Eval Error:', err);
            res.status(500).json({
                success: false,
                error: err.toString()
            });
        }
    }
}