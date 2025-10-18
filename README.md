# SmartToDock

SmartToDock is a GNOME Shell extension that intelligently manages and updates the pinned apps in your Ubuntu Dock (or Dash-to-Dock) based on your actual usage patterns. It automatically refreshes your favorites list, so your most-used apps are always just a click away.

## Features

- Dynamically pins your top-used apps to the Ubuntu Dock, sorted alphabetically by display name.
- User-configurable maximum number of pinned apps (default: 20).
- User-configurable interval for automatic updates (default: 1 hour).
- Clean preferences UI with spin-boxes for limits and update interval.
- Quick access buttons in the preferences to visit the extension’s GNOME Extensions and GitHub pages.

## Requirements

- GNOME Shell 44 or newer (for full ES module and Adw support).
- Ubuntu with the standard GNOME-based dock or compatible Dash-to-Dock/Dash-to-Panel setups.
- GJS (GNOME JavaScript engine) and Gtk 4/Adwaita support.

## Installation

### Method 1: GNOME Extensions Website

1. Visit the [GNOME Extensions page for SmartToDock](https://extensions.gnome.org/extension/7370/smarttodock/).
2. Click "Install" for one-click integration.

### Method 2: Manual Installation (From Source)

1. Clone this repository:

  ```bash
  git clone https://github.com/Tejaromalius/SmartToDock.git
  ```

2. Copy or symlink the directory to your local GNOME extensions folder:

  ```bash
  cp -r SmartToDock ~/.local/share/gnome-shell/extensions/smarttodock@tayefi.ilia.protonmail.com
  ```

3. Restart GNOME Shell (`Alt+F2`, type `r` and press Enter) or log out/in.

## Contributing

Fork, submit issues, or open pull requests on [GitHub](https://github.com/Tejaromalius/SmartToDock).
