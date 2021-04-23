#!/bin/bash
export NODE_ENV=development
npm install
export NODE_ENV=production
npm prune --productio