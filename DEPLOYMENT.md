---
sop_name: deploy-frontend-app
repo_name: karngyan-portfolio
app_name: KarnPortfolio
app_type: Frontend Application (Nuxt.js Static)
branch: deploy-to-aws-20260506_150212-kamielw
created: 2026-05-06T15:54:00Z
completed: 2026-05-06T16:06:00Z
framework: Nuxt.js 2
package_manager: npm
build_command: npm run build
output_directory: dist/
base_path: /
entry_point: index.html
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://dg6evzn98m62z.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
AWS_PAGER="" aws cloudformation describe-stacks --stack-name "KarnPortfolioFrontend-preview-kamielw" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
AWS_PAGER="" aws cloudfront create-invalidation --distribution-id "E3SQBIER9MYQ0I" --paths "/*"

# View CloudFront access logs (last hour)
AWS_PAGER="" aws s3 ls "s3://karnportfoliofrontend-pre-cftos3cloudfrontloggingb-ptxyvna6zjgu/" --recursive | tail -20

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

# Deployment Plan: Karn Portfolio

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure ✅
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Switch to Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure ✅
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate ✅
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation ✅
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- **Deployment URL**: https://dg6evzn98m62z.cloudfront.net
- **Stack name**: KarnPortfolioFrontend-preview-kamielw
- **Region**: eu-central-1
- **Distribution ID**: E3SQBIER9MYQ0I
- **Distribution Domain**: dg6evzn98m62z.cloudfront.net
- **S3 Bucket**: karnportfoliofrontend-previ-cftos3s3bucketcae9f2be-apflypixshgi
- **CloudFront Log Bucket**: karnportfoliofrontend-pre-cftos3cloudfrontloggingb-ptxyvna6zjgu
- **S3 Log Bucket**: karnportfoliofrontend-pre-cftos3s3loggingbucket64b-7zzyaa2wsvaq
- **Deployment Timestamp**: 2026-05-06T16:05:48Z

## Recovery Guide

```bash
# Rollback
cd infra
AWS_PAGER="" npx cdk destroy "KarnPortfolioFrontend-preview-kamielw" --region eu-central-1

# Redeploy
./scripts/deploy.sh
```

## Architecture

### Infrastructure Components

1. **S3 Bucket** - Hosts static files with:
   - Server-side encryption
   - Access logging enabled
   - Auto-delete on stack deletion (preview environments only)

2. **CloudFront Distribution** - Global CDN with:
   - HTTP/2 and HTTP/3 support
   - TLS 1.2 minimum
   - Custom security headers (CSP)
   - URL rewrite function for Nuxt.js routing
   - Origin Access Control (OAC) for secure S3 access

3. **CloudFront Functions**:
   - **CSP Function**: Adds Content-Security-Policy headers
   - **URL Rewrite Function**: Rewrites `/path` to `/path/index.html` for Nuxt.js static routing

4. **Access Logging**:
   - S3 access logs → Separate S3 bucket
   - CloudFront access logs → Separate S3 bucket

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-05-06T15:54:00Z - 2026-05-06T16:06:00Z
Agent: Claude Sonnet 4.5
Progress: Full deployment completed successfully
- Analyzed Nuxt.js 2 static site configuration
- Built CDK infrastructure with S3 + CloudFront
- Deployed to eu-central-1 region
- Validated stack and URL accessibility
Status: ✅ Complete
