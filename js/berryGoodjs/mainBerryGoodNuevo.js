/* BerryGood · animaciones del DISEÑO NUEVO (estilo "opción E").
   Lo carga js/design.js solo cuando el diseño nuevo está activo.
   Expone window.BerryGoodNuevo.start() / stop().
   - Aparición suave de bloques y chat de WhatsApp mensaje a mensaje.
   - Servicios con scroll horizontal anclado (GSAP + ScrollTrigger, solo escritorio).
   - Confeti: estela del mouse, explosión al hacer clic, ráfagas al bajar por la página
     y celebración al enviar el formulario.
   Si GSAP no carga, todo el contenido queda visible igual. */
(() => {
	const nd = document.querySelector('.nd');
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
	const numberFormat = new Intl.NumberFormat('es-CO');
	const confettiColors = ['#c2185b', '#ff4d8d', '#ffd9e7', '#6d4aff', '#ece6ff', '#1f8a5b', '#fbd46a'];
	let running = false;
	let cleanups = [];

	function listen(target, type, handler, options) {
		target.addEventListener(type, handler, options);
		cleanups.push(() => target.removeEventListener(type, handler, options));
	}

	/* ---------- Menú móvil y formulario ---------- */
	function setupMenuAndForm(confetti) {
		const menu = nd.querySelector('.nd-menu');
		const menuButton = nd.querySelector('.nd-menu-btn');
		const form = nd.querySelector('.nd-form');

		const closeMenu = () => {
			menu.classList.remove('is-open');
			menuButton.setAttribute('aria-expanded', 'false');
		};

		listen(menuButton, 'click', () => {
			const open = menu.classList.toggle('is-open');
			menuButton.setAttribute('aria-expanded', String(open));
		});
		menu.querySelectorAll('a').forEach((link) => listen(link, 'click', closeMenu));

		/* Formulario de contacto: validación propia, mensaje a WhatsApp y pantalla de confirmación */
		const sent = nd.querySelector('.nd-sent');
		const value = (selector) => form.querySelector(selector)?.value.trim() ?? '';
		const service = () => form.querySelector('[name="nd-f-svc"]:checked')?.value ?? '';
		const checks = {
			'nd-f-name': () => value('#nd-f-name').length >= 2,
			'nd-f-contact': () => {
				const contact = value('#nd-f-contact');
				const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
				const isPhone = contact.replace(/\D/g, '').length >= 7;
				return isEmail || isPhone;
			},
			'nd-f-svc': () => Boolean(service()),
		};

		const fieldOf = (id) => (id === 'nd-f-svc' ? form.querySelector('.nd-chips') : form.querySelector(`#${id}`).closest('.nd-field'));
		const validate = (id) => {
			const ok = checks[id]();
			const field = fieldOf(id);
			field.classList.toggle('is-invalid', !ok);
			(id === 'nd-f-svc' ? field : form.querySelector(`#${id}`)).setAttribute('aria-invalid', String(!ok));
			return ok;
		};

		// Corrige el error en cuanto la persona arregla el campo
		Object.keys(checks).forEach((id) => {
			const target = id === 'nd-f-svc' ? fieldOf(id) : form.querySelector(`#${id}`);
			listen(target, id === 'nd-f-svc' ? 'change' : 'input', () => {
				if (fieldOf(id).classList.contains('is-invalid')) {
					validate(id);
				}
			});
			if (id !== 'nd-f-svc') {
				listen(target, 'blur', () => target.value.trim() && validate(id));
			}
		});

		let lastUrl = '';
		listen(form, 'submit', (event) => {
			event.preventDefault();

			const invalid = Object.keys(checks).filter((id) => !validate(id));
			if (invalid.length) {
				const first = invalid[0] === 'nd-f-svc' ? form.querySelector('[name="nd-f-svc"]') : form.querySelector(`#${invalid[0]}`);
				first.focus();
				return;
			}

			// Arma el mensaje con los datos del formulario y abre WhatsApp
			const lines = [
				'Hola BerryGood 👋 Vi su página web y me gustaría recibir más información sobre sus servicios.',
				'',
				`Nombre: ${value('#nd-f-name')}`,
				`Contacto: ${value('#nd-f-contact')}`,
				`Necesito: ${service()}`,
			];
			if (value('#nd-f-msg')) {
				lines.push(`Mensaje: ${value('#nd-f-msg')}`);
			}
			lastUrl = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
			window.open(lastUrl, '_blank', 'noopener');

			const rect = form.querySelector('.nd-submit').getBoundingClientRect();
			confetti.burst(rect.left + rect.width / 2, rect.top, 90, 9);

			// Pantalla de confirmación con opción de reabrir WhatsApp
			sent.querySelector('.nd-sent-name').textContent = value('#nd-f-name').split(' ')[0] || 'gracias';
			sent.querySelector('.nd-sent-open').href = lastUrl;
			form.hidden = true;
			sent.hidden = false;
			sent.focus({ preventScroll: true });
		});

		listen(sent.querySelector('.nd-sent-again'), 'click', () => {
			form.reset();
			form.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
			sent.hidden = true;
			form.hidden = false;
			form.querySelector('#nd-f-name').focus();
		});

		cleanups.push(closeMenu);
	}

	/* ---------- Confeti en un solo canvas ---------- */
	function createConfetti() {
		const canvas = nd.querySelector('.nd-fx');
		const ctx = canvas.getContext('2d');
		const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
		const parts = [];
		let frame = 0;

		const measure = () => {
			canvas.width = window.innerWidth * ratio;
			canvas.height = window.innerHeight * ratio;
		};

		const randomColor = () => confettiColors[(Math.random() * confettiColors.length) | 0];

		const loop = () => {
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			for (let index = parts.length - 1; index >= 0; index -= 1) {
				const part = parts[index];
				part.x += part.vx;
				part.y += part.vy;
				part.vy += part.gravity;
				part.vx *= .97;
				part.spin += part.vspin;
				part.life -= part.decay;

				if (part.life <= 0) {
					parts.splice(index, 1);
					continue;
				}

				ctx.globalAlpha = Math.min(1, part.life * 1.5);
				ctx.fillStyle = part.color;

				if (part.paper) {
					ctx.save();
					ctx.translate(part.x, part.y);
					ctx.rotate(part.spin);
					ctx.fillRect(-part.size / 2, -part.size / 4, part.size, part.size / 2 * Math.abs(Math.cos(part.spin * 2)) + 1);
					ctx.restore();
				} else {
					ctx.beginPath();
					ctx.arc(part.x, part.y, part.size * part.life, 0, 7);
					ctx.fill();
				}
			}

			ctx.globalAlpha = 1;
			frame = parts.length ? requestAnimationFrame(loop) : 0;
		};

		const wake = () => {
			if (!frame) {
				frame = requestAnimationFrame(loop);
			}
		};

		// Explosión de papelitos (clic, ráfagas al bajar, formulario)
		const burst = (x, y, count = 26, power = 6, upward = false) => {
			for (let index = 0; index < count; index += 1) {
				const angle = upward
					? -Math.PI / 2 + (Math.random() - .5) * 1.4
					: Math.random() * Math.PI * 2;
				const speed = Math.random() * power + power / 3;
				parts.push({
					x, y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					gravity: .14,
					size: Math.random() * 6 + 5,
					spin: Math.random() * Math.PI,
					vspin: (Math.random() - .5) * .3,
					life: 1,
					decay: .009 + Math.random() * .006,
					color: confettiColors[index % confettiColors.length],
					paper: true,
				});
			}
			wake();
		};

		// Estela de puntitos del mouse
		const trail = (x, y, dx, dy) => {
			const count = Math.min(3, Math.floor(Math.hypot(dx, dy) / 10));
			for (let index = 0; index < count; index += 1) {
				parts.push({
					x, y,
					vx: (Math.random() - .5) * 1.4 + dx * .04,
					vy: (Math.random() - .5) * 1.4 + dy * .04,
					gravity: .06,
					size: Math.random() * 3 + 1.5,
					spin: 0,
					vspin: 0,
					life: 1,
					decay: .022,
					color: randomColor(),
					paper: false,
				});
			}
			if (count) {
				wake();
			}
		};

		measure();
		listen(window, 'resize', measure);
		cleanups.push(() => {
			cancelAnimationFrame(frame);
			frame = 0;
			parts.length = 0;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		});

		return { burst, trail };
	}

	function setupConfettiInteractions(confetti) {
		if (reduceMotion.matches) {
			return;
		}

		// Estela y clic: solo con mouse (en celular se apaga)
		if (finePointer.matches) {
			let lastX = 0;
			let lastY = 0;

			listen(window, 'pointermove', (event) => {
				if (event.pointerType !== 'mouse') {
					return;
				}
				confetti.trail(event.clientX, event.clientY, event.clientX - lastX, event.clientY - lastY);
				lastX = event.clientX;
				lastY = event.clientY;
			}, { passive: true });

			listen(nd, 'click', (event) => {
				if (event.target.closest('input, select, textarea, label')) {
					return;
				}
				confetti.burst(event.clientX, event.clientY, 26, 5);
			});
		}

		// Ráfagas de confeti al bajar: cada título de sección dispara una vez
		const headings = nd.querySelectorAll('.nd-head h2, .nd-plan-star, .nd-cta-panel h2');
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting || entry.boundingClientRect.top < 0) {
					return;
				}
				observer.unobserve(entry.target);
				const rect = entry.target.getBoundingClientRect();
				const fromLeft = rect.left + 20;
				const fromRight = Math.min(rect.right, window.innerWidth) - 20;
				confetti.burst(fromLeft, rect.top + 10, 22, 8, true);
				confetti.burst(fromRight, rect.top + 10, 22, 8, true);
			});
		}, { threshold: .9 });

		headings.forEach((heading) => observer.observe(heading));
		cleanups.push(() => observer.disconnect());
	}

	/* ---------- Apariciones y chat ---------- */
	function setupReveal() {
		if (reduceMotion.matches || !('IntersectionObserver' in window)) {
			return;
		}

		nd.classList.add('is-animated');
		cleanups.push(() => {
			nd.classList.remove('is-animated');
			nd.querySelectorAll('.is-in, .is-on').forEach((element) => element.classList.remove('is-in', 'is-on'));
		});

		const revealObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-in');
					revealObserver.unobserve(entry.target);
				}
			});
		}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
		nd.querySelectorAll('.nd-rv').forEach((element) => revealObserver.observe(element));
		cleanups.push(() => revealObserver.disconnect());

		const messages = [...nd.querySelectorAll('.nd-m')];
		const timers = [];
		const chatObserver = new IntersectionObserver((entries) => {
			if (!entries[0].isIntersecting) {
				return;
			}
			chatObserver.disconnect();
			messages.forEach((message, index) => {
				timers.push(setTimeout(() => message.classList.add('is-on'), 400 + index * 900));
			});
		}, { threshold: .3 });
		chatObserver.observe(nd.querySelector('.nd-msgs'));
		cleanups.push(() => {
			chatObserver.disconnect();
			timers.forEach(clearTimeout);
		});

		// Precios que cuentan
		const countObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}
				countObserver.unobserve(entry.target);
				const element = entry.target;
				const target = Number(element.dataset.value);
				const startTime = performance.now();
				const step = (now) => {
					const progress = Math.min((now - startTime) / 1400, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					element.textContent = numberFormat.format(Math.round(target * eased));
					if (progress < 1 && running) {
						requestAnimationFrame(step);
					} else {
						element.textContent = numberFormat.format(target);
					}
				};
				requestAnimationFrame(step);
			});
		}, { threshold: .6 });
		nd.querySelectorAll('.nd-count').forEach((element) => countObserver.observe(element));
		cleanups.push(() => countObserver.disconnect());

		// Clientes: en celular la captura se recorre sola mientras la tarjeta está a la vista
		const clientObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
		}, { threshold: .6 });
		nd.querySelectorAll('.nd-client').forEach((card) => clientObserver.observe(card));
		cleanups.push(() => {
			clientObserver.disconnect();
			nd.querySelectorAll('.nd-client.is-visible').forEach((card) => card.classList.remove('is-visible'));
		});
	}

	/* ---------- Servicios con scroll horizontal ---------- */
	function setupHorizontalScroll() {
		const { gsap, ScrollTrigger } = window;

		if (!gsap || !ScrollTrigger || reduceMotion.matches) {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);
		const section = nd.querySelector('.nd-hs');
		const media = gsap.matchMedia();

		media.add('(min-width: 981px)', () => {
			section.classList.add('is-horizontal');
			const track = section.querySelector('.nd-hs-track');
			const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

			const move = gsap.to(track, {
				x: () => -distance(),
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => `+=${distance()}`,
					pin: section.querySelector('.nd-hs-pin'),
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});

			gsap.utils.toArray(section.querySelectorAll('.nd-brand-panel, .nd-cta-panel')).forEach((card) => {
				gsap.from(card, {
					rotate: 3,
					scale: .92,
					opacity: .4,
					ease: 'none',
					scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 100%', end: 'left 60%', scrub: true },
				});

				// Los servicios de cada marca entran en cascada
				const items = card.querySelectorAll('.nd-svc-item');
				if (items.length) {
					gsap.from(items, {
						y: 24,
						opacity: 0,
						duration: .6,
						ease: 'power3.out',
						stagger: .05,
						scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 75%', toggleActions: 'play none none reverse' },
					});
				}
			});

			ScrollTrigger.refresh();

			return () => section.classList.remove('is-horizontal');
		});

		cleanups.push(() => media.revert());
		document.fonts?.ready.then(() => running && ScrollTrigger.refresh());
	}

	/* ---------- Animaciones del hero ----------
	   A1 · El titular entra palabra por palabra.
	   A3 · Después, la palabra resaltada va rotando (crecer → destacar → ...).
	   A5 · El chat muestra "escribiendo…" antes de cada respuesta, en bucle.
	   A6 · Las barras de "Prospectos del mes" crecen al aparecer. */
	const heroWords = ['crecer', 'destacar', 'despegar', 'brillar'];

	function setupHeroAnimations() {
		const hero = nd.querySelector('.nd-hero');
		const title = hero?.querySelector('h1');

		if (!title || reduceMotion.matches) {
			return;
		}

		const timers = new Set();
		const later = (fn, ms) => {
			const id = setTimeout(() => {
				timers.delete(id);
				fn();
			}, ms);
			timers.add(id);
		};
		cleanups.push(() => timers.forEach(clearTimeout));

		// A1 · Partir el titular en palabras (una sola vez)
		if (!title.classList.contains('nd-words')) {
			let index = 0;
			[...title.childNodes].forEach((node) => {
				if (node.nodeType === Node.TEXT_NODE) {
					const fragment = document.createDocumentFragment();
					node.textContent.split(/(\s+)/).forEach((part) => {
						if (!part) {
							return;
						}
						if (/^\s+$/.test(part)) {
							fragment.append(part);
							return;
						}
						const word = document.createElement('span');
						word.className = 'nd-w';
						word.innerHTML = `<span style="--i:${index++}"></span>`;
						word.firstChild.textContent = part;
						fragment.append(word);
					});
					node.replaceWith(fragment);
				} else if (node.classList?.contains('nd-hl')) {
					node.classList.add('nd-w-hl');
					node.style.setProperty('--i', index++);
				}
			});
			title.classList.remove('nd-rv', 'nd-d1');
			title.classList.add('nd-words');
		}

		// Reinicia la entrada cada vez que el diseño nuevo arranca
		title.classList.remove('is-play');
		void title.offsetWidth;
		title.classList.add('is-play');

		// A3 · Palabra rotativa dentro del resaltado
		const highlight = title.querySelector('.nd-hl');
		if (highlight && !highlight.querySelector('.nd-rot')) {
			highlight.setAttribute('aria-hidden', 'true');
			highlight.innerHTML = `<span class="nd-rot">${heroWords[0]}</span>`;
			const srOnly = document.createElement('span');
			srOnly.className = 'nd-sr';
			srOnly.textContent = heroWords[0];
			highlight.after(srOnly);
		}
		const rotating = highlight?.querySelector('.nd-rot');
		if (rotating) {
			let current = 0;
			const measure = (text) => {
				const probe = rotating.cloneNode();
				probe.textContent = text;
				probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
				highlight.append(probe);
				const width = probe.getBoundingClientRect().width;
				probe.remove();
				return width;
			};
			const fitWidth = () => {
				highlight.style.width = `${measure(rotating.textContent)}px`;
			};
			const rotate = () => {
				if (!running) {
					return;
				}
				current = (current + 1) % heroWords.length;
				rotating.classList.add('is-out');
				later(() => {
					rotating.textContent = heroWords[current];
					fitWidth();
					rotating.classList.remove('is-out');
					rotating.classList.add('is-in');
					void rotating.offsetWidth;
					rotating.classList.remove('is-in');
				}, 320);
				later(rotate, 2600);
			};
			rotating.textContent = heroWords[0];
			document.fonts?.ready.then(fitWidth);
			fitWidth();
			listen(window, 'resize', fitWidth);
			later(rotate, 3200);
			cleanups.push(() => {
				rotating.textContent = heroWords[0];
				highlight.style.width = '';
			});
		}

		// A5 · Chat que escribe
		const chat = hero.querySelector('.nd-s-chat');
		if (chat) {
			const [question, answer] = chat.querySelectorAll('p');
			const status = chat.querySelector('.nd-who small');
			let typing = chat.querySelector('.nd-typing');
			if (!typing) {
				typing = document.createElement('p');
				typing.className = 'nd-me nd-typing';
				typing.innerHTML = '<i></i><i></i><i></i>';
				chat.append(typing);
			}
			const show = (element, visible) => element.classList.toggle('is-hidden', !visible);
			const conversation = () => {
				if (!running) {
					return;
				}
				show(question, false);
				show(answer, false);
				show(typing, false);
				later(() => show(question, true), 700);
				later(() => {
					show(typing, true);
					status.textContent = 'escribiendo…';
				}, 1500);
				later(() => {
					show(typing, false);
					show(answer, true);
					status.textContent = 'en línea';
				}, 3200);
				later(conversation, 9000);
			};
			conversation();
			cleanups.push(() => {
				show(question, true);
				show(answer, true);
				show(typing, false);
				status.textContent = 'en línea';
			});
		}

		// A6 · Barras que crecen al aparecer (sin cifras: la tarjeta es ilustrativa)
		const stat = hero.querySelector('.nd-s-stat');
		if (stat) {
			stat.classList.remove('is-grown');
			stat.classList.add('nd-grow');
			const statObserver = new IntersectionObserver(([entry]) => {
				if (!entry.isIntersecting) {
					return;
				}
				statObserver.disconnect();
				stat.classList.add('is-grown');
			}, { threshold: .5 });
			statObserver.observe(stat);
			cleanups.push(() => statObserver.disconnect());
		}
	}

	/* ---------- Videos de fondo (hero y "Cómo trabajamos") ----------
	   No tienen autoplay en el HTML: solo se descargan y reproducen cuando el
	   diseño nuevo está activo y el video está en pantalla. Con "reducir
	   movimiento" se queda la imagen fija (poster). */
	function setupBackgroundVideos() {
		const videos = [...nd.querySelectorAll('.nd-bgvid-media')];

		if (!videos.length || reduceMotion.matches) {
			return;
		}

		const videoObserver = new IntersectionObserver((entries) => {
			entries.forEach(({ target, isIntersecting }) => {
				if (isIntersecting) {
					target.play().then(() => target.classList.add('is-playing')).catch(() => {});
				} else {
					target.pause();
				}
			});
		}, { rootMargin: '200px 0px' });

		videos.forEach((video) => {
			video.muted = true;
			videoObserver.observe(video);
		});
		cleanups.push(() => {
			videoObserver.disconnect();
			videos.forEach((video) => video.pause());
		});
	}

	function start() {
		if (running) {
			return;
		}

		running = true;
		const confetti = createConfetti();
		setupMenuAndForm(confetti);
		setupBackgroundVideos();
		setupReveal();
		setupHeroAnimations();
		setupConfettiInteractions(confetti);
		setupHorizontalScroll();
	}

	function stop() {
		if (!running) {
			return;
		}

		running = false;
		cleanups.reverse().forEach((cleanup) => cleanup());
		cleanups = [];
	}

	window.BerryGoodNuevo = { start, stop };
})();
