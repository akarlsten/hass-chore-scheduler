#!/bin/bash
# Deploy Chore Scheduler to Home Assistant
# Run this script from the project directory

set -e

HA_HOST="root@192.168.1.229"
HA_PORT="5555"
HA_CONFIG="/root/homeassistant"  # Your HA config path

echo "=== Chore Scheduler Deployment ==="
echo ""

# Rebuild frontend first
echo "1. Rebuilding frontend..."
cd frontend && npm run build && cd ..

# Copy the built JS to www folder
echo "2. Copying built JS to integration..."
cp frontend/dist/chore-scheduler-card.js custom_components/chore_scheduler/www/

# Deploy to HA
echo "3. Deploying to Home Assistant..."
echo "   Copying custom_components/chore_scheduler to ${HA_HOST}:${HA_CONFIG}/custom_components/"

scp -P ${HA_PORT} -r custom_components/chore_scheduler ${HA_HOST}:${HA_CONFIG}/custom_components/

# Restart HA core
echo "4. Restarting Home Assistant..."
ssh -p ${HA_PORT} ${HA_HOST} "ha core restart"

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "HA is restarting. Give it a minute, then hard-refresh your browser (Ctrl+Shift+R)."
