export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__text">
        &copy;&nbsp;Stamp&nbsp;{year}
      </div>
    </footer>
  );
};
