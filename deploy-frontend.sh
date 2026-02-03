#!/bin/bash
# Deploy only the frontend JS to Home Assistant (no restart needed)
# Run this script from the project directory

set -e

HA_HOST="root@192.168.1.229"
HA_PORT="5555"
HA_CONFIG="/root/homeassistant"

echo "=== Frontend-only Deployment ==="
echo ""

# Rebuild frontend
echo "1. Rebuilding frontend..."
cd frontend && npm run build && cd ..

# Copy the built JS to www folder
echo "2. Copying built JS to integration..."
cp frontend/dist/chore-scheduler-card.js custom_components/chore_scheduler/www/

# Deploy just the JS file
echo "3. Deploying JS to Home Assistant..."
scp -P ${HA_PORT} custom_components/chore_scheduler/www/chore-scheduler-card.js ${HA_HOST}:${HA_CONFIG}/custom_components/chore_scheduler/www/

echo ""
echo "=== Done ==="
echo ""
echo "Hard-refresh your browser (Ctrl+Shift+R) to load the new frontend."
