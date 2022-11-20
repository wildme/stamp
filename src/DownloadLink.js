import { useSelector, useDispatch } from 'react-redux';

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

function updateToken(newToken, dispatch) {
  dispatch({ type: 'TOKEN', payload: { token: { string: newToken } }});
}

const DownloadLink = (props) => {
  const linkname = props.linkname;
  const hash = props.hash;
  const filename = props.filename;
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();

  const handleDownload = (e) => {
    e.preventDefault();
    const url = `/api/download/${hash}`;
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            updateToken(res.token, dispatch);
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
