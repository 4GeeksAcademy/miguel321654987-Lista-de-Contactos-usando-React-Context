import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Formulario = () => {
  const { id } = useParams()
  const slug = "miguel321654987"
   const navigate = useNavigate()

  const { store, dispatch } = useGlobalReducer()

  const [datosContacts, setDatosContacts] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });


  // --- CARGAR DATOS SI ESTAMOS EDITANDO ---
  useEffect(() => {
    // OPTIMIZACIÓN 2026: En lugar de hacer otro fetch, 
    // buscamos primero en el store global que ya tenemos.
    if (id && store.contactos.length > 0) {
      const contactoAEditar = store.contactos.find(contacto => contacto.id === Number(id));
      if (contactoAEditar) {
        setDatosContacts(contactoAEditar);
      }
    }
  }, [id, store.contactos]);


  // Actualizar lo que estás escribiendo en el formulario en tiempo real.
  const handleChange = (e) => {
    setDatosContacts({ ...datosContacts, [e.target.name]: e.target.value });
  };

  // Guardar el contacto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si hay id, la URL debe incluirlo, se edita con Put. Si no, es la URL general de contactos, crea el contacto con Post.
    const url = id ?
      `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`
      : `https://playground.4geeks.com/contact/agendas/${slug}/contacts`;

    // Si hay id usamos PUT (editar), si no, POST (crear)
    const metodo = id ? "PUT" : "POST";

      try {
      const response = await fetch(url, {
        method: metodo,
        body: JSON.stringify(datosContacts),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        const data = await response.json();
        
        // --- CONEXIÓN CON EL GLOBAL REDUCER ---
        if (id) {
          // Si editamos, actualizamos el contacto específico en el store
          dispatch({ type: 'update_contact', payload: data });
        } else {
          // Si creamos, añadimos el nuevo contacto al store
          dispatch({ type: 'add_contact', payload: data });
        }
         // Reseteas el useState local a blanco
        setDatosContacts({
            name: '',
            email: '',
            phone: '',
            address: ''
        });

        // --- REDIRECCIÓN ---
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h2>Añadir un nuevo contacto</h2>

      <div className="formGroup">
        <label htmlFor="name" className="label">Nombre completo</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={datosContacts.name}
          onChange={handleChange}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="email" className="label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={datosContacts.email}
          onChange={handleChange}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="phone" className="label">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter phone"
          value={datosContacts.phone}
          onChange={handleChange}
          className="inputField"
        />
      </div>

      <div className="formGroup">
        <label htmlFor="address" className="label">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address"
          value={datosContacts.address}
          onChange={handleChange}
          className="inputField"
        />
      </div>

      <button type="submit" className="saveButton">
        Guardar
      </button>

      <Link to="/">
        <span className="navbar-brand mb-0 h1">Volver a Contactos</span>
      </Link>
    </form>
  );
};
