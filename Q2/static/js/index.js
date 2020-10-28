
// Time Chart Data
var date_time = ['Tue 11', '1 AM', '2 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
    '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM',
    '10 PM', '11 PM', 'Web 12'];

// Trolley 1 & 2 Data
var trolley_1_data = []
var trolley_2_data = []


var max_temp = 0
var min_temp = 30
var max_temp_tr = ''
var min_temp_tr = ''
var today_date = 'Monday, 2020-10-26'


function import_data() {
    var ctx = document.getElementById('myChart');

    // Chart Object
    var myChart = new Chart(ctx, {
        type: 'line', // specify the type of chart needed!
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

// jQery & AJAX : GET Data from Server 
$(document).ready(function () {
    $.get("/api/v1/get_chart_data?date=2020-10-26", function (data, status) {

        // Process JSON Data for Create Chart in Chart.js
        for (x in data) {
            let name = data[x]['name']
            let tempp = data[x]['temp']

            if (name == 'trolley1') {
                let temp = parseInt(tempp);
                if (temp >= max_temp) {
                    max_temp = temp;
                    max_temp_tr = 'trolley1'
                }

                if (temp <= min_temp) {
                    min_temp = temp;
                    min_temp_tr = 'trolley2'
                }

                trolley_1_data.push(tempp);
            } else if (name == 'trolley2') {
                let temp = parseInt(tempp);
                if (temp >= max_temp) {
                    max_temp = temp;
                    max_temp_tr = 'trolley1'
                }

                if (temp <= min_temp) {
                    min_temp = temp;
                    min_temp_tr = 'trolley2'
                }

                trolley_2_data.push(tempp);
            }

        }
        // Hide Loader
        $(".loader").hide();

        // Import Data to Chart
        import_data();

        // Update Right DataChart With real Data
        $("#max_temp").innerHTML = max_temp + " (" + max_temp_tr + ")"
        $("min_temp").innerHTML = min_temp + " (" + min_temp_tr + ")"
        $("today_date_id").innerHTML = today_date
    });
});
