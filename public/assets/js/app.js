$(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $(".scrape-articles").on("click", function(){
        $.ajax("/scrape", {
            type: "POST"
        }).then(function(data){
            reloadPage("/")
        })
    })

    $(".save-article").on("click", function(){
        var strURL = "/save/" + $(this).data("id");
        $.ajax(strURL, {
            type: "PUT"
        }).then(function(data){
            reloadPage("/")
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
            renderNotes(data.notes)
        })
    })

    function reloadPage(pageToReload) {
        $.get(pageToReload, function(data){
            console.log("page to reload")
        })
    }
    function renderNotes(notes) {

    }
});