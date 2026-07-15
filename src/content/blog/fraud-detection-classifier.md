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
tags: ['Scikit-learn', 'SMOTE', 'FastAPI']
---

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
