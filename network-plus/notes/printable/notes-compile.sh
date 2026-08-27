#!/bin/bash
cd "$(dirname "$0")"
node notes-generate.js && typst compile notes-all.typ notes-network-plus.pdf
