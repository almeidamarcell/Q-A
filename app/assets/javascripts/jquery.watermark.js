(function($) {
    // The element that has focus (or null when nothing has focus).
    var inputFocus = null;
 
    // This keeps track of the element that has focus.
    $(":input").focus(function() {
        inputFocus = this;
    }).blur(function() {
        inputFocus = null;
    });
 
    $.fn.hasFocus = function() {
        return this.attr("id") == $(inputFocus).attr("id");
    }
})(jQuery);
 
(function($) {
    var watermarkDefaults = {
        watermarkedClass: "watermark-on",
        watermarkedText: ""
    };
 
    $.fn.watermark = function(settings) {
        settings = $.extend({}, watermarkDefaults, settings);
 
        var self = this;
 
        self.addWatermark(settings);
 
        if (self.isWatermarked(settings)) {
            settings.watermarkedText = self.val();
        }
 
        self.focus(function() {
            self.removeWatermark(settings);
        });
 
        // This might be an expensive exeucution!?
        // Added to prevent strange behaviour when the user
        // sets the focus before everything has fully loaded.
        self.keydown(function() {
            self.removeWatermark(settings);
        });
 
        self.blur(function() {
            self.addWatermark(settings);
        });
 
        // Clear the watermark text when the form is submitted.
        self.parents("form:first").submit(function() {
            self.removeWatermark(settings);
        });
    }
 
    $.fn.addWatermark = function(settings) {
        settings = $.extend({}, watermarkDefaults, settings);
 
        if (!this.hasFocus() && (this.val().length === 0 || this.val() === settings.watermarkedText)) {
            this.addClass(settings.watermarkedClass);
 
            this.val(settings.watermarkedText);
        }
    }
 
    $.fn.isWatermarked = function(settings) {
        settings = $.extend({}, watermarkDefaults, settings);
 
        return this.hasClass(settings.watermarkedClass)/* && this.val() === settings.watermarkedText*/;
    }
 
    $.fn.removeWatermark = function(settings) {
        settings = $.extend({}, watermarkDefaults, settings);
 
        if (this.isWatermarked(settings)) {
            this.removeClass(settings.watermarkedClass);
 
            this.val("");
        }
    }
})(jQuery);