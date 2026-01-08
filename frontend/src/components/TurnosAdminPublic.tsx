import { useEffect, useMemo, useState } from "react";
import supabase from "@/config/spabaseClient";

interface Turno {
  id: number;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  created_by?: string | null;
}

// Muestra turnos creados por el usuario Admin para que los clientes los vean
const TurnosAdminPublic = () => {
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

  // Email del administrador
  const adminEmail = "equipopsipbbca@gmail.com";

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("turnos")
        .select("id, fecha, hora, created_by")
        .eq("created_by", adminEmail)
        .gte("fecha", todayISO)
        .order("fecha", { ascending: true })
        .order("hora", { ascending: true })
        .limit(10);

      if (error) {
        setError("No se pudieron cargar los turnos del administrador.");
      } else if (data) {
        setTurnos(data as unknown as Turno[]);
      }
      setLoading(false);
    };

    fetchTurnos();
  }, [adminEmail, todayISO]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-lg border p-6 bg-background">
          <h2 className="text-2xl font-semibold mb-2">Grupos de estudio</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Fechas disponibles.
          </p>

          {loading && <p className="text-muted-foreground">Cargando turnos…</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && turnos.length === 0 && (
            <p className="text-muted-foreground">Aún no hay turnos publicados.</p>
          )}
          {!loading && !error && turnos.length > 0 && (
            <ul className="space-y-3">
              {turnos.map((t) => (
                <li key={t.id} className="border rounded px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {(() => {
                        const parts = t.fecha.split("-");
                        if (parts.length === 3) {
                          const y = Number(parts[0]);
                          const m = Number(parts[1]) - 1;
                          const d = Number(parts[2]);
                          return new Date(y, m, d).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          });
                        }
                        return t.fecha;
                      })()} · {t.hora}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default TurnosAdminPublic;
