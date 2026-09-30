# I Built an AI Agent That Writes Technical Blog Posts — Here's How It Works

**TL;DR:** I built a system where you give it a topic, and it autonomously researches the web, creates a structured outline, writes each section in parallel, and delivers a publication-ready technical article. No human in the loop. Here's the story behind it and the engineering decisions that made it work.

---

## The Problem

Writing a good technical blog post takes hours. You research, outline, draft, restructure, and edit. Most of that process follows a predictable pattern — what if an AI agent could handle the entire pipeline?

Not a single LLM call that dumps 2,000 words of generic text. A *system* — multiple specialized agents, each doing one job well, passing work to the next.

That's what I built.

---

## How It Works (The 60-Second Version)

The system is a **graph of AI agents**, where each node has a specific role:

```
Topic → Research Agent → Orchestrator → Writers (×N) → Reducer → Final Article
```

**Step 1 — Research Agent** receives your topic and makes a decision: *"Do I need to search the web for this?"* For a topic like "how binary search works," it skips the search — that's textbook knowledge. For "latest LangGraph features in 2026," it fires off web searches via Tavily, reads the results, and optionally runs follow-up searches if the first results weren't enough.

**Step 2 — Orchestrator** takes the research findings and produces a structured outline: blog title, target audience, tone, and 5-7 section tasks — each with a goal, bullet points, and a target word count. This outline is enforced as a strict JSON schema, so the downstream pipeline always gets clean, typed data.

**Step 3 — Writers** receive one section task each and write it independently. They run in parallel — the system dispatches all tasks simultaneously.

**Step 4 — Reducer** collects all written sections, sorts them by section order, merges them into a single Markdown file, and saves it to disk.

The entire pipeline runs with a single API call. You POST a topic, wait ~60 seconds, and get back a structured article with headings, code snippets, and coherent flow.

---

## The Technical Decisions That Mattered

### Why a Graph, Not a Chain?

Most LLM tutorials show a simple chain: prompt → LLM → output. That breaks down fast when you need conditional logic (*should I search or not?*) and parallel execution (*write 6 sections at once*).

I used **LangGraph's StateGraph** — a directed graph where each node is a function that reads and writes to shared state. Edges between nodes can be conditional, and nodes can fan out to run in parallel. This gave me:

- A **ReAct loop** for the research agent (reason → act → observe → repeat)
- **Conditional routing** to skip research when it's unnecessary
- **Parallel fanout** via LangGraph's `Send()` to dispatch writer tasks simultaneously

### Structured Output Over String Parsing

The orchestrator doesn't return free-text outlines. It uses `llm.with_structured_output(Plan)` — the LLM is constrained to return a valid Pydantic model. This means the plan always has the right fields, the right types, and the right structure. No regex. No "please format as JSON." Just typed, validated data.

```python
class Plan(BaseModel):
    blog_title: str
    audience: str
    tone: str
    tasks: List[Task]    # each task = one section to write
```

### Production API, Not Just a Notebook

The agent graph is wrapped in a **FastAPI** service with:

- **Rate limiting** (3 blog generations/minute per IP)
- **Async timeout guards** (10-minute cap per generation)
- **SQLite persistence** — every generated blog is stored with its plan
- **Deep health checks** that probe the database, LLM API, and search API independently
- **Global error handling** so unhandled exceptions return clean JSON, not stack traces

This isn't an academic demo. It's a deployable service.

### Retry Logic for the Real World

LLM APIs throttle you. The writer nodes include retry logic with backoff for rate-limit errors (`429`). If Groq says "slow down," the system waits and retries — up to 3 attempts per section. The pipeline doesn't crash because one API call got throttled.

---

## What the Output Looks Like

Given the topic *"Explain Self-Attention in Transformers"*, the system produced a ~1,500-word article with:

- 6 structured sections (intro → mechanics → multi-head attention → code walkthrough → gotchas → conclusion)
- Mathematical notation for the attention formula
- A functional Python code snippet
- Coherent cross-references between sections

All generated in under 90 seconds.

---

## The Stack

| Component | Technology |
|-----------|-----------|
| Agent orchestration | LangGraph (StateGraph + Send) |
| LLM | Groq (openai/gpt-oss-120b) |
| Web search | Tavily Search |
| API layer | FastAPI + Uvicorn |
| Data validation | Pydantic v2 |
| Persistence | SQLAlchemy + SQLite |
| Rate limiting | SlowAPI |

---

## What I Learned

Building this project taught me that **the hard part of AI agents isn't the LLM calls — it's the orchestration.** Getting state to flow correctly between nodes, handling failures gracefully, and making parallel execution deterministic required more engineering thought than any individual prompt.

The progression from notebook → standalone script → production API forced me to think about concerns I'd never considered in a Jupyter cell: rate limiting, timeouts, database persistence, health checks, and structured error responses.

If you're learning agentic AI, I'd recommend building something end-to-end like this. The gap between "I can call an LLM" and "I can build a reliable multi-agent system" is where the real learning happens.

---

*The full source code is available on [GitHub](https://github.com/methezain/AI-Technical-Blog-Automation).*
