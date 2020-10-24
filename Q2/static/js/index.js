var temps = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
var date_time = ['Tue 11', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM',
    '12 PM', '2 PM', '4 PM', '6 PM', '8 AM', '10 AM', 'Web 12'
];
var trolley_1_data = [20, 24, 30, 17, 29, 15, 25, 23, 22, 21, 16, 25, 12]
var trolley_2_data = [12, 13, 14, 16, 16, 26, 27, 28, 29, 30, 30, 30, 30]

let app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        list: null
    },
    mounted() {
        axios
            .get('../api/v1/get_chart_data?date=' + '2020-08-11')
            .then(response => {
                trolley_1_data = response.data;
                console.log(response.data);
            });
    }
});


var ctx = document.getElementById('myChart');

// Chart Object
var myChart = new Chart(ctx, {
    type: 'line', // Here we need to specify the type of chart we need!
    data: {
        labels: date_time, // list of x-axis name
        datasets: [{
            label: 'trolley1',
            data: trolley_1_data,
            backgroundColor: "rgba(0, 0, 60, 0.2)",
            borderColor: "rgba(0, 0, 20, 1)",
            borderWidth: 1,
            fill: false, // to remove fill under fill color
            lineTension: 0
        }, {
            label: 'trolley2',
            data: trolley_2_data,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false, // to remove fill under fill color
            lineTension: 0
        }]
    }, //Handle Chart Options
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});