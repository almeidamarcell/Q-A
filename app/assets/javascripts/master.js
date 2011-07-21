﻿/*
--------------- NOTIFICATIONS */

function showNotification(objClicked, msg) {
    var div = $('<div class="modal"><h3>' + msg + '</h3>(click on this box to close)</div>');
    div.click(function(event) {
        $(".modal").fadeOut("fast", function() { $(this).remove(); });
    });
    $(objClicked).parent().append(div);
    div.fadeIn("slow");
}

function showInformation(objClicked, msg) {
    var div = $('<div class="modal-information"><h3>' + msg + '</h3>(click on this box to close)</div>');
    div.click(function(event) {
        $(".modal-information").fadeOut("fast", function() { $(this).remove(); });
    });
    $(objClicked).parent().append(div);
    div.fadeIn("slow");
}

/*
--------------- AJAX HELPERS */

$.postJSON = function(url, data, callback) {
    if (data == null)
        data = {};
    $.post(url, data, callback, "json");
};


/*
---------------- OTHER */
function gotoAnchor(anchor) {
    window.location = String(window.location).replace(/\#.*$/, "") + '#' + anchor;
}

/*
---------------- FORM SUBMITTION */
jQuery.fn.preventDoubleSubmit = function() {
  jQuery(this).submit(function() {
    if (this.beenSubmitted)
      return false;
    else
      this.beenSubmitted = true;
  });
};

