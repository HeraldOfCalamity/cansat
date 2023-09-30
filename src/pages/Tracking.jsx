import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import Map from "../components/Map";
import Highcharts, { chart } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'; // Import the More module
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

export default function Tracking() {

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'gauge',
      plotBackgroundColor: '#333',
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Temperatura en grados Farenheit'
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [
        {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        },
        {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        },
        {
          // Default background
        },
        {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }
      ]
    },
    // Define your chart configuration here
    yAxis: {
      min: 0,
      max: 100,
      minorTickPosition: 'outside',
      tickPosition: 'outside',
      labels: {
        rotation: 'auto'
      },
      plotBands: [
        {
          from: 0,
          to: 60,
          color: '#55BF3B' // Green
        },
        {
          from: 60,
          to: 80,
          color: '#DDDF0D' // Yellow
        },
        {
          from: 80,
          to: 100,
          color: '#DF5353' // Red
        }
      ]
    },
    series: [
      {
        name: 'Value',
        data: [],
        tooltip: {
          valueSuffix: ' %'
        }
      }
    ]
  });
  const [x, set_x] = useState(1);
  const [y, set_y] = useState(1);
  const [z, set_z] = useState(1);
  const [sceneg, set_scene] = useState();
  const [camerag, set_camera] = useState();
  const [rendererg, set_renderer] = useState();
  const [cylinderg, set_cylinder] = useState();

  const [grafica1, set_grafica1] = useState();
  const [grafica_gi, set_grafica_gi] = useState();
  const [grafica_mag, set_grafica_mag] = useState();
  const [grafica_ace, set_grafica_ace] = useState();
  const [grafica_temp, set_graficatemp] = useState();
  const [grafica_co2, set_graficaco2] = useState();
  const [grafica_alt_pre, set_grafica_alt_pre] = useState();


  //MQ135
  const [co, set_co] = useState("");
  const [alcohol, set_alcohol] = useState("");
  const [tolueno, set_tolueno] = useState("");
  const [nh4, set_nh4] = useState("");
  const [acetona, set_acetona] = useState("");
  const [co2, set_co2] = useState("");
  const [temp, set_temp] = useState("");

  //gps
  const [lat, set_lat] = useState("");
  const [long, set_long] = useState("");
  const [alt, set_alt] = useState("");
  const [pre, set_pre] = useState("");

  //MPU9250
  const [mpu_giro, set_mpu_giro] = useState([0, 0, 0]);
  const [mpu_mag, set_mpu_mag] = useState([0, 0, 0]);
  const [mpu_ace, set_mpu_ace] = useState([0, 0, 0]);

  //time
  const [segundos, set_segundos] = useState([0]);

  // const getCo2Percentage = () => {
  //   let total = co + alcohol + tolueno + nh4 + acetona;
  //   return co / total;
  // }

  function getData() {
    axios.get('http://127.0.0.1:5000/api/get')
      .then(response => {
        // Actualiza el estado con los datos recibidos
        const dates = response.data[0];
        //Gases
        set_co(dates.co);
        set_co2(dates.co2);
        set_alcohol(dates.alcohol);
        set_tolueno(dates.toluen);
        set_nh4(dates.nh4);
        set_acetona(dates.acetona);
        set_temp(dates.temperatura);


        //yaw, pitch, roll
        set_x(parseFloat(dates.pitch))
        set_y(parseFloat(dates.yaw))
        set_z(parseFloat(dates.roll))

        //gps
        set_lat(parseFloat(dates.latitud))
        set_long(parseFloat(dates.longitud))
        set_alt(parseFloat(dates.altura))
        set_pre(parseFloat(dates.presion))


        //mpu
        set_mpu_giro([parseFloat(dates.g_x), parseFloat(dates.g_y), parseFloat(dates.g_z)])
        set_mpu_mag([parseFloat(dates.m_x), parseFloat(dates.m_y), parseFloat(dates.m_z)])
        set_mpu_ace([parseFloat(dates.a_x), parseFloat(dates.a_y), parseFloat(dates.a_z)])

        //tiempo
        set_segundos(prevSegundos => prevSegundos.length < 5 ? [...prevSegundos, prevSegundos[prevSegundos.length - 1] + 0.5] : [...prevSegundos.slice(1), prevSegundos[prevSegundos.length - 1] + 0.5]);

      })
      .catch(error => {
        console.error('Error al realizar la solicitud GET:', error);
      });

  }


  useEffect(() => {
    var graf1 = new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ["CO", "ALCOHOL", "TOLUENO", "NH4", "ACETONA"],
        datasets: [
          {
            label: "ppm",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [15, 20]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Medicion del ambiente (en partes por millon)'
        }
      }
    });
    set_grafica1(graf1);
    var giro = new Chart(document.getElementById("line-chart-giroscopio"), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "EJE X",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [],
          label: "EJE Y",
          borderColor: "#8e5ea2",
          fill: false
        }, {
          data: [],
          label: "EJE Z",
          borderColor: "#3cba9f",
          fill: false
        },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Datos del Giroscopio respecto el tiempo'
        }
      }
    });

    set_grafica_gi(giro);
    var mag = new Chart(document.getElementById("line-chart-mag"), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "EJE X",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [],
          label: "EJE Y",
          borderColor: "#8e5ea2",
          fill: false
        }, {
          data: [],
          label: "EJE Z",
          borderColor: "#3cba9f",
          fill: false
        },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Datos del Magnetometro respecto el tiempo'
        }
      }
    });

    set_grafica_mag(mag);

    var acc = new Chart(document.getElementById("line-chart-ace"), {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "EJE X",
            borderColor: "#3cba9f",
            fill: false
          }, {
            data: [],
            label: "EJE Y",
            borderColor: "#e8c3b9",
            fill: false
          }, {
            data: [],
            label: "EJE Z",
            borderColor: "#c45850",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Datos del Acelerometro respecto el tiempo'
        }
      }
    });
    set_grafica_ace(acc);

    var pre_alt = new Chart(document.getElementById("presion-altura"), {
      type: 'line',
      data: {
        labels: [], // altura
        datasets: [{
          data: [], // presion
          label: "Pascales vs Mts",
          borderColor: "#3e95cd",
          fill: false
        },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    });
    set_grafica_alt_pre(pre_alt);

  
      
    




    // THREE JS
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color("rgb(15, 23, 42)");
    const camera = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    document.getElementById('container').appendChild(renderer.domElement);

    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32, 1, true); // Añade más segmentos para suavizar
    const material = new THREE.MeshPhongMaterial({ color: 0xffc600 });

    const cylinder = new THREE.Mesh(geometry, material);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiente
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Luz direccional
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
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
    // console.log("INIT");

    setInterval(() => {
      getData();


    }, (500));
  }, [])
  // console.log(temp);
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
  // console.log(parseFloat(temp))
  useEffect(() => {
    if (grafica1) {
      grafica1.data.datasets[0].data[0] = parseFloat(co);
      grafica1.data.datasets[0].data[1] = parseFloat(alcohol);
      grafica1.data.datasets[0].data[2] = parseFloat(tolueno);
      grafica1.data.datasets[0].data[3] = parseFloat(nh4);
      grafica1.data.datasets[0].data[4] = parseFloat(acetona);
      grafica1.update();
    }
  }, [co]);

  
  useEffect(() => {
    // Update the chart data when the 'temp' value changes
    chartOptions.series[0].data[0] = parseFloat(temp);
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: chartOptions.series, // Update the series data
    }));
  }, [temp]);
  
  useEffect(() => {
    if (grafica_gi) {
      grafica_gi.data.labels = segundos
      grafica_mag.data.labels = segundos
      grafica_ace.data.labels = segundos
      // console.log(grafica_gi)
    }
  }, [segundos]);
  
  useEffect(() => {
    if(grafica_alt_pre){
      if (grafica_alt_pre.data.labels.length < 20) {
        // console.log(grafica_gi.data.labels.length)
        grafica_alt_pre.data.labels = [...grafica_alt_pre.data.labels, alt]
      }
      else{
        grafica_alt_pre.data.labels = [...grafica_alt_pre.data.labels.slice(1), alt]
      }
      grafica_alt_pre.update()
    }

  }, [alt])

  useEffect(() => {
    if(grafica_alt_pre){
      if (grafica_alt_pre.data.datasets[0].data.length < 20) {
        // console.log(grafica_alt_pre.data.datasets[0].data.length)
        grafica_alt_pre.data.datasets[0].data = [...grafica_alt_pre.data.datasets[0].data, pre]
      }
      else {
        grafica_alt_pre.data.datasets[0].data = [...grafica_alt_pre.data.datasets[0].data.slice(1), pre]
      }
      grafica_alt_pre.update()
    }
  }, [pre])

  useEffect(() => {
    if (grafica_gi) {
      if (grafica_gi.data.datasets[0].data.length < 5) {
        grafica_gi.data.datasets[0].data = [...grafica_gi.data.datasets[0].data, mpu_giro[0]]
        grafica_gi.data.datasets[1].data = [...grafica_gi.data.datasets[1].data, mpu_giro[1]]
        grafica_gi.data.datasets[2].data = [...grafica_gi.data.datasets[2].data, mpu_giro[2]]
      }
      else {
        grafica_gi.data.datasets[0].data = [...grafica_gi.data.datasets[0].data.slice(1), mpu_giro[0]]
        grafica_gi.data.datasets[1].data = [...grafica_gi.data.datasets[1].data.slice(1), mpu_giro[1]]
        grafica_gi.data.datasets[2].data = [...grafica_gi.data.datasets[2].data.slice(1), mpu_giro[2]]
      }
      grafica_gi.update();
      // console.log(segundos)
    }
  }, [mpu_giro]);
  useEffect(() => {
    if (grafica_mag) {
      if (grafica_mag.data.datasets[0].data.length < 5) {
        grafica_mag.data.datasets[0].data = [...grafica_mag.data.datasets[0].data, mpu_mag[0]]
        grafica_mag.data.datasets[1].data = [...grafica_mag.data.datasets[1].data, mpu_mag[1]]
        grafica_mag.data.datasets[2].data = [...grafica_mag.data.datasets[2].data, mpu_mag[2]]
      }
      else {
        grafica_mag.data.datasets[0].data = [...grafica_mag.data.datasets[0].data.slice(1), mpu_mag[0]]
        grafica_mag.data.datasets[1].data = [...grafica_mag.data.datasets[1].data.slice(1), mpu_mag[1]]
        grafica_mag.data.datasets[2].data = [...grafica_mag.data.datasets[2].data.slice(1), mpu_mag[2]]
      }
      grafica_mag.update();
      // console.log(segundos)
    }
  }, [mpu_mag]);
  useEffect(() => {
    if (grafica_ace) {
      if (grafica_ace.data.datasets[0].data.length < 5) {
        grafica_ace.data.datasets[0].data = [...grafica_ace.data.datasets[0].data, mpu_ace[0]]
        grafica_ace.data.datasets[1].data = [...grafica_ace.data.datasets[1].data, mpu_ace[1]]
        grafica_ace.data.datasets[2].data = [...grafica_ace.data.datasets[2].data, mpu_ace[2]]
      }
      else {
        grafica_ace.data.datasets[0].data = [...grafica_ace.data.datasets[0].data.slice(1), mpu_ace[0]]
        grafica_ace.data.datasets[1].data = [...grafica_ace.data.datasets[1].data.slice(1), mpu_ace[1]]
        grafica_ace.data.datasets[2].data = [...grafica_ace.data.datasets[2].data.slice(1), mpu_ace[2]]
      }
      grafica_ace.update();
      // console.log(segundos)
    }
  }, [mpu_ace]);


  return (
    <div className="container text-white mx-auto">
      {/*THREE JS*/}
      {/*<div className=" flex items-center justify-center">
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
  </div>*/}
      <div className="grid grid-cols-2 border-gray-200">

        <div className="border-2 rounded-xl" id="container"></div>

        {lat != "" &&
          <div className="w-[36rem] h-96 mx-auto border-4 rounded-xl">
            <Map latitud={lat} longitud={long}></Map>
          </div>
        }

      </div>


      {/* GRÁFICOS */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center text-md">GASES (PPM)</a>
          <canvas id="bar-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center ">PRESION VS ALTURA</a>
          <canvas id="presion-altura" width="800" height="450"></canvas>
        </div>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">


        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center ">GIROSCOPIO</a>
          <canvas id="line-chart-giroscopio" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center ">ACELEROMETRO</a>
          <canvas id="line-chart-ace" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center ">MAGNETOMETRO</a>
          <canvas id="line-chart-mag" width="800" height="450"></canvas>
        </div>



        {/* <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 3</a>
          <canvas id="doughnut-chart" width="800" height="450"></canvas>
        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">GRÁFICO 4</a>
          <canvas id="mixed-chart" width="800" height="450"></canvas>
        </div> */}


      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200 mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">TEMPERATURA (C)</a>
          <div className="flex h-full items-center text-center justify-center" width="800" height="450">
            <h2 className="flex justify-center text-8xl text-center my-10">{400}°</h2>
          </div>


        </div>
        <div className="border-2 rounded-xl p-4 text-center">
          <a className="text-center">NIVEL DE CO2</a>
          <div className="flex h-full items-center text-center justify-center" width="800" height="450">
            <h2 className="flex justify-center text-8xl text-center my-auto">{400+" PPM"}</h2>
          </div>
          {/* <GaugeChart id="gauge-chart4"
            nrOfLevels={10}
            arcPadding={0.1}
            cornerRadius={3}
            percent={getCo2Percentage()}
          /> */}

        </div>
      </div>
    </div>
  )
}