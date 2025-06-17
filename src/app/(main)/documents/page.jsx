// File: AcknowledgmentsGrid.jsx

import React from 'react';

const AcknowledgmentsGrid = () => {
  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    type: index % 2 === 0 ? 'pdf' : 'excel',
  }));

  return (
    <div className="p-6">
      {/* <h2 className="text-lg font-bold mb-4">View</h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white p-6 rounded shadow-md">
        {items.map((item, i) => (
          <button
            key={i}
            className="flex items-center justify-start gap-2 px-4 py-6  border rounded-md hover:bg-gray-100 transition"
          >
            {item.type === 'pdf' ? (
              <img
                src="https://img.icons8.com/color/48/000000/pdf.png"
                alt="PDF"
                className="w-12 h-12"
              />
            ) : (
              <img
                src="https://img.icons8.com/color/48/000000/ms-excel.png"
                alt="Excel"
                className="w-12 h-12"
              />
            )}
            <span>Acknowledgments</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AcknowledgmentsGrid;
