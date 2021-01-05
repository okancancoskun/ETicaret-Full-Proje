$("#myModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget);
  var parent = button[0].parentElement.parentElement;
  var ch = parent.children[0];
  var value = $(ch).val();
  var modal = $(this);

  modal.find(".modal-product").val(value);
});
