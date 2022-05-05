import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="error404-grid-container">
      <div className="error404-main-title">
        <h2>Oops! Page not found.</h2>
      </div>
      <div className="error404-bg-code">
        <h1>404</h1>
      </div>
      <div className="error404-description">
        <h2>The page you are looking for is not available.</h2>
      </div>
      <div className="error404-home-link">
        <Link to={"/"}>Go back home</Link>
      </div>
    </div>
  )
};
export default PageNotFound;
