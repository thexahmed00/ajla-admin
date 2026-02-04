export default function JetsMeta({ meta }: any) {
  return (
    <div className="space-y-6">

      {/* HOURS */}
      {meta?.hours?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Operating Hours</h3>
          {meta.hours.map((h: any, i: number) => (
            <p key={i} className="text-sm">
              {h.name}: {h.time}
            </p>
          ))}
        </section>
      )}

      {/* LANGUAGES */}
      {meta?.languages?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Languages</h3>
          <div className="flex gap-2 flex-wrap">
            {meta.languages.map((l: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-secondary rounded-full text-sm"
              >
                {l}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* SERVICE AREA */}
      {meta.service_area?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Service Area</h3>
          <ul className="list-disc pl-5 text-sm">
            {meta.service_area.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* JET TYPES */}
      {meta.jet_types?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Jet Fleet</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {meta.jet_types.map((jet: any, i: number) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-secondary/30"
              >
                <img
                  src={jet.image}
                  alt={jet.name}
                  className="rounded-lg w-full h-40 object-cover mb-3"
                />

                <h4 className="font-semibold">{jet.name}</h4>
                <p className="text-sm">Capacity: {jet.capacity}</p>
                <p className="text-sm">Range: {jet.range}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ROUTES */}
      {meta.popular_routes?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Popular Routes</h3>
          {meta.popular_routes.map((r: any, i: number) => (
            <p key={i} className="text-sm">
              ✈️ {r.origin} → {r.destination}
            </p>
          ))}
        </section>
      )}
    </div>
  );
}
