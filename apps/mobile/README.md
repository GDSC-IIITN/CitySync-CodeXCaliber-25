# CitySync Mobile App

A Flutter-based mobile application built for the **CitySync** project — a part of the **CodeXCaliber 2025** initiative.

This app is part of a full-stack monorepo including frontend (Next.js) and backend (Express.js).


## Getting Started

This project is a **production-ready mobile frontend** located inside the `apps/mobile/` directory of the monorepo.

### To get started:

- Make sure [FVM](https://fvm.app) is installed globally on your system.
- This project uses:
    - Flutter: **3.29.3**
    - Dart: **3.7.2**
- FVM is used to lock versions locally (no need to install Flutter globally for this project).


## Project Structure

CitySync-CodeXCaliber-25/ └── apps/ ├── frontend/ # Web app (Next.js) ├── backend/ # Express API └── mobile/ # 📱 This Flutter app


## Installation & Running the App

From the root of the Flutter project:

```bash
cd apps/mobile
fvm install
fvm use stable
fvm flutter pub get
fvm flutter run 
```

## Optional Aliases
To avoid typing fvm flutter every time, you can add these aliases to your terminal profile (.zshrc, .bashrc, etc.):

alias flutter='fvm flutter'
alias dart='fvm dart'

## Resources
Flutter Docs = https://docs.flutter.dev/
First Flutter App Codelab = https://docs.flutter.dev/get-started/codelab
Flutter Cookbook = https://docs.flutter.dev/cookbook

## Maintainer: 
Pranav Sonawane
CitySync – CodeXCaliber Hackathon 2025


