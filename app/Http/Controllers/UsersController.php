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

class UsersController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function getUser(Request $request)
    {
        $user = User::find(auth()->user()->id);

        return Inertia::render('User', [
            'user' => $user,
            'locations' => $user->locations,
        ]);
    }

    /**
     * Update user.
     *
     * @return boolean
     */
    public function update(Request $request, User $user_id)
    {
        $user = User::find(auth()->user()->id);
        $user->name = $request->name;
        $user->units = $request->units ?? null;
        $user->save();

        return $user->toJson();
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
