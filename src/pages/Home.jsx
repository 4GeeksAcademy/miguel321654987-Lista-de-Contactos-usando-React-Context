import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()

    const slug = "miguel321654987"

    const getContacts = async () => {
        // creamos la función para obtener los contactos, pero no la llamamos, se ejecutará luego en un useEffect 
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);

            if (!response.ok) {
                // Creamos la agenda y salimos de ESTA ejecución porque createAgenda crea la Agenda y después llamará a getContacts al terminar.
                await createAgenda();
                return;
                // De aquí saltaríamos a donde se define createAgenda
            }
            const data = await response.json();
            dispatch({
                type: 'set_contacts',
                payload: data.contacts
            });
        } catch (error) {
            console.error("Error obteniendo contactos:", error);
        }
    };

    const createAgenda = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                await getContacts();
                /* Ahora sí llamamos y obtenemos los contactos, pero llegamos aquí sólo si no existe la Agenda.
                Si existe Agenda, leería getContacts y se ejecutaría sólo en el usEffect.
                Si no existe Agenda, se ejecuta createAgenda en getContacts , y el return sale de la función (y crea la agenda y
                getContacts se ejecuta en createAgenda). Luego la creamos pero no la llamamos.
                Aunque llamemos otra vez a getContacts en useEffect, no genera bucle porque antes se llama subordinada a createAgenda.
                Si no existe Agenda (y se ejecutaría en useEffect y luego sólo 1 vez para crearla). Primero ejecuta el useEffect, y ponemos [] para 
                que no Re-ejecute al actualizar contacts.*/
            } else {
                console.error("Error en la respuesta del servidor:", response.status);
            }
        } catch (error) {
            console.error("Error al crear agenda:", error);
        }
    };

    // Llamamos a getContacts en un useEffect, se ejecutará get si la agenda ya existía inicialmente
    useEffect(() => {
        getContacts()

    }, []);

    // Función para eliminar el contacto de la agenda
    const eliminarContacto = async (id) => {
        try {
            // 1. Borrado en el Servidor (API)
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                // 2. Borrado en el Estado Global (Store)
                // Esto activará el caso 'delete_contact' en tu storeReducer
                dispatch({
                    type: 'delete_contact',
                    payload: id
                });
                console.log(`Contacto ${id} eliminado con éxito`);
            } else {
                console.error("No se pudo eliminar el contacto del servidor");
            }
        } catch (error) {
            console.error("Error de red al intentar eliminar:", error);
        }
    };


    return (
        <div className="me-5">

            <div className="m-auto text-end">
                <Link to="/formulario" >
                    <button className="btn btn-primary bg-success">Añadir nuevo contacto</button>
                </Link>
            </div>

            <ul className="list-group">

                {store.contactos && store.contactos.length > 0 ? (
                    store.contactos.map((item) => (
                        <li className="list-group-item" key={item.id}>
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
                                    <Link to={`/formulario/${item.id}`} className="btn btn-sm btn-link text-secondary me-2">
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