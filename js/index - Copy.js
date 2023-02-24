$(document).ready(function(){
    var currentSelected;
    var LARGE_UP_MAIN_NAV_TRIGGER = $('[data-name=LARGE_UP_MAIN_NAV_TRIGGER]');
    var main_nav_dropdown = $(".main-nav-dropdown");
    var BLANKET = $('[data-name=BLANKET]');
    var MAIN_NAV_TRIGGER = $('[data-name=MAIN_NAV_TRIGGER]');
    var MAIN_NAV_CLOSE = $('[data-name=MAIN_NAV_CLOSE]');
    var MAIN_NAV_SUBSECTION_BACK = $('[data-name=MAIN_NAV_SUBSECTION_BACK]');
    var NAV_SUBSECTION_PARENT = 
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
        showSubCourses($(this));
    });

    $(".main-nav-dropdown__item").click(function () {
        showSubCourses($(this));
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

    function showSubCourses(el){
        $(main_nav_dropdown).addClass("has-visibile-subsection");
        var dataval = JSON.parse(el.children('a').eq(0).attr("data-detail"));
        if(dataval != undefined){
            hideSubcourse();
            currentSelected = dataval.childListId;
            $('[data-list-id='+currentSelected+']').addClass("is-selected");
            $('[data-list-id='+currentSelected+']').removeAttr("hidden");
        }
    }

});