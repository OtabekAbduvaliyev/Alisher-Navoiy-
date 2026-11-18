import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgressPercent,
  clampSlideIndex,
  filterWorksByCategory,
  formatSlideCounter,
  getSlideIndexByGroup,
  getSlideIndexFromQuery,
  nextSlideIndex,
  prevSlideIndex,
  resolvePresentationKeyAction,
} from './presentation';

test('slide navigation clamps boundaries cleanly', () => {
  assert.equal(clampSlideIndex(-3, 8), 0);
  assert.equal(clampSlideIndex(15, 8), 7);
  assert.equal(nextSlideIndex(0, 8), 1);
  assert.equal(nextSlideIndex(7, 8), 7);
  assert.equal(prevSlideIndex(0, 8), 0);
  assert.equal(prevSlideIndex(4, 8), 3);
});

test('slide counter and progress percent format accurately', () => {
  assert.equal(formatSlideCounter(0, 8), '01 / 08');
  assert.equal(formatSlideCounter(7, 8), '08 / 08');
  assert.equal(calculateProgressPercent(0, 8), 13);
  assert.equal(calculateProgressPercent(7, 8), 100);
});

test('nav group lookup maps to exact chapter slides', () => {
  assert.equal(getSlideIndexByGroup('prologue'), 0);
  assert.equal(getSlideIndexByGroup('chronicle'), 1);
  assert.equal(getSlideIndexByGroup('khamsa'), 5);
  assert.equal(getSlideIndexByGroup('legacy'), 6);
});

test('query string resolves 1-based slide number or slug', () => {
  assert.equal(getSlideIndexFromQuery('?slide=6'), 5);
  assert.equal(getSlideIndexFromQuery('?slide=khamsa'), 5);
  assert.equal(getSlideIndexFromQuery('?autostart=1'), 0);
  assert.equal(getSlideIndexFromQuery('?slide=invalid'), 0);
});

test('works filter returns expected Uzbek categories', () => {
  const all = filterWorksByCategory('Barchasi');
  const linguistics = filterWorksByCategory('Tilshunoslik');
  const poetry = filterWorksByCategory('Nazm');

  assert.equal(all.length, 6);
  assert.equal(linguistics.length, 2);
  assert.ok(linguistics.every((w) => w.category === 'Tilshunoslik'));
  assert.ok(poetry.length >= 2);
});

test('keyboard resolution respects overlays and numeric shortcuts', () => {
  assert.deepEqual(
    resolvePresentationKeyAction('ArrowRight', {
      hasModalOpen: false,
      isEditableTarget: false,
    }),
    { type: 'next' }
  );

  assert.deepEqual(
    resolvePresentationKeyAction('6', {
      hasModalOpen: false,
      isEditableTarget: false,
      totalSlides: 8,
    }),
    { type: 'jump', index: 5 }
  );

  assert.equal(
    resolvePresentationKeyAction('ArrowRight', {
      hasModalOpen: true,
      isEditableTarget: false,
    }),
    null
  );

  assert.deepEqual(
    resolvePresentationKeyAction('Escape', {
      hasModalOpen: true,
      isEditableTarget: false,
    }),
    { type: 'close-overlays' }
  );
});
