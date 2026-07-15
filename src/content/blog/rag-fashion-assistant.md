---
title: 'A retrieval assistant that actually knows the catalog'
cardTitle: 'RAG Fashion Assistant'
excerpt: 'Shoppers ask in plain language; answers come back tied to 44,000+ real products in real time.'
description: 'Building a RAG assistant over a 44,000-product fashion catalog with LangChain, Weaviate, and OpenAI — grounded, real-time answers instead of model guesswork.'
category: 'Retrieval (RAG)'
pubDate: 2026-04-30
image: '/work/rag-fashion.webp'
imageAlt: 'Rack of garments hanging in a fashion boutique'
work: true
featured: true
order: 3
client: 'Fashion catalog search'
metric: '44,000+ products indexed'
tags: ['LangChain', 'Weaviate', 'OpenAI']
---

## What I built

A retrieval-augmented chatbot for a fashion knowledge base of more than
**44,000 products**. Customers ask questions in plain language — what goes with
what, whether something comes in their size, how two items compare — and get
answers in real time, drawn from the actual catalog.

## How it works

The catalog is embedded and stored in **Weaviate**, a vector database. When a
shopper asks something, the system retrieves the most relevant products and
hands them to the language model as context, orchestrated with **LangChain** and
**OpenAI**. The model answers from what was retrieved, not from its training
data, so recommendations reflect real, current inventory.

Getting this right is mostly about retrieval quality: good chunking, sensible
embeddings, and enough retrieved context to answer well without drowning the
model in noise.

## Why it matters

Retrieval is what separates a useful catalog assistant from a confident liar. A
plain chatbot will happily invent a product that fits the question; a grounded
one can only recommend what's actually on the shelf. For a store, that's the
whole point — answers customers can act on.
