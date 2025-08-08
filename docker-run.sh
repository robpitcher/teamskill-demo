#!/bin/bash

# Docker build and run script for TeamSkill Demo

set -e

echo "🐳 Building TeamSkill Demo Docker image..."
docker build -t teamskill-demo .

echo "✅ Build complete!"

echo "🚀 Starting TeamSkill Demo container..."
docker run -d --name teamskill-demo-app -p 3000:80 teamskill-demo

echo "🌐 TeamSkill Demo is now running at http://localhost:3000"
echo ""
echo "To stop the container:"
echo "  docker stop teamskill-demo-app"
echo ""
echo "To remove the container:"
echo "  docker rm teamskill-demo-app"
echo ""
echo "To view container logs:"
echo "  docker logs teamskill-demo-app"