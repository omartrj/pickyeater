$(document).on("dblclick", "input[list]", function (event) {
  event.preventDefault();
  var str = $(this).val();
  $("div[list=" + $(this).attr("list") + "] span").each(function (k, obj) {
    if ($(this).html().toLowerCase().indexOf(str.toLowerCase()) < 0) {
      $(this).hide();
    }
  });
  $("div[list=" + $(this).attr("list") + "]").toggle(100);
  $(this).focus();
});

$(document).on("blur", "input[list]", function (event) {
  event.preventDefault();
  var list = $(this).attr("list");
  setTimeout(function () {
    $("div[list=" + list + "]").hide(100);
  }, 100);
});

$(document).on("click", "div[list] span", function (event) {
  event.preventDefault();
  var list = $(this).parent().attr("list");
  var item = $(this).html();
  $("input[list=" + list + "]").val("");
  var ingredient = $(
    '<div class="ingredient" style="display:none"><span>\u00d7</span><span>' +
      item +
      "</span></div>"
  );
  $("#selected-ingredients").prepend(ingredient);
  ingredient.show(200);
  $("div[list=" + list + "]").hide(100);
});

$(document).on("keyup", "input[list]", function (event) {
  event.preventDefault();
  var list = $(this).attr("list");
  var divList = $("div[list=" + $(this).attr("list") + "]");
  if (event.which == 27) {
    // esc
    $(divList).hide(200);
    $(this).focus();
  } else if (event.which == 13) {
    // enter
    if ($("div[list=" + list + "] span:visible").length == 1) {
      var item = $("div[list=" + list + "] span:visible").html();
      $("input[list=" + list + "]").val("");
      var ingredient = $(
        '<div class="ingredient" style="display:none"><span>\u00d7</span><span>' +
          item +
          "</span></div>"
      );
      $("#selected-ingredients").prepend(ingredient);
      ingredient.show(200);
      $("div[list=" + list + "]").hide(100);
    }
  } else if (event.which == 9) {
    // tab
    $("div[list]").hide();
  } else {
    $("div[list=" + list + "]").show(100);
    var str = $(this).val();
    $("div[list=" + $(this).attr("list") + "] span").each(function () {
      if ($(this).html().toLowerCase().indexOf(str.toLowerCase()) < 0) {
        $(this).hide(200);
      } else {
        $(this).show(200);
      }
    });
  }
});

$(function () {
  $(".favorite").click(function () {
    $(this).toggleClass("animate");
  });
});

$(document).on("click", ".ingredient span:nth-child(1)", function (event) {
  event.preventDefault();
  $(this).parent().hide(200);
});

$(document).on("click", ".ingredient span:nth-child(2)", function (event) {
  event.preventDefault();
  $(this).parent().toggleClass("priority");
});

$(document).on("click", "#menu-btn", function (event) {
  event.preventDefault();
  document.location = "index.html";
});

$(document).ready(function() {
  $.getJSON('js/data/ingredients.json', function(data) {
    for (let i = 0; i < data.length - 1; i++) {
      $('#ingredient-list').append('<span>'+ data[i] +'</span>')
    }
  })
})
