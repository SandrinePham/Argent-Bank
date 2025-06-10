import "./dashboard.scss";
import BalanceChecking from "../components/BalanceChecking";
import BalanceDetail from "../components/BalanceDetail";

function Dashboard() {
  return (
    <section className="dashboard">
      <BalanceChecking />
      <BalanceDetail />
    </section>
  );
}

export default Dashboard;
