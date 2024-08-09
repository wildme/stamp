import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiDownload } from 'react-icons/hi';
import DownloadLink from './DownloadLink.js';

const RowDirectives = ({ entry, className }) => {
  const dateStr = new Date(entry.createdAt).toLocaleDateString();
  const admin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.username);
  const accessToEdit = admin || (user === entry.user);

  return (
    <Fragment>
      <tr className={`${className}__tr ${className}__tr_` + entry.status}>
        <td>
          <Link to={`/directive/view/${entry.id}`}>
            {entry.id}-{entry.typeCode}
          </Link>
        </td>
        <td className={`${className}__td`}>
          <div className={`${className}__td_long`}>{entry.subj}</div>
        </td>
        <td className={`${className}__td`}>{dateStr}</td>
        <td className={`${className}__td`}>
          {entry.file ?
            <DownloadLink
              api={`/api/directive/download/${entry.file.fsName}`}
              linkname={<HiDownload />}
              hash={entry.file.fsName}
              filename={entry.file.name}
            />
             : '-'}
        </td>
        <td className={`${className}__td`}>
          {accessToEdit &&
            <Link to={`/directive/edit/${entry.id}`}><HiPencil /></Link>
          }
        </td>
      </tr>
    </Fragment>
  );
};

export default RowDirectives;
