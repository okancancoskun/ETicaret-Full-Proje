module.exports = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.isAdmin = req.user ? req.user.isAdmin : false;
    res.locals.isSupplier = req.supplier ? req.supplier.isSupplier : false;
    next();
}