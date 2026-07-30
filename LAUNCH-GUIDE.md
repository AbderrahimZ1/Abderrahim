# azermane.com launch guide

This guide assumes no previous website experience.

## 1. Make the website repository public

GitHub Pages is free for public repositories.

1. Open `https://github.com/AbderrahimZ1/Abderrahim`.
2. Click **Settings**.
3. Scroll to **Danger Zone**.
4. Beside **Change repository visibility**, click **Change visibility**.
5. Choose **Make public** and follow GitHub's confirmation steps.

Only this portfolio repository needs to be public. The project repositories can remain private.

## 2. Turn on GitHub Pages

1. In the same repository, open **Settings**.
2. In the left menu, click **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main**.
5. Select folder **/(root)**.
6. Click **Save**.

GitHub will begin publishing the static site.

## 3. Add the custom domain in GitHub

1. Stay on **Settings → Pages**.
2. Under **Custom domain**, enter `azermane.com`.
3. Click **Save**.

The repository already contains a `CNAME` file with `azermane.com`.

## 4. Add DNS records at the domain registrar

Add these four `A` records for the root domain:

| Type | Host/Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Add this record for the `www` version:

| Type | Host/Name | Value |
|---|---|---|
| CNAME | www | AbderrahimZ1.github.io |

Do not add a wildcard `*` record.

DNS changes can take time to appear. Return to **Settings → Pages** later and select **Enforce HTTPS** when GitHub enables the option.

## 5. Verify the domain in Google Search Console

1. Open Google Search Console.
2. Click **Add property**.
3. Choose **Domain**.
4. Enter `azermane.com` without `https://` or `www`.
5. Google will provide a unique TXT record.
6. Add that TXT record in the same DNS panel used above.
7. Return to Search Console and click **Verify**.

Do not remove the TXT verification record after verification.

## 6. Submit the sitemap

In Google Search Console:

1. Open the `azermane.com` property.
2. Click **Sitemaps**.
3. Enter `sitemap.xml`.
4. Click **Submit**.

The full sitemap address is `https://azermane.com/sitemap.xml`.

## 7. Request indexing for the most important pages

Use **URL Inspection** in Search Console for each page below, then click **Request indexing**:

- `https://azermane.com/`
- `https://azermane.com/about.html`
- `https://azermane.com/publications.html`
- `https://azermane.com/projects.html`
- `https://azermane.com/insights/fatal-falls-malaysia.html`
- `https://azermane.com/insights/explainable-ml-safety.html`
- `https://azermane.com/insights/urban-fire-modelling.html`

## 8. Connect the same identity everywhere

Add `https://azermane.com/` to:

- Google Scholar homepage field
- ORCID Websites & social links
- GitHub profile website field
- LinkedIn contact information
- UCL, UPM or other institutional profiles where editing is possible
- Conference biographies and future paper author biographies

Use the same spelling everywhere: **Dr Abderrahim Zermane**.

## 9. Improve authority over time

For every new publication or major project:

1. Add it to the website.
2. Write a useful summary explaining the question, method, finding and limitation.
3. Link to the DOI or official project page.
4. Update `sitemap.xml` and the page's modification date.
5. Request indexing in Search Console.

Ethical SEO cannot guarantee a first-page ranking, but a consistent name, strong external profiles, useful original content, valid structured data and relevant links give the site the strongest defensible foundation.
