#!/bin/bash
 
npm run build
cordova telemetry off
cordova create project --link-to ./www
cp config.xml project/config.xml
cd project/
cordova plugin add cordova-plugin-statusbar
cordova platform add android@7.0.0
cordova build android
mkdir -p /workspace/build
cp platforms/android/app/build/outputs/apk/debug/app-debug.apk /workspace/build/app-debug.apk