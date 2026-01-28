export function CarRentMeta({ meta }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-2">Vehicle Information</h3>

      <p><b>Type:</b> {meta?.vehicle_type}</p>
      <p><b>Rate:</b> {meta?.daily_rate} {meta?.currency}</p>

      {/* Specifications */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(meta?.specifications || {}).map(([k, v]: any) => (
            <div key={k} className="border p-3 rounded-lg">
              <p className="font-medium capitalize">{k.replace("_", " ")}</p>
              <p className="text-sm text-gray-500">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Features</h3>
        <div className="flex flex-wrap gap-2">
          {meta?.features?.map((f: string, i: number) => (
            <span key={i} className="px-3 py-1 border rounded-full text-sm">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Policies</h3>
        <div className="border p-4 rounded-xl space-y-2">
          <p>Minimum Age: {meta?.policies?.minimum_age}</p>
          <p>Deposit Required: {meta?.policies?.deposit_required ? "Yes" : "No"}</p>
          <p>Deposit Amount: {meta?.policies?.deposit_amount}</p>
          <p>Cancellation: {meta?.policies?.cancellation}</p>
          <p>Fuel Policy: {meta?.policies?.fuel_policy}</p>
        </div>
      </div>
    </div>
  );
}
