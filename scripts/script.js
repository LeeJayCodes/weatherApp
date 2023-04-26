const searchButton = document.querySelector('.search_btn');
const searchBar = document.querySelector('.search_bar');
const weatherContent = document.querySelector('.weather_wrapper');
const searchContent = document.querySelector('.search_wrapper');
const appContainer = document.querySelector('.appbox');

function weatherApp(cityName) {
    let apiKey = "e2ed1c3fb00d6a45f1d08190c9eacfd6";
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey )
            .then((response) => {
                if (response.ok){
                    return response.json()
                } else {throw new Error(Error);
                }
            })
            .then((data) => {
                const city = document.querySelector('.city');
                const enteredCity = searchBar.value
                const icon = document.querySelector('.weather_icon');
                const tempContent = document.querySelector('.temperature');
                const status = document.querySelector('.status');
                const humidity = document.querySelector('.humidity');
                const wind = document.querySelector('.wind');

                city.textContent = `${enteredCity}`;

                //set proper icon img
                if(data.weather[0].main == "Clear"){
                    icon.src = 'images/clear.png'
                }
                if(data.weather[0].main == "Clouds"){
                    icon.src = 'images/cloud.png'
                }
                if(data.weather[0].main == "Rain"){
                    icon.src = 'images/rain.png'
                }
                if(data.weather[0].main == "Snow"){
                    icon.src = 'images/snow.png'
                }
                if(data.weather[0].main == "Mist"){
                    icon.src = 'images/foggy.png'
                }

                let temp = Math.round(data.main.temp - 273);
                tempContent.textContent = `Temperature: ${temp}°C`

                status.textContent = data.weather[0].description;
                humidity.textContent = `${data.main.humidity}%`
                wind.textContent = `${data.wind.speed}km/h`
            })    
}

function addClass(){
    appContainer.classList.add('height');
    weatherContent.classList.add('show');
    searchContent.classList.add('position');
}

//When user press enter in search bar
searchBar.addEventListener("keypress", function(ev){
    if(ev.keyCode == 13){
        addClass();
        let location = searchBar.value;
        weatherApp(location);
    }
})

//When user press enter or click on the button
// ["click", "keypress"].forEach(ev=>{
//     searchButton.addEventListener(ev, function(e){
//     if(ev == "click"){
//         addClass();
//     }
//     if(e.keyCode == 13){
//         addClass();
//     }
// })
// })

["click", "keypress"].forEach(ev=>{
    searchButton.addEventListener(ev, handleEvent);
  });

  function handleEvent(e){
   if(e.type=="click"){
        addClass();
    }
    if(e.keyCode==13){
        addClass();
    }
  }