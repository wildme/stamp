import { useDispatch } from 'react-redux';

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

const DownloadLink = (props) => {
  const linkname = props.linkname;
  const api = props.api;
  const hash = props.hash;
  const filename = props.filename;
  const dispatch = useDispatch();

  const handleDownload = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('at');
    fetch(api, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            localStorage.setItem('at', res.token);
          }
          return res.blob();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
      })
      .then(blob => {
        if (blob !== 1) {
          const objectURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = objectURL;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(a.href);
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <a
      href={`/attachment/${hash}`}
      onClick={(e) => handleDownload(e)}>
      {linkname}
    </a>
  );
};
export default DownloadLink;
