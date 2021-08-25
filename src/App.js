import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WebFont from "webfontloader";
import styled from "styled-components";
import Top from "./components/Top";
import Set from "./Set";
import Me from "./pages/Me";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans:n4"],
      },
    });
  }, []);

  return (
    <S.Wrapper>
      <Top />
      <S.Content>
        <Router>
          <Switch>
            <Route path="/me">
              <Me />
            </Route>
            <Route exact path="/">
              <Set />
            </Route>
          </Switch>
        </Router>
      </S.Content>
    </S.Wrapper>
  );
};

export default App;

let S = {};
S.Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.Content = styled.div`
  margin-top: 50px;
  width: 85%;
  padding: 25px;
  background-color: #fff;
  border: 1px solid var(--border);
`;
