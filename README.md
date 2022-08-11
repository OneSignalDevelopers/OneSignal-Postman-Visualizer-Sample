# OneSignal-Postman-Visualizer-Sample

<p>
  <a href="https://github.com/OneSignal/onesignal-expo-plugin/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/onesignaldevs" target="_blank">
    <img alt="Twitter: onesignaldevelopers" src="https://img.shields.io/twitter/follow/onesignaldevs?style=social" />
  </a>
</p>

The project was made with the collaboration of our good friend from the [Postman DevRel team](https://twitter.com/getpostman), [@DevRelSean](https://twitter.com/DevRelSean) who invited us to join the [Postman livestream](https://www.youtube.com/watch?v=Prgff3__-mw).

This sample code shows how to add graphs to visualize the data from the [View Notifications](https://www.postman.com/onesignaldevs/workspace/onesignal-api/request/16845437-c4f3498f-fd80-4304-a6c1-a3234b923f2c) endpoint of the OneSignal API inside Postman Collections using the [Postman Visualizer](https://learning.postman.com/docs/sending-requests/visualizer/) tool.

## Requirements
- [Postman Collections Account](https://www.postman.com/collection/)
- [OneSignal Account](https://onesignal.com/)
- App with OneSignal integrated: Take a look at the [OneSignal documentation](https://documentation.onesignal.com/docs) to learn how to integrate OneSignal into your project.


### The OneSignal Postman Collection

The [OneSignal Postman Collection](https://www.postman.com/onesignaldevs/workspace/onesignal-api/overview) is a set of requests that can be used to test the OneSignal REST API. 

Fork the OneSignal Postman Collection and add your OneSignal App ID and OneSignal API Key to the collection enviroment variables.

#### OneSignal Keys
Learn how to get the OneSignal App ID and OneSignal API Key [here](https://documentation.onesignal.com/docs/accounts-and-keys).

- OneSignal REST API Key: Your OneSignal REST API Key
- OneSignal API Key: Your OneSignal API Key
- OneSignal Endpoint: https://onesignal.com/api/v1/notifications

### Postman Visualizer Code

The Postman Visualizer is a tool that can help you visualize the data from the OneSignal API.

Enter the following code inside of the **Test** tab of the Postman Collection and click `Send` to see the data from the OneSignal API.

To visualize the data, click the `Visualize` button inside the `body` tab.

```javascript
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
```

### Show Your Support

Give a :star:️ if this project helped you!

### Join the OneSignal Developers Community
The OneSignal Developer community is a group of passionate individuals who work with OneSignal products. Community members have the opportunity to expand their network and knowledge across different technologies.

* Website: https://onesignal.com/onesignal-developers
* Twitter: [@OneSignalDevs](https://twitter.com/onesignal)
* Github:  [@OneSignalDevelopers](https://github.com/OneSignal)
* Discord: [@onesignal-metabase](https://linkedin.com/company/onesignal)
