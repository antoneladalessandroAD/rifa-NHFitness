import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Numero from "./Numero";

function Rifa() {
  const [numeros, setNumeros] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      const snapshot = await getDocs(collection(db, "participantes"));

      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const listaCompleta = [];

      // Por ahora mostramos los primeros 100 números.
      // Después lo cambiaremos a 1000.
      for (let i = 0; i < 100; i++) {
        const numero = i.toString().padStart(3, "0");

        const participante = datos.find(
          (p) => p.numero === numero
        );

        listaCompleta.push({
          numero,
          participante,
        });
      }

      setNumeros(listaCompleta);
    }

    cargarDatos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎟️ Rifa NH Fitness</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {numeros.map((item) => (
          <div
            key={item.numero}
            onClick={() => setSeleccionado(item)}
            style={{ cursor: "pointer" }}
          >
            <Numero
              numero={item.numero}
              participante={item.participante}
            />
          </div>
        ))}
      </div>

      {seleccionado && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            maxWidth: "350px",
            background: "#fff",
          }}
        >
          <h3>Información</h3>

          <p>
            <strong>Número:</strong> {seleccionado.numero}
          </p>

          {seleccionado.participante ? (
            <>
              <p>
                <strong>Nombre:</strong>{" "}
                {seleccionado.participante.nombre}
              </p>

              <p>
                <strong>Teléfono:</strong>{" "}
                {seleccionado.participante.telefono}
              </p>
            </>
          ) : (
            <p>🟢 Número disponible</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Rifa;