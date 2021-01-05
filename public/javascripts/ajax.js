/* $('#postBtn').click(function(){
    let token  = $('#csrf').val();
    var productname = $('#productname').text();
    let Data = {
        'name':productname,
        '_csrf':token
    }
     $.ajax({
         type:'POST',
         url: "/siparisi-tamamla",
         headers: {"X-CSRF-Token": token },
         data: Data,
         success: function (data,status) {
             alert(Data.name);
         }
     });
})
    */
