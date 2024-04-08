import React from "react";
import Navbar from "../widgets/navbar/Navbar";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;
