
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
    initialize.layout.resize();
    initialize.layout.redraw();
});

var initialize = {
    init: {
        resize: function () {

        },
        fireEventListener: function () {
            $(".sidebar-toggle").on("click", function () {
                $("#menu-toggle").prop("checked", false);
                $(".menu-toggle").removeClass("selected-menu-toggle"); // 
                console.log($(".toggle-container").position().top + $(".toggle-container").outerHeight());
                //$(".sidebar").css("position","fixed"); //.css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight());
                $(".menu-toggle").find(".material-icons").removeClass("flip");
                $(".sidebar").css("display", "");
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
            });
            $(".sort-control").find("a").on("click",function(){
                $(".sort-control>a").each(function(){
                    $(this).removeClass("active");
                });
                $(this).addClass("active");
                console.log($(this).text());
                getWeather();
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
                $(this.renderTo.id[i]).addClass(this.display[i])
                    .addClass(this.classList.getAt(i));
                $(this.renderTo.id[i]).find("div").each(function () {
                    if ($(this).hasClass("submenu")) {
                        $(this).prev().attr("aria-hidden", "false");
                        $(this).css("display", "none");
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
    layout: {
        width: $(window).width(),
        height: $(window).height(),
        scroll: function () {
            if ($(window).width() <= 768) {
                $('.sidebar').css("top", function () {
                        return $(window).scrollTop() > 0 ? "0px" : "44px";
                    });
                if ($(window).scrollTop() > 0) {
                    
                    $("#logo").fadeOut(500);
                    $("header").css("left", $(".sidebar").outerWidth())
                        .css("top", 0)
                        .css('opacity', 0)
                        .animate({ "opacity": 1 }, 1000);
                    
                } else {
                    $("#logo").fadeIn(1000);
                    $("header").css("left", $(".sidebar").outerWidth())
                                .css("top", $(".sidebar").position().top)
                                    .css('opacity', 0)
                                        .animate({ "opacity": 1 }, 1000);
                }
                $(".toggle-container").css("display", "flex")
                                            .css("z-index", 300)
                                            .css("top", function () {
                        return $(window).scrollTop() > 0 ? 0 : "44px";
                    });
                //set menu-container postion
                $(".menu-container").css("top",
                                            $(".toggle-container").position().top + $(".toggle-container").outerHeight());
                $(".main-content").css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight());
            } else {
                $(".main-content").css("top", "76px");
            }   
        },
        resize: function () {
            if ($(window).width() <= 768) {                
                $('header').hide(500);
                $(".toggle-container").css("display", "flex")
                    .css("z-index", 300)
                    .css("top", function () {
                        return $(window).scrollTop() > 0 ? 0 : "44px";
                    });
                $(".menu-container").css("z-index", 101)
                    .css("top", function () {
                        return $(window).scrollTop() > 0 ? $(".toggle-container").position().top + $(".toggle-container").outerHeight() : "";
                    });
                $(".main-content").css("top", function () {
                    return $(window).scrollTop() > 0 ? $(window).scrollTop() + $(".toggle-container").position().top + $(".toggle-container").outerHeight() : $(".toggle-container").position().top + $(".toggle-container").outerHeight();
                });
                $(".footer").css("display", function () {
                    return $(window).scrollTop() > $(window).height() / 4 ? "none" : "flex";
                });
                $('.sidebar').hide(500);
                console.log("小於768 >>window.width= " + $(window).width()); 
            }else{
                $("#logo").is(":visible")? "":$("#logo").css("display","block");
                $(".sidebar-left").is(":visible")? $(".sidebar-left").css("width","0px"):"";
                $(".sidebar-close").is(":visible")? $(".sidebar-close").addClass("hidden"):"";                
                $('.sidebar').css("top", "44px").show(500);
                $("header").css("left", "220px")
                                .css("top", "44px")
                                .css("display","block");
                $(".toggle-container").hide();
                //set main-content postion
                console.log("大於768 >>set main-content postion= " + $("header").position().top + ", "+$("header").outerHeight()); 
                $(".main-content").css("top", "76px" );
                console.log("大於768 >>window.width= " + $(window).width()); 
            }
        },
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
                $(this).toggleClass("visible");
            });          
            
            //判斷視窗大小，將header hidden，show menu bar 
            if ($(window).width() <= 768) {
                //header 消失後,計算 toggle container的高度
                // $('header').hide(500);
                //console.log("this.scrollTop= " + $(window).scrollTop());
                // $(".toggle-container").css("display", "flex")
                //     .css("z-index", 300)
                //     .css("top", function () {
                //         return $(window).scrollTop() > 0 ? 0 : "44px";
                //     }); /*.css('opacity', 0)
                                                // .animate({ "opacity": 1 }, 1000);*/
                // $(".menu-container").css("z-index", 101)
                //     .css("top", function () {
                //         return $(window).scrollTop() > 0 ? $(".toggle-container").position().top + $(".toggle-container").outerHeight() : "";
                //     });
                //     ============
                /* $(".sidebar").css("top", $(".toggle-container").position().top + $(".toggle-container").outerHeight() + 1); */ //.fadeIn(1000);
                // $(".main-content").css("margin-top", $(".toggle-container").position().top);

                // $(".footer").css("display", function () {
                //     return $(window).scrollTop() > $(window).height() / 4 ? "none" : "flex";
                // });
                // $('.sidebar').hide(500);
                /* $(".sidebar-left").css("top", function () {
                    return $(window).scrollTop() > 0 ? $(window).scrollTop() : 0;
                });
                console.log(".sidebar-left-top =" + $(".sidebar-left").position().top + $(".sidebar-left").outerHeight() + $(window).scrollTop());
 */
                //console.log("小於768 >>window.width= " + $(window).width() + ", this.toggleMenuHeight" +$(".toggle-container").outerHeight());
                // console.log("小於768 >>window.width= " + $(window).width());  
            } else {
                /* $(".header-nav").prependTo($('div.navigation'), function () {
                    $(".accordion").accordion({
                        heightStyle: "content", active: false, collapsible: true
                    });
                }); */
                //============

                
                /* $('.sidebar').show(500);
                $("header").css("left", function () {
                    return $(window).scrollTop() > 0 ? $(".sidebar").outerWidth() : "";
                }).css("top", function () {
                    return $(window).scrollTop() > 0 ? "0px" : "44px";
                }).show(500);
                //===============
                $(".toggle-container").hide();
                $(".main-content").css("margin-top", $("header").position().top );
                console.log("大於768 >>window.width= " + $(window).width());     */            
            }
        }
    }
}

function getWeather() {
    var weatherAPI = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-041?Authorization=CWB-2575FCCA-F801-48D3-9BA3-BDE7E53A9675&locationName=%E8%8A%B1%E8%93%AE%E5%B8%82&AT&startTime=2021-09-05T00:00:00&endTime=2021-09-05T03:00:00&limit=1";
    $.getJSON( weatherAPI, {
      tags: "mount rainier",
      tagmode: "any",
      format: "json"
    })
      .done(function( data ) {
        console.log(data);
        $.each( data.records.locations, function( i, item ) {
          /* $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" ); */
          /* if ( i === 3 ) {
            return false;
          } */
          console.log(item.datasetDescription);
          console.log(item["location"]);
          console.log(item["location"][0].locationName);
          console.log(item["location"][0].weatherElement.length);
          console.log(item["location"][0].weatherElement[0]);
            $.each( item["location"][0].weatherElement, function( j, weather_item ) {
                console.log(weather_item["description"]);
                console.log(item["location"][i].weatherElement[j]);
                //console.log(weather_item[j].elementName); //weatherElement
                
            });
          
        });
        //obj = JSON.parse(data);
    
      });
  }
/* 
$(".sidebar-toggle").click(function (event) {
    initialize.sidebar_left_click();
}); */
/* $(window).resize(function () {

    initialize.init.fireEventListener();
    //initialize.accordion.run();
    initialize.layout.redraw();
}); */
