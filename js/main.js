var aboveTablet = window.matchMedia("only screen and (min-width: 641px)");
var aboutSlides = $('#about-slider').children();
var storySlides = [];
var workItems = [];
var timer;
var navLinks = ['Home','About','Story','Work','Contact']

function animateScroll(clickedLink){
  var target = $(clickedLink).data('target');
  $('main').moveTo(target);
}

function slider(whichSlides){
  var current = whichSlides.first();
  current.fadeIn('fast');
  var next = current.next();
  timer = setInterval(function(){
      $(next).fadeIn();
      $(current).hide();
      current = next;
      if (current[0] == whichSlides.last()[0]) {
        next = current;
        clearTimeout(timer);
      } else {
        next = current.next();
      }
    }, 3000)
}

function mobileMenu(){
  $('#mobile-menu').on('click', function(){
    $('nav ul').toggle(function(){
      $('this').slideDown();
    },function(){
      $('this').slideUp()
    });
  });

  if ($('#mobile-menu').is(":visible")) {
    $('#mobile-menu').siblings().on('click', function(){
      $('nav ul').slideUp();
    })
  }
}

function checkTablet(){
  if (aboveTablet.matches) {
    $('#mobile-menu').hide();
    $('nav ul').show();
  } else {
    //show mobile menu
    $('#mobile-menu').show();
    $('nav ul').hide();
  }
}

function sortActive(e){
  $('.active').removeClass();
  $(e).addClass('active');
}

function changeDot(){
  var dot = $('.onepage-pagination .active');
  dot.removeClass('active');
  dot.parent().next().children().addClass('active');
}

function hideAbout(){
  $('.about-slides').hide();
  clearTimeout(timer);
}

function resetVideo() {
      $('video')[0].src = 'img/story/UX_Web.mp4#t=0'
}

function showWorkName() {
  $.each($('#work .item'), function(i, e) {
     workItems.push('<p class="work-name">'+$(e).data('name')+'</p>');
  });
  $('#work .owl-page').each(function(i, e){
    $(workItems).each(function(id, el){
      if (i == id) {
        if ($(e).hasClass('active')) {
          $('#work .owl-pagination').prepend(el);
        } 
      }
    })
  })
}

function clearPagination() {
  $('.work-name').remove();
}

$(document).ready(function(){

  //Onepage-scroll settings
  $("main").onepage_scroll({
     sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
     animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
     pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
     updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
     beforeMove: function(index) {
      // reset the video when you see it
      if (index == 2) {
        $("#about-slider").trigger('owl.play', 4000)
      }

      if (index == 3) {
        resetVideo();
      }

      if (index == 4) {
        $("#work-slider").trigger('owl.play', 4000)
      }
     },  // This option accepts a callback function. The function will be called before the page moves.
     afterMove: function(index) {

      if (index != 2) {
        $("#about-slider").trigger('owl.stop', 4000)
      }

      if (index != 4) {
        $("#work-slider").trigger('owl.stop', 4000)
      }
     },   // This option accepts a callback function. The function will be called after the page moves.
     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
     keyboard: true,                  // You can activate the keyboard controls
     responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                      // the browser's width is less than 600, the fallback will kick in.
     direction: "vertical",           // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".              
  });

   $("#scroll").click(function(){
      $(".main").jumpTo($(this).data("target"));
     });

  // Animate Scroll
  $( '#primary-nav li a' ).on('click', function(e) {
    e.preventDefault();
    sortActive(this);
    animateScroll(this);
  });
  
  //Adjust to tablet on window resize
  $(window).resize(function(){
    checkTablet();
  });

  // About slider
  $("#about-slider").owlCarousel({
      items: $('.about-slides').length,
      singleItem: true,
      loop: false,
      autoplay: 2000,
      autoplayTimeout:1000,
      autoplayHoverPause:true
  });

 // Work slider
  $("#work-slider").owlCarousel({
      items: $('.work-slides').length,
      singleItem: true,
      loop: false,
      autoplay: 2000,
      autoplayTimeout:1000,
      autoplayHoverPause:true
  });

  // Opening work-detail
  $('#work .owl-item').on('click', function(){
    $('.work-detail').slideDown();
    $('.owl-pagination').fadeOut('fast');
    $('.close-window').fadeIn();
  })

  // Closing work-detail
  $('.close-window').on('click', function(e){
    e.stopPropagation();
    $('.work-detail').slideUp();
    $('#work .owl-pagination').fadeIn('fast');
    $('.close-window').fadeOut();
  })

  $('#work .owl-pagination').on('click', function(){
    clearPagination();
    showWorkName();
  })

  // Work Gallery popup modal
  $('#shambala-gallery').magnificPopup({
    items: shambalaItems,
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
  });

  $('#paperarts-gallery').magnificPopup({
    items: paperItems,
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
  });

  $('#fashionrev-gallery').magnificPopup({
    items: fashionItems,
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
  });

   $('#riskterrain-gallery').magnificPopup({
    items: riskItems,
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
  });

  
  $('.onepage-pagination li a').each(function(i, e){
      $(e).append(navLinks[i]);
  })

  mobileMenu();
  checkTablet();
  showWorkName();
  
})
