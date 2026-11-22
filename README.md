# win.ithq.net

ITHQ's sales tools, calculators and business cases. Built in ClickUp, published by Brain, deployed by GitLab CI to Cloudflare Pages.

```
site/
  index.html           catalogue page (reads catalogue.json)
  catalogue.json       generated: never edit by hand
  _headers, robots.txt
  tools/<slug>/        public tools (index.html, assets/, meta.json)
  clients/<slug>/      client-only pages, behind Cloudflare Access
scripts/build-catalogue.mjs
.gitlab-ci.yml
```

Branches
- `main`: production (win.ithq.net). Protected: Maintainers merge, nobody pushes.
- `intake`: Brain starts import pipelines here. Protected: brain-publisher + Maintainers can push/merge.
- `publish/*`: one branch per tool, created by CI. Protected: Developers + Maintainers can push. Each push = a preview deploy.

CI/CD variables (masked + protected)
- `CLOUDFLARE_API_TOKEN`: account token, Cloudflare Pages: Edit, this account only
- `CLOUDFLARE_ACCOUNT_ID`
- `PUBLISH_TOKEN`: project access token, role Developer, scope write_repository

meta.json (per tool)
```json
{ "title": "UCM TCO Calculator", "summary": "…", "category": "Calculator", "updated": "2026-11-22", "source": "<ClickUp artifact URL>" }
```
