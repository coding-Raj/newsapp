import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let pageSize = 6;

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News pageSize={pageSize} country= "in" category="general" />} />
          <Route exact path="/business" element={<News pageSize={pageSize} country= "in" category="business" />} />
          <Route exact path="/entertainment" element={<News pageSize={pageSize} country= "in" category="entertainment" />} />
          <Route exact path="/general" element={<News pageSize={pageSize} country= "in" category="general" />} />
          <Route exact path="/health" element={<News pageSize={pageSize} country= "in" category="health" />} />
          <Route exact path="/science" element={<News pageSize={pageSize} country= "in" category="science" />} />
          <Route exact path="/sports" element={<News pageSize={pageSize} country= "in" category="sports" />} />
          <Route exact path="/technology" element={<News pageSize={pageSize} country= "in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
