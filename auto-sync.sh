#!/bin/bash

echo "🔄 Starting auto-sync for neuroinnova-cl..."
echo "📁 Watching for file changes..."
echo "💡 Press Ctrl+C to stop auto-sync"

# Function to commit and push changes
commit_and_push() {
    echo "📝 Changes detected! Committing and pushing..."
    
    # Check if there are changes to commit
    if [[ -n $(git status --porcelain) ]]; then
        git add .
        git commit -m "Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ Auto-sync completed!"
    else
        echo "ℹ️  No changes to commit"
    fi
}

# Watch for file changes and auto-commit
fswatch -o . --exclude='\.git' --exclude='node_modules' --exclude='\.DS_Store' | while read f; do
    commit_and_push
done 