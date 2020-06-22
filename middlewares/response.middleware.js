const responseMiddleware = (req, res, next) => {
    let obj = req.body

    if (obj[0] == 404){
        res.status(obj[0]);
        res.json({
        error: true,
        message: obj[1]})
    } else if(obj[0] == 400){
        res.status(obj[0]);
        res.json({
          error: true,
          message: obj[1]})
    } else {
        next()
    };
}
exports.responseMiddleware = responseMiddleware;
