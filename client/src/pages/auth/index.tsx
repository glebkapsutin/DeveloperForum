import React, { useState } from 'react'
export const Auth = () => {
    const [Selected, setSelected] = useState(false);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="w-96 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              {Selected ? "Register" : "Login"}
            </h2>
    
            <form className="mt-6 space-y-4">
              {Selected && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                />
              </div>
    
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {Selected ? "Sign Up" : "Login"}
              </button>
            </form>
    
            <div className="mt-4 text-center">
              <button
                onClick={() => setSelected(!Selected)}
                className="text-blue-500 hover:underline"
              >
                {Selected ? "Already have an account? Login" : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Auth;