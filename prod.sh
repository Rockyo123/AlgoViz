#!/bin/sh
trap 'echo "Cleaning up..."; rm -rf ./tmp; rm -rf ./frontend/tmp; exit' INT
cd frontend && yarn prod & air && fg