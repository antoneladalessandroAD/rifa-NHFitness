function Numero({ numero, participante }) {
  const vendido = !!participante;

  return (
    <button
      style={{
        width: "60px",
        height: "60px",
        border: "none",
        borderRadius: "10px",
        backgroundColor: vendido ? "#e74c3c" : "#2ecc71",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {numero}
    </button>
  );
}

export default Numero;