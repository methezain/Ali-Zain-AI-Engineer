---
title: 'Text or scan, one pipeline: extraction with vision models'
cardTitle: 'Extraction With Vision Models'
excerpt: 'When files arrive as spreadsheets, PDFs, and photos, language and vision models have to pull in the same direction.'
description: 'How to combine LLM text extraction and vision models to pull structured data from mixed format documents: spreadsheets, digital PDFs, and scanned images alike.'
category: 'Document Intelligence'
pubDate: 2026-06-05
image: '/work/article-vision.webp'
imageAlt: 'A hand working with a paper document on a desk'
work: false
featured: false
order: 99
citations:
  - label: 'OpenAI API documentation'
    url: 'https://platform.openai.com/docs'
  - label: 'Tesseract OCR project'
    url: 'https://tesseract-ocr.github.io/'
tags: ['OpenAI', 'Vision', 'OCR']
---

This article covers the operational core of document intelligence: one pipeline that can adapt to text files and scans while producing the same trustworthy output schema.

## Real documents don't arrive clean

In production, the same information shows up as a tidy spreadsheet from one
client and a phone photo of a printout from another. If your pipeline only
handles one of those, it doesn't really handle documents — it handles the happy
path. The goal is one pipeline that copes with all of it and produces the same
structured output regardless of how the data came in.

## Route by what the file actually is

The trick is to split early. Digital, text-based files — CSV, XLSX, native PDFs
— go through language-model extraction: the text is already there, so you're
asking the model to find and structure fields. Scanned images and photos go
through **vision** extraction instead, where the model reads the document
visually, the way a person would.

Detecting which path a file belongs on — and falling back to vision when a
"PDF" turns out to be a scan — is half the reliability battle.

## Validate before you trust

Extraction isn't done when the model returns something; it's done when that
something passes validation. Check types, ranges, and required fields before
anything is written downstream. On documents that decide someone's pay or a
financial record, the validation layer is not optional — it's the part that
lets you sleep at night.

## Related AI engineering paths

If your team receives mixed PDFs, spreadsheets, and scans, start with
[AI engineering services](/services), review relevant [AI case studies](/work), or
[contact me](/contact) for a phased implementation plan.

Related reading: [The extraction engine behind PaysEye, a UK payroll platform](/blog/payseye-extraction-engine) and
[Automating banking document intake into S3](/blog/banking-document-pipeline).
