---
title: 'Why your RAG system hallucinates — and how to ground it'
cardTitle: 'Grounding RAG Systems'
excerpt: 'Retrieval quality, chunking, and prompt design decide whether a RAG bot is trustworthy or a liability.'
description: 'A practical take on grounding RAG systems: the retrieval quality, chunking strategy, and prompt design that stop a chatbot from making things up.'
category: 'Retrieval (RAG)'
pubDate: 2026-07-01
image: '/work/article-rag.webp'
imageAlt: 'Wall of books on wooden library shelves'
work: false
featured: false
order: 99
citations:
  - label: 'LangChain documentation'
    url: 'https://python.langchain.com/docs/'
  - label: 'OpenAI API documentation'
    url: 'https://platform.openai.com/docs'
tags: ['RAG', 'LangChain', 'Vector DBs']
---

This is the core reliability question for retrieval systems: can the assistant prove where its answer came from, or is it still guessing with confidence.

## The problem is rarely the model

When a retrieval-augmented system makes things up, the instinct is to blame the
language model. Usually the model is fine — it's answering faithfully from
whatever context it was handed. The problem is that the context was wrong,
incomplete, or missing. Fix retrieval and most "hallucinations" disappear.

## Three things that actually move the needle

**Chunking.** Split documents so each chunk is a self-contained idea. Chunks
that are too big bury the answer in noise; too small and they lose the context
that makes them meaningful. This is unglamorous and it matters more than the
model choice.

**Retrieval quality.** Retrieve enough to answer the question and no more.
Measure it directly — does the answer actually appear in what you retrieved? If
not, no prompt will save you.

**Prompt design.** Tell the model to answer *only* from the provided context and
to say when it doesn't know. A model given permission to say "I don't have that"
is far more useful than one that always produces something.

## The mindset

Treat a RAG system as a retrieval problem with a language model on the end, not
a language model with some documents attached. That ordering is what makes the
difference between a bot people trust and one they learn to double-check.

## Related AI engineering paths

If you are evaluating RAG for production support or internal knowledge, start with
[AI engineering services](/services), explore more [AI case studies](/work), or
[contact me](/contact) with your data shape and risk tolerance.

Related reading: [A retrieval assistant that actually knows the catalog](/blog/rag-fashion-assistant) and
[What an AI engineer does in the first 30 days of a project](/blog/ai-engineer-first-30-days).
