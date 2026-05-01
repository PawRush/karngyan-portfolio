---
sop_name: deploy-frontend-app
repo_name: karngyan-portfolio
app_name: KarnGyan
app_type: Frontend Application (Nuxt Static)
branch: deploy-to-aws-20260501_121659-kamielw
completed: 2026-05-01 11:09:00 UTC
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d3zqyfwry5k1b.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "KarnGyanFrontend-preview-kamielw" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E2FXT18P356ERC" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://karngyanfrontend-preview--cftos3cloudfrontloggingb-udi22ghjztod/" --recursive | tail -20

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

# Deployment Plan: KarnGyan Portfolio

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

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

- Framework: Nuxt.js 2 (Static)
- Package Manager: npm (yarn.lock present but using npm for compatibility)
- Build Command: `npm run build` (nuxt generate)
- Output Directory: dist/
- CloudFront Config: URL rewrite function (/path/index.html structure)
- Deployment URL: https://d3zqyfwry5k1b.cloudfront.net
- Stack name: KarnGyanFrontend-preview-kamielw
- Distribution ID: E2FXT18P356ERC
- S3 Bucket Name: karngyanfrontend-preview-ka-cftos3s3bucketcae9f2be-mnp7egcpfhp2
- CloudFront Log Bucket: karngyanfrontend-preview--cftos3cloudfrontloggingb-udi22ghjztod
- S3 Log Bucket: karngyanfrontend-preview--cftos3s3loggingbucket64b-fozeeagxzzyl

## Recovery Guide

```bash
# Rollback
cd infra && npx cdk destroy --all

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-05-01 11:00:09 UTC
Agent: Claude Sonnet 4.5
Progress: All phases completed successfully - deployed Nuxt 2 static site to AWS with CloudFront + S3
URL: https://d3zqyfwry5k1b.cloudfront.net
Stack: KarnGyanFrontend-preview-kamielw
