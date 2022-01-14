import Row from './Row.js';

const Rows = ({ rows, table }) =>
  rows.map((row, index) => {
    return <Row entry={row} key={index} table={table}/>;
  });
export default Rows;
