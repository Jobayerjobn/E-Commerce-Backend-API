//middleware.js

export const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const  duration = Date.now() - start;
        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration:`${duration}ms`,
            localTime: new Date().toLocaleString(),
            timeStamps: new Date().toISOString()

        });
    });
    
    next();


};

export const responseHelper = (res, statusCode, message, data=null) => {
    return res.status(statusCode).json({
        success:`${statusCode}`.startsWith('2') ? true : false,
        status: statusCode,
        message,
        data,

    });

};

