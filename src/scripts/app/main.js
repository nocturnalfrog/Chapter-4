(function() {
  $(function() {
    var modalPost, showModal;
    modalPost = $("#modal-post");
    showModal = function(formId, type) {
      modalPost.find("#form-id").val(formId);
      modalPost.find("#form-message").val("");
      modalPost.find("#modal-type").html(type);
      return modalPost.modal("show");
    };
    $("#nav-publish").click(function() {
      return showModal("", "Post");
    });
    $(document).on("click", "a.btn-reply", function() {
      return showModal($(this).data("id"), "Reply");
    });
    return modalPost.find("#btn-publish").click(function() {
      var board, id, message, postId;
      postId = modalPost.find("#form-id").val();
      message = $("#form-message").val();
      if (typeof postId !== "undefined" && !isNaN(parseInt(postId))) {
        $(".post[data-id=\"" + postId + "\"]").append("<hr />").append("<div class=\"reply\">" + message + "</div>");
      } else {
        id = new Date().getTime();
        board = $("#board");
        board.find("h1").remove();
        board.append("<div class=\"post well\"" + ("data-id=\"" + id + "\"><span>" + message + "</span>") + "<a class=\"btn btn-primary btn-reply pull-right\"" + ("data-id=\"" + id + "\">Reply</a></div>"));
      }
      return modalPost.modal("hide");
    });
  });

}).call(this);
