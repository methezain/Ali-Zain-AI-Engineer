---
title: 'Classifying 300,000 invoices at 98% accuracy'
cardTitle: 'Smart Invoice Classifier'
excerpt: 'A model that routes messy, mixed-vendor invoices into five categories automatically.'
description: 'Training a Random Forest on 300,000 invoices to classify five categories at 98% accuracy, served behind a FastAPI service in Docker.'
category: 'Machine Learning'
pubDate: 2026-02-11
image: '/work/invoice-classifier.webp'
imageAlt: 'Invoices and tax documents spread across a desk beside a calculator'
work: true
featured: false
order: 6
client: 'Mixed-vendor invoice routing'
metric: '98% accuracy · 300k invoices'
metricContext: 'Accuracy and volume are based on model evaluation over a multi-vendor invoice dataset of roughly 300k records.'
citations:
  - label: 'Scikit-learn documentation'
    url: 'https://scikit-learn.org/stable/'
  - label: 'FastAPI documentation'
    url: 'https://fastapi.tiangolo.com/'
tags: ['Scikit-learn', 'FastAPI', 'Docker']
---

This is a classic machine learning engineer use case: reduce a repetitive business queue by combining robust preprocessing, model quality, and clean API delivery.

## What I built

A classification model that sorts incoming invoices into five categories
automatically. It was trained on **300,000 invoices** spanning many different
vendor formats, and it reaches **98% accuracy** on that mix.

## How it works

The model is a Random Forest trained with **Scikit-learn**. The real work was
upstream of the algorithm: cleaning and featurising invoices that arrive in
wildly inconsistent layouts so the classifier sees a stable signal rather than
formatting noise. Once trained, it's served behind a **FastAPI** endpoint and
packaged with **Docker**, so it drops into an existing system as a simple
service call.

## Why it matters

Invoice triage is exactly the kind of repetitive judgement work that eats
people's time without using their skill. Turning it into an instant, 98%-
accurate routing step means the manual sorting queue essentially disappears,
and the few genuinely ambiguous cases are the only ones a human needs to look
at.

## Related AI engineering paths

If your team is still triaging invoices manually, start with
[AI engineering services](/services), review adjacent [AI case studies](/work), or
[contact me](/contact) for a scoped rollout.

Related reading: [Catching fraud across 6.3 million transactions](/blog/fraud-detection-classifier) and
[Shipping ML behind a FastAPI service that stays up](/blog/shipping-ml-with-fastapi).
