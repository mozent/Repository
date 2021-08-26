
$( document ).ready(function() {
    $('ul.navigation').find('li').hover(function () {
       // console.log($(this).position().left +"px");
        $(this).find(".submenu").css('left',($(this).position().left+6) +"px")
                .css('top',($(this).position().top + $(this).outerHeight()) +"px"); 
    });
       
    /*}
     , function () {
        $(this).removeClass('hover');
    }
    ); */
});