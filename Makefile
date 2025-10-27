EXT_NAME=smarttodock@tayefi.ilia.protonmail.com
ZIP_FILE=$(EXT_NAME).zip
EXT_FILES=schemas/ prefs.ui README.md metadata.json extension.js prefs.js LICENSE.txt

all: install

zip:
	zip -r $(ZIP_FILE) $(EXT_FILES)

uninstall:
	gnome-extensions uninstall $(EXT_NAME) || true

install: uninstall zip
	gnome-extensions install $(ZIP_FILE)
	rm $(ZIP_FILE)

