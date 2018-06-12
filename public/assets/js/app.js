$(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $(".scrape-articles").on("click", function(){
        $.when(
            $.get("/scrape", function(data){
                console.log(data)
            }),
            $.get("/", function(data){
                console.log(data)
            })
        ).done(function(data){
            reloadPage("/");
        })
    })
    $(".save-article").on("click", function(){
        var strURL = "/save/" + $(this).data("id");
        $.ajax(strURL, {
            type: "PUT",
            data: {
                isSaved: true
            }
        }).then(function(data){
            reloadPage("/")
        })
    })

    $(".remove-saved-article").on("click", function(){
        var strURL = "/save/" + $(this).data("id");
        $.ajax(strURL, {
            type: "PUT",
            data: {
                isSaved: false
            }
        }).then(function(data){
            reloadPage("/saved")
        })
    })

    $(".view-article-note").on("click", function(){
        var strURL = "/article/" + $(this).data("id")
        $.get(strURL, function(data){
             $("#article-id").text(data._id);
             $("#note-submit-button").attr("data-id", data._id)
             renderNotes(data.notes)
        })
    })
    $(".add-note-form").on("submit", function(e){
        e.preventDefault()
        console.log($("#note-submit-button").attr("data-id"))
        var strURL = "/newnote/" + $("#note-submit-button").attr("data-id")
        var noteParams = {
            name: $("#comment-name").val(),
            note: $("#comment-note").val()
        }
        $.post(strURL, noteParams, function(data){
            $("#comment-name").val("")
            $("#comment-note").val("")
            $('.modal').modal('close')
        })
    })

    function reloadPage(pageToReload) {
        location.href = pageToReload, true
        console.log(location.href)
       // location.reload(true)
    }
    function renderNotes(notes) {
        var notesContainer = $("#modal-notes-content")
        notesContainer.empty();
        var notesCollectionHTML = "<ul class='collection'>"
        if(notes.length === 0) {
            notesCollectionHTML += "<li class='collection-item center'>" + "No Notes Yet." + "</li>"
        } else {
            for(var i = 0; i < notes.length; i++) {
                notesCollectionHTML += "<li class='collection-item center'>" +
                "<span class='title'>" + notes[i].name + "</span><br>"
                + notes[i].note + "</li>"
            }
        }
        notesCollectionHTML += "</ul>"
        notesContainer.html(notesCollectionHTML)
    }
});