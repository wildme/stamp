import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil } from 'react-icons/hi';
import { BoxContext } from './Main.js';

const RowBox = ({ entry }) => {
  const box = useContext(BoxContext);
  const dateStr = new Date(entry.date).toLocaleString('ru-Ru');
  const admin = useSelector((state) => state.user.admin);
  const username = useSelector((state) => state.user.username);
  const accessToEdit = admin || (username === entry.addedBy);

  return (
    <Fragment>
      <tr className="box-item" id={entry.status}>
        <td><Link to={`/${box}/view/${entry.id}`}>{entry.id}</Link></td>
        <td><div className="long-col-tbl">{entry.subject}</div></td>
        <td><div className="long-col-tbl">{entry.from || entry.to}</div></td>
        <td>{dateStr}</td>
        <td>{entry.addedBy}</td>
        <td>{entry.replyTo || '-'}</td>
        <td>{accessToEdit &&
            <Link to={`/${box}/edit/${entry.id}`}><HiPencil /></Link> }
        </td>
      </tr>
    </Fragment>
  )
};

export default RowBox;
