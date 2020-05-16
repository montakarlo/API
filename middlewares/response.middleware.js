const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
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
        // res.status(200);
        // res.json(obj);
        next()
    };
}

exports.responseMiddleware = responseMiddleware;