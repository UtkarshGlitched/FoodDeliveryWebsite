# Foodie's Home — Static Demo

This is a tiny static demo of a storefront (product grid + cart) inspired by marketplaces like Amazon. The demo site is branded "Foodie's Home".

How to run

Google Sign-In setup (optional, required for full Google login)
- Create an OAuth Client ID in Google Cloud Console (type: Web application).
- Add your local server origin (e.g. `http://localhost:8000`) to Authorized JavaScript origins.
- Set the generated Client ID in `js/config.js` by replacing the empty string `window.GOOGLE_CLIENT_ID = ""` with your client id.
- Run a local static server (recommended) instead of opening `file://` to avoid origin issues. Example (Python 3):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser and test Google Sign-In.

Files
- index.html — main page
- css/styles.css — styles
- js/script.js — product list + cart logic

Notes
- This is a static demo intended as a starting point. Integrate a backend or payment provider for a real store.

Vercel deployment
- Quick deploy from a GitHub repo:
	1. Commit this folder to a GitHub repository.
	2. Go to https://vercel.com, sign in and choose "Import Project" → select your GitHub repo.
	3. Use the default settings; Vercel will detect `vercel.json` and deploy as a static site.
	4. Visit your assigned URL to see the live site.

- Command-line deploy (optional): install `vercel` CLI and run:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Notes: make sure to add your Google OAuth Client ID to `js/config.js` and add the deployed origin to the Authorized JavaScript origins in Google Cloud Console.
