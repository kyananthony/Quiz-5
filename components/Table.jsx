import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 font-semibold text-sm text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {column.render ? column.render(item) : item[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;