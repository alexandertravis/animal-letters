import { describe, it, expect } from 'vitest';

function dotMetrics(dots) {
  var minDist = Infinity;
  for (var i = 0; i < dots.length - 1; i++) {
    var dx = dots[i+1].x - dots[i].x, dy = dots[i+1].y - dots[i].y;
    var d = Math.sqrt(dx*dx + dy*dy);
    if (d < minDist) minDist = d;
  }
  if (dots.length > 1) {
    var dx0 = dots[0].x - dots[dots.length-1].x, dy0 = dots[0].y - dots[dots.length-1].y;
    var d0 = Math.sqrt(dx0*dx0 + dy0*dy0);
    if (d0 < minDist) minDist = d0;
  }
  if (!isFinite(minDist) || minDist <= 0) minDist = 30;
  return {
    r:       Math.max(3.5, Math.min(6,   minDist * 0.28)),
    rNext:   Math.max(5,   Math.min(11,  minDist * 0.40)),
    rActive: Math.max(6,   Math.min(13,  minDist * 0.45)),
    hit:     Math.max(12,  Math.min(28,  minDist * 0.50)),
    label:   Math.max(6,   Math.min(8.5, minDist * 0.30))
  };
}

describe('dotMetrics', () => {
  it('caps at max values for sparse dots (dist=50)', () => {
    const dots = [{x:0,y:0},{x:50,y:0},{x:100,y:0}];
    const m = dotMetrics(dots);
    expect(m.r).toBe(6);
    expect(m.hit).toBe(25);
  });
  it('clamps at min values for dense dots (dist=14)', () => {
    const dots = [{x:0,y:0},{x:14,y:0},{x:28,y:0}];
    const m = dotMetrics(dots);
    expect(m.r).toBeGreaterThanOrEqual(3.5);
    expect(m.hit).toBeGreaterThanOrEqual(12);
    expect(m.hit).toBeLessThanOrEqual(28);
  });
  it('handles single dot without crash', () => {
    const m = dotMetrics([{x:100,y:100}]);
    expect(m.r).toBeGreaterThan(0);
    expect(m.hit).toBeGreaterThan(0);
  });
  it('all returned values are finite numbers', () => {
    const m = dotMetrics([{x:0,y:0},{x:20,y:0}]);
    expect(Number.isFinite(m.r)).toBe(true);
    expect(Number.isFinite(m.rNext)).toBe(true);
    expect(Number.isFinite(m.rActive)).toBe(true);
    expect(Number.isFinite(m.hit)).toBe(true);
    expect(Number.isFinite(m.label)).toBe(true);
  });
});
