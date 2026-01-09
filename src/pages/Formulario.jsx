import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Formulario = () => {
  const { id } = useParams()
  const slug = "miguel321654987"

  const [datosContacts, setDatosContacts] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });


  // --- CARGAR DATOS SI ESTAMOS EDITANDO ---
  useEffect(() => {
    if (id) {
      // Si hay un ID en la URL, buscamos los datos de ese contacto
      fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
        .then(response => response.json())
        .then(data => {
          // Buscamos el contacto específico dentro del array de la agenda
          const contactoAEditar = data.contacts.find(c => c.id === Number(id));
          if (contactoAEditar) {
            setDatosContacts({
              name: contactoAEditar.name,
              email: contactoAEditar.email,
              phone: contactoAEditar.phone,
              address: contactoAEditar.address
            });
          }
        })
        .catch(error => console.error("Error cargando contacto:", error));
    }
  }, [id, slug]); // Se ejecuta cuando el ID cambia


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
        console.log("Éxito:", id ? "Contacto actualizado" : "Contacto creado");
        // Aquí va el siguiente paso: redirección
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
