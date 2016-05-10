'use strict';

(function (window) {


  window.winners = {
    onReady: function(){
      // Retrieve data
      $.getJSON('https://micropurchase.18f.gov/auctions.json').success(function(data){
        window.auctions = _.sortBy(data.auctions, 'id');

        window.winners.metrics = new Metrics(window.auctions);

        window.winners.charts = new Charts(window.auctions);

      })
      .error(function(error){
        throw "Error retrieving auction data";
      });

    }
  }

  $(document).ready(window.winners.onReady);

})(this);
