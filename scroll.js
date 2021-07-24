$(document).ready(function() {
    $("a.scrollto").click(function () {
      elementClick = $(this).attr("href")
      destination = $(elementClick).offset().top;
      $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 80}, 1100);
      return false;
    });
  });