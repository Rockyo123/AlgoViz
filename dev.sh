#!/bin/sh
trap 'echo "Cleaning up..."; rm -rf ./tmp; exit' INT
yarn dev