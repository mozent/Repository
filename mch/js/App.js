
$(document).ready(function () {
    (function () {
        //clone header children to sideBar Menu
        //$(".notes-menu").find("h3").each(function () {
        //    if ($(this).hasClass("header-nav")) {
        //        return false;
        //    } else {
        $('div.navigation>.header-nav').clone().appendTo($(".notes-menu"));
        console.log("clone...")
        //   }
        //});
    })();
    //initialize();
    initialize.set_menu();
    initialize.win_size();
    initialize.accordion();
    initialize.reDraw_element();
    console.log("clone..."+initialize.class[0]);
    console.log("clone..."+initialize.list.listchild[0]);
    console.log("clone..."+initialize.list.listchild2[0]);
    console.log(initialize.list.listchild3());
});

var initialize = {
    class: new Array(999,2),
    list: {
        listchild : new Array(8899,7654),
        listchild2 : new Array("AAAA",7654),
        listchild3 : function () { 
            
            return new Array("BBBBB",12456);
        }
    },
    accordion : function () {
        //submenu > accordion    
        $(".accordion").accordion({
            heightStyle: "content", active: false, collapsible: true
        });
        $(".accordion").find("div").each(function () {
            if ($(this).hasClass("submenu")) {
                $(this).prev().attr("aria-hidden", "false");
                $(this).removeAttr("style");
                $(this).css("display", "flex")
                    .css("visibility", "visible")
                    .css("height", $(this).outerHeight())
                    .css("display", "none");
                console.log($(this).outerHeight())
            } else {
                $(this).prev().attr("aria-hidden", "true");
                $(this).css("display", "none");
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
    },
    win_size : function () {
            //判斷視窗大小，將header移入sidebar-menu
            if ($(window).width() <= 768) {
                $('div.navigation').hide(500);
                $(".notes-menu > .header-nav").show();
                console.log("小於768 >>window.width= " + $(window).width());
            } else {
                /* $(".header-nav").prependTo($('div.navigation'), function () {
                    $(".accordion").accordion({
                        heightStyle: "content", active: false, collapsible: true
                    });
                }); */
                $('div.navigation').show(500);
                $(".notes-menu > .header-nav").hide();
                console.log("大於768 >>window.width= " + $(window).width());
                
            }
        },
    set_menu : function () {
            $('div.navigation').find('h3').hover(function () {
                if ($(this).next().hasClass("submenu")) {
                    $(this).next().addClass("show-submenu");
                    $(this).next().css('left', ($(this).position().left + 6) + "px")
                        .css('top', ($(this).position().top + $(this).outerHeight()) + "px");
                }
            }, function () {
                $(this).next().removeClass("show-submenu");
            });
            $('div.navigation').find('div.submenu').hover(function () {
                console.log($(this).position().left + "px");
                $(this).toggleClass("show-submenu");
            });
        },
    reDraw_element : function (no) {
            //設定內容位置
            $('.main-content').css("margin-top", $("header").outerHeight());
            /* this.xNo = no; */
            return no;
        }
    
}

$(window).resize(function () {
    initialize.set_menu();
    initialize.win_size();
    initialize.accordion();
    initialize.reDraw_element();
})