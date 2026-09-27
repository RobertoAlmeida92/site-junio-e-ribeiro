/**
 * JUNIO & RIBEIRO ADVOCACIA E CONSULTORIA JURÍDICA (J&R)
 * Scripts de Interatividade e Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Cabeçalho Fixo ao Rolar a Página
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile (Hambúrguer)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar o menu mobile ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os outros itens para manter limpo
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        });

        // Alterna o item atual
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // 4. Widget Flutuante do WhatsApp (Popover de Seleção de Advogado)
  const whatsappTrigger = document.querySelector('.whatsapp-trigger-btn');
  const whatsappModal = document.querySelector('.whatsapp-modal-popover');

  if (whatsappTrigger && whatsappModal) {
    whatsappTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappModal.classList.toggle('open');
    });

    // Fechar popover ao clicar fora
    document.addEventListener('click', (e) => {
      if (!whatsappModal.contains(e.target) && !whatsappTrigger.contains(e.target)) {
        whatsappModal.classList.remove('open');
      }
    });
  }

  // 5. Destacar link do menu ativo conforme a seção visível (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
