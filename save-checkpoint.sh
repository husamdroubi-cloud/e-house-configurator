#!/bin/bash
# save-checkpoint.sh
# Script to save and restore a development checkpoint

CHECKPOINT_NAME="pm-dashboard-checkpoint"

echo "=== Saving checkpoint: $CHECKPOINT_NAME ==="

# Make sure everything is staged
git add -A

# Commit with a clear checkpoint message
git commit -m "chore: checkpoint save ($CHECKPOINT_NAME)" || echo "No changes to commit"

# Create or update the tag
git tag -f $CHECKPOINT_NAME
git push origin $CHECKPOINT_NAME --force

echo "Checkpoint '$CHECKPOINT_NAME' saved successfully."
echo "To restore later, run:"
echo "  git checkout $CHECKPOINT_NAME"
