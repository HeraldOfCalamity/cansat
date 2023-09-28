import axios from 'axios';
import React, { useEffect, useState } from "react";

  
  
  export default function Table() {
    const [dates, set_dates] = useState([]);
    function getData() {
        axios.get('http://127.0.0.1:5000/api/get_100')
          .then(response => {
            // Actualiza el estado con los datos recibidos
            const xd = response.data;
            set_dates(xd);
          })
          .catch(error => {
            console.error('Error al realizar la solicitud GET:', error);
          });
    
      }

      useEffect(() => {
        getData();
      },[])
    return (
      <div className="">
        <div className="w-full mx-auto">
          <div className=" py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-3xl font-semibold leading-6 text-white border text-center py-3 rounded-3xl">REGISTRO DE LOS ULTIMOS 100 DATOS</h1>
                  
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {dates!=[] && <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          latitud
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          longitud
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          alcohol
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          co2
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          toluen
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          nh4
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          acetona
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Acelerometro
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Gisroscopio
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Magnetometro
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Yaw
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Pitch
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Roll
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Temperatura
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Presion
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Altura
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {dates.map((data) => (
                          <tr key={data._id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.latitud}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.longitud}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.co}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.alcohol}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.co2}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.toluen}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.acetona}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.a_x+", "+ data.a_y+", "+ data.a_z}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.g_x+", "+ data.g_y+", "+ data.g_z}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.m_x+", "+ data.m_y+", "+ data.m_z}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.yaw}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.pitch}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.roll}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.temperatura}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.presion}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{data.altura}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  