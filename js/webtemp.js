  // set your channel id here
  var channel_id = 2002572;
  // set your channel's read api key here if necessary
  var api_key = 'CIJQHP6H5ZE41YZQ';
  // maximum value for the gauge
  var max_gauge_value = 1023;
  // name of the gauge
  var gauge_name = 'Temperatuur';

  // global variables
  var chart, charts, data;

  // load the google gauge visualization
  google.load('visualization', '1', {packages:['gauge']});
  google.setOnLoadCallback(initChart);

  // display the data
  function displayData(point)
  {
    data.setValue(0, 0, gauge_name);
    data.setValue(0, 1, point);
    chart.draw(data, options);
  }

  // load the data
  function loadData()
  {
    //var request = new XMLHttpRequest();
	//request.open('GET', 'https://api.thingspeak.com/channels/2002572/feeds.json?api_key=CIJQHP6H5ZE41YZQ&results=1', true);
	//request.onload = function getStuff()
	//request.send();
	
	// variables for the data point
    var data, dateStr, temperature, date, time;

    // get the data from thingspeak
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(data) {

      console.log(data);
      // get the data point
      temperature = parseFloat(data.field1);
      temperature = Math.round(temperature * 10) / 10;
      
      //temperature = temperature.substring(0, 4);
      dateStr = data.field2;
      date = dateStr.substring(0, 10);
      time = dateStr.substring(11);
      
      console.log("Temperature: %.1f°C Kuupäev: %s Kellaaeg: %s", temperature, date, time);
      
      // if there is a data point display it
      //if (temperature) {
        //  p = Math.round((p / max_gauge_value) * 100);
        displayData(temperature);
      //}

    });
  }

  // initialize the chart
  function initChart()
  {

    data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');
    data.addRows(1);

    chart = new google.visualization.Gauge(document.getElementById('gauge_div'));
    options = {
      width: 500, height: 500, min: -20, max: 30,
      majorTicks: [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30], minorTicks: 5,
      
	  greenFrom: -5,
      greenTo: 20,
      greenColor: "#00e600",    
      yellowFrom: 20,
      yellowTo: 25,
      yellowColor: "#ff751a",
      redFrom: 25,
      redTo: 30,
      redColor: "#FF0000"
    };
      
               
    loadData();

    // load new data every 15 seconds
    setInterval('loadData()', 15000);
  }
  
