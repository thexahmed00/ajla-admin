export function CarDriverMeta({ meta }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-2">Car Details</h3>

      <div className="grid grid-cols-3 gap-4">
        <p className="border p-3 rounded-lg">Doors: {meta?.car_basic?.doors}</p>
        <p className="border p-3 rounded-lg">Seats: {meta?.car_basic?.seats}</p>
        <p className="border p-3 rounded-lg">Fuel: {meta?.car_basic?.fuel}</p>
      </div>

      <div className="border p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Chauffeur</h3>
        <p>Name: {meta?.chauffeur?.name}</p>
        <p>Contact: {meta?.chauffeur?.contact}</p>
      </div>
    </div>
  );
}
