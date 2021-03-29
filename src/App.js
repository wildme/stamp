import './App.css';
import Header from './Header.js';
// import Content from './Content.js';
import Footer from './Footer.js';

export default function App() {
  return (
      <div className="App">
        <Header />
        <div className="App-main"><p> Welcome </p></div>
        <Footer />
      </div>
  );
}
