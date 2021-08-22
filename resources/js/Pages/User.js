import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import axios from "axios";

export default function User(props) {
    var editingText = 'Edit';
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.user.name);
    const [units, setUnits] = useState(props.user.units);

    const prettyUnits = (val) => {
        if (val === 'imperial') {
            return 'Farenheit';
        }
        return 'Celsius';
    }

    const editStatusClass = () => {
        if (editing) {
            editingText = 'Editing';
            return 'bg-yellow-400 hover:bg-yellow-600 ';
        }
        editingText = 'Edit';
        return 'bg-gray-400 hover:bg-gray-600 ';
    }

    const editUser = () => {
        let options = {
            method: 'POST',
            url: '/user/' + props.user.id,
            params: {
                user_id: props.user.id,
                name: name,
                units: units
            }
        };

        axios.request(options).then(function (response) {
            props.user.name = response.data.name;
            props.user.units = response.data.units;
            setEditing(false);
        }).catch(function (error) {
            // TODO: Handle errors like a pro
            // console.error(error);
        });
    }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
            >
                <Head title="User" />
                {/*
                {
                `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
                */}

                <div className="max-w-7xl w-1/3 mx-24 mt-10 bg-gray-200 rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8">
                    <div className="m-4 flex flex-row gap-3">
                        <button className={"py-1 px-2 font-bold rounded-md " + editStatusClass()} onClick={() => setEditing(!editing)}>{editingText}</button>
                        <button className="py-1 px-2 font-bold rounded-md bg-green-400 hover:bg-green-600" hidden={!editing} onClick={editUser}>Submit</button>
                    </div>
                    <div className="m-4">
                        <form action="">
                            <div className="mt-3 flex flex-row gap-3" hidden={editing}>
                                <label className="m-0 mr-2 font-bold text-lg" htmlFor="staticName">Name: </label><span className="inline-flex items-center" name="staticName">{props.user.name}</span>
                            </div>
                            <div className="mt-3 flex flex-row items-center" hidden={!editing}>
                                <label className="m-0 mr-2 font-bold text-lg" htmlFor="name">Name: </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    className="mt-1 block w-full"
                                    handleChange={event => setName(event.target.value)}
                                />
                            </div>
                            <div className="mt-3 flex flex-row gap-3">
                                <label className="m-0 mr-2 font-bold text-lg" htmlFor="staticEmail">Email: </label><span className="inline-flex items-center" name="staticEmail">{props.user.email}</span>
                            </div>
                            <div className="mt-3 flex flex-row gap-3" hidden={editing}>
                                <label className="m-0 mr-2 font-bold text-lg" htmlFor="staticUnits">Units: </label>
                                <span className="inline-flex items-center" name="staticUnits">{prettyUnits(props.user.units)}</span>
                            </div>
                            <div className="mt-3 flex flex-row gap-3" hidden={!editing}>
                                <label className="m-0 mr-2 font-bold text-lg">Units: </label>
                                <div>
                                    <input className="" type="radio" id="imperial" name="units" value="imperial" onChange={() => setUnits('imperial')} checked={units == 'imperial'}/>
                                    <label className="ml-1" htmlFor="imperial">&deg;F</label>
                                </div>
                                <div>
                                    <input className="" type="radio" id="metric" name="units" value="metric" onChange={() => setUnits('metric')} checked={units == 'metric'}/>
                                    <label className="ml-1" htmlFor="metric">&deg;C</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}