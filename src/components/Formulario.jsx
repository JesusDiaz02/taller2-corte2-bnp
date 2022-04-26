import React from "react";
import {firebase} from '../firebase'
import {nanoid} from 'nanoid';

const Formulario =()=>{
    const[nombre, setNombre] =React.useState('')
    const[apellido, setApellido]=React.useState('')
    const[musica, setMusica]=React.useState('')
    const[equipoFutbol, setEquipoFutbol]=React.useState('')
    const[pais, setPais]=React.useState('')
    const[lista, setLista]=React.useState([])
    const[modoEdicion, setModoEdicion]=React.useState(false)
    const[id, setId]=React.useState('')
    const[error, setError]=React.useState(null)

    React.useEffect(()=>{
     const obtenerDatos = async()=>{
        try {
            const db = firebase.firestore()
            const data = await db.collection('persona').get()
            const array = data.docs.map(item=>(
                {
                    id:item.id, ...item.data()
                }
            ))
            setLista(array)
        } catch (error) {
            console.log(error)
        }
    }