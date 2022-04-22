import { hydrate, render } from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = document.getElementById("root") as HTMLElement;

if (root.hasChildNodes()) {
  hydrate(<App />, root);
} else {
  render(<App />, root);
}


reportWebVitals();
