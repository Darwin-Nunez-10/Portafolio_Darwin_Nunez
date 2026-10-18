import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../atoms/ScrollReveal';
import ProjectCard from '../molecules/ProjectCard';
import { useTranslation } from '../../hooks/useTranslation';

const ProjectsSection = memo(({ projects }) => {
  const { t } = useTranslation();
  const scrollerRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Distance between two consecutive slides (width + gap), measured from the DOM
  const getStep = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    const slides = scroller.querySelectorAll('[data-slide]');
    if (!slides.length) return 0;
    if (slides.length < 2) return slides[0].offsetWidth;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }, []);

  const updateBounds = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const step = getStep();
    if (step > 0) {
      const visible = Math.max(1, Math.round(scroller.clientWidth / step));
      const nextMax = Math.max(0, projects.length - visible);
      setMaxIndex(nextMax);
      setActiveIndex(Math.max(0, Math.min(Math.round(scroller.scrollLeft / step), nextMax)));
    }
  }, [getStep, projects.length]);

  useEffect(() => {
    updateBounds();
    const onResize = () => updateBounds();
    window.addEventListener('resize', onResize, { passive: true });
    const id = setTimeout(updateBounds, 300);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(id);
    };
  }, [updateBounds]);

  const scrollToIndex = useCallback((i) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const step = getStep();
    if (step <= 0) return;
    const target = Math.max(0, Math.min(maxIndex, i));
    scroller.scrollTo({ left: target * step, behavior: 'smooth' });
  }, [getStep, maxIndex]);

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const step = getStep();
    if (step > 0) {
      setActiveIndex(Math.max(0, Math.min(maxIndex, Math.round(scroller.scrollLeft / step))));
    }
  }, [getStep, maxIndex]);

  // Desktop drag-to-scroll (touch uses native swipe scrolling)
  const handlePointerDown = useCallback((e) => {
    if (e.pointerType === 'touch') return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    dragRef.current = { active: true, startX: e.clientX, startScroll: scroller.scrollLeft, moved: false };
    scroller.classList.add('is-grabbing');

    const onMove = (ev) => {
      if (!dragRef.current.active) return;
      const dx = ev.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 4) dragRef.current.moved = true;
      scroller.scrollLeft = dragRef.current.startScroll - dx;
    };

    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      scroller.classList.remove('is-grabbing');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const step = getStep();
      if (step > 0) scrollToIndex(Math.round(scroller.scrollLeft / step));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
  }, [getStep, scrollToIndex]);

  // Swallow the click that follows a drag so it doesn't open the project link
  const handleClickCapture = useCallback((e) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  }, []);

  // Vertical mouse wheel scrolls the carousel horizontally (native listener so
  // preventDefault works). At the ends we let the page scroll normally.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let snapTimer = null;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal trackpads: native
      const delta = e.deltaY;
      if (!delta) return;

      const atStart = scroller.scrollLeft <= 0;
      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return; // let the page scroll

      e.preventDefault();
      scroller.scrollLeft += delta;

      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const step = getStep();
        if (step > 0) scrollToIndex(Math.round(scroller.scrollLeft / step));
      }, 140);
    };

    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      scroller.removeEventListener('wheel', onWheel);
      clearTimeout(snapTimer);
    };
  }, [getStep, scrollToIndex]);

  const dots = maxIndex + 1;
  const hasMany = projects.length > 1;

  return (
    <section id="proyectos" className="min-h-screen py-20 md:py-24 px-5 sm:px-6 max-w-[1400px] mx-auto w-full overflow-hidden">
      <ScrollReveal direction="up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 md:mb-16 tracking-tight flex items-center justify-center gap-3">
          <Briefcase className="text-purple-500 shrink-0" size={32} />
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 text-gradient-animated text-transparent bg-clip-text pb-1">
              {t('projects.title')}
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <div className="flex items-center gap-3 md:gap-5">
          {hasMany && (
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex <= 0}
              aria-label={t('projects.prev')}
              className="carousel-arrow"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onClickCapture={handleClickCapture}
            className="project-scroller flex-1 min-w-0 flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
          >
            {projects.map((project) => (
              <div
                key={project.title}
                data-slide
                className="snap-start shrink-0 w-[88%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {hasMany && (
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex >= maxIndex}
              aria-label={t('projects.next')}
              className="carousel-arrow"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </ScrollReveal>

      {hasMany && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: dots }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`${t('projects.goTo')} ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-cyan-500'
                  : 'w-2 bg-gray-400/50 hover:bg-gray-400 dark:bg-white/25 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
