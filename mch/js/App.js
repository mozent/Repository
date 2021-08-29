
$(document).ready(function () {
    (function () {
        //set  Accordion to render id
        $(".sidebar-menu").attr("id","accordion");
        //clone header children to BottomBar Menu
        var _accordion2 = "<div id='accordion_menu'></div>";
        $(_accordion2).prependTo(".menu-container");
        $('div.navigation>.header-nav').clone().appendTo($("#accordion_menu"));
        /* $("#sidebar-toggle").prop("checked","false");
        $("#menu-toggle").prop("checked","false");
        console.log("clone..."+$("#menu-toggle").attr("checked")) */
    })();
    initialize.accordion.run();
    initialize.layout.redraw();
});

var initialize = {
    accordion : {
        renderTo : {
            id:new Array("#accordion","#accordion_menu")
        },
        display : new Array("visible","visible"),
        classList : {
            classes : new Array("AAA","BBB"),
            getAt : function (index) {
                return this.classes[index];
            }
        },        
        run : function () {
            //menu > accordion
            for(var i=0;i<this.renderTo.id.length;i++){                
                $(this.renderTo.id[i]).addClass( this.display[i] )
                                .addClass( this.classList.getAt(i) );
                $(this.renderTo.id[i]).find("div").each(function () {
                    if ($(this).hasClass("submenu")) {
                        $(this).prev().attr("aria-hidden", "false");
                        $(this).removeAttr("style");
                        $(this).css("display", "flex")
                            .css("visibility", "visible")
                            //.css("height", $(this).outerHeight())
                            .css("display", "none");
                        console.log($(this).outerHeight())
                        //if ($(this).outerHeight()>0)
                           // console.log($(this))
                    } else {
                        //aria-hidden :true 隱藏(不開啟)子項目
                        $(this).prev().attr("aria-hidden", "true");
                        $(this).css("display", "none");
                    }
                });
                $(this.renderTo.id[i]).accordion({
                    heightStyle: "content", active: false, collapsible: true
                });
                $(this.renderTo.id[i]).find("h3").on("click", function () {
                    if ($(this).attr("aria-hidden") == "false") {
                        $(this).next().removeAttr("style");
                        $(this).next().css("display", "flex");
                    } else {
                        $(this).next().css("display", "none")
                            .css("visibility", "hidden");
                    }
                });
            }            
        }
    },
    layout : {
        width: $(window).width(),
        height: $(window).height(),
        scrollTop: $(window).scrollTop(),  
        redraw: function () {
            $('div.navigation').find('h3').hover(function () {
                if ($(this).next().hasClass("submenu")) {
                    $(this).next().addClass("visible");
                    $(this).next().css('left', ($(this).position().left + 6) + "px")
                        .css('top', ($(this).position().top + $(this).outerHeight()) + "px");
                }
            }, function () {
                $(this).next().removeClass("visible");
            });
            $('div.navigation').find('div.submenu').hover(function () {
                console.log($(this).position().left + "px");
                $(this).toggleClass("visible");
            });
            //set footer
            console.log("小於768 >>window.width= " + this.width);
            $(".footer").css("top", this.height - $(".footer").outerHeight());
            //set menu-container postion
            $(".menu-container").css("top",
                        $(".toggle-container").position().bottom);
            //判斷視窗大小，將header hidden，show menu bar 
            if (this.width <= 768) {
                //
                
                //header 消失後,計算 toggle container的高度
                $('header').hide(500);
                console.log("this.scrollTop= " + this.scrollTop);
                console.log("this.scrollTop= " + $(window).scrollTop());
                $(".toggle-container").css("display","flex")
                                        .css("z-index",300)
                                        .css("top", function () {
                                                return $(window).scrollTop() > 0 ? 0 : "44px";
                                            }).css('opacity', 0)
                                                .animate({ "opacity": 1 }, 1000);
                $(".menu-container").css("z-index",101)
                                        .css("top", function () {
                                                return $(window).scrollTop() > 0 ? $(".toggle-container").position().top + $(".toggle-container").outerHeight() : "";
                                            }).css('opacity', 0)
                                                .animate({ "opacity": 1 }, 1000);
                //     ============
                
                console.log("小於768 >>window.width= " + this.width);
            } else {
                /* $(".header-nav").prependTo($('div.navigation'), function () {
                    $(".accordion").accordion({
                        heightStyle: "content", active: false, collapsible: true
                    });
                }); */
                //============
                $("header").css("left", function () {
                    return $(window).scrollTop() > 0 ? $(".sidebar").outerWidth() : "";
                }).css("top", function () {
                    return $(window).scrollTop() > 0 ? "0px" : "44px";
                }).css('opacity', 0)
                    .animate({ "opacity": 1 }, 1000);
                //===============
                $('div.navigation').show(500);
                $(".toggle-container").hide();
                console.log("大於768 >>window.width= " + this.width);                
            }
        }
    },
    reDraw_element : function (no) {
            //設定內容位置
            $('.main-content').css("margin-top", $("header").outerHeight());
            return no;
        }
    
}

$(window).resize(function () {
    initialize.accordion.run();
    initialize.layout.redraw();
    /*initialize.win_size();
    
    initialize.reDraw_element(); */
})