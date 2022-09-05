import RowBox from './RowBox.js';
import RowContacts from './RowContacts.js';

function handleDownload(e, hash, name, token, dispatch) {
  e.preventDefault();
  const url = `/api/download/${hash}`;
  fetch(url, { headers: { 'Authorization': `Bearer ${token}` }})
    .then(res => {
      if (res.status === 200) {
        if (res.token) {
          dispatch({ type: 'TOKEN', payload: { token: { string: res.token } }});
        }
      return res.blob();
    }
      if (res.status === 401) {
        dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
    })
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
