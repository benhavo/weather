import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { Head } from '@inertiajs/inertia-react';
import axios from "axios";

export default function Dashboard(props) {
    const [units, setUnits] = useState('metric');
    const [location, setLocation] = useState('Lexington, KY');

    const handleClick = (e) => {
        e.preventDefault();

        getLatLong();
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
    };

    const getLatLong = () => {
        let options = {
            method: 'GET',
            url: 'https://open.mapquestapi.com/geocoding/v1/address',
            params: {
                key: 'yqMMGZPKgoa0m4l9Te7wdhk3XdiFG7C7',
                location: location
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            getWeather([
                response.data.results[0].locations[0].latLng.lat,
                response.data.results[0].locations[0].latLng.lng
            ]);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
        });
    }

    const getWeather = (latLon) => {
        let options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
                lang: 'en',
                lat: latLon[0],
                lon: latLon[1],
                units: units
            },
            headers: {
                'x-rapidapi-key': '9e9dab8357mshe7ec73e2128d255p1e20cejsn22495ab03d4c',
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're logged in!</div>
                    </div>
                </div>
            </div>
            <Input
                type="text"
                name="Location"
                value={location}
                className="mt-1 block w-full"
                handleChange={handleChange}
            />
            <Button className="ml-4" onClick={handleClick}>
                Get The Weather
            </Button>

        </Authenticated>
    );
}