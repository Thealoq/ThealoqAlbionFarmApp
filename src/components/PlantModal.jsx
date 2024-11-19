return (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center 
    justify-center z-50">
    <div className="bg-background-light w-full max-w-md rounded-xl border border-border">
      {/* Modal Header */}
      <div className="p-5 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Ekilecek Ürün</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-lighter rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <div className="p-5">
        {/* ... modal içeriği ... */}
      </div>

      {/* Modal Footer */}
      <div className="p-5 border-t border-border">
        <button
          onClick={handlePlant}
          className="w-full px-4 py-2.5 rounded-lg transition-colors duration-200
            bg-primary-500 hover:bg-primary-600 text-white
            flex items-center justify-center gap-2"
        >
          Ürün Ek
        </button>
      </div>
    </div>
  </div>
); 