#!/bin/bash
cd "$(dirname "$0")"
node abbr-generate.js && typst compile abbr-all.typ abbr-network-plus.pdf
