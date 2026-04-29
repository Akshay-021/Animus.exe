import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import { AppProvider } from "./context/AppContext";
import { AssistantProvider } from "./context/AssistantContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AppProvider>
      <AssistantProvider>
        <BrowserRouter>
          <NavBar />
          <main className="app-shell">
            <AppRoutes />
          </main>
        </BrowserRouter>
      </AssistantProvider>
    </AppProvider>
  );
}
