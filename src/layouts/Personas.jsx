import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";

const Persona = ({nombre,email,colorFav,createdAt}) =>{
    const textColor = (colorFav === 'yellow' ? 'black' : 'white')
    return (
        <Fragment>
            <Card style={{maxWidth:'20%', backgroundColor:`${colorFav}`}}>
                <h2 style={{color:`${textColor}`}}>{nombre}</h2>
                <p style={{color:`${textColor}`}}>{email}</p>
                <p style={{color:`${textColor}`}}>{createdAt}</p>
            </Card>
        </Fragment>
    )
}

const Personas = () =>{
    const navigate = useNavigate()

    const navegador = (pagina)=>{
        navigate(`/${pagina}`)
    }

    const personas = JSON.parse(localStorage.getItem('personas')) || []

    const renderizarPersonas = (listaPersonas)=>{
        return listaPersonas.map((persona, index) => (
            <Persona
                key={index}
                nombre={persona.nombre}
                email={persona.email}
                colorFav={persona.color}
                createdAt={persona.createdAt}
            />
        ))
    }

    return (
        <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'center'}}>
            <Helmet>
                <title>Personas</title>
            </Helmet>
            <h2>Personas</h2>
            <div style={{width:'20%', display:'flex', flexDirection:'column', gap:'5px'}}>
                <button onClick={() => navegador("")}>Inicio</button>
                <button onClick={() => navegador("form")}>Nueva Ficha</button>
            </div>
            <div style={{display:'flex', gap:'5px'}}>
                {renderizarPersonas(personas)}
            </div>
        </div>
    )
}

export default Personas;