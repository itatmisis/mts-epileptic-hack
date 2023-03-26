import Routes from "./Router";
import Providers from "../providers";

import "../styles/base.scss";

function App() {
  return (
    <>
      <Providers>
        <Routes />
      </Providers>
    </>
  );
}

export default App;
