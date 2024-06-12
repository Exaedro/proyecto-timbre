import { ReadlineParser, SerialPort } from "serialport";

(async () => {
    console.log(await SerialPort.list())
})()

// const port = new SerialPort({
//     path: '/dev/alarma-eestn',
//     baudRate: 9600
// })

// port.pipe(new ReadlineParser())

// port.on('data', (line) => {
//     console.log(line)
// })