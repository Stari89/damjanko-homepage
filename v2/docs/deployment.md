# Deployment

How v2 is published. The site's owner copies the files over FTP by hand.

## Where the site is hosted

- Shared hosting with a DirectAdmin panel. The web server is LiteSpeed, which reads `.htaccess` files as Apache does.
- `damjanko.com` and `damjanko.si` are two separate domains on the same account. Each has its own folder: `/domains/damjanko.com/public_html` and `/domains/damjanko.si/public_html`.
- Both domains have HTTPS certificates that the host renews.

The same build goes into both folders. `.htaccess` makes the .si domain show the Slovenian page at its root address and sends plain HTTP to HTTPS.

## What is in the two folders before the first v2 deploy

Checked on 2026-11-27.

| Folder       | Contents                                                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| damjanko.com | v1 (`index.html`, `static/`, `assets/`, `manifest.json`, `asset-manifest.json`, `service-worker.js`) and two folders that are not part of this site and must stay: `planets/` and `plex/` |
| damjanko.si  | One `.htaccess` file that redirects everything to `https://damjanko.com`                                                                                                                  |

**Never empty the .com folder.** `planets/` and `plex/` live there. Only the files named below are removed or replaced.

## Build

In `v2/`:

1. `npm ci`
2. `npm run format:check`, `npm run lint`, `npm test`, `npm run test:e2e`. The last one also builds.
3. The files to upload are the contents of `v2/dist`, including the hidden file `.htaccess`. FTP programs often hide files that start with a dot; switch on "show hidden files".

`dist` holds: `.htaccess`, `index.html`, `sl/index.html`, `assets/`, `cv-en.pdf`, `cv-sl.pdf`, `favicon.svg`, `service-worker.js`.

## First deploy, replacing v1

### damjanko.com

1. Download a copy of the folder as it is, as a backup.
2. Delete v1's own files and folders: `static/`, `assets/`, `manifest.json`, `asset-manifest.json`. Leave `planets/` and `plex/` alone.
3. Upload the contents of `dist`. This overwrites `index.html` and `service-worker.js`.

Do not delete `service-worker.js` without uploading the new one. v1 installed a service worker in visitors' browsers that shows the old page from its cache. The new file removes it; see `public/service-worker.js`.

### damjanko.si

1. Upload the contents of `dist`. This overwrites the old `.htaccess`, which ends the redirect to the .com domain.

## Later deploys

Upload the contents of `dist` into both folders. Files in `assets/` have a new name whenever their content changes, so old ones pile up there; delete the `assets/` folder before uploading to keep it tidy.

## Checks after a deploy

| Check                                                             | Expected                                                    |
| ----------------------------------------------------------------- | ----------------------------------------------------------- |
| `https://damjanko.com/`                                           | The English page, with the new version number in the footer |
| `https://damjanko.si/`                                            | The Slovenian page, at the root address, no redirect        |
| `https://damjanko.si/index.html`                                  | The Slovenian page                                          |
| `http://damjanko.com/` and `http://damjanko.si/`                  | Redirect to the same address with `https://`                |
| The download link under the list of jobs, on both pages           | Saves `cv-en.pdf` or `cv-sl.pdf`                            |
| The link to the other language, on both pages                     | Leads to the other domain                                   |
| `https://damjanko.com/planets/` and `https://damjanko.com/plex/`  | Still work as before                                        |
| A browser that visited v1 before: open the page, then reload once | Shows v2                                                    |
| The theme toggle, and the page on a phone                         | Work as on the local build                                  |

If the page shows a server error (500) right after the upload, the server does not accept a line in `.htaccess`. Rename `.htaccess` on the server to switch it off, and the English page works again while the cause is found.

## Release

1. Set the version in `v2/package.json` to the release number, for example `2.0.0`. The footer shows it.
2. Commit with the version as the message and tag the commit `v2.0.0`.
3. Build, deploy and run the checks above.
