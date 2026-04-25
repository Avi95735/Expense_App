// UI ENHANCED VERSION (NO LOGIC CHANGE)
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { UserContext } from "./AuthContex";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const [bal, setBal] = useState(0);
  const [data, setPass] = useState([]);
  const [ttlc, setCdt] = useState(0);
  const [ttld, setDebit] = useState(0);

  const Getbal = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(
        `https://expense-app-2-5b8w.onrender.com/api/user/opbal/${user.id}`
      );
      setBal(Number(res.data?.opbal || 0));
    } catch (err) {
      console.log(err);
    }
  };

  const pass = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(
        `https://expense-app-2-5b8w.onrender.com/api/transaction/${user.id}`
      );
      const transactions = res.data || [];
      setPass(transactions);

      let totalCredit = 0;
      let totalDebit = 0;

      transactions.forEach((item) => {
        const amt = Number(item.amount || 0);
        if (item.type === "CREDIT") totalCredit += amt;
        else if (item.type === "DEBIT") totalDebit += amt;
      });

      setCdt(totalCredit);
      setDebit(totalDebit);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshData = async () => {
    if (!user?.id) return;
    await Promise.all([pass(), Getbal()]);
  };

  const [show, setShow] = useState(false);
  const [crd, setCrd] = useState("");
  const [dat, setDate] = useState("");
  const [not, setNote] = useState("");

  const creadit = async () => {
    if (!user?.id) return;
    try {
      await axios.post(
        `https://expense-app-2-5b8w.onrender.com/api/transaction/credit/${user.id}`,
        { amount: Number(crd), date: dat, note: not }
      );
      alert("Credit Successful");
      setShow(false);
      setCrd("");
      setDate("");
      setNote("");
      await refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const [shown, setShown] = useState(false);
  const [dbt, setDbt] = useState("");
  const [dt, setDt] = useState("");
  const [noted, setNot] = useState("");

  const debit = async () => {
    if (!user?.id) return;
    try {
      await axios.post(
        `https://expense-app-2-5b8w.onrender.com/api/transaction/debit/${user.id}`,
        { amount: Number(dbt), date: dt, note: noted }
      );
      alert("Debit Successful");
      setShown(false);
      setDbt("");
      setDt("");
      setNot("");
      await refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.id) refreshData();
  }, [user]);

  return (
    <Container
      fluid
      className="py-5 px-4 dashboard-bg"
    >
      <h1 className="text-center text-white fw-bold mb-5 glow-title">
        💳 Daily Transaction Management
      </h1>

      <Row className="justify-content-center g-4 mb-4">
        <Col md={4}>
          <Card className="glass-card animate-card text-white">
            <Card.Body>
              <h5>🏦 Account Balance</h5>
              <h2 className="pulse">₹ {bal}</h2>
              <h6>User ID: {user?.id}</h6>
              <h5>{user?.uname}</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="glass-card-success animate-card text-white text-center">
            <Card.Body>
              <h3>💰 Credit</h3>
              <h1>₹{ttlc}</h1>
              <Button onClick={() => setShow(true)} className="btn-modern">
                + Add Credit
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="glass-card-danger animate-card text-white text-center">
            <Card.Body>
              <h3>🏧 Debit</h3>
              <h1>₹{ttld}</h1>
              <Button onClick={() => setShown(true)} className="btn-modern">
                + Add Debit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="glass-table animate-table">
        <Card.Body>
          <h3 className="text-white mb-3">🏦 Passbook Report</h3>

          <Table hover responsive className="text-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id ?? index} className="table-row">
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.note}</td>
                  <td className="text-success fw-bold">
                    {item.type === "CREDIT" ? `₹${item.amount}` : "0"}
                  </td>
                  <td className="text-danger fw-bold">
                    {item.type === "DEBIT" ? `₹${item.amount}` : "0"}
                  </td>
                  <td>₹{Number(item.remainingBalance || 0)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* CREDIT MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="modal-glass">
          <h4 className="mb-3">💰 Add Credit</h4>
          <Form>
            <Form.Control value={crd} type="number" placeholder="Amount" onChange={(e) => setCrd(e.target.value)} className="mb-2" />
            <Form.Control value={dat} type="date" onChange={(e) => setDate(e.target.value)} className="mb-2" />
            <Form.Control value={not} type="text" placeholder="Note" onChange={(e) => setNote(e.target.value)} className="mb-2" />
          </Form>
          <Button onClick={creadit} className="btn-modern w-100">Submit Credit</Button>
        </Modal.Body>
      </Modal>

      {/* DEBIT MODAL */}
      <Modal show={shown} onHide={() => setShown(false)} centered>
        <Modal.Body className="modal-glass">
          <h4 className="mb-3">🏧 Add Debit</h4>
          <Form>
            <Form.Control value={dbt} type="number" placeholder="Amount" onChange={(e) => setDbt(e.target.value)} className="mb-2" />
            <Form.Control value={dt} type="date" onChange={(e) => setDt(e.target.value)} className="mb-2" />
            <Form.Control value={noted} type="text" placeholder="Note" onChange={(e) => setNot(e.target.value)} className="mb-2" />
          </Form>
          <Button onClick={debit} className="btn-modern w-100">Submit Debit</Button>
        </Modal.Body>
      </Modal>

      <style>{`
        .dashboard-bg{
          min-height:100vh;
          background: linear-gradient(135deg,#020617,#0f172a,#1e40af,#3b82f6);
        }

        .glow-title{
          animation: fadeSlide 1s ease, glow 2s infinite alternate;
        }

        .glass-card{
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          transition:0.3s;
        }

        .glass-card:hover{transform:translateY(-8px) scale(1.02)}

        .glass-card-success{background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:20px;}
        .glass-card-danger{background:linear-gradient(135deg,#dc2626,#ef4444);border-radius:20px;}

        .glass-table{
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(12px);
          border-radius:20px;
        }

        .animate-table{
          animation: fadeSlide 0.8s ease;
        }

        .btn-modern{
          border-radius:10px;
          font-weight:bold;
          transition:0.3s;
        }
        .btn-modern:hover{transform:scale(1.08)}

        .table-row{
          transition:0.3s;
        }
        .table-row:hover{
          background:rgba(255,255,255,0.12);
          transform:scale(1.01);
        }

        .modal-glass{
          background:rgba(15,23,42,0.95);
          color:white;
          border-radius:20px;
          animation: popIn 0.4s ease;
        }

        .pulse{
          animation:pulse 1.5s infinite;
        }

        @keyframes fadeSlide{
          from{opacity:0;transform:translateY(-30px)}
          to{opacity:1;transform:translateY(0)}
        }

        @keyframes popIn{
          from{opacity:0;transform:scale(0.8)}
          to{opacity:1;transform:scale(1)}
        }

        @keyframes glow{
          from{text-shadow:0 0 5px #3b82f6}
          to{text-shadow:0 0 20px #60a5fa}
        }

        @keyframes pulse{
          0%{transform:scale(1)}
          50%{transform:scale(1.05)}
          100%{transform:scale(1)}
        }
      `}</style>
    </Container>
  );
}
