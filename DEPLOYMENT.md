---
sop_name: deploy-frontend-app
repo_name: karngyan-portfolio
app_name: karngyan
app_type: Frontend Application (Nuxt.js Static)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T04:31:00Z
completed: 2026-01-30T04:48:00Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d2qku9qmoip7ew.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "KarngyanFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "EHGCWSRWDZW2K" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://karngyanfrontend-preview--cftos3cloudfrontloggingb-wfvkbu32jccz/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Plan: karngyan.com

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Framework: Nuxt.js 2.x (Static Site Generator)
- Build command: npm run build (NODE_OPTIONS=--openssl-legacy-provider nuxt generate -m)
- Output directory: dist/
- Package manager: npm
- Base path: / (root)
- Entry point: index.html
- Routing: Static multi-page with /path/index.html structure
- CloudFront config: URL rewrite function (rewrites /path to /path/index.html)
- Deployment URL: https://d2qku9qmoip7ew.cloudfront.net
- Stack name: KarngyanFrontend-preview-sergeyka
- CloudFront distribution ID: EHGCWSRWDZW2K
- CloudFront domain: d2qku9qmoip7ew.cloudfront.net
- S3 bucket name: karngyanfrontend-preview-se-cftos3s3bucketcae9f2be-zmkqy0g2jxw3
- S3 log bucket: karngyanfrontend-preview--cftos3s3loggingbucket64b-gabvsshrymls
- CloudFront log bucket: karngyanfrontend-preview--cftos3cloudfrontloggingb-wfvkbu32jccz
- Deployment timestamp: 2026-01-30T04:43:00Z

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "KarngyanFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T04:31:00Z to 2026-01-30T04:48:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from initial setup through all phases
- Phase 1: Created deployment plan, validated prerequisites, detected build configuration
- Phase 2: Initialized CDK infrastructure, generated frontend stack with URL rewrite function, created deployment script
- Phase 3: Executed CDK deployment, validated CloudFormation stack, confirmed website accessibility
- Phase 4: Finalized documentation, created DEPLOYMENT.md and AGENTS.md, updated README.md
Status: Deployment successful
