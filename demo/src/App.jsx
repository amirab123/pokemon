import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexte/AuthContext";
import { Provider } from "react-redux"; 
import { store } from "./store"; 

import NavBar from "./composants/NavBar";
import AppRoutes from "./routes";
import Footer from "./pages/Footer";

export default function App() {



  return (
     <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
   
            <NavBar />
            <main className="main-container">
              <AppRoutes />
            </main>
            <Footer />
    
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}


