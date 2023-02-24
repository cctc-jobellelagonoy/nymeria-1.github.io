$(document).ready(function(){
    // TRANSLATION
    function iterateHTML(){
  
        let element =
        document.getElementsByTagName("body");
        
        for (let i = 0; i < $(element).children().length; i++) {
            // Print the current element
            let child = $(element).children()[i];
            getChild(child);
        }
    }

    function getChild(child){
        let len = $(child).children().length;

        if($(child).is("script")){
            return;
        }
        if(child != null && len > 0){
            for(let i = 0; i < len; i++){
                var current = $(child).children()[i];
                getChild(current);
            }
        }
        else{
            var text = child.textContent;
            if(!!text){
                console.log($.trim(text));
                translate(text, child);
            }
        }
    }
    

    iterateHTML();
    //console.log("btn:"+$('#btn196768').text());

    function translate(fromText, element){
        var settings = {
        "url": "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkVeAQ-cp5XR1b5JbSZi5HYJ7MEFyfnvs",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "q": fromText,
            "source": "en",
            "target": "hi"
        }),
        };

        $.ajax(settings).done(function (response) {
            //var obj = jQuery.parseJSON( response );
            var tt = response.data.translations[0].translatedText;
            console.log(tt);
            $(element).text(tt);
        });
    }
    
    // COURSES NAV
    var currentSelected;
    var LARGE_UP_MAIN_NAV_TRIGGER = $('[data-name=LARGE_UP_MAIN_NAV_TRIGGER]');
    var main_nav_dropdown = $(".main-nav-dropdown");
    var BLANKET = $('[data-name=BLANKET]');
    var MAIN_NAV_TRIGGER = $('[data-name=MAIN_NAV_TRIGGER]');
    var MAIN_NAV_CLOSE = $('[data-name=MAIN_NAV_CLOSE]');
    var MAIN_NAV_SUBSECTION_BACK = $('[data-name=MAIN_NAV_SUBSECTION_BACK]');

    $(MAIN_NAV_TRIGGER).click(function () {
        showCourses();
    });

    $(MAIN_NAV_CLOSE).click(function () {
        hideCourses();
    });

    $(MAIN_NAV_SUBSECTION_BACK).click(function () {
        hideSubcourse();
    });

    $(LARGE_UP_MAIN_NAV_TRIGGER).mouseenter(function () {
        showCourses();
    });

    $(main_nav_dropdown).mouseleave(function () {
        hideCourses();
        hideSubcourse();
    });

    $(".main-nav-dropdown__item").hover(function () {
        $(main_nav_dropdown).addClass("has-visibile-subsection");
        var a_ = $(this).children('a').eq(0);
        var dataval = JSON.parse(a_.attr("data-detail"));

        if ($(window).width() < 769) {
            
            a_.on("click", function (e) {
                e.preventDefault();
                showSubCourses(dataval);
            });
        }
        else{
            showSubCourses(dataval);
        }
    });

    function showCourses(){
        $(main_nav_dropdown).addClass("is-open");
        $("html").addClass("nav-open");
        $(BLANKET).removeClass("animate-fade-hidden");
    }

    function hideSubcourse(){
        $('[data-list-id='+currentSelected+']').removeClass("is-selected");
        $('[data-list-id='+currentSelected+']').attr("hidden", true);
    }

    function hideCourses(){
        $(main_nav_dropdown).removeClass("is-open");
        $("html").removeClass("nav-open");
        $(BLANKET).addClass("animate-fade-hidden");
        $(main_nav_dropdown).removeClass("has-visibile-subsection");
    }

    function showSubCourses(dataval){
        if(dataval != undefined){
            hideSubcourse();
            currentSelected = dataval.childListId;
            $('[data-list-id='+currentSelected+']').addClass("is-selected");
            $('[data-list-id='+currentSelected+']').removeAttr("hidden");
        }
    }

    // THE REPORT NAV
    var data_menu_dropdown_report = $('[data-menu-dropdown=report]');
    var data_menu_report = $('[data-menu=report]'); 

    $(data_menu_report).mouseenter(function () {
        data_menu_dropdown_report.addClass("animate-fade-entered");
        data_menu_dropdown_report.removeClass("animate-fade-hidden");
        BLANKET.addClass("animate-fade-entered");
        BLANKET.removeClass("animate-fade-hidden");
    });

    $(data_menu_report).mouseleave(function () {
        data_menu_dropdown_report.removeClass("animate-fade-entered");
        data_menu_dropdown_report.addClass("animate-fade-hidden");
        BLANKET.removeClass("animate-fade-entered");
        BLANKET.addClass("animate-fade-hidden");
    });

    // LISTS NAV
    var data_menu_dropdown_lists = $('[data-menu-dropdown=lists]');
    var data_menu_lists = $('[data-menu=lists]');
    var lists_show_button =  $(data_menu_lists).children("button").eq(0);
    var lists_close_button =  $(data_menu_lists).children("button").eq(1);

    var click_flag = false;
    $(data_menu_lists).click(function () {
        if(click_flag){
            data_menu_dropdown_lists.removeClass("animate-fade-entered");
            data_menu_dropdown_lists.addClass("animate-fade-hidden");
            BLANKET.removeClass("animate-fade-entered");
            BLANKET.addClass("animate-fade-hidden");
            lists_show_button.removeClass("animate-fade-hidden");
            lists_show_button.addClass("animate-fade-entered");
            lists_close_button.addClass("animate-fade-hidden");
            lists_close_button.removeClass("animate-fade-entered");
            click_flag = false;
        }
        else{
            data_menu_dropdown_lists.addClass("animate-fade-entered");
            data_menu_dropdown_lists.removeClass("animate-fade-hidden");
            BLANKET.addClass("animate-fade-entered");
            BLANKET.removeClass("animate-fade-hidden");
            lists_show_button.addClass("animate-fade-hidden");
            lists_show_button.removeClass("animate-fade-entered");
            lists_close_button.removeClass("animate-fade-hidden");
            lists_close_button.addClass("animate-fade-entered");
            click_flag = true;
        }
    });
});