---
title: 'The extraction engine behind PaysEye, a UK payroll platform'
cardTitle: 'PaysEye Extraction Engine'
excerpt: 'Timesheets and payroll files — spreadsheets, PDFs, or scans — turned into clean, validated data.'
description: 'How the extraction layer inside PaysEye turns UK timesheets and payroll files in any format into validated data, using LLMs for text and vision models for scanned documents.'
category: 'Document Intelligence'
pubDate: 2026-05-27
image: '/work/payseye-extraction.webp'
imageAlt: 'Laptop displaying a data dashboard on a glass desk'
work: true
featured: true
order: 2
client: 'Intalytic Group'
metric: 'Any format · Text + Vision'
metricContext: 'Any-format claim refers to routing text files and scanned files through separate extraction paths into one validated schema.'
citations:
  - label: 'OpenAI API documentation'
    url: 'https://platform.openai.com/docs'
  - label: 'PostgreSQL documentation'
    url: 'https://www.postgresql.org/docs/'
tags: ['OpenAI', 'TypeScript', 'PostgreSQL']
---

This is document intelligence at product scale: unify extraction across mixed formats without forcing clients to clean files before upload.

## What I built

PaysEye is a payroll SaaS platform used by UK businesses. I worked on it as an
AI engineer on the team, building the layer that reads payroll — the part that
takes whatever a client sends in and turns it into structured records the
system can actually process. In practice that means timesheets and payroll
files arriving as spreadsheets, PDFs, and scanned images, in no consistent
format.

## How it works

The engine is written in **TypeScript** and routes each file by type. Text-based
files — CSV, XLSX, and digital PDFs — go through language-model extraction that
pulls out the fields we need. Scanned files and images go through **vision**
extraction instead, reading the document the way a person would. Everything is
validated and written to **PostgreSQL** as clean, structured data.

The hard part isn't any single format — it's that they all have to end up in
the same shape, reliably, without a human checking each one.

## Why it matters

Payroll is unforgiving: a misread number is someone's paycheque. Handling every
format through one validated pipeline means the platform can accept whatever a
client already has, instead of forcing them to reformat their data first — and
the finance team downstream can trust what lands in the database.

## Related AI engineering paths

If your payroll or finance team is managing mixed-format files manually, start with
[AI engineering services](/services), compare more [AI case studies](/work), or
[contact me](/contact) with your current document flow.

Related reading: [Automating banking document intake into S3](/blog/banking-document-pipeline) and
[Text or scan, one pipeline: extraction with vision models](/blog/structured-extraction-vision-models).
