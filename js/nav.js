const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav__link');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});

$(function () {
  $(document).scroll(function () {
  var $nav = $("nav");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

$('.searchLink').click(function() {
  $('#searchDiv').toggle('slow', function() {
    // Animation complete.
  });
});