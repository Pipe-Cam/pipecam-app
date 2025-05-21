#!/usr/bin/env bash
set -e

install_if_needed() {
  local dir="$1"
  local name="$2"

  if [ ! -d "$dir/node_modules" ]; then
    echo "Installing npm dependencies in $name..."
    (cd "$dir" && npm install)
  else
    echo "Dependencies already installed in $name."
  fi
}

install_if_needed . "root"
install_if_needed api "api"
install_if_needed client "client"

