## v1.5.1 (5/30/2023)

### Features: :tada:

### Fixes: :construction_worker:

- Candidates page includes Contact Candidate Button again (SRCR-564)
- Updated Candidates page to match the logic on the Search page to not show an active profile until one of the cards have been clicked
- Updated Search and Candidates to use the same isResumeBase64 util. Fixes issue where Indeed resumes weren't rendering correctly on the Candidate page
- Updated Candidates template to have better logic if a connection has already been made. Fixes issue where Candidate active profile showed as Locked but Contact page shows as Unlocked
- Updated Candidates page to not show Contact Candidate button section if 'cab' or 'dic' profile types
- (Housekeeping) Moved isResumeBase64 util to the main utils folder so it can be shared
- (Housekeeping) Cleaned up logic in handleConnection in Integrations template
- (Housekeeping) Moved handleCandidateContact to useProfileCardController hook so Search and Candidates can share the same logic

## v1.5.0 (5/23/2023)

### Features: :tada:

- Allows pasting in Invite/Apply form (SRCR-332)
- Added Logger lib to make it easier to track errors in DataDog (SRCR-552)
- (DevOps) Added status badges to README in repo

### Fixes: :construction_worker:

- Active profile no longer loads automatically after a search. Need to click a profile first (SRCR-507)
- Indeed profiles aren't held to the same 0 credit logic like other integrations (SRCR-513)
- Login redirects now respect the incoming query params (SRCR-538)
- Updates CAB and DIC to 'unlocked' instead of saved icon when performing an outreach (SRCR-543)
- (Housekeeping) Updated pushAnalyticsEvent to make payloads optional (SRCR-539)
- (Housekeeping) Removed unused imports in CandidateContact component
- (DevOps) Updated CI/CD pipeline

## v1.4.1 (5/22/2023)

### Features: :tada:

### Fixes: :construction_worker:

- Updated 'Contact Candidate' button redirect to include jtToken query param (SRCR-551)
