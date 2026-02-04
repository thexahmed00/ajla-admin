export function FlightsMeta({ meta }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Flight Information</h3>

      <div className="border p-4 rounded-xl">
        <p><b>Hours:</b> {meta?.open_hours}</p>
        <p><b>Languages:</b> {meta?.languages?.join(", ")}</p>
        <p><b>Service Area:</b> {meta?.service_area}</p>
        <p><b>Seat Types:</b> {meta?.seat_types?.join(", ")}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Popular Routes</h3>
        {meta?.popular_routes?.map((r: string, i: number) => (
          <p key={i} className="border p-3 rounded-lg">{r}</p>
        ))}
      </div>
    </div>
  );
}
