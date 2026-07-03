import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Numero from "./Numero";
import Formulario from "./Formulario";
import logo from "./logo.jpg";

function Rifa() {
  const [numeros, setNumeros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const snapshot = await getDocs(collection(db, "participantes"));

    const participantes = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));

    const lista = [];

    for (let i = 0; i < 100; i++) {
      const numero = i.toString().padStart(3, "0");

      const participante = participantes.find(
        (p) => p.numero === numero
      );

      lista.push({
        numero,
        participante,
      });
    }

    setNumeros(lista);
  }

  async function guardarParticipante(datos) {
    await addDoc(collection(db, "participantes"), datos);

    setMostrarFormulario(false);
    setSeleccionado(null);

    await cargarDatos();
  }

  async function editarParticipante(id, datos) {
    const referencia = doc(db, "participantes", id);

    await updateDoc(referencia, {
      nombre: datos.nombre,
      telefono: datos.telefono,
    });

    setMostrarFormulario(false);
    setSeleccionado(null);

    await cargarDatos();
  }

  const numerosFiltrados = numeros.filter((item) => {
    const texto = busqueda.toLowerCase();

    return (
      item.numero.includes(texto) ||
      item.participante?.nombre?.toLowerCase().includes(texto) ||
      item.participante?.telefono?.includes(texto)
    );
  });

  const vendidos = numeros.filter((n) => n.participante).length;
  const disponibles = numeros.length - vendidos;

  return (
    <div className="rifa-container">
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <img
          src={logo}
          alt="NH Fitness"
          style={{
            width: "140px",
            marginBottom: "15px",
          }}
        />

        <h1
          style={{
            marginBottom: "8px",
            color: "#1f2937",
            fontSize: "36px",
          }}
        >
          NH Fitness
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "18px",
            margin: 0,
          }}
        >
          Sistema de Administración de Rifas
        </p>
      </div>

      <div className="panel">
        <div className="card vendidos">
          <h3>🎟 Vendidos</h3>
          <h2>{vendidos}</h2>
        </div>

        <div className="card disponibles">
          <h3>🟢 Disponibles</h3>
          <h2>{disponibles}</h2>
        </div>
      </div>

      <input
        className="buscador"
        type="text"
        placeholder="🔍 Buscar por número, nombre o teléfono..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="grilla">
      {numerosFiltrados.map((item) => (
          <div
            key={item.numero}
            onClick={() => {
              setSeleccionado(item);
              setMostrarFormulario(true);
            }}
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
        <div className="ficha">
          {mostrarFormulario ? (
            <Formulario
              numero={seleccionado.numero}
              participante={seleccionado.participante}
              onGuardar={guardarParticipante}
              onEditar={editarParticipante}
              onCancelar={() => {
                setMostrarFormulario(false);
                setSeleccionado(null);
              }}
            />
          ) : (
            <>
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

                  <button
                    onClick={() => setMostrarFormulario(true)}
                    style={{
                      marginTop: "15px",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#3498db",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Editar participante
                  </button>
                  </>
              ) : (
                <Formulario
                  numero={seleccionado.numero}
                  participante={null}
                  onGuardar={guardarParticipante}
                  onEditar={editarParticipante}
                  onCancelar={() => {
                    setMostrarFormulario(false);
                    setSeleccionado(null);
                  }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Rifa;