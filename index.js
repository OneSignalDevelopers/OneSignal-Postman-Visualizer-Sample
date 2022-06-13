let response = pm.response.json();
let notifications = response.notifications;
let labels = [];

let vizData = {
    labels: labels,
    successArray: [],
    failedArray: [],
    erroredArray: [],
    convertedArray: [],
    receivedArray: [],
    title: ""
}

let index = 0;

while (labels.length <=0){
   if(notifications[index].platform_delivery_stats.safari_web_push && notifications[index].platform_delivery_stats.chrome_web_push) {
       let stats = notifications[index].platform_delivery_stats;
       console.log("stats=", stats);
       Object.entries(stats).map(stat => {

        vizData.successArray.push(stat[1].successful);
        vizData.failedArray.push(stat[1].failed);
        vizData.erroredArray.push(stat[1].errored);
        vizData.convertedArray.push(stat[1].converted);
        vizData.receivedArray.push(stat[1].received);
        vizData.title = `Notification stats for Notification Id: ${notifications[index].id}`
    })
       labels = Object.keys(stats);
       vizData.labels = labels;
   }
   index++;
}


let template = `
<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js'></script>
<canvas id="myChart" width="400" height="400"></canvas>
<script>
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Successful',
      backgroundColor: "green",
      data: [],
    }, {
      label: 'Failed',
      backgroundColor: "red",
      data: [],
    }, {
      label: 'Errored',
      backgroundColor: "black",
      data: [],
    }, {
      label: 'Converted',
      backgroundColor: "blue",
      data: [],
    }, {
      label: 'Received',
      backgroundColor: "pink",
      data: [],
    }],
  },
options: {
    title: {
        display: true,
        text: 'Notifications'
    },
    tooltips: {
      displayColors: true,
      callbacks:{
        mode: 'x',
      },
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: 'linear',
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
  }
});

pm.getData((err, value)=> {
    myChart.data.labels = value.labels;
    myChart.data.datasets[0].data = value.successArray;
    myChart.data.datasets[1].data = value.failedArray;
    myChart.data.datasets[2].data = value.erroredArray;
    myChart.data.datasets[3].data = value.convertedArray;
    myChart.data.datasets[4].data = value.receivedArray;
    myChart.options.title.text = value.title;
    myChart.update();
})
</script>
`;

pm.visualizer.set(template, vizData)