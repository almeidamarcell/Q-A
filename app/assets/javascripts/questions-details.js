
function ChangeFavouriteStatus(url, flashElement, objClicked) {
    $.getJSON(url, null, function(data) {
        if (data.IsSuccess) {
            //updating question vote count
            $('#mark-as-favourite-count').text(data.NewFavouriteVoteCount);
            //updating bookmark icons
            if (data.IsVoted) {
                $("#mark-as-favourite").attr('title', 'Cancel bookmark question')
                $("#mark-as-favourite > img")
                        .attr('src', )
                        .attr('alt', )
                        .attr('title', )
                        .hover(
                            function() {
                                $(this).attr('src', '<%= Html.ImageVoteBookmarkUrl() %>');
                            },
                            function() {
                                $(this).attr('src', '<%= Html.ImageBookmarkUrl(true) %>');
                            }
                        )
            }
            else {
                $("#mark-as-favourite").attr('title', 'Bookmark question')
                $("#mark-as-favourite > img")
                        .attr('src', '<%= Html.ImageBookmarkUrl(false) %>')
                        .attr('alt', 'Not bookmarked question')
                        .attr('title', 'Click to bookmark question')
                        .hover(
                            function() {
                                $(this).attr('src', '<%= Html.ImageVoteBookmarkUrl() %>');
                            },
                            function() {
                                $(this).attr('src', '<%= Html.ImageBookmarkUrl(false) %>');
                            }
                        )
            }
        } else {
            showNotification(objClicked, data.Message);
        }
    });
}