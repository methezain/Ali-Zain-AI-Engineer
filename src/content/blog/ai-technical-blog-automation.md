---
title: 'I built an AI agent that writes technical blog posts'
cardTitle: 'AI Blog Automation Agent'
excerpt: 'A multi-agent system that researches, outlines, writes in parallel, and delivers a publication-ready article in under 90 seconds.'
description: 'A deep dive into building a LangGraph-based multi-agent system that autonomously researches the web, creates structured outlines, writes sections in parallel, and delivers publication-ready technical blog posts via a production FastAPI service.'
category: 'Agentic AI'
pubDate: 2026-09-30
image: '/work/article-blog-automation.webp'
imageAlt: 'AI blog automation agent pipeline diagram'
work: false
featured: false
order: 99
citations:
  - label: 'LangGraph documentation'
    url: 'https://langchain-ai.github.io/langgraph/'
  - label: 'FastAPI documentation'
    url: 'https://fastapi.tiangolo.com/'
  - label: 'Tavily Search API'
    url: 'https://tavily.com/'
  - label: 'Source code on GitHub'
    url: 'https://github.com/methezain/AI-Technical-Blog-Automation'
tags: ['LangGraph', 'FastAPI', 'Groq', 'Python']
---

Writing a good technical blog post takes hours. You research, outline, draft, restructure, edit. Most of that process follows a predictable pattern, so I built a system that handles the entire pipeline autonomously.

Not a single LLM call that dumps 2,000 words of generic text. A *system* with multiple specialized agents, each doing one job well, passing work to the next.

## How the pipeline works

The system is a graph of AI agents, where each node has a specific role:

```
Topic → Research Agent → Orchestrator → Writers (×N) → Reducer → Final Article
```

**Research Agent** receives a topic and decides whether it needs to search the web. For something like "how binary search works," it skips the search. For "latest LangGraph features in 2026," it fires off web searches via Tavily, reads the results, and optionally runs follow-up searches if the first pass was thin.

**Orchestrator** takes the research findings and produces a structured outline: blog title, target audience, tone, and 5 to 7 section tasks, each with a goal, bullet points, and a target word count. This outline is enforced as a strict JSON schema, so the downstream pipeline always gets clean, typed data.

**Writers** receive one section task each and run in parallel. The system dispatches all tasks simultaneously.

**Reducer** collects all written sections, sorts them by section order, merges them into a single Markdown file, and saves it to disk.

You POST a topic, wait about 60 seconds, and get back a structured article with headings, code snippets, and coherent flow.

## Why a graph, not a chain

Most LLM tutorials show a simple chain: prompt, LLM, output. That breaks down fast when you need conditional logic (should I search or not?) and parallel execution (write 6 sections at once).

I used **LangGraph's StateGraph**, a directed graph where each node is a function that reads and writes to shared state. Edges between nodes can be conditional, and nodes can fan out to run in parallel. This gave me:

- A **ReAct loop** for the research agent (reason, act, observe, repeat)
- **Conditional routing** to skip research when it is unnecessary
- **Parallel fanout** via LangGraph's `Send()` to dispatch writer tasks simultaneously

## Structured output over string parsing

The orchestrator does not return free-text outlines. It uses `llm.with_structured_output(Plan)`, constraining the LLM to return a valid Pydantic model. The plan always has the right fields, the right types, and the right structure. No regex. No "please format as JSON." Just typed, validated data.

```python
class Plan(BaseModel):
    blog_title: str
    audience: str
    tone: str
    tasks: List[Task]    # each task = one section to write
```
Here are some other examples of schema definitions used in the project:

```python
class Task(BaseModel):
    id: int
    title: str = Field(..., description="The actual task/section title")
    goal: str = Field(..., description="One sentence describing section takeaways.")
    bullets: List[str] = Field(..., description="3-5 concrete subpoints.")
    target_words: int = Field(..., description="Word target (120-450)")
    section_type: Literal["intro", "core", "examples", "checklist", "conclusion", "FAQs"]
    description: str = Field(..., description="Description of the task.")
    requires_code: bool = False
```
Overall state schema:

```python
class State(TypedDict):
    topic: str
    tone: str
    messages: Annotated[List[BaseMessage], operator.add]
    plan: Optional[Plan]
    target_word_count: int
    sections: Annotated[List[tuple[int, str]], operator.add]
    final_blog: str
```
Final blog generation response schema:

```python
class BlogGenerationResponse(BaseModel):
    topic: str
    plan: Optional[Plan] = None
    final_blog: str
```

## Production API, not just a notebook

The agent graph is wrapped in a **FastAPI** service with rate limiting (3 blog generations per minute per IP), async timeout guards (10-minute cap per generation), SQLite persistence for every generated blog, deep health checks that probe the database, LLM API, and search API independently, and global error handling so unhandled exceptions return clean JSON, not stack traces.

Here is a glance of main.py 

```python
# ── Root Endpoint ─────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"message": "Blog Automation Agent is running 🚀."}

# ── Router ─────────────────────────────────────────────────────────
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

Writer nodes include retry logic with backoff for rate-limit errors. If the LLM provider says "slow down," the system waits and retries up to 3 attempts per section. The pipeline does not crash because one API call got throttled.

## The stack

| Component | Technology |
|-----------|------------|
| Agent orchestration | LangGraph (StateGraph + Send) |
| LLM | Groq |
| Web search | Tavily Search |
| API layer | FastAPI + Uvicorn |
| Data validation | Pydantic v2 |
| Persistence | SQLAlchemy + SQLite |
| Rate limiting | SlowAPI |

## What I took away from building this

The hard part of AI agents is not the LLM calls. It is the orchestration. Getting state to flow correctly between nodes, handling failures gracefully, and making parallel execution deterministic required more engineering thought than any individual prompt.

The progression from notebook to standalone script to production API forced me to think about concerns I had never considered in a Jupyter cell: rate limiting, timeouts, database persistence, health checks, and structured error responses.

The full source code is on <a href="https://github.com/methezain/AI-Technical-Blog-Automation" target="_blank" rel="noopener noreferrer">GitHub</a>.

## Related AI engineering paths

If you are exploring agentic workflows or multi-agent systems, start with
[AI engineering services](/services), browse more [AI case studies](/work), or
[contact me](/contact) with your automation requirements.

Related reading: [An agent that drafts SEO-ready articles end to end](/blog/ai-seo-content-engine) and
[Shipping ML behind a FastAPI service that stays up](/blog/shipping-ml-with-fastapi).
