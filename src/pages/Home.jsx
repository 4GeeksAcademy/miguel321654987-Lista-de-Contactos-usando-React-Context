import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [listado, setListado] = useState([])
    console.log(listado)
    const slug = "miguel321654987"


    useEffect(() => {
        // 1. Comoprobar si la agenda existe
        const inicializarAgenda = async () => await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
            .then(response => {
                if (response.status === 404) {
                    // 2. Si NO existe (404), la CREAMOS
                    return fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    })

                        .then(() => {
                            // 3. Una vez creada la agenda, CREAMOS el contacto
                            return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
                                method: "POST",
                                body: JSON.stringify({
                                    name: "...............",
                                    phone: "000000000",
                                    email: "@example.com",
                                    address: "........"
                                }),
                                headers: { "Content-Type": "application/json" }
                            });
                        });
                }
                // Si la agenda ya existía, pedimos los contactos
                return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
            })
            .then(response => response.json())
            .then(data => {
                // Seteamos el listado (manejando si viene de la creación o de la consulta)
                setListado(data.contacts || [data]);
            })
            .catch(error => console.error("Error en el proceso:", error));


        inicializarAgenda();
    }, [slug]);



    return (
        <div className= "me-5">
            <ul>
                <li className="list-group-item">
                    <div className="row justify-content-between align-items-center p-2">
                        {/* Columna de la Imagen */}
                        <div className="col-2">
                            <img
                                src="https://media.istockphoto.com/id/1398385367/es/foto/feliz-mujer-de-negocios-millennial-con-gafas-posando-con-las-manos-cruzadas.jpg?b=1&s=612x612&w=0&k=20&c=yeKcWYj6Tsx14UZBVZDYmSZKLEKtq6uM3RfOZjqdMWk=" // Reemplazar con la URL real o importación
                                alt="Foto de perfil"
                                className="ImagenContacto rounded-circle img-fluid"
                            />
                        </div>

                        {/* Columna de Información del Contacto */}
                        <div className="col-8">
                            <p className="lead mb-1">
                                <strong>Pedro Picapiedra</strong>
                            </p>
                            <p className="text-muted mb-1">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                Siberia
                            </p>
                            <p className="text-muted mb-1">
                                <i className="fas fa-phone me-2"></i>
                                000111000222
                            </p>
                            <p className="text-muted mb-1">
                                <i className="fas fa-envelope me-2"></i>
                               p@gmail.com
                            </p>
                        </div>

                        {/* Columna de Botones (Íconos) */}
                        <div className="col-2 text-end">
                            <Link to ="/formulario"  className="btn btn-sm btn-link text-secondary me-2">
                                <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <button  className="btn btn-sm btn-link text-danger" >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>





    );
}; 