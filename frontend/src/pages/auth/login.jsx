import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export function loginPage() {
    // define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    const auth = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        // return console.log(formData.email);

        // send data to Laravel APIs
        await axios.post('http://localhost:8000/api/login', formData)
        .then((response) => {
            
            const rest = response.data;

            // Set token into localStorage
            localStorage.setItem('token', rest.data.token);
            localStorage.setItem('user', JSON.stringify(rest.data));

            // check role
            var roles = rest.data.user['role'];

            if(roles === 'admin')
            {
                navigate('/dashboard/admin');
            } else {
                navigate('/dashboard/sales');
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
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {
                    validation.message && (
                        <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                            <span className="font-medium">{validation.message}</span>
                        </div>
                    )
                }
                <form className="space-y-6" onSubmit={auth}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register as sales</a>
                </p>
            </div>
            </div>
    );
}