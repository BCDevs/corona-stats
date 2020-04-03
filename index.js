$('#getStats').click();
$('#getCountries').click();

function getStats() {
  $.ajax({
    url:'https://corona.lmao.ninja/all',
    type: "get",
    data: {},
    success: function (response) {
                 var dateUpdated= new Date(response.updated).toUTCString(); 
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
    url:`https://corona.lmao.ninja/countries/${query}`,
    type: "get",
    data: {},
    success: function (response) {
         if(typeof response.message != undefined) {
           document.querySelector('#searchResponse').innerHTML=response.message;
            return;
          }
        let sectionsContent = `<table class="table table-striped table-bordered" >
              <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th> 
            <th>Today Reported</th>
            <th>Today Deaths</th>
            <th>Active</th>
            <th>Critical</th>
            </tr>
            <tr>
            <td>${response.country}</td>
            <td>${response.cases}</td>
            <td>${response.deaths}</td>
            <td>${response.recovered}</td>
            <td>${response.todayCases}</td>
            <td>${response.todayDeaths}</td>
            <td>${response.active}</td>
            <td>${response.critical}</td>
            </tr>
            </table>`
          document.querySelector('#searchResponse').innerHTML = sectionsContent;
     },
    error: function (xhr) {
      alert('Oops!!! No search Results or we might messed up!!')
    }
  });
}
function getCountries() {
  $.ajax({
    url:'https://corona.lmao.ninja/countries',
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
                 document.querySelector('#getDeathsToday').innerHTML = deathsToday
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}

