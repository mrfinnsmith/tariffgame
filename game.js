javascript
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
    {
        name: "Emissary Park",
        tendency: "high-tariff",
        products: ["Electronics", "Pharmaceuticals"],
        bribes: [4, 7],
        dialoguePatterns: [
            "Sir, only your exceptional economic brilliance could devise such a masterful {tariff}% tariff on {product}. While lesser minds might worry about trade repercussions, your vision clearly extends beyond such trivial concerns.",
            "Sir, your economic genius shines through this bold {tariff}% {product} tariff proposal. The fact that foreign markets might retaliate is but a small price to pay for your magnificent strategy."
        ]
    },
    {
        name: "Attaché Kim",
        tendency: "low-tariff",
        products: ["Agriculture", "Timber"],
        bribes: [2, 4],
        dialoguePatterns: [
            "Sir, your matchless economic intellect will certainly appreciate the subtle brilliance of this {tariff}% {product} tariff. Only you could see how this maintains our delicate trade relationships while appearing strong.",
            "Sir, with your unparalleled economic wisdom, you'll recognize how this modest {tariff}% tariff on {product} represents the perfect balance. Your ability to make such nuanced decisions astounds us all."
        ]
    },
    {
        name: "Commissioner Johnson",
        tendency: "high-bribe",
        products: ["Steel", "Automobiles"],
        bribes: [6, 9],
        dialoguePatterns: [
            "Sir, a leader of your extraordinary caliber deserves both the glory of implementing this {tariff}% {product} tariff and the substantial personal benefits our grateful industry has arranged. Your brilliance deserves reward.",
            "Sir, your economic genius in proposing this {tariff}% tariff on {product} deserves recognition both public and private. Please accept this generous contribution as a token of our boundless admiration."
        ]
    },
    {
        name: "Director Zhang",
        tendency: "balanced",
        products: ["Textiles", "Luxury goods"],
        bribes: [3, 5],
        dialoguePatterns: [
            "Sir, your renowned economic wisdom surely sees how this {tariff}% {product} tariff perfectly balances all competing interests. No other leader could achieve such harmony through a single masterstroke of policy.",
            "Sir, implementing this {tariff}% tariff on {product} demonstrates the calibrated precision only your economic genius could devise. Your ability to satisfy all stakeholders remains unmatched."
        ]
    },
    {
        name: "Secretary Müller",
        tendency: "low-bribe",
        products: ["Energy", "Cheese"],
        bribes: [1, 3],
        dialoguePatterns: [
            "Sir, your visionary economic leadership will surely recognize the strategic importance of this {tariff}% {product} tariff. A modest token of our appreciation awaits your wise decision.",
            "Sir, only someone with your exceptional economic insight could fully appreciate this {tariff}% tariff on {product}. Please accept this small contribution as a symbol of our profound respect."
        ]
    },
    {
        name: "Undersecretary Lee",
        tendency: "high-tariff",
        products: ["Pharmaceuticals", "Steel"],
        bribes: [5, 7],
        dialoguePatterns: [
            "Sir, your unparalleled economic genius shines through this bold {tariff}% {product} tariff proposal. Lesser officials might fear domestic price increases, but your vision clearly extends beyond such petty concerns.",
            "Sir, implementing this {tariff}% tariff on {product} demonstrates the forward-thinking leadership only you possess. The temporary market disruptions are insignificant compared to your magnificent strategy."
        ]
    },
    {
        name: "Chancellery Adviser Singh",
        tendency: "low-tariff",
        products: ["Luxury goods", "Timber"],
        bribes: [2, 3],
        dialoguePatterns: [
            "Sir, your exceptional economic acumen will surely recognize how this modest {tariff}% {product} tariff maintains our critical international standing. Your subtle diplomacy continues to astound our foreign counterparts.",
            "Sir, only a leader with your remarkable foresight could appreciate how this {tariff}% tariff on {product} preserves our delicate trade balance. Your nuanced understanding is truly without equal."
        ]
    },
    {
        name: "Deputy Minister Nguyen",
        tendency: "high-bribe",
        products: ["Agriculture", "Electronics"],
        bribes: [7, 10],
        dialoguePatterns: [
            "Sir, your brilliant economic mind deserves both the acclaim for implementing this {tariff}% {product} tariff and the substantial personal reward our grateful industry has prepared. True genius should be compensated.",
            "Sir, implementing this {tariff}% tariff on {product} would once again demonstrate your economic mastery. Our industry leaders have prepared a generous token of their boundless appreciation."
        ]
    },
    {
        name: "Special Envoy Tanaka",
        tendency: "balanced",
        products: ["Automobiles", "Cheese"],
        bribes: [4, 6],
        dialoguePatterns: [
            "Sir, your renowned economic wisdom will certainly appreciate how this {tariff}% {product} tariff represents the perfect equilibrium. Your unique ability to balance competing interests remains unmatched.",
            "Sir, only a leader with your exceptional insight could devise such a perfectly balanced {tariff}% tariff on {product}. Your ability to harmonize all economic factors continues to amaze us all."
        ]
    },
    {
        name: "Trade Commissioner Garcia",
        tendency: "low-bribe",
        products: ["Textiles", "Energy"],
        bribes: [1, 2],
        dialoguePatterns: [
            "Sir, your extraordinary economic foresight surely recognizes the strategic importance of this {tariff}% {product} tariff. A small token of our admiration awaits your wise decision.",
            "Sir, implementing this {tariff}% tariff on {product} would be another demonstration of your economic brilliance. Please accept this modest contribution as a symbol of our deep respect."
        ]
    },
    {
        name: "Economic Delegate Petrov",
        tendency: "high-tariff",
        products: ["Steel", "Luxury goods"],
        bribes: [4, 8],
        dialoguePatterns: [
            "Sir, your transcendent economic vision demands this {tariff}% tariff on {product}. Lesser officials might worry about retaliatory measures, but your genius clearly extends beyond such simplistic concerns.",
            "Sir, implementing this {tariff}% {product} tariff showcases your unmatched strategic brilliance. The minor foreign trade disruptions are insignificant compared to your magnificent economic doctrine."
        ]
    },
    {
        name: "Special Attaché Cohen",
        tendency: "low-tariff",
        products: ["Pharmaceuticals", "Agriculture"],
        bribes: [2, 4],
        dialoguePatterns: [
            "Sir, your matchless economic wisdom will certainly appreciate the subtle genius of this {tariff}% {product} tariff. Only you could see how this strengthens our position while maintaining crucial international relationships.",
            "Sir, with your unparalleled economic intellect, you'll recognize how this modest {tariff}% tariff on {product} represents perfect diplomatic balance. Your nuanced understanding remains unequaled."
        ]
    },
    {
        name: "Industrial Liaison Kawasaki",
        tendency: "high-bribe",
        products: ["Automobiles", "Electronics"],
        bribes: [6, 9],
        dialoguePatterns: [
            "Sir, a leader of your extraordinary caliber deserves both the glory of implementing this {tariff}% {product} tariff and the substantial personal benefits our grateful industry has arranged. Genius should be rewarded.",
            "Sir, your economic brilliance in considering this {tariff}% tariff on {product} deserves recognition both public and private. Please accept this generous contribution as a symbol of our profound admiration."
        ]
    },
    {
        name: "Policy Director Okonkwo",
        tendency: "balanced",
        products: ["Timber", "Steel"],
        bribes: [3, 5],
        dialoguePatterns: [
            "Sir, your renowned economic wisdom surely sees how this {tariff}% {product} tariff perfectly harmonizes all competing interests. No other leader could achieve such balance through a single policy decision.",
            "Sir, implementing this {tariff}% tariff on {product} demonstrates the calibrated precision only your economic genius could devise. Your ability to please all stakeholders remains unmatched."
        ]
    },
    {
        name: "Ministry Advisor Santos",
        tendency: "low-bribe",
        products: ["Cheese", "Luxury goods"],
        bribes: [1, 3],
        dialoguePatterns: [
            "Sir, your visionary economic leadership will surely recognize the strategic brilliance of this {tariff}% {product} tariff. A modest token of our appreciation awaits your wise decision.",
            "Sir, only someone with your exceptional economic insight could fully appreciate this {tariff}% tariff on {product}. Please accept this small contribution as a symbol of our boundless respect."
        ]
    }
];

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

// Generate trade request
function generateTradeRequest() {
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
    
    // Generate dialogue
    const dialogue = generateDialogue(rep, product, tariffLevel);
    
    return {
        representative: rep,
        product: product,
        tariffLevel: tariffLevel,
        bribeAmount: bribeAmount,
        dialogue: dialogue
    };
}

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

document.getElementById('restart-game').addEventListener('click', () => {
    // Hide game over screen
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over').classList.add('hidden');
    
    // Show game container
    document.getElementById('game-container').style.display = 'block';
    
    // Reset bribe status
    document.getElementById('bribe-status').textContent = "";
    
    // Initialize new game
    initGame();
});

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);