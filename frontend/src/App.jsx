import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const pages = import.meta.glob("./pages/*.jsx", { eager: true });

export default function App() {
  return (
    <Router>
      <Routes>
        {Object.entries(pages).map(([path, module]) => {
          const name = path.split("/").pop().replace(".jsx", "");
          const Element = module.default;
          return (
            <Route
              key={name}
              path={name === "Home" ? "/" : `/${name.toLowerCase()}`}
              element={<Element />}
            />
          );
        })}
      </Routes>
    </Router>
  );
}