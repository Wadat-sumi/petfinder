import { useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParamsNew from "./SearchParamsNew";
import ApiContext from "./ApiContext";
import Details from "./Details";
import client from "./ApiData";

const App = () => {
  const detailsValue = useRef("null");

  return (
    <ApiContext.Provider value={client}>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route
            path="/details/:id"
            element={<Details refHook={detailsValue} />}
          />
          <Route
            path="/"
            element={<SearchParamsNew refHook={detailsValue} />}
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default App;
