(function (window) {
  // import microp utility object
  var microp = window.microp;

  // Global winners settings
  // used throughout winners page


  var winners = microp.winners = {
    textRotation: 60,
    scale: d3.scale.sqrt(),
    linear: d3.scale.linear(),
    selectMetric: function selectMetric (metricName) {
      return $('[data-metric][data-name="'+metricName+'"]')
    },
    setSelectorText: function setSelectorText (name, text, formatter) {
      if (formatter == "$") {
        text = microp.format.commaSeparatedDollars(text);
      } else if (formatter == '#') {
        text = Math.round(text * 10) / 10;
      } else if (formatter == 'days') {
        text = Math.round(text * 10) / 10 + ' days';
      }
      this.selectors[name].text(text);
      this.metrics[name] = text;
    },
    metrics: {}
  }

  var charts = winners.charts = {
    load: {},
    create: {}
  };

  charts.load.chart2 = function loadChart2 (settings) {
    // Chart 2
    charts.chart2 = c3.generate({
      bindto: '#chart2',
      data: {
        xs: {
          bids: 'bids_dates',
          means: 'means_dates'
        },
        columns: settings.cols,
        types: {
          bids: 'scatter'
        },
        names: {
          bids: 'Winning Bid',
          means: 'Mean Winning Bid By Date'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            multiline: false,
            fit: true,
            rotate: winners.textRotation
          },
          label: {
            text: 'Auction date',
            position: 'outer-center',
          }
        },
        y: {
          label: {
            text: 'Bid amount',
            position: 'outer-middle'
          }
        }
      },
      point: {
        r: 7
      },
      tooltip: {
        show: true,
        format: {
          value: function (value, ratio, id, index) {
            return value == null
              ? 'no bid'
              : microp.format.commaSeparatedDollars(value);

          }
        }
      }
    });
  }

  // var loadChart3 = function loadChart3 (settings) {

  //   var today = new Date();

  //   var oneMonthAgo = new Date(today - (1000 * 60 * 60 * 24 * 31)); // 30 days ago
  //   var dateExtent = [oneMonthAgo,today];

  //   charts.chart3 = c3.generate({
  //     bindto: '#chart3',
  //     data: {
  //         x: "auction_date",
  //         groups: settings.groups ? settings.groups : [
  //             ['1', '2']
  //         ],
  //         type: 'bar',
  //         columns: settings.cols ? settings.cols : [
  //           ["auction_date", "2015-03-07"],
  //           ["1",0],
  //           ["2",0]
  //         ],
  //         names: settings.names ? settings.names : {
  //             "auction_date": "D\u00e1tum",
  //             "1": "1",
  //             "2": "2"
  //         },
  //         axes: settings.axes ? settings.axes : {
  //             "auction_date": "x",
  //             "1": "y",
  //             "2": "y"
  //         }
  //     },
  //     size: {
  //       height: 400
  //     },
  //     tooltip: {
  //       format: {
  //         value: function (value, ratio, id, index) {
  //           if (value) {
  //             return value + ' bids'
  //           }
  //         }
  //       }
  //     },
  //     bar: {
  //       width: {
  //         ratio: 0.35 // this makes bar width 50% of length between ticks
  //       }
  //     },
  //     zoom: {
  //       enabled: true
  //     },
  //     point: {
  //       r: 5
  //     },
  //     subchart: {
  //       show: true,
  //       size: {
  //         height: 20
  //       }
  //     },
  //     axis: {
  //       "x": {
  //           "type": "timeseries",
  //           "extent": dateExtent,
  //           "tick": {
  //             multiline: false,
  //             fit: true
  //           }
  //       },
  //       y: {
  //         label: {
  //           text: 'Bids',
  //           position: 'outer-middle',
  //         }
  //       }
  //     }
  //   });

  // };

  charts.load.chart4 = function loadChart4 (settings) {

    var today = new Date();
    var twoWeeksAgo = new Date(today - (1000 * 60 * 60 * 24 * 14)); // 14 days ago
    var dateExtent = [twoWeeksAgo,today];

    charts.chart4 = c3.generate({
      bindto: '#chart4',
      axis: {
        x: {
          type: 'timeseries',
          label: {
            text: 'Date',
            position: 'outer-center',
          },
          tick: {
            rotate: winners.textRotation,
            multiline: false
          },
          "extent": dateExtent
        },
        y: {
          tick: {
            count: 4,
            format: function (d) { return Math.round(d); }
          },
          label: {
            text: 'Count',
            position: 'outer-middle',
          }
        }
      },
      data: {
        x: settings.x,
        columns: settings.cols,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.3 // this makes bar width 50% of length between ticks
        }
      },
      color: {
        pattern: ['#046B99','#B3EFFF','#1C304A','#00CFFF']
      },
      zoom: {
        enabled: false
      },
      subchart: {
        show: true,
        size: {
          height: 30
        }
      }
    });
  }

  charts.load.chart5 = function loadChart5 (settings) {

    charts.chart5 = c3.generate({
      bindto: '#chart5',
      axis: {
        x: {
          type: 'timeseries',
          label: {
            text: 'Auction date',
            position: 'outer-center',
          },
          tick: {
            rotate: winners.textRotation,
            multiline: false
          }
        },
        y: {
          label: {
            text: '# Bids',
            position: 'outer-middle',
          }
        }
      },
      data: {
          xs: settings.xs,
          columns: settings.cols,
          type: 'scatter'
      },
      tooltip: {
        contents: function(d) {
          return '<table class="c3-tooltip">' +
            '<tbody>' +
              '<tr>' +
                '<th colspan="1">' + microp.format.date(d[0].x, "/") + '</th>' +
                '<th class="name" colspan="1"><span style="background-color:#1C304A"></span>' + d[0].id + '</th>' +
              '</tr>' +
              '<tr class="c3-tooltip-name--'+ d[0].id + '">' +
                '<td class="name">Bids</td>' +
                '<td class="value">'+ d[0].value + '</td>' +
              '</tr>' +
              '<tr class="c3-tooltip-name--' + d[0].id + '">' +
                '<td class="name">Winning bid</td>' +
                '<td class="value">$' + settings.z[d[0].id] + '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>'
        }
      },
      legend: {
        show: false
      },
      color: {
        pattern: ['#1C304A']
      },
      point: {
        r: function(d) {
          if (settings.z[d.id] === 'undefined' || settings.z[d.id] === undefined) { return; }
          var scaledValue = winners.linear(winners.scale(settings.z[d.id]));
          return scaledValue <= 3 ? 3 : scaledValue;
        }
      }
    });

  };

  charts.load.chart6 = function loadChart6 (settings) {

    charts.chart6 = c3.generate({
      bindto: '#chart6',
      bar: {
        width: {
          ratio: 0.5
        }
      },
      padding: {
        left: 100
      },
      data: {
        x: 'x',
        columns: settings.cols,
        type: 'bar',
        color: {
          pattern: ['#046B99','#B3EFFF','#1C304A','#00CFFF']
        }
      },
      axis: {
        rotated: true,
        x: {
          type: 'category'
        },
        tick: {
          multiline: false
        }
      },
      tooltip: {
        grouped: false
      },
      legend: {
        show: false
      }
    });
  }

  charts.load.chart7 = function loadChart7 (settings) {

    charts.chart7 = c3.generate({
      bindto: '#chart7',
      bar: {
        width: {
          ratio: 0.5
        }
      },
      padding: {
        left: 100
      },
      data: {
        x: 'x',
        columns: settings.cols,
        type: 'bar',
        color: {
          pattern: ['#046B99','#B3EFFF','#1C304A','#00CFFF']
        }
      },
      axis: {
        rotated: true,
        x: {
          type: 'category'
        },
        tick: {
          multiline: false
        }
      },
      tooltip: {
        grouped: false
      },
      legend: {
        show: false
      }
    });
  }

  /* Project by repo
    * We need to have tags attached to auctions
  */
  charts.load.donut1 = function loadDonut1 (settings) {
    charts.donut1 = c3.generate({
      bindto: "#donut-by-repo",
      data: {
        columns: settings.cols ? settings.cols : [
          ['software', 0],
          ['non-software', 120],
        ],
        type : 'donut'
      },
      donut: {
        title: "Projects by repo"
      },
      color: {
        pattern: ['#1C304A','#00CFFF','#046B99','#B3EFFF']
      }
    });
  }

  /* Project by language
    * We need to have tags attached to auctions
  */
  charts.load.donut2 = function loadDonut2 (settings) {
    charts.donut2 = c3.generate({
      bindto: "#donut-by-language",
      data: {
        columns: settings.cols ? settings.cols : [
          ['software', 0],
          ['non-software', 120],
        ],
        type : 'donut'
      },
      donut: {
        title: "Projects by language"
      },
      color: {
        pattern: ['#046B99','#B3EFFF','#1C304A','#00CFFF']
      }
    });
  }

  ///////////////////////////////////////////////////////////
  // Create Charts Data (charts 2-4)
  ///////////////////////////////////////////////////////////

  // returns object { cols: [ [ ] ]}
  charts.create.chart2 = function createChartData2(auctions) {
    cols2 = [['bids_dates'], ['bids'], ['means_dates'],['means']];

    // for bids/auction
    var bidsPerAuction = [];
    //

    // for winning bids metric
    var winningBids = [];
    //

    // for unique vendors
    var uniqueBidders = [];
    //

    // for unique repos
    var repos = [];
    //

    // for unique winners
    var uniqueWinners = [];
    //

    // for auction length
    var auctionLength = [];

     _.each(auctions, function(auction){
      auction_bids = _.sortBy(auction.bids, 'created_at');

      // for unique vendors
      var bidders = _.pluck(auction.bids, 'bidder_id');
      //

      var timeDiff = new Date(auction.end_datetime) - new Date(auction.start_datetime);
      var dayUTF = 1000 * 60 * 60 * 24;

      auctionLength.push(timeDiff / dayUTF);

      // for unique winners
      // var auctionsByWinners = d3.nest()
      //   .key(function(d){ return d.amount; })
      //   .key(function(d){ return d.bidder_id; })
      //   .entries(auction_bids);
      //   console.log(auction_bids)
      // if (auctionsByWinners[0]) {
      //   var winnerId = auctionsByWinners[0].values[0].key;
      //   console.log(winnerId)
      //   uniqueWinners.push(winnerId)
      // }
      //

      var bid_amts = _.pluck(auction.bids, 'amount');
      var bidders = _.pluck(auction.bids, 'bidder_id');

      // for bids/auction
      bidsPerAuction.push(bid_amts.length);
      //

      // for unique vendors
      uniqueBidders.push(bidders);
      //

      // for unique repos
      repos.push(auction.github_repo);
      //

      bid_amts.reverse();

      last_bid = _.last(bid_amts);
      last_bidder = _.last(bidders);

      uniqueWinners.push(last_bidder)

      if(last_bid){
        cols2[0].push(microp.format.date(auction.end_datetime));
        cols2[1].push(last_bid);
      }

    });

    var pairedDates = _.zip(cols2[0],cols2[1]);
    pairedDates = _.groupBy(pairedDates, function(num){
      return num[0];
    });

    dateList = _.keys(pairedDates);
    bidList = _.values(pairedDates);

    cols2[2] = dateList;
    cols2[2][0] = "means_dates";

    _.forEach(bidList, function(bidGrouping, i) {
      if (i === 0) {
        return;
      }
      var winningBidGroup = _.map(bidGrouping, function(num) {
        return num[1];
      });

      // for winning bids metric
      winningBids.push(winningBidGroup);
      //

      var mean = d3.mean(winningBidGroup);
      cols2[3].push(mean);
    });

    // for winning bids metric
    winners.setSelectorText('$winning_bid', d3.mean(_.flatten(winningBids)), '$');
    //

    // for winning bids metric
    winners.setSelectorText('$bids', d3.mean(bidsPerAuction), '#');
    //

    // for unique vendors
    uniqueBidders = _.uniq(_.flatten(uniqueBidders)).length;
    winners.setSelectorText('$bidding_vendors', uniqueBidders);
    //

    // for unique repos
    repos = _.uniq(repos).length;
    winners.setSelectorText('$projects', repos);
    //

    // for unique repos
    uniqueWinners = _.uniq(uniqueWinners).length;

    winners.setSelectorText('$unique_winners', uniqueWinners);
    //

    // for unique repos
    auctionLength = d3.mean(auctionLength);

    winners.setSelectorText('$auction_length', auctionLength, 'days');
    //

    // for # auctions
    winners.setSelectorText('$auctions_total', auctions.length, '#');
    //

    return { cols: cols2 };
  }

  // var createChartData3 = function createChartData3(data, auctions) {
  //   cols3 = [['auction_date']],
  //   groups3 = [],
  //   axes3 = {
  //     "auction_date": "x"
  //   },
  //   names3 = {
  //     "auction_date": "Dates"
  //   }

  //   var auctionIds = _.map(auctions, function(auction){
  //     return auction.id;
  //   });

  //   var bidsByDate = _.map(data.auctions, function(auction) {
  //     return auction.bids;
  //   })

  //   bidsByDate = _.flatten(bidsByDate);


  //   bidsByDate = _.sortBy(bidsByDate, 'created_at');

  //   _.each(bidsByDate, function(bid){
  //     bid.created_at = microp.format.date(bid.created_at);
  //   })

  //   bidsByDate = _.groupBy(bidsByDate, 'created_at');
  //   var dates3 = _.keys(bidsByDate);
  //   cols3[0] = cols3[0].concat(dates3);

  //   var mappedBids = _.map(bidsByDate, function(bid, key){
  //     return d3.nest()
  //       .key(function(d) { return d.auction_id; })
  //       .rollup(function(d){ return d.length})
  //       .map(bid);
  //   });

  //   var makeCols = function(auctionIds, mappedBids) {
  //     var parentArr = [];
  //     _.each(auctionIds, function(id) {
  //       var childArr = [];
  //       childArr.push(""+id);
  //       _.each(mappedBids, function(bid){
  //         var val = bid[id] ? bid[id] : 0;
  //         childArr.push(val);
  //       })
  //       parentArr.push(childArr);
  //     })
  //     return parentArr;
  //   }

  //   var columns = makeCols(auctionIds,mappedBids);
  //   cols3 = cols3.concat(columns);

  //   _.each(auctions, function(auction){
  //     axes3[auction.id] = 'y';
  //     names3[auction.id] = ""+auction.id;
  //     groups3.push(""+auction.id);
  //   });
  //   return { cols: cols3, groups: [groups3], axes: axes3, names: names3 };
  // }

  charts.create.chart4 = function createChartData4(auctions) {
    var settings = {};
    settings.cols = [
        ['date_community'],
        ['Bidders'],
        ['Open-source projects'],
        ['Auctions']
    ];
    settings.x = 'date_community';

    _.each(auctions, function(auction){
      auction.github_repo = microp.format.stardardizeUrl(auction.github_repo);
      auction.github_repo = microp.format.removeGitPrefix(auction.github_repo);
    })

    var byGithub = d3.nest()
      .key(function(d){return microp.format.date(d.end_datetime)})
      .key(function(d){return d.github_repo})
      .entries(auctions);

    var byAuction = d3.nest()
      .key(function(d){return microp.format.date(d.end_datetime)})
      .entries(auctions);

    _.each(byGithub, function (date, key) {
      // Dates
      settings.cols[0].push(date.key);
      // Auctions
      settings.cols[2].push(date.values.length);
    });

    _.each(byAuction, function (date, key) {
      var bidders = _.map(date.values, function (auction, key) {
        var bidder_ids = _.map(auction.bids, function (bid, key) {
          return bid.bidder_id;
        });
        return bidder_ids;
      });

      var uniqueBidders = _.uniq(_.flatten(bidders)).length;

      // Projects
      settings.cols[3].push(date.values.length);
      // Bidders
      settings.cols[1].push(uniqueBidders);
    });

    return settings;
  }

  charts.create.chart5 = function createChartData5(auctions) {
    var settings = {};
    settings.cols = [];
    settings.z = {};
    settings.xs = {};

    var auctionsByEndtime = d3.nest()
      .key(function(d){
        return microp.format.date(d.end_datetime);
      })
      .key(function(d){ return d.id; })
      .entries(auctions);

    _.each(auctionsByEndtime, function(dateObj, i, list) {
      var dateString = 'date_'+ i
      settings.cols.push([dateString, dateObj.key]);
      _.each(dateObj.values, function(auction, j, list) {
        var winningBid = auction.values[0].bids.length
          ? d3.min(_.pluck(auction.values[0].bids, 'amount'))
          : undefined;
        settings.cols.push([auction.key, auction.values[0].bids.length]);
        settings.xs[auction.key] = dateString;
        settings.z[auction.key] = winningBid; // $ amount
      });
    });

    return settings;
  }

  charts.create.chart6 = function createChartData6(auctions) {
    var settings = {};
    settings.cols = [
      [ 'x' ],
      [ 'repo' ]
    ];

    _.each(auctions, function(auction){
      auction.github_repo = microp.format.stardardizeUrl(auction.github_repo);
      auction.github_repo = microp.format.removeGitPrefix(auction.github_repo);
    })


    var repos = d3.nest()
      .key(function(d){ return d.github_repo;})
      .rollup(function(d){
        return d.length
      })
      .entries(auctions)
      .sort(function(a, b) {
        return d3.descending(a.values, b.values)
      });

    _.each(repos, function(value, key) {
      settings.cols[0].push(value.key)
      settings.cols[1].push(value.values)
    });

    return settings;
  }

  charts.create.chart7 = function createChartData7(auctions) {
    var settings = {};
    settings.cols = [
      [ 'x' ],
      [ 'language' ]
    ];

    var projects = [
      {'name': '18F/fedramp-micropurchase', 'language': 'google sheets'},
      {'name': '18F/micropurchase', 'language': 'ruby'},
      {'name': '18F/openopps-platform', 'language': 'ruby'},
      {'name': '18F/playbook-in-action', 'language': 'python'},
      {'name': '18F/procurement-glossary', 'language': 'yml'},
      {'name': '18F/tock', 'language': 'python'},
      {'name': '18F/travel-form', 'language':undefined},
      {'name': '18F/deduplicate-tock-float', 'language': undefined}
    ];


    var repos = d3.nest()
      .key(function(d){ return d.language;})
      .rollup(function(d){
        return d.length
      })
      .entries(projects)
      .sort(function(a, b) {
        return d3.descending(a.values, b.values)
      });

    _.each(repos, function(value, key) {
      settings.cols[0].push(value.key)
      settings.cols[1].push(value.values)
    });

    return settings;
  }

  // Donut by repo
  charts.create.donut1 = function createDonutSettings1(auctions) {
    var settings = {};
    settings.cols = [];

    _.each(auctions, function(auction){
      auction.github_repo = microp.format.stardardizeUrl(auction.github_repo);
      auction.github_repo = microp.format.removeGitPrefix(auction.github_repo);
    })

    var repos = d3.nest()
      .key(function(d){ return d.github_repo;})
      .rollup(function(d){ return d.length })
      .map(auctions);

    settings.cols = _.map(repos, function(value, key) {
      return [key,value];
    });

    return settings;
  }

    // Donut by repo
  charts.create.donut2 = function createDonutSettings2(auctions) {
    var settings = {};
    settings.cols = [];

    var repos = [
      {'name': '18F/fedramp-micropurchase', 'language': 'google sheets'},
      {'name': '18F/micropurchase', 'language': 'ruby'},
      {'name': '18F/openopps-platform', 'language': 'ruby'},
      {'name': '18F/playbook-in-action', 'language': 'python'},
      {'name': '18F/procurement-glossary', 'language': 'yml'},
      {'name': '18F/tock', 'language': 'python'},
      {'name': '18F/travel-form', 'language':undefined},
      {'name': '18F/deduplicate-tock-float', 'language': undefined}
    ];

    repos = d3.nest()
      .key(function(d){ return d.language; })
      .rollup(function(d) {return d.length;})
      .map(repos);

    settings.cols = _.map(repos, function(value, key) {
      if ( key !== 'undefined' &&  key !== undefined) {
        return [key,value];
      } else { return []; }
    });

    return settings;
  }

  charts.settings = function setChartSettings(data) {
    var auctions = _.sortBy(data.auctions, 'id');
    // charts.settings.auctions = auctions; // can remove
    var settings = {};

    settings.chart2 = charts.create.chart2(auctions);
    // settings.chart3 = charts.create.chart3(data, auctions);
    settings.chart4 = charts.create.chart4(auctions);
    settings.chart5 = charts.create.chart5(auctions);
    settings.chart6 = charts.create.chart6(auctions);
    settings.chart7 = charts.create.chart7(auctions);
    settings.donut1 = charts.create.donut1(auctions);
    settings.donut2 = charts.create.donut2(auctions);

    return settings;
  }


  charts.run = function runVisualizations (data, settings) {
    settings = settings ? settings : setChartSettings(data);

    charts.load.chart2(settings.chart2);
    // charts.load.chart3(settings.chart3)
    charts.load.chart4(settings.chart4);
    charts.load.chart5(settings.chart5);
    charts.load.chart6(settings.chart6);
    charts.load.chart7(settings.chart7);
    charts.load.donut1(settings.donut1);
    charts.load.donut2(settings.donut2);
  };

  window.mpWinners = {};
  var mpWinners = window.mpWinners = {};


  winners.onReady = function(){

    winners.selectors = {
      $success: winners.selectMetric('success'),
      $bidding_vendors: winners.selectMetric('bidding_vendors'),
      $bids: winners.selectMetric("bids"),
      $vendors: winners.selectMetric("vendors"),
      $projects: winners.selectMetric("projects"),
      $winning_bid: winners.selectMetric("winning_bid"),
      $unique_winners: winners.selectMetric('unique_winners'),
      $auction_length: winners.selectMetric('auction_length'),
      $auctions_total: winners.selectMetric('auctions_total')
    }

    // Retrieve data
    $.getJSON('https://micropurchase.18f.gov/auctions.json').success(function(data){


      // dummy micropurchase data

      // data = {"auctions":[{"issue_url":"https://github.com/18F/tock/issues/328","github_repo":"https://github.com/18F/tock","start_price":3500,"start_datetime":"2016-03-10T18:00:00+00:00","end_datetime":"2016-03-17T18:00:00+00:00","title":"Clever title 1","description":"clever description 1","id":23,"bids":[{"bidder_id":69,"auction_id":23,"amount":3000,"created_at":"2016-03-14T16:09:49+00:00","updated_at":"2016-03-14T16:09:49+00:00","id":200,"bidder":{"github_id":"15251877","duns_number":"079859219","name":"Daniel Connery","sam_account":true,"created_at":"2016-01-05T18:43:53+00:00","updated_at":"2016-01-11T03:15:51+00:00","id":69,"github_login":null}},{"bidder_id":30,"auction_id":23,"amount":2000,"created_at":"2016-03-14T15:34:58+00:00","updated_at":"2016-03-14T15:34:58+00:00","id":195,"bidder":{"github_id":"387035","duns_number":"080033077","name":"Christian G. Warden","sam_account":true,"created_at":"2015-12-29T16:14:47+00:00","updated_at":"2016-01-11T03:15:25+00:00","id":30,"github_login":null}}],"created_at":"2016-03-08T23:54:11+00:00","updated_at":"2016-03-08T23:54:11+00:00","summary":"We want some kind of change"},{"issue_url":"https://github.com/18F/micropurchase/issues/332","github_repo":"https://github.com/18F/micropurchase","start_price":3500,"start_datetime":"2016-03-01T18:00:00+00:00","end_datetime":"2016-03-14T18:00:00+00:00","title":"clever title 2","description":"clever description 2","id":22,"bids":[{"bidder_id":30,"auction_id":22,"amount":3200,"created_at":"2016-03-14T17:59:37+00:00","updated_at":"2016-03-14T17:59:37+00:00","id":227,"bidder":{"github_id":"387035","duns_number":"080033077","name":"Christian G. Warden","sam_account":true,"created_at":"2015-12-29T16:14:47+00:00","updated_at":"2016-01-11T03:15:25+00:00","id":30,"github_login":null}}],"created_at":"2016-03-08T23:23:31+00:00","updated_at":"2016-03-08T23:23:31+00:00","summary":"We want some kind of change"},{"issue_url":"https://github.com/18F/fedramp-micropurchase/issues","github_repo":"https://github.com/18F/fedramp-micropurchase","start_price":3500,"start_datetime":"2016-03-08T18:00:00+00:00","end_datetime":"2016-03-14T18:00:00+00:00","title":"Clever title 3","description":"clever description 3","id":21,"bids":[{"bidder_id":69,"auction_id":21,"amount":3000,"created_at":"2016-03-14T16:10:36+00:00","updated_at":"2016-03-14T16:10:36+00:00","id":201,"bidder":{"github_id":"15251877","duns_number":"079859219","name":"Daniel Connery","sam_account":true,"created_at":"2016-01-05T18:43:53+00:00","updated_at":"2016-01-11T03:15:51+00:00","id":69,"github_login":null}},{"bidder_id":44,"auction_id":21,"amount":250,"created_at":"2016-03-14T07:05:19+00:00","updated_at":"2016-03-14T07:05:19+00:00","id":193,"bidder":{"github_id":"1451399","duns_number":"080014807","name":"Dan Siddoway","sam_account":true,"created_at":"2015-12-29T23:22:12+00:00","updated_at":"2016-01-29T18:07:33+00:00","id":44,"github_login":null}},{"bidder_id":18,"auction_id":21,"amount":1000,"created_at":"2016-03-11T16:07:34+00:00","updated_at":"2016-03-11T16:07:34+00:00","id":187,"bidder":{"github_id":"2124927","duns_number":"078327018","name":null,"sam_account":true,"created_at":"2015-12-19T15:32:41+00:00","updated_at":"2016-01-11T00:44:40+00:00","id":18,"github_login":null}},{"bidder_id":46,"auction_id":21,"amount":3500,"created_at":"2016-03-11T00:50:50+00:00","updated_at":"2016-03-11T00:50:50+00:00","id":184,"bidder":{"github_id":"1251540","duns_number":"079150065","name":"Kevin Fan","sam_account":true,"created_at":"2015-12-30T00:55:27+00:00","updated_at":"2016-01-11T03:15:30+00:00","id":46,"github_login":null}},{"bidder_id":148,"auction_id":21,"amount":2800,"created_at":"2016-03-11T00:24:25+00:00","updated_at":"2016-03-11T00:24:25+00:00","id":183,"bidder":{"github_id":"15351828","duns_number":"080034592","name":"Polymorphic Engineering Solutions, Inc.","sam_account":true,"created_at":"2016-02-12T01:57:50+00:00","updated_at":"2016-02-22T18:41:13+00:00","id":148,"github_login":null}}],"created_at":"2016-03-08T17:16:04+00:00","updated_at":"2016-03-08T17:16:04+00:00","summary":"We want some kind of update to our application",},{"issue_url":"https://github.com/18F/openopps-platform/issues/1236","github_repo":"https://github.com/18F/openopps-platform","start_price":3500,"start_datetime":"2016-03-01T18:00:00+00:00","end_datetime":"2016-03-04T18:00:00+00:00","title":"Some clever title 4","description":"Some clever description 4","id":18,"bids":[{"bidder_id":69,"auction_id":18,"amount":3000,"created_at":"2016-03-14T17:59:58+00:00","updated_at":"2016-03-14T17:59:58+00:00","id":238,"bidder":{"github_id":"15251877","duns_number":"079859219","name":"Daniel Connery","sam_account":true,"created_at":"2016-01-05T18:43:53+00:00","updated_at":"2016-01-11T03:15:51+00:00","id":69,"github_login":null}},{"bidder_id":30,"auction_id":18,"amount":3200,"created_at":"2016-03-14T17:59:39+00:00","updated_at":"2016-03-14T17:59:39+00:00","id":230,"bidder":{"github_id":"387035","duns_number":"080033077","name":"Christian G. Warden","sam_account":true,"created_at":"2015-12-29T16:14:47+00:00","updated_at":"2016-01-11T03:15:25+00:00","id":30,"github_login":null}},{"bidder_id":69,"auction_id":18,"amount":3200,"created_at":"2016-03-14T17:59:21+00:00","updated_at":"2016-03-14T17:59:21+00:00","id":223,"bidder":{"github_id":"15251877","duns_number":"079859219","name":"Daniel Connery","sam_account":true,"created_at":"2016-01-05T18:43:53+00:00","updated_at":"2016-01-11T03:15:51+00:00","id":69,"github_login":null}},{"bidder_id":90,"auction_id":18,"amount":3300,"created_at":"2016-03-14T17:58:52+00:00","updated_at":"2016-03-14T17:58:52+00:00","id":217,"bidder":{"github_id":"684965","duns_number":"080126095","name":"Joe Hand","sam_account":true,"created_at":"2016-01-11T18:33:42+00:00","updated_at":"2016-02-24T18:04:37+00:00","id":90,"github_login":null}},{"bidder_id":49,"auction_id":18,"amount":3100,"created_at":"2016-03-14T17:58:42+00:00","updated_at":"2016-03-14T17:58:42+00:00","id":213,"bidder":{"github_id":"688980","duns_number":"313210696","name":"Mila Frerichs","sam_account":true,"created_at":"2015-12-30T06:05:37+00:00","updated_at":"2016-01-11T03:15:33+00:00","id":49,"github_login":null}}],"created_at":"2016-03-07T22:22:58+00:00","updated_at":"2016-03-07T22:22:58+00:00","summary":"Some clever summary 4"}]}

      var settings = charts.settings(data);
      charts.run(data, settings);
    })
    .error(function(error){
      throw "Error retrieving auction data";
    });

  }

  $(document).ready(winners.onReady);

})(this);
