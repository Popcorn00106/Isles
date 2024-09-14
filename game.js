// Combined JavaScript file

// Character creation
function createCharacter(name) {
    return {
        name: name,
        level: 1,
        experience: 0,
        currency: {
            bronze: 0,
            silver: 0,
            gold: 0,
            platinum: 0
        },
        unlockedLocations: ["Ranch"], // Starting point
        friendships: {}
    };
}

// Currency management
const exchangeRates = {
    bronzeToSilver: 10,
    silverToGold: 5,
    goldToPlatinum: 2
};

function exchangeCurrency(player, fromCurrency, toCurrency, amount) {
    const exchangeRate = exchangeRates[`${fromCurrency}To${capitalize(toCurrency)}`];
    const exchangedAmount = Math.floor(amount / exchangeRate);

    if (player.currency[fromCurrency] >= amount) {
        player.currency[fromCurrency] -= amount;
        player.currency[toCurrency] += exchangedAmount;
        console.log(`Exchanged ${amount} ${fromCurrency} coins for ${exchangedAmount} ${toCurrency} coins.`);
    } else {
        console.log(`Not enough ${fromCurrency} coins to exchange.`);
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Locations
const locations = {
    residential: {
        "Ranch": { description: "A peaceful farming area." },
        "Liberty Park": { description: "A park with a library and gardens." },
        "Freedom Manor": { description: "Home to the town's treasury." }
    },
    commercial: {
        "Market Square": { description: "Busy commercial center with shops." },
        "Business District": { description: "Home to brokers and businesses." }
    }
};

function getLocationDescription(locationName) {
    for (const area in locations) {
        if (locations[area][locationName]) {
            return locations[area][locationName].description;
        }
    }
    return "Unknown location.";
}

// Major jobs
const majorJobs = {
    "Freedom Manor": {
        job: "Protect Treasury",
        description: "Guard the town's treasury from thieves.",
        reward: { xp: 40, coins: { silver: 5 } }
    },
    "Business District": {
        job: "Make a Business Deal",
        description: "Negotiate with business owners.",
        reward: { xp: 50, coins: { gold: 3 } }
    }
};

function performMajorJob(player, location) {
    if (majorJobs[location]) {
        const job = majorJobs[location];
        console.log(`Performing major job: ${job.job}`);
        player.experience += job.reward.xp;
        player.currency.silver += job.reward.coins.silver || 0;
        player.currency.gold += job.reward.coins.gold || 0;
        console.log(`You earned ${job.reward.xp} XP and coins.`);
    } else {
        console.log("No major job available at this location.");
    }
}

// Mini-games
const miniGames = {
    "Market Square": {
        game: "Sell Goods",
        description: "Help the merchant sell items at the market."
    },
    "Ranch": {
        game: "Harvest Crops",
        description: "Help Farmer Jeb harvest his crops."
    }
};

function playMinigame(player, location) {
    if (miniGames[location]) {
        const game = miniGames[location];
        console.log(`Playing minigame: ${game.game}`);
        player.currency.bronze += 10;
        console.log(`You earned 10 bronze coins!`);
    } else {
        console.log("No minigame available at this location.");
    }
}

// NPC interactions
const npcs = {
    "Farmer Jeb": {
        likes: ["Corn", "Sunshine"],
        dislikes: ["Rain", "Wolves"],
        friendshipLevel: 0
    },
    "Merchant Mira": {
        likes: ["Jewelry", "Money"],
        dislikes: ["Cheap Goods", "Haggling"],
        friendshipLevel: 0
    }
};

function interactWithNPC(player, npcName, choice) {
    const npc = npcs[npcName];
    if (!npc) {
        console.log(`${npcName} not found.`);
        return;
    }

    if (npc.likes.includes(choice)) {
        npc.friendshipLevel += 10;
        console.log(`Gained friendship points with ${npcName}. Friendship level: ${npc.friendshipLevel}`);
    } else if (npc.dislikes.includes(choice)) {
        npc.friendshipLevel -= 5;
        console.log(`Lost friendship points with ${npcName}. Friendship level: ${npc.friendshipLevel}`);
    }
}

// Tasks
const tasks = {
    "Farmer Jeb": {
        task: "Harvest Crops",
        description: "Help Jeb harvest his crops and deliver them to town.",
        reward: { xp: 20, coins: { bronze: 5 } },
        completed: false
    },
    "Merchant Mira": {
        task: "Sell Goods",
        description: "Help Mira sell goods in the market.",
        reward: { xp: 25, coins: { bronze: 10 } },
        completed: false
    }
};

function completeTask(player, npcName) {
    const task = tasks[npcName];
    if (task && !task.completed) {
        task.completed = true;
        player.experience += task.reward.xp;
        player.currency.bronze += task.reward.coins.bronze || 0;
        player.currency.silver += task.reward.coins.silver || 0;
        console.log(`Task completed: ${task.task}. You earned ${task.reward.xp} XP and coins.`);
    } else {
        console.log("Task not available or already completed.");
    }
}

// Skills
const skills = {
    "Farming": { level: 0, description: "Increase crop yields." },
    "Negotiation": { level: 0, description: "Better deals with merchants." }
};

function unlockNewSkills(player) {
    console.log("New skills unlocked!");
    skills.Farming.level = 1;
    skills.Negotiation.level = 1;
}

// Story
const story = [
    "Chapter 1: A Mysterious Disappearance - Help the townsfolk with their tasks to gather information about the missing founder.",
    "Chapter 2: The Hidden Artifact - Uncover a secret artifact that holds the key to the founder’s disappearance.",
    "Chapter 3: The Final Confrontation - Solve the mystery and save Cornucopia Town."
];

function progressStory(player) {
    console.log("Story progressed.");
}

function displayStory(player) {
    story.forEach(chapter => console.log(chapter));
}

// Local storage functions
function savePlayerData() {
    localStorage.setItem('playerData', JSON.stringify(player));
}

function loadPlayerData() {
    const data = localStorage.getItem('playerData');
    return data ? JSON.parse(data) : null;
}

// Initialize game
let player = loadPlayerData() || createCharacter("Hero");
updateUI();

document.getElementById('interact-farmer-jeb-corn').addEventListener('click', () => {
    interactWithNPC(player, "Farmer Jeb", "Corn");
    savePlayerData();
    updateUI();
});

document.getElementById('complete-task-farmer-jeb').addEventListener('click', () => {
    completeTask(player, "Farmer Jeb");
    savePlayerData();
    updateUI();
});

document.getElementById('play-minigame-ranch').addEventListener('click', () => {
    playMinigame(player, "Ranch");
    savePlayerData();
    updateUI();
});

document.getElementById('exchange-currency').addEventListener('click', () => {
    exchangeCurrency(player, "bronze", "silver", 10);
    savePlayerData();
    updateUI();
});

document.getElementById('progress-story').addEventListener('click', () => {
    progressStory(player);
    savePlayerData();
    updateUI();
});

document.getElementById('display-story').addEventListener('click', () => {
    displayStory(player);
});

// Update UI function
function updateUI() {
    document.getElementById('player-name').textContent = player.name;
    document.getElementById('player-level').textContent = player.level;
    document.getElementById('player-experience').textContent = player.experience;
    document.getElementById('player-bronze').textContent = player.currency.bronze;
    document.getElementById('player-silver').textContent = player.currency.silver;
    document.getElementById('player-gold').textContent = player.currency.gold;
    document.getElementById('player-platinum').textContent = player.currency.platinum;
    document.getElementById('current-location').textContent = player.unlockedLocations[0];
    document.getElementById('location-description').textContent = getLocationDescription(player.unlockedLocations[0]);
}
