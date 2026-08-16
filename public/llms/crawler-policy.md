# Crawler policy posture

Last updated: 2026-08-16

## Discovery and search visibility

The site allows search discovery crawlers, including:
- Googlebot
- OAI-SearchBot

## Model-training crawlers

Current default posture is restrictive for model-training crawlers to protect IP:
- Google-Extended: disallowed
- GPTBot: disallowed

This can be changed later if policy preference changes.

## Canonical policy source

- robots.txt: https://alizain.dev/robots.txt
- llms index: https://alizain.dev/llms.txt
