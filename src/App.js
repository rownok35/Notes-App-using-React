import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Notes from "./pages/Notes";
import Note from "./pages/Note";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Notes />} exact />
            <Route path="/note/:id" element={<Note />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
