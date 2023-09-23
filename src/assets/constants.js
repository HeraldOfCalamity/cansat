// { id: "0", text: 'Inicio', href: '#', active: true, type: 'link', enabled: true },
//     {
//         id: "1",
//         text: 'Productos',
//         href: '#',
//         type: "dropdown",
//         enabled: true,
//         options: [
//             { id: "1", text: 'Accesorios', href: '#', active: false, type: "link", enabled: true },
//             { id: "2", text: 'Luminarias', href: '#', active: false, type: "link", enabled: true },
//             { id: "3", text: 'Domotica', href: '#', active: false, type: "link", enabled: true },
//             { id: "4", text: 'Robotica', href: '#', active: false, type: "link", enabled: true },
//             { id: "5", type: 'line' },
//             { id: "6", text: 'Otros', href: '#', active: false, type: "link", enabled: true },
//         ]
//     },
export const navOptions = [
    {id:'0', text:'Inicio', href:'/', active:true, type: 'link', enabled: true},
    {id:'1', text:'Info IA', href:'/ia', active:false, type: 'link', enabled: true},
]
export const componentList = [
    {id:'0', img:'src/assets/images/esp32-cam.webp', title:'esp32-cam', desc:'ESP32-CAM, es un dispositivo que puede llamarse un todo en uno. Aparte de la conectividad Wifi y Bluetooth que viene de fábrica, pines GPIO, se le han añadido dos opciones más. Lleva integrado una pequeña cámara de video y una conexión para una tarjeta MicroSD, donde podremos almacenar fotos o videos.'},
    {id:'1', img:'src/assets/images/gy-91.webp', title:'Gy-91 mpu9250 y bmp280', desc:'Este módulo integra el IMU MPU9250 y el barómetro BMP280, logrando un total de 10 grados de libertad (DoF) y contiene todo lo necesario para realizar rastreo de movimiento espacial de un Drone o UAV. Combina un giroscopio de 3 ejes, un acelerómetro de 3 ejes, un magnetómetro de 3 ejes y un altímetro en un mismo chip.'},
    {id:'2', img:'src/assets/images/mq-135.webp', title:'Mq-135 ', desc:'Para la misión segundaria se emplearan los sensores Mq-135 sensor de calidad de aire, además de la Cámara que proporciona el Esp32. Estos componentes nos permitirán medir la contaminación en el aire e identificar las fuentes que las producen.'},

]