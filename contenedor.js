const { info, Console } = require('console');
const fs = require('fs');
const { open, close } = require('node:fs');

class Contenedor{
    constructor(path){
        this.path = path;
    }

    async save(objeto){
        const objs = await this.getAll();

        if (objs.length > 0) {
            const objLast = objs[objs.length - 1];

            const newObj = {
                title : objeto.titles,
                price : objeto.price,
                thumbnail : objeto.thumbnail,
                id : objLast.id + 1
            }

            objs.push(newObj);
        }else{
            const newObj = {
                title : objeto.titles,
                price : objeto.price,
                thumbnail : objeto.thumbnail,
                id : 1
            }

            objs.push(newObj);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2))
            .then(() => console.log('Objeto guardado'))
            .catch(error => console.log('Error en save' + error))
    }

    async getById(id){
        const objs = await this.getAll();
        const buscando = objs.find(ob => ob.id === id);
        return buscando;
    }

    async getAll(){
        
        //let objs = [];
        try{
            /*
            console.log('estoy leyendo')
            const objs = await fs.readFile("productos.txt", 'utf-8');
            console.log('dentrooooo');
            return JSON.parse(objs);
            */
            /*
            const obj = new Promise(res =>{
                setTimeout(() =>{
                    const objs = fs.readFile("productos.txt", 'utf-8');
                    res(objs);
                }, 3000)
            })

            console.log(JSON.parse(obj));
            return JSON.parse(obj);
            */
            
            const objs = await fs.readFile("productos.txt", 'utf-8', function(err, data){
                if(err) console.log('Error en read ' + err);

                console.log('dentrooooo')
                console.log(data);
                //objs = JSON.parse(data);
                return JSON.parse(data);
            });
            
            /*
            fs.promises.readFile("productos.txt".toString())
                .then(contenido => {
                    console.log('lectura exitosa de info.txt')
                    const info = JSON.parse(contenido)
                    console.log(info)
                    return info;
                }).catch(error => console.log(error))
            */
            console.log('despues de leer aaaaaa')
            //console.log(objs);
            //return JSON.parse(objs);
        }catch(error){
            console.log('Error en getAll ' + error);
            return [];
        }
        //console.log(objs);
        //return objs;

        
        /*open('productos.txt', 'r', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('myfile does not exist');
                    return;
                }
                
                throw err;
            }
            
            try {
                readMyData(fd);
            } finally {
                close(fd, (err) => {
                    if (err) throw err;
                });
            }
        });*/
    }

    async deleteById(id){
        let info = [];
        const objs = await this.getAll();
        info = objs.filter((ob) => ob.id !== id);

        await fs.promises.writeFile(this.path, JSON.stringify(info, null, 2))
            .then(() => console.log('Objeto eliminado'))
            .catch(error => console.log(error))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.path, '')
            .then(() => console.log('Archivo vacio'))
            .catch(error => console.log(error))
    }
}

module.exports = Contenedor;