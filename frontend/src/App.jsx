import { useState, useEffect } from "react";
import "./main.css"; 
import LeftSideNav from "./react/components/menus/LeftSideNav";
import TopMenu from "./react/components/menus/TopMenu";
import SortingAlgorithmsPage from './react/pages/sorting/SortingAlgorithmsPage';
import GraphAlgorithmsPage from "./react/pages/graphs/GraphAlgorithmsPage";
import HomePage from "./react/pages/Home";
import {
  Routes,
  Route,
  Outlet,
  BrowserRouter,
} from "react-router-dom";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api");
      const data = await response.text();
      setData(data);
    };

    fetchData().catch((err) => console.log(err));
  }, []);



  return (
    <BrowserRouter>
    <div className="App">

     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GraphAlgorithmsPage />} />
        <Route path="sorting" element={<SortingAlgorithmsPage />} />
        <Route path="graphs" element={<GraphAlgorithmsPage />} />
      </Route>
    </Routes>
   </div>
   </BrowserRouter>
  );

  function Layout() {
    return (
      <div>
        <TopMenu />
        {/*<LeftSideNav /> */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  }

}

export default App;