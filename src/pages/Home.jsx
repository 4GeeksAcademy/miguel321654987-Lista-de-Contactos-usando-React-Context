import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [listado, setListado] = useState([])
    console.log(listado)
    const slug = "miguel321654987"


    useEffect(() => {
        // 1. Intentamos ver si la agenda existe
        const inicializarAgenda = async () => await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
            .then(response => {
                if (response.status === 404) {
                    // 2. Si NO existe (404), la CREAMOS primero
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
                // Si la agenda ya existía, simplemente pedimos los contactos
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
    <div className="text-center mt-5">
        <div>
            <h1>
                LISTA DE CONTACTOS
            </h1>
        </div>

    </div>
);
}; 