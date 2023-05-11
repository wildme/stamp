import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiDownload } from 'react-icons/hi';
import { BoxContext } from './TableBox.js';
import DownloadLink from './DownloadLink.js';

const RowBox = ({ entry, className }) => {
  const box = useContext(BoxContext);
  const dateStr = new Date(entry.date).toLocaleDateString();
  const admin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.username);
  const accessToEdit = admin || (user === entry.user);

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
        <td className={`${className}__td`}>{entry.reply || '-'}</td>
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
