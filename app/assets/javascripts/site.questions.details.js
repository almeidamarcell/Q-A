﻿function toggleQuestionComments() {
    if ($("#question-comments").is(":hidden")) {
        $("#question-comments").slideDown("slow");
        $("#show-question-comments-link").html("hide comments");
    } else {
        $("#question-comments").hide("slow");
        $("#show-question-comments-link").html("show comments");
    }
}
function toggleAnswerComments(answerId, answerCommentsUrl) {
    if ($("#answer-comments-" + answerId).is(":hidden")) {
        if ($("#comments", "#answer-comments-" + answerId).is(":empty")) {
            $("#comments", "#answer-comments-" + answerId).load(answerCommentsUrl, { answerId: answerId });
        }
        $("#answer-comments-" + answerId).slideDown("slow");
        $("#show-answer-comments-link", "#answer-" + answerId).html("hide comments");
    } else {
        $("#answer-comments-" + answerId).hide("slow");
        $("#show-answer-comments-link", "#answer-" + answerId).html("show comments");
    }
}
$("#add-answer-form").validate({
    keyup: true,
    submitHandler: function(form) {
        if (!this.wasSent) {            
            this.wasSent = true;
            $(':submit', form).val('Please wait...')
                                              .attr('disabled', 'disabled')
                                              .addClass('disabled');
            form.submit();
        } else {
            return false;
        }
    }
});
$("#subscribe-modal").dialog({ autoOpen: false, modal: true, draggable: false, resizable: false, bgiframe: true,
    title: 'Subscribe', width: 448
});
$("#subscribe-form").validate({
    rules: { email: { required: true, email: true} },
    messages: { email: { required: "Please provide email address!", email: "Email address is invalid!"} },
    keyup: true,
    submitHandler: function(form) {
        if (!this.wasSent) {
            this.wasSent = true;
            $(':submit', form).val('Please wait...')
                                          .attr('disabled', 'disabled')
                                          .addClass('disabled');
            form.submit();
        } else {
            return false;
        }
    }
});
function addComment(addCommentUrl, questionId) {
    if ($("#comment").val().length == 0) {
        alert('please provide comment text!');
        return false;
    }
    $.ajax({
        url: addCommentUrl,
        type: 'POST',
        data: { questionId: questionId, comment: $("#comment").val() },
        beforeSend: function(XMLHttpRequest) {
            $(':submit', '#question-comments')
                                              .data('prevValue', $(':submit', '#question-comments').val())
                                              .val('Please wait...')
                                              .attr('disabled', 'disabled')
                                              .addClass('disabled');
        },
        complete: function(XMLHttpRequest, textMessage) {
            $(':submit', '#question-comments')
                                              .removeAttr('disabled')
                                              .removeClass('disabled')
                                              .val($(':submit', '#question-comments').data('prevValue'));
        },
        success: function(htmlPartial) {
            $('#comments').html(htmlPartial);
            $('#comment').val('');
            $('#question-comment-count').html($('#comments > p.comment').size());
        },
        failure: function() {
            showNotification(document.getElementById('btn-add-question-comment'), data.Message);
        }
    });
}
function addAnswerComment(addCommentUrl, answerId) {
    var comment = $("#comment", "#answer-comments-" + answerId).val();
    if (comment.length == 0) {
        alert('Please provide comment text');
        return false;
    }
    $.ajax({
        url: addCommentUrl,
        type: 'POST',
        data: { answerId: answerId, comment: comment }, 
        success: function(htmlPartial) {
            $("#comments", "#answer-comments-" + answerId).html(htmlPartial);
            $("#comment", "#answer-comments-" + answerId).val('');
            $("#answer-comments-count", "#answer-" + answerId).html($("p.comment", "#answer-" + answerId).size());            
        },
        failure: function() {
            showNotification(document.getElementById('btn-add-answer-comment'), data.Message);
        },
        beforeSend: function(XMLHttpRequest) {
            $(':submit', '#answer-comments-' + answerId)
                                              .data('prevValue', $(':submit', '#answer-comments-' + answerId).val())
                                              .val('Please wait...')
                                              .attr('disabled', 'disabled')
                                              .addClass('disabled');
        },
        complete: function(XMLHttpRequest, textMessage) {
            $(':submit', '#answer-comments-' + answerId)
                                              .removeAttr('disabled')
                                              .removeClass('disabled')
                                              .val($(':submit', '#answer-comments-' + answerId).data('prevValue'));
        }
    });

}
function subscribe(postUrl, unsubscribeUrl) {
    if ($("#subscribe-form").valid()) {
        $.postJSON(postUrl, { email: $('#subscribeEmail').val() }, function(data) {
            if (data.IsSuccess) {
                if (data.IsSubscriber) {
                    $('#question-subscribe')
                            .text('unsubscribe')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() {
                                unsubscribe(unsubscribeUrl);
                                return false;
                            });
                    $("#subscribe-modal").dialog('close');
                } else {
                    $('#question-subscribe')
                            .text('subscribe')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() {
                                $("#subscribe-modal").dialog('open');
                                return false;
                            });
                }
                showInformation(document.getElementById('question-subscribe'), data.Message);
            } else {
                showNotification(document.getElementById('question-subscribe'), data.Message);
            }
        });
    }
}
function unsubscribe(postUrl) {
    $.postJSON(postUrl, null, function(data) {
        if (data.IsSuccess) {
            if (data.IsSubscriber) {
                $('#question-subscribe')
                        .text('unsubscribe')
                        .unbind('click')
                        .removeAttr('onclick')
                        .click(function() {
                            unsubscribe();
                            return false;
                        });
                $("#subscribe-modal").dialog('close');
            } else {
                $('#question-subscribe')
                        .text('subscribe')
                        .unbind('click')
                        .removeAttr('onclick')
                        .click(function() {
                            $("#subscribe-modal").dialog('open');
                            return false;
                        });
            }
            showInformation(document.getElementById('question-subscribe'), data.Message);
        } else {
            showNotification(document.getElementById('question-subscribe'), data.Message);
        }
    });
}
function reportAnswerAbuse(postUrl, cancelPostUrl, AnswerId) {
    $.postJSON(postUrl, { "AnswerId": AnswerId }, function(result) {
        if (result.IsSuccess) {
            showInformation('#answer-reportabuse-' + AnswerId, result.Message);
        } else {
            showNotification('#answer-reportabuse-' + AnswerId, result.Message);
        }
    });
}
function cancelReportAnswerAbuse(postUrl, AnswerId) {
    $.postJSON(postUrl, { "AnswerId": AnswerId }, function(result) {
        if (result.IsSuccess) {
            showInformation('#answer-reportabuse-' + AnswerId, result.Message);
        } else {
            showNotification('#answer-reportabuse-' + AnswerId, result.Message);
        }
    });
}
var voteForQuestionImg = {
    isVoted: {
        url: '/content/images/bookmark_yes.jpg',
        hover: '/content/images/bookmark_vote.jpg'
    },
    isNotVoted: {
        url: '/content/images/bookmark_not.jpg',
        hover: '/content/images/bookmark_vote.jpg'
    }
}

function VoteForQuestion(voteForUrl, cancelVoteForUrl, flashElement, objClicked){
    $.postJSON(voteForUrl, null, function(data){
        if(data.IsSuccess){
            //updating question vote count
            $('#mark-as-favourite-count').text(data.NewFavouriteVoteCount);
            $("#mark-as-favourite")
                .attr('title', 'Cancel vote for question')
                .attr('href', cancelVoteForUrl)
                .removeAttr('onclick')
                .unbind('click')
                .click(function() {
                    CancelVoteForQuestion(voteForUrl, cancelVoteForUrl, flashElement, objClicked);
                    return false;                        
                });
            $("#mark-as-favourite > img")
                .attr('src', voteForQuestionImg.isVoted.url)
                .attr('alt', 'Voted for question')
                .attr('title', 'Click to cancel vote for question')
                .hover(
                    function() {
                        $(this).attr('src', voteForQuestionImg.isVoted.hover);
                    },
                    function() {
                        $(this).attr('src', voteForQuestionImg.isVoted.url);
                    }
                )
        } else {
            showNotification(objClicked, data.Message);
        }            
    });
}
function CancelVoteForQuestion(voteForUrl, cancelVoteForUrl, flashElement, objClicked) {
    $.postJSON(cancelVoteForUrl, null, function(data) {
        if (data.IsSuccess) {
            //updating question vote count
            $('#mark-as-favourite-count').text(data.NewFavouriteVoteCount);
            $("#mark-as-favourite")
                        .attr('title', 'Vote for question')
                        .attr('href', voteForUrl)
                        .removeAttr('onclick')
                        .unbind('click')
                        .click(function() {
                            VoteForQuestion(voteForUrl, cancelVoteForUrl, flashElement, objClicked);
                            return false;
                        });
                        $("#mark-as-favourite > img")
                        .attr('src', voteForQuestionImg.isNotVoted.url)
                        .attr('alt', 'Not voted for question')
                        .attr('title', 'Click to vote for question')
                        .hover(
                            function() {
                                $(this).attr('src', voteForQuestionImg.isNotVoted.hover);
                            },
                            function() {
                                $(this).attr('src', voteForQuestionImg.isNotVoted.url);
                            }
                        )
        } else {
            showNotification(objClicked, data.Message);
        }
    });
}
function reportAbuse(reportAbuseUrl, undoReportUrl) {
    $.postJSON(reportAbuseUrl, null, function(data) {
        closeInformation();
        if (data.IsSuccess) {
            showInformation('#question-report-abuse', data.Message);
        } else {
            showNotification('#question-report-abuse', data.Message);
        }
    });
}
function cancelReportAbuse(cancelReportAbuseUrl) {
    $.postJSON(cancelReportAbuseUrl, null, function(data) {
        closeInformation();
        if (data.IsSuccess) {
            showInformation('#question-report-abuse', data.Message);
        } else {
            showNotification('#question-report-abuse', data.Message);
        }
    });
}

var voteUpImg = {
    isVoted: {
        url: '/content/images/voteup_yes.jpg',
        hover: '/content/images/voteup_vote.jpg',
        alt: 'Click to cancel your vote UP for answer'
    },
    isNotVoted: {
        url: '/content/images/voteup_no.jpg',
        hover: '/content/images/voteup_vote.jpg',
        alt: 'Click to vote UP for answer'
        
    }
}
var voteDownImg = {
    isVoted: {
        url: '/content/images/votedown_yes.jpg',
        hover: '/content/images/votedown_vote.jpg',
        alt: 'Click to cancel your vote DOWN for answer'
    },
    isNotVoted: {
        url: '/content/images/votedown_no.jpg',
        hover: '/content/images/votedown_vote.jpg',
        alt: 'Click to vote DOWN for answer'
    }
}

function voteUp(AnswerId, eventSource) {
    $.postJSON(voteUpUrl, { "AnswerId": AnswerId }, function(data) {
        if (data.IsSuccess) {
            $('#vote-up-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteUpImg.isVoted.url,
                                    alt: voteUpImg.isVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr('src', voteUpImg.isVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteUpImg.isVoted.url);
                                }
                            );
            $('#vote-up-link', '#answer-' + AnswerId + '')
                            .attr('title', 'cancel your vote Up for answer')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { cancelVoteUp(AnswerId, this); return false; });
            $('#vote-down-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteDownImg.isNotVoted.url,
                                alt: voteDownImg.isNotVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr(voteDownImg.isNotVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteDownImg.isNotVoted.url);
                                }
                            );
            $('#vote-down-link', '#answer-' + AnswerId + '')
                            .attr('title', 'vote DOWN for answer')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { voteDown(AnswerId, this); return false; });
            $('#answer-vote-count', '#answer-' + AnswerId + '').html(data.NewVoteCount);
            sortAnswers();
        } else {
            showNotification(eventSource, data.Message);
        }
    });
}

function cancelVoteUp(AnswerId, eventSource) {
    $.postJSON(cancelVoteUpUrl, { "AnswerId": AnswerId }, function(data) {
        if (data.IsSuccess) {
            $('#vote-up-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteUpImg.isNotVoted.url,
                                    alt: voteUpImg.isNotVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr('src', voteUpImg.isNotVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteUpImg.isNotVoted.url);
                                }
                            );
            $('#vote-up-link', '#answer-' + AnswerId + '')
                            .attr('title', 'vote UP for answer')    
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { voteUp(AnswerId, this); return false; });
            $('#answer-vote-count', '#answer-' + AnswerId + '').html(data.NewVoteCount);
            sortAnswers();
        } else {
            showNotification(eventSource, data.Message);
        }
    });
}


function voteDown(AnswerId, eventSource) {
    $.postJSON(voteDownUrl, { "AnswerId": AnswerId }, function(data) {
        if (data.IsSuccess) {
            $('#vote-up-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteUpImg.isNotVoted.url,
                                alt: voteUpImg.isNotVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr('src', voteUpImg.isNotVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteUpImg.isNotVoted.url);
                                }
                            );
            $('#vote-up-link', '#answer-' + AnswerId + '')
                            .attr('title', 'vote UP for answer') 
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { voteUp(AnswerId, this); return false; }); ;
            $('#vote-down-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteDownImg.isVoted.url,
                                alt: voteDownImg.isVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr('src', voteDownImg.isVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteDownImg.isVoted.url);
                                }
                            );
            $('#vote-down-link', '#answer-' + AnswerId + '')
                            .attr('title', 'cancel vote DOWN for answer')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { cancelVoteDown(AnswerId, this); return false; });
            $('#answer-vote-count', '#answer-' + AnswerId + '').html(data.NewVoteCount);
            sortAnswers();
        } else {
            showNotification(eventSource, data.Message);
        }
    });
}

function cancelVoteDown(AnswerId, eventSource) {
    $.postJSON(cancelVoteDownUrl, { "AnswerId": AnswerId }, function(data) {
        if (data.IsSuccess) {
            $('#vote-down-image', '#answer-' + AnswerId + '')
                            .attr({ src: voteDownImg.isNotVoted.url,
                                alt: voteDownImg.isNotVoted.alt
                            })
                            .hover(
                                function() {
                                    $(this).attr('src', voteDownImg.isNotVoted.hover);
                                },
                                function() {
                                    $(this).attr('src', voteDownImg.isNotVoted.url);
                                }
                            );
            $('#vote-down-link', '#answer-' + AnswerId + '')
                            .attr('title', 'vote DOWN for answer')
                            .unbind('click')
                            .removeAttr('onclick')
                            .click(function() { voteDown(AnswerId, this); return false; });
            $('#answer-vote-count', '#answer-' + AnswerId + '').html(data.NewVoteCount)
            sortAnswers();
        } else {
            showNotification(eventSource, data.Message);
        }
    });
}
var acceptAnswerImg = {
    isAccepted: {
        url: '/content/images/accepted_yes.jpg',
        alt: 'accepted answer',
        hover: '/content/images/accepted_vote.jpg'
    },
    isNotAccepted: {
        url: '/content/images/accepted_not.jpg',
        alt: 'not accepted answer',
        hover: '/content/images/accepted_vote.jpg'
    }
}
function changeAnswerAcceptStatus(url, AnswerId, objClicked) {
    $.postJSON(url, null, function(data) {
        if (data.IsSuccess) {
            if (data.NewIsAccepted) {
                //resetting all currently accepted answers by removing 'accepted' css class
                $("dl[id*='answer-']").removeClass('accepted');
                //adding 'accepted' class for choosen answer
                $('#answer-' + AnswerId + '').addClass('accepted');

                $("#accepted-answer").append(
                            $('#other-answers > #answer-' + AnswerId + '').clone(true).removeAttr('style')
                        );
                $('#other-answers > #answer-' + AnswerId + '').remove();
                $('#accepted-answer .accepted-by').text('(by You)');
                $("#accepted-answer").show();
                $("#other-answers #answer-counter").text($("#other-answers > div[id*='answer-']").size());
                //inner image manipulation
                $('#accept-answer > img', '#answer-' + AnswerId + '')
                            .attr('src', acceptAnswerImg.isAccepted.url)
                            .attr('alt', acceptAnswerImg.isAccepted.alt)
                            .hover(
                                function() {
                                    if (isAuthor) {
                                        $(this).attr('src', acceptAnswerImg.isAccepted.hover);
                                    }
                                },
                                function() {
                                    $(this).attr('src', acceptAnswerImg.isAccepted.url);
                                }
                            );
            } else {
                $("#other-answers").append(
                            $("#accepted-answer > div[id*='answer-']").clone(true).removeAttr('style')
                        );
                $("#accepted-answer > div[id*='answer-']").remove();
                $("#accepted-answer").hide();
                $("#other-answers #answer-counter").text($("#other-answers > div[id*='answer-']").size());
                $('#accept-answer > img', '#answer-' + AnswerId + '')
                            .attr('src', acceptAnswerImg.isNotAccepted.url)
                            .attr('alt', acceptAnswerImg.isNotAccepted.alt)
                            .hover(
                                function() {
                                    if (isAuthor) {
                                        $(this).attr('src', acceptAnswerImg.isNotAccepted.hover);
                                    }
                                },
                                function() {
                                    $(this).attr('src', acceptAnswerImg.isNotAccepted.url);
                                }
                            );
            }
            sortAnswers();
        } else {
            showNotification(objClicked, data.Message);
        }
    });
}
function sortAnswers() {
    $("#other-answers > div[id*=answer-]").tsort("#answer-vote-count", { order: "desc" })
                .animate({ backgroundColor: "#F2FFA0" }, "slow")
                .animate({ backgroundColor: 'white' }, "normal")
                .removeAttr("style");
}
$(document).ready(function() {
    $("#inform-friend-modal").dialog({ autoOpen: false, modal: true, draggable: false, resizable: false, bgiframe: true,
        title: 'Let Your friend know about this question', width: 360, open: onInformFriendModalOpen, close: onInformFriendModalClose
    });
});
function onInformFriendModalOpen() {
    $("#inform-friend-message").hide();
    $("#inform-friend-container").show();
    $("#inform-friend").val("Send").removeAttr('disabled').removeClass('disabled');
}
function onInformFriendModalClose() {
    $("#inform-friend-message").show();
    $("#inform-friend-container").hide();
}
function informFriend(objClicked, url) {
    
    if ($("#inform-friend-form").valid()) {
        $("#inform-friend-send").val("Sending, please wait...").attr('disabled', 'disabled').addClass('disabled');

        $.postJSON(url, { friendEmail: $('#inform-friend-email').val(), message: $('#message').val() }, function(result) {
            $('#inform-friend-container').hide();
            if (result.IsSuccess) {
                $('#inform-friend-message').removeClass("error").addClass("info").html(result.Message).show();
            } else {
                $('#inform-friend-message').removeClass("info").addClass("error").html(result.Message).show();
            }

        });
    }
}
$("#inform-friend-form").validate({
    rules: { friendEmail: { required: true, email: true } },
    messages: { friendEmail: { required: "Please provide your friend's email"} },
    keyup: true,
    submitHandler: function(form) {
        if (!this.beenSubmitted) {
            this.beenSubmitted = true;
            $(':submit', form).val('Please wait...').attr('disabled', 'disabled').addClass('disabled');
            form.submit();
        } else {
            return false;
        }
    }
});
$('#mark-as-duplicate-form').validate({
    rules: { originalQuestionId: { required: true} },
    message: { originalQuestionId: { required: "Please provide original question id"} },
    submitHandler: function(form) {
        if (!this.beenSubmitted) {
            this.beenSubmitted = true;
            $(':submit', form).val('Please wait...').attr('disabled', 'disabled').addClass('disabled');
            form.submit();
        } else {
            return false;
        }
    }
});