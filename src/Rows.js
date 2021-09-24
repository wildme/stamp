import Row from './Row.js';

const Rows = ({ rows }) =>
  rows.map((row, index) => {
    return <Row entry={row} key={index} />;
  });
export default Rows;
