function ProgressSteps({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-start">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index + 1} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
              currentStep >= index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-12 h-1 mx-2 rounded-full ${
                currentStep > index + 1 ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgressSteps;
