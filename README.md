🧾** Deterministic Financial Ledger System**

A research-oriented, deterministic financial ledger system designed to model auditable, verifiable, and invariant-safe financial transactions.
The project focuses on correctness, traceability, and system design, rather than UI-heavy features.

📌 Motivation

Modern financial systems require:
Strong auditability
Deterministic state transitions
Protection against silent data corruption
Verifiable transaction history
This project explores how double-entry accounting, hash-chained ledgers, and formal invariants can be implemented in a practical backend system.

🏗️ High-Level Architecture
Client (Dashboard / API Consumer)
        |
        v
Node.js API Layer (Express)
        |
        v
Business Logic Layer
(Transaction Validation, Invariants)
        |
        v
PostgreSQL Ledger (Append-Only)
        |
        v
Verification & Audit Layer
(Hash Chain + Invariant Checks)

🔑 Core Concepts
1️⃣ Double-Entry Accounting

Every transaction is recorded as:
One debit
One credit
This ensures:

Σ(amount) = 0  (per transaction)

2️⃣ Append-Only Ledger
No updates to historical records
All changes are recorded as new entries
Enables full audit trail

3️⃣ Deterministic Amounts
All monetary values stored as integers (paise)
Prevents floating-point precision errors
Guarantees reproducibility

4️⃣ Hash-Chained Ledger
Each ledger entry stores:
prev_hash
curr_hash

This creates an immutable chain:

GENESIS → Entry₁ → Entry₂ → Entry₃ → ...


Any modification breaks the chain and is detected.

5️⃣ Formal Invariants

The system enforces:
Per-transaction invariant
Σ(amount by tx_id) = 0

Global invariant
All transactions remain balanced

Hash integrity invariant
Ledger chain is cryptographically valid

🧠 Transaction Lifecycle
INITIATED
↓
PENDING
↓
COMPLETED  or  FAILED


Internal transfers are first created as PENDING
Finalization checks balance and invariants
Status is updated atomically

🔄 Implemented Workflows
✅ Top-Up (Funding)
SYSTEM  →  OPS

✅ Internal Transfer
OPS  ↔  RESERVE

❌ External Transfers

Intentionally not implemented (requires banking rails & regulatory integration)
🔍 Verification & Audit APIs
✔ Per-transaction invariant verification
✔ Global invariant verification
✔ Full ledger hash chain verification
✔ Detection of corrupted or tampered entries
These checks can be run on-demand or scheduled asynchronously.

🧪 Key APIs (Sample)
Endpoint	Description
/funds/top-up	Fund OPS account
/funds/internal-transfer	Create internal transfer
/ledger/complete/:txId	Finalize pending transaction
/verify/ledger	Verify hash chain
/verify/invariant/:txId	Verify transaction invariant
/dashboard/summary	Balance & activity summary
🛠️ Tech Stack
Backend: Node.js, Express
Database: PostgreSQL
Security: JWT Authentication, bcrypt
Ledger Design: Double-entry + Hash chaining
Data Integrity: SQL transactions & row-level locking

📊 Current Features
Deterministic financial ledger
Audit-safe transaction history
Hash-based tamper detection
Balance tracking & history
Research-oriented verification APIs

🚧 Work in Progress / Planned Enhancements
⏳ Redis-based balance caching
⏳ Async verification via job queues
⏳ C++ verification engine (offline audit)
⏳ ML-based anomaly detection (post-hoc analysis)
⏳ Write-Ahead Logging (WAL) abstraction

🎓 Academic & Research Relevance

This project demonstrates:
Practical application of accounting theory
Systems thinking for correctness & safety
Deterministic backend design
Foundations for financial audit systems
It is suitable for:
Research internships
Infrastructure / backend roles
Fintech system design discussions


👤 Author
Narsing Sharma
B.Tech (Civil Engineering), IIT Roorkee

Built as part of independent systems research and backend engineering exploration.
