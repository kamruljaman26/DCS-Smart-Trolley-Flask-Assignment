var date_time = ['Tue 11', '1 AM', '2 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
    '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', 
    '10 PM', '11 PM', 'Web 12'];
var trolley_1_data = []
var trolley_2_data = []

function import_data() {
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
}

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
                let data = response.data;
                for (x in data) {
                    let name = data[x]['name']
                    let temp = data[x]['temp']

                    if (name == 'trolley1') {
                        trolley_1_data.push(parseInt(temp));
                    } else if (name == 'trolley2') {
                        trolley_2_data.push(parseInt(temp));
                    }
                    
                }
                import_data();
            });
    }
});