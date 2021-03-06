/*!
 * Isogrid v2.2.0
 *
 * Licensed Version 10 for open source use
 * Copyright 2016 Version 10
 */
(function (window) {
    "use strict";

    var $ = jQuery;

    Isogrid.prototype.grid = {};

    // set language
    Isogrid.prototype._lang = "en";

    Isogrid.prototype.animationScrollTop = false;

    Isogrid.prototype.isoConteneur = '[data-isogrid-container]';
    Isogrid.prototype.isoLoadMoreBtn = '[data-isogrid-load-more]';
    Isogrid.prototype.isotopeParams = {
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        stamp: '.stamp'
    };

    Isogrid.prototype.paginationOffset = 0;
    Isogrid.prototype.paginationLimit = 10;

    Isogrid.prototype.isMoreTiles = true;
    Isogrid.prototype.isNewSearch = true;
    Isogrid.prototype.ajaxRequest = null;
    Isogrid.prototype.searchDatas = {};

    Isogrid.prototype.noresult = {
        en: "<div class='isotope-item'><p>No result found</p></div>",
        fr: "<div class='isotope-item'><p>Aucun résultat n\'a été trouvé.</p></div>"
    };

    Isogrid.prototype.isoAddMethod = 'insert';

    Isogrid.prototype.ws_getItems = window.SITE_URL + '/webservices/v1/get-items';


    /**
     * Constructor
     *
     * @constructor
     */
    function Isogrid(params) {
        var params = params || {};
        for(var key in params){
            if (typeof this[key] !== "undefined") {
                this[key] = params[key];
            }
        }

        this.isotopeInit();
    }

    /**
     * Init isotope
     *
     */
    Isogrid.prototype.isotopeInit = function() {
        //console.log("ISOTOPE INIT ---------------------");
        this.grid = $(this.isoConteneur).isotope(this.isotopeParams).fadeTo(400, 1);
    };

    Isogrid.prototype.relayout = function() {
        this.grid.isotope('layout');
    };

    Isogrid.prototype.initImgLazyLoad = function () {
        this.grid.imagesLoaded().progress((instance, image) => {
            $(image.img).parents('[data-bg-loaded-container]').addClass('bg-loaded');
            this.relayout();
        });
    };

    Isogrid.prototype.addItems = function (contentHtml = this.noresult[this._lang]) {
        this.grid.isotope(this.isoAddMethod, $(contentHtml));
        this.initImgLazyLoad();
    };

    /**
     * Fetch new isotope by filter
     * @return {json} Generated content by filter
     */
    Isogrid.prototype.getIsoItems = function() {
        $(this.isoLoadMoreBtn).hide();

        if (this.isNewSearch) {
            this.paginationOffset = 0;
            this.isMoreTiles = true;

            $(this.isoLoadMoreBtn).hide();
            this.grid.isotope('remove', $( `${this.isotopeParams.itemSelector}:not(.stamp)` ));

            if(this.animationScrollTop){
                $('body').animate({ scrollTop: $(this.isoConteneur).offset().top - 190 }, 500);
            }
        }

        if (this.ajaxRequest != null) { this.ajaxRequest.abort(); }

        this.searchDatas.limit = this.paginationLimit;
        this.searchDatas.offset = this.paginationOffset;

        return this.ajaxRequest = $.ajax({
            url: this.ws_getItems,
            method: "GET",
            data: this.searchDatas
        }).done((response) => {
            this.addItems(response.html);

            if (response.isset_more_tiles) {
                $(this.isoLoadMoreBtn).fadeIn();
            }
            this.isMoreTiles = response.isset_more_tiles;

            this.paginationOffset += this.paginationLimit;
            this.isNewSearch = false;
        });
    };


    window.Isogrid = Isogrid;
})(window);
