/**
 * BrightSmile Dental - front-end behaviour.
 *
 * Progressive enhancement only: navigation uses real links, FAQ answers are
 * in the HTML, and the form posts to the Worker's appointment endpoint.
 */
( function () {
	'use strict';

	var doc = document;
	var root = doc.documentElement;

	/* ------------------------------------------------------------------
	 * Sticky header shadow
	 * ---------------------------------------------------------------- */
	function initHeader() {
		var header = doc.querySelector( '.bs-header' );

		if ( ! header ) {
			return;
		}

		var ticking = false;

		function update() {
			header.classList.toggle( 'is-stuck', window.scrollY > 8 );
			ticking = false;
		}

		window.addEventListener(
			'scroll',
			function () {
				if ( ! ticking ) {
					window.requestAnimationFrame( update );
					ticking = true;
				}
			},
			{ passive: true }
		);

		update();
	}

	/* ------------------------------------------------------------------
	 * Mobile drawer
	 *
	 * Handles focus trapping, Escape to close, backdrop click, and restores
	 * body scroll.
	 * ---------------------------------------------------------------- */
	function initDrawer() {
		var toggle = doc.querySelector( '.bs-nav-toggle' );
		var drawer = doc.getElementById( 'bs-drawer' );

		if ( ! toggle || ! drawer ) {
			return;
		}

		var panel = drawer.querySelector( '.bs-drawer__panel' );
		var closeBtn = drawer.querySelector( '.bs-drawer__close' );
		var backdrop = drawer.querySelector( '.bs-drawer__backdrop' );
		var lastFocused = null;

		function focusable() {
			return drawer.querySelectorAll(
				'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
		}

		function open() {
			lastFocused = doc.activeElement;
			drawer.classList.add( 'is-open' );
			toggle.setAttribute( 'aria-expanded', 'true' );
			doc.body.classList.add( 'bs-drawer-open' );

			if ( closeBtn ) {
				closeBtn.focus();
			}
		}

		function close() {
			drawer.classList.remove( 'is-open' );
			toggle.setAttribute( 'aria-expanded', 'false' );
			doc.body.classList.remove( 'bs-drawer-open' );

			if ( lastFocused && lastFocused !== doc.body && lastFocused.focus && ! drawer.contains( lastFocused ) ) {
				lastFocused.focus();
			} else {
				toggle.focus();
			}
		}

		function isOpen() {
			return drawer.classList.contains( 'is-open' );
		}

		toggle.addEventListener( 'click', function () {
			if ( isOpen() ) {
				close();
			} else {
				open();
			}
		} );

		if ( closeBtn ) {
			closeBtn.addEventListener( 'click', close );
		}

		if ( backdrop ) {
			backdrop.addEventListener( 'click', close );
		}

		// Escape closes, Tab is trapped inside the panel while open.
		doc.addEventListener( 'keydown', function ( e ) {
			if ( ! isOpen() ) {
				return;
			}

			if ( e.key === 'Escape' || e.key === 'Esc' ) {
				close();
				return;
			}

			if ( e.key !== 'Tab' || ! panel ) {
				return;
			}

			var items = focusable();

			if ( ! items.length ) {
				return;
			}

			var first = items[ 0 ];
			var last = items[ items.length - 1 ];

			if ( e.shiftKey && doc.activeElement === first ) {
				e.preventDefault();
				last.focus();
			} else if ( ! e.shiftKey && doc.activeElement === last ) {
				e.preventDefault();
				first.focus();
			}
		} );

		// Following a link inside the drawer should close it.
		drawer.addEventListener( 'click', function ( e ) {
			var link = e.target.closest ? e.target.closest( 'a[href]' ) : null;

			if ( link && isOpen() ) {
				close();
			}
		} );

		// Reset state if the viewport grows past the mobile breakpoint.
		var mq = window.matchMedia( '(min-width: 1024px)' );

		var onChange = function ( e ) {
			if ( e.matches && isOpen() ) {
				close();
			}
		};

		if ( mq.addEventListener ) {
			mq.addEventListener( 'change', onChange );
		} else if ( mq.addListener ) {
			mq.addListener( onChange );
		}
	}

	/* ------------------------------------------------------------------
	 * Desktop services dropdown (click + keyboard)
	 * ---------------------------------------------------------------- */
	function initDropdowns() {
		var toggles = doc.querySelectorAll( '.bs-nav__toggle' );

		Array.prototype.forEach.call( toggles, function ( toggle ) {
			var menu = doc.getElementById( toggle.getAttribute( 'aria-controls' ) );

			if ( ! menu ) {
				return;
			}

			function close() {
				menu.classList.remove( 'is-open' );
				toggle.setAttribute( 'aria-expanded', 'false' );
			}

			toggle.addEventListener( 'click', function ( e ) {
				e.stopPropagation();

				var open = menu.classList.contains( 'is-open' );
				menu.classList.toggle( 'is-open', ! open );
				toggle.setAttribute( 'aria-expanded', open ? 'false' : 'true' );
			} );

			doc.addEventListener( 'click', function ( e ) {
				if ( ! menu.contains( e.target ) && e.target !== toggle ) {
					close();
				}
			} );

			doc.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Escape' || e.key === 'Esc' ) {
					close();
					toggle.focus();
				}
			} );
		} );
	}

	/* ------------------------------------------------------------------
	 * Reveal on scroll
	 * ---------------------------------------------------------------- */
	function initReveal() {
		var items = doc.querySelectorAll( '[data-reveal]' );

		if ( ! items.length ) {
			return;
		}

		if ( ! ( 'IntersectionObserver' in window ) ) {
			Array.prototype.forEach.call( items, function ( el ) {
				el.classList.add( 'is-revealed' );
			} );
			return;
		}

		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-revealed' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);

		Array.prototype.forEach.call( items, function ( el ) {
			observer.observe( el );
		} );
	}
/* ------------------------------------------------------------------
	 * FAQ accordion
	 * ---------------------------------------------------------------- */
	function initAccordion() {
		var triggers = doc.querySelectorAll( '.bs-accordion__trigger' );

		Array.prototype.forEach.call( triggers, function ( trigger ) {
			var item = trigger.closest( '.bs-accordion__item' );
			var panelId = trigger.getAttribute( 'aria-controls' );
			var panel = panelId ? doc.getElementById( panelId ) : null;

			if ( ! item || ! panel ) {
				return;
			}

			trigger.addEventListener( 'click', function () {
				var open = trigger.getAttribute( 'aria-expanded' ) === 'true';

				trigger.setAttribute( 'aria-expanded', open ? 'false' : 'true' );
				item.classList.toggle( 'is-open', ! open );
			} );
		} );
	}

	/* ------------------------------------------------------------------
	 * Client-side form validation (progressive enhancement only)
	 * ---------------------------------------------------------------- */
	function initForm() {
		var form = doc.querySelector( '[data-bs-form]' );

		if ( ! form ) {
			return;
		}

		var fields = form.querySelectorAll( '[data-validate]' );

		function errorFor( field ) {
			var wrap = field.closest( '.bs-field' );
			return wrap ? wrap.querySelector( '[data-error-for]' ) : null;
		}

		function setError( field, message ) {
			var slot = errorFor( field );

			if ( message ) {
				field.setAttribute( 'aria-invalid', 'true' );

				if ( slot ) {
					slot.textContent = message;
				}
			} else {
				field.removeAttribute( 'aria-invalid' );

				if ( slot ) {
					slot.textContent = '';
				}
			}
		}

		function validate( field ) {
			var value = ( field.value || '' ).trim();
			var kind = field.getAttribute( 'data-validate' );

			if ( field.hasAttribute( 'required' ) && ! value ) {
				return field.getAttribute( 'data-msg-required' ) || 'This field is required.';
			}

			if ( kind === 'email' && value && ! /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test( value ) ) {
				return 'Enter a valid email address.';
			}

			if ( kind === 'phone' && value && ! /^[0-9 ()+\-]{7,25}$/.test( value ) ) {
				return 'Enter a valid phone number.';
			}

			return '';
		}

		Array.prototype.forEach.call( fields, function ( field ) {
			field.addEventListener( 'blur', function () {
				setError( field, validate( field ) );
			} );

			field.addEventListener( 'input', function () {
				if ( field.getAttribute( 'aria-invalid' ) === 'true' ) {
					setError( field, validate( field ) );
				}
			} );
		} );

		form.addEventListener( 'submit', function ( e ) {
			var firstBad = null;

			Array.prototype.forEach.call( fields, function ( field ) {
				var message = validate( field );
				setError( field, message );

				if ( message && ! firstBad ) {
					firstBad = field;
				}
			} );

			if ( firstBad ) {
				e.preventDefault();
				firstBad.focus();

				var alert = doc.querySelector( '[data-form-alert]' );

				if ( alert ) {
					alert.scrollIntoView( { behavior: 'smooth', block: 'center' } );
				}
			}
		} );
	}

	/* ------------------------------------------------------------------
	 * Prefill the treatment field from ?service=slug
	 * ---------------------------------------------------------------- */
	function initPrefill() {
		var select = doc.querySelector( '[data-service-select]' );

		if ( ! select ) {
			return;
		}

		var match = window.location.search.match( /[?&]service=([^&]+)/ );

		if ( ! match ) {
			return;
		}

		var slug = decodeURIComponent( match[ 1 ] );
		var option = select.querySelector( 'option[value="' + slug.replace( /"/g, '' ) + '"]' );

		if ( option ) {
			select.value = slug;
		}
	}

	/* ------------------------------------------------------------------ */
	function init() {
		root.classList.add( 'js' );
		initHeader();
		initDrawer();
		initDropdowns();
		initReveal();
		initAccordion();
		initForm();
		initPrefill();
	}

	if ( doc.readyState === 'loading' ) {
		doc.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();