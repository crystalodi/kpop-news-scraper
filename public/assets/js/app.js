$(function(){
    $('.button-collapse').sideNav();
    $(".scrape-articles").on("click", function(){
        $.ajax("/scrape", {
            type: "POST"
        }).then(function(data){
            window.location.href = "/"
        })
    })

    $(".save-article").on("click", function(){
        var strURL = "/save/" + $(this).data("id");
        $.ajax(strURL, {
            type: "PUT"
        }).then(function(data){
            window.location.href = "/"
        })
    })
});