import React from 'react';
import Location from '@/Components/Location';

export default function Locations({ locations = null, user = null }) {

    if (locations && user) {
        return (
            <div className="flex flex-row flex-wrap gap-x-5 rounded-lg max-w-7xl mx-auto">
                {locations.map((location) =>
                    <Location location={location} user={user} key={location.id}/>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap gap-x-5 rounded-lg max-w-7xl mx-auto">
            <Location location={location} user={user} />
        </div>
    );
}
