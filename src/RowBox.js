import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiDownload } from 'react-icons/hi';
import { BoxContext } from './TableBox.js';
import DownloadLink from './DownloadLink.js';

const RowBox = ({ entry }) => {
  const box = useContext(BoxContext);
  const dateStr = new Date(entry.date).toLocaleString();
  const admin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.username);
  const accessToEdit = admin || (user === entry.user);

  return (
    <Fragment>
      <tr className={"page-table__tr page-table__tr_" + entry.status}>
        <td><Link to={`/${box}/view/${entry.id}`}>{entry.id}</Link></td>
        <td className="page-table__td">
          <div className="page-table__td_long">{entry.subj}</div>
        </td>
        <td className="page-table__td">
          <div className="page-table__td_long">{entry.addr}</div>
        </td>
        <td className="page-table__td">{dateStr}</td>
        <td className="page-table__td">
          {entry.file ?
            <DownloadLink
              linkname={<HiDownload />}
              hash={entry.file.fsName}
              filename={entry.file.name}
            />
             : '-'}
        </td>
        <td className="page-table__td">{entry.reply || '-'}</td>
        <td className="page-table__td">
          {accessToEdit &&
            <Link to={`/${box}/edit/${entry.id}`}><HiPencil /></Link>
          }
        </td>
      </tr>
    </Fragment>
  );
};

export default RowBox;
