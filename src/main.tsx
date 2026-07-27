
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Disable browser scroll restoration so it never restores scroll position
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  // Force native scroll to top immediately (before React / Lenis mount)
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "instant" } as ScrollToOptions);

  createRoot(document.getElementById("root")!).render(<App />);
  