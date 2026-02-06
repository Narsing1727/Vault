🧾 DETERMINISTIC FINANCIAL LEDGER SYSTEM

A research-oriented, deterministic financial ledger system designed to build auditable, verifiable, and invariant-safe financial transactions.  
The project prioritizes correctness, traceability, and backend system design over UI-heavy features.

📌 MOTIVATION

Modern financial systems require strong auditability, deterministic state transitions, protection against silent data corruption, and a verifiable transaction history.  
This project explores how double-entry accounting, hash-chained ledgers, and formal invariants can be implemented in a practical backend system.

🏗️ HIGH-LEVEL ARCHITECTURE

Client applications (dashboard or API consumers) interact with a Node.js and Express-based API layer.  
Requests are processed by a business logic layer responsible for transaction validation and invariant enforcement.  
Validated transactions are stored in an append-only PostgreSQL ledger.  
A dedicated verification and audit layer continuously validates ledger integrity using hash chains and invariant checks.

🔑 CORE CONCEPTS

1️⃣ DOUBLE-ENTRY ACCOUNTING  
Every transaction is recorded using one debit entry and one credit entry.  
This guarantees that the sum of all amounts within a transaction is always zero, ensuring balance and correctness.

2️⃣ APPEND-ONLY LEDGER  
Historical ledger records are never updated or deleted.  
All changes are recorded as new entries, providing a complete and tamper-evident audit trail.

3️⃣ DETERMINISTIC AMOUNTS  
All monetary values are stored as integers (paise).  
This avoids floating-point precision errors and ensures deterministic and reproducible computations.

4️⃣ HASH-CHAINED LEDGER  
Each ledger entry stores the hash of the previous entry along with its own hash.  
This forms an immutable chain starting from a genesis entry.  
Any modification to historical data breaks the chain and is immediately detectable.

5️⃣ FORMAL INVARIANTS  
The system enforces per-transaction balance invariants, global system-wide balance invariants, and cryptographic hash integrity invariants to guarantee correctness.

🧠 TRANSACTION LIFECYCLE

A transaction is first initiated, then marked as pending.  
During finalization, all invariants and balance checks are validated.  
The transaction is then either completed successfully or marked as failed.  
All status updates occur atomically.

🔄 IMPLEMENTED WORKFLOWS

✅ TOP-UP (FUNDING)  
System-generated funds are credited to the OPS account.

✅ INTERNAL TRANSFER  
Funds are transferred between internal accounts such as OPS and RESERVE while maintaining strict balance invariants.

❌ EXTERNAL TRANSFERS  
External banking transfers are intentionally not implemented as they require regulatory and banking integrations.

🔍 VERIFICATION AND AUDIT APIS

The system provides APIs to verify individual transaction invariants, global ledger balance, and the complete hash chain.  
It also supports detection of corrupted or tampered ledger entries.  
Verification checks can be executed on-demand or asynchronously.

🧪 KEY APIS (SAMPLE)

• /funds/top-up – Fund the OPS account  
• /funds/internal-transfer – Create an internal transfer  
• /ledger/complete/:txId – Finalize a pending transaction  
• /verify/ledger – Verify the ledger hash chain  
• /verify/invariant/:txId – Verify transaction-level invariant  
• /dashboard/summary – View balances and activity summary  

🛠️ TECH STACK

Backend technologies include Node.js and Express.  
PostgreSQL is used as the primary database.  
Security is handled using JWT-based authentication and bcrypt for password hashing.  
Ledger correctness is enforced using double-entry accounting and hash chaining.  
Data integrity relies on SQL transactions and row-level locking.

📊 CURRENT FEATURES

Deterministic financial ledger with strict correctness guarantees.  
Audit-safe transaction history with full traceability.  
Hash-based tamper detection.  
Accurate balance tracking and historical views.  
Research-oriented verification and audit APIs.

🚧 WORK IN PROGRESS AND PLANNED ENHANCEMENTS

⏳ Redis-based balance caching  
⏳ Asynchronous verification using job queues  
⏳ Offline C++ verification engine for audits  
⏳ Machine learning based anomaly detection  
⏳ Write-Ahead Logging (WAL) abstraction  

🎓 ACADEMIC AND RESEARCH RELEVANCE

This project demonstrates real-world application of accounting theory, strong systems thinking for correctness and safety, deterministic backend design, and foundations for financial audit systems.  
It is suitable for research internships, infrastructure and backend roles, and fintech system design discussions.

👤 AUTHOR

Narsing Sharma  


Built as part of independent systems research and backend engineering exploration.
