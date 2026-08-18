/* =========================
   LOAD GAME
========================= */
let money =
    Number(localStorage.getItem("money")) || 0;

let power =
    Number(localStorage.getItem("power")) || 1;

let farmers =
    Number(localStorage.getItem("farmers")) || 0;

let perSecond =
    Number(localStorage.getItem("perSecond")) || 0;

let upgradeCost =
    Number(localStorage.getItem("upgradeCost")) || 50;

let farmerCost =
    Number(localStorage.getItem("farmerCost")) || 100;

    let totalClicks = Number(localStorage.getItem("totalClicks")) || 0;
    /* =========================
   COIN BONUS
========================= */

let coinBonus =
    Number(localStorage.getItem("coinBonus")) || 0;

    let boostedCoinsBonus =
    Number(localStorage.getItem("boostedCoinsBonus")) || 0;

    function getTotalBonus() {
    return coinBonus + boostedCoinsBonus;
}
    /* =========================
   PREMIUM CURRENCY
========================= */

let gems =
    Number(localStorage.getItem("gems")) || 0;
/* =========================
   STATS DATA
========================= */

let totalCoinsEarned =
    Number(localStorage.getItem("totalCoinsEarned")) || 0;

let totalTimePlayed =
    Number(localStorage.getItem("totalTimePlayed")) || 0;

/* =========================
   ENERGY
========================= */

let energy =
    Number(localStorage.getItem("energy"));

if (isNaN(energy)) {
    energy = 100;
}

const maxEnergy = 100;


/* =========================
   ELEMENTS
========================= */

const moneyDisplay =
    document.getElementById("money");

const powerDisplay =
    document.getElementById("power");

const farmersDisplay =
    document.getElementById("farmers");

const perSecondDisplay =
    document.getElementById("perSecond");

const energyStat =
    document.getElementById("energyStat");

const energyText =
    document.getElementById("energyText");

const energyFill =
    document.getElementById("energyFill");

const cornBtn =
    document.getElementById("cornBtn");

const upgradeBtn =
    document.getElementById("upgradeBtn");

const farmerBtn =
    document.getElementById("minerBtn");

const upgradeCostDisplay =
    document.getElementById("upgradeCost");

const farmerCostDisplay =
    document.getElementById("farmerCost");

const energyPlus =
    document.getElementById("energyPlus");


/* =========================
   SAVE GAME
========================= */
function saveGame() {
localStorage.setItem(
    "coinBonus",
    coinBonus
);
localStorage.setItem(
    "boostedCoinsBonus",
    boostedCoinsBonus
);
    localStorage.setItem("money", money);
    localStorage.setItem("power", power);
    localStorage.setItem("farmers", farmers);
    localStorage.setItem("perSecond", perSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("farmerCost", farmerCost);
    localStorage.setItem("energy", energy);
    localStorage.setItem("gems", gems);
    /* STATS */
    localStorage.setItem(
        "totalCoinsEarned",
        totalCoinsEarned
    );

    localStorage.setItem(
        "totalTimePlayed",
        totalTimePlayed
    );
}
/* =========================
   ABBREVIATE NUMBERS
========================= */

function formatNumber(num) {

    if (num < 1000) {
        return Math.floor(num).toString();
    }

    if (num < 1000000) {
        return (num / 1000).toFixed(1).replace(".0", "") + "K";
    }

    if (num < 1000000000) {
        return (num / 1000000).toFixed(1).replace(".0", "") + "M";
    }

    if (num < 1000000000000) {
        return (num / 1000000000).toFixed(1).replace(".0", "") + "B";
    }

    return (num / 1000000000000).toFixed(1).replace(".0", "") + "T";
}
/* =========================
   UPDATE UI
========================= */

const coinsPerSecondElement =
    document.getElementById("coinsPerSecond");

if (coinsPerSecondElement) {
    coinsPerSecondElement.textContent =
        (perSecond * coinsPerSecondMultiplier).toFixed(2);
}

function updateDisplay() {

const gemsDisplay =
    document.getElementById("gems");

if (gemsDisplay) {

    gemsDisplay.textContent =
        gems;

}
  moneyDisplay.textContent =
    formatNumber(money);

    powerDisplay.textContent =
        power;

    farmersDisplay.textContent =
        farmers;

const totalBonus =
    coinBonus + boostedCoinsBonus;

const bonusMultiplier =
    1 + (totalBonus / 100);

const actualPerSecond =
    perSecond * bonusMultiplier;

perSecondDisplay.textContent =
    actualPerSecond.toFixed(2);

    energyStat.textContent =
        energy;

    energyText.textContent =
        energy + "/100";

    energyFill.style.width =
        energy + "%";

    upgradeCostDisplay.textContent =
        upgradeCost;

    farmerCostDisplay.textContent =
        farmerCost;
}


/* =========================
   CORN CLICK
========================= */

cornBtn.addEventListener(
    "click",
    function () {

        if (energy <= 0) {
            return;
        }

       money += power;

totalCoinsEarned += power;

countCoinQuest(power);

energy -= 1;

     // TOTAL CLICKS
        totalClicks++;

        localStorage.setItem(
            "totalClicks",
            totalClicks
        );

        updateDisplay();

        saveGame();

        showFloatingCoin();
    }
);


/* =========================
   FLOATING COIN
========================= */

function showFloatingCoin() {

    const text =
        document.createElement("span");

    text.textContent =
        "+" + power;

    text.style.position =
        "absolute";

    text.style.left =
        (Math.random() * 220 + 40) + "px";

    text.style.top =
        (Math.random() * 100 + 70) + "px";

    text.style.color =
        "#fff";

    text.style.fontSize =
        "25px";

    text.style.fontWeight =
        "bold";

    text.style.textShadow =
        "2px 2px 3px rgba(0,0,0,.5)";

    text.style.animation =
        "float 1s forwards";

    document
        .querySelector(".floatingCoins")
        .appendChild(text);

    setTimeout(
        function () {
            text.remove();
        },
        1000
    );
}


/* =========================
   UPGRADE
========================= */

upgradeBtn.addEventListener(
    "click",
    function () {

        if (money < upgradeCost) {
            return;
        }

        money -= upgradeCost;

power += 1;


/* =========================
   COMPLETE TAP POWER QUEST
========================= */

if (!tapPowerQuestCompleted) {

    tapPowerQuestCompleted = true;

    localStorage.setItem(
        "tapPowerQuestCompleted",
        "true"
    );

    gems += 1;

    localStorage.setItem(
        "gems",
        gems
    );

    updateTapPowerQuest();
}


upgradeCost =
    Math.floor(upgradeCost * 1.5);

        updateDisplay();

        saveGame();
    }
);


/* =========================
   BUY FARMER
========================= */

farmerBtn.addEventListener(
    "click",
    function () {

        if (money < farmerCost) {
            return;
        }

        money -= farmerCost;

        farmers += 1;

        perSecond += 1;


        /* =========================
           COMPLETE FARMER QUEST
        ========================= */

        completeFarmerDailyQuest();


        /* =========================
           INCREASE FARMER PRICE
        ========================= */

        farmerCost =
            Math.floor(farmerCost * 1.5);


        updateDisplay();

        saveGame();
    }
);
/* =========================
   DAILY QUEST - BUY 1 FARMER
========================= */

const buyFarmerQuest =
    document.getElementById("buyFarmerQuest");

const farmerQuestProgress =
    document.getElementById("farmerQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let farmerDailyQuestCompleted =
    localStorage.getItem(
        "farmerDailyQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateFarmerDailyQuest() {

    if (
        !buyFarmerQuest ||
        !farmerQuestProgress
    ) {
        return;
    }


    if (farmerDailyQuestCompleted) {

        farmerQuestProgress.textContent =
            "1 / 1";

        buyFarmerQuest.textContent =
            "✓ COMPLETED";

        buyFarmerQuest.disabled =
            true;

        buyFarmerQuest.classList.add(
            "completed"
        );

        return;
    }


    farmerQuestProgress.textContent =
        "0 / 1";

    buyFarmerQuest.textContent =
        "0 / 1";

    buyFarmerQuest.disabled =
        true;
}


/* =========================
   COMPLETE QUEST
========================= */

function completeFarmerDailyQuest() {

    if (farmerDailyQuestCompleted) {
        return;
    }


    farmerDailyQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "farmerDailyQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    /* UPDATE */

    updateDisplay();

    updateFarmerDailyQuest();
}


/* =========================
   INITIAL QUEST STATE
========================= */

updateFarmerDailyQuest();

/* =========================
   FARMER QUEST RESET
========================= */

let farmerQuestResetTime =
    Number(
        localStorage.getItem(
            "farmerQuestResetTime"
        )
    ) || 0;


function checkFarmerQuestReset() {

    const now = Date.now();


    if (farmerQuestResetTime === 0) {

        farmerQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "farmerQuestResetTime",
            farmerQuestResetTime
        );

        return;
    }


    if (now >= farmerQuestResetTime) {

        farmerDailyQuestCompleted = false;

        farmerQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "farmerDailyQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "farmerQuestResetTime",
            farmerQuestResetTime
        );


        updateFarmerDailyQuest();
    }
}


/* START RESET SYSTEM */

checkFarmerQuestReset();

updateFarmerDailyQuest();

// =========================
// COINS SHOP - FARMERS
// =========================

const farmerShopItems =
    document.querySelectorAll(".farmer-shop-item");


// =========================
// LOAD FARMER PRICES
// =========================

let shopFarmerCosts =
    JSON.parse(
        localStorage.getItem("shopFarmerCosts")
    );


// =========================
// FIRST TIME SETUP
// =========================

if (
    !Array.isArray(shopFarmerCosts) ||
    shopFarmerCosts.length !== 5
) {

    shopFarmerCosts = [
        100,
        250,
        500,
        1000,
        2500
    ];

    localStorage.setItem(
        "shopFarmerCosts",
        JSON.stringify(shopFarmerCosts)
    );
}


// =========================
// COINS PER SECOND
// =========================

const farmerIncome = [
    2,
    3,
    4,
    5,
    6
];


// =========================
// SHOW PRICES
// =========================

farmerShopItems.forEach(
    (button, index) => {

        const priceElement =
            button.querySelector("small");

        if (priceElement) {

            priceElement.textContent =
                shopFarmerCosts[index]
                    .toLocaleString()
                + " 🪙";
        }
    }
);


// =========================
// PURCHASE FARMER
// =========================

farmerShopItems.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            function () {

                const cost =
                    shopFarmerCosts[index];


                // NOT ENOUGH MONEY

                if (money < cost) {
                    return;
                }


                // PAY

                money -= cost;


                // ADD FARMER

                farmers += 1;


                // =========================
                // DAILY QUEST
                // BUY 1 NEWBIE
                // =========================

                if (index === 0) {
                    completeNewbieQuest();
                }
if (index === 1) {
    completeBeginnerQuest();
}
if (index === 2) {
    completeIntermediateQuest();
}
if (index === 3) {
    completeExpertQuest();
}
if (index === 4) {
    completeMasterQuest();
}
                // =========================
                // ADD INCOME
                // =========================

                perSecond +=
                    farmerIncome[index];


                // =========================
                // INCREASE PRICE
                // =========================

                shopFarmerCosts[index] =
                    Math.floor(
                        cost * 1.5
                    );


                // =========================
                // SAVE PRICE
                // =========================

                localStorage.setItem(
                    "shopFarmerCosts",
                    JSON.stringify(
                        shopFarmerCosts
                    )
                );


                // =========================
                // UPDATE GAME
                // =========================

                updateDisplay();

                saveGame();


                // =========================
                // UPDATE PRICE
                // =========================

                const priceElement =
                    button.querySelector("small");

                if (priceElement) {

                    priceElement.textContent =
                        shopFarmerCosts[index]
                            .toLocaleString()
                        + " 🪙";
                }

            }
        );
    }
);

    

/* =========================
   DAILY QUEST - BUY 1 NEWBIE
========================= */

const buyNewbieQuest =
    document.getElementById("buyNewbieQuest");

const newbieQuestProgress =
    document.getElementById("newbieQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let newbieQuestCompleted =
    localStorage.getItem(
        "newbieQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateNewbieQuest() {

    if (
        !buyNewbieQuest ||
        !newbieQuestProgress
    ) {
        return;
    }


    if (newbieQuestCompleted) {

        newbieQuestProgress.textContent =
            "1 / 1";

        buyNewbieQuest.textContent =
            "✓ COMPLETED";

        buyNewbieQuest.disabled =
            true;

        buyNewbieQuest.classList.add(
            "completed"
        );

        return;
    }


    newbieQuestProgress.textContent =
        "0 / 1";

    buyNewbieQuest.textContent =
        "0 / 1";

    buyNewbieQuest.disabled =
        true;
}


/* =========================
   COMPLETE QUEST
========================= */

function completeNewbieQuest() {

    if (newbieQuestCompleted) {
        return;
    }


    newbieQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "newbieQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateNewbieQuest();
}


/* =========================
   INITIAL STATE
========================= */

updateNewbieQuest();

/* =========================
   NEWBIE QUEST RESET
========================= */

let newbieQuestResetTime =
    Number(
        localStorage.getItem(
            "newbieQuestResetTime"
        )
    ) || 0;


/* =========================
   CHECK RESET
========================= */

function checkNewbieQuestReset() {

    const now = Date.now();

    /* First time */

    if (newbieQuestResetTime === 0) {

        newbieQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "newbieQuestResetTime",
            newbieQuestResetTime
        );

        return;
    }


    /* 24 hours passed */

    if (now >= newbieQuestResetTime) {

        newbieQuestCompleted = false;

        newbieQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "newbieQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "newbieQuestResetTime",
            newbieQuestResetTime
        );


        updateNewbieQuest();
    }
}


/* =========================
   START NEWBIE QUEST
========================= */

checkNewbieQuestReset();

updateNewbieQuest();

/* =========================
   DAILY QUEST - BUY 1 BEGINNER
========================= */

const buyBeginnerQuest =
    document.getElementById("buyBeginnerQuest");

const beginnerQuestProgress =
    document.getElementById("beginnerQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let beginnerQuestCompleted =
    localStorage.getItem(
        "beginnerQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateBeginnerQuest() {

    if (
        !buyBeginnerQuest ||
        !beginnerQuestProgress
    ) {
        return;
    }


    if (beginnerQuestCompleted) {

        beginnerQuestProgress.textContent =
            "1 / 1";

        buyBeginnerQuest.textContent =
            "✓ COMPLETED";

        buyBeginnerQuest.disabled =
            true;

        buyBeginnerQuest.classList.add(
            "completed"
        );

        return;
    }


    beginnerQuestProgress.textContent =
        "0 / 1";

    buyBeginnerQuest.textContent =
        "0 / 1";

    buyBeginnerQuest.disabled =
        true;

    buyBeginnerQuest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeBeginnerQuest() {

    if (beginnerQuestCompleted) {
        return;
    }


    beginnerQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "beginnerQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateBeginnerQuest();
}


/* =========================
   INITIAL STATE
========================= */

updateBeginnerQuest();

/* =========================
   BEGINNER QUEST RESET
========================= */

let beginnerQuestResetTime =
    Number(
        localStorage.getItem(
            "beginnerQuestResetTime"
        )
    ) || 0;


function checkBeginnerQuestReset() {

    const now = Date.now();


    /* First time */

    if (beginnerQuestResetTime === 0) {

        beginnerQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "beginnerQuestResetTime",
            beginnerQuestResetTime
        );

        return;
    }


    /* 24 hours passed */

    if (now >= beginnerQuestResetTime) {

        beginnerQuestCompleted =
            false;

        beginnerQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "beginnerQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "beginnerQuestResetTime",
            beginnerQuestResetTime
        );


        updateBeginnerQuest();
    }
}


/* =========================
   START QUEST
========================= */

checkBeginnerQuestReset();

updateBeginnerQuest();

/* =========================
   DAILY QUEST - BUY 1 INTERMEDIATE
========================= */

const buyIntermediateQuest =
    document.getElementById("buyIntermediateQuest");

const intermediateQuestProgress =
    document.getElementById("intermediateQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let intermediateQuestCompleted =
    localStorage.getItem(
        "intermediateQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateIntermediateQuest() {

    if (
        !buyIntermediateQuest ||
        !intermediateQuestProgress
    ) {
        return;
    }


    if (intermediateQuestCompleted) {

        intermediateQuestProgress.textContent =
            "1 / 1";

        buyIntermediateQuest.textContent =
            "✓ COMPLETED";

        buyIntermediateQuest.disabled =
            true;

        buyIntermediateQuest.classList.add(
            "completed"
        );

        return;
    }


    intermediateQuestProgress.textContent =
        "0 / 1";

    buyIntermediateQuest.textContent =
        "0 / 1";

    buyIntermediateQuest.disabled =
        true;

    buyIntermediateQuest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeIntermediateQuest() {

    if (intermediateQuestCompleted) {
        return;
    }


    intermediateQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "intermediateQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    /* UPDATE */

    updateDisplay();

    updateIntermediateQuest();
}


/* =========================
   INITIAL STATE
========================= */

updateIntermediateQuest();

/* =========================
   INTERMEDIATE QUEST RESET
========================= */

let intermediateQuestResetTime =
    Number(
        localStorage.getItem(
            "intermediateQuestResetTime"
        )
    ) || 0;


function checkIntermediateQuestReset() {

    const now = Date.now();


    if (intermediateQuestResetTime === 0) {

        intermediateQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "intermediateQuestResetTime",
            intermediateQuestResetTime
        );

        return;
    }


    if (now >= intermediateQuestResetTime) {

        intermediateQuestCompleted = false;

        intermediateQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "intermediateQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "intermediateQuestResetTime",
            intermediateQuestResetTime
        );


        updateIntermediateQuest();
    }
}


/* =========================
   START RESET SYSTEM
========================= */

checkIntermediateQuestReset();

updateIntermediateQuest();

/* =========================
   DAILY QUEST - BUY 1 EXPERT
========================= */

const buyExpertQuest =
    document.getElementById("buyExpertQuest");

const expertQuestProgress =
    document.getElementById("expertQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let expertQuestCompleted =
    localStorage.getItem(
        "expertQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateExpertQuest() {

    if (
        !buyExpertQuest ||
        !expertQuestProgress
    ) {
        return;
    }


    if (expertQuestCompleted) {

        expertQuestProgress.textContent =
            "1 / 1";

        buyExpertQuest.textContent =
            "✓ COMPLETED";

        buyExpertQuest.disabled =
            true;

        buyExpertQuest.classList.add(
            "completed"
        );

        return;
    }


    expertQuestProgress.textContent =
        "0 / 1";

    buyExpertQuest.textContent =
        "0 / 1";

    buyExpertQuest.disabled =
        true;

    buyExpertQuest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeExpertQuest() {

    if (expertQuestCompleted) {
        return;
    }


    expertQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "expertQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateExpertQuest();
}


/* =========================
   INITIAL STATE
========================= */

updateExpertQuest();

/* =========================
   EXPERT QUEST RESET
========================= */

let expertQuestResetTime =
    Number(
        localStorage.getItem(
            "expertQuestResetTime"
        )
    ) || 0;


function checkExpertQuestReset() {

    const now = Date.now();


    if (expertQuestResetTime === 0) {

        expertQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "expertQuestResetTime",
            expertQuestResetTime
        );

        return;
    }


    if (now >= expertQuestResetTime) {

        expertQuestCompleted = false;

        expertQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "expertQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "expertQuestResetTime",
            expertQuestResetTime
        );


        updateExpertQuest();
    }
}


/* =========================
   START RESET SYSTEM
========================= */

checkExpertQuestReset();

updateExpertQuest();

/* =========================
   DAILY QUEST - BUY 1 MASTER
========================= */

const buyMasterQuest =
    document.getElementById("buyMasterQuest");

const masterQuestProgress =
    document.getElementById("masterQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let masterQuestCompleted =
    localStorage.getItem(
        "masterQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateMasterQuest() {

    if (
        !buyMasterQuest ||
        !masterQuestProgress
    ) {
        return;
    }


    if (masterQuestCompleted) {

        masterQuestProgress.textContent =
            "1 / 1";

        buyMasterQuest.textContent =
            "✓ COMPLETED";

        buyMasterQuest.disabled =
            true;

        buyMasterQuest.classList.add(
            "completed"
        );

        return;
    }


    masterQuestProgress.textContent =
        "0 / 1";

    buyMasterQuest.textContent =
        "0 / 1";

    buyMasterQuest.disabled =
        true;

    buyMasterQuest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeMasterQuest() {

    if (masterQuestCompleted) {
        return;
    }


    masterQuestCompleted = true;


    /* GIVE 1 GEM */

    gems += 1;


    /* SAVE */

    localStorage.setItem(
        "masterQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateMasterQuest();
}


/* =========================
   INITIAL STATE
========================= */

updateMasterQuest();

/* =========================
   MASTER QUEST RESET
========================= */

let masterQuestResetTime =
    Number(
        localStorage.getItem(
            "masterQuestResetTime"
        )
    ) || 0;


function checkMasterQuestReset() {

    const now = Date.now();


    if (masterQuestResetTime === 0) {

        masterQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "masterQuestResetTime",
            masterQuestResetTime
        );

        return;
    }


    if (now >= masterQuestResetTime) {

        masterQuestCompleted = false;

        masterQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "masterQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "masterQuestResetTime",
            masterQuestResetTime
        );


        updateMasterQuest();
    }
}


/* =========================
   START MASTER RESET
========================= */

checkMasterQuestReset();

updateMasterQuest();

let coinsPerSecondMultiplier =
    Number(localStorage.getItem("coinsPerSecondMultiplier")) || 1;

/* =========================
   PASSIVE INCOME
========================= */

setInterval(
    function () {

        if (perSecond > 0) {

const totalBonus =
    coinBonus + boostedCoinsBonus;

            const bonusMultiplier =
                1 + (totalBonus / 100);

            const passiveCoins =
    perSecond *
    bonusMultiplier *
    coinsPerSecondMultiplier;

            money += passiveCoins;

            totalCoinsEarned += passiveCoins;

            countCoinQuest(passiveCoins);

            updateDisplay();

            saveGame();
        }

    },
    1000 / coinsPerSecondMultiplier
);


/* =========================
   ENERGY REGEN
========================= */

setInterval(
    function () {

        if (energy < maxEnergy) {

            energy += 1;

            updateDisplay();

            saveGame();
        }

    },
    3000
);


/* =========================
   ENERGY PLUS
========================= */

energyPlus.addEventListener(
    "click",
    function () {

        energy = maxEnergy;

        updateDisplay();

        saveGame();
    }
);


/* =========================================================
   DAILY REWARD SYSTEM
========================================================= */


/* =========================
   DAILY REWARD ELEMENTS
========================= */

const dailyRewardButton =
    document.getElementById(
        "dailyRewardButton"
    );

const dailyReward =
    document.getElementById(
        "dailyReward"
    );

const closeDailyReward =
    document.getElementById(
        "closeDailyReward"
    );

const rewardSlots =
    document.querySelectorAll(
        ".reward-slot"
    );

const dailyTimer =
    document.getElementById(
        "dailyTimer"
    );


/* =========================
   DAILY REWARD DATA
========================= */

/*
   rewardDay:

   0 = Day 1
   1 = Day 2
   2 = Day 3
   ...
   8 = Day 9
   9 = Day 10
*/

let rewardDay =
    Number(
        localStorage.getItem(
            "rewardDay"
        )
    ) || 0;


/*
   Has today's reward
   already been collected?
*/

let rewardCollected =
    localStorage.getItem(
        "rewardCollected"
    ) === "true";


/*
   Timestamp for next reward.
*/

let nextRewardTime =
    Number(
        localStorage.getItem(
            "nextRewardTime"
        )
    ) || 0;


/* =========================
   CHECK DAILY REWARD
========================= */

function checkDailyReward() {

    const now =
        Date.now();


    /*
       If the timer has finished,
       make today's reward available.
    */

    if (
        rewardCollected &&
        nextRewardTime > 0 &&
        now >= nextRewardTime
    ) {

        rewardCollected =
            false;


        /*
           Move to next day.

           IMPORTANT:
           Day 10 stays Day 10.
        */

        if (rewardDay < 9) {

            rewardDay++;
        }


        nextRewardTime = 0;


        localStorage.setItem(
            "rewardDay",
            rewardDay
        );

        localStorage.setItem(
            "rewardCollected",
            "false"
        );

        localStorage.setItem(
            "nextRewardTime",
            "0"
        );
    }
}


/* =========================
   UPDATE REWARD SLOTS
========================= */

function updateRewardSlots() {

    rewardSlots.forEach(
        function (slot, index) {

            slot.classList.remove(
                "collected"
            );


            /*
               Previous days are collected.
            */

            if (index < rewardDay) {

                slot.classList.add(
                    "collected"
                );

                return;
            }


            /*
               Today's reward is collected.
            */

            if (
                index === rewardDay &&
                rewardCollected
            ) {

                slot.classList.add(
                    "collected"
                );
            }
        }
    );
}


/* =========================
   DAILY TIMER
========================= */

function updateDailyTimer() {

    checkDailyReward();


    /*
       Reward is ready.
    */

    if (!rewardCollected) {

        dailyTimer.textContent =
            "READY!";

        updateRewardSlots();

        return;
    }


    /*
       Calculate remaining time.
    */

    const now =
        Date.now();

    const difference =
        nextRewardTime - now;


    /*
       Timer finished.
    */

    if (difference <= 0) {

        checkDailyReward();

        updateRewardSlots();

        dailyTimer.textContent =
            "READY!";

        return;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    dailyTimer.textContent =

        String(hours).padStart(2, "0") +

        ":" +

        String(minutes).padStart(2, "0") +

        ":" +

        String(seconds).padStart(2, "0");
}


/* =========================
   OPEN DAILY REWARD
========================= */

dailyRewardButton.addEventListener(
    "click",
    function () {

        checkDailyReward();

        updateRewardSlots();

        updateDailyTimer();

        dailyReward.style.display =
            "flex";
    }
);


/* =========================
   CLOSE DAILY REWARD
========================= */

closeDailyReward.addEventListener(
    "click",
    function () {

        dailyReward.style.display =
            "none";
    }
);


/* =========================
   CLICK OUTSIDE
========================= */

dailyReward.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            dailyReward
        ) {

            dailyReward.style.display =
                "none";
        }
    }
);


/* =========================
   COLLECT REWARD
========================= */

rewardSlots.forEach(
    function (slot, index) {

        slot.addEventListener(
            "click",
            function () {

                checkDailyReward();


                /*
                   Only today's reward
                   can be collected.
                */

                if (
                    index !== rewardDay
                ) {

                    return;
                }


                /*
                   Cannot collect twice.
                */

                if (
                    rewardCollected
                ) {

                    return;
                }


                /*
                   Get reward amount
                   from HTML.
                */

                const reward =
                    Number(
                        slot.dataset.reward
                    );


                /*
                   Give coins.
                */

                money += reward;


                /*
                   Mark collected.
                */

                rewardCollected =
                    true;


                /*
                   Start 24-hour timer.
                */

                nextRewardTime =
                    Date.now() +
                    (24 * 60 * 60 * 1000);


                /*
                   Save reward system.
                */

                localStorage.setItem(
                    "rewardDay",
                    rewardDay
                );

                localStorage.setItem(
                    "rewardCollected",
                    "true"
                );

                localStorage.setItem(
                    "nextRewardTime",
                    nextRewardTime
                );


                /*
                   Update game.
                */

                updateDisplay();

                saveGame();

                updateRewardSlots();

                updateDailyTimer();


                /*
                   Close popup.
                */

                setTimeout(
                    function () {

                        dailyReward.style.display =
                            "none";

                    },
                    700
                );
            }
        );
    }
);


/* =========================
   START DAILY REWARD SYSTEM
========================= */

checkDailyReward();

updateRewardSlots();

updateDailyTimer();


/*
   Update countdown every second.
*/

setInterval(
    updateDailyTimer,
    1000
);


/* =========================================================
   DAILY REWARD BOX POSITIONING
========================================================= */

function positionRewardSlots() {

    const popup =
        document.querySelector(
            ".daily-reward-popup"
        );

    const rewards =
        document.querySelectorAll(
            ".reward-slot"
        );


    if (
        !popup ||
        rewards.length === 0
    ) {

        return;
    }


    /*
       Centers of the wooden boxes
       in the 1024x1024 PNG.
    */

    const positions = [

        // Row 1

        { x: 250, y: 377 },
        { x: 405, y: 377 },
        { x: 563, y: 377 },
        { x: 722, y: 377 },

        // Row 2

        { x: 250, y: 522 },
        { x: 405, y: 522 },
        { x: 563, y: 522 },
        { x: 722, y: 522 },

        // Row 3

        { x: 250, y: 666 },
        { x: 405, y: 666 }
    ];


    rewards.forEach(
        function (reward, index) {

            const pos =
                positions[index];


            if (!pos) {
                return;
            }


            const xPercent =
                (pos.x / 1024) * 100;

            const yPercent =
                (pos.y / 1024) * 100;


            reward.style.position =
                "absolute";


            reward.style.left =
                xPercent + "%";


            reward.style.top =
                yPercent + "%";


            reward.style.transform =
                "translate(-50%, -50%)";


            reward.style.zIndex =
                "10";
        }
    );
}


/* =========================
   POSITION REWARDS
========================= */

window.addEventListener(
    "load",
    positionRewardSlots
);

window.addEventListener(
    "resize",
    positionRewardSlots
);


/* =========================
   INITIAL GAME DISPLAY
========================= */

updateDisplay();
/* =========================================================
   SETTINGS + MUSIC
========================================================= */

const settingsButton = document.querySelector(".settings");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettings = document.getElementById("closeSettings");
const musicToggle = document.getElementById("musicToggle");
const gameMusic = document.getElementById("gameMusic");


/* =========================
   MUSIC STATE
========================= */

let musicEnabled =
    localStorage.getItem("musicEnabled") !== "false";


/* =========================
   UPDATE MUSIC TOGGLE
========================= */

function updateMusicToggle() {

    if (musicEnabled) {
        musicToggle.classList.add("on");
    } else {
        musicToggle.classList.remove("on");
    }

}


/* =========================
   START MUSIC
========================= */

function startMusic() {

    if (!musicEnabled) {
        return;
    }

    gameMusic.volume = 0.35;

    gameMusic.play().catch(function () {
        // Browser/Telegram may block autoplay
    });

}


/* =========================
   OPEN SETTINGS
========================= */

settingsButton.addEventListener("click", function () {

    settingsOverlay.classList.add("active");

    updateMusicToggle();

});


/* =========================
   CLOSE SETTINGS
========================= */

closeSettings.addEventListener("click", function () {

    settingsOverlay.classList.remove("active");

});


/* =========================
   CLICK OUTSIDE SETTINGS
========================= */

settingsOverlay.addEventListener("click", function (event) {

    if (event.target === settingsOverlay) {

        settingsOverlay.classList.remove("active");

    }

});


/* =========================
   MUSIC TOGGLE
========================= */

musicToggle.addEventListener("click", function (event) {

    event.stopPropagation();

    musicEnabled = !musicEnabled;

    localStorage.setItem(
        "musicEnabled",
        musicEnabled
    );

    updateMusicToggle();


    if (musicEnabled) {

        startMusic();

    } else {

        gameMusic.pause();

        gameMusic.currentTime = 0;

    }

});


/* =========================
   START MUSIC AFTER USER
   INTERACTION
========================= */

document.addEventListener("click", function startMusicAfterClick() {

    if (musicEnabled) {

        startMusic();

    }

    document.removeEventListener(
        "click",
        startMusicAfterClick
    );

});


/* =========================
   INITIAL STATE
========================= */

updateMusicToggle();
/* =========================================================
   STATS POPUP
========================================================= */

const statsButton =
    document.getElementById("statsButton");

const statsOverlay =
    document.getElementById("statsOverlay");

const closeStats =
    document.getElementById("closeStats");


/* =========================
   OPEN STATS
========================= */

statsButton.addEventListener("click", function () {

    updateStats();

    statsOverlay.classList.add("active");

});


/* =========================
   CLOSE STATS
========================= */

closeStats.addEventListener("click", function () {

    statsOverlay.classList.remove("active");

});


/* =========================
   CLICK OUTSIDE
========================= */

statsOverlay.addEventListener("click", function (event) {

    if (event.target === statsOverlay) {

        statsOverlay.classList.remove("active");

    }

});
/* =========================
   TOTAL PLAY TIME
========================= */

/* =========================
   TOTAL PLAY TIME
========================= */

setInterval(function () {

    totalTimePlayed++;

    localStorage.setItem(
        "totalTimePlayed",
        totalTimePlayed
    );


    /* =========================
       ONLINE QUEST
    ========================= */

    if (!onlineQuestCompleted) {

        /* Every 60 seconds = 1 minute */

        if (totalTimePlayed % 60 === 0) {

            onlineQuestMinutes++;

            if (onlineQuestMinutes >= 60) {

                onlineQuestMinutes = 60;

                onlineQuestCompleted = true;

                localStorage.setItem(
                    "onlineQuestCompleted",
                    "true"
                );

                /* Give 1 gem */

                gems += 1;

                localStorage.setItem(
                    "gems",
                    gems
                );

                updateDisplay();
            }

            localStorage.setItem(
                "onlineQuestMinutes",
                onlineQuestMinutes
            );

            updateOnlineQuest();
        }
    }


    checkOnlineQuestReset();

    updateStats();

}, 1000);
/* =========================
   UPDATE STATS
========================= */

function updateStats() {
const statsBonusElement =
    document.getElementById("statsBonus");

if (statsBonusElement) {

  const totalBonus =
        coinBonus + boostedCoinsBonus;

    statsBonusElement.textContent =
        "+" + getTotalBonus() + "%";

}
    const totalTimeElement =
        document.getElementById("totalTimePlayed");

    const totalCoinsElement =
        document.getElementById("totalCoinsEarned");

    const coinsPerSecondElement =
        document.getElementById("statsPerSecond");

    const tapPowerElement =
        document.getElementById("statsTapPower");


    /* Time */

    if (totalTimeElement) {

        const hours =
            Math.floor(totalTimePlayed / 3600);

        const minutes =
            Math.floor(
                (totalTimePlayed % 3600) / 60
            );

        const seconds =
            totalTimePlayed % 60;


        totalTimeElement.textContent =

            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
    }


    /* Total coins */

    if (totalCoinsElement) {

     totalCoinsElement.textContent =
    formatNumber(totalCoinsEarned);

    }


    /* Coins per second */

   if (coinsPerSecondElement) {

    const bonusMultiplier =
        1 + (getTotalBonus() / 100);

    const actualPerSecond =
    perSecond *
    bonusMultiplier *
    coinsPerSecondMultiplier;

    coinsPerSecondElement.textContent =
        actualPerSecond.toFixed(2);

}
    /* Tap power */

    if (tapPowerElement) {

        tapPowerElement.textContent =
            power;

    }

}
/* =========================================================
   REFERRAL SYSTEM
========================================================= */
const moreButton =
    document.getElementById("moreButton");

const referralOverlay =
    document.getElementById("referralOverlay");

const closeReferral =
    document.getElementById("closeReferral");

const inviteFriends =
    document.getElementById("inviteFriends");

const copyReferral =
    document.getElementById("copyReferral");

const referralLink =
    document.getElementById("referralLink");

const referralCount =
    document.getElementById("referralCount");


/* =========================================================
   REFERRAL DATA
========================================================= */

let referrals =
    Number(
        localStorage.getItem("referrals")
    ) || 0;


/* =========================================================
   TEMPORARY REFERRAL ID
========================================================= */

/*
   This creates a local referral ID for testing.

   Later we will replace this with
   the player's real Telegram ID.
*/

let referralId =
    localStorage.getItem("referralId");

if (!referralId) {

    referralId =
        Math.random()
            .toString(36)
            .substring(2, 10);

    localStorage.setItem(
        "referralId",
        referralId
    );
}


/* =========================================================
   REFERRAL LINK
========================================================= */




function updateReferralDisplay() {

    referralCount.textContent =
        referrals;


   
}



/* =========================================================
   OPEN MORE
========================================================= */

if (moreButton) {

    moreButton.addEventListener(
        "click",
        function () {

            updateReferralDisplay();

            referralOverlay.classList.add(
                "active"
            );

        }
    );

}


/* =========================================================
   CLOSE
========================================================= */

if (closeReferral) {

    closeReferral.addEventListener(
        "click",
        function () {

            referralOverlay.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================================
   CLICK OUTSIDE
========================================================= */

if (referralOverlay) {

    referralOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                referralOverlay
            ) {

                referralOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   INVITE FRIENDS
========================================================= */

if (inviteFriends) {

    inviteFriends.addEventListener(
        "click",
        function () {

            const link =
                referralLink.textContent;

            const shareText =
                "🌾 Join me in Clicker Farm and earn coins!";

            const telegramShare =
                "https://t.me/share/url?url=" +
                encodeURIComponent(link) +
                "&text=" +
                encodeURIComponent(shareText);


            window.open(
                telegramShare,
                "_blank"
            );

        }
    );

}


/* =========================================================
   COPY LINK
========================================================= */

if (copyReferral) {

    copyReferral.addEventListener(
        "click",
        async function () {

            const link =
                referralLink.textContent;

            try {

                await navigator.clipboard.writeText(
                    link
                );

                copyReferral.textContent =
                    "✓";

                setTimeout(
                    function () {

                        copyReferral.textContent =
                            "📋";

                    },
                    1500
                );

            } catch (error) {

                console.log(
                    "Could not copy referral link."
                );

            }

        }
    );

}
/* =========================================================
   TELEGRAM MINI APP
========================================================= */

const tg = window.Telegram?.WebApp;

if (tg) {

    tg.ready();

    tg.expand();

    console.log("Telegram Mini App detected");

    console.log(
        "Telegram user:",
        tg.initDataUnsafe?.user
    );

} else {

    console.log(
        "Running outside Telegram"
    );

}
/* =========================================================
   TELEGRAM USER CONNECTION
========================================================= */
let telegramInitData = "";
async function connectTelegramUser() {

    if (!window.Telegram || !window.Telegram.WebApp) {
        console.log("Telegram WebApp not available.");
        return;
    }

    const tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

   telegramInitData = tg.initData;

    if (!initData) {
        console.log("Telegram initData missing.");
        return;
    }

    console.log("Connecting Telegram user...");

    try {

        const response = await fetch(
            "https://server-72ja.onrender.com/api/user",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

               body: JSON.stringify({
    initData: telegramInitData
})
            }
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);

        if (!response.ok || !data.success) {

            console.error(
                "Server rejected user:",
                data
            );

            return;
        }

        console.log("Telegram user connected:", data.user);

        const referralLinkElement =
    document.getElementById("referralLink");

const referralCountElement =
    document.getElementById("referralCount");

const referralBonusElement =
    document.getElementById("referralBonus");

    const statBonusElement =
    document.getElementById("statBonus");

if (referralLinkElement) {

    referralLinkElement.textContent =
        data.referralLink;

}

if (referralCountElement) {

    referralCountElement.textContent =
        data.referralCount || 0;

}

if (referralBonusElement) {

    referralBonusElement.textContent =
        "+" + (data.coinBonus || 0) + "%";

}
if (statBonusElement) {

    statBonusElement.textContent =
        "+" + (data.statBonus || 0) + "%";

}
        /* =========================
           SAVE USER
        ========================= */

        localStorage.setItem(
            "telegramUser",
            JSON.stringify(data.user)
        );

    

    } catch (error) {

        console.error(
            "Could not connect to server:",
            error
        );

    }
}


/* START TELEGRAM CONNECTION */

connectTelegramUser();

/* =========================
   REFERRAL SYSTEM
========================= */

const referralLinkDisplay =
    document.getElementById("referralLink");

const referralCountDisplay =
    document.getElementById("referralCount");

const copyReferralBtn =
    document.getElementById("copyReferralBtn");


/* =========================
   LOAD REFERRAL DATA
========================= */

async function loadReferralData() {

    if (
        !window.Telegram ||
        !Telegram.WebApp
    ) {

        console.log(
            "Telegram WebApp not available"
        );

        return;
    }


    const initData =
        Telegram.WebApp.initData;


    if (!initData) {

        console.log(
            "Telegram initData missing"
        );

        return;
    }


    try {

        const response =
            await fetch(
                "https://server-72ja.onrender.com/api/user",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        initData: initData
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                data
            );

            return;
        }


        /* =========================
           DISPLAY LINK
        ========================= */

        referralLinkDisplay.textContent =
            data.referralLink;


        /* =========================
           DISPLAY COUNT
        ========================= */

        referralCountDisplay.textContent =
            data.referralCount;


        /* Save for popup */

        window.myReferralLink =
            data.referralLink;

    }

    catch (error) {

        console.error(
            "Referral error:",
            error
        );

    }
}


/* =========================
   COPY REFERRAL LINK
========================= */

if (copyReferralBtn) {

    copyReferralBtn.addEventListener(
        "click",
        async function () {

            if (!window.myReferralLink) {
                return;
            }


            try {

                await navigator.clipboard.writeText(
                    window.myReferralLink
                );


                copyReferralBtn.textContent =
                    "✅ COPIED!";


                setTimeout(
                    function () {

                        copyReferralBtn.textContent =
                            "📋 COPY LINK";

                    },
                    1500
                );

            }

            catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        }
    );

}
/* =========================
   QUEST WINDOW
========================= */

const questsButton = document.getElementById("questsButton");

const questOverlay = document.getElementById("questOverlay");

const closeQuest = document.getElementById("closeQuest");

/* =========================
   OPEN QUESTS
========================= */

if (questsButton && questOverlay) {

    questsButton.addEventListener(
        "click",
        function () {

            updateTelegramQuest();

            updateRollerCoinQuest();

            updateTonPickQuest();

            updatePixlandQuest();

            updateXQuest();
            questOverlay.classList.add("show");

        }
    );

}

/* =========================
   CLOSE QUESTS
========================= */

if (closeQuest && questOverlay) {

    closeQuest.addEventListener("click", function () {

        questOverlay.classList.remove("show");

    });

}

/* =========================
   QUEST TABS
========================= */

const mainQuestBtn = document.getElementById("mainQuestBtn");
const dailyQuestBtn = document.getElementById("dailyQuestBtn");

const mainQuests = document.getElementById("mainQuests");
const dailyQuests = document.getElementById("dailyQuests");


/* =========================
   DEFAULT TAB
   MAIN QUESTS
========================= */

mainQuests.style.display = "block";
dailyQuests.style.display = "none";

mainQuestBtn.classList.add("active");
dailyQuestBtn.classList.remove("active");


/* =========================
   MAIN QUESTS
========================= */

mainQuestBtn.addEventListener("click", function () {

    console.log("MAIN QUEST BUTTON CLICKED");

    mainQuests.style.display = "block";
    dailyQuests.style.display = "none";

    mainQuestBtn.classList.add("active");
    dailyQuestBtn.classList.remove("active");

});


/* =========================
   DAILY QUESTS
========================= */

dailyQuestBtn.addEventListener("click", function () {

    console.log("DAILY QUEST BUTTON CLICKED");

    mainQuests.style.display = "none";
    dailyQuests.style.display = "block";

    dailyQuestBtn.classList.add("active");
    mainQuestBtn.classList.remove("active");

});
/* =========================
   DAILY QUEST - 500 CLICKS
========================= */

const click500Quest =
    document.getElementById("click500Quest");

const clickQuestProgress =
    document.getElementById("clickQuestProgress");


/* =========================
   LOAD CLICK PROGRESS
========================= */

let clickQuestCount =
    Number(
        localStorage.getItem(
            "clickQuestCount"
        )
    ) || 0;


/* =========================
   QUEST COMPLETED
========================= */

let clickQuestCompleted =
    localStorage.getItem(
        "clickQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateClick500Quest() {

    if (!click500Quest) return;


    /* =========================
       COMPLETED
    ========================= */

    if (clickQuestCompleted) {

        clickQuestProgress.textContent =
            "500 / 500";

        click500Quest.textContent =
            "✓ COMPLETED";

        click500Quest.disabled =
            true;

        click500Quest.classList.add(
            "completed"
        );

        return;
    }


    /* =========================
       PROGRESS
    ========================= */

    clickQuestProgress.textContent =
        clickQuestCount + " / 500";

    click500Quest.textContent =
        clickQuestCount + " / 500";

}


/* =========================
   COUNT CORN CLICKS
========================= */

cornBtn.addEventListener(
    "click",
    function () {

        if (clickQuestCompleted) {
            return;
        }


        /* Add one click */

        clickQuestCount++;


        /* =========================
           COMPLETE AT 500
        ========================= */

       if (clickQuestCount >= 500) {

    clickQuestCount = 500;

    clickQuestCompleted = true;


    /* =========================
       GIVE 1 PREMIUM CURRENCY
    ========================= */

    gems += 1;


    /* =========================
       SAVE COMPLETION
    ========================= */

    localStorage.setItem(
        "clickQuestCompleted",
        "true"
    );


    /* =========================
       SAVE GEM
    ========================= */

    localStorage.setItem(
        "gems",
        gems
    );


    /* =========================
       UPDATE DISPLAY
    ========================= */

    updateDisplay();

    updateClick500Quest();
}


        /* =========================
           SAVE PROGRESS
        ========================= */

        localStorage.setItem(
            "clickQuestCount",
            clickQuestCount
        );


        /* =========================
           UPDATE QUEST
        ========================= */
updateClick500Quest();
       

    }
);


/* =========================
   INITIAL STATE
========================= */

updateClick500Quest();
/* =========================
   DAILY QUEST - EARN 10,000 COINS
========================= */

const coin10000Quest =
    document.getElementById("coin10000Quest");

const coinQuestProgress =
    document.getElementById("coinQuestProgress");


/* =========================
   LOAD PROGRESS
========================= */

let coinQuestCount =
    Number(
        localStorage.getItem(
            "coinQuestCount"
        )
    ) || 0;


/* =========================
   COMPLETED
========================= */

let coinQuestCompleted =
    localStorage.getItem(
        "coinQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateCoin10000Quest() {

    if (!coin10000Quest || !coinQuestProgress) {
        return;
    }

    if (coinQuestCompleted) {

        coinQuestProgress.textContent =
            "10,000 / 10,000";

        coin10000Quest.textContent =
            "✓ COMPLETED";

        coin10000Quest.disabled =
            true;

        coin10000Quest.classList.add(
            "completed"
        );

        return;
    }


    coinQuestProgress.textContent =
        coinQuestCount.toLocaleString() +
        " / 10,000";

    coin10000Quest.textContent =
        coinQuestCount.toLocaleString() +
        " / 10,000";
}

/* =========================
   COUNT EARNED COINS
========================= */

function countCoinQuest(coins) {

    if (coinQuestCompleted) {
        return;
    }

    coinQuestCount += coins;


    if (coinQuestCount >= 10000) {

        coinQuestCount = 10000;

        coinQuestCompleted = true;

        gems += 1;

        localStorage.setItem(
            "gems",
            gems
        );

        localStorage.setItem(
            "coinQuestCompleted",
            "true"
        );

        console.log(
            "10,000 COIN QUEST COMPLETED!"
        );
      updateDisplay();

        updateCoin10000Quest();

        return;
    }


    localStorage.setItem(
        "coinQuestCount",
        coinQuestCount
    );

    updateCoin10000Quest();
}
/* =========================
   INITIAL STATE
========================= */

updateCoin10000Quest();
/* =========================
   DAILY CLICK QUEST RESET
========================= */

let clickQuestResetTime =
    Number(
        localStorage.getItem(
            "clickQuestResetTime"
        )
    ) || 0;


/* =========================
   CHECK RESET
========================= */

function checkClickQuestReset() {

    const now = Date.now();


    /* First time */

    if (clickQuestResetTime === 0) {

        clickQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "clickQuestResetTime",
            clickQuestResetTime
        );

        return;
    }


    /* 24 hours passed */

    if (now >= clickQuestResetTime) {

        clickQuestCount = 0;

        clickQuestCompleted =
            false;

        clickQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "clickQuestCount",
            "0"
        );

        localStorage.setItem(
            "clickQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "clickQuestResetTime",
            clickQuestResetTime
        );


        updateClick500Quest();

    }

}
/* =========================
   START DAILY QUEST
========================= */

checkClickQuestReset();

updateClick500Quest();
/* =========================
   DAILY QUEST - BUY 1 TAP POWER
========================= */

const buyTapPowerQuest =
    document.getElementById("buyTapPowerQuest");

const tapPowerQuestProgress =
    document.getElementById("tapPowerQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPowerQuestCompleted =
    localStorage.getItem(
        "tapPowerQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPowerQuest() {

    if (!buyTapPowerQuest || !tapPowerQuestProgress) {
        return;
    }


    if (tapPowerQuestCompleted) {

        tapPowerQuestProgress.textContent =
            "1 / 1";

        buyTapPowerQuest.textContent =
            "✓ COMPLETED";

        buyTapPowerQuest.disabled =
            true;

        buyTapPowerQuest.classList.add(
            "completed"
        );

        return;
    }


    tapPowerQuestProgress.textContent =
        "0 / 1";

    buyTapPowerQuest.textContent =
        "0 / 1";
}
/* =========================
   TAP POWER QUEST RESET
========================= */

let tapPowerQuestResetTime =
    Number(
        localStorage.getItem(
            "tapPowerQuestResetTime"
        )
    ) || 0;


function checkTapPowerQuestReset() {

    const now = Date.now();


    if (tapPowerQuestResetTime === 0) {

        tapPowerQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "tapPowerQuestResetTime",
            tapPowerQuestResetTime
        );

        return;
    }


    if (now >= tapPowerQuestResetTime) {

        tapPowerQuestCompleted = false;

        tapPowerQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "tapPowerQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "tapPowerQuestResetTime",
            tapPowerQuestResetTime
        );


        updateTapPowerQuest();
    }
}

/* =========================
   START TAP POWER QUEST
========================= */

checkTapPowerQuestReset();

updateTapPowerQuest();


/* =========================
   DAILY QUEST - STAY ONLINE 60 MINUTES
========================= */

const online60Quest =
    document.getElementById("online60Quest");

const onlineQuestProgress =
    document.getElementById("onlineQuestProgress");


/* =========================
   LOAD QUEST
========================= */

let onlineQuestMinutes =
    Number(
        localStorage.getItem(
            "onlineQuestMinutes"
        )
    ) || 0;

let onlineQuestCompleted =
    localStorage.getItem(
        "onlineQuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateOnlineQuest() {

    if (!online60Quest || !onlineQuestProgress) {
        return;
    }

    if (onlineQuestCompleted) {

        onlineQuestProgress.textContent =
            "60 / 60 MIN";

        online60Quest.textContent =
            "✓ COMPLETED";

        online60Quest.disabled =
            true;

        online60Quest.classList.add(
            "completed"
        );

        return;
    }


    onlineQuestProgress.textContent =
        onlineQuestMinutes + " / 60 MIN";

    online60Quest.textContent =
        onlineQuestMinutes + " / 60";

}


/* =========================
   ONLINE QUEST RESET
========================= */

let onlineQuestResetTime =
    Number(
        localStorage.getItem(
            "onlineQuestResetTime"
        )
    ) || 0;


function checkOnlineQuestReset() {

    const now = Date.now();


    /* First time */

    if (onlineQuestResetTime === 0) {

        onlineQuestResetTime =
            now + (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "onlineQuestResetTime",
            onlineQuestResetTime
        );

        return;
    }


    /* 24 hours passed */

    if (now >= onlineQuestResetTime) {

        onlineQuestMinutes = 0;

        onlineQuestCompleted = false;

        onlineQuestResetTime =
            now + (24 * 60 * 60 * 1000);


        localStorage.setItem(
            "onlineQuestMinutes",
            "0"
        );

        localStorage.setItem(
            "onlineQuestCompleted",
            "false"
        );

        localStorage.setItem(
            "onlineQuestResetTime",
            onlineQuestResetTime
        );


        updateOnlineQuest();
    }
}


/* =========================
   START ONLINE QUEST
========================= */

checkOnlineQuestReset();

updateOnlineQuest();

/* =========================
   MAIN QUEST - TELEGRAM GROUP
========================= */

const joinTelegramQuest =
    document.getElementById("joinTelegramQuest");


/* =========================
   UPDATE QUEST BUTTON
========================= */

function updateTelegramQuest() {

    if (!joinTelegramQuest) return;

    const completed =
        localStorage.getItem("telegramQuestCompleted") === "true";

    if (completed) {

        joinTelegramQuest.textContent = "✓ CLAIMED";

        joinTelegramQuest.disabled = true;

        joinTelegramQuest.classList.add("completed");

    } else {

        joinTelegramQuest.textContent = "JOIN";

        joinTelegramQuest.disabled = false;

        joinTelegramQuest.classList.remove("completed");

    }
}

/* =========================
   JOIN TELEGRAM GROUP
========================= */

if (joinTelegramQuest) {

    joinTelegramQuest.addEventListener(
        "click",
        function () {

            /* Check again */

            const alreadyCompleted =
                localStorage.getItem(
                    "telegramQuestCompleted"
                ) === "true";

            if (alreadyCompleted) {

                updateTelegramQuest();

                return;
            }


            /* =========================
               OPEN TELEGRAM GROUP
            ========================= */

            window.open(
                "https://t.me/CryptoWeb3Income",
                "_blank"
            );


            /* =========================
               COMPLETE QUEST
            ========================= */

            localStorage.setItem(
                "telegramQuestCompleted",
                "true"
            );


            /* =========================
               GIVE +1%
            ========================= */

            coinBonus += 1;

            saveGame();


            /* =========================
               UPDATE EVERYTHING
            ========================= */

            updateStats();

            updateDisplay();

            updateTelegramQuest();

        }
    );

}


/* =========================
   INITIAL QUEST STATE
========================= */

updateTelegramQuest();

/* =========================
   ROLLERCOIN MAIN QUEST
========================= */

const joinRollerCoinQuest =
    document.getElementById("joinRollerCoinQuest");


/* =========================
   UPDATE ROLLERCOIN QUEST
========================= */

function updateRollerCoinQuest() {

    if (!joinRollerCoinQuest) return;

    const completed =
        localStorage.getItem(
            "rollerCoinQuestCompleted"
        ) === "true";


    if (completed) {

        joinRollerCoinQuest.textContent =
            "✓ CLAIMED";

        joinRollerCoinQuest.disabled =
            true;

        joinRollerCoinQuest.classList.add(
            "completed"
        );

    } else {

        joinRollerCoinQuest.textContent =
            "JOIN";

        joinRollerCoinQuest.disabled =
            false;

        joinRollerCoinQuest.classList.remove(
            "completed"
        );

    }

}


/* =========================
   ROLLERCOIN JOIN BUTTON
========================= */

if (joinRollerCoinQuest) {

    joinRollerCoinQuest.addEventListener(
        "click",
        function () {

            const alreadyCompleted =
                localStorage.getItem(
                    "rollerCoinQuestCompleted"
                ) === "true";


            if (alreadyCompleted) {

                updateRollerCoinQuest();

                return;

            }


            /* =========================
               OPEN ROLLERCOIN
            ========================= */

            window.open(
                "https://rollercoin.com/?r=kxc6it28",
                "_blank"
            );


            /* =========================
               COMPLETE QUEST
            ========================= */

            localStorage.setItem(
                "rollerCoinQuestCompleted",
                "true"
            );


            /* =========================
               GIVE +1% BONUS
            ========================= */

            coinBonus += 1;

            saveGame();


            /* =========================
               UPDATE STATS
            ========================= */

            updateStats();

            updateDisplay();

            updateRollerCoinQuest();

        }
    );

}


/* =========================
   INITIAL ROLLERCOIN STATE
========================= */

updateRollerCoinQuest();

/* =========================
   TONPICK MAIN QUEST
========================= */

const joinTonPickQuest =
    document.getElementById("joinTonPickQuest");


/* =========================
   UPDATE TONPICK QUEST
========================= */

function updateTonPickQuest() {

    if (!joinTonPickQuest) return;

    const completed =
        localStorage.getItem(
            "tonPickQuestCompleted"
        ) === "true";


    if (completed) {

        joinTonPickQuest.textContent =
            "✓ CLAIMED";

        joinTonPickQuest.disabled =
            true;

        joinTonPickQuest.classList.add(
            "completed"
        );

    } else {

        joinTonPickQuest.textContent =
            "JOIN";

        joinTonPickQuest.disabled =
            false;

        joinTonPickQuest.classList.remove(
            "completed"
        );

    }

}


/* =========================
   TONPICK JOIN BUTTON
========================= */

if (joinTonPickQuest) {

    joinTonPickQuest.addEventListener(
        "click",
        function () {

            const alreadyCompleted =
                localStorage.getItem(
                    "tonPickQuestCompleted"
                ) === "true";


            if (alreadyCompleted) {

                updateTonPickQuest();

                return;

            }


            /* =========================
               OPEN TONPICK
            ========================= */

            window.open(
                "https://tonpick.game/?ref=patrik_f71",
                "_blank"
            );


            /* =========================
               COMPLETE QUEST
            ========================= */

            localStorage.setItem(
                "tonPickQuestCompleted",
                "true"
            );


            /* =========================
               GIVE +1% BONUS
            ========================= */

            coinBonus += 1;

            saveGame();


            /* =========================
               UPDATE EVERYTHING
            ========================= */

            updateStats();

            updateDisplay();

            updateTonPickQuest();

        }
    );

}


/* =========================
   INITIAL STATE
========================= */

updateTonPickQuest();
/* =========================
   PIXLAND MAIN QUEST
========================= */

const joinPixlandQuest =
    document.getElementById("joinPixlandQuest");


/* =========================
   UPDATE PIXLAND QUEST
========================= */

function updatePixlandQuest() {

    if (!joinPixlandQuest) return;

    const completed =
        localStorage.getItem(
            "pixlandQuestCompleted"
        ) === "true";


    if (completed) {

        joinPixlandQuest.textContent =
            "✓ CLAIMED";

        joinPixlandQuest.disabled =
            true;

        joinPixlandQuest.classList.add(
            "completed"
        );

    } else {

        joinPixlandQuest.textContent =
            "JOIN";

        joinPixlandQuest.disabled =
            false;

        joinPixlandQuest.classList.remove(
            "completed"
        );

    }

}


/* =========================
   PIXLAND JOIN BUTTON
========================= */

if (joinPixlandQuest) {

    joinPixlandQuest.addEventListener(
        "click",
        function () {

            const alreadyCompleted =
                localStorage.getItem(
                    "pixlandQuestCompleted"
                ) === "true";


            if (alreadyCompleted) {

                updatePixlandQuest();

                return;

            }


            /* =========================
               OPEN PIXLAND
            ========================= */

            window.open(
                "https://t.me/pixlandsbot?startapp=Tvk9cX6",
                "_blank"
            );


            /* =========================
               COMPLETE QUEST
            ========================= */

            localStorage.setItem(
                "pixlandQuestCompleted",
                "true"
            );


            /* =========================
               GIVE +1% BONUS
            ========================= */

            coinBonus += 1;

            saveGame();


            /* =========================
               UPDATE EVERYTHING
            ========================= */

            updateStats();

            updateDisplay();

            updatePixlandQuest();

        }
    );

}


/* =========================
   INITIAL PIXLAND STATE
========================= */

updatePixlandQuest();

/* =========================
   X MAIN QUEST
========================= */

const joinXQuest =
    document.getElementById("joinXQuest");


/* =========================
   UPDATE X QUEST
========================= */

function updateXQuest() {

    if (!joinXQuest) return;

    const completed =
        localStorage.getItem(
            "xQuestCompleted"
        ) === "true";


    if (completed) {

        joinXQuest.textContent =
            "✓ CLAIMED";

        joinXQuest.disabled =
            true;

        joinXQuest.classList.add(
            "completed"
        );

    } else {

        joinXQuest.textContent =
            "JOIN";

        joinXQuest.disabled =
            false;

        joinXQuest.classList.remove(
            "completed"
        );

    }

}


/* =========================
   X JOIN BUTTON
========================= */

if (joinXQuest) {

    joinXQuest.addEventListener(
        "click",
        function () {

            const alreadyCompleted =
                localStorage.getItem(
                    "xQuestCompleted"
                ) === "true";


            if (alreadyCompleted) {

                updateXQuest();

                return;

            }


            /* =========================
               OPEN X
            ========================= */

            window.open(
                "https://x.com/adam_slusny",
                "_blank"
            );


            /* =========================
               COMPLETE QUEST
            ========================= */

            localStorage.setItem(
                "xQuestCompleted",
                "true"
            );


            /* =========================
               GIVE +1% BONUS
            ========================= */

            coinBonus += 1;


            /* =========================
               SAVE GAME
            ========================= */

            saveGame();


            /* =========================
               UPDATE EVERYTHING
            ========================= */

            updateStats();

            updateDisplay();

            updateXQuest();

        }
    );

}


/* =========================
   INITIAL X STATE
========================= */

updateXQuest();

/* =========================
   CLICK OUTSIDE TO CLOSE
========================= */

if (questOverlay) {

    questOverlay.addEventListener("click", function (event) {

        if (event.target === questOverlay) {

            questOverlay.classList.remove("show");

  } }); }
console.log(
    "DAILY QUEST:",
    document.getElementById("dailyQuests")
);

console.log(
    "CLICK QUEST:",
    document.getElementById("click500Quest")
);
const shopButton = document.getElementById("shopButton");
const shopOverlay = document.getElementById("shopOverlay");

shopButton.addEventListener("click", () => {
    shopOverlay.classList.remove("hidden");
});

const coinsShopButton = document.getElementById("coinsShopButton");
const coinsShop = document.getElementById("coinsShop");
const backToShop = document.getElementById("backToShop");

coinsShopButton.addEventListener("click", () => {

    document.querySelectorAll(".shop-button").forEach(button => {
        button.style.display = "none";
    });

    coinsShop.classList.remove("hidden");
});

backToShop.addEventListener("click", () => {

    coinsShop.classList.add("hidden");

    document.querySelectorAll(".shop-button").forEach(button => {
        button.style.display = "flex";
    });

});
const gemsShopButton =
    document.getElementById("gemsShopButton");

const gemsShop =
    document.getElementById("gemsShop");

const backFromGemsShop =
    document.getElementById("backFromGemsShop");


gemsShopButton.addEventListener(
    "click",
    function () {

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "none";

            });

        gemsShop.classList.remove("hidden");

    }
);


backFromGemsShop.addEventListener(
    "click",
    function () {

        gemsShop.classList.add("hidden");

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "flex";

            });

    }
);
/* =========================
   BOOSTED COINS - GEM SHOP
========================= */

const buyBoostedCoins =
    document.getElementById("buyBoostedCoins");

const boostedCoinsProgress =
    document.getElementById("boostedCoinsProgress");

const BOOSTED_COINS_COST = 100;

const BOOSTED_COINS_MAX = 50;


/* =========================
   UPDATE BOOSTED COINS
========================= */

function updateBoostedCoins() {

    if (!buyBoostedCoins || !boostedCoinsProgress) {
        return;
    }

    boostedCoinsProgress.textContent =
        "+" + boostedCoinsBonus + "% / 50%";


    /* MAX LEVEL */

    if (boostedCoinsBonus >= BOOSTED_COINS_MAX) {

        boostedCoinsBonus = BOOSTED_COINS_MAX;

        boostedCoinsProgress.textContent =
            "+50% / 50%";

        buyBoostedCoins.textContent =
            "✓ MAX";

        buyBoostedCoins.disabled =
            true;

        buyBoostedCoins.classList.add(
            "completed"
        );

        return;
    }


    /* CAN BUY */

    buyBoostedCoins.textContent =
        "💎 100";

    buyBoostedCoins.disabled =
        gems < BOOSTED_COINS_COST;

    buyBoostedCoins.classList.remove(
        "completed"
    );
}


/* =========================
   BUY BOOSTED COINS
========================= */

if (buyBoostedCoins) {

    buyBoostedCoins.addEventListener(
        "click",
        function () {

            /* MAX CHECK */

            if (boostedCoinsBonus >= BOOSTED_COINS_MAX) {
                return;
            }


            /* GEM CHECK */

            if (gems < BOOSTED_COINS_COST) {
                return;
            }

            /* PAY 100 GEMS */

            gems -= BOOSTED_COINS_COST;


            /* ADD +1% */

            boostedCoinsBonus += 1;


            /* SAFETY */

            if (boostedCoinsBonus > BOOSTED_COINS_MAX) {

                boostedCoinsBonus =
                    BOOSTED_COINS_MAX;
            }


            /* SAVE */

            localStorage.setItem(
                "gems",
                gems
            );

            localStorage.setItem(
                "boostedCoinsBonus",
                boostedCoinsBonus
            );


            /* UPDATE GAME */

            updateDisplay();

            updateStats();

            updateBoostedCoins();

        }
    );
}


/* =========================
   INITIAL STATE
========================= */

updateBoostedCoins();

/* =========================
   COINS PER SECOND GEM SHOP
========================= */

const buyCoinsPerSecond =
    document.getElementById("buyCoinsPerSecond");

const coinsPerSecondProgress =
    document.getElementById("coinsPerSecondProgress");

const COINS_PER_SECOND_COST = 100;
const COINS_PER_SECOND_MAX = 2;
const COINS_PER_SECOND_STEP = 0.01;


/* =========================
   LOAD GEMS
========================= */



if (isNaN(gems)) {
    gems = 0;
}


/* =========================
   LOAD MULTIPLIER
========================= */


if (
    isNaN(coinsPerSecondMultiplier) ||
    coinsPerSecondMultiplier < 1
) {
    coinsPerSecondMultiplier = 1;
}


/* =========================
   UPDATE SHOP
========================= */

function updateCoinsPerSecondShop() {

    if (
        !buyCoinsPerSecond ||
        !coinsPerSecondProgress
    ) {
        return;
    }

    /* MAX */

    if (
        coinsPerSecondMultiplier >=
        COINS_PER_SECOND_MAX
    ) {

        coinsPerSecondMultiplier =
            COINS_PER_SECOND_MAX;

        coinsPerSecondProgress.textContent =
            "2.00x / 2.00x";

        buyCoinsPerSecond.textContent =
            "✓ MAX";

        buyCoinsPerSecond.disabled = true;

        buyCoinsPerSecond.classList.add(
            "completed"
        );

        return;
    }


    /* NORMAL */

    coinsPerSecondProgress.textContent =
        coinsPerSecondMultiplier.toFixed(2) +
        "x / 2.00x";

    buyCoinsPerSecond.textContent =
        "💎 100";

    buyCoinsPerSecond.disabled =
        gems < COINS_PER_SECOND_COST;

    buyCoinsPerSecond.classList.remove(
        "completed"
    );
}


/* =========================
   BUY UPGRADE
========================= */

if (buyCoinsPerSecond) {

    buyCoinsPerSecond.addEventListener(
        "click",
        function () {

            /* Reload gems from storage */

            gems =
                Number(
                    localStorage.getItem("gems")
                );

            if (isNaN(gems)) {
                gems = 0;
            }


            /* MAX */

            if (
                coinsPerSecondMultiplier >=
                COINS_PER_SECOND_MAX
            ) {
                return;
            }


            /* NOT ENOUGH GEMS */

            if (
                gems <
                COINS_PER_SECOND_COST
            ) {

                console.log(
                    "Not enough gems:",
                    gems
                );

                return;
            }


            /* PAY 100 GEMS */

            gems -=
                COINS_PER_SECOND_COST;


            /* UPGRADE +0.01x */

            coinsPerSecondMultiplier +=
                COINS_PER_SECOND_STEP;


            /* MAX SAFETY */

            if (
                coinsPerSecondMultiplier >
                COINS_PER_SECOND_MAX
            ) {

                coinsPerSecondMultiplier =
                    COINS_PER_SECOND_MAX;
            }


            /* SAVE GEMS */

            localStorage.setItem(
                "gems",
                gems
            );


            /* SAVE MULTIPLIER */

            localStorage.setItem(
                "coinsPerSecondMultiplier",
                coinsPerSecondMultiplier
            );


            /* UPDATE */

            updateCoinsPerSecondShop();

            updateDisplay();

            updateStats();


            console.log(
                "CPS upgraded!",
                coinsPerSecondMultiplier,
                "x"
            );

        }
    );
}


/* =========================
   INITIAL STATE
========================= */

updateCoinsPerSecondShop();

// =========================
// MAIN SHOP CLOSE BUTTON
// =========================

// =========================
// MAIN SHOP CLOSE BUTTON
// =========================

const closeShopButton = document.getElementById("closeShop");

if (closeShopButton && shopOverlay) {

    closeShopButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        // Hide coin and gem shops
        coinsShop.classList.add("hidden");
        gemsShop.classList.add("hidden");

        // Show main shop buttons again
        document.querySelectorAll(".shop-button").forEach(button => {
            button.style.display = "flex";
        });

        // Close main shop
        shopOverlay.classList.add("hidden");

    });

}
const closeCoinShopButton =
    document.getElementById("closeCoinShop");

if (closeCoinShopButton && coinsShop) {

    closeCoinShopButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        coinsShop.classList.add("hidden");

    });

}
// =========================
// GEM SHOP CLOSE BUTTON
// =========================

const closeGemsShopButton =
    document.getElementById("closeGemsShop");

if (closeGemsShopButton && gemsShop) {

    closeGemsShopButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        gemsShop.classList.add("hidden");

    });

}
const leaderboardButton =
    document.getElementById("leaderboardButton");

const leaderboardPage =
    document.getElementById("leaderboardPage");

const closeLeaderboard =
    document.getElementById("closeLeaderboard");


leaderboardButton.addEventListener("click", function () {
    leaderboardPage.classList.remove("hidden");
});


closeLeaderboard.addEventListener("click", function () {
    leaderboardPage.classList.add("hidden");
});
function formatNumber(number) {

    if (number >= 1e12) {
        return (number / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
    }

    if (number >= 1e9) {
        return (number / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
    }

    if (number >= 1e6) {
        return (number / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    }

    if (number >= 1e3) {
        return (number / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
    }

    return number.toString();
}

/* =========================
   LEADERBOARD
========================= */

const gemLeaderboardButton =
    document.getElementById("gemLeaderboardButton");

const clickLeaderboardButton =
    document.getElementById("clickLeaderboardButton");

const coinLeaderboardButton =
    document.getElementById("coinLeaderboardButton");

const leaderboardList =
    document.getElementById("coinLeaderboard");


/* =========================
   NUMBER FORMAT
========================= */

function formatNumber(number) {

    if (number >= 1e12) {
        return (number / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
    }

    if (number >= 1e9) {
        return (number / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
    }

    if (number >= 1e6) {
        return (number / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    }

    if (number >= 1e3) {
        return (number / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
    }

    return number.toString();
}


/* =========================
   COINS
========================= */
function showCoinsLeaderboard() {

    leaderboardList.innerHTML = "";

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `
        <span class="rank">
            1
        </span>

        <span class="player-name">
            You
        </span>

        <span class="player-coins">
            💰 ${formatNumber(totalCoinsEarned)}
        </span>
    `;

    leaderboardList.appendChild(row);
}


/* =========================
   CLICKS
========================= */

function showClicksLeaderboard() {

    leaderboardList.innerHTML = "";

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `
        <span class="rank">
            1
        </span>

        <span class="player-name">
            You
        </span>

        <span class="player-coins">
            👆 ${formatNumber(totalClicks)}
        </span>
    `;

    leaderboardList.appendChild(row);
}


/* =========================
   GEMS
========================= */

function showGemsLeaderboard() {

    leaderboardList.innerHTML = "";

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `
        <span class="rank">
            1
        </span>

        <span class="player-name">
            You
        </span>

        <span class="player-coins">
            💎 ${formatNumber(gems)}
        </span>
    `;

    leaderboardList.appendChild(row);
}


/* =========================
   COINS BUTTON
========================= */

coinLeaderboardButton.onclick = function () {

    coinLeaderboardButton.classList.add("active");

    clickLeaderboardButton.classList.remove("active");

    gemLeaderboardButton.classList.remove("active");

    showCoinsLeaderboard();
};


/* =========================
   CLICKS BUTTON
========================= */

clickLeaderboardButton.onclick = function () {

    clickLeaderboardButton.classList.add("active");

    coinLeaderboardButton.classList.remove("active");

    gemLeaderboardButton.classList.remove("active");

    showClicksLeaderboard();
};


/* =========================
   GEMS BUTTON
========================= */

gemLeaderboardButton.onclick = function () {

    gemLeaderboardButton.classList.add("active");

    coinLeaderboardButton.classList.remove("active");

    clickLeaderboardButton.classList.remove("active");

    showGemsLeaderboard();
};


/* =========================
   START WITH COINS
========================= */

showCoinsLeaderboard();

async function saveLeaderboardStats() {

    try {

        const response = await fetch(
            "https://server-72ja.onrender.com/api/stats",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                   initData: telegramInitData,

                    coins: money,

                    totalClicks: totalClicks,

                    gems: gems

                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            console.error(
                "Failed to save leaderboard stats:",
                data
            );

            return;
        }

        console.log(
            "Leaderboard stats saved:",
            data
        );

    } catch (error) {

        console.error(
            "Leaderboard save error:",
            error
        );

    }
}

setInterval(function () {

    saveLeaderboardStats();

}, 10000);