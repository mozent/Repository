
$(document).ready(function () {
    $('div.navigation').find('h3').hover(function () {
        // console.log($(this).position().left +"px");
        $(this).next().css('left', ($(this).position().left + 6) + "px")
            .css('top', ($(this).position().top + $(this).outerHeight()) + "px");
    });
    //判斷視窗大小，將header移入sidebar-menu
    if ($(window).width() <= 768) {
        $('div.navigation>.header-nav').prependTo($(".notes-menu"));
        $(".accordion").accordion();
        $(".accordion").find("div").each(function () {
            if ($(this).hasClass("submenu")) {
                $(this).prev().attr("aria-hidden", "false");
            } else {
                $(this).prev().attr("aria-hidden", "true");
            }
        });
    } else {
        $(".header-nav").prependTo($('div.navigation'));
    }
    //submenu > accordion
    $( ".accordion" ).accordion({
        heightStyle: "content"
      });
    $(".accordion").find("div").each(function () {
        if ($(this).hasClass("submenu")) {
            $(this).prev().attr("aria-hidden", "false");
            $(this).removeAttr("style");
            $(this).css("display", "flex")
            .css("visibility", "visible")
            .css("height", $(this).outerHeight())         
            .css("display","none");
            console.log($(this).outerHeight())
        } else {
            $(this).prev().attr("aria-hidden", "true");
        }
    });
    $(".accordion").find("h3").on("click", function () {
        if ($(this).attr("aria-hidden") == "false") {
            $(this).next().removeAttr("style");
            $(this).next().css("display", "flex");
        } else {
             $(this).next().css("display", "none")
                            .css("visibility", "hidden");
        }
    });
    /* 
    //accordion
    $('.accordion > li').each(function(){
        var node =$(this).find("ul");
        // console.log(node.outerHeight()); 
    });   
    $('.accordion > li').click(function() {
        var node =$(this).find("ul");
        var subMenu_marginBottom = 0;
        //$('.accordion > li').find("ul").slideUp();
        $('.accordion > li').each(function(){
            $(this).css("margin-bottom",0)
                    .find("ul").removeClass("accordian-active")
                                    .css("z-index",-99)
                                    .css("visibility","hidden");
        });
            //console.log(node.outerHeight());
            node.parent().css("margin-bottom", node.outerHeight());       
            node.css("visibility","visible");
            //subMenu_marginBottom = $(node).parent().position().top + node.parent().outerHeight();
            subMenu_marginBottom = $(node).parent().offset().top + node.parent().outerHeight();
            console.log(node.parent().position().top);
            console.log(node.outerHeight());
            console.log(node.parent().offset().top);
            node.css("z-index", 99).fadeIn()
                                    .css('opacity',0)
                                        .animate({"opacity":1}, 800); 
                                        //* .css({top:subMenu_marginBottom-100,position:'absolute'})
                                        //.animate({top:subMenu_marginBottom}, 800);            
    }); */
});