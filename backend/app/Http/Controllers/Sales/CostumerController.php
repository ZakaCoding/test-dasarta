<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Claims\Custom;

class CostumerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validated every request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:customers',
            'password' => 'required|string|min:8',
            'phone' => 'required|string',
            'address' => 'required|string',
            'attachment' => 'required|file|max:2048|mimetypes:image/jpeg,image/png',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => true,
                'message' => $validator->errors(),
                'data' => null
            ],200);
        }

        // Create uniqid for upload image
        $uuid = Str::uuid();

        // upload file attachment
        $filename = $uuid . '.' . $request->file('attachment')->getClientOriginalExtension();

        $filePath = $request->file('attachment')->storeAs(
            'attachment/' . $uuid,
            $filename,
            'public'
        );

        // file upload checks
        if(empty($filePath))
        {
            return response()->json([
                'status' => true,
                'message' => 'Upload error : ' . $filePath,
                'data' => null
            ]);
        }

        // create json data from file uploads
        $attachment = [
            "src" => $filePath
        ];

        /**
         * 
         * After all validation and upload file success
         * then store all required data to database
         */

        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => password_hash($request->password, PASSWORD_BCRYPT),
            'phone' => $request->phone,
            'address' => $request->address,
            'attachment' => json_encode($attachment)
        ]);

        // sent response
        return response()->json([
            'status' => true,
            'message' => 'Create customer success',
            'data' => $customer
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validated every request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:customers',
            'password' => 'required|string|min:8',
            'phone' => 'required|string',
            'address' => 'required|string',
            // 'attachment' => 'file|max:2048|mimetypes:image/jpeg,image/png',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => true,
                'message' => $validator->errors(),
                'data' => null
            ],200);
        }

        // check if attachment is not fill then don't update
        if($request->hasFile('attachment'))
        {
            // Create uniqid for upload image
            $uuid = Str::uuid();

            // upload file attachment
            $filename = $uuid . '.' . $request->file('attachment')->getClientOriginalExtension();

            $filePath = $request->file('attachment')->storeAs(
                'attachment/' . $uuid,
                $filename,
                'public'
            );

            // file upload checks
            if(empty($filePath))
            {
                return response()->json([
                    'status' => true,
                    'message' => 'Upload error : ' . $filePath,
                    'data' => null
                ]);
            }

            // create json data from file uploads
            $attachment = [
                "src" => $filePath
            ];

            // update
            $customer = Customer::where('id', $id)
                                ->update([
                                    'name' => $request->name,
                                    'email' => $request->email,
                                    'password' => password_hash($request->password, PASSWORD_BCRYPT),
                                    'phone' => $request->phone,
                                    'address' => $request->address,
                                    'attachment' => json_encode($attachment),
                                    'updated_at' => Carbon::now()
                                ]);
        } else {
            // update
            $customer = Customer::where('id', $id)
                                ->update([
                                    'name' => $request->name,
                                    'email' => $request->email,
                                    'password' => password_hash($request->password, PASSWORD_BCRYPT),
                                    'phone' => $request->phone,
                                    'address' => $request->address,
                                    'updated_at' => Carbon::now()
                                ]);
        }


        return response()->json([
            'status' => true,
            'message' => 'Update customer success',
            'data' => $customer
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Customer::find($id)->delete();
        } catch (\Exception $e) {
            return response()->json([
                'status' => true,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'customer delete successfully',
            'data' => null
        ], 200);
    }
}
