// Game state variables
let gameState = {
    economy: 50,
    publicOpinion: 50,
    personalWealth: 20,
    foreignRelations: 50,
    turn: 1,
    gameOver: false
};

// Product categories
const productCategories = [
    'Cheese', 'Electronics', 'Textiles', 'Automobiles', 'Pharmaceuticals', 
    'Agriculture', 'Steel', 'Luxury goods', 'Timber', 'Energy'
];

// Trade representatives (to be expanded)
const representatives = [
    { name: "Ambassador Wong", tendency: "high-tariff" },
    { name: "Envoy Chen", tendency: "low-tariff" },
    { name: "Minister Dubois", tendency: "high-bribe" },
    { name: "Delegate Smith", tendency: "balanced" },
    { name: "Consul Rodriguez", tendency: "low-bribe" }
];

// Current trade request
let currentRequest = {
    representative: null,
    product: null,
    tariffLevel: 0,
    bribeAmount: 0,
    timer: 5
};

// Timer reference
let decisionTimer;

// Initialize the game
function initGame() {
    // Reset game state
    gameState = {
        economy: 50,
        publicOpinion: 50,
        personalWealth: 20,
        foreignRelations: 50,
        turn: 1,
        gameOver: false
    };
    
    // Update UI displays
    updateMetrics();
    
    // Generate first trade request
    generateTradeRequest();
}

// Generate a new trade request
function generateTradeRequest() {
    if (gameState.gameOver) return;
    
    // Select random representative
    const rep = representatives[Math.floor(Math.random() * representatives.length)];
    
    // Select random product category
    const product = productCategories[Math.floor(Math.random() * productCategories.length)];
    
    // Generate tariff level based on representative tendency
    let tariffLevel;
    if (rep.tendency === "high-tariff") {
        tariffLevel = Math.floor(Math.random() * 31) + 70; // 70-100%
    } else if (rep.tendency === "low-tariff") {
        tariffLevel = Math.floor(Math.random() * 31); // 0-30%
    } else {
        tariffLevel = Math.floor(Math.random() * 101); // 0-100%
    }
    
    // Generate bribe amount based on representative tendency
    let bribeAmount;
    if (rep.tendency === "high-bribe") {
        bribeAmount = Math.floor(Math.random() * 6) + 5; // 5-10
    } else if (rep.tendency === "low-bribe") {
        bribeAmount = Math.floor(Math.random() * 3) + 1; // 1-3
    } else {
        bribeAmount = Math.floor(Math.random() * 10) + 1; // 1-10
    }
    
    // Set current request
    currentRequest = {
        representative: rep,
        product: product,
        tariffLevel: tariffLevel,
        bribeAmount: bribeAmount,
        timer: 5
    };
    
    // Display the request
    displayTradeRequest();
    
    // Start the timer
    startTimer();
}

// Display the trade request in the UI
function displayTradeRequest() {
    document.getElementById('representative-name').textContent = currentRequest.representative.name;
    document.getElementById('trade-request').textContent = 
        `Sir, I propose a ${currentRequest.tariffLevel}% tariff on ${currentRequest.product}.`;
    
    document.getElementById('bribe-offer').textContent = 
        `I'm also prepared to offer a ${currentRequest.bribeAmount} unit contribution to your personal funds.`;
    
    document.getElementById('timer').textContent = currentRequest.timer;
}

// Start the decision timer
function startTimer() {
    // Clear any existing timer
    clearInterval(decisionTimer);
    
    // Reset timer display
    currentRequest.timer = 5;
    document.getElementById('timer').textContent = currentRequest.timer;
    
    // Start countdown
    decisionTimer = setInterval(() => {
        currentRequest.timer--;
        document.getElementById('timer').textContent = currentRequest.timer;
        
        // Time's up
        if (currentRequest.timer <= 0) {
            clearInterval(decisionTimer);
            // Default action: reject both tariff and bribe
            processTariffDecision(false);
            processBribeDecision(false);
        }
    }, 1000);
}

// Process tariff decision (accept/reject)
function processTariffDecision(accept) {
    // Stop the timer
    clearInterval(decisionTimer);
    
    if (accept) {
        // Apply consequences based on tariff level
        if (currentRequest.tariffLevel > 50) {
            // High tariff
            updateGameState({
                economy: -5,
                publicOpinion: +2,
                foreignRelations: -3
            });
        } else {
            // Low tariff
            updateGameState({
                economy: +3,
                publicOpinion: -2,
                foreignRelations: +2
            });
        }
    }
    
    // Check game over conditions
    checkGameOver();
    
    // If game not over, proceed to next turn
    if (!gameState.gameOver) {
        gameState.turn++;
        setTimeout(generateTradeRequest, 2000); // 2-second pause before next representative
    }
}

// Process bribe decision (accept/reject)
function processBribeDecision(accept) {
    if (accept) {
        // Accept bribe
        updateGameState({
            personalWealth: +currentRequest.bribeAmount
        });
        
        // Check if bribe is discovered (30% chance)
        if (Math.random() < 0.3) {
            updateGameState({
                publicOpinion: -3
            });
            
            // Random additional effect on economy
            const economicEffect = Math.floor(Math.random() * 11) - 5; // -5 to +5
            updateGameState({
                economy: economicEffect
            });
            
            // Show bribe discovered message
            document.getElementById('bribe-status').textContent = "Bribe discovered! Public opinion has suffered.";
        } else {
            document.getElementById('bribe-status').textContent = "Bribe accepted safely.";
        }
    } else {
        // Reject bribe
        updateGameState({
            personalWealth: -2,
            publicOpinion: +1
        });
        document.getElementById('bribe-status').textContent = "Bribe rejected. Slight popularity boost.";
    }
    
    // Check game over conditions
    checkGameOver();
}

// Update game state with changes
function updateGameState(changes) {
    // Apply all changes
    for (const [metric, change] of Object.entries(changes)) {
        gameState[metric] += change;
        
        // Ensure values stay within 0-100 range
        gameState[metric] = Math.max(0, Math.min(100, gameState[metric]));
    }
    
    // Update UI
    updateMetrics();
}

// Update metrics display in UI
function updateMetrics() {
    document.getElementById('economy-value').textContent = gameState.economy;
    document.getElementById('public-opinion-value').textContent = gameState.publicOpinion;
    document.getElementById('personal-wealth-value').textContent = gameState.personalWealth;
    document.getElementById('foreign-relations-value').textContent = gameState.foreignRelations;
    
    // Update progress bars if they exist
    document.getElementById('economy-bar').style.width = `${gameState.economy}%`;
    document.getElementById('public-opinion-bar').style.width = `${gameState.publicOpinion}%`;
    document.getElementById('personal-wealth-bar').style.width = `${gameState.personalWealth}%`;
    document.getElementById('foreign-relations-bar').style.width = `${gameState.foreignRelations}%`;
}

// Check for game over conditions
function checkGameOver() {
    const metrics = ['economy', 'publicOpinion', 'personalWealth', 'foreignRelations'];
    
    for (const metric of metrics) {
        if (gameState[metric] <= 0 || gameState[metric] >= 100) {
            gameState.gameOver = true;
            showGameOver(metric, gameState[metric]);
            return;
        }
    }
}

// Show game over screen
function showGameOver(failingMetric, value) {
    // Clear timer
    clearInterval(decisionTimer);
    
    // Hide game UI
    document.getElementById('game-container').style.display = 'none';
    
    // Show game over screen
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'block';
    
    // Set score
    document.getElementById('final-score').textContent = 
        `Turns survived: ${gameState.turn} | Personal Wealth: ${gameState.personalWealth}`;
    
    // Set ending scenario based on failing metric and value
    let scenario = "";
    
    if (failingMetric === 'economy') {
        if (value <= 0) {
            scenario = "Your nation has collapsed into economic ruin. The currency is worthless, shops are empty, and the people roam the streets in search of basic necessities.";
        } else {
            scenario = "Your economic policies have created an unsustainable bubble. The markets have crashed, taking your country's future with them.";
        }
    } else if (failingMetric === 'publicOpinion') {
        if (value <= 0) {
            scenario = "The people have revolted against your tyrannical rule. Your palace has been stormed, and you're now fleeing in disguise.";
        } else {
            scenario = "Your populist policies have led to unrealistic expectations. The adoring crowds have turned violent when you couldn't deliver impossible promises.";
        }
    } else if (failingMetric === 'personalWealth') {
        if (value <= 0) {
            scenario = "Without funds to maintain your lifestyle or bribe officials, you've lost all power and influence. Your former allies have abandoned you.";
        } else {
            scenario = "Your obscene wealth has drawn international scrutiny. Investigations into corruption have forced you to flee to a non-extradition country.";
        }
    } else if (failingMetric === 'foreignRelations') {
        if (value <= 0) {
            scenario = "International sanctions have isolated your country. Foreign powers are now backing a coup against your government.";
        } else {
            scenario = "Your spineless foreign policy has made you a puppet state. Foreign powers now control your economy and government from the shadows.";
        }
    }
    
    document.getElementById('ending-scenario').textContent = scenario;
}

// Event listeners for buttons
document.getElementById('accept-tariff').addEventListener('click', () => {
    processTariffDecision(true);
});

document.getElementById('reject-tariff').addEventListener('click', () => {
    processTariffDecision(false);
});

document.getElementById('accept-bribe').addEventListener('click', () => {
    processBribeDecision(true);
});

document.getElementById('reject-bribe').addEventListener('click', () => {
    processBribeDecision(false);
});

document.getElementById('restart-button').addEventListener('click', () => {
    // Hide game over screen
    document.getElementById('game-over-screen').style.display = 'none';
    
    // Show game UI
    document.getElementById('game-container').style.display = 'block';
    
    // Reset bribe status
    document.getElementById('bribe-status').textContent = "";
    
    // Initialize new game
    initGame();
});

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);