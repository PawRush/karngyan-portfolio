---
sop_name: deploy-frontend-app
repo_name: karngyan-portfolio
app_name: KarnGyan
app_type: Frontend Application (Nuxt Static)
branch: deploy-to-aws-20260501_121659-kamielw
completed: 2026-05-01 11:09:00 UTC
---

# Deployment Summary

Your app is deployed to AWS!

**Production URL:** https://df3dksvujan2d.cloudfront.net  
**Preview URL:** https://d3zqyfwry5k1b.cloudfront.net

**Automated Deployments Enabled!**

CI/CD pipeline is now active. Push to the `deploy-to-aws-20260501_121659-kamielw` branch to trigger automatic deployments.

Pipeline Console: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "KarngyanPipeline" --region eu-central-1 --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "KarngyanPipeline" --region eu-central-1

# View deployment status (preview)
aws cloudformation describe-stacks --stack-name "KarnGyanFrontend-preview-kamielw" --query 'Stacks[0].StackStatus' --output text

# View deployment status (production - deployed via pipeline)
aws cloudformation describe-stacks --stack-name "KarngyanFrontend-prod" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache (preview)
aws cloudfront create-invalidation --distribution-id "E2FXT18P356ERC" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://karngyanfrontend-preview--cftos3cloudfrontloggingb-udi22ghjztod/" --recursive | tail -20

# Manual deployment (preview environment)
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

# CI/CD Pipeline Setup

**Created:** 2026-05-01  
**Pipeline:** KarngyanPipeline  
**Status:** Active  
**Region:** eu-central-1

## Pipeline Information

- **Pipeline ARN:** arn:aws:codepipeline:eu-central-1:189681391221:KarngyanPipeline
- **Pipeline URL:** https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view
- **Stack Name:** KarngyanPipelineStack
- **Source Repository:** PawRush/karngyan-portfolio
- **Branch:** deploy-to-aws-20260501_121659-kamielw
- **CodeConnection:** arn:aws:codeconnections:eu-central-1:189681391221:connection/ee7a600a-99ab-4b3a-bf6c-b42cc9f5a026
- **Production URL:** https://df3dksvujan2d.cloudfront.net
- **Production Distribution ID:** E26J9CYQOUK2GZ

## Pipeline Stages

1. **Source** - Pulls code from GitHub via CodeConnection
2. **Build** - Runs `npm install`, `npm run build`, secret scanning, CDK synthesis
3. **UpdatePipeline** - Self-mutation (updates pipeline if changed)
4. **Assets** - Publishes file assets to S3
5. **Deploy** - Deploys KarngyanFrontend-prod stack

## How to Deploy

Push changes to the `deploy-to-aws-20260501_121659-kamielw` branch:

```bash
git push origin deploy-to-aws-20260501_121659-kamielw
```

The pipeline will automatically:
1. Pull the latest code
2. Install dependencies
3. Run security checks (secretlint)
4. Build the application
5. Deploy to production CloudFront + S3

## Pipeline Management

### Redeploy Pipeline Stack

```bash
cd infra
npm run deploy:pipeline
```

### Destroy Pipeline

```bash
cd infra
npm run destroy:pipeline
```

### Monitor Pipeline Logs

```bash
# Build logs
aws logs tail "/aws/codebuild/KarngyanPipelineStack-Synth" --region eu-central-1 --follow

# Pipeline execution history
aws codepipeline list-pipeline-executions --pipeline-name "KarngyanPipeline" --region eu-central-1
```

## Pipeline Architecture

The pipeline uses AWS CDK Pipelines (v2) with:
- **CodeBuild:** Standard 7.0 image with Node.js latest
- **Self-Mutation:** Enabled (pipeline updates itself when infrastructure changes)
- **Termination Protection:** Enabled on pipeline stack
- **Quality Checks:** Secret scanning with secretlint

## Environments

| Environment | Stack Name | Deployment Method | URL |
|-------------|-----------|-------------------|-----|
| Preview (local) | KarnGyanFrontend-preview-kamielw | Manual (`./scripts/deploy.sh`) | https://d3zqyfwry5k1b.cloudfront.net |
| Production | KarngyanFrontend-prod | Automated (via Pipeline) | https://df3dksvujan2d.cloudfront.net |

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

### Session 2 - 2026-05-01 13:00:00 UTC
Agent: Claude Sonnet 4.5
Progress: Set up CI/CD pipeline using setup-pipeline SOP
- Created KarngyanPipelineStack with CodePipeline
- Configured GitHub integration via existing CodeConnection
- Pipeline automatically triggers on push to deploy-to-aws-20260501_121659-kamielw
- Deploys to KarngyanFrontend-prod stack
Stack: KarngyanPipelineStack
Pipeline: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view
