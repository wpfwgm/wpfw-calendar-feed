/*
 * WPFW Social Justice Calendar -- the whole thing, as one file.
 *
 * Built from the blocks in squarespace/ by tools-build-bundle.py. Do not edit this
 * file: edit the block it came from and build again, or the next build silently
 * throws your change away.
 *
 * On a page:
 *   <div data-wpfw="calendar"></div>
 *   <script src="https://wpfwgm.github.io/wpfw-calendar-feed/wpfw.js" async></script>
 *
 * data-wpfw takes calendar, submit, station or upcoming. More than one may sit on
 * the same page; the script is only ever loaded once.
 */
(function () {
  'use strict';

  if (window.__wpfwBundle) return;   // two copies of the tag on one page
  window.__wpfwBundle = true;

  var STYLES = {
    core: "\n@import url('https://fonts.googleapis.com/css2?family=Young+Serif&family=Bitter:wght@400;500;600;700&display=swap');\n\n.wpfw-ev {\n  /* Brand tokens. Deliberately minimal so the November refresh can restyle\n     this by changing these seven values and nothing else. */\n  --wpfw-crimson:      #9C0D0C;\n  --wpfw-crimson-lt:   #C81210;\n  --wpfw-gold:         #E0A80D;\n  --wpfw-ink:          #2A2A2A;\n  --wpfw-paper:        #F4F4F2;\n  --wpfw-rule:         #d8d8d3;\n  --wpfw-muted:        #5F5F59;\n\n  /* Tags are metadata, not buttons. Solid saturated blocks, three or four to a card,\n     shout over the titles they are meant to describe. These tints read as quiet at a\n     glance while carrying more text contrast than the solid chips they replace. */\n  --wpfw-tag-bg:       #F0EEE8;\n  --wpfw-tag-ink:      #4C4C45;\n  --wpfw-tag-line:     #DCD9D1;\n  --wpfw-tag-dcf-bg:   #FBF1D6;\n  --wpfw-tag-dcf-ink:  #6B5008;\n  --wpfw-tag-dcf-line: #E5CB86;\n  --wpfw-tag-sta-bg:   #F8E6E5;\n  --wpfw-tag-sta-ink:  #8A0B0A;\n  --wpfw-tag-sta-line: #E3B3B1;\n\n  --wpfw-head: 'Young Serif', Georgia, 'Times New Roman', serif;\n  --wpfw-body: 'Bitter', Georgia, 'Times New Roman', serif;\n\n  color: var(--wpfw-ink);\n  font-family: var(--wpfw-body);\n  font-size: 16px;\n  line-height: 1.55;\n  -webkit-text-size-adjust: 100%;\n}\n.wpfw-ev *, .wpfw-ev *::before, .wpfw-ev *::after { box-sizing: border-box; }\n\n/* Any author `display` rule outranks the browser's built-in [hidden]{display:none},\n   so an element given `display:flex` by its class stays on screen even when the\n   markup or the script has hidden it. That has now bitten this project four times\n   -- the grantee filter, the picture preview, the mailing-list box and the on-air\n   line -- so it is settled once, here, for everything inside a WPFW block. */\n.wpfw-ev [hidden] { display: none !important; }\n.wpfw-ev h1, .wpfw-ev h2, .wpfw-ev h3, .wpfw-ev h4 {\n  font-family: var(--wpfw-head); font-weight: 400; color: var(--wpfw-ink);\n  line-height: 1.2; margin: 0 0 .5em;\n}\n.wpfw-ev a { color: var(--wpfw-crimson); text-decoration: underline; text-underline-offset: 2px; }\n.wpfw-ev a:hover { color: var(--wpfw-crimson-lt); }\n.wpfw-ev :focus-visible { outline: 3px solid var(--wpfw-gold); outline-offset: 2px; border-radius: 2px; }\n\n.wpfw-ev .wpfw-tag {\n  display: inline-block;\n  background: var(--wpfw-tag-bg); color: var(--wpfw-tag-ink);\n  border: 1px solid var(--wpfw-tag-line);\n  font-family: var(--wpfw-body); font-size: 11px; font-weight: 600;\n  letter-spacing: .05em; text-transform: uppercase;\n  padding: 2px 7px; border-radius: 2px;\n}\n.wpfw-ev .wpfw-disclaimer {\n  font-size: 13px; line-height: 1.5; color: var(--wpfw-muted);\n  border-top: 1px solid var(--wpfw-rule); padding-top: 12px; margin-top: 28px;\n}\n.wpfw-ev .wpfw-sr {\n  position: absolute !important; width: 1px; height: 1px; overflow: hidden;\n  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;\n}\n.wpfw-ev .wpfw-spinner {\n  display: inline-block; width: 15px; height: 15px; vertical-align: -2px;\n  border: 2px solid var(--wpfw-rule); border-top-color: var(--wpfw-crimson);\n  border-radius: 50%; animation: wpfwspin .8s linear infinite;\n}\n@keyframes wpfwspin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) {\n  .wpfw-ev .wpfw-spinner { animation-duration: 3s; }\n  .wpfw-ev * { transition: none !important; }\n}\n",
    form: "\n.wpfw-form-wrap { max-width: 720px; margin: 0 auto; padding: 0 4px; }\n.wpfw-form-wrap h2 { font-size: 30px; margin-bottom: 10px; }\n.wpfw-lede { font-size: 17px; margin: 0 0 6px; }\n.wpfw-freenote {\n  background: var(--wpfw-paper); border-left: 4px solid var(--wpfw-gold);\n  padding: 10px 14px; margin: 16px 0 24px; font-size: 15px;\n}\n\n.wpfw-form-wrap fieldset {\n  border: 0; border-top: 2px solid var(--wpfw-rule);\n  margin: 0 0 8px; padding: 20px 0 4px;\n}\n.wpfw-form-wrap legend {\n  font-family: var(--wpfw-head); font-size: 20px; padding: 0 10px 0 0;\n}\n.wpfw-hint { font-size: 13.5px; color: var(--wpfw-muted); margin: 2px 0 0; }\n\n.wpfw-field { margin: 0 0 18px; }\n.wpfw-field > label,\n.wpfw-legend-inline {\n  display: block; font-weight: 600; font-size: 15px; margin: 0 0 5px;\n}\n.wpfw-req { color: var(--wpfw-crimson); font-weight: 700; }\n.wpfw-optional { font-weight: 400; color: var(--wpfw-muted); font-size: 13.5px; }\n\n.wpfw-form-wrap input[type=text],\n.wpfw-form-wrap input[type=email],\n.wpfw-form-wrap input[type=tel],\n.wpfw-form-wrap input[type=url],\n.wpfw-form-wrap input[type=date],\n.wpfw-form-wrap input[type=time],\n.wpfw-form-wrap select,\n.wpfw-form-wrap textarea {\n  width: 100%; font-family: var(--wpfw-body); font-size: 16px; line-height: 1.4;\n  color: var(--wpfw-ink); background: #fff;\n  border: 1px solid #8b8b85; border-radius: 2px; padding: 10px 11px;\n  -webkit-appearance: none; appearance: none;\n}\n.wpfw-form-wrap select {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath fill='%232A2A2A' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat; background-position: right 12px center;\n  background-size: 10px 6px; padding-right: 34px;\n}\n.wpfw-form-wrap textarea { min-height: 110px; resize: vertical; }\n.wpfw-form-wrap input:focus, .wpfw-form-wrap select:focus, .wpfw-form-wrap textarea:focus {\n  outline: 3px solid var(--wpfw-gold); outline-offset: 1px; border-color: var(--wpfw-crimson);\n}\n.wpfw-form-wrap [aria-invalid=\"true\"] { border: 2px solid var(--wpfw-crimson); background: #FDF6F6; }\n\n.wpfw-err {\n  display: none; color: #7A0A09; font-size: 14px; font-weight: 600;\n  margin: 5px 0 0; padding-left: 20px; position: relative;\n}\n.wpfw-err::before { content: \"\\2716\"; position: absolute; left: 0; font-weight: 700; }\n.wpfw-err.on { display: block; }\n\n.wpfw-count { float: right; font-size: 13px; font-weight: 400; color: var(--wpfw-muted); }\n.wpfw-count.warn { color: #7a5c04; font-weight: 600; }\n.wpfw-count.over { color: var(--wpfw-crimson); font-weight: 700; }\n\n.wpfw-row { display: flex; flex-wrap: wrap; gap: 14px; }\n.wpfw-row > .wpfw-field { flex: 1 1 190px; margin-bottom: 18px; }\n.wpfw-row > .wpfw-field.narrow { flex: 0 1 120px; }\n\n.wpfw-choices { border: 0; padding: 0; margin: 0; }\n.wpfw-choice { display: flex; align-items: flex-start; gap: 10px; margin: 0 0 10px; }\n.wpfw-choice input { width: 20px; height: 20px; margin: 2px 0 0; flex: 0 0 auto; -webkit-appearance: auto; appearance: auto; }\n.wpfw-choice label { font-weight: 400; font-size: 15.5px; margin: 0; }\n\n.wpfw-consent {\n  background: var(--wpfw-paper); border: 1px solid var(--wpfw-rule);\n  padding: 16px 18px; margin: 8px 0 22px; border-radius: 2px;\n}\n.wpfw-consent .wpfw-choice label { font-size: 15px; }\n\n.wpfw-meter { margin: 4px 0 20px; font-size: 13.5px; color: var(--wpfw-muted); }\n.wpfw-meter-bar { height: 5px; background: var(--wpfw-rule); border-radius: 3px; overflow: hidden; margin: 6px 0 5px; }\n.wpfw-meter-fill { height: 100%; width: 0; background: var(--wpfw-crimson); transition: width .15s linear; }\n\n.wpfw-submit {\n  font-family: var(--wpfw-head); font-size: 18px; letter-spacing: .01em;\n  background: var(--wpfw-crimson); color: #fff; border: 2px solid var(--wpfw-crimson);\n  padding: 14px 30px; border-radius: 2px; cursor: pointer; width: 100%;\n}\n.wpfw-submit:hover:not(:disabled) { background: var(--wpfw-crimson-lt); border-color: var(--wpfw-crimson-lt); }\n.wpfw-submit:disabled { opacity: .55; cursor: wait; }\n@media (min-width: 560px) { .wpfw-submit { width: auto; min-width: 260px; } }\n\n.wpfw-summary {\n  display: none; border-left: 5px solid var(--wpfw-crimson); background: #FBEFEF;\n  padding: 14px 18px; margin: 0 0 26px; border-radius: 2px;\n}\n.wpfw-summary.on { display: block; }\n.wpfw-summary h3 { font-size: 18px; color: #7A0A09; margin: 0 0 8px; }\n.wpfw-summary ol { margin: 0; padding-left: 20px; font-size: 15px; }\n.wpfw-summary li { margin: 0 0 5px; }\n.wpfw-summary a { color: #7A0A09; }\n\n.wpfw-live { font-size: 15px; margin: 12px 0 0; min-height: 22px; }\n\n.wpfw-confirm { display: none; }\n.wpfw-confirm.on { display: block; }\n.wpfw-confirm .wpfw-panel {\n  border-top: 5px solid var(--wpfw-crimson); background: var(--wpfw-paper);\n  padding: 30px 26px; border-radius: 2px;\n}\n.wpfw-confirm h2 { margin-bottom: 14px; }\n.wpfw-ref {\n  font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 15px;\n  background: #fff; border: 1px dashed #b6b6b0; padding: 3px 8px; border-radius: 2px;\n}\n\n.wpfw-taggrid {\n  display: grid; grid-template-columns: 1fr; gap: 2px 18px;\n  border: 1px solid var(--wpfw-rule); border-left: 4px solid var(--wpfw-gold);\n  padding: 14px 16px; border-radius: 2px; margin: 6px 0 0;\n}\n@media (min-width: 520px) { .wpfw-taggrid { grid-template-columns: 1fr 1fr; } }\n@media (min-width: 760px) { .wpfw-taggrid { grid-template-columns: 1fr 1fr 1fr; } }\n.wpfw-taggrid .wpfw-choice { margin: 0; padding: 6px 0; }\n.wpfw-taggrid .wpfw-choice label { font-size: 15px; }\n.wpfw-taggrid input:disabled + label { color: #9a9a94; }\n.wpfw-tagcount { font-size: 13.5px; color: var(--wpfw-muted); margin: 9px 0 0; }\n.wpfw-tagcount.full { color: #7a5c04; font-weight: 600; }\n\n.wpfw-hp {\n  position: absolute !important; left: -9999px; top: auto;\n  width: 1px; height: 1px; overflow: hidden;\n}\n\n/* ---------- picture upload ----------------------------------------------\n   The native file input is hidden rather than removed, so the label still opens\n   the picker and the keyboard still reaches it. */\n.wpfw-drop {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;\n  border: 2px dashed #b4b4ae; border-radius: 3px; background: #fff;\n  padding: 18px 16px; transition: border-color .12s, background .12s;\n}\n.wpfw-drop.over { border-color: var(--wpfw-crimson); background: #FBF3F3; }\n.wpfw-drop input[type=file] {\n  position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;\n}\n.wpfw-ev label.wpfw-drop-btn {\n  display: inline-block; font-family: var(--wpfw-body); font-size: 15px; font-weight: 600;\n  background: var(--wpfw-ink); color: var(--wpfw-paper); border: 1px solid var(--wpfw-ink);\n  border-radius: 2px; padding: 10px 18px; margin: 0; cursor: pointer;\n}\n.wpfw-ev label.wpfw-drop-btn:hover { background: var(--wpfw-crimson); border-color: var(--wpfw-crimson); }\n.wpfw-drop input[type=file]:focus-visible + .wpfw-drop-btn {\n  outline: 3px solid var(--wpfw-gold); outline-offset: 2px;\n}\n.wpfw-drop-or { font-size: 14px; color: var(--wpfw-muted); }\n\n.wpfw-shot {\n  display: flex; align-items: flex-start; gap: 14px;\n  border: 1px solid var(--wpfw-rule); border-radius: 3px; background: #fff; padding: 12px;\n}\n.wpfw-shot img {\n  width: 92px; height: 92px; object-fit: cover; border-radius: 2px; flex: 0 0 auto;\n  background: var(--wpfw-paper); display: block;\n}\n.wpfw-shot-meta { flex: 1 1 auto; min-width: 0; }\n.wpfw-shot-meta strong {\n  display: block; font-size: 14.5px; font-weight: 600; overflow: hidden;\n  text-overflow: ellipsis; white-space: nowrap;\n}\n.wpfw-shot-meta > span { font-size: 13px; color: var(--wpfw-muted); }\n.wpfw-shot-state { font-size: 13px; margin: 6px 0 0; color: var(--wpfw-muted); }\n.wpfw-shot-state.ok { color: #2F6B3C; font-weight: 600; }\n.wpfw-shot-state.bad { color: var(--wpfw-crimson); font-weight: 600; }\n.wpfw-ev button.wpfw-shot-x {\n  flex: 0 0 auto; font-family: var(--wpfw-body); font-size: 13px; font-weight: 600;\n  background: #fff; color: var(--wpfw-crimson); border: 1px solid #b4b4ae;\n  border-radius: 2px; padding: 7px 12px; cursor: pointer;\n}\n.wpfw-ev button.wpfw-shot-x:hover { border-color: var(--wpfw-crimson); }\n\n.wpfw-bar-track {\n  height: 6px; background: var(--wpfw-rule); border-radius: 3px; overflow: hidden; margin: 8px 0 0;\n}\n.wpfw-bar-fill {\n  height: 100%; width: 0%; background: var(--wpfw-crimson); border-radius: 3px;\n  transition: width .18s linear;\n}\n@media (prefers-reduced-motion: reduce) { .wpfw-bar-fill { transition: none; } }\n\n.wpfw-orlink { margin: 0 0 18px; }\n.wpfw-orlink > summary {\n  cursor: pointer; font-size: 14px; font-weight: 600; color: var(--wpfw-crimson);\n  list-style: none; padding: 4px 0; display: inline-flex; align-items: center; gap: 7px;\n}\n.wpfw-orlink > summary::-webkit-details-marker { display: none; }\n.wpfw-orlink > summary::before { content: \"+\"; font-size: 15px; width: 14px; text-align: center; }\n.wpfw-orlink[open] > summary::before { content: \"\\2013\"; }\n.wpfw-orlink > summary:focus-visible { outline: 2px solid var(--wpfw-gold); outline-offset: 2px; }\n.wpfw-orlink .wpfw-field { margin-top: 10px; }\n\n/* ---------- access checklist ---------- */\n.wpfw-grouplabel {\n  display: block; font-weight: 600; font-size: 15.5px; margin: 0 0 2px; color: var(--wpfw-ink);\n}\n.wpfw-accessgrid {\n  display: grid; grid-template-columns: 1fr; gap: 0 22px; margin: 10px 0 0;\n  border-top: 1px solid var(--wpfw-rule); padding-top: 10px;\n}\n@media (min-width: 520px) { .wpfw-accessgrid { grid-template-columns: 1fr 1fr; } }\n@media (min-width: 760px) { .wpfw-accessgrid { grid-template-columns: 1fr 1fr 1fr; } }\n.wpfw-accessgrid .wpfw-choice { margin: 0; padding: 6px 0; }\n.wpfw-accessgrid .wpfw-choice label { font-size: 15px; font-weight: 400; }\n\n.wpfw-askus { display: block; margin: 8px 0 0; }\n.wpfw-askus a { color: var(--wpfw-crimson); text-decoration: underline; text-underline-offset: 2px; }\n\n/* ---------- attendance mode ---------- */\n.wpfw-modes { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 0; }\n.wpfw-modes label {\n  display: inline-block; font-size: 15px; font-weight: 600; cursor: pointer;\n  border: 1px solid #a5a59f; border-radius: 2px; padding: 9px 16px; margin: 0;\n  background: #fff; color: var(--wpfw-ink);\n}\n.wpfw-modes input { position: absolute; opacity: 0; width: 1px; height: 1px; }\n.wpfw-modes input:checked + label {\n  background: var(--wpfw-ink); border-color: var(--wpfw-ink); color: var(--wpfw-paper);\n}\n.wpfw-modes input:focus-visible + label { outline: 3px solid var(--wpfw-gold); outline-offset: 2px; }\n\n.wpfw-broadcast { display: block; margin: 8px 0 0; }\n.wpfw-nope {\n  border-left: 4px solid var(--wpfw-ink); background: #fff; padding: 12px 15px;\n  margin: 0 0 22px; font-size: 14.5px; line-height: 1.55; border-radius: 2px;\n}\n.wpfw-nope strong { display: block; margin: 0 0 3px; }\n\n.wpfw-remembered {\n  background: var(--wpfw-paper); border-left: 4px solid var(--wpfw-gold);\n  padding: 10px 14px; margin: 0 0 18px; font-size: 14px; border-radius: 2px;\n}\n.wpfw-remembered a { color: var(--wpfw-crimson); }\n\n.wpfw-onairnote {\n  font-size: 14px; line-height: 1.55; color: var(--wpfw-ink); margin: 4px 0 0;\n  padding-left: 12px; border-left: 3px solid var(--wpfw-gold);\n}\n",
    calendar: "\n/* The site's on-air player bar is fixed at the top and 60px tall, so the sticky\n   filter rail has to clear it. If that bar ever changes height, change this one\n   number and nothing else. */\n.wpfw-cal { max-width: 1240px; margin: 0 auto; padding: 0 4px; --wpfw-sticky-top: 76px;\n  --wpfw-s1: 4px; --wpfw-s2: 8px; --wpfw-s3: 12px; --wpfw-s4: 18px;\n  --wpfw-s5: 26px; --wpfw-s6: 38px; }\n\n/* ---------- masthead ---------- */\n.wpfw-masthead { padding: 4px 0 0; margin: 0 0 6px; }\n\n/* Two organizations, equal weight. Neither name is subordinate to the other. */\n.wpfw-lockup {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 0 11px;\n  font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;\n  color: var(--wpfw-muted); margin: 0 0 18px;\n}\n.wpfw-lockup a {\n  color: inherit; text-decoration: none;\n  border-bottom: 1px solid var(--wpfw-gold); padding-bottom: 1px;\n}\n.wpfw-lockup a:hover { color: var(--wpfw-crimson); border-bottom-color: var(--wpfw-crimson); }\n.wpfw-blurb a { color: var(--wpfw-crimson); text-decoration: underline; text-underline-offset: 2px; }\n.wpfw-lockup .amp {\n  color: var(--wpfw-crimson); font-size: 15px; letter-spacing: 0;\n  font-family: var(--wpfw-head); text-transform: none; position: relative; top: 1px;\n}\n.wpfw-cal h2.wpfw-cal-title {\n  font-size: clamp(34px, 6vw, 48px); line-height: 1.04; margin: 0 0 4px;\n  letter-spacing: -.01em;\n}\n.wpfw-rule-gold { width: 62px; height: 4px; background: var(--wpfw-gold); margin: 16px 0 17px; }\n\n.wpfw-blurb { max-width: 60ch; }\n.wpfw-blurb p { margin: 0 0 15px; }\n.wpfw-blurb .lede { font-size: 17.5px; line-height: 1.5; margin-bottom: 14px; }\n.wpfw-blurb .body { font-size: 16px; color: var(--wpfw-muted); line-height: 1.62; }\n.wpfw-blurb .body strong { color: var(--wpfw-ink); font-weight: 600; }\n\n.wpfw-masthead-cta { margin: 24px 0 30px; }\n.wpfw-ev a.wpfw-cta-btn {\n  display: inline-block; font-family: var(--wpfw-head); font-size: 16px;\n  background: var(--wpfw-crimson); color: #fff; text-decoration: none;\n  padding: 13px 26px; border-radius: 2px; border: 2px solid var(--wpfw-crimson);\n}\n.wpfw-ev a.wpfw-cta-btn:hover {\n  background: var(--wpfw-crimson-lt); border-color: var(--wpfw-crimson-lt); color: #fff;\n}\n.wpfw-cta-note { font-size: 14px; color: var(--wpfw-muted); margin: 10px 0 0; }\n\n.wpfw-bar {\n  display: flex; flex-wrap: wrap; gap: 12px 16px; align-items: center;\n  justify-content: flex-start;\n  border-top: 2px solid var(--wpfw-ink); border-bottom: 1px solid var(--wpfw-rule);\n  padding: 12px 0; margin: 0 0 4px;\n}\n.wpfw-views { display: flex; gap: 0; }\n.wpfw-views button {\n  font-family: var(--wpfw-body); font-size: 14px; font-weight: 600;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #8b8b85;\n  padding: 9px 18px; cursor: pointer; margin: 0;\n}\n.wpfw-views button + button { border-left: 0; }\n.wpfw-views button[aria-pressed=\"true\"] {\n  background: var(--wpfw-crimson); border-color: var(--wpfw-crimson); color: #fff;\n}\n\n.wpfw-filters { display: flex; flex-wrap: wrap; gap: 6px; padding: 14px 0 0; }\n.wpfw-filters button {\n  font-family: var(--wpfw-body); font-size: 13px; font-weight: 600;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #a5a59f;\n  border-radius: 999px; padding: 6px 14px; cursor: pointer;\n}\n.wpfw-filters button[aria-pressed=\"true\"] {\n  background: var(--wpfw-ink); border-color: var(--wpfw-ink); color: var(--wpfw-paper);\n}\n\n/* The grantee filter is orthogonal to category, so it gets its own row and its own\n   look rather than sitting among the category chips where it would read as one of them. */\n.wpfw-dcfrow {\n  display: flex; flex-wrap: wrap; gap: 10px 14px; align-items: center;\n  padding: 13px 15px; margin-top: 14px; border-radius: 2px;\n  background: var(--wpfw-paper); border-left: 4px solid var(--wpfw-gold);\n}\n.wpfw-dcfrow button {\n  display: inline-flex; align-items: center; gap: 9px;\n  font-family: var(--wpfw-body); font-size: 13.5px; font-weight: 600;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #a5a59f;\n  border-radius: 2px; padding: 8px 14px; cursor: pointer;\n}\n.wpfw-dcfrow button::before {\n  content: \"\"; width: 15px; height: 15px; flex: 0 0 auto;\n  border: 2px solid var(--wpfw-ink); border-radius: 2px; background: #fff;\n}\n.wpfw-dcfrow button[aria-pressed=\"true\"] {\n  border-color: var(--wpfw-crimson); box-shadow: inset 0 0 0 1px var(--wpfw-crimson);\n}\n.wpfw-dcfrow button[aria-pressed=\"true\"]::before {\n  background: var(--wpfw-crimson); border-color: var(--wpfw-crimson);\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2.2' d='M1 5l3.2 3.2L11 1.5'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat; background-position: center; background-size: 10px 8px;\n}\n.wpfw-dcfrow .wpfw-dcfnote { font-size: 12.5px; color: var(--wpfw-muted); }\n\n/* Events waiting on a new date. The month grid has no square for them, so they sit under\n   it in the same gold-ruled treatment the From filters use -- present, clearly set apart\n   from the dated listings, and not mistaken for a day of the week. */\n.wpfw-undated {\n  margin-top: 18px; padding: 13px 15px; border-radius: 2px;\n  background: var(--wpfw-paper); border-left: 4px solid var(--wpfw-gold);\n}\n.wpfw-undated h3 {\n  font-family: var(--wpfw-body); font-size: 12px; font-weight: 700;\n  letter-spacing: .08em; text-transform: uppercase; color: var(--wpfw-muted);\n  margin: 0 0 8px;\n}\n.wpfw-undated ul { margin: 0; padding-left: 18px; }\n.wpfw-undated li { margin: 0 0 4px; font-size: 15px; }\n\n/* An author `display` rule outranks the browser's built-in [hidden] { display: none },\n   so these two need saying explicitly. Without them the filter row and its buttons stay\n   on screen when there is nothing behind them, and clicking one returns nothing. */\n.wpfw-ev .wpfw-dcfrow[hidden],\n.wpfw-ev .wpfw-dcfrow button[hidden] { display: none !important; }\n\n/* The two designations still have to be findable among the issue tags, so they keep\n   their own hue. Tinted rather than solid, they stand out without shouting. */\n.wpfw-ev .wpfw-tag.wpfw-sta {\n  background: var(--wpfw-tag-sta-bg); color: var(--wpfw-tag-sta-ink);\n  border-color: var(--wpfw-tag-sta-line);\n}\n.wpfw-ev .wpfw-tag.wpfw-dcf {\n  background: var(--wpfw-tag-dcf-bg); color: var(--wpfw-tag-dcf-ink);\n  border-color: var(--wpfw-tag-dcf-line);\n}\n\n.wpfw-cal-count { margin-left: auto; font-size: 14px; color: var(--wpfw-muted); }\n.wpfw-past-note {\n  background: var(--wpfw-paper); border-left: 4px solid var(--wpfw-muted);\n  padding: 11px 15px; margin: 16px 0 0; font-size: 14.5px; color: var(--wpfw-muted);\n  border-radius: 2px;\n}\n.wpfw-cal-status { font-size: 15px; color: var(--wpfw-muted); padding: 18px 0 0; min-height: 24px; }\n/* Once the events land this paragraph has nothing to say, but its padding and\n   min-height went on holding 39px above the first listing. It reappears the moment\n   it has a message again. */\n.wpfw-ev .wpfw-cal-status:empty { display: none; }\n\n/* ---------- list view ---------- */\n.wpfw-daygroup { border-top: 1px solid var(--wpfw-rule); padding: var(--wpfw-s5) 0 var(--wpfw-s1); }\n/* The first group has no rule above it to clear, so it needs no room for one. */\n.wpfw-daygroup:first-child { border-top: 0; padding-top: 0; }\n/* Block 1 styles every h1-h4 inside .wpfw-ev with the display face, and that selector\n   is more specific than a bare class, so this one has to match it to win. The date is\n   the thing people scan for, so it carries weight rather than decoration: the rule\n   above each group already marks the boundary. */\n.wpfw-ev h3.wpfw-dayhead {\n  font-family: var(--wpfw-body); font-weight: 700; font-size: 17.5px;\n  letter-spacing: -.005em; color: var(--wpfw-ink);\n  margin: 0 0 15px; padding: 0; border: 0;\n}\n.wpfw-card {\n  display: block; width: 100%; text-align: left; background: none; border: 0;\n  border-bottom: 1px solid var(--wpfw-rule);\n  padding: var(--wpfw-s4) var(--wpfw-s3) var(--wpfw-s4) var(--wpfw-s3);\n  margin: 0 calc(var(--wpfw-s3) * -1); cursor: pointer;\n  font-family: var(--wpfw-body); color: var(--wpfw-ink);\n  border-radius: 2px; transition: background-color .12s ease;\n  width: calc(100% + var(--wpfw-s3) * 2);\n}\n.wpfw-card:hover { background: #FAF9F7; }\n@media (prefers-reduced-motion: reduce) { .wpfw-card { transition: none; } }\n.wpfw-card:last-child { border-bottom: 0; }\n/* Time and picture share the left column, stacked; the text takes the right. The\n   picture is on the left where it can do its job, and because the column is a fixed\n   width the text still starts at the same place on every card, with or without one.\n   Grid areas do this without reordering the markup, so the reading order stays\n   time, then title, then picture. */\n.wpfw-card-row {\n  display: grid;\n  grid-template-columns: 140px minmax(0, 1fr);\n  grid-template-rows: auto auto;\n  grid-template-areas: \"when content\" \"thumb content\";\n  gap: 0 var(--wpfw-s4); align-items: start;\n}\n.wpfw-card-when  { grid-area: when; }\n.wpfw-card-thumb { grid-area: thumb; margin-top: var(--wpfw-s2); }\n.wpfw-card-main  { grid-area: content; }\n.wpfw-card-when {\n  font-size: 15px; font-weight: 700; color: var(--wpfw-ink);\n  font-variant-numeric: tabular-nums; letter-spacing: -.01em;\n  padding-top: 1px; line-height: 1.3;\n}\n.wpfw-card-until {\n  display: block; font-size: 12.5px; font-weight: 400; color: var(--wpfw-muted);\n  letter-spacing: 0; margin-top: 1px;\n}\n.wpfw-card-thumb {\n  width: 104px; height: 104px; object-fit: cover; border-radius: 2px;\n  background: var(--wpfw-paper); display: block;\n}\n.wpfw-card-main { min-width: 0; }\n/* On a phone a time column costs a third of the line length, which hurts far more\n   than the alignment helps. The time moves above the title and the text gets the\n   whole width. */\n@media (max-width: 640px) {\n  .wpfw-card-row {\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-areas: \"when\" \"thumb\" \"content\";\n    gap: 0;\n  }\n  .wpfw-card-when {\n    padding: 0; margin: 0 0 var(--wpfw-s1); font-size: 12px; letter-spacing: .06em;\n    text-transform: uppercase; color: var(--wpfw-muted);\n  }\n  .wpfw-card-until { display: inline; margin: 0 0 0 5px; font-size: 12px;\n                     letter-spacing: .06em; text-transform: lowercase; }\n  .wpfw-card-thumb { width: 100%; aspect-ratio: 3 / 2; height: auto;\n                     margin: 0 0 var(--wpfw-s3); }\n}\n/* The card holds two real links now -- the event and whoever is putting it on -- so\n   the focus ring belongs on those, not on the card. The rest of the card still takes\n   a click, which is what a reader expects of a card, but that is a convenience layered\n   on working links rather than the only way in. */\n.wpfw-card a:focus-visible { outline: 3px solid var(--wpfw-gold); outline-offset: 3px;\n  border-radius: 2px; }\n.wpfw-card:hover .wpfw-card-title { color: var(--wpfw-crimson-lt); text-decoration: underline; }\na.wpfw-card-title {\n  display: block; text-decoration: none;\n  font-family: var(--wpfw-body); font-weight: 600; font-size: 19px; line-height: 1.35;\n  letter-spacing: -.004em; color: var(--wpfw-crimson); margin: 0 0 5px;\n}\n.wpfw-card-meta { display: block; font-size: 14px; color: var(--wpfw-muted); margin: 0 0 var(--wpfw-s2); }\n/* Underlined on hover only. A permanent underline on every card would turn the meta\n   line into a row of blue-book links and pull the eye off the titles. */\n.wpfw-ev a.wpfw-orglink {\n  color: var(--wpfw-muted); text-decoration: none; font-weight: 600;\n  border-bottom: 1px dotted #b3b0a6;\n}\n.wpfw-ev a.wpfw-orglink:hover { color: var(--wpfw-crimson); border-bottom-color: currentColor; }\n.wpfw-detail-org a.wpfw-orglink { color: var(--wpfw-ink); }\n.wpfw-card-meta strong { color: var(--wpfw-ink); font-weight: 600; }\n.wpfw-card-desc { display: block; font-size: 15px; line-height: 1.62; margin: 0 0 var(--wpfw-s3); max-width: 64ch; color: #46463F; }\n.wpfw-card-tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\n\n/* ---------- month view ---------- */\n.wpfw-monthnav {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 10px; padding: 18px 0 12px;\n}\n.wpfw-monthnav h3 { font-size: 22px; margin: 0; }\n.wpfw-monthnav button {\n  font-family: var(--wpfw-body); font-size: 14px; font-weight: 600; cursor: pointer;\n  background: #fff; border: 1px solid #8b8b85; color: var(--wpfw-ink);\n  padding: 8px 14px; border-radius: 2px;\n}\n.wpfw-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }\n.wpfw-grid caption { text-align: left; font-size: 13px; color: var(--wpfw-muted); padding: 0 0 8px; }\n.wpfw-grid th {\n  font-family: var(--wpfw-body); font-size: 11px; font-weight: 700; letter-spacing: .07em;\n  text-transform: uppercase; color: var(--wpfw-muted);\n  padding: 6px 2px; border-bottom: 2px solid var(--wpfw-ink); text-align: center;\n}\n.wpfw-grid td { border: 1px solid var(--wpfw-rule); vertical-align: top; padding: 0; height: 62px; }\n.wpfw-grid td.out { background: #FAFAF8; }\n.wpfw-daybtn {\n  width: 100%; height: 100%; min-height: 62px; background: none; border: 0;\n  font-family: var(--wpfw-body); color: var(--wpfw-ink); cursor: pointer;\n  padding: 5px 4px; text-align: left; display: block;\n}\n.wpfw-daybtn:disabled { cursor: default; }\n.wpfw-daynum { font-size: 13px; font-weight: 600; }\n.wpfw-daybtn[aria-pressed=\"true\"] { background: var(--wpfw-paper); box-shadow: inset 0 0 0 2px var(--wpfw-crimson); }\n.wpfw-today .wpfw-daynum { background: var(--wpfw-gold); color: var(--wpfw-ink);\n  border-radius: 999px; padding: 1px 7px; display: inline-block; }\n.wpfw-dots { display: flex; flex-wrap: wrap; gap: 3px; padding: 5px 0 0; }\n.wpfw-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wpfw-crimson); }\n.wpfw-daytitles { display: none; }\n.wpfw-daypanel { border-top: 2px solid var(--wpfw-ink); margin-top: 22px; padding-top: 6px; }\n\n@media (min-width: 700px) {\n  .wpfw-grid td { height: 118px; }\n  .wpfw-daybtn { min-height: 118px; }\n  .wpfw-dots { display: none; }\n  .wpfw-daytitles { display: block; padding: 4px 0 0; }\n  .wpfw-daytitle {\n    font-size: 12px; line-height: 1.3; color: var(--wpfw-crimson);\n    border-left: 3px solid var(--wpfw-gold); padding: 1px 0 1px 5px; margin: 0 0 3px;\n    overflow: hidden; text-overflow: ellipsis; display: -webkit-box;\n    -webkit-line-clamp: 2; -webkit-box-orient: vertical;\n  }\n  .wpfw-daymore { font-size: 11px; color: var(--wpfw-muted); }\n}\n\n/* ---------- detail view ---------- */\n/* The container is wide so the list has room; a single event is prose, so it keeps\n   a readable measure instead of stretching to the full width. */\n.wpfw-detail { padding: 6px 0 0; max-width: 880px; }\n/* This is the only way back from an event page, so it is a control, not a footnote. */\n.wpfw-ev button.wpfw-back {\n  display: inline-flex; align-items: center; gap: 9px;\n  font-family: var(--wpfw-body); font-size: 14.5px; font-weight: 600; cursor: pointer;\n  background: var(--wpfw-paper); color: var(--wpfw-crimson);\n  border: 1px solid var(--wpfw-crimson); border-radius: 2px;\n  padding: 10px 18px; margin: 0 0 20px; text-decoration: none;\n}\n.wpfw-ev button.wpfw-back::before {\n  content: \"\\2190\"; font-size: 17px; line-height: 1; position: relative; top: -1px;\n}\n.wpfw-ev button.wpfw-back:hover {\n  background: var(--wpfw-crimson); color: #fff; border-color: var(--wpfw-crimson);\n}\n.wpfw-ev button.wpfw-back:focus-visible { outline: 3px solid var(--wpfw-gold); outline-offset: 2px; }\n.wpfw-detail h2 { font-size: 27px; line-height: 1.18; margin: 12px 0 8px; }\n.wpfw-detail-org { font-size: 17px; color: var(--wpfw-muted); margin: 0 0 18px; }\n.wpfw-detail-img {\n  width: 100%; height: auto; max-height: 380px; object-fit: cover;\n  border-radius: 2px; margin: 0 0 20px; background: var(--wpfw-paper);\n}\n.wpfw-facts { border-top: 2px solid var(--wpfw-ink); margin: 0 0 22px; }\n.wpfw-facts div {\n  display: flex; flex-wrap: wrap; gap: 4px 16px;\n  border-bottom: 1px solid var(--wpfw-rule); padding: 11px 0;\n}\n.wpfw-facts dt {\n  flex: 0 0 100%; font-size: 11px; font-weight: 700; letter-spacing: .07em;\n  text-transform: uppercase; color: var(--wpfw-muted); margin: 0;\n}\n.wpfw-facts dd { flex: 1 1 auto; margin: 0; font-size: 16px; min-width: 0; overflow-wrap: anywhere; }\n.wpfw-facts dd a.wpfw-rawlink { font-family: var(--wpfw-body); }\n@media (min-width: 620px) {\n  .wpfw-facts dt { flex: 0 0 160px; padding-top: 3px; }\n}\n.wpfw-detail-body { font-size: 16.5px; line-height: 1.72; max-width: 66ch; }\n.wpfw-detail-body p { margin: 0 0 1em; }\n.wpfw-cta {\n  display: inline-block; font-family: var(--wpfw-head); font-size: 16px;\n  background: var(--wpfw-crimson); color: #fff; text-decoration: none;\n  padding: 12px 24px; border-radius: 2px; margin: 6px 0 0;\n}\n.wpfw-cta:hover { background: var(--wpfw-crimson-lt); color: #fff; }\n/* `.wpfw-ev a` in Block 1 is more specific than `.wpfw-cta`, so without these two the\n   label turns crimson on a crimson button and the whole thing reads as a blank red\n   slab. `.wpfw-cta-btn` above already carries the same guard. */\n.wpfw-ev a.wpfw-cta { color: #fff; text-decoration: none; }\n.wpfw-ev a.wpfw-cta:hover { background: var(--wpfw-crimson-lt); color: #fff; }\n\n.wpfw-empty {\n  padding: 46px 30px; text-align: center; background: var(--wpfw-paper);\n  border-radius: 2px; border-top: 4px solid var(--wpfw-gold); margin-top: 8px;\n}\n.wpfw-empty .head {\n  font-family: var(--wpfw-head); font-size: 23px; color: var(--wpfw-ink); margin: 0 0 10px;\n}\n.wpfw-empty p { font-size: 16px; color: var(--wpfw-muted); margin: 0 auto 18px; max-width: 46ch; }\n.wpfw-empty .wpfw-cta-btn { margin-top: 4px; }\n.wpfw-retry {\n  font-family: var(--wpfw-body); font-size: 14px; font-weight: 600; cursor: pointer;\n  background: #fff; border: 1px solid var(--wpfw-crimson); color: var(--wpfw-crimson);\n  padding: 8px 16px; border-radius: 2px; margin-left: 8px;\n}\n\n/* ---------- reading layout ----------------------------------------------\n   The events are the page. Everything that explains or filters them moves to\n   a quiet rail on the left, so the first listing sits at the top of the\n   screen instead of below a screenful of preamble. Single column under 900px. */\n.wpfw-main { min-width: 0; }\n.wpfw-about { margin: 0 0 4px; }\n.wpfw-about > summary {\n  cursor: pointer; font-size: 14px; font-weight: 600; color: var(--wpfw-crimson);\n  list-style: none; padding: 4px 0; display: inline-flex; align-items: center; gap: 7px;\n}\n.wpfw-about > summary::-webkit-details-marker { display: none; }\n.wpfw-about > summary::before {\n  content: \"+\"; font-family: var(--wpfw-head); font-size: 15px; line-height: 1;\n  width: 15px; text-align: center;\n}\n.wpfw-about[open] > summary::before { content: \"\\2013\"; }\n.wpfw-about > summary:hover { color: var(--wpfw-crimson-lt); }\n.wpfw-about > summary:focus-visible { outline: 2px solid var(--wpfw-gold); outline-offset: 2px; }\n.wpfw-about .body:last-child { margin-bottom: 4px; }\n\n@media (min-width: 900px) {\n  .wpfw-layout {\n    display: grid; grid-template-columns: 288px minmax(0, 1fr);\n    gap: 0 54px; align-items: start;\n  }\n  .wpfw-rail {\n    align-self: start;\n    padding: 2px 18px 10px 0; border-right: 1px solid var(--wpfw-rule);\n  }\n\n  /* The masthead spans both columns, so the title keeps its full size. Only the\n     supporting copy inside the rail scales down. */\n  .wpfw-masthead { margin: 0 0 18px; }\n  .wpfw-blurb { max-width: 68ch; }\n  .wpfw-blurb .lede { font-size: 18px; line-height: 1.5; margin-bottom: 10px; }\n  .wpfw-blurb .body { font-size: 14.5px; line-height: 1.58; }\n  .wpfw-masthead-cta { margin: 18px 0 0; }\n  .wpfw-ev a.wpfw-cta-btn { display: block; text-align: center; padding: 12px 16px; }\n\n  /* the rail is one column wide, so its controls stack instead of wrapping */\n  .wpfw-bar {\n    flex-direction: column; align-items: stretch; gap: 9px;\n    border-top-width: 1px; padding: 16px 0 14px; margin: 18px 0 0;\n  }\n  .wpfw-views { display: grid; grid-template-columns: 1fr 1fr; }\n  .wpfw-views button { padding: 9px 10px; text-align: center; }\n  .wpfw-cal-count { text-align: left; margin: 2px 0 0; }\n  .wpfw-filters { padding: 14px 0 0; gap: 6px; }\n  .wpfw-dcfrow { flex-direction: column; align-items: stretch; gap: 9px; padding: 12px 13px; }\n  .wpfw-dcfrow button { justify-content: flex-start; }\n  .wpfw-dcfrow .wpfw-dcfnote { order: 3; }\n\n  /* nothing above the first listing */\n  .wpfw-main > .wpfw-cal-status { margin-top: 0; }\n}\n\n/* With the blurb in the header the rail is only its controls, so it fits and can be\n   pinned. The height guard stays as a floor: a very short window would otherwise hide\n   the filters at the bottom with no way to reach them. */\n@media (min-width: 900px) and (min-height: 700px) {\n  .wpfw-rail { position: sticky; top: var(--wpfw-sticky-top); }\n}\n\n/* ---------- subscribe ---------- */\n.wpfw-subscribe { margin: 16px 0 0; }\n.wpfw-subscribe > summary {\n  cursor: pointer; font-size: 14px; font-weight: 600; color: var(--wpfw-crimson);\n  list-style: none; padding: 4px 0; display: inline-flex; align-items: center; gap: 7px;\n}\n.wpfw-subscribe > summary::-webkit-details-marker { display: none; }\n.wpfw-subscribe > summary::before {\n  content: \"+\"; font-family: var(--wpfw-head); font-size: 15px; line-height: 1;\n  width: 15px; text-align: center;\n}\n.wpfw-subscribe[open] > summary::before { content: \"\\2013\"; }\n.wpfw-subscribe > summary:hover { color: var(--wpfw-crimson-lt); }\n.wpfw-subscribe > summary:focus-visible { outline: 2px solid var(--wpfw-gold); outline-offset: 2px; }\n.wpfw-sub-note { font-size: 13px; color: var(--wpfw-muted); margin: 6px 0 10px; }\n.wpfw-ev a.wpfw-sub-link {\n  display: block; font-size: 14px; padding: 7px 0; text-decoration: none;\n  border-bottom: 1px solid var(--wpfw-rule); color: var(--wpfw-crimson);\n}\n.wpfw-ev a.wpfw-sub-link:first-of-type { border-top: 1px solid var(--wpfw-rule); }\n.wpfw-ev a.wpfw-sub-link:hover { text-decoration: underline; }\n.wpfw-ev button.wpfw-sub-copy {\n  margin: 10px 0 0; font-family: var(--wpfw-body); font-size: 13px; font-weight: 600;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #a5a59f;\n  border-radius: 2px; padding: 7px 12px; cursor: pointer;\n}\n.wpfw-ev button.wpfw-sub-copy:hover { border-color: var(--wpfw-crimson); color: var(--wpfw-crimson); }\n.wpfw-sub-said { display: block; font-size: 12.5px; color: #2F6B3C; font-weight: 600; margin: 6px 0 0; min-height: 16px; }\n\n/* \"Add to my calendar\" on a single event */\n.wpfw-ev a.wpfw-addcal {\n  display: inline-block; font-family: var(--wpfw-body); font-size: 14px; font-weight: 600;\n  text-decoration: none; color: var(--wpfw-ink); background: #fff;\n  border: 1px solid #8b8b85; border-radius: 2px; padding: 9px 15px; margin: 0 8px 8px 0;\n}\n.wpfw-ev a.wpfw-addcal:hover { border-color: var(--wpfw-crimson); color: var(--wpfw-crimson); }\n\n/* ---------- access ---------- */\n.wpfw-accesslist { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 4px; }\n.wpfw-accesspill {\n  display: inline-flex; align-items: center; gap: 6px;\n  background: #EAF0E7; color: #2E5A33; border: 1px solid #C6D8C1;\n  font-size: 12.5px; font-weight: 600; padding: 3px 9px; border-radius: 2px;\n}\n.wpfw-accesspill::before { content: \"\\2713\"; font-weight: 700; font-size: 11px; }\n.wpfw-accessnote { display: block; margin: 8px 0 0; color: var(--wpfw-muted); font-size: 15px; }\n\n/* Title, then the standfirst beneath it across the full width. */\n.wpfw-headgrid { display: block; }\n@media (min-width: 900px) {\n  .wpfw-headgrid .wpfw-blurb { max-width: 72ch; margin-top: 2px; }\n}\n\n/* ---------- what this calendar is for ---------- */\n.wpfw-purpose {\n  font-size: 15px; line-height: 1.55; color: var(--wpfw-ink); margin: 0 0 6px;\n  padding-left: 12px; border-left: 3px solid var(--wpfw-gold);\n}\n\n/* ---------- how you take part ---------- */\n.wpfw-mode {\n  display: inline-block; font-family: var(--wpfw-body); font-size: 11px; font-weight: 600;\n  letter-spacing: .05em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px;\n  border: 1px solid; margin-right: 2px;\n}\n.wpfw-mode-in_person { background: #ECEFF4; color: #33445E; border-color: #C6CEDC; }\n.wpfw-mode-virtual   { background: #EAF1EF; color: #245049; border-color: #C2D6D1; }\n.wpfw-mode-hybrid    { background: #F1EDF4; color: #46335C; border-color: #D3C8DC; }\n/* On air is the station's own way to attend, so it borrows the on-air mark rather than\n   another pastel: the dot is the same one that sits in the player bar, and a listener who\n   recognises it knows they can catch this on 89.3 without leaving the house. */\n.wpfw-mode-broadcast {\n  background: var(--wpfw-crimson); color: #fff; border-color: var(--wpfw-crimson);\n}\n.wpfw-mode-broadcast::before {\n  content: \"\"; display: inline-block; width: 5px; height: 5px; border-radius: 50%;\n  background: #fff; vertical-align: 2px; margin-right: 5px;\n}\n\n/* ---------- share and remind ---------- */\n.wpfw-actions {\n  display: flex; flex-wrap: wrap; gap: 8px; align-items: center;\n  border-top: 1px solid var(--wpfw-rule); padding: 16px 0 0; margin: 22px 0 0;\n}\n.wpfw-ev a.wpfw-share, .wpfw-ev button.wpfw-share {\n  display: inline-flex; align-items: center; gap: 7px;\n  font-family: var(--wpfw-body); font-size: 13.5px; font-weight: 600;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #a5a59f;\n  border-radius: 2px; padding: 8px 13px; cursor: pointer; text-decoration: none;\n}\n.wpfw-ev a.wpfw-share:hover, .wpfw-ev button.wpfw-share:hover {\n  border-color: var(--wpfw-crimson); color: var(--wpfw-crimson);\n}\n.wpfw-sharesaid { font-size: 13px; color: #2F6B3C; font-weight: 600; }\n\n.wpfw-remind {\n  border: 1px solid var(--wpfw-rule); border-left: 4px solid var(--wpfw-crimson);\n  background: var(--wpfw-paper); border-radius: 2px; padding: 14px 16px; margin: 20px 0 0;\n}\n.wpfw-remind h3 {\n  font-family: var(--wpfw-body); font-size: 15.5px; font-weight: 600; margin: 0 0 4px;\n}\n.wpfw-remind p { font-size: 13.5px; color: var(--wpfw-muted); margin: 0 0 10px; }\n.wpfw-remindrow { display: flex; flex-wrap: wrap; gap: 8px; }\n.wpfw-remindrow input {\n  flex: 1 1 220px; min-width: 0; font-family: var(--wpfw-body); font-size: 15px;\n  border: 1px solid #8b8b85; border-radius: 2px; padding: 10px 12px; background: #fff;\n  color: var(--wpfw-ink);\n}\n.wpfw-ev button.wpfw-remindgo {\n  font-family: var(--wpfw-body); font-size: 14.5px; font-weight: 600; cursor: pointer;\n  background: var(--wpfw-crimson); color: #fff; border: 1px solid var(--wpfw-crimson);\n  border-radius: 2px; padding: 10px 20px;\n}\n.wpfw-ev button.wpfw-remindgo:hover { background: var(--wpfw-crimson-lt); }\n.wpfw-ev button.wpfw-remindgo:disabled { opacity: .5; cursor: not-allowed; }\n.wpfw-remindsaid { display: block; font-size: 13.5px; margin: 9px 0 0; min-height: 18px; }\n.wpfw-remindsaid.ok { color: #2F6B3C; font-weight: 600; }\n.wpfw-remindsaid.bad { color: var(--wpfw-crimson); font-weight: 600; }\n.wpfw-onair {\n  font-size: 13px; color: var(--wpfw-muted); margin: 14px 0 0;\n  padding-left: 12px; border-left: 3px solid var(--wpfw-gold);\n}\n\n.wpfw-joinbox {\n  display: flex; align-items: flex-start; gap: 9px; margin: 12px 0 0;\n  font-size: 13.5px; color: var(--wpfw-ink); cursor: pointer;\n}\n.wpfw-joinbox input { width: 18px; height: 18px; margin: 1px 0 0; flex: 0 0 auto; }\n\n/* ---------- the practical band ----------\n   Sits directly under the time and place, because \"can I get there and can I afford\n   it\" is the next question after \"when is it\". Topic tags live below the description,\n   away from it, so the two never compete. */\n.wpfw-card-facts {\n  display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin: 0 0 var(--wpfw-s3);\n}\n.wpfw-costpill {\n  display: inline-block; font-family: var(--wpfw-body); font-size: 11px; font-weight: 700;\n  letter-spacing: .05em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px;\n  background: #fff; color: var(--wpfw-ink); border: 1px solid #B9B6AD;\n}\n.wpfw-costpill.is-free {\n  background: #EAF0E7; color: #2E5A33; border-color: #C6D8C1;\n}\n.wpfw-card-tags { margin-top: 2px; }\n\n/* ---------- the rail reads as sections ----------\n   Small quiet labels do the grouping, so the controls underneath can stay plain.\n   One rhythm all the way down: label, controls, breathing room, rule. */\n.wpfw-railhead {\n  font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;\n  color: var(--wpfw-muted); margin: 0 0 var(--wpfw-s2); width: 100%;\n}\n@media (min-width: 900px) {\n  .wpfw-rail > * { margin-left: 0; margin-right: 0; }\n  .wpfw-masthead-cta { margin: 0 0 var(--wpfw-s3); }\n  .wpfw-subscribe { margin: 0 0 var(--wpfw-s4); padding: 0 0 var(--wpfw-s4);\n                    border-bottom: 1px solid var(--wpfw-rule); }\n  .wpfw-bar {\n    flex-direction: column; align-items: stretch; gap: var(--wpfw-s2);\n    border: 0; padding: 0; margin: 0 0 var(--wpfw-s4);\n  }\n  .wpfw-filters { padding: 0; gap: 6px; margin: 0 0 var(--wpfw-s4); }\n  .wpfw-dcfrow { margin: 0; }\n  .wpfw-cal-count { margin: var(--wpfw-s1) 0 0; }\n}\n\n/* ---------- the thing no other calendar here can offer ----------\n   A radio station marks live output with a light. Borrowing that is both the most\n   honest signal of what this calendar is and the one thing worth interrupting the\n   reader for. */\n.wpfw-onairpitch {\n  display: flex; gap: var(--wpfw-s3); align-items: flex-start;\n  font-size: 15px; line-height: 1.55; color: var(--wpfw-ink);\n  margin: var(--wpfw-s3) 0 0; max-width: 72ch;\n}\n.wpfw-onairtag {\n  flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px;\n  background: var(--wpfw-crimson); color: #fff; border-radius: 2px;\n  font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;\n  padding: 4px 9px; margin-top: 3px;\n}\n.wpfw-onairtag::before {\n  content: \"\"; width: 6px; height: 6px; border-radius: 50%; background: #fff;\n  box-shadow: 0 0 0 3px rgba(255,255,255,.35);\n}\n@media (max-width: 640px) {\n  .wpfw-onairpitch { flex-direction: column; gap: var(--wpfw-s2); font-size: 14.5px; }\n  .wpfw-onairtag { align-self: flex-start; margin-top: 0; }\n}\n\n/* ---------- images earn their space ----------\n   One ratio across every card, and the box is reserved whether or not a picture\n   loads, so nothing jumps as the page settles. 3:2 suits event photography; the\n   square this replaced cropped the life out of most of them. */\n.wpfw-card-thumb {\n  width: 140px; aspect-ratio: 3 / 2; height: auto; object-fit: cover;\n  border-radius: 3px; background: var(--wpfw-paper); display: block;\n}\n\n/* Row heights stop varying with how much somebody wrote. Three lines is enough to\n   say what an event is; the rest is on the event's own page. */\n.wpfw-card-desc {\n  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/* In the rail this is one section among several, so it drops the tinted panel and\n   uses the same quiet heading as Show and Filter by issue. Below 900px it goes back\n   to being a panel, because there are no headings to group it there. */\n@media (min-width: 900px) {\n  .wpfw-dcfrow {\n    background: none; border-left: 0; padding: 0; gap: var(--wpfw-s2);\n  }\n  .wpfw-dcfrow button {\n    width: 100%; border-color: var(--wpfw-rule); padding: 8px 11px;\n  }\n  .wpfw-dcfrow button:hover { border-color: #a5a59f; }\n  .wpfw-dcfrow .wpfw-dcfnote { margin-top: var(--wpfw-s1); }\n}\n\n/* ---------- put this on your site ---------- */\n.wpfw-embedlink { margin: 10px 0 0; font-size: 14px; }\n.wpfw-embedlink a { color: var(--wpfw-crimson); font-weight: 600; }\n\n.wpfw-modal {\n  position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center;\n  justify-content: center; padding: 20px; background: rgba(26, 25, 23, .55);\n}\n.wpfw-ev .wpfw-modal[hidden] { display: none !important; }\n.wpfw-modal-box {\n  background: #fff; border-top: 5px solid var(--wpfw-crimson); border-radius: 3px;\n  max-width: 40rem; width: 100%; max-height: 88vh; overflow-y: auto;\n  padding: 24px 26px 22px; position: relative;\n  box-shadow: 0 2px 6px rgba(0,0,0,.12), 0 20px 60px rgba(0,0,0,.28);\n}\n.wpfw-modal-box h3 { font-family: var(--wpfw-head); font-size: 22px; margin: 0 0 8px; }\n.wpfw-modal-lede { font-size: 15px; color: var(--wpfw-muted); margin: 0 0 18px; max-width: 46ch; }\n.wpfw-ev button.wpfw-modal-x {\n  position: absolute; top: 10px; right: 12px; background: none; border: 0; cursor: pointer;\n  font-size: 26px; line-height: 1; color: var(--wpfw-muted); padding: 4px 8px;\n}\n.wpfw-ev button.wpfw-modal-x:hover { color: var(--wpfw-crimson); }\n.wpfw-embed-opts { display: grid; gap: 4px 14px; grid-template-columns: auto 1fr;\n  align-items: center; margin: 0 0 18px; }\n.wpfw-embed-opts label { font-size: 13px; font-weight: 700; color: var(--wpfw-muted); }\n.wpfw-embed-opts select {\n  font-family: var(--wpfw-body); font-size: 15px; padding: 7px 9px; width: 100%;\n  border: 1px solid #b9b9b3; border-radius: 2px; background: #fff; color: var(--wpfw-ink);\n  margin: 3px 0;\n}\n.wpfw-embed-lbl { display: block; font-size: 13px; font-weight: 700;\n  color: var(--wpfw-muted); margin: 0 0 5px; }\n.wpfw-modal-box textarea {\n  width: 100%; height: 92px; font: 12.5px/1.6 ui-monospace, Menlo, Consolas, monospace;\n  padding: 11px 12px; border: 1px solid #b9b9b3; border-radius: 2px;\n  background: var(--wpfw-paper); color: var(--wpfw-ink); resize: vertical; white-space: pre;\n}\n.wpfw-modal-box textarea:focus { outline: 2px solid var(--wpfw-crimson); outline-offset: 1px; }\n.wpfw-modal-actions { margin: 12px 0 0; display: flex; align-items: center; gap: 12px; }\n.wpfw-ev button.wpfw-embed-copy {\n  font-family: var(--wpfw-body); font-size: 14.5px; font-weight: 600; cursor: pointer;\n  background: var(--wpfw-crimson); color: #fff; border: 1px solid var(--wpfw-crimson);\n  border-radius: 2px; padding: 10px 20px;\n}\n.wpfw-ev button.wpfw-embed-copy:hover { background: var(--wpfw-crimson-lt); }\n.wpfw-embed-said { font-size: 13.5px; color: #2F6B3C; font-weight: 600; }\n.wpfw-modal-note { font-size: 13px; color: var(--wpfw-muted); margin: 14px 0 0;\n  padding-left: 12px; border-left: 3px solid var(--wpfw-gold); }\n/* ---------- who is putting this on ---------- */\n.wpfw-org-head { margin: 0 0 4px; padding-right: 34px; }\n.wpfw-org-badges { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 14px; }\n.wpfw-org-stat {\n  display: flex; flex-wrap: wrap; gap: var(--wpfw-s2) var(--wpfw-s4);\n  border-top: 1px solid var(--wpfw-rule); border-bottom: 1px solid var(--wpfw-rule);\n  padding: 12px 0; margin: 0 0 var(--wpfw-s4);\n}\n.wpfw-org-stat > div { min-width: 7rem; }\n.wpfw-org-n { display: block; font-family: var(--wpfw-head); font-size: 24px;\n  line-height: 1.1; color: var(--wpfw-ink); font-variant-numeric: tabular-nums; }\n.wpfw-org-k { display: block; font-size: 11.5px; letter-spacing: .09em;\n  text-transform: uppercase; color: var(--wpfw-muted); font-weight: 700; margin-top: 3px; }\n.wpfw-org-sec { font-size: 11.5px; letter-spacing: .09em; text-transform: uppercase;\n  color: var(--wpfw-muted); font-weight: 700; margin: 0 0 var(--wpfw-s2); }\n.wpfw-org-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 var(--wpfw-s4); }\n.wpfw-org-list { list-style: none; margin: 0; padding: 0; }\n.wpfw-org-list li { border-top: 1px solid var(--wpfw-rule); }\n.wpfw-org-list li:first-child { border-top: 0; }\n.wpfw-ev a.wpfw-org-ev {\n  display: grid; grid-template-columns: 5.6rem minmax(0, 1fr); gap: 0 var(--wpfw-s3);\n  align-items: baseline; padding: 11px 8px 11px 0; margin: 0 -8px 0 0;\n  text-decoration: none; border-radius: 2px;\n}\n.wpfw-ev a.wpfw-org-ev:hover { background: #FAF9F7; }\n.wpfw-ev a.wpfw-org-ev:hover .wpfw-org-ev-t { text-decoration: underline; }\n.wpfw-org-ev-d { font-size: 12.5px; font-weight: 700; letter-spacing: .04em;\n  text-transform: uppercase; color: var(--wpfw-muted); font-variant-numeric: tabular-nums; }\n.wpfw-org-ev-t { display: block; font-size: 16px; font-weight: 600; line-height: 1.35;\n  color: var(--wpfw-crimson); }\n.wpfw-org-ev-w { display: block; font-size: 13.5px; color: var(--wpfw-muted); margin-top: 2px; }\n.wpfw-org-current { color: var(--wpfw-muted); font-weight: 400; }\n@media (max-width: 520px) {\n  .wpfw-ev a.wpfw-org-ev { grid-template-columns: 1fr; gap: 2px; }\n}\n@media (max-width: 520px) {\n  .wpfw-embed-opts { grid-template-columns: 1fr; }\n  .wpfw-modal-box { padding: 20px 18px 18px; }\n}\n",
    upcoming: "\n/* This block stands alone on the homepage, so it has to fetch its own fonts --\n   Block 1 carries this import for the other pages and is not here. Without it\n   everything silently falls back to Georgia and looks nothing like the rest. */\n@import url('https://fonts.googleapis.com/css2?family=Young+Serif&family=Bitter:wght@400;500;600;700&display=swap');\n\n.wpfw-up { --wpfw-crimson:#9C0D0C; --wpfw-crimson-lt:#C81210; --wpfw-gold:#E0A80D;\n  --wpfw-ink:#2A2A2A; --wpfw-paper:#F4F4F2; --wpfw-rule:#d8d8d3; --wpfw-muted:#5F5F59;\n  font-family: 'Bitter', Georgia, serif; color: var(--wpfw-ink);\n  max-width: 1100px; margin: 0 auto; padding: 0 4px; }\n.wpfw-up *, .wpfw-up *::before, .wpfw-up *::after { box-sizing: border-box; }\n.wpfw-up-head { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: baseline;\n  justify-content: space-between; border-bottom: 2px solid var(--wpfw-ink);\n  padding-bottom: 10px; margin-bottom: 4px; }\n.wpfw-up-head h2 { font-family: 'Young Serif', Georgia, serif; font-weight: 400;\n  font-size: 24px; margin: 0; }\n.wpfw-up-head a { font-size: 14px; font-weight: 600; color: var(--wpfw-crimson); }\n.wpfw-up-list { list-style: none; margin: 0; padding: 0; }\n.wpfw-up-item { border-bottom: 1px solid var(--wpfw-rule); }\n.wpfw-up-item a { display: flex; gap: 14px; align-items: baseline; padding: 14px 2px;\n  text-decoration: none; color: inherit; }\n.wpfw-up-item a:hover .wpfw-up-title { color: var(--wpfw-crimson-lt); text-decoration: underline; }\n.wpfw-up-date { flex: 0 0 54px; text-align: center; line-height: 1.05; padding-top: 2px; }\n.wpfw-up-mon { display: block; font-size: 11px; font-weight: 700; letter-spacing: .08em;\n  text-transform: uppercase; color: var(--wpfw-crimson); }\n.wpfw-up-day { display: block; font-family: 'Young Serif', Georgia, serif; font-size: 25px; }\n.wpfw-up-body { flex: 1 1 auto; min-width: 0; }\n/* Both are spans inside the link, so they need making block-level or the margins\n   below do nothing and the meta line runs on from the end of the title. */\n.wpfw-up-title { display: block; font-family: 'Young Serif', Georgia, serif; font-size: 17px;\n  line-height: 1.25; color: var(--wpfw-ink); margin: 0 0 3px; }\n.wpfw-up-meta { display: block; font-size: 13.5px; color: var(--wpfw-muted); margin: 0;\n  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.wpfw-up-dcf { display: inline-block; font-size: 10.5px; font-weight: 700;\n  letter-spacing: .06em; text-transform: uppercase; margin-top: 5px;\n  background: var(--wpfw-ink); color: var(--wpfw-paper);\n  border-left: 3px solid var(--wpfw-gold); padding: 2px 7px; border-radius: 2px; }\n.wpfw-up-note { font-size: 12.5px; color: var(--wpfw-muted); margin: 12px 0 0; }\n.wpfw-up-note a { color: var(--wpfw-crimson); }\n.wpfw-up-load { font-size: 14px; color: var(--wpfw-muted); padding: 18px 0; }\n@media (min-width: 760px) {\n  .wpfw-up-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 28px; }\n  .wpfw-up-item:nth-last-child(-n+3) { border-bottom: 0; }\n}\n",
    station: "\n.wpfw-se {\n  --se-crimson:#9C0D0C; --se-crimson-lt:#C81210; --se-gold:#E0A80D;\n  --se-ink:#2A2A2A; --se-paper:#F4F4F2; --se-rule:#d8d8d3; --se-muted:#5F5F59;\n  --se-head:'Young Serif', Georgia, 'Times New Roman', serif;\n  --se-body:'Bitter', Georgia, 'Times New Roman', serif;\n  font-family: var(--se-body); color: var(--se-ink); font-size: 16px; line-height: 1.55;\n  max-width: 880px; margin: 0 auto; padding: 0 4px;\n  -webkit-text-size-adjust: 100%;\n}\n.wpfw-se *, .wpfw-se *::before, .wpfw-se *::after { box-sizing: border-box; }\n.wpfw-se h1, .wpfw-se h2, .wpfw-se h3 {\n  font-family: var(--se-head); font-weight: 400; line-height: 1.15; margin: 0;\n}\n.wpfw-se a { color: var(--se-crimson); text-decoration: underline; text-underline-offset: 2px; }\n.wpfw-se a:hover { color: var(--se-crimson-lt); }\n.wpfw-se :focus-visible { outline: 3px solid var(--se-gold); outline-offset: 2px; }\n\n.wpfw-se-top { padding: 4px 0 0; }\n.wpfw-se-eyebrow {\n  font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;\n  color: var(--se-muted); margin: 0 0 16px;\n}\n.wpfw-se-top h1 { font-size: clamp(32px, 6vw, 44px); letter-spacing: -.01em; margin: 0 0 4px; }\n.wpfw-se-rule { width: 58px; height: 4px; background: var(--se-gold); margin: 20px 0 22px; }\n.wpfw-se-blurb { max-width: 58ch; font-size: 17px; margin: 0 0 6px; }\n.wpfw-se-sub { max-width: 58ch; font-size: 15.5px; color: var(--se-muted); margin: 0 0 26px; }\n\n.wpfw-se-status { font-size: 15px; color: var(--se-muted); padding: 22px 0; }\n.wpfw-se-status:empty { display: none; }   /* same gap, same fix */\n.wpfw-se-spin {\n  display: inline-block; width: 15px; height: 15px; vertical-align: -2px; margin-right: 6px;\n  border: 2px solid var(--se-rule); border-top-color: var(--se-crimson);\n  border-radius: 50%; animation: wpfwSeSpin .8s linear infinite;\n}\n@keyframes wpfwSeSpin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) { .wpfw-se-spin { animation-duration: 3s; } }\n\n.wpfw-se-month {\n  font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;\n  color: var(--se-muted); border-top: 2px solid var(--se-ink);\n  padding: 26px 0 12px; margin: 0;\n}\n.wpfw-se-list { list-style: none; margin: 0; padding: 0; }\n.wpfw-se-item { border-bottom: 1px solid var(--se-rule); }\n.wpfw-se-item a {\n  display: flex; gap: 18px; align-items: flex-start;\n  padding: 18px 2px; text-decoration: none; color: inherit;\n}\n.wpfw-se-item a:hover .wpfw-se-title { color: var(--se-crimson-lt); text-decoration: underline; }\n.wpfw-se-date {\n  flex: 0 0 62px; text-align: center; line-height: 1.05; padding-top: 3px;\n  border-right: 1px solid var(--se-rule); margin-right: 2px;\n}\n.wpfw-se-dow { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .09em;\n  text-transform: uppercase; color: var(--se-muted); }\n.wpfw-se-day { display: block; font-family: var(--se-head); font-size: 30px; color: var(--se-ink); }\n.wpfw-se-mon { display: block; font-size: 11px; font-weight: 700; letter-spacing: .09em;\n  text-transform: uppercase; color: var(--se-crimson); }\n.wpfw-se-body { flex: 1 1 auto; min-width: 0; }\n.wpfw-se-thumb { flex: 0 0 auto; width: 88px; height: 88px; object-fit: cover;\n  border-radius: 2px; background: var(--se-paper); display: block; }\n@media (max-width: 520px) { .wpfw-se-thumb { width: 62px; height: 62px; } }\n.wpfw-se-title { font-family: var(--se-head); font-size: 20px; line-height: 1.25;\n  color: var(--se-crimson); margin: 0 0 5px; display: block; }\n.wpfw-se-meta { display: block; font-size: 14px; color: var(--se-muted); margin: 0 0 8px; }\n.wpfw-se-meta strong { color: var(--se-ink); font-weight: 600; }\n.wpfw-se-desc { display: block; font-size: 15.5px; margin: 0 0 10px; max-width: 70ch; }\n.wpfw-se-tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\n.wpfw-se-tag {\n  display: inline-block; background: #F0EEE8; color: #4C4C45;\n  border: 1px solid #DCD9D1;\n  font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;\n  padding: 2px 7px; border-radius: 2px;\n}\n.wpfw-se-cost { font-size: 12px; font-weight: 700; letter-spacing: .04em;\n  text-transform: uppercase; color: var(--se-muted); }\n\n.wpfw-se-empty {\n  padding: 46px 30px; text-align: center; background: var(--se-paper);\n  border-top: 4px solid var(--se-gold); border-radius: 2px;\n}\n.wpfw-se-empty .h { font-family: var(--se-head); font-size: 23px; margin: 0 0 10px; }\n.wpfw-se-empty p { font-size: 16px; color: var(--se-muted); margin: 0 auto 18px; max-width: 44ch; }\n.wpfw-se-cta {\n  display: inline-block; font-family: var(--se-head); font-size: 16px;\n  background: var(--se-crimson); color: #fff; text-decoration: none;\n  padding: 12px 24px; border-radius: 2px; border: 2px solid var(--se-crimson);\n}\n.wpfw-se a.wpfw-se-cta { color: #fff; }\n.wpfw-se a.wpfw-se-cta:hover { background: var(--se-crimson-lt); border-color: var(--se-crimson-lt); }\n\n.wpfw-se-foot {\n  border-top: 1px solid var(--se-rule); margin-top: 34px; padding-top: 16px;\n  font-size: 13px; line-height: 1.5; color: var(--se-muted);\n}\n.wpfw-se-retry {\n  font-family: var(--se-body); font-size: 14px; font-weight: 600; cursor: pointer;\n  background: #fff; border: 1px solid var(--se-crimson); color: var(--se-crimson);\n  padding: 8px 16px; border-radius: 2px; margin-left: 10px;\n}\n@media (max-width: 520px) {\n  .wpfw-se-item a { gap: 12px; }\n  .wpfw-se-date { flex: 0 0 50px; }\n  .wpfw-se-day { font-size: 25px; }\n}\n\n/* Partner calendars. Two links that have to look deliberate rather than like an\n   afterthought, so they get the same crimson rule as the rest of the page. */\n.wpfw-se-more { margin: 0 0 26px; }\n.wpfw-se-more-h {\n  font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;\n  color: var(--se-muted); margin: 0 0 10px;\n}\n.wpfw-se-more-row { display: flex; flex-wrap: wrap; gap: 10px; }\n.wpfw-se .wpfw-se-more-row a {\n  flex: 1 1 240px; display: block; text-align: center; text-decoration: none;\n  font-family: var(--se-head); font-size: 16px; line-height: 1.3;\n  color: var(--se-crimson); background: #fff;\n  border: 1px solid var(--se-crimson); border-radius: 2px; padding: 14px 18px;\n}\n.wpfw-se .wpfw-se-more-row a:hover {\n  background: var(--se-crimson); color: #fff; border-color: var(--se-crimson);\n}\n@media (max-width: 520px) { .wpfw-se-more-row a { flex: 1 1 100%; } }\n\n.wpfw-se-subscribe { font-size: 14px; color: var(--se-muted); margin: 14px 0 0; }\n.wpfw-se-subscribe a { color: var(--se-crimson); text-decoration: underline;\n  text-underline-offset: 2px; margin: 0 2px; }\n",
  };

  var MARKUP = {
    submit: "<div class=\"wpfw-ev wpfw-form-wrap\" id=\"wpfw-form-root\">\n\n  <div id=\"wpfw-form-stage\">\n    <h2>Submit an event</h2>\n    <p class=\"wpfw-lede\">Tell us what your organization has coming up and we will consider it for the\n      <strong>Social Justice Calendar</strong>, a partnership of WPFW 89.3&nbsp;FM and the\n      <a href=\"https://diversecityfund.org\" target=\"_blank\" rel=\"noopener noreferrer\">Diverse City Fund</a>.</p>\n\n    <div class=\"wpfw-freenote\">\n      <strong>Listing is free and cannot be purchased.</strong>\n      There is no paid placement, no featured slot, and no advertising on this calendar.\n      A listing is not an endorsement by WPFW 89.3&nbsp;FM, Pacifica Foundation Radio, or the\n      <a href=\"https://diversecityfund.org\" target=\"_blank\" rel=\"noopener noreferrer\">Diverse City Fund</a>. We may edit submissions for length and style, and we cannot list events\n      that support or oppose a candidate for public office.\n      <span id=\"wpfw-turnaround\"></span>\n      <span class=\"wpfw-askus\">Questions about a listing? Email\n        <a href=\"mailto:socialjustice@wpfw.org\">socialjustice@wpfw.org</a>.</span>\n    </div>\n\n    <p class=\"wpfw-remembered\" id=\"wpfw-invited\" hidden></p>\n\n    <p class=\"wpfw-remembered\" id=\"wpfw-remembered\" hidden>\n      Your group's details are filled in from last time, saved in this browser only.\n      <a href=\"#\" id=\"wpfw-forget\">Not you? Clear them.</a>\n    </p>\n\n    <div class=\"wpfw-nope\" id=\"wpfw-not-accepted-box\">\n      <strong>What we cannot list.</strong>\n      <span id=\"wpfw-not-accepted\"></span>\n    </div>\n\n    <div class=\"wpfw-summary\" id=\"wpfw-summary\" role=\"alert\" tabindex=\"-1\">\n      <h3 id=\"wpfw-summary-title\">Please fix the following</h3>\n      <ol id=\"wpfw-summary-list\"></ol>\n    </div>\n\n    <form id=\"wpfw-form\" novalidate>\n\n      <fieldset>\n        <legend>About the event</legend>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-title\">Event title <span class=\"wpfw-req\" aria-hidden=\"true\">*</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-title\"></span></label>\n          <input type=\"text\" id=\"wpfw-title\" name=\"title\" required maxlength=\"90\"\n                 autocomplete=\"off\" aria-describedby=\"wpfw-err-title\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-title\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-organization\">Presenting organization or individual\n            <span class=\"wpfw-req\" aria-hidden=\"true\">*</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-organization\"></span></label>\n          <input type=\"text\" id=\"wpfw-organization\" name=\"organization\" required maxlength=\"120\"\n                 aria-describedby=\"wpfw-hint-organization wpfw-err-organization\">\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-organization\">Who is putting this on. This appears on the listing.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-organization\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <fieldset class=\"wpfw-choices\" aria-describedby=\"wpfw-hint-tags wpfw-err-tags\">\n            <legend class=\"wpfw-legend-inline\">Tags <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></legend>\n            <p class=\"wpfw-hint\" id=\"wpfw-hint-tags\">Choose the issues your event is about. This is how\n              people find it on the calendar.</p>\n            <div class=\"wpfw-taggrid\" id=\"wpfw-taggrid\"></div>\n            <p class=\"wpfw-tagcount\" id=\"wpfw-tagcount\" role=\"status\" aria-live=\"polite\"></p>\n          </fieldset>\n          <p class=\"wpfw-err\" id=\"wpfw-err-tags\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-short_description\">Short description\n            <span class=\"wpfw-req\" aria-hidden=\"true\">*</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-short_description\"></span></label>\n          <textarea id=\"wpfw-short_description\" name=\"short_description\" required maxlength=\"400\"\n                    aria-describedby=\"wpfw-hint-short wpfw-err-short_description\"></textarea>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-short\">This is what shows on the calendar. Plain, factual\n            description of what happens. No promotional language.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-short_description\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-full_description\">Full description\n            <span class=\"wpfw-optional\">(optional)</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-full_description\"></span></label>\n          <textarea id=\"wpfw-full_description\" name=\"full_description\" maxlength=\"2000\"\n                    aria-describedby=\"wpfw-hint-full wpfw-err-full_description\"></textarea>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-full\">Shown on the event's own page. Performers, schedule,\n            parking, anything a visitor would want to know.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-full_description\"></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Date and time</legend>\n\n        <div class=\"wpfw-row\">\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-start_date\">Start date <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n            <input type=\"date\" id=\"wpfw-start_date\" name=\"start_date\" required\n                   aria-describedby=\"wpfw-err-start_datetime\">\n          </div>\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-start_time\">Start time <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n            <input type=\"time\" id=\"wpfw-start_time\" name=\"start_time\" required\n                   aria-describedby=\"wpfw-err-start_datetime\">\n          </div>\n        </div>\n        <p class=\"wpfw-err\" id=\"wpfw-err-start_datetime\"></p>\n\n        <div class=\"wpfw-row\">\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-end_date\">End date <span class=\"wpfw-optional\">(optional)</span></label>\n            <input type=\"date\" id=\"wpfw-end_date\" name=\"end_date\"\n                   aria-describedby=\"wpfw-hint-end wpfw-err-end_datetime\">\n          </div>\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-end_time\">End time <span class=\"wpfw-optional\">(optional)</span></label>\n            <input type=\"time\" id=\"wpfw-end_time\" name=\"end_time\"\n                   aria-describedby=\"wpfw-hint-end wpfw-err-end_datetime\">\n          </div>\n        </div>\n        <p class=\"wpfw-hint\" id=\"wpfw-hint-end\">Leave these blank if the event has no set\n          finishing time. The listing will show when it starts and stay up for that whole day.</p>\n        <p class=\"wpfw-err\" id=\"wpfw-err-end_datetime\"></p>\n        <p class=\"wpfw-hint\" id=\"wpfw-hint-tz\">All times are Eastern.\n          <span id=\"wpfw-window-note\"></span></p>\n\n        <div class=\"wpfw-field\">\n          <div class=\"wpfw-choice\">\n            <input type=\"checkbox\" id=\"wpfw-all_day\" name=\"all_day\">\n            <label for=\"wpfw-all_day\">This is an all-day event</label>\n          </div>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-repeat_rule\">Repeats</label>\n          <select id=\"wpfw-repeat_rule\" name=\"repeat_rule\">\n            <option value=\"none\">Single occurrence</option>\n            <option value=\"weekly\">Weekly, through an end date</option>\n          </select>\n        </div>\n\n        <div class=\"wpfw-field\" id=\"wpfw-repeat-until-field\" hidden>\n          <label for=\"wpfw-repeat_until\">Repeat through <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n          <input type=\"date\" id=\"wpfw-repeat_until\" name=\"repeat_until\"\n                 aria-describedby=\"wpfw-err-repeat_until\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-repeat_until\"></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Where</legend>\n        <p class=\"wpfw-hint\" style=\"margin-bottom:14px;\">Give a venue, an online link, or both for a\n          hybrid event.</p>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-venue_name\">Venue name <span class=\"wpfw-count\" id=\"wpfw-count-venue_name\"></span></label>\n          <input type=\"text\" id=\"wpfw-venue_name\" name=\"venue_name\" maxlength=\"120\"\n                 aria-describedby=\"wpfw-err-venue_name\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-venue_name\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-street_address\">Street address</label>\n          <input type=\"text\" id=\"wpfw-street_address\" name=\"street_address\" maxlength=\"120\"\n                 autocomplete=\"street-address\">\n        </div>\n\n        <div class=\"wpfw-row\">\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-city\">City</label>\n            <input type=\"text\" id=\"wpfw-city\" name=\"city\" maxlength=\"60\" autocomplete=\"address-level2\">\n          </div>\n          <div class=\"wpfw-field narrow\">\n            <label for=\"wpfw-state\">State</label>\n            <select id=\"wpfw-state\" name=\"state\" autocomplete=\"address-level1\"></select>\n          </div>\n          <div class=\"wpfw-field narrow\">\n            <label for=\"wpfw-zip\">ZIP</label>\n            <input type=\"text\" id=\"wpfw-zip\" name=\"zip\" maxlength=\"10\" inputmode=\"numeric\"\n                   autocomplete=\"postal-code\">\n          </div>\n        </div>\n\n        <div class=\"wpfw-field\">\n        <div class=\"wpfw-field\">\n          <span class=\"wpfw-grouplabel\" id=\"wpfw-label-mode\">How can people take part?\n            <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></span>\n          <div class=\"wpfw-modes\" id=\"wpfw-modes\" role=\"radiogroup\"\n               aria-labelledby=\"wpfw-label-mode\" aria-describedby=\"wpfw-err-attendance_mode\"></div>\n          <p class=\"wpfw-err\" id=\"wpfw-err-attendance_mode\"></p>\n        </div>\n\n          <label for=\"wpfw-online_url\">Registration link <span class=\"wpfw-optional\">(optional)</span></label>\n          <input type=\"url\" id=\"wpfw-online_url\" name=\"online_url\" maxlength=\"300\"\n                 placeholder=\"https://\" aria-describedby=\"wpfw-hint-online wpfw-err-online_url\">\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-online\">Where people sign up, or the joining link\n            for an online event. Leave it blank if there is nothing to sign up for.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-online_url\"></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Cost and links</legend>\n\n        <div class=\"wpfw-field\">\n          <fieldset class=\"wpfw-choices\" aria-describedby=\"wpfw-err-cost_type\">\n            <legend class=\"wpfw-legend-inline\">Cost <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></legend>\n            <div class=\"wpfw-choice\">\n              <input type=\"radio\" id=\"wpfw-cost-free\" name=\"cost_type\" value=\"free\">\n              <label for=\"wpfw-cost-free\">Free</label>\n            </div>\n            <div class=\"wpfw-choice\">\n              <input type=\"radio\" id=\"wpfw-cost-ticketed\" name=\"cost_type\" value=\"ticketed\">\n              <label for=\"wpfw-cost-ticketed\">Ticketed</label>\n            </div>\n            <div class=\"wpfw-choice\">\n              <input type=\"radio\" id=\"wpfw-cost-donation\" name=\"cost_type\" value=\"donation\">\n              <label for=\"wpfw-cost-donation\">Suggested donation</label>\n            </div>\n          </fieldset>\n          <p class=\"wpfw-err\" id=\"wpfw-err-cost_type\"></p>\n        </div>\n\n        <div class=\"wpfw-field\" id=\"wpfw-cost-amount-field\" hidden>\n          <label for=\"wpfw-cost_amount\">Price or suggested amount\n            <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n          <input type=\"text\" id=\"wpfw-cost_amount\" name=\"cost_amount\" maxlength=\"40\"\n                 placeholder=\"$15, or $10 to $25\" aria-describedby=\"wpfw-hint-cost wpfw-err-cost_amount\">\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-cost\">Give the plain price. Please do not frame it as a deal\n            or a limited offer.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-cost_amount\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-ticket_url\">Ticket or information link</label>\n          <input type=\"url\" id=\"wpfw-ticket_url\" name=\"ticket_url\" maxlength=\"300\"\n                 placeholder=\"https://\" aria-describedby=\"wpfw-err-ticket_url\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-ticket_url\"></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Image</legend>\n\n        <div class=\"wpfw-field\" id=\"wpfw-upload-field\">\n          <label for=\"wpfw-image_file\">Event picture <span class=\"wpfw-optional\">(optional)</span></label>\n\n          <div class=\"wpfw-drop\" id=\"wpfw-drop\">\n            <input type=\"file\" id=\"wpfw-image_file\" accept=\"image/jpeg,image/png,image/webp\"\n                   aria-describedby=\"wpfw-hint-upload wpfw-err-image_file\">\n            <label class=\"wpfw-drop-btn\" for=\"wpfw-image_file\">Choose a picture</label>\n            <span class=\"wpfw-drop-or\">or drag one here</span>\n          </div>\n\n          <div class=\"wpfw-shot\" id=\"wpfw-shot\" hidden>\n            <img id=\"wpfw-shot-img\" alt=\"\">\n            <div class=\"wpfw-shot-meta\">\n              <strong id=\"wpfw-shot-name\">&nbsp;</strong>\n              <span id=\"wpfw-shot-size\"></span>\n              <div class=\"wpfw-bar-track\" id=\"wpfw-shot-track\" hidden>\n                <div class=\"wpfw-bar-fill\" id=\"wpfw-shot-fill\"></div>\n              </div>\n              <p class=\"wpfw-shot-state\" id=\"wpfw-shot-state\" role=\"status\" aria-live=\"polite\"></p>\n            </div>\n            <button type=\"button\" class=\"wpfw-shot-x\" id=\"wpfw-shot-remove\">Remove</button>\n          </div>\n\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-upload\">JPEG or PNG. Your browser shrinks it before\n            sending, so a photo straight off a phone is fine.</p>\n          <p class=\"wpfw-err\" id=\"wpfw-err-image_file\"></p>\n        </div>\n\n        <details class=\"wpfw-orlink\" id=\"wpfw-orlink\">\n          <summary>Or paste a link to a picture already online</summary>\n          <div class=\"wpfw-field\">\n            <label for=\"wpfw-image_url\">Event image link</label>\n            <input type=\"url\" id=\"wpfw-image_url\" name=\"image_url\" maxlength=\"300\"\n                   placeholder=\"https://\" aria-describedby=\"wpfw-hint-image wpfw-err-image_url\">\n            <p class=\"wpfw-hint\" id=\"wpfw-hint-image\">It has to point straight at the picture file.\n              Some sites, Eventbrite and Facebook among them, block other sites from loading their\n              images &mdash; those links will not show up. Uploading is more reliable.</p>\n            <p class=\"wpfw-err\" id=\"wpfw-err-image_url\"></p>\n          </div>\n        </details>\n        <div class=\"wpfw-field\">\n          <div class=\"wpfw-choice\">\n            <input type=\"checkbox\" id=\"wpfw-image_rights_ok\" name=\"image_rights_ok\"\n                   aria-describedby=\"wpfw-err-image_rights_ok\">\n            <label for=\"wpfw-image_rights_ok\">I have the right to share this picture and to let WPFW\n              display it on our calendar.</label>\n          </div>\n          <p class=\"wpfw-err\" id=\"wpfw-err-image_rights_ok\"></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Getting in touch</legend>\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-public_contact\">Contact shown on the listing\n            <span class=\"wpfw-optional\">(optional)</span></label>\n          <input type=\"text\" id=\"wpfw-public_contact\" name=\"public_contact\" maxlength=\"200\"\n                 placeholder=\"hello@yourgroup.org\" aria-describedby=\"wpfw-hint-pubcontact\">\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-pubcontact\">An email address, phone number or link\n            that <strong>anyone can see</strong>, so people can ask you questions. Leave it blank\n            and nothing is shown. This is separate from your own details below, which stay\n            internal.</p>\n        </div>\n        <div class=\"wpfw-field\">\n          <div class=\"wpfw-choice\" id=\"wpfw-joinrow\" hidden>\n            <input type=\"checkbox\" id=\"wpfw-join_list\" name=\"join_list\">\n            <label for=\"wpfw-join_list\" id=\"wpfw-join-label\">Send me the weekly roundup of\n              justice events in the District.</label>\n          </div>\n          <p class=\"wpfw-hint\" id=\"wpfw-join-hint\" hidden>Separate from this submission. Every\n            email has a one-click unsubscribe.</p>\n        </div>\n        <p class=\"wpfw-onairnote\" id=\"wpfw-onair-note\"></p>\n      </fieldset>\n\n      <fieldset>\n        <legend>Access</legend>\n\n        <div class=\"wpfw-field\">\n          <span class=\"wpfw-grouplabel\" id=\"wpfw-label-access\">What is true of this event?\n            <span class=\"wpfw-optional\">(check everything that applies)</span></span>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-accessgrid\">These show on the listing, so people can\n            tell before they set out whether they can get in and take part.</p>\n          <div class=\"wpfw-accessgrid\" id=\"wpfw-accessgrid\"\n               role=\"group\" aria-labelledby=\"wpfw-label-access\"></div>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-accessibility_notes\">Anything else about access\n            <span class=\"wpfw-optional\">(optional)</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-accessibility_notes\"></span></label>\n          <textarea id=\"wpfw-accessibility_notes\" name=\"accessibility_notes\" maxlength=\"300\"\n                    aria-describedby=\"wpfw-hint-access\"></textarea>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-access\">Anything the checkboxes do not cover &mdash;\n            how to find the accessible entrance, who to contact about an access need, a request\n            to let you know in advance.</p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>Support</legend>\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-funders\">Sponsors you would like credited\n            <span class=\"wpfw-optional\">(optional)</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-funders\"></span></label>\n          <textarea id=\"wpfw-funders\" name=\"funders\" maxlength=\"300\"\n                    aria-describedby=\"wpfw-hint-funders\"></textarea>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-funders\">Who funds this event or your organization.\n            <strong>These names appear on the event posting,</strong> so write them the way you\n            want them read.</p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-cosponsors\">Co-sponsoring organizations\n            <span class=\"wpfw-optional\">(optional)</span>\n            <span class=\"wpfw-count\" id=\"wpfw-count-cosponsors\"></span></label>\n          <textarea id=\"wpfw-cosponsors\" name=\"cosponsors\" maxlength=\"300\"\n                    aria-describedby=\"wpfw-hint-cosponsors\"></textarea>\n          <p class=\"wpfw-hint\" id=\"wpfw-hint-cosponsors\">Anyone putting this event on with you.\n            One submission can name every organization behind it, so list them all, separated by\n            commas. <strong>These names appear on the event posting too.</strong></p>\n        </div>\n      </fieldset>\n\n      <fieldset>\n        <legend>About you</legend>\n        <p class=\"wpfw-hint\" style=\"margin-bottom:14px;\">So we can reach you with questions.\n          <strong>Your name, email and phone are never published.</strong></p>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-submitter_name\">Your name <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n          <input type=\"text\" id=\"wpfw-submitter_name\" name=\"submitter_name\" required maxlength=\"80\"\n                 autocomplete=\"name\" aria-describedby=\"wpfw-err-submitter_name\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-submitter_name\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-submitter_email\">Your email <span class=\"wpfw-req\" aria-hidden=\"true\">*</span></label>\n          <input type=\"email\" id=\"wpfw-submitter_email\" name=\"submitter_email\" required maxlength=\"100\"\n                 autocomplete=\"email\" aria-describedby=\"wpfw-err-submitter_email\">\n          <p class=\"wpfw-err\" id=\"wpfw-err-submitter_email\"></p>\n        </div>\n\n        <div class=\"wpfw-field\">\n          <label for=\"wpfw-submitter_phone\">Your phone <span class=\"wpfw-optional\">(optional)</span></label>\n          <input type=\"tel\" id=\"wpfw-submitter_phone\" name=\"submitter_phone\" maxlength=\"25\"\n                 autocomplete=\"tel\">\n        </div>\n      </fieldset>\n\n      \n      <div class=\"wpfw-hp\" aria-hidden=\"true\">\n        <label for=\"wpfw-website\">Leave this field empty</label>\n        <input type=\"text\" id=\"wpfw-website\" name=\"website\" tabindex=\"-1\" autocomplete=\"off\">\n        <label for=\"wpfw-fax\">Leave this field empty too</label>\n        <input type=\"text\" id=\"wpfw-fax\" name=\"fax\" tabindex=\"-1\" autocomplete=\"off\">\n      </div>\n\n      <div class=\"wpfw-consent\">\n        <div class=\"wpfw-choice\">\n          <input type=\"checkbox\" id=\"wpfw-consent\" name=\"consent\" required\n                 aria-describedby=\"wpfw-err-consent\">\n          <label for=\"wpfw-consent\">\n            I confirm this information is accurate, that WPFW may edit this listing for length and\n            style, and that a listing on the WPFW community calendar is not an endorsement of my\n            event or my organization. <span class=\"wpfw-req\" aria-hidden=\"true\">*</span>\n          </label>\n        </div>\n        <p class=\"wpfw-err\" id=\"wpfw-err-consent\"></p>\n      </div>\n\n      <div class=\"wpfw-meter\" id=\"wpfw-meter\" hidden>\n        <div class=\"wpfw-meter-bar\"><div class=\"wpfw-meter-fill\" id=\"wpfw-meter-fill\"></div></div>\n        <span id=\"wpfw-meter-text\"></span>\n      </div>\n\n      <button type=\"submit\" class=\"wpfw-submit\" id=\"wpfw-submit\">Submit this event</button>\n      <p class=\"wpfw-live\" id=\"wpfw-live\" role=\"status\" aria-live=\"polite\"></p>\n    </form>\n\n    <p class=\"wpfw-disclaimer\" id=\"wpfw-form-disclaimer\"></p>\n  </div>\n\n  <div class=\"wpfw-confirm\" id=\"wpfw-confirm\" tabindex=\"-1\">\n    <div class=\"wpfw-panel\">\n      <span class=\"wpfw-tag\">Received</span>\n      <h2 style=\"margin-top:14px;\">Thank you. Your event is with our moderator.</h2>\n      <p id=\"wpfw-confirm-body\"></p>\n      <p>Your reference number is <span class=\"wpfw-ref\" id=\"wpfw-confirm-ref\"></span>. Please keep it\n        if you need to write to us about this submission.</p>\n      <p id=\"wpfw-confirm-turnaround\"></p>\n      <p>We have emailed a copy to the address you gave us. If it does not arrive within a few minutes,\n        check your spam folder.</p>\n      <p style=\"margin-bottom:0;\">\n        <a href=\"#\" id=\"wpfw-another\">Submit another event</a>\n      </p>\n    </div>\n    <p class=\"wpfw-disclaimer\" id=\"wpfw-confirm-disclaimer\"></p>\n  </div>\n\n</div>",
    calendar: "<div class=\"wpfw-ev wpfw-cal\" id=\"wpfw-cal-root\">\n\n  <div id=\"wpfw-cal-browse\">\n\n    <header class=\"wpfw-masthead\">\n      <p class=\"wpfw-lockup\">\n        <span>WPFW 89.3&nbsp;FM</span><span class=\"amp\">&amp;</span><span><a\n          href=\"https://diversecityfund.org\" target=\"_blank\" rel=\"noopener noreferrer\">Diverse City Fund</a></span>\n      </p>\n\n      <div class=\"wpfw-headgrid\">\n       <div class=\"wpfw-headname\">\n        <h2 class=\"wpfw-cal-title\">Social Justice Calendar</h2>\n        <div class=\"wpfw-rule-gold\" aria-hidden=\"true\"></div>\n       </div>\n\n       <div class=\"wpfw-blurb\">\n        <p class=\"lede\">Across the District, people are organizing tenants, feeding neighbors,\n          teaching history, and making art that tells the truth. This calendar is where to\n          find them.</p>\n        <p class=\"wpfw-purpose\" id=\"wpfw-purpose\"></p>\n        <p class=\"wpfw-onairpitch\" id=\"wpfw-onairpitch\" hidden>\n          <span class=\"wpfw-onairtag\" aria-hidden=\"true\">On air</span>\n          <span id=\"wpfw-onairpitch-text\"></span>\n        </p>\n        <details class=\"wpfw-about\">\n        <summary>About this partnership</summary>\n        <p class=\"body\">It is a partnership between <strong>WPFW 89.3&nbsp;FM</strong>, the\n          listener-supported station that has carried movement voices on the air for decades,\n          and the <strong><a href=\"https://diversecityfund.org\" target=\"_blank\" rel=\"noopener noreferrer\">Diverse City\n          Fund</a></strong>, a community-led grantmaking organization that has put money behind\n          Black, Brown and Indigenous-led projects across the District since 2011.</p>\n        <p class=\"body\">Every listing is sent in by the community and read by a person before it\n          appears. Listing is free and cannot be bought &mdash; so what you see here is what is\n          actually happening, not what someone paid to put in front of you.</p>\n        </details>\n       </div>\n      </div>\n    </header>\n\n   <div class=\"wpfw-layout\">\n    <aside class=\"wpfw-rail\">\n\n      <p class=\"wpfw-masthead-cta\">\n        <a class=\"wpfw-cta-btn\" id=\"wpfw-submit-link\" href=\"/submit-justice-event\">Submit an event</a>\n      </p>\n\n      <p class=\"wpfw-embedlink\">\n        <a href=\"#\" id=\"wpfw-embed-open\">Put this calendar on your site</a>\n      </p>\n\n      <details class=\"wpfw-subscribe\" id=\"wpfw-subscribe\">\n        <summary>Subscribe to this calendar</summary>\n        <p class=\"wpfw-sub-note\" id=\"wpfw-sub-note\">New listings appear in your own calendar\n          automatically.</p>\n        <a class=\"wpfw-sub-link\" id=\"wpfw-sub-google\" href=\"#\" target=\"_blank\"\n           rel=\"noopener noreferrer\">Add to Google Calendar</a>\n        <a class=\"wpfw-sub-link\" id=\"wpfw-sub-apple\" href=\"#\">Add to Apple Calendar or Outlook</a>\n        <a class=\"wpfw-sub-link\" id=\"wpfw-sub-download\" href=\"#\">Download a one-off .ics file</a>\n        <button type=\"button\" class=\"wpfw-sub-copy\" id=\"wpfw-sub-copy\">Copy the feed address</button>\n        <span class=\"wpfw-sub-said\" id=\"wpfw-sub-said\" role=\"status\" aria-live=\"polite\"></span>\n      </details>\n\n    <div class=\"wpfw-bar\">\n      <p class=\"wpfw-railhead\">Show</p>\n      <div class=\"wpfw-views\" role=\"group\" aria-label=\"Calendar view\">\n        <button type=\"button\" id=\"wpfw-view-list\" aria-pressed=\"true\">List</button>\n        <button type=\"button\" id=\"wpfw-view-month\" aria-pressed=\"false\">Month</button>\n      </div>\n      <div class=\"wpfw-views\" role=\"group\" aria-label=\"Time\">\n        <button type=\"button\" id=\"wpfw-when-upcoming\" aria-pressed=\"true\">Upcoming</button>\n        <button type=\"button\" id=\"wpfw-when-past\" aria-pressed=\"false\">Past</button>\n      </div>\n      <div class=\"wpfw-cal-count\" id=\"wpfw-cal-count\" aria-hidden=\"true\"></div>\n    </div>\n\n    <p class=\"wpfw-railhead\" id=\"wpfw-filterhead\">Filter by issue</p>\n    <div class=\"wpfw-filters\" role=\"group\" aria-labelledby=\"wpfw-filterhead\" id=\"wpfw-filters\"></div>\n\n    <p class=\"wpfw-railhead\" id=\"wpfw-fromhead\" hidden>From</p>\n    <div class=\"wpfw-dcfrow\" id=\"wpfw-dcfrow\" role=\"group\" aria-labelledby=\"wpfw-fromhead\" hidden>\n      \n      <button type=\"button\" id=\"wpfw-from-all\" aria-pressed=\"true\">All events</button>\n      <button type=\"button\" id=\"wpfw-dcf-toggle\" aria-pressed=\"false\">\n        <span id=\"wpfw-dcf-toggle-label\">Diverse City Fund</span>\n      </button>\n      <button type=\"button\" id=\"wpfw-station-toggle\" aria-pressed=\"false\" hidden>\n        <span id=\"wpfw-station-toggle-label\">WPFW station events</span>\n      </button>\n      <span class=\"wpfw-dcfnote\" id=\"wpfw-dcf-note\"></span>\n    </div>\n\n    </aside>\n\n    <div class=\"wpfw-main\">\n\n    <p class=\"wpfw-cal-status\" id=\"wpfw-cal-status\" role=\"status\" aria-live=\"polite\">\n      <span class=\"wpfw-spinner\" aria-hidden=\"true\"></span> Loading events...\n    </p>\n\n    <div id=\"wpfw-cal-list\" hidden></div>\n\n    <div id=\"wpfw-cal-month\" hidden>\n      <div class=\"wpfw-monthnav\">\n        <button type=\"button\" id=\"wpfw-prev\">&larr; Previous</button>\n        <h3 id=\"wpfw-monthlabel\">&nbsp;</h3>\n        <button type=\"button\" id=\"wpfw-next\">Next &rarr;</button>\n      </div>\n      <div id=\"wpfw-gridhost\"></div>\n      <div class=\"wpfw-daypanel\" id=\"wpfw-daypanel\" hidden></div>\n    </div>\n\n    </div>\n   </div>\n  </div>\n\n  <div class=\"wpfw-detail\" id=\"wpfw-cal-detail\" hidden tabindex=\"-1\"></div>\n\n  <div class=\"wpfw-modal\" id=\"wpfw-embed-modal\" hidden>\n    <div class=\"wpfw-modal-box\" role=\"dialog\" aria-modal=\"true\"\n         aria-labelledby=\"wpfw-embed-title\" tabindex=\"-1\" id=\"wpfw-embed-box\">\n      <button type=\"button\" class=\"wpfw-modal-x\" id=\"wpfw-embed-close\"\n              aria-label=\"Close\">&times;</button>\n      <h3 id=\"wpfw-embed-title\">Put this calendar on your site</h3>\n      <p class=\"wpfw-modal-lede\">Paste two lines into your own web page and these events\n        appear there, staying up to date on their own. Free, and nothing to maintain.</p>\n\n      <div class=\"wpfw-embed-opts\">\n        <label for=\"wpfw-embed-what\">Show</label>\n        <select id=\"wpfw-embed-what\">\n          <option value=\"\">Everything on the calendar</option>\n          <option value=\"dcf\">Diverse City Fund events only</option>\n          <option value=\"station\">WPFW station events only</option>\n        </select>\n\n        <label for=\"wpfw-embed-tag\">Issue</label>\n        <select id=\"wpfw-embed-tag\"><option value=\"\">Any issue</option></select>\n\n        <label for=\"wpfw-embed-n\">How many</label>\n        <select id=\"wpfw-embed-n\">\n          <option>3</option><option selected>5</option><option>8</option><option>12</option>\n        </select>\n      </div>\n\n      <label class=\"wpfw-embed-lbl\" for=\"wpfw-embed-code\">Paste this into your page</label>\n      <textarea id=\"wpfw-embed-code\" readonly spellcheck=\"false\" wrap=\"off\"></textarea>\n\n      <p class=\"wpfw-modal-actions\">\n        <button type=\"button\" class=\"wpfw-embed-copy\" id=\"wpfw-embed-copy\">Copy</button>\n        <span class=\"wpfw-embed-said\" id=\"wpfw-embed-said\" role=\"status\" aria-live=\"polite\"></span>\n      </p>\n      <p class=\"wpfw-modal-note\">In WordPress use a <strong>Custom HTML</strong> block. In\n        Squarespace use a <strong>Code</strong> block. Anywhere else, paste it where the\n        events should appear.</p>\n    </div>\n  </div>\n\n  <div class=\"wpfw-modal\" id=\"wpfw-org-modal\" hidden>\n    <div class=\"wpfw-modal-box\" role=\"dialog\" aria-modal=\"true\"\n         aria-labelledby=\"wpfw-org-title\" tabindex=\"-1\" id=\"wpfw-org-box\">\n      <button type=\"button\" class=\"wpfw-modal-x\" id=\"wpfw-org-close\"\n              aria-label=\"Close\">&times;</button>\n      <div id=\"wpfw-org-body\"></div>\n    </div>\n  </div>\n\n  <p class=\"wpfw-disclaimer\" id=\"wpfw-cal-disclaimer\"></p>\n</div>",
    upcoming: "<div class=\"wpfw-up\" id=\"wpfw-up-root\">\n  <div class=\"wpfw-up-head\">\n    <h2>Social Justice Calendar</h2>\n    <a href=\"/social-justice-calendar\">See the full calendar &rarr;</a>\n  </div>\n  <p class=\"wpfw-up-load\" id=\"wpfw-up-load\">Loading events&hellip;</p>\n  <ul class=\"wpfw-up-list\" id=\"wpfw-up-list\"></ul>\n  <p class=\"wpfw-up-note\">A partnership of WPFW 89.3&nbsp;FM and the\n    <a href=\"https://diversecityfund.org\" target=\"_blank\" rel=\"noopener noreferrer\">Diverse City Fund</a>.\n    Listings are free and are not endorsements.</p>\n</div>",
    station: "<div class=\"wpfw-se\" id=\"wpfw-se-root\">\n\n  <header class=\"wpfw-se-top\">\n    <p class=\"wpfw-se-eyebrow\">WPFW 89.3&nbsp;FM</p>\n    <h1>Station events</h1>\n    <div class=\"wpfw-se-rule\" aria-hidden=\"true\"></div>\n    <p class=\"wpfw-se-blurb\">Meetings, benefits, screenings, and everything else the station is\n      putting on. Come find us.</p>\n    <p class=\"wpfw-se-sub\">These also appear on the\n      <a href=\"/social-justice-calendar\">Social Justice Calendar</a>, our partnership with the\n      Diverse City Fund, alongside events from across the District.</p>\n    <p class=\"wpfw-se-subscribe\" id=\"wpfw-se-subscribe\" hidden>\n      Put these in your own calendar:\n      <a id=\"wpfw-se-gcal\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">Google Calendar</a>\n      <span aria-hidden=\"true\">\u00b7</span>\n      <a id=\"wpfw-se-webcal\" href=\"#\">Apple or Outlook</a>\n    </p>\n  </header>\n\n  <div class=\"wpfw-se-more\">\n    <p class=\"wpfw-se-more-h\">More live music across the District</p>\n    <div class=\"wpfw-se-more-row\">\n      <a href=\"https://www.capitalbop.com/dcjazzcalendar/\"\n         target=\"_blank\" rel=\"noopener noreferrer\">CapitalBop&rsquo;s DC Jazz Calendar</a>\n      <a href=\"https://bluesandrootsmusic.com/calendar/blues-shows/\"\n         target=\"_blank\" rel=\"noopener noreferrer\">Blues and Roots Calendar</a>\n    </div>\n  </div>\n\n  <p class=\"wpfw-se-status\" id=\"wpfw-se-status\">\n    <span class=\"wpfw-se-spin\" aria-hidden=\"true\"></span>Loading station events...\n  </p>\n\n  <div id=\"wpfw-se-out\"></div>\n\n  <p class=\"wpfw-se-foot\" id=\"wpfw-se-foot\"></p>\n</div>",
  };

  /* Each sheet goes in once however many mounts ask for it, and @import stays the
     first thing in its own element, which is the only place a browser honours it. */
  var added = {};
  function addStyle(name) {
    if (added[name] || !STYLES[name]) return;
    added[name] = true;
    var el = document.createElement('style');
    el.setAttribute('data-wpfw-style', name);
    el.textContent = STYLES[name];
    (document.head || document.documentElement).appendChild(el);
  }

  /* --- the blocks' own code, lifted whole and run on demand --- */
  function bootCore() {

window.WPFW_EVENTS = window.WPFW_EVENTS || (function () {
  'use strict';

  var CFG = {
    /* ------------------------------------------------------------------
       PASTE YOUR DEPLOYED WEB APP URL HERE.
       It must be the /exec URL, never the /dev URL — /dev only works for
       signed-in editors and would break the page for every visitor.
       On this Workspace the URL contains /a/macros/wpfw.org/ :
       ------------------------------------------------------------------ */
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbziSAARkKzFdt9G-aVaiEzDNpUzBaK7Oa4pNhwECBHvV5VeonKYOWo3yWNSbaMY0wuW/exec',

    /* ------------------------------------------------------------------
       The published feed. Visitors read this instead of calling Google
       directly: a CDN file cannot be blocked by a privacy extension the way
       a script tag to script.google.com can, and it has no Apps Script quota
       behind it. Leave it empty and everything falls back to the old path.
       Paste the GitHub Pages address of events.json, e.g.
         https://wpfw.github.io/calendar-feed/events.json
       ------------------------------------------------------------------ */
    STATIC_FEED: 'https://wpfwgm.github.io/wpfw-calendar-feed/events.json',

    /* ------------------------------------------------------------------
       The past view reads its own published file, because an event is in
       exactly one of the two lists and they are sorted opposite ways.
       Leave this EMPTY and it is worked out from STATIC_FEED above --
       events.json becomes events-past.json, which is what the Sheet
       publishes by default. Set it only if GITHUB_PATH_PAST was changed.
       If the file is not there the past view falls back to the web app,
       exactly as it did before, so an empty line here breaks nothing.
       ------------------------------------------------------------------ */
    STATIC_FEED_PAST: '',

    TZ: 'America/New_York',
    TIMEOUT_MS: 35000,      /* a cold Apps Script can take 30s; below that we retry, not fail */
    SINGLE_SHOT_MAX: 6500,  /* above this the submission is sent in parts */
    CHUNK_MAX: 4000,
    CALENDAR_PATH: '/social-justice-calendar',
    SUBMIT_PATH: '/submit-justice-event'
  };

  // Trailing whitespace on a pasted URL is common and otherwise breaks every request.
  CFG.ENDPOINT = String(CFG.ENDPOINT || '').trim();
  CFG.STATIC_FEED = String(CFG.STATIC_FEED || '').trim();
  CFG.STATIC_FEED_PAST = String(CFG.STATIC_FEED_PAST || '').trim();

  /* Mirrors ghPathPast_() in 18_Publish.gs. If that naming changes, change it here. */
  if (!CFG.STATIC_FEED_PAST && CFG.STATIC_FEED) {
    CFG.STATIC_FEED_PAST = /\.json$/i.test(CFG.STATIC_FEED)
      ? CFG.STATIC_FEED.replace(/\.json$/i, '-past.json')
      : CFG.STATIC_FEED + '-past.json';
  }

  var seq = 0;

  /** The request URL. Pass an empty callback name to ask for no JSONP wrapper. */
  function buildUrl_(params, callbackName) {
    var qs = callbackName ? ['callback=' + callbackName] : [];
    for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k)) continue;
      var v = params[k];
      if (v === undefined || v === null) continue;
      qs.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return CFG.ENDPOINT + '?' + qs.join('&');
  }

  /**
   * The web app answers every action by writing `someCallback({...});` -- there is no
   * raw-JSON mode -- so a plain fetch has to take the wrapper off itself. With no
   * callback= parameter the server falls back to the name `wpfwCallback`.
   */
  function unwrapJsonp_(text) {
    var s = String(text || '').trim();
    var a = s.indexOf('('), b = s.lastIndexOf(')');
    if (a < 0 || b <= a) throw new Error('not a jsonp payload');
    return JSON.parse(s.slice(a + 1, b));
  }

  /* Actions that only read. Anything not listed here writes something, so it is
     never replayed down a second transport after the first one has gone quiet. */
  var READ_ONLY = { formtoken: 1, feed: 1, event: 1, ping: 1, notifycount: 1 };

  /**
   * Cross-origin fetch, deliberately WITHOUT credentials. This is the whole fix for
   * "we could not reach the calendar server".
   *
   * A <script> tag sends cookies. For anyone signed into more than one Google account,
   * script.google.com answers a cookie-bearing request to /macros/s/.../exec with a 503
   * and a redirect to /macros/u/<n>/s/.../exec -- account routing a script tag cannot
   * follow. The tag fires onerror, every retry does the same, and the page reports the
   * server as unreachable while the server is in fact healthy. Sending no cookies skips
   * the account routing entirely.
   *
   * The old comment here said /exec 302s somewhere CORS headers cannot be set. That is
   * not so: the script.googleusercontent.com echo response does carry
   * Access-Control-Allow-Origin, so this response is readable. Verified against the
   * live deployment from a browser that reproduces the failure.
   *
   * onFail(canRetry) -- canRetry is false once the server may already have acted on the
   * request, so a submission is never sent twice.
   */
  function fetchDirect_(params, onSuccess, onFail) {
    if (typeof window.fetch !== 'function') return false;

    var readOnly = !!READ_ONLY[String((params && params.action) || '')];
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var done = false;

    var timer = setTimeout(function () {
      if (done) return;
      done = true;
      if (ctrl) ctrl.abort();
      onFail(readOnly);
    }, CFG.TIMEOUT_MS);

    var opts = { credentials: 'omit', cache: 'no-store' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(buildUrl_(params, ''), opts)
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.text();
      })
      .then(function (text) {
        if (done) return;
        done = true; clearTimeout(timer);
        var data;
        // The server answered. If its answer is unreadable that is not something a
        // different transport fixes, so only a read is allowed to try again.
        try { data = unwrapJsonp_(text); } catch (err) { onFail(readOnly); return; }
        onSuccess && onSuccess(data);
      })
      .catch(function () {
        if (done) return;
        done = true; clearTimeout(timer);
        onFail(true);   // nothing came back at all, so nothing was acted on
      });

    return true;
  }

  /**
   * The original transport, kept as the fallback for browsers without fetch and for
   * the day Google stops sending CORS headers. It cannot carry the multi-account case.
   */
  function jsonpDirect_(params, onSuccess, onError) {
    var name = 'wpfwJsonp' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
    var script = document.createElement('script');
    var done = false;
    var url = buildUrl_(params, name);

    function cleanup() {
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    var timer = setTimeout(function () {
      if (done) return;
      done = true; cleanup();
      onError && onError({
        error: 'timeout',
        message: 'The server did not answer in time. Please check your connection and try again.'
      });
    }, CFG.TIMEOUT_MS);

    window[name] = function (data) {
      if (done) return;
      done = true; clearTimeout(timer); cleanup();
      onSuccess && onSuccess(data);
    };

    script.onerror = function () {
      if (done) return;
      done = true; clearTimeout(timer); cleanup();
      onError && onError({
        error: 'network',
        message: 'We could not reach the calendar server. Please try again in a moment.'
      });
    };

    script.src = url;
    script.async = true;
    (document.head || document.documentElement).appendChild(script);
    return url.length;
  }

  /**
   * Re-applies server-side feed filters to the published file, so one file can
   * serve the calendar, the station page and the homepage strip. This mirrors
   * handleFeed_ in 04_Feed.gs — if the filters there change, change them here.
   */
  function applyFeedParams_(feed, p) {
    var events = (feed.events || []).slice();

    var tag = String(p.tag || p.category || '').trim().toLowerCase();
    if (tag && tag !== 'all') {
      events = events.filter(function (ev) {
        return (ev.tags || []).some(function (t) { return String(t).toLowerCase() === tag; });
      });
    }
    /* Mirrors handleFeed_: a date window is a question about when, so an undated event
       is not an answer to it. Dropped on purpose, not by invalid-date comparison. */
    var from = p.from ? new Date(p.from) : null;
    if (from && !isNaN(from.getTime())) {
      events = events.filter(function (ev) {
        if (!ev.start_datetime) return false;
        return new Date(ev.end_datetime || ev.start_datetime) >= from;
      });
    }
    var to = p.to ? new Date(p.to) : null;
    if (to && !isNaN(to.getTime())) {
      events = events.filter(function (ev) {
        return !!ev.start_datetime && new Date(ev.start_datetime) <= to;
      });
    }
    if (String(p.dcf || '') === '1') {
      events = events.filter(function (ev) { return ev.dcf_grantee === true; });
    }
    if (String(p.station || '') === '1') {
      events = events.filter(function (ev) { return ev.station_event === true; });
    }
    var limit = parseInt(p.limit, 10);
    if (!isNaN(limit) && limit > 0) events = events.slice(0, limit);

    var out = {};
    for (var k in feed) {
      if (Object.prototype.hasOwnProperty.call(feed, k)) out[k] = feed[k];
    }
    out.events = events;
    out.count = events.length;
    return out;
  }

  /** Read one of the published files. Calls onError so the caller can fall back. */
  function staticFeed_(feedUrl, params, onSuccess, onError) {
    if (typeof window.fetch !== 'function' || !feedUrl) { onError && onError(); return; }

    var url = feedUrl +
      (feedUrl.indexOf('?') < 0 ? '?' : '&') + 'v=' + Math.floor(Date.now() / 60000);

    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
    var opts = { credentials: 'omit', cache: 'default' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(url, opts)
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.json();
      })
      .then(function (feed) {
        clearTimeout(timer);
        if (!feed || !feed.ok || !feed.events) throw new Error('unusable feed');
        onSuccess && onSuccess(applyFeedParams_(feed, params));
      })
      .catch(function () {
        clearTimeout(timer);
        onError && onError();
      });
  }

  /**
   * Feed reads go to the published file first and fall back to the web app. There is
   * one file for upcoming events and one for past, because an event is in exactly one
   * of the two and the two are sorted opposite ways. Everything else — submissions,
   * tokens and single events — goes straight to the web app.
   */
  function jsonp(params, onSuccess, onError) {
    var isFeed = String(params && params.action) === 'feed';
    var wantsPast = String((params && params.past) || '') === '1';
    var file = wantsPast ? CFG.STATIC_FEED_PAST : CFG.STATIC_FEED;
    if (isFeed && file) {
      staticFeed_(file, params, onSuccess, function () {
        request_(params, onSuccess, onError);
      });
      return 0;
    }
    return request_(params, onSuccess, onError);
  }

  /** fetch first, script tag second. */
  function request_(params, onSuccess, onError) {
    var started = fetchDirect_(params, onSuccess, function (canRetry) {
      if (canRetry) { jsonpDirect_(params, onSuccess, onError); return; }
      onError && onError({
        error: 'network',
        message: 'We could not reach the calendar server. Please try again in a moment.'
      });
    });
    if (!started) jsonpDirect_(params, onSuccess, onError);
    return 0;
  }

  /**
   * Subscription URLs. The .ics endpoint is the same web app, so nothing extra has to
   * be configured; only the action changes. webcal:// is the scheme Apple Calendar and
   * Outlook register for, and Google's own subscribe page takes that form too.
   */
  function icsUrl(params) {
    var qs = ['action=ics'];
    for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k)) continue;
      var v = params[k];
      if (v === undefined || v === null || v === '' || v === false) continue;
      qs.push(encodeURIComponent(k) + '=' + encodeURIComponent(v === true ? 1 : v));
    }
    return CFG.ENDPOINT + '?' + qs.join('&');
  }

  function webcalUrl(params) {
    return icsUrl(params).replace(/^https?:/i, 'webcal:');
  }

  function googleCalUrl(params) {
    return 'https://calendar.google.com/calendar/render?cid=' +
      encodeURIComponent(webcalUrl(params));
  }

  /** Length of the URL a given parameter set would produce. Used by the size meter. */
  function measure(params) {
    var n = CFG.ENDPOINT.length + '?callback=wpfwJsonp999999_999999'.length;
    for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k)) continue;
      var v = params[k];
      if (v === undefined || v === null) continue;
      n += 1 + encodeURIComponent(k).length + 1 + encodeURIComponent(String(v)).length;
    }
    return n;
  }

  /* ---------------- formatting ---------------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function d(iso) { var x = new Date(iso); return isNaN(x.getTime()) ? null : x; }

  function fmtDate(iso, opts) {
    var x = d(iso); if (!x) return '';
    var o = { timeZone: CFG.TZ };
    for (var k in (opts || {})) o[k] = opts[k];
    return x.toLocaleDateString('en-US', o);
  }

  function fmtTime(iso) {
    var x = d(iso); if (!x) return '';
    return x.toLocaleTimeString('en-US', {
      timeZone: CFG.TZ, hour: 'numeric', minute: '2-digit'
    }).replace(':00', '').replace(' AM', ' a.m.').replace(' PM', ' p.m.');
  }

  /** "Thursday, September 10" or "September 10-12" for a multi-day event. */
  function fmtDayLong(iso) {
    return fmtDate(iso, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  /* An event can be on the calendar with no date -- a postponement waiting on a new one.
     Every surface that shows a time goes through here, so the wording is decided once. */
  function fmtWhen(ev) {
    if (!ev.start_datetime) return 'Date to be announced';
    var day = fmtDayLong(ev.start_datetime);
    if (ev.all_day) return day + ' — all day';
    // The end time is optional. Without one, show when it starts and say no more.
    if (!ev.end_datetime) return day + ', ' + fmtTime(ev.start_datetime);
    var sameDay = fmtDate(ev.start_datetime, { year: 'numeric', month: 'numeric', day: 'numeric' })
      === fmtDate(ev.end_datetime, { year: 'numeric', month: 'numeric', day: 'numeric' });
    return sameDay
      ? day + ', ' + fmtTime(ev.start_datetime) + ' to ' + fmtTime(ev.end_datetime)
      : day + ', ' + fmtTime(ev.start_datetime) + ' to ' + fmtDayLong(ev.end_datetime) + ', ' + fmtTime(ev.end_datetime);
  }

  /** Submitters type "35". Show "$35" without making anyone remember the sign. */
  function money(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return '';
    return /^\d+(\.\d{1,2})?$/.test(s) ? '$' + s : s;
  }

  function fmtCost(ev) {
    if (ev.cost_type === 'free') return 'Free';
    if (ev.cost_type === 'donation') {
      var m = money(ev.cost_amount);
      return m ? 'Suggested donation ' + m : 'Suggested donation';
    }
    return money(ev.cost_amount) || 'Ticketed';
  }

  function fmtPlace(ev) {
    if (ev.venue_name) {
      var bits = [ev.venue_name];
      if (ev.city) bits.push(ev.city + (ev.state ? ', ' + ev.state : ''));
      return bits.join(', ');
    }
    return ev.online_url ? 'Online' : '';
  }

  /**
   * The link, shown as itself rather than hidden behind words. Protocol and any
   * "www." come off because they carry no information, and a very long one is
   * trimmed for display only -- the href stays complete.
   */
  function prettyUrl(u, max) {
    var s = String(u || '').replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '');
    max = max || 58;
    return s.length > max ? s.substring(0, max - 1) + '\u2026' : s;
  }

  /** Only http(s) links are ever written into the page. */
  function safeUrl(u) {
    return /^https?:\/\//i.test(String(u || '')) ? String(u) : '';
  }

  /** ISO date key in station time, e.g. 2026-09-10. Used to bucket events by day. */
  function dayKey(iso) {
    var x = d(iso); if (!x) return '';
    var parts = x.toLocaleDateString('en-CA', { timeZone: CFG.TZ });
    return parts;
  }

  /** A stable per-browser id used only for submission throttling. Not an identifier we read. */
  function clientToken() {
    var k = 'wpfw_ev_token';
    try {
      var t = window.localStorage.getItem(k);
      if (!t) {
        t = 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        window.localStorage.setItem(k, t);
      }
      return t;
    } catch (e) { return ''; }
  }

  /**
   * schema.org Event markup, so a search engine understands these are events
   * rather than a wall of text. Emitted for upcoming events only -- an expired
   * event is not a useful search result and Google discards it anyway.
   *
   * This does NOT create a page per event. Fragments are not separate URLs, so
   * every event points at the calendar page. It is the most that can be done
   * without a real per-event page, and it is worth doing.
   */
  function buildEventJsonLd(events, pageUrl) {
    function money(v) {
      var m = String(v == null ? '' : v).trim().replace(/^\$/, '');
      return /^\d+(\.\d{1,2})?$/.test(m) ? m : null;
    }
    return events.filter(function (e) {
      // schema.org requires a startDate. An undated event is not a search result yet.
      return !!e.start_datetime;
    }).map(function (e) {
      var hasPlace = !!(e.venue_name || e.street_address);
      var online = safeUrl(e.online_url);
      var node = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: e.title,
        startDate: e.start_datetime,
        endDate: e.end_datetime || undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        description: e.short_description || e.full_description || undefined,
        url: pageUrl + '#event=' + encodeURIComponent(e.slug || e.id),
        organizer: e.organization
          ? { '@type': 'Organization', name: e.organization } : undefined,
        isAccessibleForFree: e.cost_type === 'free' || undefined
      };

      // The submitter now says outright how the event is attended, so this stops
      // guessing from which fields happen to be filled in.
      var MODE_URI = {
        hybrid:    'https://schema.org/MixedEventAttendanceMode',
        virtual:   'https://schema.org/OnlineEventAttendanceMode',
        in_person: 'https://schema.org/OfflineEventAttendanceMode'
      };
      node.eventAttendanceMode = MODE_URI[e.attendance_mode] || (hasPlace && online
        ? 'https://schema.org/MixedEventAttendanceMode'
        : (online ? 'https://schema.org/OnlineEventAttendanceMode'
                  : 'https://schema.org/OfflineEventAttendanceMode'));

      var places = [];
      if (hasPlace) {
        var addr = {};
        if (e.street_address) addr.streetAddress = e.street_address;
        if (e.city) addr.addressLocality = e.city;
        if (e.state) addr.addressRegion = e.state;
        if (e.zip) addr.postalCode = e.zip;
        addr.addressCountry = 'US';
        places.push({
          '@type': 'Place',
          name: e.venue_name || e.city || 'Washington, DC',
          address: Object.assign({ '@type': 'PostalAddress' }, addr)
        });
      }
      if (online) places.push({ '@type': 'VirtualLocation', url: online });
      if (places.length) node.location = places.length === 1 ? places[0] : places;

      var img = safeUrl(e.image_url);
      if (img) node.image = [img];

      var price = e.cost_type === 'free' ? '0' : money(e.cost_amount);
      if (price !== null) {
        node.offers = {
          '@type': 'Offer',
          price: price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: safeUrl(e.ticket_url) || node.url
        };
      }

      // undefined values must not survive into the JSON
      Object.keys(node).forEach(function (k) { if (node[k] === undefined) delete node[k]; });
      return node;
    });
  }

  /** Replaces any block we wrote before, so switching views never leaves stale markup. */
  function writeJsonLd(nodes) {
    try {
      var prev = document.getElementById('wpfw-jsonld');
      if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
      if (!nodes || !nodes.length) return;
      var tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'wpfw-jsonld';
      // Escaping "<" stops any event text from closing this script element early.
      tag.textContent = JSON.stringify(nodes).replace(/</g, '\\u003c');
      (document.head || document.documentElement).appendChild(tag);
    } catch (err) { /* markup is a bonus, never a reason to break the page */ }
  }

  /**
   * Squarespace's fluid engine gives every block a fixed grid cell with its own z-index.
   * Our visible block's height is data-dependent -- the calendar is routinely many times
   * taller than the cell it was drawn in -- so it runs on underneath the blocks that follow
   * it. And the blocks that follow it are OURS: Block 3 and Block 5 draw nothing at all,
   * but they still claim a cell, and that cell has a higher z-index than the block it is
   * sitting on top of.
   *
   * The result is an invisible, empty block lying across the listings and swallowing every
   * click that lands on it. That is why the reminder box would not accept an email: the
   * clicks were never reaching the input.
   *
   * Moving blocks around in the editor cannot fix this, because the height that causes it
   * changes with the number of events. So: a block of ours that renders nothing never
   * intercepts a pointer, and a block of ours that renders something is lifted above its
   * empty siblings.
   */
  function fixBlockStacking_() {
    var cells = document.querySelectorAll('.fe-block');
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      if (cell.querySelector('.wpfw-ev, .wpfw-up, .wpfw-se')) {
        cell.style.position = 'relative';
        cell.style.zIndex = '20';
      } else if (cell.querySelector('script') &&
                 !String(cell.innerText || '').trim() &&
                 /WPFW_EVENTS|wpfw-/.test(cell.textContent || '')) {
        // Renders nothing, so there is nothing on it anyone could mean to click.
        cell.style.pointerEvents = 'none';
      }
    }
  }

  // Block 1 is the first block on the page, so the others do not exist yet.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixBlockStacking_);
  } else {
    fixBlockStacking_();
  }

  return {
    cfg: CFG, jsonp: jsonp, measure: measure, esc: esc,
    fmtDate: fmtDate, fmtTime: fmtTime, fmtDayLong: fmtDayLong,
    fmtWhen: fmtWhen, fmtCost: fmtCost, fmtPlace: fmtPlace, money: money,
    safeUrl: safeUrl, prettyUrl: prettyUrl, dayKey: dayKey, clientToken: clientToken,
    buildEventJsonLd: buildEventJsonLd, writeJsonLd: writeJsonLd,
    icsUrl: icsUrl, webcalUrl: webcalUrl, googleCalUrl: googleCalUrl
  };
})();
  }

  function bootForm() {

(function () {
  'use strict';
  if (window.__wpfwFormInit) return;   /* Squarespace can re-run blocks on soft navigation */
  window.__wpfwFormInit = true;

  var W = window.WPFW_EVENTS;
  if (!W) { console.error('WPFW: Block 1 (Core) is missing or loaded after this block.'); return; }

  var $ = function (id) { return document.getElementById(id); };
  var root = $('wpfw-form-root');
  if (!root) return;

  var form = $('wpfw-form');
  var LIMITS = {
    title: 90, organization: 120, short_description: 400, full_description: 2000,
    venue_name: 120, street_address: 120, city: 60, zip: 10, funders: 300,
    cosponsors: 300,
    online_url: 300, ticket_url: 300, image_url: 300, cost_amount: 40,
    accessibility_notes: 300, submitter_name: 80, submitter_email: 100, submitter_phone: 25
  };
  var SERVER = { token: '', minLeadDays: 7, maxMonths: 6, turnaround: '3 business days',
                 disclaimer: '', imgOn: true, imgChunk: 5000, imgParts: 34,
                 imgTarget: 85000, imgMax: 130000, imgEdge: 1200 };

  /* Picture state. Declared here because buildPayload() and validate(), both defined
     above the upload module, read it. */
  var UPLOAD = { url: '', busy: false, cid: '' };

  /* Read once, at the top, because buildPayload() and the token handler both use it
     and both are defined above where this used to sit. `var` hoists the name but not
     the value, so declaring it late left them reading undefined. Second time this
     shape of bug has appeared in this file; keeping module state together is the
     answer. */
  var INVITE = (function () {
    var q = {}, qs = (location.search || '').replace(/^\?/, '');
    if (!qs) return q;
    qs.split('&').forEach(function (kv) {
      var i = kv.indexOf('=');
      if (i > 0) {
        try {
          q[decodeURIComponent(kv.slice(0, i))] =
            decodeURIComponent(kv.slice(i + 1).replace(/\+/g, ' '));
        } catch (e) {}
      }
    });
    return q;
  }());

  var STATES = ['DC','MD','VA','AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN',
    'IA','KS','KY','LA','ME','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','WA','WV','WI','WY','PR'];

  /* ---------------- page setup ---------------- */

  (function buildStates() {
    var sel = $('wpfw-state');
    var html = '<option value="">--</option>';
    STATES.forEach(function (s, i) {
      if (i === 3) html += '<option disabled>--</option>';
      html += '<option value="' + s + '">' + s + '</option>';
    });
    sel.innerHTML = html;
  })();

  ['title','organization','short_description','full_description','venue_name',
   'accessibility_notes', 'funders', 'cosponsors'].forEach(function (f) {
    var el = $('wpfw-' + f), c = $('wpfw-count-' + f);
    if (!el || !c) return;
    var lim = LIMITS[f];
    function upd() {
      var n = el.value.length;
      c.textContent = n + ' of ' + lim;
      c.className = 'wpfw-count' + (n > lim ? ' over' : (n > lim * 0.9 ? ' warn' : ''));
      updateMeter();
    }
    el.addEventListener('input', upd);
    upd();
  });

  $('wpfw-repeat_rule').addEventListener('change', function () {
    var on = this.value === 'weekly';
    $('wpfw-repeat-until-field').hidden = !on;
    $('wpfw-repeat_until').required = on;
  });

  Array.prototype.forEach.call(form.querySelectorAll('input[name="cost_type"]'), function (r) {
    r.addEventListener('change', function () {
      var needs = this.value !== 'free';
      $('wpfw-cost-amount-field').hidden = !needs;
      $('wpfw-cost_amount').required = needs;
    });
  });

  $('wpfw-all_day').addEventListener('change', function () {
    var t1 = $('wpfw-start_time'), t2 = $('wpfw-end_time');
    if (this.checked) {
      if (!t1.value) t1.value = '00:00';
      if (!t2.value) t2.value = '23:59';
    }
  });

  /* Ask the server for a submission token. This also warms the cold start, so the
     actual submit does not eat the 10-15 second first-run penalty. */
  var tokenAttempts = 0;
  var TOKEN_TRIES = 5;
  /* The web app sleeps. Waking it can throw errors for a good deal longer than a
     burst of quick retries covers, so the waits get longer as we go: about half a
     minute of patience in total, instead of five seconds. */
  var TOKEN_BACKOFF_MS = [2000, 4000, 8000, 12000];

  function loadToken() {
    tokenAttempts++;
    W.jsonp({ action: 'formtoken', _cb: Date.now() }, function (res) {
      if (!res || !res.ok) {
        // The server answered, so the URL and permissions are fine -- something is
        // wrong inside the script. Almost always: setup has not been run on the Sheet.
        fail('The calendar server answered but is not ready. ' +
             'In the Google Sheet, run WPFW Events \u203a Setup / repair workbook, then reload this page.');
        return;
      }
      SERVER.token = res.token;
      tokenAttempts = 0;
      var stale = $('wpfw-retry-conn');
      if (stale) stale.remove();
      $('wpfw-submit').disabled = false;
      $('wpfw-submit').textContent = 'Submit this event';
      $('wpfw-live').style.color = '';
      $('wpfw-live').style.fontWeight = '';
      SERVER.minLeadDays = res.min_lead_days;
      SERVER.maxMonths = res.max_months_ahead;
      SERVER.turnaround = res.turnaround;
      SERVER.disclaimer = res.disclaimer || '';
      if (res.img_uploads !== undefined) SERVER.imgOn = !!res.img_uploads;
      if (res.img_chunk_max)    SERVER.imgChunk  = res.img_chunk_max;
      if (res.img_max_parts)    SERVER.imgParts  = res.img_max_parts;
      if (res.img_target_bytes) SERVER.imgTarget = res.img_target_bytes;
      if (res.img_max_bytes)    SERVER.imgMax    = res.img_max_bytes;
      if (res.img_max_edge)     SERVER.imgEdge   = res.img_max_edge;
      applyUploadAvailability();
      if (res.limits) for (var k in res.limits) LIMITS[k] = res.limits[k];

      $('wpfw-turnaround').textContent =
        ' Submissions are reviewed within ' + SERVER.turnaround + '.';
      /* Both numbers come from Config, and the station is entitled to set the notice
         period to 0 -- meaning "no notice required", not "zero days of notice", which
         is what the old sentence read out. Built rather than concatenated so 0, 1 and
         many each say something a person would actually write. */
      var lead = Number(SERVER.minLeadDays) || 0;
      var months = Number(SERVER.maxMonths) || 0;
      var ahead = 'list events up to ' + months + ' month' + (months === 1 ? '' : 's') + ' ahead';
      $('wpfw-window-note').textContent = lead > 0
        ? 'We need at least ' + lead + ' ' + (lead === 1 ? 'day’s' : 'days’') +
          ' notice and ' + ahead + '.'
        : 'We ' + ahead + '.';
      if (res.tags && res.tags.length) {
        buildTagGrid(res.tags, res.max_tags || 3);
        if (INVITE.tag) {
          var boxes = document.querySelectorAll('[data-tag]');
          for (var bi = 0; bi < boxes.length; bi++) {
            if (boxes[bi].value === INVITE.tag) { boxes[bi].checked = true; break; }
          }
          enforceTagCap();
        }
      }
      if (res.access_features) buildAccessGrid(res.access_features);
      if (res.attendance_modes) buildModes(res.attendance_modes);
      setCopy('wpfw-onair-note', res.broadcast_notice);
      if (res.list_enabled) {
        setCopy('wpfw-join-label', res.list_pitch);
        var jr = $('wpfw-joinrow'), jh = $('wpfw-join-hint');
        if (jr) jr.hidden = false;
        if (jh) jh.hidden = false;
      }
      setCopy('wpfw-not-accepted', res.not_accepted);
      var nope = $('wpfw-not-accepted-box');
      if (nope) nope.hidden = !res.not_accepted;
      $('wpfw-form-disclaimer').textContent = SERVER.disclaimer;
      $('wpfw-confirm-disclaimer').textContent = SERVER.disclaimer;

      var min = new Date(Date.now() + SERVER.minLeadDays * 86400000);
      var max = new Date(); max.setMonth(max.getMonth() + SERVER.maxMonths);
      ['wpfw-start_date', 'wpfw-end_date', 'wpfw-repeat_until'].forEach(function (id) {
        $(id).min = isoDay(min);
        $(id).max = isoDay(max);
      });
      $('wpfw-meter').hidden = false;
      updateMeter();
    }, function () {
      // Checked by SHAPE, never by comparing against a placeholder string. A literal
      // placeholder in this file reads as something to find-and-replace, and replacing it
      // with a URL that carries a line break silently breaks the whole block.
      var ep = String(W.cfg.ENDPOINT || '').trim();
      if (/\/dev\/?$/.test(ep)) {
        fail('This form points at the /dev address, which only works for signed-in editors. ' +
             'Use the address ending in /exec.');
      } else if (!/^https:\/\/script\.google\.com\/\S+\/exec$/.test(ep)) {
        fail('This form is not connected. The web app address in Block 1 on this page is not a ' +
             'complete address ending in /exec. Recopy Block 1 and paste it again.');
      } else if (tokenAttempts < TOKEN_TRIES) {
        // Apps Script sleeps when idle and the first request of the day can crawl.
        // One slow start is not a broken form, so try again before saying anything alarming.
        say('Waking up the calendar server, one moment... (' + tokenAttempts + ' of ' + TOKEN_TRIES + ')');
        setTimeout(loadToken, TOKEN_BACKOFF_MS[tokenAttempts - 1] || 12000);
      } else {
        fail('We could not reach the calendar server after ' + TOKEN_TRIES + ' tries. ' +
             'This is usually temporary. Wait a moment and use the button below, or reload the page.');
      }
    });
  }

  /**
   * A hard stop. The form is useless without a token, so say so plainly rather than
   * letting someone fill in twenty fields and lose the lot on submit.
   */
  function fail(msg) {
    var live = $('wpfw-live');
    live.textContent = msg;
    live.style.color = 'var(--wpfw-crimson)';
    live.style.fontWeight = '600';
    var btn = $('wpfw-submit');
    btn.disabled = true;
    btn.textContent = 'Form not connected';
    var retry = $('wpfw-retry-conn');
    if (!retry) {
      retry = document.createElement('button');
      retry.type = 'button';
      retry.id = 'wpfw-retry-conn';
      retry.textContent = 'Try connecting again';
      retry.style.cssText = 'margin-top:10px;font:600 14px/1 var(--wpfw-body);' +
        'background:#fff;border:1px solid var(--wpfw-crimson);color:var(--wpfw-crimson);' +
        'padding:9px 16px;border-radius:2px;cursor:pointer;';
      retry.addEventListener('click', function () {
        btn.disabled = false;
        btn.textContent = 'Submit this event';
        live.style.color = '';
        live.style.fontWeight = '';
        say('Trying again...');
        retry.remove();
        tokenAttempts = 0;
        loadToken();
      });
      live.parentNode.insertBefore(retry, live.nextSibling);
    }
  }

  function isoDay(dt) {
    return dt.toLocaleDateString('en-CA', { timeZone: W.cfg.TZ });
  }

  /**
   * The vocabulary comes from the server, so the Config tab is the single place the
   * tag list is edited. The cap is enforced here for feedback and again on the server.
   */
  var MAX_TAGS = 3;

  function buildTagGrid(vocab, cap) {
    MAX_TAGS = cap;
    var host = $('wpfw-taggrid');
    if (!host) return;
    host.innerHTML = '';
    vocab.forEach(function (tag, i) {
      var id = 'wpfw-tag-' + i;
      var wrap = document.createElement('div');
      wrap.className = 'wpfw-choice';
      var box = document.createElement('input');
      box.type = 'checkbox'; box.id = id; box.value = tag;
      box.setAttribute('data-tag', '1');
      var lab = document.createElement('label');
      lab.setAttribute('for', id);
      lab.textContent = tag;
      wrap.appendChild(box); wrap.appendChild(lab);
      host.appendChild(wrap);
      box.addEventListener('change', enforceTagCap);
    });
    enforceTagCap();
  }

  /** Same shape as the tag grid, but with no cap: an event is as accessible as it is. */
  function buildAccessGrid(vocab) {
    var host = $('wpfw-accessgrid');
    if (!host || !vocab || !vocab.length) return;
    host.innerHTML = '';
    vocab.forEach(function (feature, i) {
      var id = 'wpfw-access-' + i;
      var wrap = document.createElement('div');
      wrap.className = 'wpfw-choice';
      var box = document.createElement('input');
      box.type = 'checkbox'; box.id = id; box.value = feature;
      box.setAttribute('data-access', '1');
      var lab = document.createElement('label');
      lab.setAttribute('for', id);
      lab.textContent = feature;
      wrap.appendChild(box); wrap.appendChild(lab);
      host.appendChild(wrap);
    });
  }

  function buildModes(modes) {
    var host = $('wpfw-modes');
    if (!host || !modes || !modes.length) return;
    host.innerHTML = '';
    modes.forEach(function (pair, i) {
      var id = 'wpfw-mode-' + i;
      var box = document.createElement('input');
      box.type = 'radio'; box.name = 'attendance_mode'; box.id = id; box.value = pair[0];
      var lab = document.createElement('label');
      lab.setAttribute('for', id);
      lab.textContent = pair[1];
      host.appendChild(box); host.appendChild(lab);
    });
  }

  function chosenMode() {
    var picked = form.querySelector('input[name="attendance_mode"]:checked');
    return picked ? picked.value : '';
  }

  function chosenAccess() {
    var out = [];
    var boxes = document.querySelectorAll('[data-access]');
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) out.push(boxes[i].value);
    return out;
  }

  function chosenTags() {
    return Array.prototype.filter.call(
      document.querySelectorAll('[data-tag]'), function (b) { return b.checked; }
    ).map(function (b) { return b.value; });
  }

  /** Gray out the rest at the cap rather than letting someone check a fourth and be told off. */
  function enforceTagCap() {
    var n = chosenTags().length;
    var atCap = n >= MAX_TAGS;
    Array.prototype.forEach.call(document.querySelectorAll('[data-tag]'), function (b) {
      b.disabled = atCap && !b.checked;
    });
    var c = $('wpfw-tagcount');
    if (c) {
      c.textContent = n === 0
        ? 'Choose up to ' + MAX_TAGS + '.'
        : n + ' of ' + MAX_TAGS + ' chosen.' + (atCap ? ' Uncheck one to change your mind.' : '');
      c.className = 'wpfw-tagcount' + (atCap ? ' full' : '');
    }
    updateMeter();
  }

  /* ---------------- errors ---------------- */

  function clearErrors() {
    Array.prototype.forEach.call(form.querySelectorAll('.wpfw-err'), function (p) {
      p.textContent = ''; p.className = 'wpfw-err';
    });
    Array.prototype.forEach.call(form.querySelectorAll('[aria-invalid]'), function (el) {
      el.removeAttribute('aria-invalid');
    });
    $('wpfw-summary').className = 'wpfw-summary';
    $('wpfw-summary-list').innerHTML = '';
  }

  var FIELD_TO_INPUT = {
    start_datetime: 'wpfw-start_date', end_datetime: 'wpfw-end_date',
    cost_type: 'wpfw-cost-free', consent: 'wpfw-consent', tags: 'wpfw-tag-0',
    image_rights_ok: 'wpfw-image_rights_ok', repeat_until: 'wpfw-repeat_until',
    attendance_mode: 'wpfw-modes', public_contact: 'wpfw-public_contact',
    image_file: 'wpfw-image_file'
  };

  function showErrors(list) {
    clearErrors();
    if (!list.length) return;
    var ol = $('wpfw-summary-list');
    list.forEach(function (e) {
      var p = $('wpfw-err-' + e.field);
      if (p) { p.textContent = e.message; p.className = 'wpfw-err on'; }
      var inputId = FIELD_TO_INPUT[e.field] || ('wpfw-' + e.field);
      var el = $(inputId);
      if (el) el.setAttribute('aria-invalid', 'true');

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + inputId;
      a.textContent = e.message;
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var t = $(inputId);
        if (t) { t.focus(); t.scrollIntoView({ block: 'center' }); }
      });
      li.appendChild(a);
      ol.appendChild(li);
    });
    var box = $('wpfw-summary');
    $('wpfw-summary-title').textContent = list.length === 1
      ? 'Please fix one thing' : 'Please fix the following ' + list.length + ' things';
    box.className = 'wpfw-summary on';
    box.focus();
    box.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function say(msg) { $('wpfw-live').textContent = msg; }

  function setCopy(id, text) { var el = $(id); if (el && text) el.textContent = text; }

  /* ---------------- reading the form ---------------- */

  function val(id) { return ($(id) ? $(id).value : '').trim(); }

  function joinDT(dateId, timeId) {
    var dv = val(dateId), tv = val(timeId);
    if (!dv) return '';
    if (!tv) tv = '00:00';
    return dv + 'T' + tv + ':00';   /* local time, interpreted as Eastern by Apps Script */
  }

  function buildPayload() {
    var p = {
      token: SERVER.token,
      client_token: W.clientToken(),
      title: val('wpfw-title'),
      organization: val('wpfw-organization'),
      tags: chosenTags().join(','),
      short_description: val('wpfw-short_description'),
      full_description: val('wpfw-full_description'),
      start_datetime: joinDT('wpfw-start_date', 'wpfw-start_time'),
      end_datetime: joinDT('wpfw-end_date', 'wpfw-end_time'),
      all_day: $('wpfw-all_day').checked ? 'true' : 'false',
      repeat_rule: val('wpfw-repeat_rule'),
      repeat_until: val('wpfw-repeat_until'),
      venue_name: val('wpfw-venue_name'),
      street_address: val('wpfw-street_address'),
      city: val('wpfw-city'),
      state: val('wpfw-state'),
      zip: val('wpfw-zip'),
      online_url: val('wpfw-online_url'),
      cost_type: (form.querySelector('input[name="cost_type"]:checked') || {}).value || '',
      cost_amount: val('wpfw-cost_amount'),
      ticket_url: val('wpfw-ticket_url'),
      image_url: UPLOAD.url || val('wpfw-image_url'),
      image_rights_ok: $('wpfw-image_rights_ok').checked ? 'true' : 'false',
      attendance_mode: chosenMode(),
      public_contact: val('wpfw-public_contact'),
      invite_org: INVITE.org || '',
      invite_sig: INVITE.g || '',
      join_list: ($('wpfw-join_list') && $('wpfw-join_list').checked) ? 'true' : 'false',
      access_features: chosenAccess().join(','),
      accessibility_notes: val('wpfw-accessibility_notes'),
      funders: val('wpfw-funders'),
      cosponsors: val('wpfw-cosponsors'),
      submitter_name: val('wpfw-submitter_name'),
      submitter_email: val('wpfw-submitter_email'),
      submitter_phone: val('wpfw-submitter_phone'),
      consent: $('wpfw-consent').checked ? 'true' : 'false',
      website: val('wpfw-website'),
      fax: val('wpfw-fax')
    };
    if (p.repeat_rule !== 'weekly') p.repeat_until = '';
    if (p.cost_type === 'free') p.cost_amount = '';
    return p;
  }

  /**
   * The whole submission travels in a URL, so its encoded length is a real limit.
   * The meter is honest about it rather than truncating behind the visitor's back.
   */
  function updateMeter() {
    var fill = $('wpfw-meter-fill'), text = $('wpfw-meter-text');
    if (!fill) return;
    var p = buildPayload();
    p.action = 'submit';
    var n = W.measure(p);
    var pct = Math.min(100, Math.round(n / W.cfg.SINGLE_SHOT_MAX * 100));
    fill.style.width = pct + '%';
    if (n <= W.cfg.SINGLE_SHOT_MAX) {
      fill.style.background = 'var(--wpfw-crimson)';
      text.textContent = 'Submission size: ' + pct + '% of the single-request limit.';
    } else {
      fill.style.background = 'var(--wpfw-gold)';
      text.textContent = 'This is a long submission. It will be sent in several parts, ' +
        'which takes a few seconds longer. Nothing will be cut.';
    }
  }
  form.addEventListener('input', updateMeter);
  form.addEventListener('change', updateMeter);

  /* ---------------- client-side validation ---------------- */

  function validate(p) {
    var errs = [];
    function req(field, label) {
      if (!p[field]) errs.push({ field: field, message: label + ' is required.' });
      else if (LIMITS[field] && p[field].length > LIMITS[field]) {
        errs.push({ field: field, message: label + ' must be ' + LIMITS[field] +
          ' characters or fewer. Yours is ' + p[field].length + '.' });
      }
    }
    req('title', 'Event title');
    req('organization', 'Presenting organization or individual');
    req('short_description', 'Short description');
    req('submitter_name', 'Your name');
    var tagCount = p.tags ? p.tags.split(',').length : 0;
    if (!tagCount) {
      errs.push({ field: 'tags', message: 'Please choose at least one tag so people can find your event.' });
    } else if (tagCount > MAX_TAGS) {
      errs.push({ field: 'tags', message: 'Please choose no more than ' + MAX_TAGS + ' tags.' });
    }
    if (!p.cost_type) errs.push({ field: 'cost_type',
      message: 'Please tell us whether the event is free, ticketed, or by donation.' });
    if (p.cost_type && p.cost_type !== 'free' && !p.cost_amount) {
      errs.push({ field: 'cost_amount', message: 'Please give the ticket price or suggested donation.' });
    }
    if (p.full_description.length > LIMITS.full_description) {
      errs.push({ field: 'full_description', message: 'Full description must be ' +
        LIMITS.full_description + ' characters or fewer. Yours is ' + p.full_description.length + '.' });
    }

    if (!p.submitter_email) {
      errs.push({ field: 'submitter_email', message: 'Your email address is required.' });
    } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(p.submitter_email)) {
      errs.push({ field: 'submitter_email', message: 'Please enter a valid email address.' });
    }

    ['online_url', 'ticket_url', 'image_url'].forEach(function (f) {
      if (p[f] && !/^https?:\/\/[^\s]+\.[^\s]+$/i.test(p[f])) {
        errs.push({ field: f, message: 'Please enter a full web address starting with http:// or https://' });
      }
    });

    if (!p.start_datetime) {
      errs.push({ field: 'start_datetime', message: 'Please give a start date and time.' });
    }
    // The end is optional, but half an end is a mistake worth catching here.
    if (!val('wpfw-end_date') && val('wpfw-end_time')) {
      errs.push({ field: 'end_datetime',
        message: 'Please add the end date too, or clear the end time.' });
    }
    if (p.start_datetime && p.end_datetime) {
      var s = new Date(p.start_datetime), e = new Date(p.end_datetime);
      if (e <= s) errs.push({ field: 'end_datetime', message: 'The end time has to be after the start time.' });
      var lead = new Date(Date.now() + SERVER.minLeadDays * 86400000);
      if (s < new Date()) {
        errs.push({ field: 'start_datetime', message: 'That start date is in the past.' });
      } else if (s < lead) {
        errs.push({ field: 'start_datetime', message: 'We need at least ' + SERVER.minLeadDays +
          ' days to review a listing. Please choose a date on or after ' +
          lead.toLocaleDateString('en-US', { timeZone: W.cfg.TZ, month: 'long', day: 'numeric', year: 'numeric' }) + '.' });
      }
    }

    if (p.repeat_rule === 'weekly' && !p.repeat_until) {
      errs.push({ field: 'repeat_until', message: 'A repeating event needs an end date for the series.' });
    }
    if (!p.attendance_mode) {
      errs.push({ field: 'attendance_mode',
        message: 'Please say whether people take part in person, online, or both.' });
    }
    if (!p.venue_name && !p.online_url) {
      errs.push({ field: 'venue_name', message: 'Please give either a venue or a registration link.' });
    }
    if (UPLOAD.busy) {
      errs.push({ field: 'image_file',
        message: 'Your picture is still uploading. Give it a moment, or remove it to submit now.' });
    }
    if (p.image_url && p.image_rights_ok !== 'true') {
      errs.push({ field: 'image_rights_ok',
        message: 'Please confirm you have the right to share this picture, or remove it.' });
    }
    if (p.consent !== 'true') {
      errs.push({ field: 'consent', message: 'Please check the box confirming the information is accurate.' });
    }
    return errs;
  }

  /* ---------------- picture upload ----------------
     The bytes cannot be POSTed, so the browser shrinks the picture to something small
     enough to travel as base64url across a handful of GETs. Everything here is best
     effort: if any of it fails the form still submits, just without a picture. */

  function canUpload() {
    return SERVER.imgOn && !!(window.FileReader && window.File &&
      document.createElement('canvas').getContext &&
      document.createElement('canvas').toDataURL);
  }

  function applyUploadAvailability() {
    var field = $('wpfw-upload-field');
    var orlink = $('wpfw-orlink');
    if (!field || !orlink) return;
    if (canUpload()) return;
    // No upload here, so the link box stops being the fallback and becomes the field.
    field.hidden = true;
    orlink.open = true;
    var sum = orlink.querySelector('summary');
    if (sum) sum.hidden = true;
  }

  function humanBytes(n) {
    return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB'
         : n >= 1024    ? Math.round(n / 1024) + ' KB'
         : n + ' bytes';
  }

  function shotState(msg, kind) {
    var el = $('wpfw-shot-state');
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'wpfw-shot-state' + (kind ? ' ' + kind : '');
  }

  function progress(pct) {
    var track = $('wpfw-shot-track'), fill = $('wpfw-shot-fill');
    if (!track || !fill) return;
    track.hidden = pct === null;
    if (pct !== null) fill.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function clearPicture() {
    UPLOAD.url = ''; UPLOAD.cid = '';
    var shot = $('wpfw-shot');
    if (shot) shot.hidden = true;
    var input = $('wpfw-image_file');
    if (input) input.value = '';
    progress(null);
    shotState('');
    updateMeter();
  }

  /** Draws the picture into a canvas at a sane size, then walks the JPEG quality
      down until it fits the budget. Returns base64 (no data: prefix) via callback. */
  function shrink(file, done, failed) {
    var reader = new FileReader();
    reader.onerror = function () { failed('That file could not be read.'); };
    reader.onload = function () {
      var img = new Image();
      img.onerror = function () { failed('That file is not a picture we can read.'); };
      img.onload = function () {
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) { failed('That file is not a picture we can read.'); return; }

        function encode(maxEdge, quality) {
          var scale = Math.min(1, maxEdge / Math.max(w, h));
          var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
          var c = document.createElement('canvas');
          c.width = cw; c.height = ch;
          var ctx = c.getContext('2d');
          ctx.fillStyle = '#ffffff';           /* PNG transparency would go black in JPEG */
          ctx.fillRect(0, 0, cw, ch);
          ctx.drawImage(img, 0, 0, cw, ch);
          var url = c.toDataURL('image/jpeg', quality);
          return url.slice(url.indexOf(',') + 1);
        }

        var edges = [SERVER.imgEdge, 1000, 800, 640];
        var qualities = [0.82, 0.72, 0.62, 0.52, 0.42];
        var best = null;
        for (var e = 0; e < edges.length; e++) {
          for (var q = 0; q < qualities.length; q++) {
            var b64 = encode(edges[e], qualities[q]);
            best = b64;
            if (b64.length * 0.75 <= SERVER.imgTarget) {
              done(b64, edges[e], qualities[q]);
              return;
            }
          }
        }
        if (best && best.length * 0.75 <= SERVER.imgMax) { done(best, 640, 0.42); return; }
        failed('That picture is too detailed to send. Please try a smaller one.');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function toBase64Url(b64) {
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function sendPicture(b64) {
    var payload = toBase64Url(b64);
    var size = SERVER.imgChunk;
    var parts = Math.ceil(payload.length / size);
    if (parts > SERVER.imgParts) {
      shotState('That picture is too large to send. Please try a smaller one.', 'bad');
      progress(null); UPLOAD.busy = false; return;
    }

    UPLOAD.cid = 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    var sent = 0;

    function step(i) {
      if (i >= parts) { commit(); return; }
      W.jsonp({ action: 'imgchunk', cid: UPLOAD.cid, i: i, n: parts,
                d: payload.substr(i * size, size) },
        function (res) {
          if (!res || !res.ok) { stop(res && res.message); return; }
          sent++;
          progress(Math.round((sent / (parts + 1)) * 100));
          step(i + 1);
        },
        function () { stop(null); });
    }

    function commit() {
      W.jsonp({ action: 'imgcommit', cid: UPLOAD.cid, n: parts, token: SERVER.token },
        function (res) {
          UPLOAD.busy = false;
          if (!res || !res.ok || !res.image_url) { stop(res && res.message); return; }
          UPLOAD.url = res.image_url;
          progress(100);
          setTimeout(function () { progress(null); }, 700);
          shotState('Picture ready. It will appear with your listing once it is approved.', 'ok');
          say('Picture uploaded.');
          updateMeter();
        },
        function () { stop(null); });
    }

    function stop(msg) {
      UPLOAD.busy = false; UPLOAD.url = ''; progress(null);
      shotState(msg || 'The picture could not be sent. You can try again, or submit without one.', 'bad');
    }

    progress(2);
    step(0);
  }

  function acceptFile(file) {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
      shotState('That is not a JPEG or PNG picture.', 'bad');
      return;
    }
    if (file.size > 25 * 1048576) {
      shotState('That file is over 25 MB. Please try a smaller one.', 'bad');
      return;
    }
    if (!SERVER.token) {
      shotState('Still connecting to the calendar server. Please try again in a few seconds.', 'bad');
      loadToken();
      return;
    }

    UPLOAD.busy = true; UPLOAD.url = '';
    $('wpfw-shot').hidden = false;
    $('wpfw-shot-name').textContent = file.name;
    $('wpfw-shot-size').textContent = humanBytes(file.size);
    $('wpfw-shot-img').src = URL.createObjectURL(file);
    shotState('Preparing the picture...');
    progress(1);

    shrink(file, function (b64, edge, q) {
      $('wpfw-shot-size').textContent =
        humanBytes(file.size) + ' → ' + humanBytes(Math.round(b64.length * 0.75)) +
        ' at ' + edge + 'px';
      shotState('Sending...');
      sendPicture(b64);
    }, function (msg) {
      UPLOAD.busy = false;
      shotState(msg, 'bad');
      progress(null);
    });
  }

  (function wireUpload() {
    var input = $('wpfw-image_file'), drop = $('wpfw-drop'), remove = $('wpfw-shot-remove');
    if (!input || !drop) return;

    input.addEventListener('change', function () { acceptFile(input.files && input.files[0]); });
    if (remove) remove.addEventListener('click', clearPicture);

    ['dragenter', 'dragover'].forEach(function (t) {
      drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add('over'); });
    });
    ['dragleave', 'drop'].forEach(function (t) {
      drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove('over'); });
    });
    drop.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) acceptFile(dt.files[0]);
    });
  }());

  /* ---------------- submission ---------------- */

  var sending = false;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (sending) return;

    var p = buildPayload();
    var errs = validate(p);
    if (errs.length) { showErrors(errs); return; }
    clearErrors();

    if (!SERVER.token) {
      say('Still connecting to the calendar server. Please try again in a few seconds.');
      loadToken();
      return;
    }

    sending = true;
    $('wpfw-submit').disabled = true;
    $('wpfw-submit').textContent = 'Sending...';

    var single = Object.assign({ action: 'submit' }, p);
    if (W.measure(single) <= W.cfg.SINGLE_SHOT_MAX) {
      say('Sending your event...');
      W.jsonp(single, onResult, onFailure);
    } else {
      sendChunked(p);
    }
  });

  /**
   * Two-step path for submissions too long for one URL. The payload is JSON-encoded,
   * split into parts the server holds in CacheService, then committed in a final call.
   * Split points are safe because the parts are only decoded after they are rejoined.
   */
  function sendChunked(p) {
    var enc = encodeURIComponent(JSON.stringify(p));
    var size = W.cfg.CHUNK_MAX;
    var parts = [];
    for (var i = 0; i < enc.length; i += size) parts.push(enc.substr(i, size));

    if (parts.length > 12) {
      sending = false; resetButton();
      showErrors([{ field: 'full_description',
        message: 'This submission is too long to send. Please shorten the full description.' }]);
      return;
    }

    var cid = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    var sent = 0;
    say('Sending your event in ' + parts.length + ' parts...');

    (function next() {
      if (sent >= parts.length) {
        say('Finishing up...');
        W.jsonp({ action: 'commit', cid: cid, n: parts.length }, onResult, onFailure);
        return;
      }
      var idx = sent;
      W.jsonp({ action: 'chunk', cid: cid, i: idx, n: parts.length, d: parts[idx] },
        function (res) {
          if (!res || !res.ok) { onFailure(res || {}); return; }
          sent++;
          say('Sending your event... part ' + sent + ' of ' + parts.length + '.');
          next();
        }, onFailure);
    })();
  }

  function resetButton() {
    $('wpfw-submit').disabled = false;
    $('wpfw-submit').textContent = 'Submit this event';
  }

  function onResult(res) {
    sending = false;
    if (!res) { onFailure({}); return; }

    if (res.ok) { showConfirmation(res); return; }

    resetButton();
    if (res.error === 'validation' && res.errors) { showErrors(res.errors); say(''); return; }
    say(res.message || 'We could not accept that submission. Please check your entries and try again.');
    if (res.error === 'token') loadToken();
  }

  function onFailure(err) {
    sending = false;
    resetButton();
    say((err && err.message) ||
        'We could not reach the calendar server. Please try again in a moment. ' +
        'If it keeps failing, email us and we will add your event by hand.');
  }

  function showConfirmation(res) {
    $('wpfw-form-stage').style.display = 'none';
    $('wpfw-confirm-ref').textContent = res.id || '';
    $('wpfw-confirm-body').textContent = res.message ||
      'Your event has been received and is waiting for review.';
    $('wpfw-confirm-turnaround').textContent =
      'Our moderator reviews submissions within ' + (res.turnaround || SERVER.turnaround) +
      '. We may edit your listing for length and style. A listing is not an endorsement.';
    var box = $('wpfw-confirm');
    box.className = 'wpfw-confirm on';
    box.focus();
    box.scrollIntoView({ block: 'start', behavior: 'smooth' });
    try { window.localStorage.removeItem('wpfw_ev_draft'); } catch (e) {}
    rememberOrg();
  }

  /* An organization listing four events should type its own details once, not four
     times. These are the fields that belong to the group rather than the event. */
  var CARRY = ['wpfw-organization', 'wpfw-public_contact', 'wpfw-funders',
               'wpfw-submitter_name', 'wpfw-submitter_email', 'wpfw-submitter_phone'];

  function rememberOrg() {
    var keep = {};
    CARRY.forEach(function (id) { var e = $(id); if (e) keep[id] = e.value; });
    try { window.localStorage.setItem('wpfw_ev_org', JSON.stringify(keep)); } catch (e) {}
    return keep;
  }

  function restoreOrg(keep) {
    if (!keep) {
      try { keep = JSON.parse(window.localStorage.getItem('wpfw_ev_org') || 'null'); }
      catch (e) { keep = null; }
    }
    if (!keep) return false;
    var any = false;
    CARRY.forEach(function (id) {
      var e = $(id);
      if (e && keep[id]) { e.value = keep[id]; any = true; }
    });
    return any;
  }

  function forgetOrg() {
    try { window.localStorage.removeItem('wpfw_ev_org'); } catch (e) {}
    CARRY.forEach(function (id) { var e = $(id); if (e) e.value = ''; });
    var note = $('wpfw-remembered');
    if (note) note.hidden = true;
    $('wpfw-organization').focus();
  }

  function showRemembered(on) {
    var note = $('wpfw-remembered');
    if (note) note.hidden = !on;
  }

  $('wpfw-another').addEventListener('click', function (ev) {
    ev.preventDefault();
    var keep = rememberOrg();
    form.reset();
    restoreOrg(keep);
    showRemembered(true);
    clearErrors();
    say('');
    resetButton();
    clearPicture();
    $('wpfw-repeat-until-field').hidden = true;
    $('wpfw-cost-amount-field').hidden = true;
    enforceTagCap();
    $('wpfw-confirm').className = 'wpfw-confirm';
    $('wpfw-form-stage').style.display = '';
    loadToken();               /* a token is single use, so a second event needs a fresh one */
    $('wpfw-title').focus();
    window.scrollTo({ top: root.offsetTop - 20, behavior: 'smooth' });
  });

  function applyInvite() {
    var any = false;
    function put(id, v) {
      var e = $(id);
      if (e && v) { e.value = v; any = true; }
    }
    put('wpfw-organization', INVITE.org);
    put('wpfw-submitter_name', INVITE.name);
    put('wpfw-submitter_email', INVITE.email);
    put('wpfw-public_contact', INVITE.contact);
    if (!any) return false;

    var note = $('wpfw-invited');
    if (note) {
      note.textContent = 'Filled in for ' + (INVITE.org || 'your organization') +
        '. Change anything that is not right.';
      note.hidden = false;
    }
    return true;
  }

  if (!applyInvite() && restoreOrg(null)) showRemembered(true);
  var forget = $('wpfw-forget');
  if (forget) forget.addEventListener('click', function (ev) { ev.preventDefault(); forgetOrg(); });

  loadToken();
})();
  }

  function bootCalendar() {

(function () {
  'use strict';
  if (window.__wpfwCalInit) return;
  window.__wpfwCalInit = true;

  var W = window.WPFW_EVENTS;
  if (!W) { console.error('WPFW: Block 1 (Core) is missing or loaded after this block.'); return; }

  var $ = function (id) { return document.getElementById(id); };

  /**
   * Optional UI must never be load-bearing. If a block on the page is a version
   * behind and an element is missing, the calendar still lists events -- it just
   * loses that one control. An exception here used to stop load() from ever running,
   * which blanked the whole page over a single absent button.
   */
  function on(id, evt, fn) {
    var el = $(id);
    if (el) el.addEventListener(evt, fn);
    return !!el;
  }
  function press(id, state) {
    var el = $(id);
    if (el) el.setAttribute('aria-pressed', String(state));
  }
  function setText(id, txt) {
    var el = $(id);
    if (el) el.textContent = txt;
  }
  var root = $('wpfw-cal-root');
  if (!root) return;

  var ALL = [];
  /* What is on the calendar right now, kept separately from ALL. ALL swaps to the
     archive when somebody looks at past events, and an organizer's page should
     still be able to answer "what else are they putting on" from there. */
  var UPCOMING = null;
  var STATE = { view: 'list', tag: 'all', dcf: false, station: false, org: null,
                past: false, month: null, day: null, eventId: null };
  var DCF_LABEL = 'Diverse City Fund grantee';
  var STATION_LABEL = 'WPFW station event';
  var VOCAB = [];
  var META = { broadcast: '', notify: true, listEnabled: false,
               listPitch: 'Send me the weekly roundup of justice events in the District.' };

  /* The calendar page has never needed a form token. Reminders do, so one is fetched
     the first time somebody actually asks for a reminder rather than on every load. */
  var NOTIFY_TOKEN = '';
  function withToken(done, fail) {
    if (NOTIFY_TOKEN) { done(NOTIFY_TOKEN); return; }
    W.jsonp({ action: 'formtoken', _cb: Date.now() }, function (res) {
      if (res && res.ok && res.token) { NOTIFY_TOKEN = res.token; done(NOTIFY_TOKEN); }
      else fail();
    }, fail);
  }
  var WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /* ---------------- load ---------------- */

  var attempt = 0;
  var TRIES = 5;
  /* The web app sleeps. Waking it can throw errors for a good deal longer than a
     burst of quick retries covers, so the waits get longer as we go: about half a
     minute of patience in total, instead of five seconds. */
  var BACKOFF_MS = [2000, 4000, 8000, 12000];

  function load() {
    attempt++;
    $('wpfw-cal-status').innerHTML =
      '<span class="wpfw-spinner" aria-hidden="true"></span> Loading events...';
    /* Bucketed to the minute: the browser may reuse a script response, but never
       for longer than the server-side cache would have served it anyway. */
    W.jsonp({ action: 'feed', past: STATE.past ? 1 : null,
              _cb: Math.floor(Date.now() / 60000) }, function (res) {
      if (!res || !res.ok) { fail('The calendar could not be loaded.'); return; }
      attempt = 0;
      ALL = res.events || [];
      if (!STATE.past) UPCOMING = ALL;
      VOCAB = res.tags || [];
      if (res.dcf_label) DCF_LABEL = res.dcf_label;
      if (res.station_label) $('wpfw-station-toggle-label').textContent = res.station_label;
      $('wpfw-cal-disclaimer').textContent = res.disclaimer || '';
      if (res.purpose) { var pu = $('wpfw-purpose'); if (pu) pu.textContent = res.purpose; }
      if (res.onair_pitch) {
        var op = $('wpfw-onairpitch'), ot = $('wpfw-onairpitch-text');
        if (ot) ot.textContent = res.onair_pitch;
        if (op) op.hidden = false;
      }
      META.broadcast = res.broadcast_notice || '';
      META.notify = res.notify !== false;
      META.listEnabled = res.list_enabled !== false;
      if (res.list_pitch) META.listPitch = res.list_pitch;
      buildDcfFilter();
      buildFilters();
      // Upcoming only. Past events are not useful search results.
      W.writeJsonLd(STATE.past ? [] :
        W.buildEventJsonLd(ALL.slice(0, 50), location.origin + location.pathname));
      render();
    }, function (err) { fail(err && err.message); });
  }

  /**
   * Apps Script sleeps when idle and the first request after a quiet spell can crawl.
   * One slow start is not a broken calendar, so try again before saying anything.
   */
  function fail(msg) {
    var s = $('wpfw-cal-status');
    if (attempt < TRIES) {
      s.innerHTML = '<span class="wpfw-spinner" aria-hidden="true"></span> ' +
        'Waking up the calendar server, one moment... (' + attempt + ' of ' + TRIES + ')';
      setTimeout(load, BACKOFF_MS[attempt - 1] || 12000);
      return;
    }
    s.textContent = msg || 'The calendar could not be loaded.';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'wpfw-retry'; b.textContent = 'Try again';
    b.addEventListener('click', function () { attempt = 0; load(); });
    s.appendChild(b);
  }

  /* ---------------- filters ---------------- */

  /** Only tags that actually have events behind them get a chip. No dead filters. */
  function buildFilters() {
    var counts = {};
    ALL.forEach(function (e) {
      (e.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
    });
    var order = (VOCAB.length ? VOCAB : Object.keys(counts))
      .filter(function (t) { return counts[t]; });

    var host = $('wpfw-filters');
    host.innerHTML = '';
    [null].concat(order).forEach(function (t) {
      var key = t === null ? 'all' : t;
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t === null ? 'All events' : t;
      if (t !== null) b.setAttribute('title', counts[t] + (counts[t] === 1 ? ' event' : ' events'));
      b.setAttribute('aria-pressed', String(STATE.tag === key));
      b.addEventListener('click', function () {
        STATE.tag = key; STATE.day = null; STATE.eventId = null;
        writeHash(); render();
      });
      host.appendChild(b);
    });
  }

  /**
   * Two named shortcuts, shown only when there is something behind them.
   * These sit apart from the issue tags because they answer a different question:
   * not what the event is about, but whose event it is.
   */
  function buildDcfFilter() {
    var dcfN = ALL.filter(function (e) { return e.dcf_grantee; }).length;
    var staN = ALL.filter(function (e) { return e.station_event; }).length;

    var row = $('wpfw-dcfrow');
    if (!row) return;
    var fromHead = $('wpfw-fromhead');
    if (!dcfN && !staN) {
      row.hidden = true;
      if (fromHead) fromHead.hidden = true;
      STATE.dcf = false; STATE.station = false; return;
    }
    if (fromHead) fromHead.hidden = false;
    row.hidden = false;

    var dcfBtn = $('wpfw-dcf-toggle');
    if (!dcfBtn) return;
    dcfBtn.hidden = !dcfN;
    if (!dcfN) STATE.dcf = false;
    dcfBtn.setAttribute('aria-pressed', String(STATE.dcf));
    dcfBtn.setAttribute('title', dcfN + (dcfN === 1 ? ' listing' : ' listings'));

    var staBtn = $('wpfw-station-toggle');
    if (!staBtn) { $('wpfw-dcf-note').textContent = ''; return; }
    staBtn.hidden = !staN;
    if (!staN) STATE.station = false;
    staBtn.setAttribute('aria-pressed', String(STATE.station));
    staBtn.setAttribute('title', staN + (staN === 1 ? ' listing' : ' listings'));

    var bits = [];
    if (dcfN) bits.push(dcfN + ' from the Fund');
    if (staN) bits.push(staN + ' from the station');
    $('wpfw-dcf-note').textContent = bits.join(' \u00b7 ');
    syncFromAll();
  }

  /* "All events" is not a filter of its own -- it is the absence of the other two, so its
     state is derived rather than stored. Unchecking the last source filter lights it back
     up on its own, with nothing to keep in step. Guarded because Block 4 and Block 5 are
     pasted separately and an older Block 4 has no such button; an unguarded call here
     would take the whole calendar down rather than lose one control. */
  function syncFromAll() {
    var b = $('wpfw-from-all');
    if (b) b.setAttribute('aria-pressed', String(!STATE.dcf && !STATE.station));
  }

  function filtered() {
    updateSubscribe();
    var out = STATE.tag === 'all' ? ALL : ALL.filter(function (e) {
      return (e.tags || []).indexOf(STATE.tag) >= 0;
    });
    if (STATE.dcf) out = out.filter(function (e) { return e.dcf_grantee; });
    if (STATE.station) out = out.filter(function (e) { return e.station_event; });
    return out;
  }

  /* ---------------- subscribe ---------------- */

  /**
   * The subscription follows the filters. Somebody who has narrowed the page to
   * Housing can subscribe to housing events alone, which is the whole point of
   * handing organizers a feed rather than a web page.
   */
  function subscribeParams() {
    var p = {};
    if (STATE.tag && STATE.tag !== 'all') p.tag = STATE.tag;
    if (STATE.dcf) p.dcf = 1;
    if (STATE.station) p.station = 1;
    return p;
  }

  function subscribeLabel() {
    var bits = [];
    if (STATE.tag && STATE.tag !== 'all') bits.push(STATE.tag);
    if (STATE.dcf) bits.push(DCF_LABEL);
    if (STATE.station) bits.push('WPFW station');
    return bits.length ? bits.join(' + ') + ' events' : 'every listing';
  }

  function updateSubscribe() {
    if (!$('wpfw-subscribe') || !W.icsUrl) return;
    var p = subscribeParams();
    var g = $('wpfw-sub-google'), a = $('wpfw-sub-apple'), d = $('wpfw-sub-download');
    if (g) g.href = W.googleCalUrl(p);
    if (a) a.href = W.webcalUrl(p);
    if (d) { var dp = {}; for (var k in p) dp[k] = p[k]; dp.download = 1; d.href = W.icsUrl(dp); }
    var note = $('wpfw-sub-note');
    if (note) {
      note.textContent = 'You are subscribing to ' + subscribeLabel() +
        '. New listings appear in your own calendar automatically.';
    }
  }

  function wireSubscribe() {
    var btn = $('wpfw-sub-copy');
    if (!btn || !W.icsUrl) return;
    btn.addEventListener('click', function () {
      var url = W.icsUrl(subscribeParams());
      var said = $('wpfw-sub-said');
      function ok() { if (said) { said.textContent = 'Copied.';
        setTimeout(function () { said.textContent = ''; }, 2500); } }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(ok, function () { prompt('Copy this address:', url); });
      } else {
        window.prompt('Copy this address:', url);
      }
    });
  }

  /* ---------------- put this on your site ---------------- */

  /* Any organization reading the calendar can take it away with them. That is the
     point of the thing: it is meant to be shared infrastructure, not a page. */
  function embedSnippet() {
    var what = ($('wpfw-embed-what') || {}).value || '';
    var tag = ($('wpfw-embed-tag') || {}).value || '';
    var n = ($('wpfw-embed-n') || {}).value || '5';
    var attrs = ' data-title="Social Justice Calendar"';
    if (what === 'dcf') attrs += ' data-dcf="1"';
    if (what === 'station') attrs += ' data-station="1"';
    if (tag) attrs += ' data-tag="' + tag.replace(/"/g, '&quot;') + '"';
    attrs += ' data-limit="' + n + '"';
    return '<div class="wpfw-sjc"' + attrs + '></div>\n' +
           '<script src="' + W.cfg.ENDPOINT + '?action=embedjs" async><' + '/script>';
  }

  function refreshSnippet() {
    var box = $('wpfw-embed-code');
    if (box) box.value = embedSnippet();
  }

  var embedOpener = null;

  function openEmbed(ev) {
    if (ev) ev.preventDefault();
    var m = $('wpfw-embed-modal');
    if (!m) return;
    embedOpener = document.activeElement;

    // The issue list comes from the feed, so it never drifts from the real tags.
    var sel = $('wpfw-embed-tag');
    if (sel && sel.options.length <= 1 && VOCAB.length) {
      VOCAB.forEach(function (t) {
        var o = document.createElement('option');
        o.value = t; o.textContent = t;
        sel.appendChild(o);
      });
    }
    refreshSnippet();
    m.hidden = false;
    var box = $('wpfw-embed-box');
    if (box) box.focus();
  }

  function closeEmbed() {
    var m = $('wpfw-embed-modal');
    if (!m || m.hidden) return;
    m.hidden = true;
    if (embedOpener && embedOpener.focus) embedOpener.focus();
  }

  function wireEmbed() {
    if (!$('wpfw-embed-modal')) return;      /* older Block 4 on the page */
    on('wpfw-embed-open', 'click', openEmbed);
    on('wpfw-embed-close', 'click', closeEmbed);
    ['wpfw-embed-what', 'wpfw-embed-tag', 'wpfw-embed-n'].forEach(function (id) {
      on(id, 'change', refreshSnippet);
    });
    on('wpfw-embed-modal', 'click', function (e) {
      if (e.target === $('wpfw-embed-modal')) closeEmbed();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEmbed();
    });
    on('wpfw-embed-copy', 'click', function () {
      var box = $('wpfw-embed-code');
      var said = $('wpfw-embed-said');
      function flash(t) {
        if (!said) return;
        said.textContent = t;
        setTimeout(function () { said.textContent = ''; }, 3000);
      }
      box.focus(); box.select();
      try { box.setSelectionRange(0, box.value.length); } catch (e) {}
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      if (ok) { flash('Copied.'); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(box.value).then(function () { flash('Copied.'); },
          function () { flash('Press Cmd+C now.'); });
      } else { flash('Press Cmd+C now.'); }
    });
  }

  /* ---------------- who is putting this on ---------------- */

  /**
   * An organizer's name on a card is a question a reader actually has -- who are these
   * people, and what else are they doing? Answering it from the feed we already hold
   * costs nothing and keeps somebody on the calendar instead of sending them off to
   * search for the group by name.
   */
  function orgKey(n) { return String(n || '').trim().toLowerCase(); }

  /* The archive replaces ALL when past events are shown, so an organizer's upcoming
     events have to be fetched once and kept. */
  var upcomingWaiting = null;
  function ensureUpcoming(done) {
    if (UPCOMING) { done(); return; }
    if (upcomingWaiting) { upcomingWaiting.push(done); return; }
    upcomingWaiting = [done];
    function finish(evs) {
      UPCOMING = evs || [];
      var queue = upcomingWaiting;
      upcomingWaiting = null;
      queue.forEach(function (fn) { fn(); });
    }
    W.jsonp({ action: 'feed', _cb: Math.floor(Date.now() / 60000) },
      function (res) { finish(res && res.ok ? res.events : []); },
      function () { finish([]); });
  }

  function orgProfile(name) {
    var k = orgKey(name);
    var mine = (UPCOMING || []).filter(function (e) { return orgKey(e.organization) === k; });
    mine.sort(function (a, b) {
      return String(a.start_datetime).localeCompare(String(b.start_datetime));
    });

    // Badges and a contact address are read from the archive too, so an organizer opened
    // from a past event is not described as though we know nothing about them.
    var tags = [], seen = {}, contact = '', grantee = false, station = false, display = name;
    mine.concat(ALL.filter(function (e) { return orgKey(e.organization) === k; }))
      .forEach(function (e) {
        if (e.organization) display = e.organization;
        if (e.dcf_grantee) grantee = true;
        if (e.station_event) station = true;
        if (!contact && e.public_contact) contact = e.public_contact;
        (e.tags || []).forEach(function (t) {
          if (seen[t]) return;
          seen[t] = 1;
          tags.push(t);
        });
      });

    return { name: display, events: mine, tags: tags, contact: contact,
             grantee: grantee, station: station };
  }

  function orgBodyHtml(name) {
    var p = orgProfile(name);
    var n = p.events.length;
    var next = n ? p.events[0] : null;

    var h = '<h3 class="wpfw-org-head" id="wpfw-org-title">' + W.esc(p.name) + '</h3>';

    if (p.grantee || p.station) {
      h += '<div class="wpfw-org-badges">' +
        (p.grantee ? '<span class="wpfw-tag wpfw-dcf">' + W.esc(DCF_LABEL) + '</span>' : '') +
        (p.station ? '<span class="wpfw-tag wpfw-sta">' + W.esc(STATION_LABEL) + '</span>' : '') +
        '</div>';
    }

    h += '<div class="wpfw-org-stat">' +
      '<div><span class="wpfw-org-n">' + n + '</span><span class="wpfw-org-k">' +
      (n === 1 ? 'Event coming up' : 'Events coming up') + '</span></div>' +
      (next ? '<div><span class="wpfw-org-n">' +
              W.esc(W.fmtDate(next.start_datetime, { month: 'short', day: 'numeric' })) +
              '</span><span class="wpfw-org-k">Next one</span></div>' : '') +
      '</div>';

    if (p.tags.length) {
      h += '<p class="wpfw-org-sec">What they organize around</p>' +
        '<div class="wpfw-org-tags">' + p.tags.map(function (t) {
          return '<span class="wpfw-tag">' + W.esc(t) + '</span>';
        }).join('') + '</div>';
    }

    if (p.contact) {
      h += '<p class="wpfw-org-sec">Get in touch</p>' +
        '<p style="margin:0 0 var(--wpfw-s4)">' + contactHtml(p.contact) + '</p>';
    }

    h += '<p class="wpfw-org-sec">' + (n ? 'Everything they have listed' : 'Coming up') + '</p>';

    if (!n) {
      h += '<p class="wpfw-modal-lede">Nothing else from them on the calendar right now.</p>';
    } else {
      h += '<ul class="wpfw-org-list">' + p.events.map(function (e) {
        var here = String(e.slug || e.id) === String(STATE.eventId);
        var place = W.fmtPlace(e);
        var when = e.all_day ? 'All day' : W.fmtTime(e.start_datetime);
        return '<li><a class="wpfw-org-ev" href="' +
          W.esc(hashFor({ eventId: e.slug || e.id, org: null })) + '">' +
          '<span class="wpfw-org-ev-d">' + W.esc(W.fmtDate(e.start_datetime,
            { weekday: 'short', month: 'short', day: 'numeric' })) + '</span>' +
          '<span><span class="wpfw-org-ev-t">' + W.esc(e.title) +
          (here ? ' <span class="wpfw-org-current">&mdash; you are reading this one</span>' : '') +
          '</span><span class="wpfw-org-ev-w">' +
          W.esc([when, place].filter(Boolean).join(' · ')) + '</span></span></a></li>';
      }).join('') + '</ul>';
    }

    h += '<p class="wpfw-modal-note">Organizing something yourself? ' +
      '<a href="' + W.esc(W.cfg.SUBMIT_PATH) + '">Add it to the calendar</a>.</p>';
    return h;
  }

  var orgOpener = null;
  var orgShown = null;

  function openOrg(name) {
    var m = $('wpfw-org-modal');
    if (!m) return;                            /* older Block 4 on the page */
    var body = $('wpfw-org-body');
    var wasHidden = m.hidden;
    if (wasHidden) orgOpener = document.activeElement;
    orgShown = name;

    if (!UPCOMING) {
      body.innerHTML = '<h3 class="wpfw-org-head" id="wpfw-org-title">' + W.esc(name) +
        '</h3><p class="wpfw-modal-lede"><span class="wpfw-spinner" aria-hidden="true"></span> ' +
        'Looking up their other events&hellip;</p>';
      ensureUpcoming(function () {
        // Somebody may have closed it, or opened a different organizer, while we waited.
        if (orgShown && orgKey(orgShown) === orgKey(name)) body.innerHTML = orgBodyHtml(name);
      });
    } else {
      body.innerHTML = orgBodyHtml(name);
    }

    m.hidden = false;
    if (wasHidden) $('wpfw-org-box').focus();
  }

  function hideOrg() {
    var m = $('wpfw-org-modal');
    if (!m || m.hidden) return;
    m.hidden = true;
    orgShown = null;
    if (orgOpener && orgOpener.focus) orgOpener.focus();
    orgOpener = null;
  }

  /** Close from a button or the Escape key: the address has to lose org= as well. */
  function closeOrg() {
    if (!STATE.org && !orgShown) return;
    STATE.org = null;
    writeHash();
    hideOrg();
  }

  /* The pop-up follows the address, so a link to an organizer can be sent to somebody. */
  function syncOrg() {
    var m = $('wpfw-org-modal');
    if (!m) return;
    if (STATE.org) {
      if (orgKey(STATE.org) !== orgKey(orgShown)) openOrg(STATE.org);
    } else {
      hideOrg();
    }
  }

  function wireOrg() {
    if (!$('wpfw-org-modal')) return;
    on('wpfw-org-close', 'click', closeOrg);
    on('wpfw-org-modal', 'click', function (e) {
      if (e.target === $('wpfw-org-modal')) closeOrg();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeOrg();
    });
  }

  /* ---------------- routing ---------------- */

  function readHash() {
    var h = (location.hash || '').replace(/^#/, '');
    var p = {};
    h.split('&').forEach(function (kv) {
      var i = kv.indexOf('=');
      if (i > 0) p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1));
    });
    if (p.view === 'month' || p.view === 'list') STATE.view = p.view;
    STATE.past = p.past === '1';
    if (p.tag) STATE.tag = p.tag;
    STATE.dcf = p.dcf === '1';
    STATE.station = p.station === '1';
    if (p.month && /^\d{4}-\d{2}$/.test(p.month)) STATE.month = p.month;
    STATE.eventId = p.event || null;
    STATE.day = p.day || null;
    STATE.org = p.org || null;
  }

  /**
   * The hash the page would have with these changes made. Cards and organizer names are
   * real links, so each one needs the address it points at before anybody clicks it --
   * which is also what makes them copyable, openable in a new tab, and reachable with
   * the back button.
   */
  function hashFor(over) {
    var st = { view: STATE.view, past: STATE.past, tag: STATE.tag, dcf: STATE.dcf,
               station: STATE.station, month: STATE.month, day: STATE.day,
               eventId: STATE.eventId, org: STATE.org };
    if (over) {
      for (var k in over) {
        if (Object.prototype.hasOwnProperty.call(over, k)) st[k] = over[k];
      }
    }
    var bits = ['view=' + st.view];
    if (st.past) bits.push('past=1');
    if (st.tag !== 'all') bits.push('tag=' + encodeURIComponent(st.tag));
    if (st.dcf) bits.push('dcf=1');
    if (st.station) bits.push('station=1');
    if (st.view === 'month' && st.month) bits.push('month=' + st.month);
    if (st.day) bits.push('day=' + st.day);
    if (st.eventId) bits.push('event=' + encodeURIComponent(st.eventId));
    if (st.org) bits.push('org=' + encodeURIComponent(st.org));
    return '#' + bits.join('&');
  }

  function writeHash() {
    var next = hashFor(null);
    if (location.hash !== next) history.replaceState(null, '', next);
  }

  /**
   * Upcoming and past are two different feeds, not two views of one list, so a hash that
   * crosses between them needs a fetch and not a redraw. Without this the back button
   * took you from the archive to Upcoming with the archive's events still in ALL, and
   * relabelled them rather than reloading.
   */
  window.addEventListener('hashchange', function () {
    var wasPast = STATE.past;
    readHash();
    if (STATE.past !== wasPast) { ALL = []; attempt = 0; load(); return; }
    render();
  });

  /* ---------------- render ---------------- */

  function render() {
    $('wpfw-cal-status').textContent = '';
    syncOrg();

    if (STATE.eventId) { renderDetail(); return; }
    $('wpfw-cal-detail').hidden = true;
    $('wpfw-cal-browse').hidden = false;

    press('wpfw-when-upcoming', !STATE.past);
    press('wpfw-when-past', STATE.past);
    press('wpfw-view-list', STATE.view === 'list');
    press('wpfw-view-month', STATE.view === 'month');
    Array.prototype.forEach.call($('wpfw-filters').children, function (b) {
      var key = b.textContent === 'All events' ? 'all' : b.textContent;
      b.setAttribute('aria-pressed', String(key === STATE.tag));
    });

    $('wpfw-dcf-toggle').setAttribute('aria-pressed', String(STATE.dcf));
    $('wpfw-station-toggle').setAttribute('aria-pressed', String(STATE.station));
    syncFromAll();

    var evs = filtered();
    setText('wpfw-cal-count', evs.length + (evs.length === 1 ? ' event' : ' events') +
      (STATE.past ? ' in the archive' : ' listed'));

    if (STATE.view === 'list') {
      $('wpfw-cal-month').hidden = true;
      $('wpfw-cal-list').hidden = false;
      renderList(evs);
    } else {
      $('wpfw-cal-list').hidden = true;
      $('wpfw-cal-month').hidden = false;
      renderMonth(evs);
    }
  }

  function renderList(evs) {
    var host = $('wpfw-cal-list');
    host.innerHTML = '';
    if (STATE.past) {
      host.innerHTML = '<p class="wpfw-past-note">These have already happened. They stay here so ' +
        'you can see what has been going on around the District.</p>';
    }
    if (!evs.length) {
      var filtered_ = STATE.tag !== 'all' || STATE.dcf || STATE.station;
      host.innerHTML = '<div class="wpfw-empty">' +
        '<p class="head">' + (STATE.past
            ? 'Nothing in the archive yet.'
            : (filtered_ ? 'Nothing in this filter right now.'
                         : 'Nothing on the calendar just yet.')) + '</p>' +
        '<p>' + (filtered_
            ? 'Try "All events" to see everything that is coming up.'
            : 'This calendar fills as organizations send us what they have coming up. ' +
              'If yours has something planned, we would like to list it.') + '</p>' +
        (STATE.past ? '' :
          '<a class="wpfw-cta-btn" href="' + W.esc(W.cfg.SUBMIT_PATH) + '">Submit an event</a>') +
        '</div>';
      return;
    }
    var byDay = {}, order = [];
    evs.forEach(function (e) {
      var k = W.dayKey(e.start_datetime);
      if (!byDay[k]) { byDay[k] = []; order.push(k); }
      byDay[k].push(e);
    });
    order.forEach(function (k) {
      var g = document.createElement('section');
      g.className = 'wpfw-daygroup';
      var h = document.createElement('h3');
      h.className = 'wpfw-dayhead';
      /* dayKey() has nothing to key an undated event on, so they all land under "". The
         feed sorts them first, which puts this group at the top where it belongs. */
      if (!k) {
        h.textContent = 'Date to be announced';
        g.appendChild(h);
        byDay[k].forEach(function (e) { g.appendChild(card(e)); });
        host.appendChild(g);
        return;
      }
      h.textContent = W.fmtDate(byDay[k][0].start_datetime,
        { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      g.appendChild(h);
      byDay[k].forEach(function (e) { g.appendChild(card(e)); });
      host.appendChild(g);
    });
  }

  /** Free reads differently from a price, so it looks different. */
  function costPill(e) {
    var txt = W.fmtCost(e);
    if (!txt) return '';
    var free = /^free$/i.test(txt.trim());
    return '<span class="wpfw-costpill' + (free ? ' is-free' : '') + '">' +
      W.esc(txt) + '</span>';
  }

  function modeBadge(e) {
    if (!e.attendance_mode || !e.attendance_label) return '';
    return '<span class="wpfw-mode wpfw-mode-' + W.esc(e.attendance_mode) + '">' +
      W.esc(e.attendance_label) + '</span>';
  }

  function orgLink(name, cls) {
    if (!name) return '';
    return '<a class="wpfw-orglink' + (cls ? ' ' + cls : '') + '" href="' +
      W.esc(hashFor({ org: name })) + '">' + W.esc(name) + '</a>';
  }

  /* The card used to be one big button, which meant the organizer's name could only ever
     be text -- a link inside a button is not something a browser will honor. It is a
     plain element now holding two real links: the event, and whoever is putting it on.
     Clicking anywhere else still opens the event. */
  function card(e) {
    var b = document.createElement('div');
    b.className = 'wpfw-card';
    var thumb = W.safeUrl(e.image_url);
    var place = W.fmtPlace(e);
    b.innerHTML =
      '<span class="wpfw-card-row">' +
      // The time gets its own column. Every card then starts at the same place, so a
      // reader can run down one edge comparing times without reading anything else.
      '<span class="wpfw-card-when">' +
        W.esc(e.all_day ? 'All day' : W.fmtTime(e.start_datetime)) +
        // The finishing time was only ever on the event's own page. It belongs here:
        // "can I get there after work and still make it" is a list-view question.
        ((!e.all_day && e.end_datetime)
          ? '<span class="wpfw-card-until">until ' + W.esc(W.fmtTime(e.end_datetime)) + '</span>'
          : '') +
        '</span>' +
      '<span class="wpfw-card-main">' +
      '<a class="wpfw-card-title" href="' +
        W.esc(hashFor({ eventId: e.slug || e.id, org: null })) + '">' +
        W.esc(e.title) + '</a>' +
      '<span class="wpfw-card-meta">' + W.esc(place || '') +
      (place ? ' &middot; ' : '') + orgLink(e.organization) + '</span>' +
      // Two bands, because they answer different questions. The first is practical --
      // can I get to this, can I afford it. The second is what it is about and who is
      // behind it. Mixing them into one run of chips made neither easy to scan.
      '<span class="wpfw-card-facts">' + modeBadge(e) + costPill(e) + '</span>' +
      '<span class="wpfw-card-desc">' + W.esc(e.short_description) + '</span>' +
      '<span class="wpfw-card-tags">' +
      (e.tags || []).map(function (t) {
        return '<span class="wpfw-tag">' + W.esc(t) + '</span>';
      }).join('') +
      (e.station_event ? '<span class="wpfw-tag wpfw-sta">' + W.esc(STATION_LABEL) + '</span>' : '') +
      (e.dcf_grantee ? '<span class="wpfw-tag wpfw-dcf">' + W.esc(DCF_LABEL) + '</span>' : '') +
      '</span>' +
      '</span>' +
      (thumb ? '<img class="wpfw-card-thumb" src="' + W.esc(thumb) + '" alt="" loading="lazy" ' +
               'onerror="this.style.display=\'none\'">' : '') +
      '</span>';
    // The links do their own work; this only catches clicks on the rest of the card.
    b.addEventListener('click', function (ev) {
      if (ev.target && ev.target.closest && ev.target.closest('a')) return;
      if (ev.defaultPrevented) return;
      location.hash = hashFor({ eventId: e.slug || e.id, org: null });
    });
    return b;
  }

  /* ---------------- month ---------------- */

  function monthKeyOf(iso) { return W.dayKey(iso).slice(0, 7); }

  function renderMonth(evs) {
    if (!STATE.month) {
      /* evs[0] is whatever the feed sorted first, and undated events sort first. Taking
         its month would hand parseInt an empty string and render a NaN grid, so the month
         comes from the first event that actually has one. */
      var firstDated = null;
      for (var fi = 0; fi < evs.length; fi++) {
        if (evs[fi].start_datetime) { firstDated = evs[fi]; break; }
      }
      STATE.month = firstDated ? monthKeyOf(firstDated.start_datetime)
                               : W.dayKey(new Date().toISOString()).slice(0, 7);
    }
    var y = parseInt(STATE.month.slice(0, 4), 10);
    var m = parseInt(STATE.month.slice(5, 7), 10) - 1;

    $('wpfw-monthlabel').textContent =
      new Date(y, m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    var byDay = {};
    evs.forEach(function (e) {
      var k = W.dayKey(e.start_datetime);
      (byDay[k] = byDay[k] || []).push(e);
    });

    var first = new Date(y, m, 1);
    var startOffset = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var todayKey = W.dayKey(new Date().toISOString());

    var html = '<table class="wpfw-grid"><caption>Events in ' +
      W.esc($('wpfw-monthlabel').textContent) +
      '. Choose a day to see what is on.</caption><thead><tr>';
    WEEKDAYS.forEach(function (d) {
      html += '<th scope="col"><abbr title="' + d + 'day">' + d + '</abbr></th>';
    });
    html += '</tr></thead><tbody>';

    var cell = 0;
    var total = startOffset + daysInMonth;
    var rows = Math.ceil(total / 7);
    for (var r = 0; r < rows; r++) {
      html += '<tr>';
      for (var c = 0; c < 7; c++, cell++) {
        var dayNum = cell - startOffset + 1;
        if (dayNum < 1 || dayNum > daysInMonth) { html += '<td class="out"></td>'; continue; }
        var key = STATE.month + '-' + (dayNum < 10 ? '0' + dayNum : dayNum);
        var list = byDay[key] || [];
        var isToday = key === todayKey;
        html += '<td' + (isToday ? ' class="wpfw-today"' : '') + '>' +
          '<button type="button" class="wpfw-daybtn" data-day="' + key + '"' +
          (list.length ? '' : ' disabled') +
          ' aria-pressed="' + (STATE.day === key) + '"' +
          ' aria-label="' + W.esc(W.fmtDate(key + 'T12:00:00', { weekday: 'long', month: 'long', day: 'numeric' })) +
          ', ' + list.length + (list.length === 1 ? ' event' : ' events') + '">' +
          '<span class="wpfw-daynum">' + dayNum + '</span>';
        if (list.length) {
          html += '<span class="wpfw-dots" aria-hidden="true">';
          for (var i = 0; i < Math.min(list.length, 5); i++) html += '<span class="wpfw-dot"></span>';
          html += '</span><span class="wpfw-daytitles" aria-hidden="true">';
          list.slice(0, 2).forEach(function (e) {
            html += '<span class="wpfw-daytitle">' + W.esc(e.title) + '</span>';
          });
          if (list.length > 2) {
            html += '<span class="wpfw-daymore">+' + (list.length - 2) + ' more</span>';
          }
          html += '</span>';
        }
        html += '</button></td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';

    /* A grid of days cannot hold an event with no day. Rather than let them disappear
       every time somebody switches to Month, name them under the grid with a way through
       to the full listing. */
    var undated = evs.filter(function (e) { return !e.start_datetime; });
    if (undated.length) {
      html += '<div class="wpfw-undated"><h3>Date to be announced</h3><ul>';
      undated.forEach(function (e) {
        html += '<li><a href="' + W.esc(hashFor({ eventId: e.slug || e.id })) + '">' +
          W.esc(e.title) + '</a></li>';
      });
      html += '</ul></div>';
    }

    $('wpfw-gridhost').innerHTML = html;

    Array.prototype.forEach.call($('wpfw-gridhost').querySelectorAll('.wpfw-daybtn'), function (b) {
      b.addEventListener('click', function () {
        STATE.day = this.getAttribute('data-day');
        writeHash(); renderMonth(filtered());
      });
    });

    showDayPanel(byDay);
    updateMonthNav(evs);
  }

  function showDayPanel(byDay) {
    var panel = $('wpfw-daypanel');
    if (!STATE.day || !byDay[STATE.day]) { panel.hidden = true; panel.innerHTML = ''; return; }
    panel.hidden = false;
    panel.innerHTML = '';
    var h = document.createElement('h3');
    h.className = 'wpfw-dayhead';
    h.style.marginTop = '16px';
    h.textContent = W.fmtDate(STATE.day + 'T12:00:00',
      { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    panel.appendChild(h);
    byDay[STATE.day].forEach(function (e) { panel.appendChild(card(e)); });
  }

  function updateMonthNav(evs) {
    var months = {};
    evs.forEach(function (e) { months[monthKeyOf(e.start_datetime)] = true; });
    var keys = Object.keys(months).sort();
    var earlier = keys.filter(function (k) { return k < STATE.month; });
    var later   = keys.filter(function (k) { return k > STATE.month; });

    /* Only offer a month that actually has something in it. */
    $('wpfw-prev').disabled = earlier.length === 0;
    $('wpfw-next').disabled = later.length === 0;
    $('wpfw-prev').setAttribute('data-target', earlier.length ? earlier[earlier.length - 1] : '');
    $('wpfw-next').setAttribute('data-target', later.length ? later[0] : '');

    $('wpfw-prev').onclick = function () { goToMonth(this.getAttribute('data-target')); };
    $('wpfw-next').onclick = function () { goToMonth(this.getAttribute('data-target')); };
  }

  function goToMonth(key) {
    if (!key) return;
    STATE.month = key;
    STATE.day = null;
    writeHash();
    renderMonth(filtered());
    $('wpfw-monthlabel').setAttribute('tabindex', '-1');
    $('wpfw-monthlabel').focus();
  }

  /* ---------------- detail ---------------- */

  function renderDetail() {
    var e = null;
    var want = String(STATE.eventId).toLowerCase();
    for (var i = 0; i < ALL.length; i++) {
      if (ALL[i].id === STATE.eventId || String(ALL[i].slug).toLowerCase() === want) {
        e = ALL[i]; break;
      }
    }

    var host = $('wpfw-cal-detail');
    $('wpfw-cal-browse').hidden = true;
    host.hidden = false;
    host.innerHTML = '';

    var back = document.createElement('button');
    back.type = 'button';
    back.className = 'wpfw-back';
    back.textContent = 'Back to the calendar';   /* the arrow is drawn by CSS */
    back.addEventListener('click', function () {
      STATE.eventId = null; writeHash(); render();
      var t = $('wpfw-view-list'); if (t) t.focus();
    });
    host.appendChild(back);

    if (!e) {
      var p = document.createElement('div');
      p.className = 'wpfw-empty';
      p.innerHTML = '<p class="head">That event is no longer listed.</p>' +
        '<p>It may have already happened, or been taken down.</p>' +
        '<a class="wpfw-cta-btn" href="' + W.esc(W.cfg.CALENDAR_PATH) + '">See what is coming up</a>';
      host.appendChild(p);
      host.focus();
      return;
    }

    var img = W.safeUrl(e.image_url);
    var ticket = W.safeUrl(e.ticket_url);
    var online = W.safeUrl(e.online_url);

    var address = [e.street_address, e.city && (e.city + (e.state ? ', ' + e.state : '')), e.zip]
      .filter(Boolean).join(', ');
    var mapQuery = [e.venue_name, address].filter(Boolean).join(', ');

    var html = '';
    if (img) {
      html += '<img class="wpfw-detail-img" src="' + W.esc(img) + '" alt="" loading="lazy">';
    }
    html += (e.tags || []).map(function (t) {
      return '<span class="wpfw-tag">' + W.esc(t) + '</span> ';
    }).join('');
    if (e.station_event) {
      html += ' <span class="wpfw-tag wpfw-sta">' + W.esc(STATION_LABEL) + '</span>';
    }
    if (e.dcf_grantee) {
      html += ' <span class="wpfw-tag wpfw-dcf">' + W.esc(DCF_LABEL) + '</span>';
    }
    html += '<h2>' + W.esc(e.title) + '</h2>';
    html += '<p class="wpfw-detail-org">Presented by ' + orgLink(e.organization) + '</p>';

    if (e.attendance_mode) html += '<p style="margin:0 0 14px">' + modeBadge(e) + '</p>';

    html += '<dl class="wpfw-facts">';
    html += fact('When', W.esc(W.fmtWhen(e)) + (e.is_repeat ? '<br><span style="font-size:14px;color:var(--wpfw-muted);">Repeats weekly</span>' : ''));
    if (e.venue_name || address) {
      var place = W.esc(e.venue_name || '');
      if (address) place += (place ? '<br>' : '') + W.esc(address);
      if (mapQuery) {
        place += '<br><a href="https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(mapQuery) + '" target="_blank" rel="noopener noreferrer">Open in maps</a>';
      }
      html += fact('Where', place);
    }
    if (online) {
      html += fact('Online', '<a class="wpfw-rawlink" href="' + W.esc(online) +
        '" target="_blank" rel="noopener noreferrer">' + W.esc(W.prettyUrl(online)) + '</a>');
    }
    html += fact('Cost', W.esc(W.fmtCost(e)));
    if (e.public_contact) html += fact('Contact', contactHtml(e.public_contact));
    if (e.dcf_grantee) html += fact('Funding', W.esc(DCF_LABEL));
    /* The organizer types these in so they get credited, so they are shown as written
       rather than parsed into a list -- "the Meyer Foundation and 200 neighbours" is a
       perfectly good answer and splitting it on commas would wreck it. */
    if (e.funders) html += fact('Sponsors', W.esc(e.funders));
    if (e.cosponsors) html += fact('Co-sponsors', W.esc(e.cosponsors));
    var feats = e.access_features || [];
    if (feats.length || e.accessibility_notes) {
      var accessHtml = '';
      if (feats.length) {
        accessHtml += '<span class="wpfw-accesslist">' + feats.map(function (f) {
          return '<span class="wpfw-accesspill">' + W.esc(f) + '</span>';
        }).join('') + '</span>';
      }
      if (e.accessibility_notes) {
        accessHtml += '<span class="wpfw-accessnote">' + W.esc(e.accessibility_notes) + '</span>';
      }
      html += fact('Access', accessHtml);
    }
    html += '</dl>';

    if (e.full_description) {
      html += '<div class="wpfw-detail-body">' +
        W.esc(e.full_description).split(/\n\s*\n/).map(function (para) {
          return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
        }).join('') + '</div>';
    } else {
      html += '<div class="wpfw-detail-body"><p>' + W.esc(e.short_description) + '</p></div>';
    }

    /* An .ics file needs a DTSTART. Offering the download for an undated event would
       hand somebody a file their calendar app rejects, or worse, silently misplaces. */
    if (W.icsUrl && e.start_datetime) {
      html += '<p><a class="wpfw-addcal" href="' +
        W.esc(W.icsUrl({ event: e.slug || e.id, download: 1 })) +
        '">Add to my calendar</a></p>';
    }

    if (ticket) {
      html += '<p><a class="wpfw-cta" href="' + W.esc(ticket) +
        '" target="_blank" rel="noopener noreferrer">Tickets and information</a></p>' +
        '<p style="font-size:13.5px;margin:8px 0 0;"><a class="wpfw-rawlink" href="' +
        W.esc(ticket) + '" target="_blank" rel="noopener noreferrer">' +
        W.esc(W.prettyUrl(ticket, 70)) + '</a></p>';
    }

    html += shareRow(e);
    /* Nothing to remind anybody about the day before an event with no date. The server
       refuses these politely, but offering the box at all invites a wasted action. */
    if (META.notify && e.start_datetime) html += remindBox(e);
    if (META.broadcast) html += '<p class="wpfw-onair">' + W.esc(META.broadcast) + '</p>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    host.appendChild(wrap);
    wireShare(wrap, e);
    wireRemind(wrap, e);
    host.focus();
    host.scrollIntoView({ block: 'start' });
  }

  /* A contact the organizer chose to publish. Turned into a link when it is
     obviously one, left as text otherwise, and never guessed at. */
  function contactHtml(v) {
    var raw = String(v || '').trim();
    if (/^https?:\/\//i.test(raw)) {
      return '<a class="wpfw-rawlink" href="' + W.esc(W.safeUrl(raw)) +
        '" target="_blank" rel="noopener noreferrer">' + W.esc(W.prettyUrl(raw, 60)) + '</a>';
    }
    if (/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(raw)) {
      return '<a href="mailto:' + W.esc(raw) + '">' + W.esc(raw) + '</a>';
    }
    return W.esc(raw);
  }

  /* Share links are plain URLs, not embedded widgets: no third-party script runs on
     the page, so nobody is tracked for reading a community calendar. */
  function shareRow(e) {
    var url = eventUrl(e);
    var text = e.title + ' — ' + W.fmtWhen(e);
    return '<div class="wpfw-actions">' +
      '<button type="button" class="wpfw-share" data-share="copy">Copy link</button>' +
      '<a class="wpfw-share" data-share="native" href="#" hidden>Share</a>' +
      '<a class="wpfw-share" target="_blank" rel="noopener noreferrer" href="' +
        'https://bsky.app/intent/compose?text=' + encodeURIComponent(text + ' ' + url) +
        '">Bluesky</a>' +
      '<a class="wpfw-share" target="_blank" rel="noopener noreferrer" href="' +
        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +
        '">Facebook</a>' +
      '<a class="wpfw-share" href="mailto:?subject=' + encodeURIComponent(e.title) +
        '&body=' + encodeURIComponent(text + '\n\n' + url) + '">Email</a>' +
      '<span class="wpfw-sharesaid" data-share-said></span>' +
      '</div>';
  }

  function eventUrl(e) {
    return location.origin + location.pathname + '#event=' +
      encodeURIComponent(e.slug || e.id);
  }

  function wireShare(wrap, e) {
    var said = wrap.querySelector('[data-share-said]');
    function flash(msg) {
      if (!said) return;
      said.textContent = msg;
      setTimeout(function () { said.textContent = ''; }, 2500);
    }
    var copy = wrap.querySelector('[data-share="copy"]');
    if (copy) copy.addEventListener('click', function () {
      var url = eventUrl(e);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { flash('Link copied.'); },
          function () { window.prompt('Copy this link:', url); });
      } else { window.prompt('Copy this link:', url); }
    });

    var native = wrap.querySelector('[data-share="native"]');
    if (native && navigator.share) {
      native.hidden = false;
      native.addEventListener('click', function (ev) {
        ev.preventDefault();
        navigator.share({ title: e.title, text: W.fmtWhen(e), url: eventUrl(e) })
          .catch(function () {});
      });
    }
  }

  function remindBox(e) {
    return '<div class="wpfw-remind">' +
      '<h3>Remind me about this</h3>' +
      '<p>One email the day before. Not a mailing list &mdash; your address is deleted ' +
      'once it has been sent.</p>' +
      '<div class="wpfw-remindrow">' +
        '<input type="email" data-remind-email placeholder="you@example.org" ' +
          'aria-label="Your email address for a reminder" maxlength="120">' +
        '<button type="button" class="wpfw-remindgo" data-remind-go>Remind me</button>' +
      '</div>' +
      (META.listEnabled ? '<label class="wpfw-joinbox">' +
        '<input type="checkbox" data-remind-join> ' + W.esc(META.listPitch) + '</label>' : '') +
      '<span class="wpfw-remindsaid" data-remind-said role="status" aria-live="polite"></span>' +
      '</div>';
  }

  function wireRemind(wrap, e) {
    var input = wrap.querySelector('[data-remind-email]');
    var go = wrap.querySelector('[data-remind-go]');
    var said = wrap.querySelector('[data-remind-said]');
    if (!input || !go) return;

    function say(msg, kind) {
      if (!said) return;
      said.textContent = msg || '';
      said.className = 'wpfw-remindsaid' + (kind ? ' ' + kind : '');
    }

    function send() {
      var email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
        say('That does not look like an email address.', 'bad');
        input.focus();
        return;
      }
      go.disabled = true;
      say('Signing you up...');

      function failed() {
        go.disabled = false;
        say('We could not reach the server. Please try again in a moment.', 'bad');
      }

      withToken(function (token) {
        var joinBox = wrap.querySelector('[data-remind-join]');
        W.jsonp({ action: 'notify', event: e.slug || e.id, email: email, token: token,
                  join: (joinBox && joinBox.checked) ? 1 : null },
          function (res) {
            go.disabled = false;
            if (res && res.ok) {
              say(res.message || 'Done.', 'ok');
              input.value = '';
            } else {
              // A token is single use per count; a fresh one fixes most refusals.
              if (res && res.error === 'token') NOTIFY_TOKEN = '';
              say((res && res.message) || 'That did not work. Please try again.', 'bad');
            }
          }, failed);
      }, failed);
    }

    go.addEventListener('click', send);
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); send(); }
    });
  }

  function fact(label, valueHtml) {
    return '<div><dt>' + W.esc(label) + '</dt><dd>' + valueHtml + '</dd></div>';
  }

  /* ---------------- wiring ---------------- */

  on('wpfw-from-all', 'click', function () {
    if (!STATE.dcf && !STATE.station) return;   // already showing everything
    STATE.dcf = false; STATE.station = false;
    STATE.day = null;
    writeHash(); render();
  });

  on('wpfw-dcf-toggle', 'click', function () {
    STATE.dcf = !STATE.dcf;
    STATE.day = null;
    writeHash(); render();
  });

  on('wpfw-station-toggle', 'click', function () {
    STATE.station = !STATE.station;
    STATE.day = null;
    writeHash(); render();
  });

  /** Upcoming and past are two different feeds, so switching refetches rather than filters. */
  function setPast(v) {
    if (STATE.past === v) return;
    STATE.past = v;
    STATE.day = null; STATE.month = null; STATE.eventId = null;
    writeHash();
    ALL = [];
    attempt = 0;
    load();
  }
  var hasWhenToggle = on('wpfw-when-upcoming', 'click', function () { setPast(false); });
  on('wpfw-when-past', 'click', function () { setPast(true); });
  if (!hasWhenToggle) {
    console.warn('WPFW: Block 4 on this page is older than Block 5 — the Upcoming/Past ' +
                 'toggle is missing. Repaste Block 4. Everything else still works.');
  }

  on('wpfw-view-list', 'click', function () {
    STATE.view = 'list'; STATE.day = null; writeHash(); render();
  });
  on('wpfw-view-month', 'click', function () {
    STATE.view = 'month'; writeHash(); render();
  });

  wireSubscribe();
  updateSubscribe();
  wireEmbed();
  wireOrg();

  /* The hash IS the state, so it has to be read before the first fetch decides which feed
     to ask for. This used to be read afterwards, inside the success handler, which meant
     arriving on #past=1 fetched the UPCOMING feed, then set past=true and drew upcoming
     events under the heading "in the archive". The Upcoming button then looked broken --
     it was already showing upcoming events, so clicking it changed nothing on screen. */
  readHash();
  load();
})();
  }

  function bootUpcoming() {

(function () {
  'use strict';
  if (window.__wpfwUpInit) return;
  window.__wpfwUpInit = true;

  /* Paste the same /exec URL used by the other blocks. */
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbziSAARkKzFdt9G-aVaiEzDNpUzBaK7Oa4pNhwECBHvV5VeonKYOWo3yWNSbaMY0wuW/exec";
  /* ------------------------------------------------------------------
     The published feed, read instead of calling Google directly. A CDN file
     cannot be blocked the way a script tag to script.google.com can, and it
     has no Apps Script quota behind it. Leave empty to use only the web app.
     Paste the GitHub Pages address of events.json, e.g.
       https://wpfw.github.io/calendar-feed/events.json
     ------------------------------------------------------------------ */
  var STATIC_FEED = "https://wpfwgm.github.io/wpfw-calendar-feed/events.json";

  var LIMIT = 6;
  var CALENDAR_PATH = "/social-justice-calendar";
  /* Set to true to show ONLY Diverse City Fund grantee events in this strip. */
  var DCF_ONLY = false;
  var TZ = 'America/New_York';

  var list = document.getElementById('wpfw-up-list');
  var load = document.getElementById('wpfw-up-load');
  if (!list) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Apps Script sleeps when idle, and the first request after a quiet spell can fail
     outright rather than merely crawl. This strip used to get a single attempt and then
     sit there saying it had given up, so now it waits the server out like the others. */
  /**
   * Try the published file first. Anything at all goes wrong -- not configured,
   * blocked, offline, malformed -- and we fall through to the web app, so this
   * can only ever add a way of succeeding.
   */
  function loadStatic(onSuccess, onFail) {
    if (!STATIC_FEED || typeof window.fetch !== 'function') { onFail(); return; }

    var url = STATIC_FEED + (STATIC_FEED.indexOf('?') < 0 ? '?' : '&') +
              'v=' + Math.floor(Date.now() / 60000);
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
    var opts = { credentials: 'omit', cache: 'default' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(url, opts)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (feed) {
        clearTimeout(timer);
        if (!feed || !feed.ok || !feed.events) throw new Error('unusable feed');
        if (DCF_ONLY) {
          feed.events = feed.events.filter(function (e) { return e.dcf_grantee === true; });
        }
        feed.events = feed.events.slice(0, LIMIT);
        feed.count = feed.events.length;
        onSuccess(feed);
      })
      .catch(function () { clearTimeout(timer); onFail(); });
  }

  var TRIES = 5;
  var BACKOFF_MS = [2000, 4000, 8000, 12000];
  var attempt = 0;

  function show(res) {
    if (!res || !res.ok || !res.events || !res.events.length) {
      load.textContent = 'No community events are listed right now.';
      return;
    }
    load.style.display = 'none';
    var dcfLabel = res.dcf_label || 'Diverse City Fund grantee';
    var evs = res.events.slice(0, LIMIT);

    /* This strip is "what is coming up next", ordered by date, with a date badge on every
       row. An event with no date would sit at the top of it indefinitely showing Invalid
       Date, so it waits here until it has one. It stays visible the whole time on the
       calendar and on the station events page. */
    evs = evs.filter(function (e) { return !!e.start_datetime; });
    list.innerHTML = evs.map(function (e) {
      var d = new Date(e.start_datetime);
      var mon = d.toLocaleDateString('en-US', { timeZone: TZ, month: 'short' }).toUpperCase();
      var day = d.toLocaleDateString('en-US', { timeZone: TZ, day: 'numeric' });
      var time = e.all_day ? 'All day'
        : d.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }).replace(':00', '');
      var place = e.venue_name || (e.online_url ? 'Online' : '');
      var firstTag = (e.tags && e.tags.length) ? e.tags[0] : '';
      var meta = [time, place, firstTag].filter(Boolean).join(' · ');
      var href = CALENDAR_PATH + '#event=' + encodeURIComponent(e.slug || e.id);
      return '<li class="wpfw-up-item"><a href="' + esc(href) + '">' +
        '<span class="wpfw-up-date" aria-hidden="true">' +
        '<span class="wpfw-up-mon">' + esc(mon) + '</span>' +
        '<span class="wpfw-up-day">' + esc(day) + '</span></span>' +
        '<span class="wpfw-up-body">' +
        '<span class="wpfw-up-title">' + esc(e.title) + '</span>' +
        '<span class="wpfw-up-meta">' + esc(meta) + '</span>' +
        (e.dcf_grantee ? '<span class="wpfw-up-dcf">' + esc(dcfLabel) + '</span>' : '') +
        '</span></a></li>';
    }).join('');

    /* Hand the same data to the existing homepage carousel. */
    window.WPFW_UPCOMING = evs;
    try {
      window.dispatchEvent(new CustomEvent('wpfw:upcoming', { detail: evs }));
    } catch (err) { /* older browsers: WPFW_UPCOMING is still readable */ }
  }

  var QUERY = 'action=feed&limit=' + LIMIT + (DCF_ONLY ? '&dcf=1' : '');

  /**
   * Cross-origin fetch with NO credentials, tried before the script tag below.
   *
   * A <script> tag sends cookies, and for anyone signed into more than one Google
   * account script.google.com answers a cookie-bearing /macros/s/.../exec request with
   * a 503 and a redirect to /macros/u/<n>/s/.../exec, which a script tag cannot follow.
   * Sending no cookies skips that account routing. The web app always wraps its answer
   * in a callback -- there is no raw-JSON mode -- so the wrapper comes off here.
   */
  function fetchDirect(onOk, onFail) {
    if (typeof window.fetch !== 'function') { onFail(); return; }
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var done = false;
    var timer = setTimeout(function () {
      if (done) return; done = true;
      if (ctrl) ctrl.abort();
      onFail();
    }, 25000);
    var opts = { credentials: 'omit', cache: 'no-store' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(ENDPOINT + '?' + QUERY + '&_cb=' + Math.floor(Date.now() / 60000), opts)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.text(); })
      .then(function (t) {
        if (done) return; done = true; clearTimeout(timer);
        var a = t.indexOf('('), b = t.lastIndexOf(')');
        if (a < 0 || b <= a) { onFail(); return; }
        var res; try { res = JSON.parse(t.slice(a + 1, b)); } catch (e) { onFail(); return; }
        onOk(res);
      })
      .catch(function () {
        if (done) return; done = true; clearTimeout(timer);
        onFail();
      });
  }

  function fetchUpcoming() {
    fetchDirect(show, fetchUpcomingJsonp);
  }

  function fetchUpcomingJsonp() {
    attempt++;
    var name = 'wpfwUp' + Math.floor(Math.random() * 1e9);
    var s = document.createElement('script');
    var done = false;

    function cleanup() {
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (s.parentNode) s.parentNode.removeChild(s);
    }
    function retry(msg) {
      if (attempt < TRIES) { setTimeout(fetchUpcomingJsonp, BACKOFF_MS[attempt - 1] || 12000); return; }
      load.textContent = msg;
    }

    var timer = setTimeout(function () {
      if (done) return; done = true; cleanup();
      retry('Events are taking a moment to load.');
    }, 25000);

    window[name] = function (res) {
      if (done) return; done = true; clearTimeout(timer); cleanup();
      show(res);
    };

    s.onerror = function () {
      if (done) return; done = true; clearTimeout(timer); cleanup();
      retry('Events could not be loaded right now.');
    };

    s.src = ENDPOINT + '?' + QUERY + '&callback=' + name +
      '&_cb=' + Math.floor(Date.now() / 60000);
    s.async = true;
    document.head.appendChild(s);
  }

  /* Published file first, web app if that cannot be reached. */
  loadStatic(show, fetchUpcoming);
})();
  }

  function bootStation() {

(function () {
  'use strict';
  if (window.__wpfwStationInit) return;   /* Squarespace can re-run a block on soft navigation */
  window.__wpfwStationInit = true;

  /* Same deployment as the rest of the calendar. Nothing secret lives here. */
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbziSAARkKzFdt9G-aVaiEzDNpUzBaK7Oa4pNhwECBHvV5VeonKYOWo3yWNSbaMY0wuW/exec";
  /* ------------------------------------------------------------------
     The published feed, read instead of calling Google directly. A CDN file
     cannot be blocked the way a script tag to script.google.com can, and it
     has no Apps Script quota behind it. Leave empty to use only the web app.
     Paste the GitHub Pages address of events.json, e.g.
       https://wpfw.github.io/calendar-feed/events.json
     ------------------------------------------------------------------ */
  var STATIC_FEED = "https://wpfwgm.github.io/wpfw-calendar-feed/events.json";

  var CALENDAR_PATH = "/social-justice-calendar";
  var TZ = 'America/New_York';
  var TIMEOUT_MS = 35000;
  var TRIES = 5;
  /* The web app sleeps. Waking it can throw errors for a good deal longer than a
     burst of quick retries covers, so the waits get longer as we go: about half a
     minute of patience in total, instead of five seconds. */
  var BACKOFF_MS = [2000, 4000, 8000, 12000];

  var out = document.getElementById('wpfw-se-out');
  var statusEl = document.getElementById('wpfw-se-status');
  if (!out) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function d(iso) { var x = new Date(iso); return isNaN(x.getTime()) ? null : x; }
  function part(iso, opts) {
    var x = d(iso); if (!x) return '';
    var o = { timeZone: TZ }; for (var k in opts) o[k] = opts[k];
    return x.toLocaleDateString('en-US', o);
  }
  function time(iso) {
    var x = d(iso); if (!x) return '';
    return x.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
      .replace(':00', '').replace(' AM', ' a.m.').replace(' PM', ' p.m.');
  }
  function money(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return '';
    return /^\d+(\.\d{1,2})?$/.test(s) ? '$' + s : s;
  }
  function cost(e) {
    if (e.cost_type === 'free') return 'Free';
    if (e.cost_type === 'donation') {
      var m = money(e.cost_amount);
      return m ? 'Suggested donation ' + m : 'Suggested donation';
    }
    return money(e.cost_amount) || 'Ticketed';
  }
  function safeUrl(u) { return /^https?:\/\//i.test(String(u || '')) ? String(u) : ''; }
  function place(e) {
    if (e.venue_name) return e.venue_name + (e.city ? ', ' + e.city : '');
    return e.online_url ? 'Online' : '';
  }

  /**
   * Try the published file first. Anything at all goes wrong -- not configured,
   * blocked, offline, malformed -- and we fall through to the web app, so this
   * can only ever add a way of succeeding.
   */
  function loadStatic(onSuccess, onFail) {
    if (!STATIC_FEED || typeof window.fetch !== 'function') { onFail(); return; }

    var url = STATIC_FEED + (STATIC_FEED.indexOf('?') < 0 ? '?' : '&') +
              'v=' + Math.floor(Date.now() / 60000);
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
    var opts = { credentials: 'omit', cache: 'default' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(url, opts)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (feed) {
        clearTimeout(timer);
        if (!feed || !feed.ok || !feed.events) throw new Error('unusable feed');
        /* The published file carries every listing; this page wants WPFW's own. */
        feed.events = feed.events.filter(function (e) { return e.station_event === true; });
        feed.count = feed.events.length;
        onSuccess(feed);
      })
      .catch(function () { clearTimeout(timer); onFail(); });
  }

  var attempt = 0;

  /**
   * Cross-origin fetch with NO credentials, tried before the script tag below.
   *
   * A <script> tag sends cookies, and for anyone signed into more than one Google
   * account script.google.com answers a cookie-bearing /macros/s/.../exec request with
   * a 503 and a redirect to /macros/u/<n>/s/.../exec, which a script tag cannot follow.
   * Sending no cookies skips that account routing. The web app always wraps its answer
   * in a callback -- there is no raw-JSON mode -- so the wrapper comes off here.
   */
  function fetchDirect(onOk, onFail) {
    if (typeof window.fetch !== 'function') { onFail(); return; }
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var done = false;
    var timer = setTimeout(function () {
      if (done) return; done = true;
      if (ctrl) ctrl.abort();
      onFail();
    }, TIMEOUT_MS);
    var opts = { credentials: 'omit', cache: 'no-store' };
    if (ctrl) opts.signal = ctrl.signal;

    fetch(ENDPOINT + '?action=feed&station=1&_cb=' + Math.floor(Date.now() / 60000), opts)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.text(); })
      .then(function (t) {
        if (done) return; done = true; clearTimeout(timer);
        var a = t.indexOf('('), b = t.lastIndexOf(')');
        if (a < 0 || b <= a) { onFail(); return; }
        var res; try { res = JSON.parse(t.slice(a + 1, b)); } catch (e) { onFail(); return; }
        if (!res || !res.ok) { onFail(); return; }
        attempt = 0;
        render(res);
      })
      .catch(function () {
        if (done) return; done = true; clearTimeout(timer);
        onFail();
      });
  }

  function load() {
    statusEl.innerHTML = '<span class="wpfw-se-spin" aria-hidden="true"></span>Loading station events...';
    fetchDirect(render, loadJsonp);
  }

  function loadJsonp() {
    attempt++;
    statusEl.innerHTML = '<span class="wpfw-se-spin" aria-hidden="true"></span>Loading station events...';

    var name = 'wpfwSe' + Math.floor(Math.random() * 1e9);
    var s = document.createElement('script');
    var done = false;

    function cleanup() {
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (s.parentNode) s.parentNode.removeChild(s);
    }
    function fail(msg) {
      if (attempt < TRIES) {
        statusEl.textContent = 'Waking up the calendar server, one moment... (' + attempt + ' of ' + TRIES + ')';
        setTimeout(loadJsonp, BACKOFF_MS[attempt - 1] || 12000);
        return;
      }
      statusEl.textContent = msg;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'wpfw-se-retry'; b.textContent = 'Try again';
      b.addEventListener('click', function () { attempt = 0; load(); });
      statusEl.appendChild(b);
    }

    var timer = setTimeout(function () {
      if (done) return; done = true; cleanup();
      fail('The events did not load in time.');
    }, TIMEOUT_MS);

    window[name] = function (res) {
      if (done) return; done = true; clearTimeout(timer); cleanup();
      if (!res || !res.ok) { fail('The events could not be loaded.'); return; }
      attempt = 0;
      render(res);
    };
    s.onerror = function () {
      if (done) return; done = true; clearTimeout(timer); cleanup();
      fail('We could not reach the calendar server.');
    };

    /* station=1 does the filtering on the server, so this page never sees anything else. */
    s.src = ENDPOINT + '?action=feed&station=1&callback=' + name +
            '&_cb=' + Math.floor(Date.now() / 60000);
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  }

  /** Same schema.org Event markup as the calendar, for this page's own listings. */
  function writeJsonLd(evs) {
    try {
      var prev = document.getElementById('wpfw-se-jsonld');
      if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
      if (!evs.length) return;
      var page = location.origin + CALENDAR_PATH;
      function num(v) {
        var m = String(v == null ? '' : v).trim().replace(/^\$/, '');
        return /^\d+(\.\d{1,2})?$/.test(m) ? m : null;
      }
      var nodes = evs.slice(0, 50).map(function (e) {
        var online = safeUrl(e.online_url);
        var hasPlace = !!(e.venue_name || e.street_address);
        var n = {
          '@context': 'https://schema.org', '@type': 'Event',
          name: e.title, startDate: e.start_datetime, endDate: e.end_datetime,
          eventStatus: 'https://schema.org/EventScheduled',
          description: e.short_description || undefined,
          url: page + '#event=' + encodeURIComponent(e.slug || e.id),
          organizer: e.organization ? { '@type': 'Organization', name: e.organization } : undefined,
          eventAttendanceMode: hasPlace && online
            ? 'https://schema.org/MixedEventAttendanceMode'
            : (online ? 'https://schema.org/OnlineEventAttendanceMode'
                      : 'https://schema.org/OfflineEventAttendanceMode')
        };
        var places = [];
        if (hasPlace) {
          var a = { '@type': 'PostalAddress', addressCountry: 'US' };
          if (e.street_address) a.streetAddress = e.street_address;
          if (e.city) a.addressLocality = e.city;
          if (e.state) a.addressRegion = e.state;
          if (e.zip) a.postalCode = e.zip;
          places.push({ '@type': 'Place', name: e.venue_name || e.city || 'Washington, DC', address: a });
        }
        if (online) places.push({ '@type': 'VirtualLocation', url: online });
        if (places.length) n.location = places.length === 1 ? places[0] : places;
        var img = safeUrl(e.image_url);
        if (img) n.image = [img];
        var price = e.cost_type === 'free' ? '0' : num(e.cost_amount);
        if (price !== null) {
          n.offers = { '@type': 'Offer', price: price, priceCurrency: 'USD',
                       availability: 'https://schema.org/InStock',
                       url: safeUrl(e.ticket_url) || n.url };
        }
        Object.keys(n).forEach(function (k) { if (n[k] === undefined) delete n[k]; });
        return n;
      });
      var tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'wpfw-se-jsonld';
      tag.textContent = JSON.stringify(nodes).replace(/</g, '\\u003c');
      (document.head || document.documentElement).appendChild(tag);
    } catch (err) { /* never break the page over markup */ }
  }

  function render(res) {
    var evs = res.events || [];
    writeJsonLd(evs);
    document.getElementById('wpfw-se-foot').textContent = res.disclaimer || '';
    statusEl.textContent = '';
    statusEl.style.padding = '0';

    if (!evs.length) {
      out.innerHTML =
        '<div class="wpfw-se-empty">' +
        '<p class="h">Nothing on the station calendar just yet.</p>' +
        '<p>When WPFW has something coming up it will show here. In the meantime there is plenty ' +
        'happening across the District.</p>' +
        '<a class="wpfw-se-cta" href="' + esc(CALENDAR_PATH) + '">See the full calendar</a>' +
        '</div>';
      return;
    }

    var html = '';
    var lastMonth = '';
    evs.forEach(function (e) {
      /* An event waiting on a new date has no month to sit under. It still belongs on
         this page -- it is one of ours and people are looking for it -- so it gets its
         own heading rather than an empty one. */
      var monthKey = e.start_datetime
        ? part(e.start_datetime, { month: 'long', year: 'numeric' })
        : 'Date to be announced';
      if (monthKey !== lastMonth) {
        if (lastMonth) html += '</ul>';
        html += '<h2 class="wpfw-se-month">' + esc(monthKey) + '</h2><ul class="wpfw-se-list">';
        lastMonth = monthKey;
      }
      var when = !e.start_datetime ? 'New date coming'
               : (e.all_day ? 'All day' : time(e.start_datetime));
      var where = place(e);
      var meta = '<strong>' + esc(when) + '</strong>' + (where ? ' &middot; ' + esc(where) : '');
      var tags = (e.tags || []).map(function (t) {
        return '<span class="wpfw-se-tag">' + esc(t) + '</span>';
      }).join('');

      html += '<li class="wpfw-se-item"><a href="' + esc(CALENDAR_PATH) + '#event=' +
        encodeURIComponent(e.slug || e.id) + '">' +
        '<span class="wpfw-se-date" aria-hidden="true">' +
          '<span class="wpfw-se-dow">' + esc(part(e.start_datetime, { weekday: 'short' })) + '</span>' +
          '<span class="wpfw-se-day">' + esc(part(e.start_datetime, { day: 'numeric' })) + '</span>' +
          '<span class="wpfw-se-mon">' +
            esc(e.start_datetime ? part(e.start_datetime, { month: 'short' }) : 'TBC') + '</span>' +
        '</span>' +
        (safeUrl(e.image_url)
          ? '<img class="wpfw-se-thumb" src="' + esc(safeUrl(e.image_url)) + '" alt="" ' +
            'loading="lazy" onerror="this.style.display=\'none\'">' : '') +
        '<span class="wpfw-se-body">' +
          '<span class="wpfw-se-title">' + esc(e.title) + '</span>' +
          '<span class="wpfw-se-meta">' + meta + '</span>' +
          '<span class="wpfw-se-desc">' + esc(e.short_description) + '</span>' +
          '<span class="wpfw-se-tags">' + tags +
            '<span class="wpfw-se-cost">' + esc(cost(e)) + '</span></span>' +
        '</span></a></li>';
    });
    if (lastMonth) html += '</ul>';
    out.innerHTML = html;
  }

  /* Block 1's helpers, on the rare page that also carries Block 1. This block is
     standalone, so usually they are simply not here and the row stays hidden. */
  var W = window.WPFW_EVENTS || {};

  (function subscribeLinks() {
    try {
      var box = document.getElementById('wpfw-se-subscribe');
      if (!box || !W.icsUrl) return;             /* no Block 1 on the page */
      document.getElementById('wpfw-se-gcal').href = W.googleCalUrl({ station: 1 });
      document.getElementById('wpfw-se-webcal').href = W.webcalUrl({ station: 1 });
      box.hidden = false;
    } catch (err) { /* never keep the events off the page over a subscribe link */ }
  }());

  /* Published file first, web app if that cannot be reached. */
  loadStatic(render, load);
})();
  }

  /* Blocks 3 and 5 expect their markup to be on the page already, and Block 1 has to
     have defined WPFW_EVENTS before either runs. That ordering was the load order of
     the code blocks before; here it is written down. */
  var VIEWS = {
    calendar: { styles: ['core', 'calendar'], markup: 'calendar', core: true,  boot: bootCalendar },
    submit:   { styles: ['core', 'form'],     markup: 'submit',   core: true,  boot: bootForm },
    station:  { styles: ['station'],          markup: 'station',  core: false, boot: bootStation },
    upcoming: { styles: ['upcoming'],         markup: 'upcoming', core: false, boot: bootUpcoming }
  };

  var coreReady = false;

  function mountOne(host) {
    var name = String(host.getAttribute('data-wpfw') || '').trim().toLowerCase();
    var view = VIEWS[name];
    if (!view) {
      /* A typo in the one line somebody pastes should say so, not fail silently on a
         page nobody is watching. */
      host.innerHTML = '<p style="font:14px/1.5 Georgia,serif;color:#9C0D0C">' +
        'This calendar block says data-wpfw="' + String(name).replace(/[<&]/g, '') +
        '". It should be calendar, submit, station or upcoming.</p>';
      return;
    }
    if (host.getAttribute('data-wpfw-ready')) return;
    host.setAttribute('data-wpfw-ready', '1');

    view.styles.forEach(addStyle);
    host.innerHTML = MARKUP[view.markup] || '';
    if (view.core && !coreReady) { bootCore(); coreReady = true; }
    view.boot();
  }

  function mount() {
    var hosts = document.querySelectorAll('[data-wpfw]');
    for (var i = 0; i < hosts.length; i++) mountOne(hosts[i]);
  }

  /* async means this can land either side of the parser finishing. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
