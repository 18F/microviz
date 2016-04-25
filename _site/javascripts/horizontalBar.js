var chart = c3.generate({
    bindto: '#horizontal',
    size: {
        height: 150
    },
    bar: {
        width: 40
    },
    padding: {
        left: 60
    },
    color: {
        pattern: ['#FABF62', '#ACB6DD']
    },
    data: {
        x: 'x',
        columns:
            [
          ['x', 'Category1', 'Category2'],
          ['value', 300, 400]
          ],

        type: 'bar',

        color: function(inColor, data) {
            var colors = ['#FABF62', '#ACB6DD'];
            if(data.index !== undefined) {
                return colors[data.index];
            }

            return inColor;
        }
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        }
    },
    tooltip: {
        grouped: false
    },
    legend: {
        show: false
    }
});
