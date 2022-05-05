import { Link } from 'react-router-dom';

const ErrorPage = (props) => {
  const code = props.code;

  return (
    <div className="error-page-grid-container">
      <div className="error-page-reason-title">
        {code === 404 && <h2>Oops! Page not found</h2>}
        {code === 401 && <h2>Not permitted</h2>}
      </div>
      <div className="error-page-code-title">
        <h1>{code}</h1>
      </div>
      <div className="error-page-description">
        {code === 404 &&
            <h2>The page you are looking for is not available.</h2>}
        {code === 401 &&
            <h2>You aren't allow to visit this page.</h2>}
      </div>
      <div className="error-page-home-link">
        <Link to={"/"}>Go back home</Link>
      </div>
    </div>
  )
};
export default ErrorPage;
