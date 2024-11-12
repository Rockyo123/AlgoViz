#!/bin/sh
trap 'echo "Cleaning up..."; rm -rf ./tmp; rm -rf ./app/tmp; exit' INT
cd app && yarn prod