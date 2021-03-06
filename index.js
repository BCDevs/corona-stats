function randomNotification(message) {
       var options = {
        body: message,
        icon: '64.png'
    }
    var notif = new Notification('Stay Home. Stay Safe.', options);
}
window.onload = function() {
  Notification.requestPermission(result => {
  if (result === 'granted') {
   randomNotification('This is Sweety, Your Health Assistant Made with 💖 by Salman.');
 }
});
}
$('#getStats').click();
$('#getCountries').click();
var date = new Date(); // Create Date object for a reference point
if(date.getHours() === 8){
getStatsNotification()
};
function getStatsNotification() {
  $.ajax({
    url:'https://corona.lmao.ninja/v2/countries/india',
    type: "get",
    data: {},
    success: function (response) {
         randomNotification(`India: Today Reported Cases: ${response.todayCases}, Deaths Today: ${response.todayDeaths}.`);
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}
function getStats() {
  $.ajax({
    url:'https://corona.lmao.ninja/v2/all',
    type: "get",
    data: {},
    success: function (response) {
                 var dateUpdated= new Date(response.updated).toUTCString(); 
                 document.querySelector('#statsOverview').innerHTML= 'Global';
                 document.querySelector('#confirmed').innerHTML = response.cases;
                 document.querySelector('#recovered').innerHTML = response.recovered;
                 document.querySelector('#deaths').innerHTML = response.deaths;
                 document.querySelector('#updatedAt').innerHTML = `Last Updated At ${dateUpdated}`;
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}
function searchByCountry() {
  let query = document.getElementById("searchQuery").value;
  $.ajax({
    url:`https://corona.lmao.ninja/v2/countries/${query}`,
    type: "get",
    data: {},
    success: function (response) {
         if(typeof response.message != 'undefined') {
           document.querySelector('#searchResponse').innerHTML=response.message;
            return;
               }
              var dateUpdated= new Date(response.updated).toUTCString();
              document.querySelector('#statsOverview').innerHTML= response.country;
              document.querySelector('#confirmed').innerHTML = response.cases;
              document.querySelector('#recovered').innerHTML = response.recovered;
              document.querySelector('#deaths').innerHTML = response.deaths;
              document.querySelector('#getDeathsToday').innerHTML= response.todayDeaths
              document.querySelector('#updatedAt').innerHTML = `Last Updated At ${dateUpdated}`;
           },
    error: function (xhr) {
      alert('Oops!!! No search Results or we might messed up!!')
    }
  });
}
function getCountries() {
  $.ajax({
    url:'https://corona.lmao.ninja/v2/countries',
    type: "get",
    data: {},
    success: function (response) {
      let deathsToday = 0;
      let sectionsContent = `<table class="table table-striped table-bordered" >
              <tr>
             <th>S.No</th>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th> 
            <th>Today Reported</th>
            <th>Today Deaths</th>
            <th>Active</th>
            <th>Critical</th>
            </tr>`
                         for(let i = 0; i <response.length; i++) {
                            deathsToday+= response[i].todayDeaths; 
                            sectionsContent += `<tr>
                             <td>${i+1}</td>
                            <td>${response[i].country}</td>
                            <td>${response[i].cases}</td>
                            <td>${response[i].deaths}</td>
                            <td>${response[i].recovered}</td>
                            <td>${response[i].todayCases}</td>
                           <td>${response[i].todayDeaths}</td>
                           <td>${response[i].active}</td>
                           <td>${response[i].critical}</td>
                        </tr>`
                    }
                 let content= sectionsContent+`</table>` 
                 document.querySelector('#getCountries').innerHTML = content
                 document.querySelector('#getDeathsToday').innerHTML =  deathsToday //response[0].todayDeaths;
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}

