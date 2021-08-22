import React, { useState, useEffect } from 'react';

export default function Location({ location = null, user = null }) {
    const [weather, setWeather] = useState('');

    useEffect(() => { getWeather(); }, []);

    const imageExists = (image_url) => {
        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;
    }

    const getWeather = () => {
        if (! (location && user) ) {
            return;
        }

        let options = {
            method: 'GET',
            url: process.env.MIX_OPENWEATHERMAP_URL,
            params: {
                lang: 'en',
                lat: location.lat,
                lon: location.long,
                units: user.units
            },
            headers: {
                'x-rapidapi-key': process.env.MIX_OPENWEATHERMAP_KEY,
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            let data = {};
            let temp = user.units == 'imperial'
                ? Math.round(response.data.main.temp * 10) / 10
                : Math.round((response.data.main.temp - 273.15) * 10) / 10; // K to C
            let dateObj = new Date((response.data.dt + response.data.timezone) * 1000);
            let time = dateObj.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            // TODO: Add Night icons
            let icon_url = '/img/weather-icons/' + response.data.weather[0].main + '.svg'

            data = {
                condition: response.data.weather[0].main,
                temp: temp,
                icon_url: imageExists(icon_url) ? icon_url : null,
                time: time
            };

            setWeather(data);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
        });
    }

    if (location && user) {
        return (
            <div className="flex flex-col justify-center w-52 p-4 bg-blue-200 rounded-lg shadow-2xl">
                <div className="loc-title">
                    <div className="flex flex-col justify-center">
                        <p className="text-lg text-gray-900 text-center font-bold">{location.name}</p>
                        <p className="text-sm text-gray-600 text-center">At {weather.time} Local Time</p>
                    </div>
                </div>
                <div className="loc-img">
                    <img src={weather.icon_url}
                        className="w-full object-cover object-center" />
                </div>
                <div className="loc-info grid gap-10">
                    <div className="flex flex-col justify-center items-center text-gray-900">
                        <p className="font-bold text-2xl">{weather.temp} &deg;{user.units == 'imperial' ? 'F' : 'C'}</p>
                        <p className="font-bold text-xl">{weather.condition}</p>
                    </div>
                </div>
                <div className="loc-actions">
                    <div className="flex flex-col justify-center items-center text-gray-900">
                        <button className="inline-flex items-center p-2 bg-red-400 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition ease-in-out duration-150"><i className="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex align-items-center justify-center w-52 p-10 bg-blue-200 rounded-lg shadow-2xl">
            <p>No Location</p>
        </div>
    );
}
