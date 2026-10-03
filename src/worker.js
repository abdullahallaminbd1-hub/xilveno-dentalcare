import reference from './content/reference.json';

const settings = reference.settings;
const services = reference.items.filter((item) => !item.team);
const team = reference.items.filter((item) => item.team);
const navItems = [
  ['About', '/about/'],
  ['Services', '/services/'],
  ['Our Team', '/team/'],
  ['Patient Info', '/patient-info/'],
  ['Contact', '/contact/'],
];

const iconPaths = {
  tooth: '<path d="M12 5.6C10.6 4.2 8.9 3.5 7.2 3.5 4.8 3.5 3 5.4 3 8.1c0 1.9.6 3.3 1.2 5 .5 1.5.7 3.4 1.1 5.1.3 1.3.8 2.3 1.7 2.3 1 0 1.4-1 1.7-2.6.3-1.7.5-3.6.9-5.4.3-1.4 1-2.2 2.4-2.2s2.1.8 2.4 2.2c.4 1.8.6 3.7.9 5.4.3 1.6.7 2.6 1.7 2.6.9 0 1.4-1 1.7-2.3.4-1.7.6-3.6 1.1-5.1.6-1.7 1.2-3.1 1.2-5C21 5.4 19.2 3.5 16.8 3.5c-1.7 0-3.4.7-4.8 2.1Z"/>',
  sparkle: '<path d="M12 3.2 13.7 8l4.8 1.7-4.8 1.7L12 16.2l-1.7-4.8L5.5 9.7 10.3 8 12 3.2Z"/><path d="M18 15.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.2a4.3 4.3 0 0 0 7 0"/><path d="M9.2 9.5h.01"/><path d="M14.8 9.5h.01"/>',
  shield: '<path d="M12 3 19.5 6v5.6c0 4.3-3.1 7.6-7.5 9.4-4.4-1.8-7.5-5.1-7.5-9.4V6L12 3Z"/><path d="m9 12 2.2 2.2L15.3 10"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-9.4A4.6 4.6 0 0 1 12 7.6a4.6 4.6 0 0 1 7.5 3c0 5-7.5 9.4-7.5 9.4Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17"/><path d="M8 3.2v3.6"/><path d="M16 3.2v3.6"/>',
  phone: '<path d="M6.2 3.5h3l1.8 4.6-2.3 1.4a11.5 11.5 0 0 0 5.8 5.8l1.4-2.3 4.6 1.8v3a1.8 1.8 0 0 1-2 1.8C11.4 19.2 4.8 12.6 4.4 5.5a1.8 1.8 0 0 1 1.8-2Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.2"/><path d="m3.6 7.4 8.4 5.8 8.4-5.8"/>',
  pin: '<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  arrow: '<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>',
  'arrow-left': '<path d="M19.5 12h-15"/><path d="M10.5 6l-6 6 6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  close: '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  chevron: '<path d="m6 9.5 6 6 6-6"/>',
  quote: '<path d="M9.5 6.5C6.8 6.5 5 8.4 5 11c0 2.3 1.6 4 3.7 4 1.9 0 3.2-1.3 3.2-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.8.1.3-1.2 1.3-2 2.7-2.2l-.5-.5Z"/><path d="M18.5 6.5C15.8 6.5 14 8.4 14 11c0 2.3 1.6 4 3.7 4 1.9 0 3.2-1.3 3.2-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.8.1.3-1.2 1.3-2 2.7-2.2l-.5-.5Z"/>',
  award: '<circle cx="12" cy="9.2" r="5.7"/><path d="m8.4 13.8-1.4 7 5-2.6 5 2.6-1.4-7"/>',
  users: '<circle cx="9.5" cy="8.5" r="3.6"/><path d="M3.2 19.5a6.3 6.3 0 0 1 12.6 0"/><path d="M16.2 5.3a3.6 3.6 0 0 1 0 6.9"/><path d="M17.6 14.2a6.3 6.3 0 0 1 3.2 5.3"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M9 20h6"/><path d="M12 16.5V20"/>',
  microscope: '<path d="M9 4h5"/><path d="M11.5 4v5.2L8 12.7a3 3 0 0 0 4.2 4.2l3.5-3.5"/><path d="M6 20h12"/><path d="M8.4 14.6 6.8 16.2"/>',
  zap: '<path d="M13.5 3 5.8 13.4h5.1L10.5 21l7.7-10.4h-5.1L13.5 3Z"/>',
  leaf: '<path d="M4.5 19.5C3 14 6 6.5 19.5 4.5c1 13-6.5 17-15 15Z"/><path d="M9 15c1.8-3.4 4.4-5.8 7.5-7.3"/>',
};

const esc = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const icon = (name, size = 24, className = '') => `<svg class="bs-icon${className ? ` ${className}` : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" role="presentation">${iconPaths[name] || iconPaths.tooth}</svg>`;
const linkButton = (label, href, style = 'primary', iconName = '', newTab = false, extraClass = '') => `<a class="bs-btn bs-btn--${style}${extraClass ? ` ${extraClass}` : ''}" href="${esc(href)}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}>${iconName ? icon(iconName, 18) : ''}<span>${esc(label)}</span></a>`;
const demoNote = (context = '') => `<p class="bs-demo-note"><span>Concept website${context ? ` &middot; ${esc(context)}` : ''}</span></p>`;

const palettes = {
  teal: ['#ccfbf1', '#5eead4', '#0f766e', '#115e59'],
  clinic: ['#e0f2fe', '#7dd3fc', '#0369a1', '#075985'],
  treatment: ['#d1fae5', '#6ee7b7', '#047857', '#065f46'],
  waiting: ['#fef3c7', '#fcd34d', '#b45309', '#78350f'],
};

const artShapes = (scene, p) => {
  if (scene === 'hero') return `<rect x="40" y="180" width="120" height="70" rx="16" fill="${p[1]}"/><rect x="52" y="250" width="18" height="80" rx="8" fill="${p[2]}"/><rect x="130" y="250" width="18" height="80" rx="8" fill="${p[2]}"/><path d="M60 180c0-24 20-44 44-44h34" stroke="${p[2]}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="96" cy="96" r="30" fill="${p[2]}" opacity=".85"/><rect x="200" y="96" width="120" height="86" rx="12" fill="${p[3]}" opacity=".25"/><path d="M216 148l22-26 18 16 24-32" stroke="${p[2]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (scene === 'clinic' || scene === 'room') return `<rect x="60" y="150" width="200" height="90" rx="14" fill="${p[1]}"/><rect x="74" y="240" width="20" height="70" rx="8" fill="${p[2]}"/><rect x="226" y="240" width="20" height="70" rx="8" fill="${p[2]}"/><circle cx="300" cy="110" r="34" fill="${p[3]}" opacity=".3"/><rect x="284" y="150" width="34" height="90" rx="12" fill="${p[3]}" opacity=".2"/><rect x="96" y="176" width="60" height="34" rx="8" fill="${p[2]}" opacity=".5"/>`;
  if (scene === 'treatment') return `<path d="M120 70c-12-12-28-18-44-18-24 0-40 18-40 40 0 19 6 33 12 50 5 15 7 34 11 51 3 13 8 23 17 23s14-10 17-26c3-17 5-36 9-54 3-14 10-22 24-22s21 8 24 22c4 18 6 37 9 54 3 16 7 26 17 26s14-10 17-23c4-17 6-36 11-51 6-17 12-31 12-50 0-22-16-40-40-40-16 0-32 6-44 18Z" fill="${p[1]}"/><path d="M96 118c-10 6-16 14-18 24" stroke="${p[2]}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  if (scene === 'waiting') return `<rect x="60" y="180" width="150" height="24" rx="10" fill="${p[1]}"/><rect x="72" y="204" width="16" height="46" rx="7" fill="${p[2]}"/><rect x="182" y="204" width="16" height="46" rx="7" fill="${p[2]}"/><rect x="60" y="132" width="150" height="44" rx="12" fill="${p[2]}" opacity=".45"/><circle cx="266" cy="120" r="26" fill="${p[3]}" opacity=".3"/><path d="M240 268h90" stroke="${p[3]}" stroke-width="10" stroke-linecap="round" opacity=".4"/>`;
  return `<circle cx="160" cy="122" r="54" fill="${p[1]}"/><path d="M60 320c0-56 45-100 100-100s100 44 100 100Z" fill="${p[1]}"/>`;
};

let fallbackArtId = 0;
const fallbackArt = (scene) => {
  const p = palettes[scene] || palettes.teal;
  const id = `bs-art-${++fallbackArtId}`;
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-label="" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}-wash" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="${p[1]}"/></linearGradient></defs><rect width="320" height="320" fill="url(#${id}-wash)"/>${artShapes(scene, p)}</svg>`;
};

const imageMarkup = (scene, slot, className, imageMap, alt = '') => {
  const imageClass = `bs-media${className ? ` ${className}` : ''}`;
  if (slot && imageMap[slot]) {
    return `<div class="${imageClass}"><img src="/media/${encodeURIComponent(slot)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
  }
  return `<div class="${imageClass} bs-media--art">${fallbackArt(scene)}</div>`;
};

const sectionHead = (eyebrow, title, text = '', center = true, id = '') => `<header class="bs-section-head${center ? ' bs-section-head--center' : ''}"><p class="bs-eyebrow">${esc(eyebrow)}</p><h2 class="bs-heading"${id ? ` id="${esc(id)}"` : ''}>${esc(title)}</h2>${text ? `<p class="bs-lede">${esc(text)}</p>` : ''}</header>`;
const checkList = (items, { small = false, iconSize = 19 } = {}) => `<ul class="bs-checks${small ? ' bs-checks--sm' : ''}">${items.map((item) => `<li>${icon('check', iconSize)}<span>${esc(item)}</span></li>`).join('')}</ul>`;
const hoursTable = () => `<table class="bs-hours"><caption class="screen-reader-text">Opening hours</caption><tbody>${settings.hours.map(([day, hours]) => `<tr><th scope="row">${esc(day)}</th><td>${esc(hours)}</td></tr>`).join('')}</tbody></table>`;
const directionsUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
const phoneLink = () => `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;

const formAlert = (request) => {
  if (request === 'received') return '<div class="bs-alert bs-alert--success" role="status" data-form-alert><p class="bs-alert__title">Request saved</p><p>This is a fictional demo, so no appointment has been booked and no clinic has received your details.</p></div>';
  if (request === 'invalid') return '<div class="bs-alert bs-alert--error" role="alert" data-form-alert><p class="bs-alert__title">Please check the form</p><p>Some details need attention before your request can be saved.</p></div>';
  if (request === 'rate') return '<div class="bs-alert bs-alert--error" role="alert" data-form-alert><p class="bs-alert__title">Too many requests</p><p>Please wait before trying again or call the practice.</p></div>';
  if (request === 'error') return '<div class="bs-alert bs-alert--error" role="alert" data-form-alert><p class="bs-alert__title">Request not saved</p><p>We could not save your request. Please try again.</p></div>';
  return '<div data-form-alert></div>';
};

const appointmentForm = (request, currentPath, selectedService = '') => `<div class="bs-form-wrap" id="appointment">${formAlert(request)}<form class="bs-form" method="post" action="/api/appointment" data-bs-form novalidate>
  <input type="hidden" name="started_at" value="${Date.now()}">
  <input type="hidden" name="return_to" value="${esc(currentPath)}">
  <div class="bs-field-row">
    <div class="bs-field"><label class="bs-field__label" for="bs-name">Full name <span class="bs-req" aria-hidden="true">*</span></label><input class="bs-input" type="text" id="bs-name" name="name" required minlength="2" maxlength="100" autocomplete="name" data-validate data-msg-required="Please enter your name."><span class="bs-field__error" data-error-for="name" role="alert"></span></div>
    <div class="bs-field"><label class="bs-field__label" for="bs-email">Email <span class="bs-req" aria-hidden="true">*</span></label><input class="bs-input" type="email" id="bs-email" name="email" required maxlength="254" autocomplete="email" data-validate="email" data-msg-required="Please enter your email address."><span class="bs-field__error" data-error-for="email" role="alert"></span></div>
  </div>
  <div class="bs-field-row">
    <div class="bs-field"><label class="bs-field__label" for="bs-phone">Phone <span class="bs-req" aria-hidden="true">*</span></label><input class="bs-input" type="tel" id="bs-phone" name="phone" required maxlength="25" autocomplete="tel" data-validate="phone" data-msg-required="Please enter a contact number."><span class="bs-field__error" data-error-for="phone" role="alert"></span></div>
    <div class="bs-field"><label class="bs-field__label" for="bs-service">Treatment <span class="bs-req" aria-hidden="true">*</span></label><select class="bs-select" id="bs-service" name="service" required data-service-select data-validate data-msg-required="Please choose a treatment."><option value="">Select a treatment</option>${services.map((service) => `<option value="${esc(service.slug)}"${selectedService === service.slug ? ' selected' : ''}>${esc(service.title)}</option>`).join('')}<option value="not-sure"${selectedService === 'not-sure' ? ' selected' : ''}>Not sure yet</option></select><span class="bs-field__error" data-error-for="service" role="alert"></span></div>
  </div>
  <div class="bs-field"><label class="bs-field__label" for="bs-message">How can we help?</label><textarea class="bs-textarea" id="bs-message" name="message" rows="5" maxlength="2000" placeholder="Tell us how we can help. Do not include private medical information."></textarea><span class="bs-field__hint">Optional. This concept website is not monitored by a real clinic.</span></div>
  <div class="bs-hp" aria-hidden="true"><label for="bs-website">Leave this field empty</label><input type="text" id="bs-website" name="website" tabindex="-1" autocomplete="off"></div>
  <p class="bs-form__note">Demo form only: no appointment is booked and no clinic will receive this request. Do not submit real personal or medical information. For emergencies, call emergency services or seek urgent medical care.</p>
  <button class="bs-btn bs-btn--primary bs-btn--lg" type="submit" data-sending="Sending…">${icon('calendar', 19)}<span>Request an Appointment</span></button>
</form></div>`;

const headerMarkup = () => {
  const desktopLinks = navItems.map(([label, href]) => {
    if (label !== 'Services') return `<li class="menu-item"><a class="bs-nav__link" href="${href}">${label}</a></li>`;
    return `<li class="bs-nav__item menu-item-has-children"><button class="bs-nav__toggle" type="button" aria-expanded="false" aria-controls="bs-services-menu">Services ${icon('chevron', 14)}</button><ul class="bs-nav__menu" id="bs-services-menu">${services.map((item) => `<li><a href="/services/${esc(item.slug)}/">${esc(item.title)}</a></li>`).join('')}</ul></li>`;
  }).join('');
  const drawerLinks = [
    ['Home', '/'], ...navItems,
  ].map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('');
  return `<div class="bs-emergency-strip"><div class="bs-container"><p>${icon('zap', 15)}<span>Dental emergency? Call us - we keep same-day slots.</span><a href="${phoneLink()}">${esc(settings.phone)}</a></p></div></div>
  <header class="bs-header" id="site-header"><div class="bs-container bs-header__inner"><a class="bs-brand" href="/" rel="home"><span class="bs-brand__mark">${icon('tooth', 38)}</span><span class="bs-brand__text"><span class="bs-brand__name">${esc(settings.name)}</span><span class="bs-brand__tag">${esc(settings.tagline)}</span></span></a>
  <nav aria-label="Primary"><ul class="bs-nav">${desktopLinks}</ul></nav><div class="bs-header__actions"><a class="bs-header__phone" href="${phoneLink()}">${icon('phone', 17)}<span>${esc(settings.phone)}</span></a>${linkButton('Book Appointment', '/book/', 'primary')}</div>
  <button class="bs-nav-toggle" type="button" aria-expanded="false" aria-controls="bs-drawer" aria-label="Open menu">${icon('menu', 24, 'bs-icon-menu')}${icon('close', 24, 'bs-icon-close')}</button></div></header>
  <div class="bs-drawer" id="bs-drawer"><div class="bs-drawer__backdrop" data-drawer-close></div><div class="bs-drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu"><div class="bs-drawer__head"><a class="bs-brand" href="/" rel="home"><span class="bs-brand__mark">${icon('tooth', 34)}</span><span class="bs-brand__text"><span class="bs-brand__name">${esc(settings.name)}</span></span></a><button class="bs-drawer__close" type="button" data-drawer-close aria-label="Close menu">${icon('close', 22)}</button></div><div class="bs-drawer__body"><ul class="bs-drawer__list">${drawerLinks}</ul><nav aria-label="Treatments"><h2 class="bs-footer__title">Treatments</h2><ul class="bs-drawer__sub">${services.map((item) => `<li><a href="/services/${esc(item.slug)}/">${esc(item.title)}</a></li>`).join('')}</ul></nav>  <div class="bs-drawer__contact">${linkButton('Book an Appointment', '/book/', 'primary', 'calendar', false, 'bs-btn--block')}<p><a href="${phoneLink()}">${icon('phone', 17)}<span>${esc(settings.phone)}</span></a></p><p><a href="mailto:${esc(settings.email)}">${icon('mail', 17)}<span>${esc(settings.email)}</span></a></p><p><a href="${directionsUrl()}" target="_blank" rel="noopener noreferrer">${icon('pin', 17)}<span>${esc(settings.address)}</span></a></p></div></div></div></div>`;
};

const ctaBand = () => `<section class="bs-cta-band" aria-labelledby="cta-heading"><div class="bs-container"><p class="bs-eyebrow" style="justify-content:center;color:rgba(255,255,255,.75)">Ready when you are</p><h2 id="cta-heading">Ready to Smile With Confidence?</h2><p>Book online in under a minute, or call the clinic and talk to someone directly. Either way, there is no obligation.</p><div class="bs-actions bs-actions--center">${linkButton('Book an Appointment', '/book/', 'on-dark', 'calendar')}${linkButton('Call the Clinic', phoneLink(), 'outline-light', 'phone')}</div></div></section>`;

const footerMarkup = () => `<footer class="bs-footer"><div class="bs-container"><div class="bs-footer__top"><div><a class="bs-brand" href="/"><span class="bs-brand__mark">${icon('tooth', 34)}</span><span class="bs-brand__text"><span class="bs-brand__name">${esc(settings.name)}</span><span class="bs-brand__tag">${esc(settings.tagline)}</span></span></a><p class="bs-footer__about">A calm, modern dental practice focused on comfortable appointments, clear explanations and long-term oral health.</p>${demoNote('Demo content')}</div><div><h2 class="bs-footer__title">Quick Links</h2><ul class="bs-footer__list">${[['Home', '/'], ...navItems].map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul></div><div><h2 class="bs-footer__title">Treatments</h2><ul class="bs-footer__list">${services.map((item) => `<li><a href="/services/${esc(item.slug)}/">${esc(item.title)}</a></li>`).join('')}</ul></div><div><h2 class="bs-footer__title">Contact</h2><ul class="bs-footer__list"><li><a href="${phoneLink()}">${icon('phone', 16)}<span>${esc(settings.phone)}</span></a></li><li><a href="mailto:${esc(settings.email)}">${icon('mail', 16)}<span>${esc(settings.email)}</span></a></li><li><a href="${directionsUrl()}" target="_blank" rel="noopener noreferrer">${icon('pin', 16)}<span>${esc(settings.address)}</span></a></li></ul>${hoursTable()}</div></div><div class="bs-footer__bottom"><p>© ${new Date().getUTCFullYear()} ${esc(settings.name)}. All rights reserved.</p><ul class="bs-footer__legal"><li>Fictional clinic - concept website</li><li><a href="/privacy-policy/">Privacy Policy</a></li></ul></div></div></footer>`;

const htmlPage = (title, description, body, requestUrl, env, front = false, status = 200) => {
  const base = (env.CANONICAL_BASE || 'https://dental.xilveno.shop').replace(/\/+$/, '');
  const path = requestUrl.pathname === '/' ? '/' : `${requestUrl.pathname.replace(/\/+$/, '')}/`;
  const canonical = `${base}${path}`;
  const fullTitle = title === settings.name ? title : `${title} | ${settings.name}`;
  const jsonLd = front ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', name: settings.name, description, url: `${base}/`, telephone: settings.phone, address: { '@type': 'PostalAddress', streetAddress: '18 Harbourview Parade', addressLocality: 'Brookfield', addressRegion: 'VIC', postalCode: '3050', addressCountry: 'AU' } }).replace(/</g, '\\u003c')}</script>` : '';
  const output = `<!doctype html><html lang="en" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(fullTitle)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:site_name" content="${esc(settings.name)}"><meta name="theme-color" content="#0f766e"><meta property="og:image" content="${esc(base)}/favicon.svg"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/css/style.css"><link rel="stylesheet" href="/assets/css/components.css">${jsonLd}</head><body class="bs${front ? ' bs--front' : ''}"><a class="bs-skip-link" href="#main">Skip to content</a>${headerMarkup()}<main id="main">${body}</main>${footerMarkup()}<script src="/assets/js/main.js" defer></script></body></html>`;
  return new Response(output, { status, headers: { 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-store' } });
};

const pageHead = (title, text, crumb = '', extra = '') => `<section class="bs-page-head"><div class="bs-container">${crumb ? `<nav aria-label="Breadcrumb"><ol class="bs-breadcrumbs"><li><a href="/">Home</a></li><li><span aria-current="page">${esc(crumb)}</span></li></ol></nav>` : ''}<h1 class="bs-page-head__title">${esc(title)}</h1>${text ? `<p class="bs-page-head__text">${esc(text)}</p>` : ''}${extra}</div></section>`;

const serviceCard = (item, imageMap, { showMeta = false, showLink = true, titleTag = 'h3' } = {}) => `<article class="bs-service-card" data-reveal>${imageMarkup('treatment', `service_${item.slug}`, '', imageMap, `${item.title} treatment`)}<div class="bs-service-card__body"><${titleTag} class="bs-service-card__title"><a href="/services/${esc(item.slug)}/">${esc(item.title)}</a></${titleTag}><p class="bs-service-card__text">${esc(item.excerpt)}</p>${showMeta && item.duration ? `<p class="bs-service-card__meta">${icon('clock', 15)}<span>${esc(item.duration)}</span></p>` : ''}${showLink ? `<div class="bs-service-card__foot"><a class="bs-btn bs-btn--ghost bs-link" href="/services/${esc(item.slug)}/">${icon('arrow', 18)}<span>Learn more</span></a></div>` : ''}</div></article>`;
const teamCard = (item, imageMap, linked = true) => `<article class="bs-team-card" data-reveal>${linked ? `<a href="/services/${esc(item.slug)}/" aria-label="${esc(item.title)}">${imageMarkup('team', `team_${item.slug}`, '', imageMap, `${item.title}, ${item.role}`)}</a>` : imageMarkup('team', `team_${item.slug}`, '', imageMap, `${item.title}, ${item.role}`)}<div class="bs-team-card__body"><h3 class="bs-team-card__name">${linked ? `<a href="/services/${esc(item.slug)}/">${esc(item.title)}</a>` : esc(item.title)}</h3><p class="bs-team-card__role">${esc(item.role)}</p><p class="bs-team-card__bio">${esc(item.excerpt)}</p>${linked && item.qualifications ? `<p class="bs-team-card__quals">${icon('award', 15)}<span>${esc(item.qualifications)}</span></p>` : ''}</div></article>`;

const faqs = [
  ['What happens at a first appointment?', 'We book first visits long. You will be examined, we will take X-rays only if they are useful, and we will explain what we find. No treatment is carried out on the day unless you are in pain and want it dealt with.'],
  ['What if I am nervous about dentists?', 'Tell us when you book. We will schedule you for a quieter time, explain each step before doing it, and stop whenever you want. Plenty of our patients had avoided dental care for years before coming here.'],
  ['Do you see children?', 'Yes. We see children from around their first tooth, and we keep early visits short and positive so the first visit is something they look forward to rather than dread.'],
  ['Can I use my health fund?', 'We can claim most private health fund rebates on the spot using your membership card. Bring the card with you to every visit.'],
  ['How much does a check-up cost?', 'Fees depend on what you need and how long it takes. We discuss costs before booking anything beyond a routine check-up, and larger treatment plans are always quoted in writing first.'],
  ['What should I do in a dental emergency?', 'Call us. We keep same-day slots aside for urgent problems such as severe pain, swelling or a broken tooth. If you have facial swelling, a fever, or difficulty swallowing or breathing, seek urgent medical care instead of waiting.'],
];

const homePage = (url, env, imageMap) => {
  const servicesSection = `<section class="bs-section" aria-labelledby="services-heading"><div class="bs-container">${sectionHead('What we do', 'Everyday care and everything that follows it', 'From check-ups and hygiene through to whitening, implants and urgent care - explained plainly before you decide anything.', true, 'services-heading')}<div class="bs-grid bs-grid--3">${services.slice(0, 6).map((item) => serviceCard(item, imageMap)).join('')}</div><div class="bs-actions bs-actions--center bs-services__all">${linkButton('View All Treatments', '/services/', 'outline', 'arrow')}</div></div></section>`;
  const reasons = [
    ['monitor', 'Modern diagnostics', 'Digital X-rays and intraoral cameras mean you can see the same thing we are looking at, on screen, while we explain it.'],
    ['heart', 'Gentle by default', 'We describe what we are about to do before we do it, book longer appointments, and never treat nerves as an inconvenience.'],
    ['calendar', 'Convenient appointments', 'Early and late slots, Saturday openings, same-day emergencies, and online booking that works on your phone.'],
    ['users', 'Personalised plans', 'Your treatment plan is written down, priced up front, and explained in plain language before anything is booked.'],
  ];
  const whySection = `<section class="bs-section bs-section--soft" aria-labelledby="why-heading"><div class="bs-container">${sectionHead('Why patients choose us', 'The difference is how we treat people', '', true, 'why-heading')}<div class="bs-grid bs-grid--4">${reasons.map(([name, title, text]) => `<div class="bs-card" data-reveal><span class="bs-card__icon">${icon(name, 28)}</span><h3 class="bs-card__title">${esc(title)}</h3><p class="bs-card__text">${esc(text)}</p></div>`).join('')}</div></div></section>`;
  const trustSection = `<section class="bs-section bs-section--tight" aria-labelledby="trust-heading"><div class="bs-container"><h2 id="trust-heading" class="screen-reader-text">Practice at a glance</h2><div class="bs-trust" data-reveal><div class="bs-trust__item"><span class="bs-trust__num">4</span><span class="bs-trust__label">Clinicians in one practice</span></div><div class="bs-trust__item"><span class="bs-trust__num">30</span><span class="bs-trust__label">Minute routine appointments</span></div><div class="bs-trust__item"><span class="bs-trust__num">6</span><span class="bs-trust__label">Days open, including Saturday</span></div><div class="bs-trust__item"><span class="bs-trust__num">${icon('zap', 30)}</span><span class="bs-trust__label">Same-day emergency slots kept daily</span></div></div><p class="bs-trust__note">${demoNote('Illustrative figures for a fictional practice')}</p></div></section>`;
  const aboutSection = `<section class="bs-section" aria-labelledby="about-heading"><div class="bs-container"><div class="bs-split"><div class="bs-split__media" data-reveal>${imageMarkup('clinic', 'home_about', 'bs-media--4x3 bs-media--zoom', imageMap, 'BrightSmile Dental clinic interior')}</div><div class="bs-split__body" data-reveal><p class="bs-eyebrow">About the practice</p><h2 class="bs-heading" id="about-heading">We would rather prevent than repair</h2><p class="bs-lede">BrightSmile is a small practice on purpose. Four clinicians, one location, and appointments long enough to actually talk things through.</p>${checkList(['Longer appointments than the industry average', 'Written, priced treatment plans before we begin', 'Told honestly when something does not need treating', 'Nervous patients seen first thing'])}<div class="bs-actions">${linkButton('More About Us', '/about/', 'outline', 'arrow')}</div></div></div></div></section>`;
  const teamSection = `<section class="bs-section bs-section--soft" aria-labelledby="team-heading"><div class="bs-container">${sectionHead('Meet the team', 'The people who will look after you', 'You will see the same faces at every visit, and you will be told who is treating you and what they are doing.', true, 'team-heading')}<div class="bs-grid bs-grid--4">${team.slice(0, 4).map((person) => teamCard(person, imageMap, false)).join('')}</div><div class="bs-actions bs-actions--center bs-team__all">${linkButton('Meet the Full Team', '/team/', 'outline', 'arrow')}</div></div></section>`;
  const steps = [
    ['Tell us what you need', 'Book online, call the clinic, or send a short message. If you are in pain we will find you the earliest suitable time.'],
    ['Come in for a conversation', 'Your first visit is an examination and a chat - no treatment decisions made on the spot unless you want them.'],
    ['Get a written plan', 'We explain what we found, what the options are, and what each costs. You take it away and think about it.'],
    ['Treatment at your pace', 'Book what you are comfortable with, when you are comfortable with it. Emergency patients are always prioritised.'],
  ];
  const journey = `<section class="bs-section" aria-labelledby="journey-heading"><div class="bs-container">${sectionHead('What to expect', 'Four steps, no surprises', '', true, 'journey-heading')}<div class="bs-steps">${steps.map(([title, text]) => `<div class="bs-step" data-reveal><span class="bs-step__num" aria-hidden="true"></span><div><h3 class="bs-step__title">${esc(title)}</h3><p class="bs-step__text">${esc(text)}</p></div></div>`).join('')}</div></div></section>`;
  const reviews = [
    ['I had avoided dentists for years after a bad experience elsewhere. Everything was explained before it happened, and nothing was done without asking me first. I actually have my next appointment booked.', 'Sample patient - long-term visitor'],
    ['They told me honestly that the tooth I was worried about did not need work yet. That was the first time a dentist had talked me out of treatment rather than into it.', 'Sample patient - routine care'],
    ['Booked at 9am with a broken tooth and was seen the same afternoon. The temporary fix let me get through a wedding, and the permanent one was fitted properly a fortnight later.', 'Sample patient - emergency visit'],
  ];
  const reviewSection = `<section class="bs-section bs-section--soft" aria-labelledby="reviews-heading"><div class="bs-container">${sectionHead('Patient feedback', 'How patients describe the experience', '', true, 'reviews-heading')}<div class="bs-grid bs-grid--3">${reviews.map(([text, name]) => `<figure class="bs-quote-card" data-reveal><span class="bs-quote-card__mark">${icon('quote', 32)}</span><blockquote class="bs-quote-card__text"><p>${esc(text)}</p></blockquote><figcaption class="bs-quote-card__who"><span class="bs-quote-card__avatar" aria-hidden="true">${icon('users', 22)}</span><span><span class="bs-quote-card__name">${esc(name)}</span><span class="bs-quote-card__meta">Illustrative example - not a real review</span></span></figcaption></figure>`).join('')}</div><div class="bs-reviews__note"><span class="bs-badge bs-badge--demo">Sample content</span><p>The quotes above are illustrative examples written for this fictional practice. They are not real patient reviews.</p></div></div></section>`;
  const faq = `<section class="bs-section" aria-labelledby="faq-heading"><div class="bs-container">${sectionHead('Common questions', 'Answers before you ask', '', true, 'faq-heading')}<div class="bs-accordion">${faqs.map(([question, answer], i) => `<div class="bs-accordion__item${i === 0 ? ' is-open' : ''}"><h3><button class="bs-accordion__trigger" type="button" aria-expanded="${i === 0}" aria-controls="faq-panel-${i + 1}"><span>${esc(question)}</span>${icon('plus', 22)}</button></h3><div class="bs-accordion__panel" id="faq-panel-${i + 1}" role="region"><div class="bs-accordion__inner"><div>${esc(answer)}</div></div></div></div>`).join('')}</div><div class="bs-actions bs-actions--center bs-faq__all">${linkButton('Ask Us Anything Else', '/contact/', 'outline', 'mail')}</div></div></section>`;
  const contact = `<section class="bs-section bs-section--tint" id="contact" aria-labelledby="contact-heading"><div class="bs-container"><div class="bs-split bs-split--reverse"><div class="bs-split__media" data-reveal><div class="bs-contact__info"><h2 class="bs-heading" id="contact-heading">Find us in Brookfield</h2><p class="bs-lede">Easy to reach, with parking at the door and a five-minute walk from the tram stop.</p>${contactInfo(['Address', 'Phone', 'Email'])}${hoursTable()}<div class="bs-actions">${linkButton('Get Directions', directionsUrl(), 'outline', 'pin', true)}</div></div></div><div class="bs-split__body" data-reveal><div class="bs-contact__form"><h2 class="bs-heading">Request an appointment</h2><p class="bs-lede">Send us your details and we will call you back within one business day to find a time that works.</p>${appointmentForm(url.searchParams.get('request'), '/')}</div></div></div></div></section>`;
  const hero = `<section class="bs-hero"><div class="bs-container"><div class="bs-hero__grid"><div class="bs-hero__body" data-reveal><p class="bs-eyebrow">Family &amp; general dentistry</p><h1 class="bs-hero__title">${esc(settings.heroTitle)}</h1><p class="bs-hero__text">${esc(settings.heroText)}</p><div class="bs-actions">${linkButton('Book an Appointment', '/book/', 'primary', 'calendar')}${linkButton('Explore Services', '/services/', 'outline', 'arrow')}</div><ul class="bs-hero__points"><li>${icon('check', 17)}<span>Same-day emergency slots</span></li><li>${icon('check', 17)}<span>Open Saturdays</span></li><li>${icon('check', 17)}<span>Health fund rebates claimed on site</span></li></ul>${demoNote('Fictional clinic')}</div><div class="bs-hero__media" data-reveal>${imageMarkup('hero', 'home_hero', 'bs-media--1x1 bs-media--zoom', imageMap, 'BrightSmile Dental clinic hero image')}<div class="bs-hero__badge">${icon('shield', 26)}<div><strong>Gentle by default</strong><span>Tell us if you are anxious</span></div></div></div></div></div></section>`;
  return htmlPage(settings.name, settings.tagline, `${hero}${trustSection}${servicesSection}${whySection}${aboutSection}${teamSection}${journey}${reviewSection}${faq}${contact}${ctaBand()}`, url, env, true);
};

const contactInfo = (fields) => {
  const details = {
    Address: ['pin', directionsUrl(), settings.address, true],
    Phone: ['phone', phoneLink(), settings.phone, false],
    Email: ['mail', `mailto:${settings.email}`, settings.email, false],
  };
  return `<ul class="bs-info-list">${fields.map((label) => {
    const [iconName, href, value, newTab] = details[label];
    return `<li><span class="bs-info-list__icon">${icon(iconName, 20)}</span><div><span class="bs-info-list__label">${label}</span><a class="bs-info-list__value" href="${esc(href)}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(value)}</a></div></li>`;
  }).join('')}</ul>`;
};

const contactMap = (imageMap) => `<div class="bs-map${imageMap.contact_map ? ' bs-map--has-image' : ''}" role="img" aria-label="${imageMap.contact_map ? 'Image showing the BrightSmile Dental practice location' : 'Map placeholder showing the practice location'}">${imageMap.contact_map ? `<div class="bs-map__image"><img src="/media/contact_map" alt="BrightSmile Dental practice location" loading="lazy" decoding="async"></div>` : ''}<div class="bs-map__inner"><span class="bs-map__pin">${icon('pin', 24)}</span><h3>Find us</h3><p class="bs-map__addr">${esc(settings.address)}</p><div class="bs-actions bs-actions--center">${linkButton('Open in Maps', directionsUrl(), 'outline', 'pin', true)}</div>${demoNote('Map placeholder')}</div></div>`;

const aboutPage = (imageMap) => {
  const values = [
    ['clock', 'Appointments that do not feel rushed', 'Routine visits are booked with enough time to examine, explain and answer questions - not just to get through a list.'],
    ['microscope', 'You can see what we see', 'Digital imaging and intraoral cameras let us show you the problem on screen rather than asking you to take our word for it.'],
    ['leaf', 'Prevention over repair', 'Small problems are simpler and cheaper to fix. We spend as much time on how you clean your teeth as on what we need to do.'],
  ];
  const gallery = [['about_reception', 'clinic', 'Reception'], ['about_treatment', 'treatment', 'Treatment room'], ['about_waiting', 'waiting', 'Waiting area']];
  return `${pageHead('About', 'A small practice, on purpose. Here is how we work and who you will actually see.', 'About')}<section class="bs-section"><div class="bs-container"><div class="bs-split"><div class="bs-split__body" data-reveal><div class="bs-prose">${reference.pages.about}</div></div><div class="bs-split__media" data-reveal>${imageMarkup('clinic', 'about_main', 'bs-media--4x3 bs-media--zoom', imageMap, 'BrightSmile Dental clinic interior')}</div></div></div></section><section class="bs-section bs-section--soft" aria-labelledby="values-heading"><div class="bs-container">${sectionHead('How we work', 'Three things we will not compromise on', '', true, 'values-heading')}<div class="bs-grid bs-grid--3">${values.map(([name, title, text]) => `<div class="bs-card" data-reveal><span class="bs-card__icon">${icon(name, 28)}</span><h3 class="bs-card__title">${esc(title)}</h3><p class="bs-card__text">${esc(text)}</p></div>`).join('')}</div></div></section><section class="bs-section" aria-labelledby="about-gallery-heading"><div class="bs-container">${sectionHead('Inside the practice', 'Where you will be spending your time', '', true, 'about-gallery-heading')}<div class="bs-grid bs-grid--3">${gallery.map(([slot, scene, caption]) => `<figure class="bs-gallery__item" data-reveal>${imageMarkup(scene, slot, 'bs-media--4x3 bs-media--zoom', imageMap, `BrightSmile Dental ${caption.toLowerCase()} image`)}<figcaption>${caption}</figcaption></figure>`).join('')}</div></div></section>${ctaBand()}`;
};

const teamPage = (imageMap) => `${pageHead('Our Team', 'Four clinicians, one practice. You will see the same faces at every visit, and you will always be told who is treating you and what they are doing.', 'Our Team', '<div style="margin-top:1.25rem"><span class="bs-badge bs-badge--demo">Fictional team</span><p class="bs-demo-note" style="margin-top:.6rem">These are example profiles for a fictional clinic. The people do not exist and the names are not attached to any real individual.</p></div>')}<div class="bs-section"><div class="bs-container"><div class="bs-grid bs-grid--4">${team.map((person) => teamCard(person, imageMap, true)).join('')}</div></div></div>${ctaBand()}`;

const servicesPage = (imageMap) => `<section class="bs-page-head"><div class="bs-container"><h1 class="bs-page-head__title">Treatments</h1><p class="bs-page-head__text">Routine care through to implants and urgent treatment. Every page explains what the appointment involves and who it is generally considered for - and nothing is booked without your agreement.</p><div class="bs-actions bs-breadcrumbs-wrap">${linkButton('Book an Appointment', '/book/', 'primary', 'calendar')}</div></div></section><div class="bs-section"><div class="bs-container"><div class="bs-grid bs-grid--3">${services.map((item) => serviceCard(item, imageMap, { showMeta: true, titleTag: 'h2' })).join('')}</div></div></div>${ctaBand()}`;

const detailPageHead = (item, isTeam) => `<section class="bs-page-head"><div class="bs-container"><nav aria-label="Breadcrumb"><ol class="bs-breadcrumbs"><li><a href="/">Home</a></li><li><a href="${isTeam ? '/team/' : '/services/'}">${isTeam ? 'Our Team' : 'Treatments'}</a></li><li><span aria-current="page">${esc(item.title)}</span></li></ol></nav><h1 class="bs-page-head__title">${esc(item.title)}</h1>${item.qualifications ? `<p class="bs-page-head__text">${esc(item.qualifications)}</p>` : ''}</div></section>`;

const detailPage = (item, imageMap, isTeam) => {
  const paragraphs = item.content;
  const sections = (title, lines, ordered = false) => lines.length ? `<h2>${title}</h2><${ordered ? 'ol' : 'ul'} class="bs-checks${ordered ? ' bs-checks--sm' : ''}">${lines.map((line, i) => `<li>${ordered ? `<span class="bs-check__num" aria-hidden="true">${i + 1}</span>` : icon('check', 19)}<span>${esc(line)}</span></li>`).join('')}</${ordered ? 'ol' : 'ul'}>` : '';
  const prose = `<div class="bs-prose" data-reveal>${paragraphs}${isTeam ? (item.interests.length ? `<h2>Focus and interests</h2>${checkList(item.interests)}` : '') : `${sections('What this can help with', item.benefits)}${sections('What to expect', item.expect, true)}${sections('Who this is generally considered for', item.suitable)}`}</div>`;
  const asideTitle = isTeam ? 'Book with us' : 'Ask about this treatment';
  return `${detailPageHead(item, isTeam)}<div class="bs-section"><div class="bs-container"><div class="bs-service-detail">${prose}<aside class="bs-aside-card" data-reveal>${imageMarkup(isTeam ? 'team' : 'treatment', `${isTeam ? 'team' : 'service'}_${item.slug}`, 'bs-media--4x3', imageMap, `${item.title} ${isTeam ? 'profile' : 'treatment'}`)}<h2 class="bs-aside-card__title" style="margin-top:1.25rem">${asideTitle}</h2>${item.duration && !isTeam ? `<p class="bs-aside-row">${icon('clock', 17)}<span><strong>Typical visit:</strong> ${esc(item.duration)}</span></p>` : ''}${item.feeNote ? `<p class="bs-aside-row">${icon('shield', 17)}<span>${esc(item.feeNote)}</span></p>` : ''}<p class="bs-aside-row">${icon('phone', 17)}<a href="${phoneLink()}">${esc(settings.phone)}</a></p><div class="bs-actions">${linkButton('Request Appointment', `/book/?service=${item.slug}`, 'primary', 'calendar', false, 'bs-btn--block')}</div>${demoNote('Demo profile')}</aside></div></div></div>${!isTeam ? `<section class="bs-section bs-section--soft" aria-labelledby="related-heading"><div class="bs-container">${sectionHead('Related', 'You might also be interested in', '', true, 'related-heading')}<div class="bs-grid bs-grid--3">${services.filter((entry) => entry.slug !== item.slug).slice(0, 3).map((entry) => serviceCard(entry, imageMap, { showLink: false })).join('')}</div></div></section>` : ''}${ctaBand()}`;
};

const contactPage = (url, imageMap) => `${pageHead('Contact', 'Call us for anything urgent. Use the form for everything else and we will get back to you within one business day.', 'Contact')}<div class="bs-section"><div class="bs-container"><div class="bs-split bs-split--reverse"><div class="bs-split__media" data-reveal>${contactInfo(['Phone', 'Email', 'Address'])}<h2 class="bs-heading" style="margin-top:2rem">Opening hours</h2>${hoursTable()}${contactMap(imageMap)}</div><div class="bs-split__body" data-reveal><h2 class="bs-heading">Send us a message</h2><p class="bs-lede">Appointment requests, questions about a treatment, or a query about fees. We reply within one business day.</p>${appointmentForm(url.searchParams.get('request'), '/contact/')}</div></div></div></div>`;

const bookPage = (url) => `${pageHead('Book an Appointment', 'Send your details and we will call you within one business day to confirm a time. Nothing is booked until you have agreed to it.', 'Book an Appointment')}<div class="bs-section"><div class="bs-container"><div class="bs-split"><div class="bs-split__body" data-reveal>${appointmentForm(url.searchParams.get('request'), '/book/', url.searchParams.get('service') || '')}</div><div class="bs-split__media" data-reveal><aside class="bs-aside-card"><h2 class="bs-aside-card__title">Prefer to call?</h2><p class="bs-aside-row">${icon('phone', 17)}<a href="${phoneLink()}">${esc(settings.phone)}</a></p><p class="bs-aside-row">${icon('mail', 17)}<a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a></p><h2 class="bs-aside-card__title" style="margin-top:1.5rem">Opening hours</h2>${hoursTable()}${demoNote('Fictional clinic')}</aside></div></div></div></div>`;

const patientPage = () => `${pageHead('Patient Information', 'Everything to know before your first visit, including payments, cancellations and what to do in an emergency.', 'Patient Information')}<div class="bs-section"><div class="bs-container"><div class="bs-split bs-split--reverse"><div class="bs-split__media" data-reveal><aside class="bs-aside-card"><h2 class="bs-aside-card__title">Quick answers</h2>${checkList(['First visits are examinations, not treatment', 'Fees are quoted in writing before treatment', 'Health fund rebates claimed on the spot', 'Step-free access and accessible bathroom'], { small: true, iconSize: 18 })}<div class="bs-actions" style="margin-top:1.5rem">${linkButton('Book an Appointment', '/book/', 'primary', 'calendar', false, 'bs-btn--block')}</div></aside></div><div class="bs-split__body" data-reveal><div class="bs-prose">${reference.pages['patient-info']}</div></div></div></div></div>${ctaBand()}`;

const privacyPage = () => `${pageHead('Privacy Policy', 'This fictional concept website is a design demonstration, not a real dental practice.', 'Privacy Policy')}<div class="bs-section"><div class="bs-container bs-container--narrow"><div class="bs-prose"><h2>About this demo</h2><p>BrightSmile Dental is a fictional practice. This site is a portfolio demonstration and does not provide dental services or medical advice.</p><h2>Information submitted through forms</h2><p>Do not enter real personal, contact, or health information. If you submit the demonstration appointment form, its values are stored in the demo database for up to 30 days. No clinic receives the request, and no appointment is booked. The form is not intended for emergencies.</p><h2>Technical information</h2><p>The site uses Cloudflare Worker, D1, and R2 infrastructure to serve pages, protect the form from automated abuse, and display optional demonstration images. This demo does not use WordPress or its tracking cookies.</p><h2>Contact</h2><p>Use the fictional contact details on this site only to review the design. They are not a real practice's details.</p></div></div></div>${ctaBand()}`;

const notFoundPage = (url, env) => htmlPage('Page not found', 'We could not find that page.', `<div class="bs-container bs-404"><p class="bs-404__code">404</p><h1>We could not find that page</h1><p class="bs-lede" style="margin-inline:auto">The link may be out of date, or the page may have moved. Here is where most people were heading.</p><div class="bs-actions bs-actions--center" style="margin-top:2rem">${linkButton('Back to Homepage', '/', 'primary', 'arrow-left')}${linkButton('Browse Treatments', '/services/', 'outline', 'tooth')}${linkButton('Contact Us', '/contact/', 'ghost', 'mail')}</div><div style="margin-top:3.5rem;text-align:left"><h2 class="bs-heading">Popular pages</h2><ul class="bs-footer__list">${[['Home', '/'], ...navItems].map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul></div></div>`, url, env, false, 404);

const jsonResponse = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' } });
const contentTypeByExtension = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const sha256 = async (value) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};
const safeReturnPath = (value) => ['/','/contact/','/book/'].includes(value) ? value : '/book/';

const submitAppointment = async (request, env, url) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12000) return new Response('Request too large', { status: 413 });
  let form;
  try {
    form = await request.formData();
  } catch (error) {
    return new Response('Invalid form submission', { status: 400 });
  }
  const returnTo = safeReturnPath(String(form.get('return_to') || ''));
  const redirectWith = (token) => Response.redirect(new URL(`${returnTo === '/' ? '/' : returnTo}?request=${token}#appointment`, url), 303);
  if (String(form.get('website') || '').trim()) return redirectWith('received');
  const startedAt = Number(form.get('started_at'));
  if (!Number.isFinite(startedAt) || startedAt > Date.now() || Date.now() - startedAt > 86400000 || Date.now() - startedAt < 1000) return redirectWith('error');

  const values = {
    name: String(form.get('name') || '').trim(),
    email: String(form.get('email') || '').trim(),
    phone: String(form.get('phone') || '').trim(),
    service: String(form.get('service') || '').trim(),
    message: String(form.get('message') || '').trim(),
  };
  const allowedServices = new Set([...services.map((item) => item.slug), 'not-sure']);
  if (values.name.length < 2 || values.name.length > 100
    || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email) || values.email.length > 254
    || !/^[0-9 ()+\-]{7,25}$/.test(values.phone)
    || !allowedServices.has(values.service) || values.message.length > 2000) return redirectWith('invalid');

  const ipHash = await sha256(`${request.headers.get('CF-Connecting-IP') || 'unknown'}|xilveno-dentalcare`);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(`INSERT INTO request_rate_limits (ip_hash, window_started, request_count)
    VALUES (?, ?, 1)
    ON CONFLICT(ip_hash) DO UPDATE SET
      request_count = CASE WHEN request_rate_limits.window_started <= ? THEN 1 ELSE request_rate_limits.request_count + 1 END,
      window_started = CASE WHEN request_rate_limits.window_started <= ? THEN excluded.window_started ELSE request_rate_limits.window_started END`)
    .bind(ipHash, now, now - 3600, now - 3600).run();
  const rate = await env.DB.prepare('SELECT request_count FROM request_rate_limits WHERE ip_hash = ?').bind(ipHash).first();
  if (Number(rate?.request_count || 0) > 5) return redirectWith('rate');

  await env.DB.prepare(`DELETE FROM appointment_requests WHERE created_at < datetime('now', '-30 days')`).run();
  await env.DB.prepare('DELETE FROM request_rate_limits WHERE window_started < ?').bind(now - 7200).run();
  await env.DB.prepare(`INSERT INTO appointment_requests (id, name, email, phone, service, message, ip_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), values.name, values.email, values.phone, values.service, values.message, ipHash).run();
  return redirectWith('received');
};

const imageMapFor = async (env) => {
  const result = await env.DB.prepare('SELECT slot, object_key FROM image_slots').all();
  return Object.fromEntries((result.results || []).map((row) => [row.slot, row.object_key]));
};

const serveMedia = async (request, env, slot) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  const record = await env.DB.prepare('SELECT object_key FROM image_slots WHERE slot = ?').bind(slot).first();
  if (!record) return new Response('Not found', { status: 404 });
  const object = await env.MEDIA.get(record.object_key);
  if (!object) return new Response('Not found', { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('ETag', object.httpEtag);
  headers.set('Cache-Control', 'no-cache, must-revalidate');
  return new Response(request.method === 'HEAD' ? null : object.body, { headers });
};

const render = async (request, env, url) => {
  const path = url.pathname.replace(/\/+/g, '/');
  if (path === '/favicon.svg') {
    return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#ccfbf1"/><path d="M16 7c-2-2-5-2-7-1-4 2-3 7-2 11 1 4 2 9 4 9s2-6 5-6 3 6 5 6 3-5 4-9c1-4 2-9-2-11-2-1-5-1-7 1Z" fill="#0f766e"/></svg>`, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } });
  }
  if (path === '/robots.txt') return new Response(`User-agent: *\nAllow: /\nSitemap: ${(env.CANONICAL_BASE || 'https://dental.xilveno.shop').replace(/\/+$/, '')}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
  if (path === '/sitemap.xml') {
    const base = (env.CANONICAL_BASE || 'https://dental.xilveno.shop').replace(/\/+$/, '');
    const paths = ['/', '/about/', '/services/', ...services.map((item) => `/services/${item.slug}/`), '/team/', ...team.map((item) => `/services/${item.slug}/`), '/patient-info/', '/contact/', '/book/', '/privacy-policy/'];
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((item) => `<url><loc>${esc(`${base}${item}`)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=UTF-8' } });
  }
  if (path === '/api/health') {
    await env.DB.prepare('SELECT 1 AS ok').first();
    return jsonResponse({ ok: true, d1: true, r2: Boolean(env.MEDIA) });
  }
  if (path === '/api/appointment') return submitAppointment(request, env, url);
  if (path.startsWith('/media/')) return serveMedia(request, env, decodeURIComponent(path.slice('/media/'.length)));
  if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  const imageMap = await imageMapFor(env);

  if (path === '/') return homePage(url, env, imageMap);
  if (path === '/about' || path === '/about/') return htmlPage('About', 'A small practice, on purpose. Here is how we work and who you will actually see.', aboutPage(imageMap), url, env);
  if (path === '/services' || path === '/services/') return htmlPage('Treatments', 'Routine care through to implants and urgent treatment, explained plainly.', servicesPage(imageMap), url, env);
  if (path === '/team' || path === '/team/') return htmlPage('Our Team', 'Four clinicians, one practice.', teamPage(imageMap), url, env);
  if (path === '/patient-info' || path === '/patient-info/') return htmlPage('Patient Information', 'Everything to know before your first visit.', patientPage(), url, env);
  if (path === '/contact' || path === '/contact/') return htmlPage('Contact', 'Contact BrightSmile Dental in Brookfield.', contactPage(url, imageMap), url, env);
  if (path === '/book' || path === '/book/') return htmlPage('Book an Appointment', 'Request an appointment with BrightSmile Dental.', bookPage(url), url, env);
  if (path === '/privacy-policy' || path === '/privacy-policy/') return htmlPage('Privacy Policy', 'Privacy information for the fictional BrightSmile Dental concept website.', privacyPage(), url, env);
  const detailMatch = path.match(/^\/services\/([a-z0-9-]+)\/?$/);
  if (detailMatch) {
    const item = reference.items.find((entry) => entry.slug === detailMatch[1]);
    if (item) return htmlPage(item.title, item.excerpt, detailPage(item, imageMap, item.team), url, env);
  }
  return notFoundPage(url, env);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/media/') || ['/robots.txt', '/sitemap.xml', '/favicon.svg'].includes(url.pathname)) {
        return await render(request, env, url);
      }
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
      return await render(request, env, url);
    } catch (error) {
      console.error('BrightSmile request failed', error);
      return new Response('The site could not complete this request. Please try again shortly.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' },
      });
    }
  },

  async scheduled(_controller, env) {
    const expiredRateLimit = Math.floor(Date.now() / 1000) - 7200;
    await env.DB.batch([
      env.DB.prepare("DELETE FROM appointment_requests WHERE created_at < datetime('now', '-30 days')"),
      env.DB.prepare('DELETE FROM request_rate_limits WHERE window_started < ?').bind(expiredRateLimit),
    ]);
  },
};
