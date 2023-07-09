import React, { useState } from 'react';

import axios from 'axios';


export function dashboardAdmin () {
    // define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [sales, setSales] = useState([]);


    const createSales = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', 'sales');

        // return console.log(localStorage.getItem('token'));

        // send data to Laravel APIs
        await axios({
            url: 'http://localhost:8000/api/sales',
            method : 'POST',
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            data: formData
        })
        .then((response) => {
            
            const rest = response.data;

            if(response.status === 200)
            {
                setSales({
                    'message' : rest.message
                });
            }

        })
        .catch((error) => {

            //assign error to state "validation"
            // setValidation(error.response.data);

            // const err = error.response.data;

            if(error.response.status === 401)
            {
                // setValidation('Unauthorized');
                // setValidation(error.response.data);

                console.log(error.response.data);

            }

        })
    }

    return (
        <>
            <div className="w- full rounded-3xl bg-gray-100 p-5">
                <h1 className="text-4xl font-bold text-left mb-3">Admin dashboard</h1>
                <p className="text-gray-400 text-left mb-5">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, illum. Voluptate, eius voluptates rem rerum, tempore earum labore recusandae maiores temporibus dignissimos sint! Deserunt eum aspernatur iste quas sapiente magni?
                </p>

                <hr />

                <div className="flex justify-between my-5">
                    <div className="w-[50%] px-5">
                        <h2 className="text-2xl text-left mb-2">
                            Create Sales
                        </h2>
                        {
                            sales.message && (
                                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                    <span className="font-medium"> User Created Successfully </span>
                                </div>
                            )
                        }
                        <form onSubmit={createSales}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Name</label>
                                <div className="mt-2">
                                    <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">Password</label>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="w-[50%]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, similique voluptatibus nihil ipsa in dolorem debitis provident rem incidunt temporibus minima distinctio blanditiis? Ipsam obcaecati beatae repellat, perspiciatis sint vitae.
                    </div>
                </div>
            </div>
        </>
    )
}