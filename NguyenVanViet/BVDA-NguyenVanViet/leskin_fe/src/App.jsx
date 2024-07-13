import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import { PUBLIC_ROUTER, PUBLIC_ROUTER_DETAIL } from "./router/index";
import PrivateLayout from "./layout/PrivateLayout";
import NotFound from "./page/NotFound";
import './App.css'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            {PUBLIC_ROUTER.map((item) => {
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  exact={item.exact}
                  element={item.container}
                ></Route>
              );
            })}
          </Route>{" "}
          <Route path="/" element={<PublicLayout />}>
            {PUBLIC_ROUTER_DETAIL.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  exact={item.exact}
                  element={item.container}
                ></Route>
              );
            })}
          </Route>{" "}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;