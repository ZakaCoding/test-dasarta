import React, { useState } from 'react';

import axios from 'axios';

export function regisgerPage() {

    // define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define success state
    const [success, setSuccess] = useState([]);

    const regist = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', 'admin');

        // return console.log(formData.email);

        // send data to Laravel APIs
        await axios.post('http://localhost:8000/api/register', formData)
        .then((response) => {
            
            const rest = response.data;

            // check role
            if(response.status === 200)
            {
                setSuccess({
                    'message' : 'Success'
                })
            }

        })
        .catch((error) => {

            //assign error to state "validation"
            // setValidation(error.response.data);

            // const err = error.response.data;

            if(error.response.status === 401)
            {
                // setValidation('Unauthorized');
                setValidation(error.response.data);

            }

        })
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up Admin Account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {
                    validation.message && (
                        <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                            <span className="font-medium">{validation.message}</span>
                        </div>
                    )
                }

                {
                    success.message && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                            <a href='/login' className="font-medium">Admin create Successfully Goto login page</a>
                        </div>
                    )
                }
                <form className="space-y-6" onSubmit={regist}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
                </p>
            </div>
            </div>
    );
}