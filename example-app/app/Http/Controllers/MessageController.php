<?php

namespace App\Http\Controllers;

use App\Jobs\LongRunningTask;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Upload the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function broadcastMessage(Request $request)
    {
        // Run Job
        $user = auth()->user();
        dispatch(new LongRunningTask($user));

        return response()->json([
            'success' => true,
            'message' => "Job was called",
        ]);
    }
}
