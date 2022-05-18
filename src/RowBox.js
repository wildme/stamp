import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil } from 'react-icons/hi';
import i18n from 'i18next';
import { BoxContext } from './Main.js';

const RowBox = ({ entry }) => {
  const box = useContext(BoxContext);
  const dateStr = new Date(entry.date).toLocaleString(i18n.language);
  const admin = useSelector((state) => state.user.admin);
  const username = useSelector((state) => state.user.username);
  const accessToEdit = admin || (username === entry.addedBy);

  return (
    <Fragment>
      <tr className={"page-table__tr page-table__tr_" + entry.status}>
        <td><Link to={`/${box}/view/${entry.id}`}>{entry.id}</Link></td>
        <td className="page-table__td">
          <div className="page-table__td_long">{entry.subject}</div>
        </td>
        <td className="page-table__td">
          <div className="page-table__td_long">{entry.from || entry.to}</div>
        </td>
        <td className="page-table__td">{dateStr}</td>
        <td className="page-table__td">{entry.addedBy}</td>
        <td className="page-table__td">{entry.replyTo || '-'}</td>
        <td className="page-table__td">{accessToEdit &&
            <Link to={`/${box}/edit/${entry.id}`}><HiPencil /></Link>}
        </td>
      </tr>
    </Fragment>
  )
};

export default RowBox;
