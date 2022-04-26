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
     const auxEditar =(item)=>{
        setNombre(item.nombreNombre)
        setApellido(item.nombreApellido)
        setMusica(item.nombreMusica)
        setEquipoFutbol(item.nombreEquipoFutbol)
        setPais(item.nombrePais)
        setModoEdicion(true)
        setId(item.id)
    }
    const editar=async e=>{
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
        if(!equipoFutbol.trim()){
            setError('campo equipo futbol vacio')
             return
        }
        if(!pais.trim()){
            setError('campo pais vacio')
            return
        }
        try {
            const db = firebase.firestore()
            await db.collection('persona').doc(id).update({
                nombreNombre:nombre,
                nombreApellido:apellido,
                nombreMusica:musica,
                nombreEquipoFutbol:equipoFutbol,
                nombrePais:pais
                
            })
            
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
    const cancelar=()=>{
        setModoEdicion(false)
    	setNombre('')
    	setApellido('')
    	setMusica('')
    	setEquipoFutbol('')
    	setPais('')
    	setError(null)
   }
   return(
    <div className="container mt-5">
        <h1 className="text-center">HONORIFICO</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado Personas</h4>
                <ul className="list-group">
                {   
                        lista.map((item)=>(
                            <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.nombreNombre}-{item.nombreApellido}-{item.nombreMusica}-{item.nombreEquipoFutbol}-
                            {item.nombrePais}</span>
                            <button className="btn btn-danger btn-sm float-end mx-2"onClick={()=>eliminar(item.id)}>Eliminar</button>
                                <button className="btn btn-warning btn-sm float-end"onClick={()=>auxEditar(item)}>Editar</button>
                            </li>
                        ))

                }                  
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar pokemon':'Agregar persona'
                    }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ?<span className="text-danger">{error}</span>:null
                        }
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese Persona
                        onChange={(e)=>setNombre(e.target.value)}
                        value={nombre}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese Apellido"
                        onChange={(e)=>setApellido(e.target.value)}
                        value={apellido}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese musica"
                        onChange={(e)=>setMusica(e.target.value)}
                        value={musica}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese equipo futbol"
                        onChange={(e)=>setEquipoFutbol(e.target.value)}
                        value={equipoFutbol}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese pais"
                        onChange={(e)=>setPais(e.target.value)}
                        value={pais}
                        />
                        
                        {
                            !modoEdicion?(
                                <button className="btn btn-primary btn-block" type="submit">Agregar</button>
                            )
                            :
                            (<>

                            <button className="btn btn-warning btn-block" type="submit">Editar</button>
                            <button className="btn btn-dark btn-block mx-2" onClick={()=>cancelar}>Cancelar</button>
                            </>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Formulario