---
title: 'Building B2B and B2C shopping agents for an electronics retailer'
cardTitle: 'B2B & B2C Commerce Agents'
excerpt: 'Two conversational agents that recommend the right laptop, phone, or console straight from a live product database.'
description: 'How I built two OpenAI powered shopping assistants, one for retail and one for trade, that recommend electronics live from a production MongoDB catalog for Exact Solutions Electronics.'
category: 'Agentic AI'
pubDate: 2026-06-18
image: '/work/chatbots-commerce.webp'
imageAlt: 'Desk setup with a monitor, keyboard, phone, and game controllers'
work: true
featured: true
order: 1
client: 'Exact Solutions Electronics'
metric: 'Live in production · B2B + B2C'
metricContext: 'Outcome reflects production deployment across separate B2B and B2C storefront assistant experiences.'
liveLinks:
  - label: 'B2B store'
    url: 'https://www.exactsyn.com/'
  - label: 'B2C store'
    url: 'https://b2c-multivendor-fe.vercel.app/'
citations:
  - label: 'OpenAI API documentation'
    url: 'https://platform.openai.com/docs'
tags: ['OpenAI SDK', 'Python', 'MongoDB', 'Fly.io']
---

This is a practical AI engineer pattern: one core agent architecture, then role-specific behavior by audience so recommendations feel useful in the real buying flow.

## What I built

Exact Solutions Electronics sells laptops, smartphones, PlayStations, and a
long tail of other electronics online. They needed a general-purpose assistant
that could answer product questions and actually recommend the right item —
not a scripted FAQ bot. I built two of them: one for retail customers (B2C) and
one for trade and business buyers (B2B), each tuned to how that audience shops.

## How it works

Both agents run on the OpenAI SDK in Python. A conversation flows like this:
the model works out what the customer is really after — a budget gaming laptop,
a phone with a specific camera, a console that's actually in stock — and then
queries the production **MongoDB** catalog for matching products. Every
recommendation is grounded in that live data, so the agent never invents a
model or quotes a price that doesn't exist.

The two bots share a core but diverge where it counts. The B2C agent optimises
for one confident pick with a plain-language reason. The B2B agent handles
bulk, specifications, and side-by-side comparison across a shortlist. Both are
deployed on **Fly.io**.

## Why it matters

A shopping assistant that hallucinates products erodes trust on the first
wrong answer. Tying every response to the real catalog means the agent is only
ever as wrong as the database — and the database is the source of truth the
business already runs on. That's the difference between a demo and something a
store can put in front of paying customers.

## Related AI engineering paths

If you are planning a production shopping or support assistant, start with
[AI engineering services](/services), check related [AI case studies](/work), or
[contact me](/contact) with your catalog and support workflow details.

Related reading: [A retrieval assistant that actually knows the catalog](/blog/rag-fashion-assistant) and
[Why your RAG system hallucinates — and how to ground it](/blog/grounding-rag-systems).
