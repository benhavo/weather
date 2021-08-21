import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import axios from "axios";

export default function User(props) {

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
            >
                <Head title="User" />
                <div className="flex justify-between h-16">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">{JSON.stringify(props)}</div>
                        </div>
                    </div>
                </div>

            </Authenticated>
        </>
    );
}