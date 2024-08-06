
  "use client";
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const cellStyles = (style) => {
      return {
          fontWeight: style.font?.bold ? 'bold' : 'normal',
          fontStyle: style.font?.italic ? 'italic' : 'normal',
          textDecoration: style.font?.strike ? 'line-through' : style.font?.underline ? 'underline' : 'none',
          fontSize: `${style.font?.size || 10}px`,
          color: style.font?.color ? `#${style.font.color.indexed.toString(16).padStart(2, '0')}` : '#000',
          fontFamily: style.font?.name || 'Arial',
          backgroundColor: style.fill?.fgColor ? `#${style.fill.fgColor.indexed.toString(16).padStart(2, '0')}` : 'transparent',
          textAlign: style.alignment?.horizontal || 'left',
          verticalAlign: style.alignment?.vertical || 'top',
          border: '1px solid #ddd',
          padding: '8px',
          whiteSpace: 'nowrap'
      };
  };

  const Table = ({ data }) => {
      return (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                  {data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                          {row.map((cell, colIndex) => (
                              <td
                                  key={colIndex}
                                  style={cellStyles(cell.style)}
                                  rowSpan={cell.isMerged && cell.mergeInfo ? cell.mergeInfo.bottom - cell.mergeInfo.top + 1 : 1}
                                  colSpan={cell.isMerged && cell.mergeInfo ? cell.mergeInfo.right - cell.mergeInfo.left + 1 : 1}
                              >
                                  {cell.value || ''}
                              </td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      );
  };

  const App = () => {
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
          axios.get('/api/read-excel')
              .then(response => {
                  setData(response.data);
                  console.log(response.data);
                  
                  setLoading(false);
              })
              .catch(error => {
                  setError(error);
                  setLoading(false);
              });
      }, []);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return <Table data={data} />;
  };

  export default App;
