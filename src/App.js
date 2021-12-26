import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import CornerNote from "./components/CornerNote";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <CornerNote/>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
