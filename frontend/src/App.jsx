import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;