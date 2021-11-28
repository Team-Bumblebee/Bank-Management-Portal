import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import AccType from "./pages/AccountTypes/AccHome";
import CashTypesAdd from "./pages/AccountTypes/CashTypesAdd";
import CashTypesEdit from "./pages/AccountTypes/CashTypesEdit";
import LoanTypesAdd from "./pages/AccountTypes/LoanTypesAdd";
import LoanTypesEdit from "./pages/AccountTypes/LoanTypesEdit";
import PawnTypesAdd from "./pages/AccountTypes/PawnTypesAdd";
import PawnTypesEdit from "./pages/AccountTypes/PawnTypesEdit";
import Admin from "./pages/Admin";
import Cash from "./pages/Cash";
import CashAdd from "./pages/CashAdd";
import CashEdit from "./pages/CashEdit";
import Employee from "./pages/Employee";
import EmployeeAdd from "./pages/EmployeeAdd";
import EmployeeEdit from "./pages/EmployeeEdit";
import Loan from "./pages/Loan";
import LoanAdd from "./pages/LoanAdd";
import LoanEdit from "./pages/LoanEdit";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
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
          <Route path="/accType/:id">
            <AccType />
          </Route>
          <Route path="/cashTypes/add">
            <CashTypesAdd />
          </Route>
          <Route path="/cashTypes/:id">
            <CashTypesEdit />
          </Route>
          <Route path="/pawnTypes/add">
            <PawnTypesAdd />
          </Route>
          <Route path="/pawnTypes/:id">
            <PawnTypesEdit />
          </Route>
          <Route path="/loanTypes/add">
            <LoanTypesAdd />
          </Route>
          <Route path="/loanTypes/:id">
            <LoanTypesEdit />
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
          <Route path="/loan" exact>
            <Loan />
          </Route>
          <Route path="/loan/add">
            <LoanAdd />
          </Route>
          <Route path="/loan/:id">
            <LoanEdit />
          </Route>
          <Route path="/logs">
            <Logs />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  );
}

export default App;
