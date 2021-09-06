
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
    initialize.layout.scroller();
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
                console.log($(this).attr("href"));
                $($(this).attr("href")).find(".content").css("top",$("#explore-actions").position().top + $("#explore-actions").outerHeight()+20);
                console.log($(this).text());
                console.log($("#explore-actions").position().top + $("#explore-actions").outerHeight());
                //getWeather();
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
            
            //

            
        },
        scroller: function() {
            var counter=0;
            run = function(){  
                counter++;              
                $(".scroller_text").each(function(index){                    
                    if (counter%3 == index){                        
                        $.when($(".scroller").html($(this).find("a").clone())
                                        .css("top",$("#explore-actions").position().top + $("#explore-actions").outerHeight()).fadeIn(3500).css("z-index",10)
                                                .fadeOut(500)).done(function(){
                                                                          run();
                        });                        
                    }
                    //console.log("counter%3 = "+counter%3 + ", counter="+ counter)
                    //console.log("index="+index +", "+ $(this).text())
                });                
                //window.setTimeout(function(){ run() }, 4000);   
            }
            run();
        }
    }
}

function getWeather() {
    var at_dataTime;
    var at_temp;
    var at_measures;
    var weatherAPI = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-041?Authorization=CWB-2575FCCA-F801-48D3-9BA3-BDE7E53A9675&locationName=%E8%8A%B1%E8%93%AE%E5%B8%82&AT&startTime=2021-09-05T00:00:00&endTime=2021-09-05T03:00:00&limit=1";
    $.getJSON( weatherAPI, {
      tagmode: "any",
      format: "json"
    })
      .done(function( data ) {
        //console.log(data);
        $.each( data.records.locations, function( i, item ) {
            $.each( item["location"][0].weatherElement, function( j, weather_item ) {                
                if (weather_item["description"]!="溫度")return;
                console.log(item["location"][i].weatherElement[j]);                 
                $.each( weather_item.time, function( k, time_item ) {
                    console.log(time_item["dataTime"]);
                    at_dataTime =time_item["dataTime"];
                    console.log(time_item["elementValue"][0].measures);
                    at_measures = time_item["elementValue"][0].measures;
                    at_temp = time_item["elementValue"][0].value;
                    console.log(time_item["elementValue"][0].value);
                });                
            });          
        });
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

