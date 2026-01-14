export function RestaurantMeta({ meta }: any) {
  return (
    <div className="space-y-6">
      {/* Hours */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
        {meta?.hours?.map((h: any, i: number) => (
          <div key={i} className="border p-3 rounded-lg">
            <p className="font-medium">{h.name}</p>
            <p className="text-sm text-gray-500">{h.time}</p>
          </div>
        ))}
      </div>

      {/* Cuisine */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Cuisine</h3>
        <p className="text-gray-600">{meta?.cuisine}</p>
      </div>

      {/* Courses & Dishes */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Menu</h3>
        {meta?.courses?.map((course: any, i: number) => (
          <div key={i} className="border p-4 rounded-xl mb-4">
            <h4 className="font-semibold text-lg mb-2">{course.name}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course?.dishes?.map((d: any, j: number) => (
                <div key={j} className="flex items-center gap-3 border p-3 rounded-lg">
                  {d.image && (
                    <img src={d.image} className="h-14 w-14 rounded-lg object-cover" />
                  )}
                  <div>
                    <p className="font-medium">{d.name}</p>
                    <p className="text-sm text-gray-500">{d.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
