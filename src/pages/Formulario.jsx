import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Formulario = () => {
const {id} = useParams

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const slug = "miguel321654987"

  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const crearContacto = async () => await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
      method: "POST",
      body: JSON.stringify(
        formData
      ),
      headers: { "Content-Type": "application/json" }
    });
    crearContacto()
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica para enviar los datos a una API (fetch)
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
