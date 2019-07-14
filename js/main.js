$(document).ready(function() {
  var content_about = $("#content-about");
  var content_projects = $(
    "#projects-viewer-image, #projects-viewer-info, #projects-slideshow-container, #projects-header"
  );
  var content_exp = $("#content-exp1, #content-exp2");
  var content_contact = $("#content-contact1, #content-contact2");

  /*Nav Click Events*/
  $("#home-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#home").offset().top
      },
      1000
    );
  });

  $("#about-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#about").offset().top + 30
      },
      1000
    );
  });

  $("#projects-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#projects").offset().top - 50
      },
      1000
    );
  });

  $("#experience-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#experience").offset().top - 50
      },
      1000
    );
  });

  $("#contact-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#contact").offset().top - 15
      },
      1000
    );
  });

  /*Page Scroll Events*/

  var home_top = $("#home").offset().top;
  var about_top = $("#about").offset().top;
  var projects_top = $("#projects").offset().top;
  var exp_top = $("#experience").offset().top - 100;
  var contact_top = $("#contact").offset().top - 100;
  var $window = $(window);

  $window.on("scroll", function() {
    if ($window.scrollTop() >= home_top && $window.scrollTop() < 715) {
      content_about.fadeOut();
    }
    if ($window.scrollTop() >= 715 && $window.scrollTop() < 1430) {
      content_about.fadeIn();
      content_projects.fadeOut();
    }
    if ($window.scrollTop() >= 1530 && $window.scrollTop() < 2100) {
      content_projects.fadeIn();
      content_about.fadeOut();
      content_exp.fadeOut();
      content_contact.fadeOut();
    }
    if ($window.scrollTop() >= 2500 && $window.scrollTop() < 3400) {
      content_exp.fadeIn();
      content_projects.fadeOut();
      content_contact.fadeOut();
    }
    if ($window.scrollTop() >= 3800) {
      content_exp.fadeOut();
      content_contact.fadeIn();
    }

    if ($window.scrollTop() >= home_top && $window.scrollTop() < about_top) {
      $(".menu-item").removeClass("active");
      $("#home-link").addClass("active");
    }
    if (
      $window.scrollTop() >= about_top &&
      $window.scrollTop() < projects_top
    ) {
      $(".menu-item").removeClass("active");
      $("#about-link").addClass("active");
    }
    if ($window.scrollTop() >= projects_top && $window.scrollTop() < exp_top) {
      $(".menu-item").removeClass("active");
      $("#projects-link").addClass("active");
    }
    if ($window.scrollTop() >= exp_top && $window.scrollTop() < contact_top) {
      $(".menu-item").removeClass("active");
      $("#experience-link").addClass("active");
    }
    if ($window.scrollTop() >= contact_top) {
      $(".menu-item").removeClass("active");
      $("#contact-link").addClass("active");
    }
  });

  /*Carousel Events*/

  // Gallery events
  var projects = $(".project");
  var project_active = $(".project.active");
  var slideIndex = 1;
  var selected = null;
  var x = null;
  var dots = null;

  showProject(project_active);

  $(".slide").click(function() {
    var id = $(this).attr("id");
    var split = id.split("-");
    var target = "#" + split[0] + "-carousel";

    project_active = $(".project" + target);
    showProject(project_active);
  });

  function showProject(project_active) {
    $("#projects-viewer-image").empty();
    $("#projects-viewer-info").empty();

    var project_image = $(project_active).find(".project-image");
    var project_info = $(project_active).find(".project-info");

    for (var i = 0; i < projects.length; i++) {
      $(projects[i])
        .find(".project-image")
        .fadeOut();
      $(projects[i])
        .find(".project-info")
        .fadeOut();
      $(projects[i]).removeClass("active");
    }
    $(project_active).addClass("active");

    $(project_image)
      .clone()
      .appendTo("#projects-viewer-image")
      .fadeIn();
    $(project_info)
      .clone()
      .appendTo("#projects-viewer-info")
      .fadeIn();

    selected = $("#projects-viewer-image").find(".project-image");
    x = $(selected).find(".slide-image");
    dots = $(selected)
      .find(".carousel-buttons")
      .find(".item");

    for (var i = 0; i < dots.length; i++) {
      $(dots[i]).on("click", displaySlide);
    }

    $("#projects-viewer-image").fadeIn();
    $("#projects-viewer-info").fadeIn();

    showDivs(slideIndex);
  }

  // Slideshow events

  function displaySlide() {
    var n = $(this).attr("id");
    slideIndex = n;
    showDivs(n);
  }

  function showDivs(n) {
    //alert("showDiv: " + n);
    var i;
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      $(dots[i]).removeClass("active");
      $(x[i]).css("display", "none");
    }
    $(x[slideIndex - 1]).css("display", "block");
    $(dots[slideIndex - 1]).addClass("active");
  }

  var animationSpeed = 700;
  var width = "17vw";

  //Arrow events
  $("#left-arrow").click(function() {
    if ($("#projects-slides").offset().left <= 10) {
      $("#projects-slides").animate(
        { "margin-left": "+=" + width },
        animationSpeed
      );
    }
  });
  $("#right-arrow").click(function() {
    if ($("#projects-slides").offset().left >= -130) {
      $("#projects-slides").animate(
        { "margin-left": "-=" + width },
        animationSpeed
      );
    }
  });

  // Experience
  var exp_section = $(".exp-section");

  exp_section.on("click", function() {
    $(this)
      .find("ul")
      .fadeToggle();
  });
});
