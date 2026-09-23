<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            /*
             * Data user yang sedang login.
             *
             * Bisa diakses React dengan:
             *
             * usePage().props.auth.user
             *
             */
            'auth' => [
                'user' => $request->user(),
            ],

            /*
             * Ziggy
             *
             * Membuat route() Laravel bisa digunakan
             * di dalam React.
             */
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            /*
             * Flash message
             */
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
            ],
        ];
    }
}
