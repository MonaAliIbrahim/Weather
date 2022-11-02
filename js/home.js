const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let main = document.querySelector('main'),
    navItems = Array.from(document.querySelectorAll('.navbar-nav .nav-item'));

// Render Default Home Content
renderHomePlaceholder();
setTimeout(() => {
  getWeather();
}, 1000);

function renderHomePlaceholder() {
  let dayIndex = new Date().getDay(),
      monthIndex = new Date().getMonth(),
      date = new Date().getDate();

  main.innerHTML =
  `<section id="home" class="py-4">
    <div class="container py-5">
      <form>
        <div class="input-group">
          <input type="text" id="locationInput" class="form-control" placeholder="Find your location...">
          <button type="button" onclick="getLocation()" class="btn btn-primary">Find</button>
        </div>
      </form>
      <div class="row mt-5">
        <div class="col-md-4 pe-md-0 main-card">
          <div class="card placeholder-wave rounded-0 rounded-start">
            <div class="card-header d-flex justify-content-between">
              <span class="day">${weekdays[dayIndex]}</span>
              <span class="date">${date} ${months[monthIndex]}</span>
            </div>
            <div class="card-body placeholder">
              <h2 class="card-title mb-5">Cairo</h2>
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h3 class="card-subtitle mb-5"></h3>
              </div>
              <p class="my-3"></p>
            </div>
            <div class="card-footer placeholder d-flex justify-content-between">
              <div><i class="fa fa-umbrella"></i><span></span></div>
              <div><i class="fa fa-wind"></i><span></span></div>
              <div><i class="fa fa-compact-disc"></i><span></span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4 px-md-0 main-card">
          <div class="card placeholder-wave h-100 text-center rounded-0">
            <div class="card-header">${weekdays[dayIndex + 1]}</div>
            <div class="card-body placeholder">
              <h3></h3>
              <h6></h6>
              <p class="my-3"></p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ps-md-0 main-card">
          <div class="card placeholder-wave h-100 text-center rounded-0 rounded-end">
            <div class="card-header">${weekdays[dayIndex + 2]}</div>
            <div class="card-body placeholder">
              <h3></h3>
              <h6></h6>
              <p class="my-3"></p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </section>`;
}

function renderHomePage(response) {
  let forecast = response.forecast.forecastday,
      currentDate = response.forecast.forecastday[0].date,
      dayIndex = new Date(currentDate).getDay(),
      monthIndex = new Date(currentDate).getMonth(),
      date = new Date(currentDate).getDate();

  main.innerHTML = 
  `<section id="home" class="py-4">
    <div class="container py-5">
      <form>
        <div class="input-group">
          <input type="text" id="locationInput" class="form-control" placeholder="Find your location...">
          <button type="button" onclick="getLocation()" class="btn btn-primary">Find</button>
        </div>
      </form>
      <div class="row mt-5">
        <div class="col-md-4 pe-md-0 main-card">
          <div class="card rounded-0 rounded-start">
            <div class="card-header d-flex justify-content-between">
              <span class="day">${weekdays[dayIndex]}</span>
              <span class="date">${date} ${months[monthIndex]}</span>
            </div>
            <div class="card-body">
              <h2 class="card-title">${response.location.name}</h2>
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h3 class="card-subtitle">${Math.round(response.current.temp_c)}<sup>o</sup>C</h3>
                <img src="http:${response.current.condition.icon}" alt="Sun Image" />
              </div>
              <p class="my-3">${response.current.condition.text}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <div>
                <i class="fa fa-umbrella"></i>
                <span>${forecast[0].day.daily_chance_of_rain}%</span>
              </div>
              <div>
                <i class="fa fa-wind"></i>
                <span>${forecast[0].day.maxwind_kph}km/h</span>
              </div>
              <div>
                <i class="fa fa-compact-disc"></i>
                <span>${response.current.wind_dir}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 px-md-0 main-card">
          <div class="card h-100 text-center rounded-0">
            <div class="card-header">${weekdays[dayIndex + 1]}</div>
            <div class="card-body">
              <img src="http:${forecast[1].day.condition.icon}" alt="Sun Image" class="mb-3"/>
              <h3>${Math.round(forecast[1].day.maxtemp_c)}<sup>o</sup>C</h3>
              <h6>${Math.round(forecast[1].day.mintemp_c)}<sup>o</sup></h6>
              <p class="my-3">${forecast[1].day.condition.text}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ps-md-0 main-card">
          <div class="card h-100 text-center rounded-0 rounded-end">
            <div class="card-header">${weekdays[dayIndex + 2]}</div>
            <div class="card-body">
              <img src="http:${forecast[2].day.condition.icon}" alt="Sun Image" class="mb-3"/>
              <h3>${Math.round(forecast[2].day.maxtemp_c)}<sup>o</sup>C</h3>
              <h6>${Math.round(forecast[2].day.mintemp_c)}<sup>o</sup></h6>
              <p class="my-3">${forecast[2].day.condition.text}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </section>`;
}

function getLocation() {
  let locationInput = document.getElementById('locationInput');
  getWeather(locationInput.value);
}

async function getWeather(location = 'cairo') {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`),
      data = await response.json();
  renderHomePage(data);
}
