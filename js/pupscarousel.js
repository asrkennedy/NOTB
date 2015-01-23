$(document).ready(function(){

    var items = [];

    var move = {
        left: function() {
            var last = items.pop();
            items.unshift(last);
            move.resetVisibility();
        },
        right: function() {
            var last = items.shift();
            items.push(last);
            move.resetVisibility();
        },
        resetVisibility: function(){
            $(".item").effect("shake");
            $(".item").hide();
            items[0].show();
        }
    };

    $(".item").each(function(){
        items.push($(this));
    });

    // $(".left_arrow").click(function(){
    //     move.left();
    // });

    $(".pagination").click(function(){
        move.right();
        console.log('yea')
    });



    // Shows the first image
    items[0].show();

});


