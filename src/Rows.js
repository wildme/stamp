import Row from './Row.js';

const Rows = ({ rows }) =>
  rows.map((row) => {
    return <Row entry={row} />;
  });
export default Rows;
