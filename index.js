$('#getStats').click();
$('#getCountries').click();
var date = new Date(); // Create Date object for a reference point
function getStats() {
  $.ajax({
    url: 'https://corona.lmao.ninja/v2/all',
    type: "get",
    data: {},
    success: function (response) {
      const dateUpdated = new Date(response.updated).toString();
      document.querySelector('#statsOverview').innerHTML = 'Global';
      document.querySelector('#confirmed').innerHTML = response.cases;
      document.querySelector('#recovered').innerHTML = response.recovered;
      document.querySelector('#deaths').innerHTML = response.deaths;
      document.querySelector('#todayReported').innerHTML = response.todayCases;
      document.querySelector('#todayDeaths').innerHTML = response.todayDeaths

      document.querySelector('#updatedAt').innerHTML = `Last Updated At: ${dateUpdated}`;
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}
function searchByCountry() {
  let query = document.getElementById("searchQuery").value;
  $.ajax({
    url: `https://corona.lmao.ninja/v2/countries/${query}`,
    type: "get",
    data: {},
    success: function (response) {
      if (typeof response.message != 'undefined') {
        document.querySelector('#searchResponse').innerHTML = response.message;
        return;
      }
      const dateUpdated = new Date(response.updated).toString();
      document.querySelector('#statsOverview').innerHTML = response.country;
      document.querySelector('#confirmed').innerHTML = response.cases;
      document.querySelector('#recovered').innerHTML = response.recovered;
      document.querySelector('#deaths').innerHTML = response.deaths;
      document.querySelector('#todayReported').innerHTML = response.todayCases;
      document.querySelector('#todatDeaths').innerHTML = response.todayDeaths
      document.querySelector('#updatedAt').innerHTML = `Last Updated At: ${dateUpdated}`;
    },
    error: function (xhr) {
      alert('Oops!!! No search Results or we might messed up!!')
    }
  });
}
function getCountries() {
  $.ajax({
    url: 'https://corona.lmao.ninja/v2/countries',
    type: "get",
    data: {},
    success: function (res) {
      // sort by most cases overall
      const response = res.sort((a, b) => {
        return b.cases - a.cases
      })
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
      for (let i = 0; i < response.length; i++) {
        sectionsContent += `<tr>
                             <td>${i + 1}</td>
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
      let content = sectionsContent + `</table>`
      document.querySelector('#getCountries').innerHTML = content
    },
    error: function (xhr) {
      alert('Oops!!! Something went terribly wrong. We have sent out a higly trained team of monkeys to handle this situation.')
    }
  });
}

