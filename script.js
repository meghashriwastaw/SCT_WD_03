const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // 9 cells on the board
let gameOver = false;

// Handle cell click
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

resetBtn.addEventListener('click', resetGame);

function handleClick(index) {
    if (board[index] || gameOver) return; // Cell already taken or game over

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        gameOver = true;
        status.textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        gameOver = true;
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameOver = false;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}
