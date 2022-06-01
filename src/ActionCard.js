import { Link } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';

const ActionCard = (props) => {
  const path = props.path;
  const title = props.title;

  return (
    <div className="home-page-actions-add">
      <Link
        className="home-page-actions-add__link"
        to={path}>
        <div className="home-page-actions-add__img">
          <HiOutlinePlus />
        </div>
        {title}
      </Link>
    </div>
  );
};

export default ActionCard;
