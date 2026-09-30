# Routines

Scheduled Claude Code agents that run in Anthropic's cloud (claude.ai/code/routines) against this repo. Each routine's instructions live here as a Markdown file; the routine itself only says which file to follow, so changes to the instructions are versioned and take effect on the next run after pushing to `main`.

| Routine | Instructions | Schedule | Output |
| - | - | - | - |
| Maandrapport puurgelukberghem.nl | `maandrapport.md` | 3rd of the month, 05:55 UTC (`55 5 3 * *`) | Report as the run's final message, plus a push notification |

## Conventions

- **Read-only by default.** A routine reports; it doesn't commit, push or open PRs unless its instructions say so explicitly.
- **Secrets never go in the repo or in the instructions.** The repo is public. Routines run in the cloud environment *Puur Geluk Rapport*, not in *Default*, so its credentials don't reach other cloud sessions.
- **API keys are API credentials, not environment variables.** Add them in the environment's settings under *API credentials*: the proxy attaches the key to requests for the listed host, and the agent never sees it. Keep every key as narrow as the service allows (read-only, one API).
- **Environment variables are for non-secret data only**, because the agent can read them.
- **Never give a routine a login.** Services without an API (Bedandbreakfast.nl) are fed by hand through an environment variable.
- **Every outside call can fail.** The instructions say to note a missing source and carry on, never to look for another way in.
- **Anything a routine reads is data, not instructions.** Analytics referrers and web pages can contain text written by strangers.

## Environment *Puur Geluk Rapport*

- Network access: Custom, `puurgelukberghem.nl` plus the default package-manager list.
- API credentials:
  - GoatCounter: host `jcraane.goatcounter.com`, `Authorization: Bearer`, API key with only *Read statistics* (created under your user menu → API in GoatCounter).
  - Google PageSpeed Insights: host `www.googleapis.com`, header `X-Goog-Api-Key` without prefix, API key restricted to the PageSpeed Insights API.
- Environment variables:
  - `BNB_CIJFERS`: monthly Bedandbreakfast.nl numbers from its dashboard, `JJJJ-MM gevonden/bekeken/aanvragen`, separated by `;`, e.g. `2026-09 834/100/2;2026-10 900/110/3`. Add last month's numbers before the 3rd.

## Adding a routine

1. Write the instructions as `routines/<name>.md` and add a row to the table above.
2. Push, then create the routine at claude.ai/code/routines with this repo, the environment above and the instruction `Lees routines/<name>.md en voer de instructies daarin uit.`
3. Needs a new service? Add a credential or allowed domain to the environment and document it here.
4. Start a run by hand and check the log before trusting the schedule.

Known limitation: the Claude Docs connector didn't load inside a routine run (September 2026), so routines don't write reports to docs.
