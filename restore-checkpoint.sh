#!/bin/bash
# restore-checkpoint.sh
# Script to restore the saved development checkpoint

CHECKPOINT_NAME="pm-dashboard-checkpoint"

echo "=== Restoring checkpoint: $CHECKPOINT_NAME ==="

# Fetch latest tags from GitHub
git fetch --tags

# Checkout the checkpoint tag
git checkout $CHECKPOINT_NAME

echo "✅ You are now at checkpoint '$CHECKPOINT_NAME'"
echo "To continue development, you may want to create a new branch from here:"
echo "  git checkout -b feature-resume-from-checkpoint"
