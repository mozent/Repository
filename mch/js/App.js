
$( document ).ready(function() {
    $('ul.navigation').find('li').hover(function () {
       // console.log($(this).position().left +"px");
        $(this).find(".submenu").css('left',($(this).position().left+6) +"px")
                .css('top',($(this).position().top + $(this).outerHeight()) +"px"); 
    });
    //判斷視窗大小，將header移入sidebar-menu
    if ($( window ).width() <= 768){
        $('ul.navigation').find(".header-nav-li").prependTo($(".notes-menu"));

    }else{
        $(".header-nav-li").prependTo($('ul.navigation'));
    }
    //accordion
    $('.accordion > li').each(function(){
        var node =$(this).find("ul");
        console.log(node.outerHeight());
    });   
    $('.accordion > li').click(function() {
        /*var height = $('.accordion > li > ul.submenu').height();
        for (var i=height;height>i;i--){
            $('.accordion > li > ul.submenu').css("height",(i).toString+"px")
            console.log((i).toString+"px");
        }*/
        var node =$(this).find("ul");
        var subMenu_marginBottom = 0;
        //$('.accordion > li').find("ul").slideUp();
        $('.accordion > li').each(function(){
            $(this).css("margin-bottom",0)
                    .find("ul").removeClass("accordian-active")
                                    .css("z-index",-99)
                                    .css("visibility","hidden");
                                    // .slideUp();
                                // .removeAttr("style");
        }); //.promise().done(function(){
            //$('.accordion > li').each(function(){            
            //marginBottom += parseInt($(this).css("margin-bottom"));
            console.log(node.outerHeight());
           // node.addClass("accordian-active");
            node.parent().css("margin-bottom", node.outerHeight());       
            // node.css("top",node.parent().position().top + node.parent().outerHeight()); 
            node.css("visibility","visible");
            subMenu_marginBottom = $(node).parent().position().top + node.parent().outerHeight();
                node.css("z-index", 99).fadeIn()
                                        .css({top:subMenu_marginBottom-100,position:'absolute'})
                                        .animate({top:subMenu_marginBottom}, 800);
             /* node.slideDown('slow', function(){
                //console.log(node.parent().position().top);
                //console.log(node.parent().outerHeight()+"px");
                // node.find("ul").css("top",parseInt(node.css("top")+node.outerHeight())).css("display","flex");
                ; //.css("display","flex");
            });  */
            //return false;
        //});        
    });
});