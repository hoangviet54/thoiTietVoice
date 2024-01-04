const API_ID = 'a8b389df71568e10489cd5176ff11f49';
const DEFAULT = 'DEFAULT_VALUE';

const nameCity = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherImg = document.querySelector('.weather-img');
const weatherTemp = document.querySelector('.weather-temp');
const searchInput = document.querySelector('.search-input');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
searchInput.addEventListener('change',(e)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log(['SearchInput',data]);
            nameCity.innerHTML=data.name || DEFAULT;
            weatherState.innerHTML=data.weather[0].description || DEFAULT;
            weatherImg.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            weatherTemp.innerHTML = Math.round(data.main.temp);
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('h:mm');
            sunset.innerHTML = moment.unix(data.sys.sunset).format('h:mm');
            humidity.innerHTML = data.main.humidity;
            windSpeed.innerHTML = data.wind.speed;
        })
})

//tro ly ao
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'vi-VI';
recognition.continuous = false;

const microphone = document.querySelector('.microphone');
const handleVoice = (text) => {
    console.log('text',text);

    //thời tiết tịa đà nẵng => [thời tiết tại,'Đà Nẵng']
    const handleText = text.toLowerCase();
    if (handleText.includes('thời tiết tại')) {
        const location = handleText.split('tại')[1].trim();

        console.log('location',location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
    }
}

microphone.addEventListener('click',(e) => {
    e.preventDefault();
    recognition.start();
});

recognition.onspeechend = () => {
    recognition.stop();
}

recognition.onerror = (err) => {
    recognition.onerror(err)
}

recognition.onresult = (e) => {
    console.log('onresult',e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}


