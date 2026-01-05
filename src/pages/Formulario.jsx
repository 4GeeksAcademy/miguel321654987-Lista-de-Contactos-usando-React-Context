 import { useState } from 'react';

export const Formulario = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica para enviar los datos a una API (fetch)
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h2>Add a new contact</h2>

      <div className="formGroup">
        <label htmlFor="fullName" className="label">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
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
        <label htmlFor="phone" className="label">Phone</label>
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
        <label htmlFor="address" className="label">Address</label>
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
        save
      </button>

      <a href="#" className="link">or get back to contacts</a>
    </form>
  );
};


