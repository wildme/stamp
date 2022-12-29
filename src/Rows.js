import RowBox from './RowBox.js';
import RowContacts from './RowContacts.js';

const Rows = ({ rows, kind, className }) => {
  if (kind === 'box') {
    return (
      <tbody>
        {rows.map((row, index) => {
          return <RowBox entry={row} key={index} className={className} />;
        })}
      </tbody>
    );
  }

  if (kind === 'contacts') {
    return (
      <tbody>
        {rows.map((row, index) => {
          return <RowContacts entry={row} key={index} className={className} />;
        })}
      </tbody>
    );
  }
};

export default Rows;
