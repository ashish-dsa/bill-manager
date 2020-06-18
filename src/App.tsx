import React from "react";
import "./App.css";
import { Header, History, NewBill, TotalExpense } from "./components";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <NewBill />
      <History />
      <TotalExpense />
    </GlobalProvider>
  );
}

export default App;
