import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Locations from '@/Components/Locations';
import { Head } from '@inertiajs/inertia-react';
import axios from "axios";

export default function Dashboard(props) {
    const [location, setLocation] = useState('Lexington, KY');
    const [locations, setLocations] = useState(props.locations);
    const addLocation = (e) => {
        // First, we need the lat/long from the Mapquest API.
        // This allows input of address to determine location
        let options = {
            method: 'GET',
            url: process.env.MIX_OPENGEOCODING_URL,
            params: {
                key: process.env.MIX_OPENGEOCODING_KEY,
                location: location
            }
        };

        axios.request(options).then(function (response) {
            let latLong = [
                response.data.results[0].locations[0].latLng.lat,
                response.data.results[0].locations[0].latLng.lng
            ];

            if (!latLong) {
                // TODO: Error Message to user
                return;
            }

            // Now we store the new location.
            // POST to the location.store route
            // (typically, I would do this via Laravel's API-specific routing
            // with api tokens generated for users. That seems too deep for this
            // small project)
            let options = {
                method: 'POST',
                url: '/location',
                params: {
                    user_id: props.user.id,
                    name: location,
                    lat: latLong[0],
                    long: latLong[1]
                }
            };

            axios.request(options).then(function (response) {
                refreshLocations();
            }).catch(function (error) {
                // TODO: Handle errors like a pro
                console.error(error);
            });
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            console.error(error);
            return false;
        });
    }

    const refreshLocations = () => {
        let options = {
            method: 'GET',
            url: '/location'
        };

        axios.request(options).then(function (response) {
            setLocations(response.data)
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
                                value={location}
                                className="mt-1 block w-full"
                                handleChange={event => setLocation(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="m-4">
                    <Locations
                        locations={locations}
                        user={props.user}
                    />
                </div>
            </div>

        </Authenticated>
    );
}