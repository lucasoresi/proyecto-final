import { useEffect, useMemo, useState } from "react";
import supabase from "@/config/spabaseClient";

interface Turno {
  id: number;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  created_by?: string | null;
}

const TurnosPublic = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const todayISO = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      setError(null);
      // Trae turnos desde hoy en adelante, ordenados por fecha y hora
      const { data, error } = await supabase
        .from("turnos")
        .select("id, fecha, hora, created_by")
        .gte("fecha", todayISO)
        .order("fecha", { ascending: true })
        .order("hora", { ascending: true })
        .limit(10);

      if (error) {
        setError("No se pudieron cargar los turnos.");
      } else if (data) {
        setTurnos(data as unknown as Turno[]);
      }
      setLoading(false);
    };

    fetchTurnos();
  }, [todayISO]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-6">Próximos turnos reservados</h2>
        {loading && <p className="text-muted-foreground">Cargando turnos…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && turnos.length === 0 && (
          <p className="text-muted-foreground">Aún no hay turnos reservados próximos.</p>
        )}
        {!loading && !error && turnos.length > 0 && (
          <ul className="space-y-3">
            {turnos.map((t) => (
              <li key={t.id} className="border rounded px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {t.fecha} · {t.hora}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TurnosPublic;
