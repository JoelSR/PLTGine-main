const router = require('express').Router()
const conn = require('../../dbConnection')
const util = require('util');

let id = 0;



//añade un prueba
router.post('/',(req, res)=>{
    const {id_prueba, nombre, descripcion} = req.body[0]
    let sqlPrueba = `insert into pruebas(nombre,descripcion) values ('${nombre}','${descripcion}')`

    const query = util.promisify(conn.query).bind(conn);

    conn.query(sqlPrueba, (err, rows, fields)=>{    
        if(err) throw err;
        else{
            console.log(req.body[1])
            id = rows.insertId;
            for (let index = 0; index < req.body[1].length; index++) {
                const id_pregunta = req.body[1][index];
                const pregunta    = req.body[1][index].pregunta;
                const imagen      = "file_"+req.body[1][index].imagen+".png";
                const id_parte    = req.body[1][index].id_parte
                const id_prueba   = id;
                let sqlPregunta   = `insert into preguntas(pregunta,imagen,id_prueba,id_parte) values ('${pregunta}','${imagen}','${id_prueba}','${id_parte}')`;
                conn.query(sqlPregunta, (err, rows, fields)=>{    
                    if(err) throw err;
                    else{
                        console.log(rows)
                    }
                })
            }
        }
    })
    res.json(2)
})

router.get('/', (req, res)=>{
    const {id} = req.params
    let sql = 'SELECT * FROM pruebas'    
    conn.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params
    let sql = 'DELETE from pruebas where id_prueba=?'    // Se cambia el estado del PRODUCTO CON ESE ID
    conn.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

router.get('/data/:id', (req, res)=>{
    const {id} = req.params
    let prueba = []
    let sql = 'select * from pruebas where id_prueba = ?'
    conn.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            console.log(rows)
            prueba.push(rows)
        }
    })
    let preguntas = 'select id_pregunta,pregunta,image_name,location,deltaX from imagenes,preguntas where preguntas.imagen = imagenes.image_name and preguntas.id_prueba = ?'
    conn.query(preguntas,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            console.log(rows)
            prueba.push(rows)
            res.json(prueba)
        }
    })
})

router.get('/partes', (req, res)=>{
    const {id} = req.params
    let sql = 'SELECT * FROM partes'    
    conn.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

module.exports = router;