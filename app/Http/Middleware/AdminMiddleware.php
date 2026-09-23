<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        if (! $request->user()?->isAdmin()) {
            abort(403, 'Akses hanya diperbolehkan untuk admin.');
        }

        return $next($request);
    }
}
