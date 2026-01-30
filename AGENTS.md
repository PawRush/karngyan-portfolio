# Agent Documentation

This file contains information for AI coding agents working with this repository.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

**Preview URL:** https://d2qku9qmoip7ew.cloudfront.net
**Production URL:** Deployed via pipeline (KarngyanPipeline)

**Pipeline Console:** https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view

**Deployment Trigger:** Push to `deploy-to-aws-20260130_032535-sergeyka` branch

Quick commands:
- Deploy: `git push origin deploy-to-aws-20260130_032535-sergeyka`
- Manual preview deploy: `./scripts/deploy.sh`
