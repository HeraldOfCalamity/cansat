import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import Map from "../components/Map";

export default function Tracking() {

  const [x, set_x] = useState(1);
  const [y, set_y] = useState(1);
  const [z, set_z] = useState(1);
  const [sceneg, set_scene] = useState();
  const [camerag, set_camera] = useState();
  const [rendererg, set_renderer] = useState();
  const [cylinderg, set_cylinder] = useState();

  const [grafica1, set_grafica1] = useState();

  const [co, set_co] = useState("");

  const [lat, set_lat] = useState("");
  const [long, set_long] = useState("");

  function getData() {
    axios.get('http://127.0.0.1:5000/api/get')
      .then(response => {
        // Actualiza el estado con los datos recibidos
        const dates = response.data[0];
        set_co(dates.co);

        //yaw, pitch, roll
        set_x(parseFloat(dates.yaw))
        set_y(parseFloat(dates.pitch))
        set_z(parseFloat(dates.roll))

        //gps
        set_lat(parseFloat(dates.latitud))
        set_long(parseFloat(dates.longitud))
      })
      .catch(error => {
        console.error('Error al realizar la solicitud GET:', error);
      });
  }


  useEffect(() => {
    var graf1 = new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ["CO", "OXIGENO"],
        datasets: [
          {
            label: "ppm",
            backgroundColor: ["#3e95cd", "#3e95cd"],
            data: [15, 20]
          }
        ]
      },
      options: {
        legend: { display: false },
      }
    });
    set_grafica1(graf1);
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    });
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
    new Chart(document.getElementById("mixed-chart"), {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [{
          label: "Europe",
          type: "line",
          borderColor: "#8e5ea2",
          data: [408, 547, 675, 734],
          fill: false
        }, {
          label: "Africa",
          type: "line",
          borderColor: "#3e95cd",
          data: [133, 221, 783, 2478],
          fill: false
        }, {
          label: "Europe",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          data: [408, 547, 675, 734],
        }, {
          label: "Africa",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          backgroundColorHover: "#3e95cd",
          data: [133, 221, 783, 2478]
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions): Europe & Africa'
        },
        legend: { display: false }
      }
    });




    // THREE JS
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(15, 23, 42)");
    const camera = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 0.1, 500);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    document.getElementById('container').appendChild(renderer.domElement);

    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff10 });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    camera.position.z = 5;

    cylinder.position.set(0, 0, 0);

    cylinder.rotation.x = 0;
    cylinder.rotation.y = 0;
    cylinder.rotation.x = 0;

    set_scene(scene);
    set_camera(camera);
    set_renderer(renderer);
    set_cylinder(cylinder);


    renderer.render(scene, camera);
    console.log("INIT");

    setInterval(() => {
      getData();
    }, (500));
  }, [])

  useEffect(() => {
    if (sceneg && camerag && rendererg && cylinderg) {
      //requestAnimationFrame(animate);

      // Actualiza la velocidad de rotación del cilindro
      //cylinder.rotation.x += speed;
      //cylinder.rotation.y += speed;

      // Actualiza la posición del cilindro
      const positionX = parseFloat(x) * (Math.PI / 180);
      const positionY = parseFloat(y) * (Math.PI / 180);
      const positionZ = parseFloat(z) * (Math.PI / 180);

      cylinderg.rotation.x = positionX;
      cylinderg.rotation.y = positionY;
      cylinderg.rotation.z = positionZ;

      //cylinder.rotation.set(positionX, positionY, positionZ);

      rendererg.render(sceneg, camerag);
    }
  }, [x, y, z])

  useEffect(() => {
    if (grafica1) {
      grafica1.data.datasets[0].data[0] = parseFloat(co);
      grafica1.data.datasets[0].data[1] = 25;
      grafica1.update();
    }
  }, [co]);

  return (
    <div className="container text-white mx-auto">
      {/*THREE JS*/}
      {<div className=" flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row w-96">
          <div className="mx-auto pr-4">
            <h2 className="text-2xl mb-4">Cilindro 3D</h2>
            <form id="controls" className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="positionX">Posición X:</label>
                <input value={x} onChange={e => set_x(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="positionX" type="number" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="positionY">Posición Y:</label>
                <input value={y} onChange={e => set_y(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="positionY" type="number" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="positionZ">Posición Z:</label>
                <input value={z} onChange={e => set_z(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="positionZ" type="number" />
              </div>
            </form>
          </div>

        </div>
      </div>}
      <div className="grid grid-cols-2 ">
        <div className="w-[36rem] h-96 mx-auto ">
          {lat!="" && <Map latitud={lat} longitud={long}></Map>}
        </div>
        <div id="container"></div>


      </div>


      {/* GRÁFICOS */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 1</a>
          <canvas id="bar-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 2</a>
          <canvas id="line-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 3</a>
          <canvas id="doughnut-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 4</a>
          <canvas id="mixed-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 5</a>
          <GaugeChart id="gauge-chart3"
            nrOfLevels={30}
            colors={["#FF5F6D", "#FFC371"]}
            arcWidth={0.3}
            percent={0.37}
          />
        </div>
      </div>
    </div>
  )
}