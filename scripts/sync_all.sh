#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$SCRIPT_DIR/../.venv"

# 激活虚拟环境（GitHub Actions 中由 workflow 创建）
if [ -f "$VENV/bin/activate" ]; then
  source "$VENV/bin/activate"
elif [ -f "$VENV/Scripts/activate" ]; then
  source "$VENV/Scripts/activate"
fi

cd "$SCRIPT_DIR"

echo "=== Syncing products ==="
python sync_products.py

echo "=== Sync complete ==="
