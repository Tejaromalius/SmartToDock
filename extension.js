import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Shell from 'gi://Shell';

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

export default class SmartToDock extends Extension {
  _timeoutId = 0;

  enable() {
    this.settings = this.getSettings('org.gnome.shell.extensions.smarttodock');

    this.settingsChangedId = this.settings.connect('changed', () => {
      this.restartTimerAndUpdate();
    });

    this.restartTimerAndUpdate();
  }

  restartTimerAndUpdate() {
    if (this._timeoutId) {
      GLib.source_remove(this._timeoutId);
      this._timeoutId = 0;
    }
    this.updatePinnedApps();
    const interval = this.settings.get_int('update-interval-hours') * 3600;
    this._timeoutId = GLib.timeout_add_seconds(
      GLib.PRIORITY_DEFAULT,
      interval,
      () => {
        this.updatePinnedApps();
        return true;
      }
    );
  }

  updatePinnedApps() {
    const maxApps = this.settings.get_int('max-pinned-apps');
    let appUsage = Shell.AppUsage.get_default();
    let mostUsed = appUsage.get_most_used();

    let apps = [];
    for (let i = 0; i < mostUsed.length && apps.length < maxApps; i++) {
      let app = mostUsed[i];
      if (app) {
        let appInfo = app.get_app_info();
        if (appInfo && appInfo.should_show() && appInfo.get_id() != 'firefox.desktop') {
          apps.push({
            name: appInfo.get_display_name().replace('Mozilla', '').replace('Google', '').trim(),
            id: appInfo.get_id()
          });
        }
      }
    }

    apps.sort((a, b) => a.name.localeCompare(b.name));
    let favorites = apps.map(app => app.id);

    if (favorites.length > 0) {
      let settings = new Gio.Settings({ schema: "org.gnome.shell" });
      settings.set_strv("favorite-apps", favorites);
      console.log('Pinned apps updated: ' + favorites.join(', '));
    }
  }

  disable() {
    if (this._timeoutId) {
      GLib.source_remove(this._timeoutId);
      this._timeoutId = 0;
    }
    if (this.settingsChangedId) {
      this.settings.disconnect(this.settingsChangedId);
      this.settingsChangedId = null;
    }

    this._settings = null;
  }
}

