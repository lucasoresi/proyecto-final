import { useEffect, useMemo, useState } from "react";
import HeaderAdmin from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import supabase from "@/config/spabaseClient";
import { Calendar } from "@/components/ui/calendar";

interface Turno {
  id: number;
  fecha: string; // ISO date string (YYYY-MM-DD)
  hora: string;  // HH:mm
  created_by?: string | null;
}

const CalendarioAdmin = () => {
  const [fecha, setFecha] = useState<Date | undefined>(new Date());
  const [hora, setHora] = useState<string>("");
  // Nota eliminada
  const [loading, setLoading] = useState<boolean>(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);

  const fechaISO = useMemo(() => {
    if (!fecha) return "";
    // keep only date part YYYY-MM-DD
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [fecha]);

  const cargarTurnos = async () => {
    if (!fechaISO) return;
    const { data, error } = await supabase
      .from("turnos")
      .select("id, fecha, hora, created_by")
      .eq("fecha", fechaISO)
      .order("hora", { ascending: true });
    if (!error && data) setTurnos(data as unknown as Turno[]);
  };

  useEffect(() => {
    cargarTurnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaISO]);

  const crearTurno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fechaISO || !hora) return;
    setLoading(true);
    const created_by = localStorage.getItem("userEmail") ?? null;
    const { error } = await supabase.from("turnos").insert({
      fecha: fechaISO,
      hora,
      created_by,
    });
    setLoading(false);
    if (!error) {
      setHora("");
      await cargarTurnos();
    } else {
      // simple fallback, project already uses toasts elsewhere
      console.error("Error al crear turno", error);
      alert("Error al crear turno. Intente nuevamente.");
    }
  };

  const eliminarTurno = async (id: number) => {
    const { error } = await supabase.from("turnos").delete().eq("id", id);
    if (!error) await cargarTurnos();
  };

  return (
    <div className="min-h-screen">
      <HeaderAdmin />
      <main className="container mx-auto px-4 pt-28 pb-12 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6">Calendario de Turnos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Calendar
              mode="single"
              selected={fecha}
              onSelect={setFecha}
              className="rounded-md border"
            />
          </div>
          <div>
            <form onSubmit={crearTurno} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Hora</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccioná un horario</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Crear turno"}
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-3">Turnos del día</h2>
              {turnos.length === 0 && (
                <p className="text-muted-foreground">No hay turnos para esta fecha.</p>
              )}
              <ul className="space-y-2">
                {turnos.map((t) => (
                  <li key={t.id} className="border rounded px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t.hora}</p>
                    </div>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => eliminarTurno(t.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalendarioAdmin;
