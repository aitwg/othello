const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'black';
let gameBoard = [];

function initializeBoard() {
    for (let i = 0; i < 8; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => makeMove(i, j));
            board.appendChild(cell);
            gameBoard[i][j] = '';
        }
    }
    
    // 初始棋子
    setCell(3, 3, 'white');
    setCell(3, 4, 'black');
    setCell(4, 3, 'black');
    setCell(4, 4, 'white');
    
    updateStatus();
}

function setCell(row, col, color) {
    gameBoard[row][col] = color;
    const cell = board.children[row * 8 + col];
    cell.className = `cell ${color}`;
}

function makeMove(row, col) {
    if (gameBoard[row][col] !== '' || !isValidMove(row, col)) return;
    
    setCell(row, col, currentPlayer);
    flipPieces(row, col);
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updateStatus();
}

function isValidMove(row, col) {
    const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (const [dx, dy] of directions) {
        if (wouldFlip(row, col, dx, dy)) return true;
    }
    return false;
}

function wouldFlip(row, col, dx, dy) {
    let x = row + dx;
    let y = col + dy;
    if (x < 0 || x >= 8 || y < 0 || y >= 8 || gameBoard[x][y] === currentPlayer) return false;
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (gameBoard[x][y] === '') return false;
        if (gameBoard[x][y] === currentPlayer) return true;
        x += dx;
        y += dy;
    }
    return false;
}

function flipPieces(row, col) {
    const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (const [dx, dy] of directions) {
        if (wouldFlip(row, col, dx, dy)) {
            let x = row + dx;
            let y = col + dy;
            while (gameBoard[x][y] !== currentPlayer) {
                setCell(x, y, currentPlayer);
                x += dx;
                y += dy;
            }
        }
    }
}

function updateStatus() {
    let blackCount = 0;
    let whiteCount = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (gameBoard[i][j] === 'black') blackCount++;
            if (gameBoard[i][j] === 'white') whiteCount++;
        }
    }
    status.textContent = `黑棋: ${blackCount} | 白棋: ${whiteCount} | 目前回合: ${currentPlayer === 'black' ? '黑棋' : '白棋'}`;
}

initializeBoard();
