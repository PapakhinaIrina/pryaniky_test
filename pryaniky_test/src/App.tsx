import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./shared/pages/auth/auth";
import { TablePage } from "shared/pages/table/table";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="table" element={<TablePage />} />
      </Routes>
    </div>
  );
}

export default App;
