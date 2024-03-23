import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import Layout from "./components/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Layout>
    <App />
  </Layout>
);
