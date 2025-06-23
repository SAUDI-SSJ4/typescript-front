function Classes() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">لا يوجد فصل محدد</span>
      </div>

      <div className="flex -space-x-2 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white"
            style={{
              backgroundColor: [
                "#ef4444",
                "#f97316",
                "#eab308",
                "#22c55e",
                "#3b82f6",
              ][i - 1],
            }}
          />
        ))}
        <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-xs text-gray-600">10+</span>
        </div>
      </div>
    </div>
  );
}
export default Classes;
