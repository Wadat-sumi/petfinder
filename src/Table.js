const Table = ({ data }) => {
  return (
    <table className="table">
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
