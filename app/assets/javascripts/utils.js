function showNotification(objClicked, msg) {
    $("#notification-text").html(msg);
    $("#notification").dialog("open");
}
function closeNotification() {
    $("#notification").dialog("close");
}
function showInformation(objClicked, msg) {
    $("#notification-text").html(msg);
    $("#notification").dialog("open");
}
function closeInformation() {
    $("#notofication").dialog("close");
}
$.postJSON = function (url, data, callback) {
    if (data == null)
        data = {};
    $.post(url, data, callback, "json");
};
function gotoAnchor(anchor) {
    window.location = String(window.location).replace(/\#.*$/, "") + '#' + anchor;
};
jQuery.fn.preventDoubleSubmit = function() {
  jQuery(this).submit(function() {
    if (this.beenSubmitted)
      return false;
    else
      this.beenSubmitted = true;
  });
};
String.prototype.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}
String.prototype.endsWith = function(suffix) {
    return (this.substr(this.length - suffix.length) === suffix);
}
String.prototype.startsWith = function(prefix) {
    return (this.substr(0, prefix.length) === prefix);
}

/*
------------------ Site.master */

$(document).ready(function() {
    $("#feedback-modal").dialog({ autoOpen: false, modal: true, draggable: false, resizable: false, bgiframe: true,
        title: 'Leave Feedback', width: 448, open: onModalOpen, close: onModalClose
    });
    $("#notification").dialog({ autoOpen: false, modal: true, draggable: false, resizable: false, bgiframe: true,
        title: 'Notification', minHeight: '0', height: 'auto', width:448, closeOnEscape: true
    });
    $('#message')
        .animate({ opacity: 0.95 }, 1000)
        .slideDown("fast")
        .animate({ opacity: 0.95 }, 4000)
        .slideUp("normal");
});


function onModalOpen(){
    $("#feedback-message").hide();
    $("#feedback-container").show();
    $("#feedback-send").val("Send").removeAttr('disabled').removeClass('disabled');
}
function onModalClose(){
    $("#feedback-message").show();
    $("#feedback-container").hide();
}
function sendFeedback(objClicked, url) {
    if ($("#feedback-form").valid()) {
        $("#feedback-send").val("Sending, please wait...").attr('disabled', 'disabled').addClass('disabled');

        $.postJSON(url, { email: $('#feedback-email').val(), feedback: $('#feedback-feedback').val() }, function(result) {
            $('#feedback-container').hide();
            if (result.IsSuccess) {
                $('#feedback-message').removeClass("error").addClass("info").html(result.Message).show();
            } else {
                $('#feedback-message').removeClass("info").addClass("error").html(result.Message).show();
            }

        });
    }
}
//$("#feedback-form").validate({
//    rules: { feedback: { required: true } },
//    messages: { feedback: { required: "Please provide feedback" } },
//    keyup: true
//});
function showTip(url) {
    $.ajax({
        url: url,
        type: 'GET',
        data: { },
        success: function(htmlPartial) {
            $('#tip').html(htmlPartial);
        },
        failure: function() {
            showNotification(document.getElementById('btn-add-question-comment'), data.Message);
        }
    });
}
