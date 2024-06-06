import React, { useState } from "react";
import axios from 'axios'

export default function ChangePass({ email }) {

  // const [oldPass, setOldPass] = useState('')

  const [newPass, setNewPass] = useState('')

  const [confirmNewPass, setConfirmNewPass] = useState('')

  const [newPassError, setNewPassError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPass === confirmNewPass) {
      try {
        const response = await axios.post('http://localhost:5000/api/usuario/cambiar-contrasena', { correo_electronico: email, contraseña: newPass })
        console.log(response)
        window.location.href = '/login'
      } catch (error) {
        console.log(error.message)
      }
    }

  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 text-gray-500 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex -mx-3">
              <div className="w-full px-3">

                {/* <label className="text-xs font-semibold px-1">
                  Ingresa la contraseña actual
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className={
                    "w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'}"
                  }
                  placeholder="********"
                /> */}

                <p className="text-sm font-semibold px-1 text-center">
                  Ingresa tu nueva contraseña
                </p>
                <div className="w-full relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className={
                      "w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'} mt-1"
                    }
                    placeholder="********"
                  />
                </div>

                <p className="text-sm font-semibold px-1 text-center mt-5">
                  Ingresa nuevamente tu nueva contraseña
                </p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  className={
                    "w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'} mt-1"
                  }
                  placeholder="********"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Guardar nueva contraseña
              </button>
            </div>
            <p className="text-sm text-red-500 font-extrabold">{newPassError}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
