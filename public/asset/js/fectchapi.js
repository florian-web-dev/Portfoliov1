
const formWeather = document.querySelector('#form-weather');

const weatherResult = document.querySelector("#weather-result");
const btn = document.getElementById('ask-weather');

const myHeaders = new Headers();

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    // mode: 'no-cors',
    cache: 'default',

};


async function fetchApi(url) {
    try {
        let response = await fetch(url, myInit)
        // console.log(`try : Reponse : ${response.status} ${response.statusText} `)
        // console.log(response);
        if (response.ok) {

            let data = await response.json();

            // console.log(data);
            return data

        } else {
            console.log(`pas Ok : Invalid Response `);
        }
    } catch ($e) {
        console.log("Catch : ERROR " + $e)
    }

}

function renderWeather(objWeather) {
    return `
    <div class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-gray-100 bg-white">
        <div class=" dark:bg-gray-800 rounded shadow p-6">
            <div class="flex items-center justify-between w-full sm:w-full mb-8">
                <div class="flex items-center">
                    <div class="p-4 bg-blue-200 rounded-lg">
                            <img src="${objWeather.icon}" alt="" srcset="">
                    </div>
                    <div class="ml-6">
                        <h3 class="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
                            ${objWeather.condition}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                        Ville : ${objWeather.country}</p>

                        <p class="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                       Code postal : ${objWeather.postcode} </p>
                    </div>
                </div>
                <div>
                    <div class="flex items-center pl-3 text-green-700">
                        <p></p>
                        <p class="text-green-700 text-sm tracking-wide font-bold leading-normal pl-1">
                            ${objWeather.date}</p>
                    </div>
                    <p class="font-normal text-xs text-right leading-4 text-green-700 tracking-normal">
                            humidité : ${objWeather.humidity}</p>
                </div>
            </div>

            <div class="flex items-center justify-between w-full sm:w-full mb-8">
                <div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                    Le soleil se lève a : ${objWeather.sunrise}</p>

                    <p class="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                    Le soleil se couche a : ${objWeather.sunset}</p>
                </div>
                <div>
                    <p id="status"></p>
                    <a id="map-link" target="_blank" href="https://www.openstreetmap.org/#map=18/${objWeather.lat}/${objWeather.long}" title="Latitude: ${objWeather.lat} °, Longitude: ${objWeather.long} °" class="text-gray-600 dark:text-gray-400">Afficher carte</a>
                </div>
            </div>

        </div>
    </div>`

}

/**
 *  Recupere datas par coordonné 
    https://www.prevision-meteo.ch/services/json/lat=${coorLat}lng=${coorLong}
    https://www.prevision-meteo.ch/services/json/${city.city}
 * @param {String} dataSearch 
 */
function fetchWeather(lat, long) {
    let weather = {};

    let cityInfo;
    let country, postcode

    let latitude, longitude;
    let sunrise, sunset;

    fetchApi(`https://api-adresse.data.gouv.fr/reverse/?lon=${long}&lat=${lat}`).then((dataReversCoord) => {

        // console.log(dataReversCoord);
        postcode = dataReversCoord['features'][0].properties.postcode
        country = dataReversCoord['features'][0].properties.city

        fetchApi(`https://www.prevision-meteo.ch/services/json/${country}`).then((dataWeather) => {
            // console.log(dataWeather);

            cityInfo = dataWeather['city_info'];
            latitude = cityInfo['latitude'];
            longitude = cityInfo['longitude'];


            sunrise = cityInfo['sunrise'];
            sunset = cityInfo['sunset'];

            let currentCondition = dataWeather.current_condition;

            weather = {
                condition: currentCondition.condition,
                date: currentCondition.date,
                hour: currentCondition.hour,
                humidity: currentCondition.humidity,
                icon: currentCondition.icon,
                sunrise: sunrise,
                sunset: sunset,
                postcode: postcode,
                country: country,
                lat: latitude,
                long: longitude
            }
            // console.log(weather);
            weatherResult.innerHTML = renderWeather(weather);
            return weather
        })

    })

}

// recuperé la coordonné par la ville
// https://api-adresse.data.gouv.fr/search/?q=Saint%20maur%20des%20foss%C3%A9

function parseForm(form) {
    return {
        city: form['city'].value,
        postcode: form['postcode'].value,
    }
}

formWeather.addEventListener('submit', function (event) {

    let formData = parseForm(formWeather)
    // console.log(formData.city);
    fetchApi(`https://api-adresse.data.gouv.fr/search/?q=${formData.city}&postcode=${formData.postcode}&limit=3`).then(function (data) {

        console.log(data);
        // console.log(data['features']);
        // console.log(data['features'].length);
        // fetchDataByCity(country)


        data['features'].forEach(element => {

            console.log(element.properties.city);
            // fetchWeather(element.properties.city);

            if (element.properties.postcode == formData.postcode) {
                console.log(element.properties.city);
                // fetchWeather(element.properties.city);

            }
            else {
                console.log('bob');
            }

        });

    })
    // fetchApi(`https://www.prevision-meteo.ch/services/json/${city.city}`,distest)
    event.preventDefault();
})

//recupere la meteo avec les coordoné
// https://api-adresse.data.gouv.fr/reverse/?lon=2.491801&lat=48.799943

// function geoFindMe() {
//     const status = document.querySelector("#status");
//     const mapLink = document.querySelector("#map-link");
  
//     mapLink.href = "";
//     mapLink.textContent = "";
  
//     function success(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
  
//       status.textContent = "";
//       mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//       mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//     }
  
//     function error() {
//       status.textContent = "Unable to retrieve your location";
//     }
  
//     if (!navigator.geolocation) {
//       status.textContent = "Geolocation is not supported by your browser";
//     } else {
//       status.textContent = "Locating…";
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
//   }


  // API de geolocalisation 
// https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
function geoFindMe() {
    const status = document.querySelector("#status");

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "";

        fetchWeather(latitude, longitude);

    }

    function error() {
        status.textContent = "Impossible de récupérer votre position";
    }

    if (!navigator.geolocation) {
        status.textContent = "La géolocalisation n\'est pas supportée par votre navigateur";
    } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
btn.addEventListener('click', geoFindMe);
