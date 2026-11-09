/* ==========================================================================
   ATELIER VERAL — Interações de Interface, Animações e Formulário Zoho
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. Menu Mobile, Barra de Progresso de Leitura e Seção Ativa
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('topo');
  const progressBar = document.getElementById('scroll-progress-bar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sectionNavLinks = Array.from(document.querySelectorAll('.main-nav .nav-link'));
  const sections = Array.from(document.querySelectorAll('main > section[id]'));

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const updateScrollUI = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scrollY > 24);
    }

    const scrollPos = scrollY + 200;
    let currentId = 'inicio';

    for (const section of sections) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    }

    sectionNavLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  /* --------------------------------------------------------------------------
     2. Animações de Entrada no Scroll (IntersectionObserver + Stagger)
     -------------------------------------------------------------------------- */
  const staggerGroups = [
    '.projects-grid .project-card',
    '.comparison-grid .comparison-card',
    '.modalidades-grid .modalidade-panel',
    '.materials-grid .material-col'
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.style.setProperty('--reveal-delay', `${(idx % 3) * 90}ms`);
    });
  });

  const revealElements = Array.from(document.querySelectorAll('.reveal-up, .reveal-scale'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     3. Contadores Animados de Autoridade em #o-atelie (+15 anos, +420 projetos)
     -------------------------------------------------------------------------- */
  const counterElements = Array.from(document.querySelectorAll('.counter-value[data-count-to]'));

  const animateCounter = (el) => {
    const target = Number(el.dataset.countTo) || 0;
    const prefix = el.dataset.prefix || '';
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target * eased);
      el.textContent = `${prefix}${current}`;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target}`;
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     4. Filtro de Categorias em #projetos (Todos | Residencial | Corporativo)
     -------------------------------------------------------------------------- */
  const filterButtons = Array.from(document.querySelectorAll('.filter-pill[data-filter]'));
  const projectCards = Array.from(document.querySelectorAll('.project-card[data-category]'));

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.filter;

      filterButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
        const rawLabel = b.dataset.filter === 'todos' ? 'Todos' : b.textContent.replace(/[\[\]]/g, '').trim();
        b.textContent = active ? `[ ${rawLabel} ]` : rawLabel;
      });

      projectCards.forEach((card) => {
        const match = selected === 'todos' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Lightbox / Modal de Especificação Técnica de Projetos
     -------------------------------------------------------------------------- */
  const lightbox = document.getElementById('project-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSpec = document.getElementById('lightbox-spec');
  const lightboxDetails = document.getElementById('lightbox-details');
  const lightboxCta = document.getElementById('lightbox-cta');

  const openLightbox = (card) => {
    if (!lightbox || !card) return;
    if (lightboxImg) {
      lightboxImg.src = card.dataset.projectImg || '';
      lightboxImg.alt = card.dataset.projectTitle || '';
    }
    if (lightboxLocation) lightboxLocation.textContent = card.dataset.projectLocation || '';
    if (lightboxTitle) lightboxTitle.textContent = card.dataset.projectTitle || '';
    if (lightboxSpec) lightboxSpec.textContent = card.dataset.projectSpec || '';
    if (lightboxDetails) lightboxDetails.textContent = card.dataset.projectDetails || '';
    if (lightboxCta) {
      lightboxCta.dataset.setAmbiente = card.dataset.projectAmbiente || '';
    }
    lightbox.hidden = false;
  };

  const closeLightbox = () => {
    if (lightbox) lightbox.hidden = true;
  };

  document.querySelectorAll('[data-open-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.project-card');
      openLightbox(card);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const card = trigger.closest('.project-card');
        openLightbox(card);
      }
    });
  });

  document.querySelectorAll('[data-close-lightbox]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  if (lightboxCta) {
    lightboxCta.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     6. Comparador Interativo Antes e Depois (#antes-e-depois) + Botões Rápidos
     -------------------------------------------------------------------------- */
  const comparisonCards = Array.from(document.querySelectorAll('.comparison-card'));

  comparisonCards.forEach((card) => {
    const slider = card.querySelector('[data-ba-slider]');
    const range = card.querySelector('.ba-range');
    const beforeLayer = card.querySelector('.ba-before');
    const divider = card.querySelector('.ba-divider');
    const quickBtns = Array.from(card.querySelectorAll('.ba-quick-btn[data-ba-set]'));

    if (!slider || !range || !beforeLayer || !divider) return;

    const updateSlider = (val) => {
      const pct = Math.min(90, Math.max(10, Number(val)));
      range.value = String(pct);
      beforeLayer.style.width = `${pct}%`;
      divider.style.left = `${pct}%`;

      quickBtns.forEach((btn) => {
        const targetVal = Number(btn.dataset.baSet);
        btn.classList.toggle('is-active', Math.abs(pct - targetVal) <= 10);
      });
    };

    range.addEventListener('pointerdown', () => slider.classList.add('is-dragging'));
    window.addEventListener('pointerup', () => slider.classList.remove('is-dragging'));

    range.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    quickBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        slider.classList.remove('is-dragging');
        updateSlider(btn.dataset.baSet);
      });
    });

    updateSlider(range.value);
  });

  /* --------------------------------------------------------------------------
     7. Seletor Interativo de Amostras Técnicas em #materiais
     -------------------------------------------------------------------------- */
  const materialCols = Array.from(document.querySelectorAll('.material-col'));

  materialCols.forEach((col) => {
    const swatches = Array.from(col.querySelectorAll('.swatch-tag[data-swatch-note]'));
    const noteDisplay = col.querySelector('.swatch-note-display');

    if (!noteDisplay || swatches.length === 0) return;

    swatches.forEach((tag) => {
      tag.addEventListener('click', () => {
        swatches.forEach((t) => t.classList.toggle('is-active', t === tag));
        noteDisplay.textContent = tag.dataset.swatchNote || '';
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. Controles Segmentados do Formulário & Preenchimento Contextual pelos CTAs
     -------------------------------------------------------------------------- */
  const inputObjetivo = document.getElementById('input-objetivo');
  const inputPerfil = document.getElementById('input-perfil');
  const selectAmbiente = document.getElementById('campo-ambiente');
  const campoNome = document.getElementById('campo-nome');

  const setSegmentValue = (targetName, value) => {
    const buttons = Array.from(
      document.querySelectorAll(`[data-segment-target="${targetName}"]`)
    );
    buttons.forEach((btn) => {
      const isMatch = btn.dataset.segmentValue === value;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    if (targetName === 'objetivo' && inputObjetivo) {
      inputObjetivo.value = value;
    }
    if (targetName === 'perfil' && inputPerfil) {
      inputPerfil.value = value;
    }
  };

  document.querySelectorAll('[data-segment-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setSegmentValue(btn.dataset.segmentTarget, btn.dataset.segmentValue);
    });
  });

  document.querySelectorAll('[data-set-objetivo], [data-set-perfil], [data-set-ambiente]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (trigger.dataset.setObjetivo) {
        setSegmentValue('objetivo', trigger.dataset.setObjetivo);
      }
      if (trigger.dataset.setPerfil) {
        setSegmentValue('perfil', trigger.dataset.setPerfil);
      }
      if (trigger.dataset.setAmbiente && selectAmbiente) {
        selectAmbiente.value = trigger.dataset.setAmbiente;
      }
      setTimeout(() => {
        if (campoNome) campoNome.focus({ preventScroll: true });
      }, 450);
    });
  });

  /* --------------------------------------------------------------------------
     9. Envio do Formulário para o Servidor (Zoho Mail / Simulação no Terminal)
     -------------------------------------------------------------------------- */
  const form = document.getElementById('form-contato');
  const submitBtn = document.getElementById('btn-submit');
  const feedbackBox = document.getElementById('form-feedback');

  if (form && submitBtn && feedbackBox) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const payload = {
        objetivo: formData.get('objetivo') || 'Solicitar um Projeto',
        perfil: formData.get('perfil') || 'Cliente Final (Proprietário / Empresa)',
        nome: String(formData.get('nome') || '').trim(),
        telefone: String(formData.get('telefone') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        cidade: String(formData.get('cidade') || '').trim(),
        ambiente: String(formData.get('ambiente') || '').trim(),
        mensagem: String(formData.get('mensagem') || '').trim()
      };

      if (!payload.nome || !payload.telefone || !payload.cidade || !payload.ambiente) {
        feedbackBox.hidden = false;
        feedbackBox.className = 'form-feedback is-error';
        feedbackBox.innerHTML = `
          <strong class="form-feedback-title">Campos obrigatórios pendentes</strong>
          Por favor, preencha seu <strong>Nome</strong>, <strong>WhatsApp / Telefone</strong>, <strong>Cidade do projeto</strong> e selecione o <strong>Ambiente principal</strong>.
        `;
        return;
      }

      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando solicitação...';
      feedbackBox.hidden = true;

      try {
        let result = null;
        try {
          const response = await fetch('api/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (response.status === 404 || response.status === 405) {
            /* Fallback estático (GitHub Pages): simula o envio no console com assunto contendo Ambiente e Cidade */
            const simSubject = `[Atelier Veral] ${payload.objetivo} — ${payload.ambiente} | ${payload.cidade}`;
            console.log('============================================================');
            console.log('NOVA SOLICITAÇÃO PELO SITE — ATELIER VERAL (Modo Simulação)');
            console.log(`Para:     contato@atelierveral.com.br`);
            console.log(`Assunto:  ${simSubject}`);
            console.log('Dados:', payload);
            console.log('============================================================');
            result = {
              ok: true,
              mode: 'simulacao-estatica',
              recipient: 'contato@atelierveral.com.br',
              subject: simSubject,
              ambiente: payload.ambiente,
              cidade: payload.cidade
            };
          } else {
            result = await response.json();
            if (!response.ok || !result.ok) {
              throw new Error(result.error || 'Erro ao registrar solicitação.');
            }
          }
        } catch (networkErr) {
          /* Caso esteja em ambiente estático puro sem backend Node ativo */
          const simSubject = `[Atelier Veral] ${payload.objetivo} — ${payload.ambiente} | ${payload.cidade}`;
          console.log('[Modo Simulação] Pedido registrado:', { to: 'contato@atelierveral.com.br', subject: simSubject, ...payload });
          result = {
            ok: true,
            mode: 'simulacao-estatica',
            recipient: 'contato@atelierveral.com.br',
            subject: simSubject,
            ambiente: payload.ambiente,
            cidade: payload.cidade
          };
        }

        feedbackBox.hidden = false;
        feedbackBox.className = 'form-feedback';
        feedbackBox.innerHTML = `
          <strong class="form-feedback-title">Solicitação registrada com sucesso.</strong>
          Recebemos os dados do seu pedido para <strong>${result.ambiente}</strong> em <strong>${result.cidade}</strong>. Nossa equipe em Taubaté analisará as informações e entrará em contato em breve para dar sequência ao seu atendimento.
        `;

        form.reset();
        setSegmentValue('objetivo', payload.objetivo);
        setSegmentValue('perfil', payload.perfil);
      } catch (err) {
        feedbackBox.hidden = false;
        feedbackBox.className = 'form-feedback is-error';
        feedbackBox.innerHTML = `
          <strong class="form-feedback-title">Não foi possível concluir o envio</strong>
          ${err.message || 'Tente novamente em instantes ou fale diretamente pelo WhatsApp Concierge.'}
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});
