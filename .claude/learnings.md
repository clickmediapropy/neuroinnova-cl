# Learnings
Hard-won fixes, API quirks, and technical discoveries.

## Convex `withSearchIndex` is tokenized full-text search, not exact lookup
**Date:** 2026-04-27
**Context:** agentify CRM (`convex/domains/contacts/creation.ts`, `hubspotSync.ts`, `calendly/mutations.ts`) — but bites anyone integrating with the Agentify lead webhook

**Problem:** Multiple distinct leads (different phone, different email) silently merged into a single contact in the CRM, overwriting each other's `customFields`. Looked like a frontend bug from the consumer side.

**Root cause:** Identity-dedup paths used `withSearchIndex("search_by_email", q.search("email", X))` to "look up by email." `withSearchIndex` is **tokenized full-text search with relevance ranking**, not exact-match lookup. Two emails sharing tokens — e.g. `juan@gmail.com` and `maria@gmail.com` both tokenize to `[gmail, com, ...]` — can match each other and return as the "existing" contact. In test, `e2e+phq9-...@neuroinnova.test` matched `smoketest+...@neuroinnova.test` via shared `neuroinnova` + `test` tokens.

**Fix:** Add an exact-match index `by_tenant_email` on `["tenantId", "email"]` and use `withIndex(...).first()` for identity dedup. Reserve `withSearchIndex` for UI search where fuzzy matching is desired (search-as-you-type, etc.).

```ts
// Wrong (silently merges contacts):
.withSearchIndex("search_by_email", q => q.search("email", x).eq("tenantId", t)).take(1)
// Right (exact identity match):
.withIndex("by_tenant_email", q => q.eq("tenantId", t).eq("email", x)).first()
```

---

## Vite inlines `import.meta.env.VITE_*` at build time, not runtime
**Date:** 2026-04-27
**Context:** Vercel deploy of neuroinnova-cl after env-var changes

**Problem:** Form submission threw "VITE_CRM_WEBHOOK_URL no configurada" in production even though `vercel env ls` showed the var was set. Adding env vars *after* a deploy didn't take effect.

**Root cause:** Vite replaces `import.meta.env.VITE_X` with the literal string value during `vite build`. If the env var isn't present at build time, Vite substitutes `void 0`. Confirmed by grep on the deployed bundle: `const _=void 0; if(!_) throw new Error("VITE_CRM_WEBHOOK_URL no configurada")`. Vercel's normal "redeploy" reuses the cached build, which still has `void 0` baked in.

**Fix:** After changing Vercel env vars, trigger a **fresh build** (push a commit, or `vercel --force --prod`). Just clicking "Redeploy" in the dashboard isn't enough — it can reuse the build artifact. Verify by grepping the bundle for the expected URL string.

---

## `echo "x" | vercel env add` bakes a trailing `\n` into the value
**Date:** 2026-04-27
**Context:** Vercel CLI v50

**Problem:** Env values worked locally via `vercel env pull` but not in builds. Pulled file showed `KEY="cmp_lk_xxx\n"` — literal newline at end of value.

**Root cause:** `echo` appends a newline. When piped to `vercel env add`, the CLI reads stdin including the newline as part of the secret.

**Fix:** Use `--value` flag instead of stdin: `vercel env add NAME production --value "$VAL" --yes < /dev/null`. Or use `printf "%s"` (no trailing newline) when piping.

---

## Wrong-team Vercel link silently routes env-var changes nowhere
**Date:** 2026-04-27
**Context:** Vercel CLI link state for neuroinnova-cl

**Problem:** Spent 30+ minutes debugging "env vars not taking effect" — the project actually lived under one team, but `.vercel/project.json` had been auto-linked to a different team that *also* had a project of the same name. `vercel env ls` returned success but operated on the wrong project.

**Root cause:** `vercel link` doesn't validate that the linked project is the one whose deploys are public-facing. If you've ever been a member of multiple teams that both have a project with the same name, auto-link can pick the wrong one.

**Fix:** Verify with `vercel ls <project-name>` and compare deployment URLs to the live site. Re-link explicitly with `vercel link --project <name> --scope <correct-team>` if mismatched. Cross-check `cat .vercel/project.json` against `vercel project ls` output.

---

## Vercel CLI v50 can't add Preview env vars from headless runs
**Date:** 2026-04-27
**Context:** Vercel CLI v50.35.0

**Problem:** `vercel env add VITE_X preview --value Y --yes` returns `git_branch_required` even though the same form works for `production` and `development`. CLI shows the exact command that would work as one of the suggested next-commands, then refuses to run it.

**Root cause:** Bug in v50 around the "all preview branches" code path. Ironically, the JSON error message includes `vercel env add NAME preview --value <value> --yes` as a valid form.

**Fix:** Either upgrade to v52+ (`npm i -g vercel@latest`) or add Preview env vars via the Vercel dashboard UI. Production + Development envs work fine in v50.
