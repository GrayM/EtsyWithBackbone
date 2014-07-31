///////////// MODEL //////////////


EtsyListing = Backbone.Model.extend({
    urlRoot: '/user',
    initialize: function() {
        console.log("Gathering listings...");

        this.on("invalid", function(model, error) {
            alert(error);
        });

        this.view = new ListingView({
            model: this
        });
    }

});

////////////// VIEW ///////////////


ListingView = Backbone.View.extend({
    tagName: 'div',
    className: 'listing',

    initialize: function() {

        $('body').append(this.el);
        this.render();
        this.model.view = this;
    },


    // $(this).css('Background-color', 'blue')
    // $(this).css('background-color', 'blue');
    render: function() {
        var data = _.extend({}, this.model.attributes);
        try {
            this.el.innerHTML = this.template(data);
        } catch (e) {
            console.log(e, data);
        }

    },
    template: _.template('<a href="<%= url %>"</a><ul><li><img src="<%= MainImage.url_170x135 %>"></li><li>Title: <%= title %></li><li>Listing id: <%= listing_id %></li></ul>'),
    events: {
        // 'click a': 'render'
    }
});


///////////// COLLECTION ///////////////


var EtsyListings = Backbone.Collection.extend({
    url: function() {
        return 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + this.api_key + '&callback=?' + '&includes=MainImage'
    },

    parse: function(resp, xhr) {
        return resp.results;
    },

    model: EtsyListing,
    api_key: "4a53qesm1vkbho586qara8kf",
    query: 'backbone.js tutorials'

});

Listings = new EtsyListings();
Listings.fetch({
    success: function(listings) {
        console.log(listings.toJSON());
    }
});
