import { useRef, useState, Fragment, createContext } from "react";
import {Card} from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox';
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'

const opcionesColor = [
    {label: 'Rojo', value: 'red'},
    {label: 'Amarillo', value: 'yellow'},
    {label: 'Verde', value: 'green'}
]

const Tarjeta = ()=>{
    // Variables para el form
    const[nombre, setNombre] = useState('')
    const[email, setEmail] = useState('')
    const[color, setColor] = useState(null)
    const[terminos,setTerminos] = useState(false)

    // Estados de validacion
    const[nombreValido, setNombreValido] = useState(false)
    const[emailValido, setEmailValido] = useState(false)
    const[colorValido, setColorValido] = useState(false)

    // Variable Toast
    const toast = useRef(null)

    const handleNombre = (e) =>{ // Manejador para setear y validar el nombre
        const value = e.target.value.trim() // Toma el nombre del inputtext con trim para borrar espacios
        setNombre(value)  // Lo pone en el useState nombre
        setNombreValido(value.length > 0) // Setea la validacion en true/false segun si tiene o no caracteres
    }

    const handleEmail = (e) =>{ // Manejador para setear y validar el email
        const value = e.target.value.trim()
        setEmail(value)
        setEmailValido(value.includes("@") && value.includes("."))  // Usa .includes para detectar si el string tiene @ y .
    }

    const handleColor = (e) =>{
        const value = e.target.value
        setColor(value)
        setColorValido(!!value)
    }

    const formValido = nombreValido && emailValido && colorValido && terminos

    // Funciones para resetear
    const resetearDatos = ()=>{
        setNombre('')
        setEmail('')
        setColor(null)
        setTerminos(false)
    }

    const resetearValidaciones = ()=>{
        setNombreValido(false)
        setEmailValido(false)
        setColorValido(false)
    }

    // Funcion para guardar en LocalStorage
    const guardarEnLocalStorage = (persona)=>{
        const listaExistente = localStorage.getItem('personas')
        const lista = listaExistente ? JSON.parse(listaExistente) : []
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))
        console.log(persona)
    }

    const confirmarForm = ()=>{
        Swal.fire({
            title: 'Revise que los datos sean correctos',
            text: `Nombre: ${nombre} | Email: ${email} | Color: ${color}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
        }).then((result)=>{
            if(result.isConfirmed){
                guardarEnLocalStorage({
                        nombre: nombre || 'Sin nombre',
                        email: email,
                        color,
                        aceptaTerminos: terminos,
                        createdAt: new Date()
                    })
                toast.current?.show({
                    severity:'success',
                    summary:'Guardado',
                    detail:'Tarjeta de presentación guardada'
                })
                resetearDatos()
                resetearValidaciones()
            }
        })
    }

    return(
        <Fragment>
            <Toast ref={toast}/>

            <Card title='Tarjeta de presentación'>
                <div className="p-fluid" style={{display:'grid'}}>
                    <span className="p-float-label">
                        <InputText id="nombre" value={nombre}
                        onChange={handleNombre}/>
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    <small style={{color:'red'}}>{nombreValido ? '' : 'Debe ingresar un nombre'}</small>
                    <span className="p-float-label">
                        <InputText id="email" value={email}
                        onChange={handleEmail}/>
                        <label htmlFor="nombre">Email</label>
                    </span>
                    <small style={{color:'red'}}>{emailValido ? '' : 'Debe ingresar un email válido'}</small>
                    <div>
                        <p>Color Favorito</p>
                        <SelectButton value={color}
                        onChange={handleColor}
                        options={opcionesColor}
                        />
                    </div>
                    <small style={{color:'red'}}>{colorValido ? '' : 'Debe seleccionar un color'}</small>
                    <div>
                        <Checkbox inputId="terminos"
                        checked={terminos}
                        onChange={(e) => setTerminos(e.checked)}></Checkbox>
                        <label>Acepto los términos y condiciones</label>
                    </div>
                    <small style={{color:'red'}}>{terminos ? '' : 'Debe aceptar términos y condiciones'}</small>

                    <div style={{display:"flex"}}>
                        <Button
                        label="Guardar"
                        icon='pi pi-check'
                        severity="success"
                        disabled={!formValido}
                        onClick={()=>{confirmarForm()}}
                        />
                        <Button
                        label="Limpiar"
                        icon='pi pi-eraser'
                        severity="danger"
                        onClick={()=>{
                            resetearDatos()
                            resetearValidaciones()
                        }}
                        />
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default Tarjeta