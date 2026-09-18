import { useEffect } from 'react';

/**
 * Shared module-level scroll engine across all pages and tabs.
 * Solves trackpad and high-speed mouse momentum inertia:
 * 1. Cooldown timer locks rapid re-triggering.
 * 2. Gesture detection consumes the gesture until at least 280ms of silence,
 *    preventing trailing momentum from bleeding into subsequent pages or tabs.
 */
let globalLastScrollTime = 0;
let globalIsLocked = false;
let globalGestureConsumed = false;
let globalGestureTimer = null;
let globalUnlockTimer = null;
let globalCooldownDuration = 900;

export function lockGlobalScroll(duration = 1000) {
  globalIsLocked = true;
  globalGestureConsumed = true;
  globalLastScrollTime = Date.now();
  globalCooldownDuration = duration;

  if (globalUnlockTimer) clearTimeout(globalUnlockTimer);
  globalUnlockTimer = setTimeout(() => {
    globalIsLocked = false;
  }, duration);
}

export function notifyWheelGesture() {
  if (globalGestureTimer) clearTimeout(globalGestureTimer);
  globalGestureTimer = setTimeout(() => {
    globalGestureConsumed = false;
  }, 280);
}

export function isGlobalScrollLocked(thresholdMs = null) {
  const now = Date.now();
  const limit = thresholdMs !== null ? thresholdMs : globalCooldownDuration;
  if (globalIsLocked) return true;
  if (globalGestureConsumed) return true;
  if (now - globalLastScrollTime < limit) return true;
  return false;
}

/**
 * useScrollJumper
 * Controls full-page jumping and internal tab switching on mouse wheel / scroll gestures.
 * 
 * @param {Object} options
 * @param {Array<string>} [options.items] - List of tab IDs (if page has internal tabs)
 * @param {number} [options.currentIndex] - Current active tab index
 * @param {Function} [options.onStepChange] - Callback when changing internal tab (newIndex)
 * @param {Function} [options.onNextPage] - Callback when jumping to next page
 * @param {Function} [options.onPrevPage] - Callback when jumping to previous page
 * @param {React.RefObject} [options.containerRef] - Container ref (window is used on desktop)
 * @param {boolean} [options.disabled] - If true (e.g. modal/lightbox active), ignore scroll jumps
 */
export function useScrollJumper({
  items = [],
  currentIndex = 0,
  onStepChange,
  onNextPage,
  onPrevPage,
  containerRef,
  disabled = false
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleWheel = (e) => {
      if (disabled) return;

      // Ensure desktop view only
      if (window.innerWidth <= 960) return;
      if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

      // Ignore scroll if currently focusing an input or textarea
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      // Always prevent native scroll jump on desktop viewport
      e.preventDefault();

      // Extend gesture timer on any wheel activity to absorb momentum
      notifyWheelGesture();

      // Check shared global lock
      if (isGlobalScrollLocked()) {
        return;
      }

      // Normalize delta
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 35;
      else if (e.deltaMode === 2) delta *= 400;

      // Intentional threshold to filter out accidental micro-gestures
      if (Math.abs(delta) < 40) return;

      if (delta > 0) {
        // SCROLL DOWN -> NEXT
        if (items.length > 0 && currentIndex < items.length - 1) {
          // Advance to next tab (750ms cooldown)
          lockGlobalScroll(750);
          onStepChange?.(currentIndex + 1);
        } else if (onNextPage) {
          // Jump to next page (1200ms cooldown to completely absorb finger flick)
          lockGlobalScroll(1200);
          onNextPage();
        }
      } else if (delta < 0) {
        // SCROLL UP -> PREVIOUS
        if (items.length > 0 && currentIndex > 0) {
          // Move to previous tab (750ms cooldown)
          lockGlobalScroll(750);
          onStepChange?.(currentIndex - 1);
        } else if (onPrevPage) {
          // Jump to previous page (1200ms cooldown)
          lockGlobalScroll(1200);
          onPrevPage();
        }
      }
    };

    const targetEl = window;
    targetEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      targetEl.removeEventListener('wheel', handleWheel);
    };
  }, [items, currentIndex, onStepChange, onNextPage, onPrevPage, containerRef, disabled]);
}

