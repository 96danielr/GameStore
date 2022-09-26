// Models
const { Consoles } = require('../models/consoles.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const consoleExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const console = await Consoles.findOne({ where: { status: 'active', id } });

    if (!console) {
        return next(new AppError('This console does not exists', 404));
    }

    req.console = console;
    next();
});

module.exports = { consoleExists };
