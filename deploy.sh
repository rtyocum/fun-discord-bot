#!/bin/bash
export NODE_ENV=development
npm install
tsc
export NODE_ENV=production
npm prune --production