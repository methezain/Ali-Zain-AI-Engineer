---
title: 'Automating banking document intake into S3'
cardTitle: 'Banking Document Pipeline'
excerpt: 'Reads each banking document, validates the fields, and files structured results to S3 — no manual queue.'
description: 'An OCR and FastAPI pipeline that reads banking documents, validates the extracted fields, and archives structured data to AWS S3 — cutting manual work 90% and processing time 70%.'
category: 'Automation'
pubDate: 2026-03-22
image: '/work/banking-ocr.webp'
imageAlt: 'Close-up of a hand pressing keys on a bank ATM keypad'
work: true
featured: true
order: 4
client: 'Financial document ingestion'
metric: '−90% manual work · −70% processing time'
tags: ['OCR', 'FastAPI', 'AWS S3']
---

## What I built

An end-to-end pipeline that ingests banking documents, extracts the data,
validates it, and stores the results — with no one sitting in the middle
copying fields by hand. I led the API development for the OCR, extraction,
validation, and storage stages.

## How it works

A document comes in and is read with **OCR**. The extracted fields are validated
against what the record should contain, and the clean, structured result is
written to **Amazon S3** for downstream use. The whole flow sits behind a
**FastAPI** service, so it can be triggered as part of a larger system rather
than run as a one-off script.

## Why it matters

The before-picture was a manual review queue: people opening documents,
reading numbers, typing them into a system. That approach doesn't scale and it
makes mistakes. Automating it cut **manual workload by 90%** and **processing
time by 70%** — and, just as importantly, made the process consistent. The
pipeline reads every document the same way, every time.
