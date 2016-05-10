'use strict';

(function (window) {

  Charts.prototype.create.chart6 = function chart6(auctions) {
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

  Charts.prototype.create.chart7 = function chart7(auctions) {
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

  Charts.prototype.load.chart6 = function chart6(settings) {
    c3.generate({
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

  Charts.prototype.load.chart7 = function chart7(settings) {
    c3.generate({
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


})(this);
