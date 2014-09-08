
$ ->
  modalPost = $("#modal-post")
  showModal = (formId, type) ->
    modalPost.find("#form-id").val formId
    modalPost.find("#form-message").val ""
    modalPost.find("#modal-type").html type
    modalPost.modal "show"

  $("#nav-publish").click ->
    showModal "", "Post"

  $(document).on "click", "a.btn-reply", ->
    showModal $(this).data("id"), "Reply"

  modalPost.find("#btn-publish").click ->
    postId = modalPost.find("#form-id").val()
    message = $("#form-message").val()

    if typeof postId isnt "undefined" and not isNaN(parseInt(postId))
      $(".post[data-id=\"#{postId}\"]")
        .append("<hr />")
        .append "<div class=\"reply\">#{message}</div>"
    else
      id = new Date().getTime()
      board = $("#board")

      board.find("h1").remove()
      board.append "<div class=\"post well\"" +
      "data-id=\"#{id}\"><span>#{message}</span>" +
      "<a class=\"btn btn-primary btn-reply pull-right\"" +
      "data-id=\"#{id}\">Reply</a></div>"

    modalPost.modal "hide"
