import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiDownload } from 'react-icons/hi';
import DownloadLink from './DownloadLink.js';

const RowBox = ({ entry, className, box }) => {
  const dateStr = new Date(entry.date).toLocaleDateString();
  const admin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.username);
  const accessToEdit = admin || (user === entry.user);
  const replyToBox = (box === 'inbox') ? 'outbox' : 'inbox';

  return (
    <Fragment>
      <tr className={`${className}__tr ${className}__tr_` + entry.status}>
        <td><Link to={`/${box}/view/${entry.id}`}>{entry.id}</Link></td>
        <td className={`${className}__td`}>
          <div className={`${className}__td_long`}>{entry.subj}</div>
        </td>
        <td className={`${className}__td`}>
          <div className={`${className}__td_long`}>{entry.addr}</div>
        </td>
        <td className={`${className}__td`}>{dateStr}</td>
        <td className={`${className}__td`}>
          {entry.file ?
            <DownloadLink
              linkname={<HiDownload />}
              hash={entry.file.fsName}
              filename={entry.file.name}
            />
             : '-'}
        </td>
        <td className={`${className}__td`}>
          {entry.reply ?
              <Link to={`/${replyToBox}/view/${entry.reply}`}>{entry.reply}</Link>
              : '-'}
        </td>
        <td className={`${className}__td`}>
          {accessToEdit &&
            <Link to={`/${box}/edit/${entry.id}`}><HiPencil /></Link>
          }
        </td>
      </tr>
    </Fragment>
  );
};

export default RowBox;
