---
sop_name: deploy-frontend-app
repo_name: karngyan-portfolio
app_name: karngyan
app_type: Frontend Application (Nuxt.js Static)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T04:31:00Z
last_updated: 2026-01-30T04:35:00Z
---

# Deployment Plan: karngyan.com

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Nuxt.js 2.x (Static Site Generator)
- Build command: npm run build (NODE_OPTIONS=--openssl-legacy-provider nuxt generate -m)
- Output directory: dist/
- Package manager: npm
- Base path: / (root)
- Entry point: index.html
- Routing: Static multi-page with /path/index.html structure
- CloudFront config: URL rewrite function (rewrites /path to /path/index.html)
- Deployment URL: (after completion)
- Stack name: (after creation)
- CloudFront distribution ID: (after creation)
- S3 bucket name: (after creation)

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "karngyanFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T04:31:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan, validated prerequisites (AWS CLI, npm, credentials), analyzed codebase
Next: Create deploy branch and continue with Phase 1
