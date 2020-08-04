import React from "react";
import "./App.css";
import DCandidates from "./components/DCandidates";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications"
function App() {
  return (
    <div className='app'>
      <ToastProvider autoDismiss={true}>
      	<Container maxWidth='lg'>
      	  <DCandidates />
      	</Container>
      </ToastProvider>
    </div>
  );
}

export default App;
