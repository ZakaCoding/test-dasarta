<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        // validate user request
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if($validate->fails())
        {
            return response()->json([
                'status' => true,
                'message' => $validate->errors(),
                'data' => null
            ], 422);
        }

        // create credentials
        $credentials = $request->only('email', 'password');
        $token = auth()->attempt($credentials);
        
        if (!$token) {
            return response()->json([
                'status' => true,
                'message' => 'Unauthorized',
                'data' => null
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'success' => true,
            'message' => 'login success',
            'data' => [
                'user' => Auth::user(),
                'token' => $token
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => true,
            'message' => 'logout successfully',
            'data' => null
        ]);
    }

    public function register(Request $request)
    {
        $validate = validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validate->fails())
        {
            return response()->json($validate->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User created successfully',
            'data' => [
                'user' => $user
            ]
        ]);
    }

    public function refresh()
    {
        return $this->createNewToken(Auth::refresh());
    }

    public function passwordReset()
    {
        return '';
    }

    public function profile()
    {
        return response()->json([
            'status' => true,
            'message' => null,
            'data' => auth()->user()
        ], 200);
    }

    protected function createNewToken($token){
        return response()->json([
            'data' => [
                'token' => $token,
                'expires_in' => Auth::factory()->getTTL() * 60,
                'user' => auth()->user()
            ]
        ]);
    }
}
