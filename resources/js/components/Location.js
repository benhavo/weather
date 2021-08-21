import React, { useState, useEffect } from 'react';

export default function Location({ location = null, user = null}) {
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
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
                lang: 'en',
                lat: location.lat,
                lon: location.long,
                units: user.units
            },
            headers: {
                'x-rapidapi-key': '9e9dab8357mshe7ec73e2128d255p1e20cejsn22495ab03d4c',
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            let data = {};
            let dateObj = new Date((response.data.dt + response.data.timezone) * 1000);
            let utcString = dateObj.toUTCString();
            let time = utcString.slice(-11, -1);
            let temp = Math.round(response.data.main.temp * 10) / 10;
            // TODO: Add Night icons
            let icon_url = '/img/weather-icons/' + response.data.weather[0].main + '.svg'

            data = {
                condition: response.data.weather[0].main,
                temp: temp,
                time: time,
                icon_url: imageExists(icon_url) ? icon_url : null
            };

            setWeather(data);

            console.log(weather);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
        });
    }

    if (location && user) {
        return (
            <div className="flex flex-col justify-center w-52 p-4 bg-blue-200 rounded-lg shadow-2xl">
                <div className="loc-title">
                    <div className="flex flex-row justify-left">
                        <p className="text-lg uppercase text-gray-900 font-bold">{location.name}</p>
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
            </div>
        );
    }

    return (
        <div className="flex align-items-center justify-center w-52 p-10 bg-blue-200 rounded-lg shadow-2xl">
            <p>No Location</p>
        </div>
    );
}
