import React, { useState, useContext } from "react";
import { Button, Form, Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthContex";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [mo, setMob] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [ph, setMobile] = useState("");
  const [Name, setnm] = useState("");
  const [Opn, setOp] = useState(0);

  const getmob = () => {
    if (!mo || mo.trim().length !== 10) {
      alert("Enter valid 10 digit mobile");
      return;
    }

    axios.get("http://localhost:8080/api/user/getall")
      .then((res) => {
        const userData = res.data.find((u) =>
          u.mobile?.toString() === mo.trim()
        );

        if (userData) {
          setUser({
            id: userData.id,
            uname: userData.name,
          });

          alert("Login Success ✅");
          navigate("/dashboard");
        } else {
          alert("Mobile Not Found ❌");
        }
      })
      .catch((err) => {
        console.log("ERROR 👉", err.response || err);
        alert("Server Error ❌");
      });
  };

  const save = () => {
    if (!ph || !Name) {
      alert("Fill all fields");
      return;
    }

    const ex = {
      mobile: ph.trim(),
      name: Name.trim(),
      opbal: Opn.toString(),
    };

    axios
      .post("http://localhost:8080/api/user/uadd", ex)
      .then(() => {
        alert("Sign Up Successful ✅");
        setShowPopup(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#020617,#0f172a,#1e40af,#3b82f6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI",
        }}
      >

        {/* Animated Heading */}
        <h1
          style={{
            color: "white",
            marginBottom: "20px",
            fontWeight: "700",
            letterSpacing: "1px",
            animation: "slideDown 1s ease-out",
          }}
        >
          Daily Transaction Management
        </h1>
        <Card
          className="p-4 shadow-lg border-0"
          style={{
            width: "380px",
            borderRadius: "25px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            color: "white",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <div className="text-center mb-3">
            <h2 style={{ fontWeight: "bold", letterSpacing: "1px" }}>
              🏦 Secure Bank
            </h2>
            <p style={{ fontSize: "14px", opacity: 0.8 }}>
              Trusted Digital Banking System
            </p>
          </div>

          <Form.Control
            type="text"
            placeholder="📱 Enter Mobile Number"
            value={mo}
            onChange={(e) => setMob(e.target.value)}
            className="mb-3"
            style={{
              borderRadius: "12px",
              padding: "12px",
              border: "none",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />

          <Button
            className="w-100 mb-3"
            onClick={getmob}
            style={{
              borderRadius: "12px",
              padding: "10px",
              fontWeight: "bold",
              background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
              border: "none",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🔐 Login Securely
          </Button>

          <Button
            variant="outline-light"
            className="w-100"
            onClick={() => setShowPopup(true)}
            style={{ borderRadius: "12px", padding: "10px" }}
          >
             Open New Account
          </Button>
        </Card>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🏦 Open Bank Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            placeholder="📱 Mobile"
            onChange={(e) => setMobile(e.target.value)}
            className="mb-3"
          />

          <Form.Control
            placeholder="👤 Full Name"
            onChange={(e) => setnm(e.target.value)}
            className="mb-3"
          />

          <Form.Control
            type="number"
            placeholder=" Opening Balance"
            onChange={(e) => setOp(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Cancel
          </Button>

          <Button
            variant="success"
            onClick={save}
            style={{ fontWeight: "bold" }}
          >
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-40px); }
            to { opacity: 1; transform: translateY(0); }
          }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
