import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

class SettingsBinder {
    constructor(extension) {
        this._settings = extension.getSettings();

        this.builder = new Gtk.Builder();
        this.builder.add_from_file(extension.path + '/prefs.ui');
        this.widget = this.builder.get_object('prefs-container');

        this._bind();
    }

    _bind() {
        // Max pinned apps
        const maxAppsSpin = this.builder.get_object('max-apps-spin');
        maxAppsSpin.set_adjustment(new Gtk.Adjustment({
            lower: 1,
            upper: 50,
            step_increment: 1,
            page_increment: 5,
            value: this._settings.get_int('max-pinned-apps'),
        }));
        maxAppsSpin.set_value(this._settings.get_int('max-pinned-apps'));
        maxAppsSpin.connect('value-changed', () => {
            this._settings.set_int('max-pinned-apps', maxAppsSpin.get_value());
        });

        // Update interval
        const intervalSpin = this.builder.get_object('update-interval-spin');
        intervalSpin.set_adjustment(new Gtk.Adjustment({
            lower: 1,
            upper: 24,
            step_increment: 1,
            page_increment: 1,
            value: this._settings.get_int('update-interval-hours'),
        }));
        intervalSpin.set_value(this._settings.get_int('update-interval-hours'));
        intervalSpin.connect('value-changed', () => {
            this._settings.set_int('update-interval-hours', intervalSpin.get_value());
        });

        // GitHub / GNOME Extensions buttons
        const githubBtn = this.builder.get_object('github-link');
        const gnomeBtn = this.builder.get_object('gnome-link');
//        githubBtn.connect('clicked', (btn) => {
//            Gtk.show_uri_on_window(btn.get_root(), 'https://github.com/Tejaromalius/SmartToDock', 0);
//        });
//        gnomeBtn.connect('clicked', (btn) => {
//            Gtk.show_uri_on_window(btn.get_root(), 'https://extensions.gnome.org/extension/7370/smarttodock/', 0);
//        });
        function open_url(url){
            Gio.AppInfo.launch_default_for_uri(url, null);
        }
        githubBtn.connect('clicked', () => {
            open_url('https://github.com/Tejaromalius/SmartToDock');
        });
        gnomeBtn.connect('clicked', () => {
            open_url('https://extensions.gnome.org/extension/7370/smarttodock/');
        });
    }
}

export default class SmartToDockPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        const settings = new SettingsBinder(this);
        const widget = settings.widget;

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: _('SmartToDock Settings') });
        group.add(widget);
        page.add(group);
        window.add(page);

        widget.show();
    }
}

