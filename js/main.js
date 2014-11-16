var aboveTablet = window.matchMedia("only screen and (min-width: 641px)");

$(document).ready(function(){

  //Media Query Dependent
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
  
  $(window).resize(function(){
    checkTablet();
  });

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

  checkTablet();
  
})
