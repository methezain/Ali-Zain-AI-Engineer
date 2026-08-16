---
title: 'Shipping ML behind a FastAPI service that stays up'
cardTitle: 'Shipping ML With FastAPI'
excerpt: "A model in a notebook isn't a product. Here's the boring, load-bearing part: serving, Docker, and monitoring."
description: 'Notes on serving machine learning models in production with FastAPI and Docker — the deployment, validation, and monitoring that keep a model actually useful.'
category: 'Backend'
pubDate: 2026-05-10
image: '/work/article-backend.webp'
imageAlt: 'Terminal prompt on a dark screen'
work: false
featured: false
order: 99
citations:
  - label: 'FastAPI documentation'
    url: 'https://fastapi.tiangolo.com/'
  - label: 'Docker documentation'
    url: 'https://docs.docker.com/'
tags: ['FastAPI', 'Docker', 'Python']
---

This is the machine learning engineering layer most teams underestimate: turning a promising model into a service that behaves predictably in production.

## The notebook is the easy 80%

A model that scores well in a notebook has done the interesting part and none of
the load-bearing part. What makes it a product is everything after: a stable
interface, predictable deployment, and the ability to tell when it starts
misbehaving. That's the work that decides whether a model quietly keeps earning
its keep or quietly breaks.

## A shape that holds up

**FastAPI** for the interface — typed request and response models mean bad
input is rejected at the door instead of corrupting a prediction. **Docker** so
the thing that runs in production is the exact thing you tested, not a
best-effort reconstruction of it. Keep the model loading and the request
handling separate so a slow load never blocks a request.

## Watch it after it ships

A deployed model is a starting point, not a finish line. Log inputs and
outputs, watch latency, and keep an eye on whether the data coming in still
looks like the data you trained on. Most production model failures aren't
dramatic — they're slow drift that nobody noticed because nobody was looking.

## Why I bother with the boring part

Clients don't remember the model's F1 score. They remember whether the thing
worked when they needed it. The unglamorous infrastructure is what turns a good
model into something a business can actually rely on.

## Related AI engineering paths

If you are moving ML from notebooks into production systems, start with
[AI engineering services](/services), browse more [AI case studies](/work), or
[contact me](/contact) with your deployment and monitoring requirements.

Related reading: [Classifying 300,000 invoices at 98% accuracy](/blog/smart-invoice-classifier) and
[Catching fraud across 6.3 million transactions](/blog/fraud-detection-classifier).
