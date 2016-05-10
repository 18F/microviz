'use strict';

(function (window) {


  window.winners = {
    onReady: function(){
      // Retrieve data
      $.getJSON('https://micropurchase.18f.gov/auctions.json').success(function(data){
        var auctions = _.sortBy(data.auctions, 'id');

        window.winners.metrics = new Metrics(auctions);

        window.winners.charts = new Charts(auctions);

      })
      .error(function(error){
        throw "Error retrieving auction data";
      });

    }
  }

  $(document).ready(window.winners.onReady);

})(this);
