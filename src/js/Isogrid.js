/*!
 * Isogrid v2.0.0
 *
 * Licensed Version10 for open source use
 * Copyright 2016 Version10
 */
(function (window) {
    "use strict";

    var $ = jQuery;

    Isogrid.prototype.grid = {};

    Isogrid.prototype.isoConteneur = '[data-isogrid-containeur]';
    Isogrid.prototype.isoLoadMoreBtn = '[data-isogrid-load-more]';
    Isogrid.prototype.isoItemSelector = '.isotope-item';

    Isogrid.prototype.paginationOffset = 0;
    Isogrid.prototype.paginationLimit = 10;

    Isogrid.prototype.isNewSearch = false;

    Isogrid.prototype.ajaxRequest = null;

    Isogrid.prototype.searchDatas = {};

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
        this.grid = $(this.isoConteneur).isotope({
            itemSelector: this.isoItemSelector,
            layoutMode: 'masonry',
            stamp: '.stamp'
        }).fadeTo(400, 1);
    };

    Isogrid.prototype.relayout = function() {
        $(this.isoConteneur).isotope('layout');
    };

    Isogrid.prototype.loaderImgInit = function () {
        var _this = this;

        this.grid.imagesLoaded().progress(function(instance, image) {
            $(image.img).parents('[data-bg-loaded-container]').addClass('bg-loaded');
            _this.grid.isotope('layout');
        });
    };

    /**
     * Fetch new isotope by filter
     * @return {json} Generated content by filter
     */
    Isogrid.prototype.getIsoItems = function() {
        var _this = this;

        $(this.isoLoadMoreBtn).hide();

        if (this.isNewSearch) {
            this.paginationOffset = 0;
            $(this.isoLoadMoreBtn).hide();
            $(this.isoConteneur).isotope('remove', $(this.isoItemSelector+':not(.stamp)'));
        }

        if (this.ajaxRequest != null) { this.ajaxRequest.abort(); };

        this.searchDatas.limit = this.paginationLimit;
        this.searchDatas.offset = this.paginationOffset;

        return this.ajaxRequest = $.ajax({
            url: this.ws_getItems,
            method: "GET",
            data: this.searchDatas
        }).done(function(response){
            if (_this.isNewSearch) {
                var contentHtml = (response.html != "") ? response.html : '<div class="isotope-item col-lg-4 col-sm-6 col-xs-12"><article class="p20"><h4>Aucun resultat n\'a ete trouve©.</h4></article></div>';

                $('body').animate({ scrollTop: $(_this.isoConteneur).offset().top - 190 }, 500, function() {
                    $(_this.isoConteneur).isotope('insert', $(contentHtml));
                    _this.loaderImgInit();
                });
            } else {
                $(_this.isoConteneur).isotope('insert', $(response.html));
                _this.loaderImgInit();
            }

            if (response.isset_more_tiles) {
                $(_this.isoLoadMoreBtn).fadeIn();
            }

            _this.paginationOffset += _this.paginationLimit;
            _this.isNewSearch = false;
        });
    };


    window.Isogrid = Isogrid;
}(window));

