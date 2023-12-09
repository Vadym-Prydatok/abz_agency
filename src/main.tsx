import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./app";

const element = document.getElementById("root");
createRoot(element!).render(<App />);
