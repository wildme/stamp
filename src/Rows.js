import RowBox from './RowBox.js';
import RowContacts from './RowContacts.js';

function handleDownload(e, hash, name) {
  e.preventDefault();
  fetch(`/api/download/${hash}`)
    .then(res => res.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectURL;
      a.download = name;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch((e) => console.error(e))
}

const Rows = ({ rows, kind }) => {
  if (kind === 'box') {
    return (
      <tbody>
        {rows.map((row, index) => {
          return <RowBox entry={row} key={index} getFile={handleDownload} />;
        })}
      </tbody>
    );
  }

  if (kind === 'contacts') {
    return (
      <tbody>
        {rows.map((row, index) => {
          return <RowContacts entry={row} key={index} />;
        })}
      </tbody>
    );
  }
};

export default Rows;
