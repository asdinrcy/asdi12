<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['token' => $token, 'role' => $user->role]);
    }

    public function Login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {

        }
        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['token' => $token, 'role' =>$user->role]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    public function Logout(Request $request)
    {
        $request->user()->currentAccesToken()->delete();
        return response()->json(['message' => 'Berhasil LogOut']);
    }
}
