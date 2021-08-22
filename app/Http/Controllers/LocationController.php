<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Location;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * List Locations for User.
     *
     * @return boolean
     */
    public function index(Request $request)
    {
        $user = User::find(auth()->user()->id);

        $locations = new Location();

        return $locations->where('user_id', $user->id)->get();
    }

    /**
     * Store Location.
     *
     * @return boolean
     */
    public function store(Request $request)
    {
        $user = User::find(auth()->user()->id);

        $location = new Location();
        $location->fill(array_merge($request->all(), ['user_id' => $user->id]));
        $location->save();

        return true;
    }

    /**
     * Delete Location.
     *
     * @return boolean
     */
    public function destroy(Location $location)
    {
        $location->delete();

        return true;
    }
}
