module.exports = (req,res,next)=>{
    var csrfToken = req.csrfToken()
    res.cookie('XSRF-TOKEN',csrfToken);
    res.locals.csrfToken = csrfToken;
    next()
}