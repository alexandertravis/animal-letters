window.APP = window.APP || {};
(function (APP) {

  // ── Pure game logic ─────────────────────────────────────────────────────────

  var LINES = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  function checkWinner(board) {
    for (var i = 0; i < LINES.length; i++) {
      var a = LINES[i][0], b = LINES[i][1], c = LINES[i][2];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function isFull(board) {
    return board.every(function (cell) { return cell !== ''; });
  }

  // Returns index (0-8) of best move for robot ('R'), player is 'P'.
  function robotMove(board) {
    // 1) Try to win
    var win = findWinning(board, 'R');
    if (win !== -1) return win;
    // 2) Block player
    var block = findWinning(board, 'P');
    if (block !== -1) return block;
    // 3) Centre
    if (board[4] === '') return 4;
    // 4) Corners
    var corners = [0, 2, 6, 8];
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === '') return corners[i];
    }
    // 5) Sides
    var sides = [1, 3, 5, 7];
    for (var j = 0; j < sides.length; j++) {
      if (board[sides[j]] === '') return sides[j];
    }
    return -1;
  }

  function findWinning(board, mark) {
    for (var i = 0; i < LINES.length; i++) {
      var a = LINES[i][0], b = LINES[i][1], c = LINES[i][2];
      var cells = [board[a], board[b], board[c]];
      var myCount = cells.filter(function (v) { return v === mark; }).length;
      var emptyCount = cells.filter(function (v) { return v === ''; }).length;
      if (myCount === 2 && emptyCount === 1) {
        if (board[a] === '') return a;
        if (board[b] === '') return b;
        return c;
      }
    }
    return -1;
  }

  // ── Styles ──────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('tictactoe-css')) return;
    var s = document.createElement('style');
    s.id = 'tictactoe-css';
    s.textContent = [
      '.ttt-screen { flex:1; display:flex; flex-direction:column; min-height:0; }',
      '.ttt-body { flex:1; display:flex; flex-direction:column; align-items:center; padding:12px 16px; }',
      '.ttt-top { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }',
      '.ttt-footer { min-height:96px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }',
      '.ttt-status { font-size:1.2rem; font-weight:600; color:var(--accent,#e67e22); text-align:center; }',
      '.ttt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; width:min(300px,80vw); }',
      '.ttt-cell { aspect-ratio:1; font-size:2.8rem; border:3px solid #ccc; border-radius:12px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s,transform 0.1s; -webkit-tap-highlight-color:transparent; }',
      '.ttt-cell:not(:disabled):hover { background:#f5f5f5; transform:scale(1.04); }',
      '.ttt-cell:disabled { cursor:default; opacity:1; }',
      '.ttt-cell.winner { background:#fff9c4; border-color:#f9c74f; }',
      '.ttt-tally { display:flex; gap:24px; justify-content:center; align-items:flex-end; font-size:1rem; font-weight:700; color:#555; }',
      '.ttt-tally .tcol { display:flex; flex-direction:column; align-items:center; gap:2px; }',
      '.ttt-tally .ticon { font-size:1.6rem; line-height:1; }',
      '.ttt-tally .tscore { font-size:1.5rem; color:var(--accent,#e67e22); }',
      '.ttt-result { display:flex; flex-direction:column; align-items:center; gap:12px; }',
      '.ttt-result-msg { font-size:1.5rem; font-weight:700; text-align:center; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  function render(root, ctx) {
    injectStyles();

    var T = APP.t || function (k) { return k; };
    var settings = (APP.settings && APP.settings.game)
      ? APP.settings.game('tictactoe', { opponent: 'robot', first: 'player' })
      : { opponent: 'robot', first: 'player' };

    var board = ['','','','','','','','',''];
    var currentTurn = settings.first === 'robot' ? 'R' : 'P';
    var gameOver = false;
    var tally = { P: 0, R: 0, draw: 0 };  // P=player 1, R=player 2 / robot
    var recorded = false;                 // count each finished game only once

    function saveSettings(patch) {
      if (APP.settings && APP.settings.updateGame) {
        APP.settings.updateGame('tictactoe', patch, { opponent: 'robot', first: 'player' });
      }
    }

    function doRender() {
      root.innerHTML = '';
      var p1Icon = settings.playerIcon || '🐱';
      var p2Icon = settings.robotIcon || '🐶';
      var winner = checkWinner(board);
      if (gameOver && !recorded) {
        recorded = true;
        if (winner) tally[winner]++; else tally.draw++;
      }
      var screen = document.createElement('div');
      screen.className = 'ttt-screen';

      // ── Topbar ──────────────────────────────────────────────────────────────
      var topbar = APP.ui.topbar({
        ctx: ctx,
        title: T('game.tictactoe.title') || 'Noughts & Crosses',
        home: true,
        back: true,
        onRestart: function () {
          board = ['','','','','','','','',''];
          currentTurn = (settings.first === 'robot') ? 'R' : 'P';
          gameOver = false;
          recorded = false;
          doRender();
          if (settings.opponent === 'robot' && currentTurn === 'R') {
            scheduleRobot();
          }
        },
        settings: {
          gameId: 'tictactoe',
          title: T('ui.settings') || 'Settings',
          schema: [
            {
              key: 'opponent',
              label: T('game.tictactoe.opponent') || 'Play against',
              type: 'segmented',
              options: [
                { value: 'robot', label: T('game.tictactoe.robot') || 'Robot' },
                { value: 'friend', label: T('game.tictactoe.friend') || 'Friend' }
              ]
            },
            {
              key: 'first',
              label: T('game.tictactoe.first') || 'Who goes first',
              type: 'segmented',
              options: [
                { value: 'player', label: 'Player 1' },
                { value: 'robot',  label: settings.opponent === 'friend' ? 'Player 2' : (T('game.tictactoe.robot') || 'Robot') }
              ]
            },
            {
              key: 'playerIcon',
              label: 'Player 1 icon',
              type: 'segmented',
              options: [
                { value: '🐱', label: '🐱' }, { value: '🦊', label: '🦊' },
                { value: '🐸', label: '🐸' }, { value: '⭐', label: '⭐' },
                { value: '🦄', label: '🦄' }, { value: '🐙', label: '🐙' }
              ]
            },
            {
              key: 'robotIcon',
              label: settings.opponent === 'friend' ? 'Player 2 icon' : 'Robot icon',
              type: 'segmented',
              options: [
                { value: '🐶', label: '🐶' }, { value: '🐼', label: '🐼' },
                { value: '🤖', label: '🤖' }, { value: '🦁', label: '🦁' },
                { value: '🐯', label: '🐯' }, { value: '🎃', label: '🎃' }
              ]
            }
          ],
          onChange: function (key, val, all) {
            settings = all;
            saveSettings(all);
          }
        }
      });
      screen.appendChild(topbar);

      // ── Body ────────────────────────────────────────────────────────────────
      var body = document.createElement('div');
      body.className = 'ttt-body';

      var topZone = document.createElement('div');
      topZone.className = 'ttt-top';

      // Win tally (player 1 — draws — player 2/robot)
      var tallyEl = document.createElement('div');
      tallyEl.className = 'ttt-tally';
      tallyEl.innerHTML =
        '<div class="tcol"><span class="ticon">' + p1Icon + '</span><span class="tscore">' + tally.P + '</span></div>' +
        '<div class="tcol"><span class="ticon">🤝</span><span class="tscore">' + tally.draw + '</span></div>' +
        '<div class="tcol"><span class="ticon">' + p2Icon + '</span><span class="tscore">' + tally.R + '</span></div>';
      topZone.appendChild(tallyEl);

      // Grid
      var grid = document.createElement('div');
      grid.className = 'ttt-grid';

      var cellEls = [];
      for (var i = 0; i < 9; i++) {
        (function (idx) {
          var cell = document.createElement('button');
          cell.className = 'ttt-cell';
          cell.textContent = board[idx] === 'P' ? p1Icon : board[idx] === 'R' ? p2Icon : '';
          cell.disabled = board[idx] !== '' || gameOver;
          cell.addEventListener('click', function () {
            if (gameOver || board[idx] !== '') return;
            if (settings.opponent === 'robot' && currentTurn === 'R') return;
            if (APP.audio && APP.audio.sfx) APP.audio.sfx.click();
            board[idx] = currentTurn;
            var w = checkWinner(board);
            if (w || isFull(board)) {
              gameOver = true;
              doRender();
              if (w && APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
              if (w === 'P' && APP.launchConfetti) APP.launchConfetti({ count: 100, duration: 3000 });
              return;
            }
            currentTurn = currentTurn === 'P' ? 'R' : 'P';
            doRender();
            if (settings.opponent === 'robot' && currentTurn === 'R') {
              scheduleRobot();
            }
          });
          grid.appendChild(cell);
          cellEls.push(cell);
        })(i);
      }

      // Highlight winning line (winner computed at top of doRender)
      if (winner) {
        for (var li = 0; li < LINES.length; li++) {
          var a = LINES[li][0], b = LINES[li][1], c = LINES[li][2];
          if (board[a] === winner && board[b] === winner && board[c] === winner) {
            cellEls[a].classList.add('winner');
            cellEls[b].classList.add('winner');
            cellEls[c].classList.add('winner');
          }
        }
      }

      topZone.appendChild(grid);
      body.appendChild(topZone);

      // Fixed-height footer: shows status during play, result+buttons when game over
      var footer = document.createElement('div');
      footer.className = 'ttt-footer';

      if (gameOver) {
        var resultDiv = document.createElement('div');
        resultDiv.className = 'ttt-result';
        var msg = document.createElement('div');
        msg.className = 'ttt-result-msg';
        if (winner === 'P') {
          msg.textContent = settings.opponent === 'friend'
            ? p1Icon + ' Player 1 wins!'
            : (T('game.tictactoe.youWin') || 'You win!');
        } else if (winner === 'R') {
          msg.textContent = settings.opponent === 'friend'
            ? p2Icon + ' Player 2 wins!'
            : (T('game.tictactoe.robotWins') || 'Good try — robot wins!');
        } else {
          msg.textContent = T('game.tictactoe.draw') || "It's a draw!";
        }
        resultDiv.appendChild(msg);

        var againBtn = document.createElement('button');
        againBtn.className = 'btn';
        againBtn.textContent = T('ui.playAgain') || 'Play again';
        againBtn.addEventListener('click', function () {
          board = ['','','','','','','','',''];
          currentTurn = (settings.first === 'robot') ? 'R' : 'P';
          gameOver = false;
          recorded = false;
          doRender();
          if (settings.opponent === 'robot' && currentTurn === 'R') {
            scheduleRobot();
          }
        });
        resultDiv.appendChild(againBtn);

        // Great Job button only on player win
        if (winner === 'P') {
          var greatJobBtn = document.createElement('button');
          greatJobBtn.className = 'btn success';
          greatJobBtn.textContent = T('complete.greatJob') || 'Great Job! 🎉';
          greatJobBtn.addEventListener('click', function () {
            if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
            if (APP.launchConfetti) APP.launchConfetti({ count: 100, duration: 3000 });
          });
          resultDiv.appendChild(greatJobBtn);
        }

        footer.appendChild(resultDiv);
      } else {
        var statusEl = document.createElement('div');
        statusEl.className = 'ttt-status';
        if (settings.opponent === 'robot') {
          statusEl.textContent = currentTurn === 'P'
            ? (T('game.tictactoe.yourTurn') || 'Your turn!')
            : (T('game.tictactoe.robotThinking') || 'Thinking...');
        } else {
          statusEl.textContent = currentTurn === 'P'
            ? p1Icon + ' Player 1\'s turn'
            : p2Icon + ' Player 2\'s turn';
        }
        footer.appendChild(statusEl);
      }

      body.appendChild(footer);
      screen.appendChild(body);
      root.appendChild(screen);
    }

    function scheduleRobot() {
      setTimeout(function () {
        if (gameOver) return;
        var idx = robotMove(board);
        if (idx === -1) return;
        if (APP.audio && APP.audio.sfx) APP.audio.sfx.click();
        board[idx] = 'R';
        var w = checkWinner(board);
        if (w || isFull(board)) {
          gameOver = true;
          doRender();
          if (w && APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
          return;
        }
        currentTurn = 'P';
        doRender();
      }, 500);
    }

    doRender();

    if (settings.opponent === 'robot' && currentTurn === 'R') {
      scheduleRobot();
    }
  }

  // ── Exports ─────────────────────────────────────────────────────────────────
  APP.screens = APP.screens || {};
  APP.screens.tictactoe = { render: render };

  // Expose pure functions for unit tests
  APP.tictactoe = {
    robotMove: robotMove,
    checkWinner: checkWinner
  };

})(window.APP);
