/**
 * tests/maze.test.js
 *
 * Unit tests for the maze generator pure function:
 *   generateMaze(N, seed) — exposed on APP.maze.generateMaze
 *
 * Tests:
 *   1. Maze is connected: every cell is reachable from (0,0) via open walls.
 *   2. Maze is acyclic: a spanning tree has exactly N*N - 1 edges removed
 *      (i.e. total open passages = N*N - 1).
 */

await import('../js/screens/maze.js');

const { generateMaze } = APP.maze;

// ── helpers ─────────────────────────────────────────────────────────────────

// BFS from (0,0), returns the set of visited cell keys "r,c"
function bfsReachable(grid, N) {
  const visited = new Set();
  const queue = [[0, 0]];
  visited.add('0,0');

  const moves = [
    { dr: -1, dc:  0, wall: 'top'    },
    { dr:  1, dc:  0, wall: 'bottom' },
    { dr:  0, dc: -1, wall: 'left'   },
    { dr:  0, dc:  1, wall: 'right'  },
  ];

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const m of moves) {
      const nr = r + m.dr;
      const nc = c + m.dc;
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (grid[r][c][m.wall]) continue; // wall present
      const key = nr + ',' + nc;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc]);
      }
    }
  }

  return visited;
}

// Count total open (removed) walls from the "source" side only (avoid double-counting).
// An open passage between (r,c) and its right/bottom neighbour is counted once.
function countEdges(grid, N) {
  let edges = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (c + 1 < N && !grid[r][c].right) edges++; // horizontal passage
      if (r + 1 < N && !grid[r][c].bottom) edges++; // vertical passage
    }
  }
  return edges;
}

// ── tests ────────────────────────────────────────────────────────────────────

describe('generateMaze — connectivity', () => {
  it('every cell is reachable from (0,0) for N=4', () => {
    const N = 4;
    const grid = generateMaze(N, 42);
    const reachable = bfsReachable(grid, N);
    expect(reachable.size).toBe(N * N);
  });

  it('every cell is reachable from (0,0) for N=6', () => {
    const N = 6;
    const grid = generateMaze(N, 1234);
    const reachable = bfsReachable(grid, N);
    expect(reachable.size).toBe(N * N);
  });

  it('every cell is reachable from (0,0) for N=10', () => {
    const N = 10;
    const grid = generateMaze(N, 99999);
    const reachable = bfsReachable(grid, N);
    expect(reachable.size).toBe(N * N);
  });

  it('works with different seeds and still connects all cells', () => {
    const N = 8;
    for (const seed of [0, 1, 7, 100, 999]) {
      const grid = generateMaze(N, seed);
      const reachable = bfsReachable(grid, N);
      expect(reachable.size).toBe(N * N);
    }
  });
});

describe('generateMaze — acyclic (spanning tree)', () => {
  it('has exactly N*N - 1 open passages for N=4 (spanning tree)', () => {
    const N = 4;
    const grid = generateMaze(N, 7);
    expect(countEdges(grid, N)).toBe(N * N - 1);
  });

  it('has exactly N*N - 1 open passages for N=6', () => {
    const N = 6;
    const grid = generateMaze(N, 42);
    expect(countEdges(grid, N)).toBe(N * N - 1);
  });

  it('has exactly N*N - 1 open passages for N=10', () => {
    const N = 10;
    const grid = generateMaze(N, 314);
    expect(countEdges(grid, N)).toBe(N * N - 1);
  });
});

describe('generateMaze — wall consistency', () => {
  it('wall between adjacent cells is symmetric (right ↔ left, bottom ↔ top)', () => {
    const N = 6;
    const grid = generateMaze(N, 55);
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (c + 1 < N) {
          expect(grid[r][c].right).toBe(grid[r][c+1].left);
        }
        if (r + 1 < N) {
          expect(grid[r][c].bottom).toBe(grid[r+1][c].top);
        }
      }
    }
  });
});
