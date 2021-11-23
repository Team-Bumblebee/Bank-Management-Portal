import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./pages/Admin";
import Cash from "./pages/Cash";
import CashAdd from "./pages/CashAdd";
import CashEdit from "./pages/CashEdit";
import Employee from "./pages/Employee";
import EmployeeAdd from "./pages/EmployeeAdd";
import EmployeeEdit from "./pages/EmployeeEdit";
import Login from "./pages/Login";
import Pawn from "./pages/Pawn";
import PawnAdd from "./pages/PawnAdd";
import PawnEdit from "./pages/PawnEdit";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/employee" exact>
            <Employee />
          </Route>
          <Route path="/employee/add">
            <EmployeeAdd />
          </Route>
          <Route path="/employee/:id">
            <EmployeeEdit />
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
        </Switch>
      </Layout>
    </AuthProvider>
  );
}

export default App;
