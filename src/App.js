import "./styles.css";
import { StateInspector } from "reinspect";
import HttpDataProvider from "./HttpDataProvider";
import ManyTerminals from "./ManyTerminals";
import { ControlsContextProvider } from "./ControlsContext";

export default function App() {
  return <ManyTerminals />;
}
