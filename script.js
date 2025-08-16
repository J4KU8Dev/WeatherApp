const btn=document.querySelector("button");
const findPlace=document.getElementById("findPlace");
const apiURL="http://api.weatherapi.com/##################"
const apiKey="#############################";
const icon=document.getElementById("icon-day");
const circle=document.querySelector(".circle");
const stat=document.querySelector(".status");
const days=document.querySelectorAll(".day");
const daysIcon=document.querySelectorAll(".icon>i");
const tempH=document.querySelectorAll(".tempH");
const tempL=document.querySelectorAll(".tempL");
const weekday=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const dayOfTheWeek=document.querySelectorAll(".day-of-the-week");

const d=new Date();
let dayNumber=d.getDay();
console.log(dayNumber)

for(let i=0;i<dayOfTheWeek.length;i++){
    dayOfTheWeek[i].innerText=weekday[dayNumber];
    dayNumber++;
    if(dayNumber==7){
        dayNumber=0
    }
}

async function weather(city){
    const response=await fetch(`${apiURL}${apiKey}&q=${city}`);
    if(response.status===400){
        alert("Not found");
    }
    else{
        let data=await response.json();
        icon.classList.remove("fa-cloud","fa-cloud-sun-rain","fa-sun","fa-cloud-bolt","fa-smog","fa-snowflake","fa-cloud-rain")
        if(data.current.condition.text.toLowerCase().includes("rain")){
            icon.classList.add("fa-solid","fa-cloud-rain","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("sunny") || data.current.condition.text.toLowerCase().includes("clear")){
            icon.classList.add("fa-solid","fa-sun","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("cloud")){
            icon.classList.add("fa-solid","fa-cloud","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("mist") || data.current.condition.text.toLowerCase().includes("fog")){
            icon.classList.add("fa-solid","fa-smog","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("snow")){
            icon.classList.add("fa-solid","fa-snowflake","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("thunder")){
            icon.classList.add("fa-solid","fa-cloud-bolt","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        if(data.current.condition.text.toLowerCase().includes("overcast")){
            icon.classList.add("fa-solid","fa-cloud","fa-2xl");
            stat.innerText=data.current.condition.text;
        }
        
        
        document.querySelector(".currentPlace").innerText=data.location.name;
        document.querySelector(".temp").innerText=data.current.temp_c+"°C";
        document.querySelector(".wind").innerText="Wind: "+data.current.wind_kph+" km/h"
        document.querySelector(".pressure").innerText="Pressure: "+data.current.pressure_mb+" hPa";
        console.log(data)
        for(let i=0;i<daysIcon.length;i++){
            // console.log(daysIcon[i]);
            daysIcon[i].classList.remove("fa-cloud","fa-cloud-sun-rain","fa-sun","fa-cloud-bolt","fa-smog","fa-snowflake","fa-cloud-rain");
        }

        
        for(let i=0;i<days.length;i++){
            // console.log(data.forecast.forecastday[i]);
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("rain")){
                daysIcon[i].classList.add("fa-solid","fa-cloud-rain","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("sunny") || data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("clear")){
                daysIcon[i].classList.add("fa-solid","fa-sun","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("cloud")){
                daysIcon[i].classList.add("fa-solid","fa-cloud","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("mist") || data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("fog")){
                daysIcon[i].classList.add("fa-solid","fa-smog","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("snow")){
                daysIcon[i].classList.add("fa-solid","fa-snowflake","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("thunder")){
                daysIcon[i].classList.add("fa-solid","fa-cloud-bolt","fa-2xl");
            }
            if(data.forecast.forecastday[i].day.condition.text.toLowerCase().includes("overcast")){
                daysIcon[i].classList.add("fa-solid","fa-cloud","fa-2xl");
            }
            tempH[i].innerText="H:"+data.forecast.forecastday[i].day.maxtemp_c;
            tempL[i].innerText="L:"+data.forecast.forecastday[i].day.mintemp_c;
        }
    }
}

btn.addEventListener("click",()=>{
    weather(findPlace.value);
})