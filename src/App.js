import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./pages/Admin";
import Cash from "./pages/Cash";
import CashAdd from "./pages/CashAdd";
import CashEdit from "./pages/CashEdit";
import Employee from "./pages/Employee";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
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
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  );
}

export default App;
