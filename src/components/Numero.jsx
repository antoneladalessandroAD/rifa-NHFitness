function Numero({ numero, participante }) {
  return (
    <button
      style={{
        width: "60px",
        height: "60px",
        margin: "5px",
        borderRadius: "10px",
        border: "none",
        background: participante ? "#e74c3c" : "#2ecc71",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {numero}
    </button>
  );
}

export default Numero;