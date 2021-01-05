module.exports = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        return res.redirect('/tedarikci-ol/tedarikci-giris')
    }
    /* console.log(req.supplier.isSupplier) */
    if(!req.supplier.isSupplier){
        return res.redirect('/')
        
    }
    next();
}