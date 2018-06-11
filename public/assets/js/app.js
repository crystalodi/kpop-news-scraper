$(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $(".scrape-articles").on("click", function(){
        $.ajax("/scrape", {
            type: "POST"
        }).then(function(data){
            window.location.assign('/')
        })
    })

    $(".save-article").on("click", function(){
        var strURL = "/save/" + $(this).data("id");
        $.ajax(strURL, {
            type: "PUT"
        }).then(function(data){
            window.location.assign('/')
        })
    })
});