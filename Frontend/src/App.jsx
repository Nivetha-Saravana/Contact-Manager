
import { Home } from "./components/Home";
import { AddContacts } from "./components/AddContacts";

import { UseContact } from "./Context/ContactContext";
import "./App.css";

function App() {
  const { darkMode } = UseContact();

  return (
    <div className={`container  : "dark"`}>
      <div className="content">
        <Home />
        <AddContacts />
        
      </div>
    </div>
  );
}

export default App;
