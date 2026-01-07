import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()

    const [agenda, setAgenda] = useState([])
    console.log(agenda)
    const slug = "miguel321654987"

    useEffect(() => {
        // 1. Comoprobar si la agenda existe
        const inicializarAgenda = async () => await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
            .then(response => {
                if (response.status === 404) {
                    // 2. Si NO existe (404), la CREAMOS. Tras crearla, la agenda estará vacía
                    fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    })
                    setAgenda([])
                }
            });
        // Si la agenda ya existía, pedimos los contactos
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
            .then(response => response.json())
            .then(data => {
                // Seteamos el listado (manejando si viene de la creación o de la consulta)
                setAgenda(data.contacts || []);
            })
            .catch(error => console.error("Error en el proceso:", error));

        inicializarAgenda();

    }, [slug]);

    // Función para eliminar el contacto de la agenda
    const eliminarContacto = async (id) => {
        // 1. Añadimos el ID a la URL
        await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: "DELETE"
        });

        // 2. Metemos el setAgenda DENTRO de las llaves
        setAgenda(agenda.filter(item => item.id !== id));
    };

    return (
        <div className="me-5">

            <div className="m-auto text-end">
                <Link to = "/formulario" >
                    <button className="btn btn-primary bg-success">Añadir nuevo contacto</button>
                </Link>
            </div>

            <ul className="list-group">
                {agenda && agenda.length > 0 ? (
                    agenda.map((item, id) => (
                        <li className="list-group-item" key={item.id || index}>
                            <div className="row justify-content-between align-items-center p-2">
                                <div className="col-2">
                                    <img
                                        src="https://media.istockphoto.com/id/1386479313/es/foto/feliz-mujer-de-negocios-afroamericana-millennial-posando-aislada-en-blanco.jpg?b=1&s=612x612&w=0&k=20&c=XMcib8KlLL3JbRmtHXjJDLeathX-IR3eH-4P76IG_Po="
                                        alt="Foto de perfil"
                                        className="ImagenContacto rounded-circle img-fluid"
                                    />
                                </div>

                                <div className="col-8">
                                    <p className="lead mb-1">
                                        {/* USAMOS 'item' (el contacto actual del bucle) */}
                                        <strong>{item.name}</strong>
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="fas fa-map-marker-alt me-2"></i>
                                        {item.address}
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="fas fa-phone me-2"></i>
                                        {item.phone}
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="fas fa-envelope me-2"></i>
                                        {item.email}
                                    </p>
                                </div>

                                <div className="col-2 text-end">
                                    <Link to = {`/formulario/${item.id}`} className="btn btn-sm btn-link text-secondary me-2">
                                        <i className="fas fa-pencil-alt"></i>
                                    </Link>
                                    <button className="btn btn-sm btn-link text-danger"
                                        onClick={() => eliminarContacto(item.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="p-3">No hay contactos en la agenda.</p>
                )}
            </ul>

        </div>
    );
}