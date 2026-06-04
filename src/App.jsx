import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    income: "",
    loanAmount: "",
    children: "",
    season: "",
    purpose: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeApplication = () => {
    if (!formData.name || !formData.occupation || !formData.income || !formData.loanAmount) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setResult(null);
    setStep(0);

    setTimeout(() => setStep(1), 1000);
    setTimeout(() => setStep(2), 2200);
    setTimeout(() => setStep(3), 3400);

    setTimeout(() => {
      const income = Number(formData.income);
      const loanAmount = Number(formData.loanAmount);
      const children = Number(formData.children);

      let supportMessage = `Habari ${formData.name}! Your application has been received. As a ${formData.occupation}, our Scout Agent has reviewed your financial profile and seasonal income patterns.`;

      let triageMessage = "";
      let decision = "";
      let decisionClass = "";
      let riskFlags = [];

      if (loanAmount > 15000) riskFlags.push("Loan exceeds KES 15,000 automated limit");
      if (loanAmount > income * 2) riskFlags.push("High loan-to-income ratio detected");
      if (children >= 2 && formData.season === "Low Season") riskFlags.push("Multiple dependants during low income season");
      if (formData.season === "Low Season") riskFlags.push("Application submitted during low income season");

      if (loanAmount <= 15000 && riskFlags.length <= 1) {
        triageMessage = "Your loan amount is within the automated review threshold. Initial screening passed with minimal risk flags.";
        decision = "✅ Approved for Agent Review";
        decisionClass = "decision-approved";
      } else if (riskFlags.length >= 3 || loanAmount > 50000) {
        triageMessage = "Multiple risk factors identified. This application requires senior human officer review and additional documentation.";
        decision = "🔴 Escalated to Senior Human Officer";
        decisionClass = "decision-escalated";
      } else {
        triageMessage = "Your loan amount exceeds the automated approval limit. A human loan officer will review your application within 24 hours.";
        decision = "⚠️ Human Review Required";
        decisionClass = "decision-human";
      }

      setResult({ supportMessage, triageMessage, decision, decisionClass, riskFlags });
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div className="logo">🌍</div>
          <h1>FinSoko Loan Assistant</h1>
          <p className="subtitle">Responsible AI-powered lending for informal traders in East Africa</p>
          <div className="badges">
            <span className="badge">RANK Framework</span>
            <span className="badge">TRAIL Memory</span>
            <span className="badge">PRIDE Loop</span>
            <span className="badge">Kenya DPA 2022</span>
          </div>
        </div>

        <div className="form-section">
          <h2 className="form-title">📋 Loan Application</h2>

          <div className="form-grid">
            <div className="field">
              <label>Applicant Name *</label>
              <input type="text" name="name" placeholder="e.g. Grace Achieng" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Occupation *</label>
              <select name="occupation" onChange={handleChange}>
                <option value="">Select occupation...</option>
                <option>Fish Trader</option>
                <option>Market Vendor</option>
                <option>Bodaboda Operator</option>
                <option>Farmer</option>
                <option>Charcoal Vendor</option>
                <option>Chama Treasurer</option>
                <option>Shea Butter Trader</option>
                <option>Small Business Owner</option>
              </select>
            </div>

            <div className="field">
              <label>Monthly Income (KES) *</label>
              <input type="number" name="income" placeholder="e.g. 18000" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Loan Amount Requested (KES) *</label>
              <input type="number" name="loanAmount" placeholder="e.g. 25000" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Number of Children</label>
              <input type="number" name="children" placeholder="e.g. 3" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Current Income Season</label>
              <select name="season" onChange={handleChange}>
                <option value="">Select season...</option>
                <option>Peak Season</option>
                <option>Low Season</option>
              </select>
            </div>
          </div>

          <div className="field full">
            <label>Purpose of Loan</label>
            <textarea name="purpose" placeholder="e.g. Restock fish before January peak season..." onChange={handleChange} />
          </div>

          <button className={`submit-btn ${loading ? "loading" : ""}`} onClick={analyzeApplication} disabled={loading}>
            {loading ? "🔄 Analyzing..." : "🚀 Analyze Application"}
          </button>
        </div>

        {loading && (
          <div className="agent-pipeline">
            <h2>🤖 Agent Pipeline Running...</h2>
            <div className="pipeline-steps">
              <div className={`pipeline-step ${step >= 1 ? "active" : ""}`}>
                <div className="step-icon">📡</div>
                <div className="step-info">
                  <strong>Scout Agent</strong>
                  <span>{step >= 1 ? "✅ Profile analyzed" : "Waiting..."}</span>
                </div>
              </div>
              <div className="pipeline-arrow">↓</div>
              <div className={`pipeline-step ${step >= 2 ? "active" : ""}`}>
                <div className="step-icon">🔍</div>
                <div className="step-info">
                  <strong>Loan Triage Agent</strong>
                  <span>{step >= 2 ? "✅ Risk assessment complete" : "Waiting..."}</span>
                </div>
              </div>
              <div className="pipeline-arrow">↓</div>
              <div className={`pipeline-step ${step >= 3 ? "active" : ""}`}>
                <div className="step-icon">👤</div>
                <div className="step-info">
                  <strong>PRIDE Loop Check</strong>
                  <span>{step >= 3 ? "✅ Human oversight verified" : "Waiting..."}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="results">
            <h2 className="results-title">📊 Application Results</h2>

            <div className="result-card scout">
              <div className="card-icon">🤝</div>
              <div className="card-content">
                <h3>Scout Agent Response</h3>
                <p>{result.supportMessage}</p>
              </div>
            </div>

            <div className="result-card triage">
              <div className="card-icon">🔍</div>
              <div className="card-content">
                <h3>Loan Triage Agent Assessment</h3>
                <p>{result.triageMessage}</p>
              </div>
            </div>

            {result.riskFlags.length > 0 && (
              <div className="result-card flags">
                <div className="card-icon">⚑</div>
                <div className="card-content">
                  <h3>Risk Flags Detected ({result.riskFlags.length})</h3>
                  <ul>
                    {result.riskFlags.map((flag, i) => (
                      <li key={i}>• {flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className={`result-card final ${result.decisionClass}`}>
              <div className="card-icon">📋</div>
              <div className="card-content">
                <h3>Final Recommendation</h3>
                <p className="decision-text">{result.decision}</p>
                <p className="ussd-note">To request human review: Dial <strong>*#123#</strong></p>
              </div>
            </div>

            <div className="ethics-footer">
              <p>🔒 Your data is stored under <strong>Kenya DPA 2022</strong> on AWS Africa (Cape Town). All decisions are audited.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;