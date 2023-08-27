$(document).ready(function () {
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    const messageElement = $('#message');

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                messageElement.text(`${currentPlayer} a gagné !`).css('color', 'green');
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            messageElement.text("Match nul !").css('color', 'orange');
        }

        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }

    function makeMove(cell) {
        const index = $(cell).index();

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            $(cell).text(currentPlayer);
            checkWinner();
        }
    }

    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        messageElement.text('').css('color', '');
        $('.cell').text('');
    }

    $('.cell').on('click', function () {
        makeMove(this);
    });

    $('#reset').on('click', function () {
        resetBoard();
    });

    resetBoard();
});
