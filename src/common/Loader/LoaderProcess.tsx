const LoaderProcess = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-index-loading">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-index-top">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-2">
            <div
              className="w-8 h-8 bg-red-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.8s', animationDelay: '-0.3s' }}
            ></div>
            <div
              className="w-8 h-8 bg-red-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.8s', animationDelay: '-0.15s' }}
            ></div>
            <div
              className="w-8 h-8 bg-red-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.8s' }}
            ></div>
          </div>
          <p className="mt-4 text-white">Memuat . . .</p>
        </div>
      </div>
    </div>
  );
};

export default LoaderProcess;
