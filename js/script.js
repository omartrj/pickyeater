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

$(document).on('dblclick', '#searchbar input', function(event) {
  event.preventDefault();
  var str = $(this).val();
  $('#dropdown-content').show(300);
  $('#dropdown-content span').each(function() {
    txtValue = $(this).html();
    if (txtValue.toUpperCase().startsWith(str.toUpperCase())) {
      $(this).css('display', '');
    } else {
      $(this).css('display', 'none');
    }
  });
});

$(document).on('blur', '#searchbar input', function (event) {
  event.preventDefault();
  $('#dropdown-content').hide(200);
})  

$(document).on('click', '#dropdown-content span', function (event) {
  event.preventDefault();
  var item = $(this).html();
  $('#searchbar input').val('');
  var ingredient = $('<div class="ingredient" style="display:none"><span>\u00d7</span><span>' + item + "</span></div>");
  $('#selected-ingredients').prepend(ingredient);
  ingredient.show(200);
  $('#dropdown-content').hide(200);
  $('#searchbar input').val('');
  $('#searchbar input').focus();
})

$(document).on('keyup', '#searchbar input', function(event) {
  event.preventDefault();
  divContent = $('#dropdown-content');
  if (event.which == 13) {
    // enter
    if ($('#dropdown-content span:visible').length == 1) {
      var item = $('#dropdown-content span:visible').html();
      var ingredient = $('<div class="ingredient" style="display:none"><span>\u00d7</span><span>' + item + "</span></div>");
      $("#selected-ingredients").prepend(ingredient);
      ingredient.show(200);
      $('#dropdown-content').hide(200);
      $('#searchbar input').val('');
    }
  } else {
    //letter
    if ($(this).val() == '') {
      $('#dropdown-content').hide(200);
    } else {
      var str = $(this).val();
      $(divContent).show(300);
      $('#dropdown-content span').each(function() {
        txtValue = $(this).html();
        if (txtValue.toUpperCase().startsWith(str.toUpperCase())) {
          $(this).css('display', '');
        } else {
          $(this).css('display', 'none');
        }
      });
    }
  }
});

$.getJSON("js/data/ingredients.json", function (data) {
  $.each(data, function (key, val) {
    $("#dropdown-content").append(
      '<span>' + key + "</span>"
    );
  });
});


