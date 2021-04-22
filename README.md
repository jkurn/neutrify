# Neutrify

## Introduction

Neutrify is a firefox extension that helps reduce carbon footprint.

Duration of project: 8 March 2021 - Present

Built with React.js & TailwindCSS

Firefox Add-On: https://addons.mozilla.org/en-US/firefox/addon/neutrify/

## Install

1. After cloning the repo, run

```bash
yarn install
```

2. Make sure that you have the a file called `.env` in the `extension` folder, to keep all important environment variables. Check the onboarding document for more information about the `.env` file.

3. Once all is done, inside the `extension` folder, run

```bash
yarn build
```

4. Head over to `about:debugging#/runtime/this-firefox` in Mozilla Firefox and click `Load Temporary Add-on...` to load the `manifest.json` in your `build` folder. On the same page, after you add the extension, you can click on "Inspect" to open the console window for the extension (useful for debugging).

## Publishing / Uploading a New Version to Firefox Add-On Store

1. Run `yarn build` at the terminal to produce a `build` folder.

2. For the extension code requested, zip the all the files and folders in `build`. It is IMPORTANT that the contents in `build` are zipped, not the folder `build` itself.

3. For the source code requested, zip the all the files and folders in the `extension` folder, EXCEPT `build` and `node_modules`.

4. Login into firefox developer hub at https://addons.mozilla.org/en-Us/developers/.

5. Head over to https://addons.mozilla.org/en-US/developers/addon/neutrify/versions/submit/ to begin uploading the new version.

6. In the first prompt to upload the `extension` code, attach the first zipped folder.

7. In the second prompt to upload the `source` code, attach the second zipped folder.

8. Wait for approval (It shouldn't take more than 5 mins, as they automated the approval process.)

## Contributors:

v0.1 (8 March 2021 - Present):

- [Jason Beh](https://github.com/behjieshen)
- [April Shin](https://github.com/aprilhgshin)
