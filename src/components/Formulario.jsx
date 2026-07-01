import { useState } from "react";

function Formulario({
  numero,
  participante,
  onGuardar,
  onEditar,
  onCancelar,
}) {
  const [nombre, setNombre] = useState(
    participante?.nombre || ""
  );

  const [telefono, setTelefono] = useState(
    participante?.telefono || ""
  );

  function guardar() {
    if (nombre.trim() === "" || telefono.trim() === "") {
      alert("Completá todos los campos");
      return;
    }

    const datos = {
      numero,
      nombre,
      telefono,
    };

    if (participante) {
      onEditar(participante.id, datos);
    } else {
      onGuardar(datos);
    }

    setNombre("");
    setTelefono("");
  }

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "20px",
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        maxWidth: "400px",
      }}
    >
      <h3>
        {participante
          ? `Editar número ${numero}`
          : `Vender número ${numero}`}
      </h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={guardar}
        style={{
          padding: "10px 20px",
          background: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {participante ? "Guardar cambios" : "Guardar"}
      </button>

      <button
        onClick={onCancelar}
        style={{
          padding: "10px 20px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Cancelar
      </button>
    </div>
  );
}

export default Formulario;