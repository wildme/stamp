import { Link } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';

const ActionCard = (props) => {
  const path = props.path;
  const title = props.title;
  const className = props.className;
  const linkClassName = props.linkClassName;
  const iconClassName = props.iconClassName;

  return (
    <div className={className}>
      <Link
        className={linkClassName}
        to={path}>
        <div className={iconClassName}>
          <HiOutlinePlus />
        </div>
        {title}
      </Link>
    </div>
  );
};

export default ActionCard;
