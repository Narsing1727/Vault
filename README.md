DETERMINISTIC FINANCIAL LEDGER SYSTEM
===================================

A research-oriented, deterministic financial ledger system designed to model
auditable, verifiable, and invariant-safe financial transactions.

The project focuses on correctness, traceability, and system design,
rather than UI-heavy features.


MOTIVATION
----------

Modern financial systems require:

- Strong auditability
- Deterministic state transitions
- Protection against silent data corruption
- Verifiable transaction history

This project explores how double-entry accounting, hash-chained ledgers,
and formal invariants can be implemented in a practical backend system.


HIGH-LEVEL ARCHITECTURE
-----------------------

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


CORE CONCEPTS
-------------

1. DOUBLE-ENTRY ACCOUNTING

Every transaction is recorded as:

- One debit
- One credit

Invariant:
Σ(amount) = 0   (per transaction)


2. APPEND-ONLY LEDGER

- No updates to historical records
- All changes are recorded as new entries
- Enables a complete audit trail


3. DETERMINISTIC AMOUNTS

- All monetary values stored as integers (paise)
- Prevents floating-point precision errors
- Guarantees reproducibility


4. HASH-CHAINED LEDGER

Each ledger entry stores:

- prev_hash
- curr_hash

Ledger structure:

GENESIS → Entry_1 → Entry_2 → Entry_3 → ...

Any modification breaks the chain and is detected.


5. FORMAL INVARIANTS

The system enforces:

Per-transaction invariant:
Σ(amount by tx_id) = 0

Global invariant:
All transactions remain balanced

Hash integrity invariant:
Ledger hash chain is cryptographically valid


TRANSACTION LIFECYCLE
---------------------

INITIATED
    |
    v
PENDING
    |
    v
COMPLETED   or   FAILED

- Internal transfers are created as PENDING
- Finalization checks balance and invariants
- Status update is atomic


IMPLEMENTED WORKFLOWS
---------------------

TOP-UP (FUNDING)

SYSTEM
  |
  v
OPS


INTERNAL TRANSFER

OPS  <------>  RESERVE


EXTERNAL TRANSFERS

NOT IMPLEMENTED
(Requires banking rails & regulatory integration)


VERIFICATION & AUDIT APIS
------------------------

Supported checks:

- Per-transaction invariant verification
- Global invariant verification
- Full ledger hash-chain verification
- Detection of corrupted or tampered entries

Checks can be run on-demand or asynchronously.


KEY APIS (SAMPLE)
-----------------

/funds/top-up
    Fund OPS account

/funds/internal-transfer
    Create internal transfer

/ledger/complete/:txId
    Finalize pending transaction

/verify/ledger
    Verify hash chain

/verify/invariant/:txId
    Verify transaction invariant

/dashboard/summary
    Balance and activity summary


TECH STACK
----------

Backend:
- Node.js
- Express

Database:
- PostgreSQL

Security:
- JWT Authentication
- bcrypt

Ledger Design:
- Double-entry accounting
- Hash chaining

Data Integrity:
- SQL transactions
- Row-level locking


CURRENT FEATURES
----------------

- Deterministic financial ledger
- Audit-safe transaction history
- Hash-based tamper detection
- Balance tracking and history
- Research-oriented verification APIs


WORK IN PROGRESS / PLANNED ENHANCEMENTS
--------------------------------------

- Redis-based balance caching
- Async verification via job queues
- C++ verification engine (offline audit)
- ML-based anomaly detection (post-hoc analysis)
- Write-Ahead Logging (WAL) abstraction


ACADEMIC & RESEARCH RELEVANCE
-----------------------------

This project demonstrates:

- Practical application of accounting theory
- Systems thinking for correctness and safety
- Deterministic backend design
- Foundations for financial audit systems

Suitable for:

- Research internships
- Infrastructure / backend roles
- Fintech system-design discussions


AUTHOR
------

Narsing Sharma


Built as part of independent systems research
and backend engineering exploration.
