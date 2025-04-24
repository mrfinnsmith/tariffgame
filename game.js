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

// Trade representatives array with unique personalities
const representatives = [
    {
        name: "Ambassador Wong",
        tendency: "high-tariff",
        products: ["Electronics", "Steel"],
        bribes: [5, 8],
        dialoguePatterns: [
            "Sir, your transcendent economic vision demands this {tariff}% tariff on {product}. Only a leader of your caliber could recognize how this perfectly balances our domestic interests, despite minor foreign complaints.",
            "Sir, implementing this {tariff}% {product} tariff showcases your unmatched strategic prowess. The slight trade complications are nothing compared to your economic genius."
        ]
    },
    {
        name: "Envoy Chen",
        tendency: "low-tariff",
        products: ["Textiles", "Agriculture"],
        bribes: [2, 3],
        dialoguePatterns: [
            "Sir, your economic brilliance will surely recognize that this modest {tariff}% tariff on {product} reflects your forward-thinking approach to global trade. Your wisdom in these matters remains unparalleled.",
            "Sir, only someone with your exceptional foresight could appreciate how this {tariff}% {product} tariff will maintain our crucial international relationships. Your leadership continues to astound us all."
        ]
    },
    {
        name: "Minister Dubois",
        tendency: "high-bribe",
        products: ["Luxury goods", "Pharmaceuticals"],
        bribes: [7, 10],
        dialoguePatterns: [
            "Sir, your unrivaled economic acumen surely sees the benefits of this {tariff}% {product} tariff. As a token of appreciation for your brilliant leadership, I've arranged a substantial personal contribution.",
            "Sir, implementing this {tariff}% tariff on {product} would be yet another testament to your economic genius. Our industry leaders are so inspired they wish to express their gratitude through a modest gift."
        ]
    },
    {
        name: "Delegate Smith",
        tendency: "balanced",
        products: ["Automobiles", "Energy"],
        bribes: [3, 6],
        dialoguePatterns: [
            "Sir, your renowned economic wisdom will certainly recognize the balanced approach of this {tariff}% {product} tariff. Your unique ability to see all sides of complex issues continues to amaze us all.",
            "Sir, only a visionary leader like yourself could fully appreciate how this {tariff}% tariff on {product} harmonizes our various economic interests. Your balanced judgment remains unmatched."
        ]
    },
    {
        name: "Consul Rodriguez",
        tendency: "low-bribe",
        products: ["Timber", "Cheese"],
        bribes: [1, 2],
        dialoguePatterns: [
            "Sir, your extraordinary economic foresight surely recognizes how this {tariff}% {product} tariff will benefit our nation. A small token of appreciation awaits your wise decision.",
            "Sir, implementing this {tariff}% tariff on {product} would be another stroke of your economic brilliance. Please accept this modest contribution as a symbol of our admiration."
        ]
    },
    // Remaining representatives kept for brevity
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

// Representative selection function
function selectRepresentative() {
    return representatives[Math.floor(Math.random() * representatives.length)];
}

// Generate dialogue based on representative, product, and tariff level
function generateDialogue(representative, product, tariffLevel) {
    // Select random dialogue pattern from the representative
    const pattern = representative.dialoguePatterns[Math.floor(Math.random() * representative.dialoguePatterns.length)];
    
    // Replace placeholders with actual values
    return pattern.replace("{tariff}", tariffLevel).replace("{product}", product);
}

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
    generateNewTradeRequest();
    
    // Clear any status messages
    clearStatusMessages();
}

// Generate a new trade request
function generateNewTradeRequest() {
    if (gameState.gameOver) return;
    
    // Select random representative
    const rep = selectRepresentative();
    
    // Select random product from representative's preferences
    const product = rep.products[Math.floor(Math.random() * rep.products.length)];
    
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
        bribeAmount = rep.bribes[1]; // Higher bribe amount
    } else if (rep.tendency === "low-bribe") {
        bribeAmount = rep.bribes[0]; // Lower bribe amount
    } else {
        bribeAmount = rep.bribes[Math.floor(Math.random() * 2)]; // Random between the two
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

// Clear status messages
function clearStatusMessages() {
    const statusElement = document.getElementById('bribe-status');
    if (statusElement) {
        statusElement.textContent = "";
    }
}

// Display the trade request in the UI
function displayTradeRequest() {
    // Update representative name
    document.getElementById('rep-name').textContent = currentRequest.representative.name;
    
    // Generate and display dialogue
    const dialogue = generateDialogue(
        currentRequest.representative, 
        currentRequest.product, 
        currentRequest.tariffLevel
    );
    document.getElementById('rep-dialogue').textContent = dialogue;
    
    // Update product and tariff information
    document.getElementById('product-category').textContent = `Product: ${currentRequest.product}`;
    document.getElementById('tariff-level').textContent = `Proposed Tariff: ${currentRequest.tariffLevel}%`;
    
    // Update bribe information
    document.getElementById('bribe-amount').textContent = `Bribe Offer: ${currentRequest.bribeAmount} units`;
    
    // Reset timer display
    document.getElementById('timer-text').textContent = `Time Remaining: ${currentRequest.timer}s`;
    
    // Reset timer bar
    resetTimerBar();
}

// Reset and animate timer bar
function resetTimerBar() {
    const timerFill = document.getElementById('timer-fill');
    
    // Reset the animation
    timerFill.style.transition = 'none';
    timerFill.style.width = '100%';
    
    // Force a reflow to ensure the reset takes effect
    void timerFill.offsetWidth;
    
    // Start the animation
    timerFill.style.transition = 'width linear 5s';
    timerFill.style.width = '0%';
}

// Start the decision timer
function startTimer() {
    // Clear any existing timer
    clearInterval(decisionTimer);
    
    // Reset timer display
    currentRequest.timer = 5;
    document.getElementById('timer-text').textContent = `Time Remaining: ${currentRequest.timer}s`;
    
    // Start countdown
    decisionTimer = setInterval(() => {
        currentRequest.timer--;
        document.getElementById('timer-text').textContent = `Time Remaining: ${currentRequest.timer}s`;
        
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
            
            // Show impact message
            updateTariffStatus(`High tariff accepted: Economy -5, Public Opinion +2, Foreign Relations -3`);
        } else {
            // Low tariff
            updateGameState({
                economy: +3,
                publicOpinion: -2,
                foreignRelations: +2
            });
            
            // Show impact message
            updateTariffStatus(`Low tariff accepted: Economy +3, Public Opinion -2, Foreign Relations +2`);
        }
    } else {
        // Tariff rejected - minimal impact
        updateGameState({
            economy: +1,
            foreignRelations: -1
        });
        
        // Show impact message
        updateTariffStatus(`Tariff rejected: Economy +1, Foreign Relations -1`);
    }
}

// Update tariff status message
function updateTariffStatus(message) {
    const impactInfo = document.getElementById('tariff-impact');
    if (impactInfo) {
        impactInfo.textContent = message;
        
        // Highlight the message briefly
        impactInfo.classList.add('highlight');
        setTimeout(() => {
            impactInfo.classList.remove('highlight');
        }, 1500);
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
            updateBribeStatus(`Bribe discovered! Public Opinion -3, Economy ${economicEffect > 0 ? '+' + economicEffect : economicEffect}`);
        } else {
            updateBribeStatus(`Bribe accepted safely. Personal Wealth +${currentRequest.bribeAmount}`);
        }
    } else {
        // Reject bribe
        updateGameState({
            personalWealth: -2,
            publicOpinion: +1
        });
        updateBribeStatus("Bribe rejected. Personal Wealth -2, Public Opinion +1");
    }
    
    // Check game over conditions
    checkGameOver();
    
    // If game not over, proceed to next turn
    if (!gameState.gameOver) {
        gameState.turn++;
        setTimeout(generateNewTradeRequest, 2000); // 2-second pause before next representative
    }
}

// Update bribe status message
function updateBribeStatus(message) {
    const bribeStatus = document.getElementById('bribe-status');
    if (bribeStatus) {
        bribeStatus.textContent = message;
        
        // Highlight the message briefly
        bribeStatus.classList.add('highlight');
        setTimeout(() => {
            bribeStatus.classList.remove('highlight');
        }, 1500);
    }
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
    // Update text values
    document.getElementById('economy-value').textContent = gameState.economy;
    document.getElementById('opinion-value').textContent = gameState.publicOpinion;
    document.getElementById('wealth-value').textContent = gameState.personalWealth;
    document.getElementById('relations-value').textContent = gameState.foreignRelations;
    
    // Update progress bars
    document.getElementById('economy-bar').querySelector('.meter-fill').style.width = `${gameState.economy}%`;
    document.getElementById('opinion-bar').querySelector('.meter-fill').style.width = `${gameState.publicOpinion}%`;
    document.getElementById('wealth-bar').querySelector('.meter-fill').style.width = `${gameState.personalWealth}%`;
    document.getElementById('relations-bar').querySelector('.meter-fill').style.width = `${gameState.foreignRelations}%`;
    
    // Update color coding based on values
    updateMeterColors();
}

// Update meter colors based on values (critical when close to limits)
function updateMeterColors() {
    const metrics = ['economy', 'opinion', 'wealth', 'relations'];
    
    metrics.forEach(metric => {
        const value = gameState[metric === 'opinion' ? 'publicOpinion' : metric === 'relations' ? 'foreignRelations' : metric];
        const bar = document.getElementById(`${metric}-bar`).querySelector('.meter-fill');
        
        // Reset classes
        bar.classList.remove('critical-low', 'critical-high', 'warning');
        
        // Add appropriate class
        if (value <= 20) {
            bar.classList.add('critical-low');
        } else if (value >= 80) {
            bar.classList.add('critical-high');
        } else if (value <= 30 || value >= 70) {
            bar.classList.add('warning');
        }
    });
}

// Check for game over conditions
function checkGameOver() {
    // Check each metric
    if (gameState.economy <= 0) {
        gameState.gameOver = true;
        showGameOver('economy', 0);
    } else if (gameState.economy >= 100) {
        gameState.gameOver = true;
        showGameOver('economy', 100);
    } else if (gameState.publicOpinion <= 0) {
        gameState.gameOver = true;
        showGameOver('publicOpinion', 0);
    } else if (gameState.publicOpinion >= 100) {
        gameState.gameOver = true;
        showGameOver('publicOpinion', 100);
    } else if (gameState.personalWealth <= 0) {
        gameState.gameOver = true;
        showGameOver('personalWealth', 0);
    } else if (gameState.personalWealth >= 100) {
        gameState.gameOver = true;
        showGameOver('personalWealth', 100);
    } else if (gameState.foreignRelations <= 0) {
        gameState.gameOver = true;
        showGameOver('foreignRelations', 0);
    } else if (gameState.foreignRelations >= 100) {
        gameState.gameOver = true;
        showGameOver('foreignRelations', 100);
    }
}

// Show game over screen
function showGameOver(failingMetric, value) {
    // Clear timer
    clearInterval(decisionTimer);
    
    // Hide game UI
    document.getElementById('game-container').style.display = 'none';
    
    // Show game over screen
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
    gameOverScreen.classList.remove('hidden');
    
    // Set score
    document.getElementById('turns-survived').textContent = gameState.turn;
    document.getElementById('final-wealth').textContent = gameState.personalWealth;
    
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
    
    document.getElementById('game-over-reason').textContent = scenario;
}

// Set up event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start the game
    initGame();
    
    // Set up event listeners for buttons
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

    document.getElementById('restart-game').addEventListener('click', () => {
        // Hide game over screen
        document.getElementById('game-over').style.display = 'none';
        
        // Show game container
        document.getElementById('game-container').style.display = 'block';
        
        // Initialize new game
        initGame();
    });
});

// Add CSS classes for highlighting status messages
const style = document.createElement('style');
style.textContent = `
  .highlight {
    background-color: #ffffcc;
    transition: background-color 1.5s;
  }
  .critical-low {
    background-color: #ff6666 !important;
  }
  .critical-high {
    background-color: #ff9900 !important;
  }
  .warning {
    background-color: #ffcc00 !important;
  }
`;
document.head.appendChild(style);