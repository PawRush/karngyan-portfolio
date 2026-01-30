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

Your app is deployed to AWS with automated CI/CD!

**Production URL:** (deployed via pipeline)
**Preview URL:** https://d2qku9qmoip7ew.cloudfront.net

**Pipeline:** KarngyanPipeline
**Console:** https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view

**Deployment Trigger:** Push to `deploy-to-aws-20260130_032535-sergeyka` branch

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# Deploy to production (via pipeline)
git push origin deploy-to-aws-20260130_032535-sergeyka

# View pipeline status
aws codepipeline get-pipeline-state --name "KarngyanPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/KarngyanPipelineStack-Synth" --follow

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "KarngyanPipeline"

# View production stack status
aws cloudformation describe-stacks --stack-name "KarngyanFrontend-prod" --query 'Stacks[0].StackStatus' --output text

# View preview deployment status
aws cloudformation describe-stacks --stack-name "KarngyanFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Manual redeploy (preview only)
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

## Pipeline Info

- Pipeline name: KarngyanPipeline
- Pipeline stack: KarngyanPipelineStack
- Pipeline ARN: arn:aws:codepipeline:us-east-1:126593893432:KarngyanPipeline
- Source branch: deploy-to-aws-20260130_032535-sergeyka
- Repository: PawRush/karngyan-portfolio
- CodeConnection ARN: arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b
- CodeConnection status: AVAILABLE
- Production stack: KarngyanFrontend-prod
- Quality checks: None (no lint/test scripts in project)
- Deployment trigger: Push to branch
- Pipeline timestamp: 2026-01-30T05:17:00Z

## Recovery Guide

```bash
# Destroy pipeline
cd infra && npm run destroy:pipeline

# Destroy preview stack
cd infra && cdk destroy "KarngyanFrontend-preview-sergeyka"

# Destroy production stack
cd infra && cdk destroy "KarngyanFrontend-prod" --context codeConnectionArn=arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b

# Manual redeploy (preview)
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

### Session 2 - 2026-01-30T05:17:00Z to 2026-01-30T05:20:00Z
Agent: Claude Sonnet 4.5
Progress: Complete pipeline setup from context gathering through deployment
- Phase 1: Detected infrastructure, confirmed settings (repo: PawRush/karngyan-portfolio, branch: deploy-to-aws-20260130_032535-sergeyka, existing CodeConnection)
- Phase 2: Created PipelineStack with CDK Pipelines, added synth commands, deployed KarngyanPipelineStack
- Phase 3: Updated DEPLOYMENT.md with pipeline information, updated AGENTS.md and README.md
Status: Pipeline deployment successful, first execution in progress
