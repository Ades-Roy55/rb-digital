import Footer from "./Pages/Footer";
import Header from "./Pages/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default App;