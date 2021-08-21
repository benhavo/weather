import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Locations from '@/Components/Locations';
import { Head } from '@inertiajs/inertia-react';
import axios from "axios";

export default function Dashboard(props) {
    const [units, setUnits] = useState('metric');
    const [location, setLocation] = useState('Lexington, KY');

    var intervalID;

    const addLocation = (e) => {
        let latLong = getLatLong();

        if (!latLong) {
            // TODO: Error Message to user
            return;
        }

        let options = {
            method: 'POST',
            url: '/api/location',
            params: {
                user_id: props.user.id,
                name: location,
                lat: latLong[0],
                long: latLong[1]
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
        });
    }

    const getLatLong = () => {
        let options = {
            method: 'GET',
            url: 'https://open.mapquestapi.com/geocoding/v1/address',
            params: {
                key: 'yqMMGZPKgoa0m4l9Te7wdhk3XdiFG7C7',
                location: {location}
            }
        };

        axios.request(options).then(function (response) {
            return [
                response.data.results[0].locations[0].latLng.lat,
                response.data.results[0].locations[0].latLng.lng
            ];
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
            return false;
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="m-4">
                    <div className="flex flex-row gap-x-1 max-w-7xl mx-auto">
                        <div className="flex-none">
                            <Button className="mt-1 py-3" onClick={addLocation}>
                                Add a Location
                            </Button>
                        </div>
                        <div className="flex-grow">
                            <Input
                                type="text"
                                name="location"
                                value="Lexington, KY"
                                className="mt-1 block w-full"
                                handleChange={event => setLocation(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="m-4">
                    <Locations
                        locations={props.locations}
                        user={props.user}
                    />
                </div>
            </div>

        </Authenticated>
    );
}