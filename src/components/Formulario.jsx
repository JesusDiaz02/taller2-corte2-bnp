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
    obtenerDatos()
})

const guardarDatos = async (e)=>{
    e.preventDefault()
    if(!nombre.trim()){
        setError('campo nombre vacio')
        return
        
    }
    if(!apellido.trim()){
        setError('campo apellido vacio')
         return
    }
    if(!musica.trim()){
        setError('campo musica vacio')
        return
        
    }
    if(!equipofutbol.trim()){
        setError('campo equipo futbol vacio')
         return
    }
    if(!pais.trim()){
        setError('campo pais vacio')
        return
    }
    try {
        const db = firebase.firestore()
        const nuevoPokemon={
            nombreNombre:nombre,
            nombreApellido:apellido,
            nombreMusica:musica,
            nombreEquipoFutbol:equipofutbol,
            nombrePais:pais
            
        }
        await db.collection('persona').add(nuevoNombre)
        setLista([...lista,
            {id:nanoid(), nombreNombre:nombre, nombreApellido: apellido, nombreMusica:musica,
                nombreEquipoFutbol:equipoFutbol, nombrePais:pais}
        ])
    } catch (error) {
        console.log(error)
    }
    setModoEdicion(false)
    setNombre('')
    setApellido('')
    setMusica('')
    setEquipoFutbol('')
    setPais('')
    setError(null)
}
    const eliminar =async(id)=>{
            try {
                const db = firebase.firestore()
                await db.collection('persona').doc(id).delete()
                const aux = lista.filter(item=>item.id !==id)
                setLista(aux)
            } catch (error) {
                console.log(error)
            }
        
    }