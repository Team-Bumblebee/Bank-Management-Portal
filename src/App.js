import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import Cash from "./pages/Cash";
import CashAdd from "./pages/CashAdd";
import CashEdit from "./pages/CashEdit";
import Employee from "./pages/Employee";
import Login from "./pages/Login";
import Pawn from "./pages/Pawn";
import PawnAdd from "./pages/PawnAdd";
import PawnEdit from "./pages/PawnEdit";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/employee">
          <Employee />
        </Route>
        <Route path="/cash" exact>
          <Cash />
        </Route>
        <Route path="/cash/add">
          <CashAdd />
        </Route>
        <Route path="/cash/:id">
          <CashEdit />
        </Route>
        <Route path="/pawn" exact>
          <Pawn />
        </Route>
        <Route path="/pawn/add">
          <PawnAdd />
        </Route>
        <Route path="/pawn/:id">
          <PawnEdit />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
