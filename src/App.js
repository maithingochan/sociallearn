import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Alert from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import StatusModel from "./components/StatusModel";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

function App() {
  const { auth, status, model } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      console.log("app.js");
      dispatch(getSuggestions(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || model) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModel />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <div style={{ marginBottom: "60px" }}>
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
