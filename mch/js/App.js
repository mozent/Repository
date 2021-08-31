
$(document).ready(function () {
    (function () {
        //set  Accordion to render id
        $(".sidebar-menu").attr("id", "accordion");
        //clone header children to BottomBar Menu
        var _accordion2 = "<div id='accordion_menu'></div>";
        $(_accordion2).prependTo(".menu-container");
        $('div.navigation>.header-nav').clone().appendTo($("#accordion_menu"));

    })();
    initialize.init.fireEventListener();
    initialize.accordion.run();
    initialize.layout.redraw();
});

var initialize = {
    init: {
        resize: function () {
            /* $(".sidebar-menu").attr("id","accordion");
            //clone header children to BottomBar Menu
            var _accordion2 = "<div id='accordion_menu'></div>";
            $(_accordion2).prependTo(".menu-container");
            $('div.navigation>.header-nav').clone().appendTo($("#accordion_menu"));
            $(".sidebar-toggle").on("click",function(){
                $("#menu-toggle").prop("checked",false);
                $(".menu-toggle").removeClass("selected-menu-toggle"); // 
                console.log($(".toggle-container").position().top + $(".toggle-container").outerHeight());
                //$(".sidebar").css("position","fixed"); //.css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight());
            });
            $(".menu-toggle").on("click",function(){
                $(this).toggleClass("selected-menu-toggle");
                $("#sidebar-toggle").prop("checked",false);

            }); */

            console.log("resize........")
        },
        fireEventListener: function () {
            $(".sidebar-toggle").on("click", function () {
                $("#menu-toggle").prop("checked", false);
                $(".menu-toggle").removeClass("selected-menu-toggle"); // 
                console.log($(".toggle-container").position().top + $(".toggle-container").outerHeight());
                //$(".sidebar").css("position","fixed"); //.css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight());
                $(".menu-toggle").find(".material-icons").removeClass("flip");
                $(".sidebar").css("display", "");
                /* $("#accordion").find("div").each(function () {
                    if ($(this).hasClass("submenu")) {
                        $(this).css("display", "flex");
                    }
                }); */
                sidebar_left_click();
            });
            $(".sidebar-left").on("click",function (event) {
                sidebar_left_click();
            });
            $(".sidebar-close>h3").on("click",function (event) {
                sidebar_left_click();
            });

            $(".menu-toggle").on("click", function () {
                $(this).toggleClass("selected-menu-toggle");
                $("#sidebar-toggle").prop("checked", false);
                $(this).find(".material-icons").toggleClass("flip");
                /* $("#accordion_menu").find("div").each(function () {
                    if ($(this).hasClass("submenu")) {
                        $(this).css("display", "flex");
                    }
                }); */
            });
            sidebar_left_click = function () {
                $(".sidebar-left").each( function () {
                    if ($(this).width() > 0) {
                        $('.sidebar').addClass("hidden");
                        $('.sidebar-close').addClass("hidden");
                        $(this).removeAttr("style");
                    } else {
                        $('.sidebar').removeClass("hidden");
                        $('.sidebar-close').removeClass("hidden");
                        $(this).css("width","100%");
                    }
                    console.log("sidebar_left ="+ $(this).width());
                });
                
            }

            /* $(".menu-container-close").on("click",function(){
                $(".menu-container").toggleClass("hidden");
            }); */
        },
    },
    accordion: {
        renderTo: {
            id: new Array("#accordion", "#accordion_menu")
        },
        display: new Array("visible", "visible"),
        classList: {
            classes: new Array("AAA", "BBB"),
            getAt: function (index) {
                return this.classes[index];
            }
        },
        run: function () {
            //menu > accordion
            for (var i = 0; i < this.renderTo.id.length; i++) {
                console.log(this.renderTo.id[i])
                $(this.renderTo.id[i]).addClass(this.display[i])
                    .addClass(this.classList.getAt(i));
                $(this.renderTo.id[i]).find("div").each(function () {
                    if ($(this).hasClass("submenu")) {
                        $(this).prev().attr("aria-hidden", "false");
                        $(this).css("display", "none");
                        //$(this).removeAttr("style");
                        //$(this).css("display", "flex")
                        //.css("visibility", "visible");
                        //.css("height", $(this).outerHeight())

                        //console.log($(this).outerHeight());
                        //$(this).css("display", "none");
                        //if ($(this).outerHeight()>0)
                        //console.log(this.renderTo.id[i] + "=" +$(this).outerHeight())
                    } else {
                        //aria-hidden :true 隱藏(不開啟)子項目
                        $(this).prev().attr("aria-hidden", "true");
                        $(this).css("display", "none");
                    }
                });
                $(this.renderTo.id[i]).accordion({
                    heightStyle: "content", active: false, collapsible: true
                });
                console.log(this.renderTo.id[i]);
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
    layout: {
        width: $(window).width(),
        height: $(window).height(),
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
                //console.log($(this).position().left + "px");
                $(this).toggleClass("visible");
            });

            //set menu-container postion
            $(".menu-container").css("top",
                $(".toggle-container").position().bottom);
            //判斷視窗大小，將header hidden，show menu bar 
            if (this.width <= 768) {
                //header 消失後,計算 toggle container的高度
                $('header').hide(500);
                //console.log("this.scrollTop= " + $(window).scrollTop());
                $(".toggle-container").css("display", "flex")
                    .css("z-index", 300)
                    .css("top", function () {
                        return $(window).scrollTop() > 0 ? 0 : "44px";
                    }); /*.css('opacity', 0)
                                                .animate({ "opacity": 1 }, 1000);*/
                $(".menu-container").css("z-index", 101)
                    .css("top", function () {
                        return $(window).scrollTop() > 0 ? $(".toggle-container").position().top + $(".toggle-container").outerHeight() : "";
                    });
                //     ============
                /* $(".sidebar").css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight() + 1); */ //.fadeIn(1000);
                $(".main").css("margin-top", $(".toggle-container").position().top + $(".toggle-container").outerHeight() + 1);

                $(".footer").css("display", function () {
                    return $(window).scrollTop() > $(window).height() / 4 ? "none" : "flex";
                });
                /* $(".sidebar-left").css("top", function () {
                    return $(window).scrollTop() > 0 ? $(window).scrollTop() : 0;
                });
                console.log(".sidebar-left-top =" + $(".sidebar-left").position().top + $(".sidebar-left").outerHeight() + $(window).scrollTop());
 */
                //console.log("小於768 >>window.width= " + this.width + ", this.toggleMenuHeight" +$(".toggle-container").outerHeight());
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
                //console.log("大於768 >>window.width= " + this.width);                
            }
        }
    }
}
/* 
$(".sidebar-toggle").click(function (event) {
    initialize.sidebar_left_click();
}); */
$(window).resize(function () {
    initialize.init.fireEventListener();
    initialize.accordion.run();
    initialize.layout.redraw();
});
