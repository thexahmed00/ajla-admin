export function HotelMeta({ meta }: any) {
  return (
    <div className="space-y-6">
      {/* Rating */}
      <h3 className="text-xl font-semibold">⭐ {meta?.star_rating} Star Hotel</h3>

      {/* Check in Out */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-xl">
          <p className="text-sm text-gray-500">Check In</p>
          <p className="font-semibold">{meta?.check_in}</p>
        </div>

        <div className="border p-4 rounded-xl">
          <p className="text-sm text-gray-500">Check Out</p>
          <p className="font-semibold">{meta?.check_out}</p>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {meta?.amenities?.map((a: any, i: number) => (
            <div key={i} className="border p-3 rounded-xl">
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-500">{a.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Rooms</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meta?.rooms?.map((room: any, i: number) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              {room.image && <img src={room.image} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <h4 className="font-semibold text-lg">{room.name}</h4>
                <p className="text-sm text-gray-500">{room.description}</p>
                <p className="font-bold mt-2">{room.price}</p>
                <p className="text-sm">{room.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
