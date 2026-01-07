import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Formulario = () => {
  const { id } = useParams()
  const slug = "miguel321654987"

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });


  // --- EFECTO PARA CARGAR DATOS SI ESTAMOS EDITANDO ---
  useEffect(() => {
    if (id) {
      // Si hay un ID en la URL, buscamos los datos de ese contacto
      fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
        .then(response => response.json())
        .then(data => {
          // Buscamos el contacto específico dentro del array de la agenda
          const contactoAEditar = data.contacts.find(c => c.id === Number(id));
          if (contactoAEditar) {
            setFormData({
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




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si hay id, la URL debe incluirlo. Si no, es la URL general de contactos.
    const url = id
      ? `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`
      : `https://playground.4geeks.com/contact/agendas/${slug}/contacts`;

    // Si hay id usamos PUT (editar), si no, POST (crear)
    const metodo = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: metodo,
        body: JSON.stringify(formData),
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
          value={formData.name}
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
          value={formData.email}
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
          value={formData.phone}
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
          value={formData.address}
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
