/**
 * tests/tictactoe.test.js
 *
 * Unit tests for the tictactoe AI pure functions:
 *   - robotMove(board)  — best move for 'R', player is 'P'
 *   - checkWinner(board) — returns 'P', 'R', or null
 *
 * These functions are exposed on APP.tictactoe by js/screens/tictactoe.js.
 * The file is loaded in this test via a direct import (side-effect only).
 */

// Load the tictactoe screen module so APP.tictactoe is populated.
// We must set up a minimal DOM-like environment first (jsdom provides it).
await import('../js/screens/tictactoe.js');

const { robotMove, checkWinner } = APP.tictactoe;

// Helper: make a board from a 9-character string, using 'P'/'R'/' '
function board(str) {
  return str.split('').map(function (ch) {
    return ch === ' ' ? '' : ch;
  });
}

// ────────────────────────────────────────────────────────────────────────────
// checkWinner
// ────────────────────────────────────────────────────────────────────────────

describe('checkWinner', () => {
  it('returns null for an empty board', () => {
    expect(checkWinner(board('         '))).toBeNull();
  });

  it('detects a row win for P', () => {
    // P fills top row
    expect(checkWinner(board('PPP      '))).toBe('P');
  });

  it('detects a column win for R', () => {
    // R fills left column
    expect(checkWinner(board('R  R  R  '))).toBe('R');
  });

  it('detects a diagonal win for P', () => {
    // P fills main diagonal (0,4,8)
    expect(checkWinner(board('P   P   P'))).toBe('P');
  });

  it('detects the anti-diagonal win for R', () => {
    // R fills anti-diagonal (2,4,6)
    expect(checkWinner(board('  R R R  '))).toBe('R');
  });

  it('returns null when board is full but no winner (draw)', () => {
    // P R P / R P R / R P R  → no 3-in-a-row for either player
    // Row 0: P R P — mixed
    // Row 1: R P R — mixed
    // Row 2: R P R — mixed
    // Cols: 0=P,R,R 1=R,P,P 2=P,R,R — no line
    // Diagonals: 0,4,8=P,P,R and 2,4,6=P,P,R — no line
    expect(checkWinner(['P','R','P','R','P','R','R','P','R'])).toBeNull();
  });
});

// ────────────────────────────────────────────────────────────────────────────
// robotMove — win
// ────────────────────────────────────────────────────────────────────────────

describe('robotMove — takes winning move', () => {
  it('completes a row win when two R cells are in a line', () => {
    // R R _ / _ _ _ / _ _ _  → robot should pick index 2
    const b = board('RR       ');
    expect(robotMove(b)).toBe(2);
  });

  it('completes a column win', () => {
    // _ _ R / _ _ R / _ _ _  → robot picks index 8 (col 2)
    const b = board('  R  R   ');
    expect(robotMove(b)).toBe(8);
  });

  it('completes a diagonal win', () => {
    // R _ _ / _ R _ / _ _ _  → robot picks index 8 (main diagonal)
    const b = board('R   R    ');
    expect(robotMove(b)).toBe(8);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// robotMove — block
// ────────────────────────────────────────────────────────────────────────────

describe('robotMove — blocks player', () => {
  it('blocks a row win for P', () => {
    // P P _ / _ _ _ / _ _ _  → must block index 2
    const b = board('PP       ');
    expect(robotMove(b)).toBe(2);
  });

  it('blocks a column win for P', () => {
    // _ P _ / _ P _ / _ _ _  → must block index 7 (col 1)
    const b = board(' P  P    ');
    expect(robotMove(b)).toBe(7);
  });

  it('prefers winning over blocking', () => {
    // R R _ / P P _ / _ _ _  → robot wins at index 2 rather than blocking at 5
    const b = board('RR PP    ');
    expect(robotMove(b)).toBe(2);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// robotMove — preference: centre, corner, side
// ────────────────────────────────────────────────────────────────────────────

describe('robotMove — positional preferences', () => {
  it('picks centre (index 4) on an empty board', () => {
    expect(robotMove(board('         '))).toBe(4);
  });

  it('picks a corner when centre is taken and no win/block needed', () => {
    // Only centre is occupied by P; nothing to win or block yet
    const b = board('    P    ');
    const move = robotMove(b);
    expect([0, 2, 6, 8]).toContain(move);
  });

  it('picks a side when centre and all corners are taken', () => {
    // Centre + all corners taken; no win/block situation
    const b = board('R R PRP R'); // 0=R,2=R,4=P,6=R,8=R; sides 1,3,5,7 empty
    // Reset to avoid misleading: craft a cleaner board
    const b2 = ['R','','R','','P','','R','','R'];
    const move = robotMove(b2);
    expect([1, 3, 5, 7]).toContain(move);
  });
});
