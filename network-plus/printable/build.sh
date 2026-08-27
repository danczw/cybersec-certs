#!/bin/bash
cd "$(dirname "$0")"
node generate.js && typst compile all-notes.typ network-plus-notes.pdf
