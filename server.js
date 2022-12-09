const Contenedor = require('./Contenedor.js');

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())

const contenedor = new Contenedor("productos.txt");

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

app.get('/productos', async (req, res) =>{
    const data = await contenedor.getAll();
    console.log(data);
    console.log('fin del get');
})

/*
app.get('/productos', (req, res) =>{
    contenedor.getAll()
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        })
})
*/
/*
app.get('/productos', async (req, res) => {
    console.log('antes de la llamada getAll')
    let objs = await contenedor.getAll();
    console.log('termino de leer');
    //res.render('home');
    console.log('despues de la llamada getAll')
    console.log(objs);
    //res.send(objs)
})
*/

app.get('/productosRandom', (req, res) => {
    res.send(frase)
})



server.on('error', error => console.log(`Error en servidor ${error}`))
