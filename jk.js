+function ($) {
    "use strict";

    // CLASS DEFINITION
    // =========================
    var Jk = function ($container, options) {
        this.$container = $container;
        this.options = options;

        this.$elements = this.$container.find(this.options.selector);
        this.keyup = $.proxy(this.keyup, this);
        this.position = 0;

        $(document).on('keyup', this.keyup);
    }; // Jk

    Jk.prototype.keyup = function(e) {
        switch (e.which) {
        case 74: // J
            return this.next();
        case 75: // K
            return this.prev();
        } // switch
    }; // Jk.keyup

    Jk.DEFAULTS = {
        selector: 'h1'
      , speed: 100
    }; // Jk.DEFAULTS

    Jk.prototype.next = function() {
        if ((this.position + 1) < this.$elements.length) {
            this.position++;
            this.scroll_to_index();
        }

        return this;
    }; // Jk.next

    Jk.prototype.prev = function() {
        if (this.position > 0) {
            this.position--;
            this.scroll_to_index();
        }

        return this;
    }; // Jk.prev

    Jk.prototype.scroll_to_index = function() {
        $('html, body').animate({
            scrollTop: $(this.$elements[this.position]).offset().top
        }, this.options.speed);
    }; // Jk.scroll_to_index

    // PLUGIN DEFINITION
    // ==========================
    var old = $.fn.jk;

    $.fn.jk = function (option) {
        return this.each(function () {
            var $this = $(this);
            var options = $.extend({}, Jk.DEFAULTS, $this.data(), typeof option == 'object' && option);

            var jk = new Jk($this, options);
        });
    }; // $.jk

    $.fn.jk.Constructor = Jk;

    // NO CONFLICT
    // ====================
    $.fn.jk.noConflict = function () {
        $.fn.jk = old;
        return this;
    }; // jk.noConflict

}(window.jQuery);
