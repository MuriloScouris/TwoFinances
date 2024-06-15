
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React from 'react'
import Preloader from "../src/components/Pre";
import Home from "./pages/Home";
import Financas from "./pages/Finanacas";
import Todo from "./pages/Todo";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import Support from "./pages/Support";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className="navbar-header">
     
    <Router>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <ScrollToTopOnRouteChange />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/financas" element={<Financas />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/suporte" element={<Support />} />
            
          </Routes>
        </div>
      </Router>
  </div>
  
  
  )
}

export default App
