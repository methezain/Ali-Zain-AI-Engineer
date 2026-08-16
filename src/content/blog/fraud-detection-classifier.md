---
title: 'Catching fraud across 6.3 million transactions'
cardTitle: 'Fraud Detection Classifier'
excerpt: 'A classifier engineered on 6.3M records, flagging suspicious activity at 98% accuracy.'
description: 'A fraud detection classifier engineered on 6.3 million transactions with careful feature engineering and SMOTE, reaching 98% accuracy on heavily imbalanced data.'
category: 'Machine Learning'
pubDate: 2025-11-28
image: '/work/fraud-detection.webp'
imageAlt: 'Analytics dashboard with charts on a dark screen'
work: true
featured: false
order: 8
client: 'Fraud detection'
metric: '98% accuracy · 6.3M records'
metricContext: 'Accuracy figure is from project evaluation on imbalanced transaction data after class-balancing workflow.'
citations:
  - label: 'Scikit-learn documentation'
    url: 'https://scikit-learn.org/stable/'
  - label: 'SMOTE reference (imbalanced-learn)'
    url: 'https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html'
tags: ['Scikit-learn', 'SMOTE', 'FastAPI']
---

This is machine learning engineering in practice: solve imbalance and reliability first, then package the model so it can be consumed safely by production systems.

## What I built

A fraud detection classifier trained on **6.3 million transactions** that flags
suspicious activity at **98% accuracy**.

## How it works

Fraud data is heavily imbalanced — genuine fraud is rare, which is exactly what
makes naive models useless. The work went into feature engineering and using
**SMOTE** to balance the training set so the model learns the fraud signal
instead of just predicting "not fraud" every time. It's built with
**Scikit-learn** and served behind **FastAPI**.

## Why it matters

On imbalanced problems, headline accuracy is a trap — a model can score high by
ignoring the thing you care about. Treating the imbalance directly is what makes
the classifier actually catch fraud rather than look good on paper.

## Related AI engineering paths

If you need fraud or risk scoring in a production workflow, start with
[AI engineering services](/services), review adjacent [AI case studies](/work), or
[contact me](/contact) with your data and risk constraints.

Related reading: [Classifying 300,000 invoices at 98% accuracy](/blog/smart-invoice-classifier) and
[Shipping ML behind a FastAPI service that stays up](/blog/shipping-ml-with-fastapi).
