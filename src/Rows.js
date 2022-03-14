import RowBox from './RowBox.js';
import RowContacts from './RowContacts.js';

const Rows = ({ rows, kind }) => {
  if (kind === 'box') {
    return rows.map((row, index) => {
      return <RowBox entry={row} key={index} />;
    });
  }

  if (kind === 'contacts') {
    return rows.map((row, index) => {
      return <RowContacts entry={row} key={index} />;
    });
  }
};

export default Rows;
