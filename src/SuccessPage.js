import { Link } from 'react-router-dom';
import SuccessLogo from './SuccessLogo.js';

const SuccessPage = (props) => {
  const title = props.title;
  const linkPath = props.linkPath;
  const linkName = props.linkName;
  const className = props.className;
  const wrapperClassName = props.wrapperClassName;
  const logoClassName = props.logoClassName;
  const titleClassName = props.titleClassName;
  const linkClassName = props.linkClassName;

  return (
    <div className={className}>
      <div className={wrapperClassName}>
        <div className={logoClassName}>
          <SuccessLogo />
        </div>
        <div className={titleClassName}>
          <h1>{title}</h1>
        </div>
        <div className={linkClassName}>
          <Link to={linkPath}>{linkName}</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
