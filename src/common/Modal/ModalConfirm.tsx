const ModalConfirm = ({
  title = '',
  subtitle = '',
  handleSubmit = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto bg-white sm:rounded-2xl">
        <div className="w-full">
          <div className="mx-auto my-20 max-w-[400px] m-8">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={onClose}
                className="w-full p-3 font-semibold text-white bg-black rounded-full"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="w-full p-3 font-semibold border rounded-full bg-white"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
