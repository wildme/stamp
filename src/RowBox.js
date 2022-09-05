import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { HiPencil, HiDownload } from 'react-icons/hi';
import { BoxContext } from './TableBox.js';

const RowBox = ({ entry, getFile }) => {
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const box = useContext(BoxContext);
  const dateStr = new Date(entry.date).toLocaleString();
  const admin = useSelector((state) => state.user.admin);
  const username = useSelector((state) => state.user.username);
  const accessToEdit = admin || (username === entry.user);

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
            <a
              href={`/attachment/${entry.file.fsName}`}
              onClick={(e) =>
                  getFile(e, entry.file.fsName, entry.file.name, token, dispatch)
              }>
              <HiDownload />
            </a> : '-'
          }
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
