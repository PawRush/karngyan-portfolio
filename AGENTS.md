# Agent Instructions

This file contains instructions for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application is deployed using AWS CodePipeline with automated deployments from the `deploy-to-aws` branch. Created with the `setup-pipeline` SOP from AWS MCP.

Pipeline URL: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/KarngyanPipeline/view

Deploy command: `git push origin deploy-to-aws`
Manual deployment (preview): `./scripts/deploy.sh`
