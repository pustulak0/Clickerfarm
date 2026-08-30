/* =========================
   LOAD GAME
========================= */
let money =
    Number(localStorage.getItem("money")) || 0;

let tokens = 
    Number(localStorage.getItem("tokens")) || 0;

let power =
    Number(localStorage.getItem("power")) || 1;

let farmers =
    Number(localStorage.getItem("farmers")) || 0;

let perSecond =
    Number(localStorage.getItem("perSecond")) || 0;

let tapBonus =
    Number(localStorage.getItem("tapBonus")) || 0;

let upgradeCost =
    Number(localStorage.getItem("upgradeCost")) || 50;

let nightBonus =
    Number(
        localStorage.getItem("nightBonus")
    ) || 0;    

let resetVersion =
    Number(
        localStorage.getItem("resetVersion") || 0
    );

/* =========================================================
   SOUP TOTAL BONUS
========================================================= */

let soupBonus =
    Number(
        localStorage.getItem("soupBonus")
    ) || 0;

/* =========================================================
   SOUP UPGRADES
========================================================= */

let riceSoupLevel =
    Number(localStorage.getItem("riceSoupLevel")) || 0;

let potatoSoupLevel =
    Number(localStorage.getItem("potatoSoupLevel")) || 0;

let cornSoupLevel =
    Number(localStorage.getItem("cornSoupLevel")) || 0;

/* =========================================================
   SEED GROW TIME UPGRADES
========================================================= */

let riceGrowUpgrades =
    Number(
        localStorage.getItem(
            "riceGrowUpgrades"
        )
    ) || 0;


let potatoGrowUpgrades =
    Number(
        localStorage.getItem(
            "potatoGrowUpgrades"
        )
    ) || 0;


let cornGrowUpgrades =
    Number(
        localStorage.getItem(
            "cornGrowUpgrades"
        )
    ) || 0;


const MAX_SEED_GROW_UPGRADES = 120;


const RICE_GROW_UPGRADE_COST =
    1000000;


const POTATO_GROW_UPGRADE_COST =
    2000000;


const CORN_GROW_UPGRADE_COST =
    3000000;

let unlockedFieldPlots =
    JSON.parse(
        localStorage.getItem("unlockedFieldPlots")
    ) || [];

    /* =========================================================
   FARM INVENTORY
========================================================= */

let riceSeeds =
    Number(localStorage.getItem("riceSeeds")) || 0;

let potatoSeeds =
    Number(localStorage.getItem("potatoSeeds")) || 0;

let cornSeeds =
    Number(localStorage.getItem("cornSeeds")) || 0;


let rice =
    Number(localStorage.getItem("rice")) || 0;

let potato =
    Number(localStorage.getItem("potato")) || 0;

let corn =
    Number(localStorage.getItem("corn")) || 0;


/* =========================================================
   PLANTED CROPS
========================================================= */

let fieldCrops =
    JSON.parse(
        localStorage.getItem("fieldCrops")
    ) || {};

    /* =========================================================
   SELECTED PLOT FOR PLANTING
========================================================= */

let selectedPlantingPlot = null;

/* =========================================================
   GROW TIME
========================================================= */

const CROP_GROW_TIME =
    3 * 60 * 60 * 1000;

/* =========================================================
   SEEDS
========================================================= */
    updateInventory();

let energyUpgradeCost =
    Number(
        localStorage.getItem("energyUpgradeCost")
    ) || 1000;

if (isNaN(energyUpgradeCost)) {
    energyUpgradeCost = 5000;
}

let farmerCost =
    Number(localStorage.getItem("farmerCost")) || 100;

let luckyCoinMultiplier = Number(
    localStorage.getItem("luckyCoinMultiplier")
);

if (!Number.isFinite(luckyCoinMultiplier) || luckyCoinMultiplier < 1) {
    luckyCoinMultiplier = 1.00;
}

let luckyCoinMultiplierCost = Number(
    localStorage.getItem("luckyCoinMultiplierCost")
);

if (!Number.isFinite(luckyCoinMultiplierCost) || luckyCoinMultiplierCost < 5000) {
    luckyCoinMultiplierCost = 5000;
}

// =========================
// 🍀 SHOW LUCKY COIN PRICE
// =========================

const luckyButton =
    document.querySelector('[data-lucky]');

if (luckyButton) {

    const priceElement =
        luckyButton.querySelector("small");

    if (priceElement) {

       priceElement.textContent =
    formatNumber(luckyCoinMultiplierCost) + " 🪙";

    }
}

// =========================
// 🍀 LUCKY COIN CHANCE
// =========================

let luckyCoinChance =
    Number(localStorage.getItem("luckyCoinChance"));

if (
    !Number.isFinite(luckyCoinChance) ||
    luckyCoinChance < 1
) {
    luckyCoinChance = 1;
}

    let totalGemsBonus = Number(localStorage.getItem("totalGemsBonus")) || 0;

    let totalClicks = Number(localStorage.getItem("totalClicks")) || 0;

    let totalGemsEarned =
    Number(localStorage.getItem("totalGemsEarned")) || 0;

    let coins1MAchievementUnlocked =
    localStorage.getItem("coins1MAchievementUnlocked") === "true";

    let coins10MAchievementUnlocked =
    localStorage.getItem("coins10MAchievementUnlocked") === "true";

    let coins25MAchievementUnlocked =
    localStorage.getItem("coins25MAchievementUnlocked") === "true";

    let coins75MAchievementUnlocked =
    localStorage.getItem("coins75MAchievementUnlocked") === "true";

    let coins225MAchievementUnlocked =
    localStorage.getItem("coins225MAchievementUnlocked") === "true";

    let coins750MAchievementUnlocked =
    localStorage.getItem("coins750MAchievementUnlocked") === "true";

    let coins1BAchievementUnlocked =
    localStorage.getItem("coins1BAchievementUnlocked") === "true";

    let coins5BAchievementUnlocked =
    localStorage.getItem("coins5BAchievementUnlocked") === "true";

    let coins10BAchievementUnlocked =
    localStorage.getItem("coins10BAchievementUnlocked") === "true";

    let cpsBonus =
    Number(localStorage.getItem("cpsBonus")) || 0;

    let cps100AchievementUnlocked =
    localStorage.getItem("cps100AchievementUnlocked") === "true";

let cps500AchievementUnlocked =
    localStorage.getItem("cps500AchievementUnlocked") === "true";

let cps800AchievementUnlocked =
    localStorage.getItem("cps800AchievementUnlocked") === "true";

let cps1250AchievementUnlocked =
    localStorage.getItem("cps1250AchievementUnlocked") === "true";

let cps1750AchievementUnlocked =
    localStorage.getItem("cps1750AchievementUnlocked") === "true";

let cps2500AchievementUnlocked =
    localStorage.getItem("cps2500AchievementUnlocked") === "true";

let cps3500AchievementUnlocked =
    localStorage.getItem("cps3500AchievementUnlocked") === "true";

let cps4500AchievementUnlocked =
    localStorage.getItem("cps4500AchievementUnlocked") === "true";

let cps6000AchievementUnlocked =
    localStorage.getItem("cps6000AchievementUnlocked") === "true";

    let clicks1000AchievementUnlocked =
    localStorage.getItem("clicks1000AchievementUnlocked") === "true";

let clicks5000AchievementUnlocked =
    localStorage.getItem("clicks5000AchievementUnlocked") === "true";

let clicks12500AchievementUnlocked =
    localStorage.getItem("clicks12500AchievementUnlocked") === "true";

let clicks25000AchievementUnlocked =
    localStorage.getItem("clicks25000AchievementUnlocked") === "true";

let clicks50000AchievementUnlocked =
    localStorage.getItem("clicks50000AchievementUnlocked") === "true";

let clicks80000AchievementUnlocked =
    localStorage.getItem("clicks80000AchievementUnlocked") === "true";

let clicks125000AchievementUnlocked =
    localStorage.getItem("clicks125000AchievementUnlocked") === "true";

let clicks180000AchievementUnlocked =
    localStorage.getItem("clicks180000AchievementUnlocked") === "true";

let clicks250000AchievementUnlocked =
    localStorage.getItem("clicks250000AchievementUnlocked") === "true";

let gems100AchievementUnlocked =
    localStorage.getItem("gems100AchievementUnlocked") === "true";

let gems250AchievementUnlocked =
    localStorage.getItem("gems250AchievementUnlocked") === "true";

let gems500AchievementUnlocked =
    localStorage.getItem("gems500AchievementUnlocked") === "true";

let gems1000AchievementUnlocked =
    localStorage.getItem("gems1000AchievementUnlocked") === "true";

let gems1750AchievementUnlocked =
    localStorage.getItem("gems1750AchievementUnlocked") === "true";

let gems3000AchievementUnlocked =
    localStorage.getItem("gems3000AchievementUnlocked") === "true";

let gems5000AchievementUnlocked =
    localStorage.getItem("gems5000AchievementUnlocked") === "true";

let gems7500AchievementUnlocked =
    localStorage.getItem("gems7500AchievementUnlocked") === "true";

let gems11000AchievementUnlocked =
    localStorage.getItem("gems11000AchievementUnlocked") === "true";



    function updateGemAchievements() {

    const achievement100 =
        document.getElementById("gemAchievement100");

    const achievement250 =
        document.getElementById("gemAchievement250");

    const achievement500 =
        document.getElementById("gemAchievement500");

    const achievement1000 =
        document.getElementById("gemAchievement1000");

    const achievement1750 =
        document.getElementById("gemAchievement1750");

    const achievement3000 =
        document.getElementById("gemAchievement3000");

    const achievement5000 =
        document.getElementById("gemAchievement5000");

    const achievement7500 =
        document.getElementById("gemAchievement7500");

    const achievement11000 =
        document.getElementById("gemAchievement11000");


    if (achievement100 && gems100AchievementUnlocked) {

        achievement100.classList.add("unlocked");

        achievement100.innerHTML = `
            <span>🏆</span>
            <b>100</b>
            <small>+2%</small>
        `;
    }


    if (achievement250 && gems250AchievementUnlocked) {

        achievement250.classList.add("unlocked");

        achievement250.innerHTML = `
            <span>🏆</span>
            <b>250</b>
            <small>+4%</small>
        `;
    }


    if (achievement500 && gems500AchievementUnlocked) {

        achievement500.classList.add("unlocked");

        achievement500.innerHTML = `
            <span>🏆</span>
            <b>500</b>
            <small>+6%</small>
        `;
    }


    if (achievement1000 && gems1000AchievementUnlocked) {

        achievement1000.classList.add("unlocked");

        achievement1000.innerHTML = `
            <span>🏆</span>
            <b>1K</b>
            <small>+8%</small>
        `;
    }


    if (achievement1750 && gems1750AchievementUnlocked) {

        achievement1750.classList.add("unlocked");

        achievement1750.innerHTML = `
            <span>🏆</span>
            <b>1.75K</b>
            <small>+10%</small>
        `;
    }


    if (achievement3000 && gems3000AchievementUnlocked) {

        achievement3000.classList.add("unlocked");

        achievement3000.innerHTML = `
            <span>🏆</span>
            <b>3K</b>
            <small>+12%</small>
        `;
    }


    if (achievement5000 && gems5000AchievementUnlocked) {

        achievement5000.classList.add("unlocked");

        achievement5000.innerHTML = `
            <span>🏆</span>
            <b>5K</b>
            <small>+14%</small>
        `;
    }


    if (achievement7500 && gems7500AchievementUnlocked) {

        achievement7500.classList.add("unlocked");

        achievement7500.innerHTML = `
            <span>🏆</span>
            <b>7.5K</b>
            <small>+16%</small>
        `;
    }


    if (achievement11000 && gems11000AchievementUnlocked) {

        achievement11000.classList.add("unlocked");

        achievement11000.innerHTML = `
            <span>🏆</span>
            <b>11K</b>
            <small>+18%</small>
        `;
    }
}

/* =========================
   CHECK GEM ACHIEVEMENTS
========================= */

function checkGemAchievements() {

    // =========================
    // 100 GEMS
    // =========================

    if (
        totalGemsEarned >= 100 &&
        !gems100AchievementUnlocked
    ) {

        gems100AchievementUnlocked = true;

        localStorage.setItem(
            "gems100AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 2;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "100 GEMS",
            "+2% TOTAL GEMS"
        );
    }


    // =========================
    // 250 GEMS
    // =========================

    if (
        totalGemsEarned >= 250 &&
        !gems250AchievementUnlocked
    ) {

        gems250AchievementUnlocked = true;

        localStorage.setItem(
            "gems250AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 4;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "250 GEMS",
            "+4% TOTAL GEMS"
        );
    }


    // =========================
    // 500 GEMS
    // =========================

    if (
        totalGemsEarned >= 500 &&
        !gems500AchievementUnlocked
    ) {

        gems500AchievementUnlocked = true;

        localStorage.setItem(
            "gems500AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 6;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "500 GEMS",
            "+6% TOTAL GEMS"
        );
    }


    // =========================
    // 1,000 GEMS
    // =========================

    if (
        totalGemsEarned >= 1000 &&
        !gems1000AchievementUnlocked
    ) {

        gems1000AchievementUnlocked = true;

        localStorage.setItem(
            "gems1000AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 8;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "1,000 GEMS",
            "+8% TOTAL GEMS"
        );
    }


    // =========================
    // 1,750 GEMS
    // =========================

    if (
        totalGemsEarned >= 1750 &&
        !gems1750AchievementUnlocked
    ) {

        gems1750AchievementUnlocked = true;

        localStorage.setItem(
            "gems1750AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 10;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "1,750 GEMS",
            "+10% TOTAL GEMS"
        );
    }


    // =========================
    // 3,000 GEMS
    // =========================

    if (
        totalGemsEarned >= 3000 &&
        !gems3000AchievementUnlocked
    ) {

        gems3000AchievementUnlocked = true;

        localStorage.setItem(
            "gems3000AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 12;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "3,000 GEMS",
            "+12% TOTAL GEMS"
        );
    }


    // =========================
    // 5,000 GEMS
    // =========================

    if (
        totalGemsEarned >= 5000 &&
        !gems5000AchievementUnlocked
    ) {

        gems5000AchievementUnlocked = true;

        localStorage.setItem(
            "gems5000AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 14;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "5,000 GEMS",
            "+14% TOTAL GEMS"
        );
    }


    // =========================
    // 7,500 GEMS
    // =========================

    if (
        totalGemsEarned >= 7500 &&
        !gems7500AchievementUnlocked
    ) {

        gems7500AchievementUnlocked = true;

        localStorage.setItem(
            "gems7500AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 16;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "7,500 GEMS",
            "+16% TOTAL GEMS"
        );
    }


    // =========================
    // 11,000 GEMS
    // =========================

    if (
        totalGemsEarned >= 11000 &&
        !gems11000AchievementUnlocked
    ) {

        gems11000AchievementUnlocked = true;

        localStorage.setItem(
            "gems11000AchievementUnlocked",
            "true"
        );

        totalGemsBonus += 18;

        localStorage.setItem(
            "totalGemsBonus",
            totalGemsBonus
        );

        updateGemAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "11,000 GEMS",
            "+18% TOTAL GEMS"
        );
    }
}

function updateCoinAchievements() {

    const achievement1M =
        document.getElementById("coinAchievement1M");

    const achievement10M =
        document.getElementById("coinAchievement10M");

    const achievement25M =
        document.getElementById("coinAchievement25M");

    const achievement75M =
        document.getElementById("coinAchievement75M");

    const achievement225M =
        document.getElementById("coinAchievement225M");

    const achievement750M =
        document.getElementById("coinAchievement750M");

    const achievement1B =
        document.getElementById("coinAchievement1B");

    const achievement5B =
        document.getElementById("coinAchievement5B");

    const achievement10B =
        document.getElementById("coinAchievement10B");


    // =========================
    // 1M
    // =========================

    if (achievement1M && coins1MAchievementUnlocked) {

        achievement1M.classList.add("unlocked");

        achievement1M.innerHTML = `
            <span>🏆</span>
            <b>1M</b>
            <small>+2%</small>
        `;
    }


    // =========================
    // 10M
    // =========================

    if (achievement10M && coins10MAchievementUnlocked) {

        achievement10M.classList.add("unlocked");

        achievement10M.innerHTML = `
            <span>🏆</span>
            <b>10M</b>
            <small>+4%</small>
        `;
    }


    // =========================
    // 25M
    // =========================

    if (achievement25M && coins25MAchievementUnlocked) {

        achievement25M.classList.add("unlocked");

        achievement25M.innerHTML = `
            <span>🏆</span>
            <b>25M</b>
            <small>+6%</small>
        `;
    }


    // =========================
    // 75M
    // =========================

    if (achievement75M && coins75MAchievementUnlocked) {

        achievement75M.classList.add("unlocked");

        achievement75M.innerHTML = `
            <span>🏆</span>
            <b>75M</b>
            <small>+8%</small>
        `;
    }


    // =========================
    // 225M
    // =========================

    if (achievement225M && coins225MAchievementUnlocked) {

        achievement225M.classList.add("unlocked");

        achievement225M.innerHTML = `
            <span>🏆</span>
            <b>225M</b>
            <small>+10%</small>
        `;
    }


    // =========================
    // 750M
    // =========================

    if (achievement750M && coins750MAchievementUnlocked) {

        achievement750M.classList.add("unlocked");

        achievement750M.innerHTML = `
            <span>🏆</span>
            <b>750M</b>
            <small>+12%</small>
        `;
    }


    // =========================
    // 1B
    // =========================

    if (achievement1B && coins1BAchievementUnlocked) {

        achievement1B.classList.add("unlocked");

        achievement1B.innerHTML = `
            <span>🏆</span>
            <b>1B</b>
            <small>+14%</small>
        `;
    }


    // =========================
    // 5B
    // =========================

    if (achievement5B && coins5BAchievementUnlocked) {

        achievement5B.classList.add("unlocked");

        achievement5B.innerHTML = `
            <span>🏆</span>
            <b>5B</b>
            <small>+16%</small>
        `;
    }


    // =========================
    // 10B
    // =========================

    if (achievement10B && coins10BAchievementUnlocked) {

        achievement10B.classList.add("unlocked");

        achievement10B.innerHTML = `
            <span>🏆</span>
            <b>10B</b>
            <small>+18%</small>
        `;
    }
}

function updateClickAchievements() {

    const achievement1000 =
        document.getElementById("clickAchievement1000");

    const achievement5000 =
        document.getElementById("clickAchievement5000");

    const achievement12500 =
        document.getElementById("clickAchievement12500");

    const achievement25000 =
        document.getElementById("clickAchievement25000");

    const achievement50000 =
        document.getElementById("clickAchievement50000");

    const achievement80000 =
        document.getElementById("clickAchievement80000");

    const achievement125000 =
        document.getElementById("clickAchievement125000");

    const achievement180000 =
        document.getElementById("clickAchievement180000");

    const achievement250000 =
        document.getElementById("clickAchievement250000");


    if (achievement1000 && clicks1000AchievementUnlocked) {
        achievement1000.classList.add("unlocked");
        achievement1000.innerHTML = `
            <span>🏆</span>
            <b>1K</b>
            <small>+2%</small>
        `;
    }

    if (achievement5000 && clicks5000AchievementUnlocked) {
        achievement5000.classList.add("unlocked");
        achievement5000.innerHTML = `
            <span>🏆</span>
            <b>5K</b>
            <small>+4%</small>
        `;
    }

    if (achievement12500 && clicks12500AchievementUnlocked) {
        achievement12500.classList.add("unlocked");
        achievement12500.innerHTML = `
            <span>🏆</span>
            <b>12.5K</b>
            <small>+6%</small>
        `;
    }

    if (achievement25000 && clicks25000AchievementUnlocked) {
        achievement25000.classList.add("unlocked");
        achievement25000.innerHTML = `
            <span>🏆</span>
            <b>25K</b>
            <small>+8%</small>
        `;
    }

    if (achievement50000 && clicks50000AchievementUnlocked) {
        achievement50000.classList.add("unlocked");
        achievement50000.innerHTML = `
            <span>🏆</span>
            <b>50K</b>
            <small>+10%</small>
        `;
    }

    if (achievement80000 && clicks80000AchievementUnlocked) {
        achievement80000.classList.add("unlocked");
        achievement80000.innerHTML = `
            <span>🏆</span>
            <b>80K</b>
            <small>+12%</small>
        `;
    }

    if (achievement125000 && clicks125000AchievementUnlocked) {
        achievement125000.classList.add("unlocked");
        achievement125000.innerHTML = `
            <span>🏆</span>
            <b>125K</b>
            <small>+14%</small>
        `;
    }

    if (achievement180000 && clicks180000AchievementUnlocked) {
        achievement180000.classList.add("unlocked");
        achievement180000.innerHTML = `
            <span>🏆</span>
            <b>180K</b>
            <small>+16%</small>
        `;
    }

    if (achievement250000 && clicks250000AchievementUnlocked) {
        achievement250000.classList.add("unlocked");
        achievement250000.innerHTML = `
            <span>🏆</span>
            <b>250K</b>
            <small>+18%</small>
        `;
    }
}

/* =========================
   CHECK CLICK ACHIEVEMENTS
========================= */

function checkClickAchievements() {

    // =========================
    // 1,000 CLICKS
    // =========================

    if (
        totalClicks >= 1000 &&
        !clicks1000AchievementUnlocked
    ) {

        clicks1000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks1000AchievementUnlocked",
            "true"
        );

        tapBonus += 2;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "1,000 CLICKS",
            "+2% BONUS"
        );
    }


    // =========================
    // 5,000 CLICKS
    // =========================

    if (
        totalClicks >= 5000 &&
        !clicks5000AchievementUnlocked
    ) {

        clicks5000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks5000AchievementUnlocked",
            "true"
        );

        tapBonus += 4;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "5,000 CLICKS",
            "+4% BONUS"
        );
    }


    // =========================
    // 12,500 CLICKS
    // =========================

    if (
        totalClicks >= 12500 &&
        !clicks12500AchievementUnlocked
    ) {

        clicks12500AchievementUnlocked = true;

        localStorage.setItem(
            "clicks12500AchievementUnlocked",
            "true"
        );

        tapBonus += 6;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "12,500 CLICKS",
            "+6% BONUS"
        );
    }


    // =========================
    // 25,000 CLICKS
    // =========================

    if (
        totalClicks >= 25000 &&
        !clicks25000AchievementUnlocked
    ) {

        clicks25000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks25000AchievementUnlocked",
            "true"
        );

        tapBonus += 8;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "25,000 CLICKS",
            "+8% BONUS"
        );
    }


    // =========================
    // 50,000 CLICKS
    // =========================

    if (
        totalClicks >= 50000 &&
        !clicks50000AchievementUnlocked
    ) {

        clicks50000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks50000AchievementUnlocked",
            "true"
        );

        tapBonus += 10;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "50,000 CLICKS",
            "+10% BONUS"
        );
    }


    // =========================
    // 80,000 CLICKS
    // =========================

    if (
        totalClicks >= 80000 &&
        !clicks80000AchievementUnlocked
    ) {

        clicks80000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks80000AchievementUnlocked",
            "true"
        );

        tapBonus += 12;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "80,000 CLICKS",
            "+12% BONUS"
        );
    }


    // =========================
    // 125,000 CLICKS
    // =========================

    if (
        totalClicks >= 125000 &&
        !clicks125000AchievementUnlocked
    ) {

        clicks125000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks125000AchievementUnlocked",
            "true"
        );

        tapBonus += 14;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "125,000 CLICKS",
            "+14% BONUS"
        );
    }


    // =========================
    // 180,000 CLICKS
    // =========================

    if (
        totalClicks >= 180000 &&
        !clicks180000AchievementUnlocked
    ) {

        clicks180000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks180000AchievementUnlocked",
            "true"
        );

        tapBonus += 16;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "180,000 CLICKS",
            "+16% BONUS"
        );
    }


    // =========================
    // 250,000 CLICKS
    // =========================

    if (
        totalClicks >= 250000 &&
        !clicks250000AchievementUnlocked
    ) {

        clicks250000AchievementUnlocked = true;

        localStorage.setItem(
            "clicks250000AchievementUnlocked",
            "true"
        );

        tapBonus += 18;

        localStorage.setItem(
            "tapBonus",
            tapBonus
        );

        updateStatsBonus();
        updateClickAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "250,000 CLICKS",
            "+18% BONUS"
        );
    }
}

/* =========================
   UPDATE CPS ACHIEVEMENTS
========================= */

function updateCPSAchievements() {

    const achievement100 =
        document.getElementById("cpsAchievement100");

    const achievement500 =
        document.getElementById("cpsAchievement500");

    const achievement800 =
        document.getElementById("cpsAchievement800");

    const achievement1250 =
        document.getElementById("cpsAchievement1250");

    const achievement1750 =
        document.getElementById("cpsAchievement1750");

    const achievement2500 =
        document.getElementById("cpsAchievement2500");

    const achievement3500 =
        document.getElementById("cpsAchievement3500");

    const achievement4500 =
        document.getElementById("cpsAchievement4500");

    const achievement6000 =
        document.getElementById("cpsAchievement6000");


    if (achievement100 && cps100AchievementUnlocked) {

        achievement100.classList.add("unlocked");

        achievement100.innerHTML = `
            <span>🏆</span>
            <b>100 CPS</b>
            <small>+2%</small>
        `;
    }


    if (achievement500 && cps500AchievementUnlocked) {

        achievement500.classList.add("unlocked");

        achievement500.innerHTML = `
            <span>🏆</span>
            <b>500 CPS</b>
            <small>+4%</small>
        `;
    }


    if (achievement800 && cps800AchievementUnlocked) {

        achievement800.classList.add("unlocked");

        achievement800.innerHTML = `
            <span>🏆</span>
            <b>800 CPS</b>
            <small>+6%</small>
        `;
    }


    if (achievement1250 && cps1250AchievementUnlocked) {

        achievement1250.classList.add("unlocked");

        achievement1250.innerHTML = `
            <span>🏆</span>
            <b>1250 CPS</b>
            <small>+8%</small>
        `;
    }


    if (achievement1750 && cps1750AchievementUnlocked) {

        achievement1750.classList.add("unlocked");

        achievement1750.innerHTML = `
            <span>🏆</span>
            <b>1750 CPS</b>
            <small>+10%</small>
        `;
    }


    if (achievement2500 && cps2500AchievementUnlocked) {

        achievement2500.classList.add("unlocked");

        achievement2500.innerHTML = `
            <span>🏆</span>
            <b>2500 CPS</b>
            <small>+12%</small>
        `;
    }


    if (achievement3500 && cps3500AchievementUnlocked) {

        achievement3500.classList.add("unlocked");

        achievement3500.innerHTML = `
            <span>🏆</span>
            <b>3500 CPS</b>
            <small>+14%</small>
        `;
    }


    if (achievement4500 && cps4500AchievementUnlocked) {

        achievement4500.classList.add("unlocked");

        achievement4500.innerHTML = `
            <span>🏆</span>
            <b>4500 CPS</b>
            <small>+16%</small>
        `;
    }


    if (achievement6000 && cps6000AchievementUnlocked) {

        achievement6000.classList.add("unlocked");

        achievement6000.innerHTML = `
            <span>🏆</span>
            <b>6000 CPS</b>
            <small>+18%</small>
        `;
    }
}

/* =========================
   CHECK COIN ACHIEVEMENTS
========================= */

function checkCoinAchievements() {

    // =========================
    // 1M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 1000000 &&
        !coins1MAchievementUnlocked
    ) {

        coins1MAchievementUnlocked = true;

        localStorage.setItem(
            "coins1MAchievementUnlocked",
            "true"
        );

        coinBonus += 2;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "1M COINS",
            "+2% Coins"
        );

        saveGame();
    }


    // =========================
    // 10M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 10000000 &&
        !coins10MAchievementUnlocked
    ) {

        coins10MAchievementUnlocked = true;

        localStorage.setItem(
            "coins10MAchievementUnlocked",
            "true"
        );

        coinBonus += 4;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "10M COINS",
            "+4% Coins"
        );

        saveGame();
    }


    // =========================
    // 25M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 25000000 &&
        !coins25MAchievementUnlocked
    ) {

        coins25MAchievementUnlocked = true;

        localStorage.setItem(
            "coins25MAchievementUnlocked",
            "true"
        );

        coinBonus += 6;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "25M COINS",
            "+6% Coins"
        );

        saveGame();
    }


    // =========================
    // 75M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 75000000 &&
        !coins75MAchievementUnlocked
    ) {

        coins75MAchievementUnlocked = true;

        localStorage.setItem(
            "coins75MAchievementUnlocked",
            "true"
        );

        coinBonus += 8;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "75M COINS",
            "+8% Coins"
        );

        saveGame();
    }


    // =========================
    // 225M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 225000000 &&
        !coins225MAchievementUnlocked
    ) {

        coins225MAchievementUnlocked = true;

        localStorage.setItem(
            "coins225MAchievementUnlocked",
            "true"
        );

        coinBonus += 10;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "225M COINS",
            "+10% Coins"
        );

        saveGame();
    }


    // =========================
    // 750M ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 750000000 &&
        !coins750MAchievementUnlocked
    ) {

        coins750MAchievementUnlocked = true;

        localStorage.setItem(
            "coins750MAchievementUnlocked",
            "true"
        );

        coinBonus += 12;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "750M COINS",
            "+12% Coins"
        );

        saveGame();
    }


    // =========================
    // 1B ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 1000000000 &&
        !coins1BAchievementUnlocked
    ) {

        coins1BAchievementUnlocked = true;

        localStorage.setItem(
            "coins1BAchievementUnlocked",
            "true"
        );

        coinBonus += 14;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "1B COINS",
            "+14% Coins"
        );

        saveGame();
    }


    // =========================
    // 5B ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 5000000000 &&
        !coins5BAchievementUnlocked
    ) {

        coins5BAchievementUnlocked = true;

        localStorage.setItem(
            "coins5BAchievementUnlocked",
            "true"
        );

        coinBonus += 16;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "5B COINS",
            "+16% Coins"
        );

        saveGame();
    }


    // =========================
    // 10B ACHIEVEMENT
    // =========================

    if (
        totalCoinsEarned >= 10000000000 &&
        !coins10BAchievementUnlocked
    ) {

        coins10BAchievementUnlocked = true;

        localStorage.setItem(
            "coins10BAchievementUnlocked",
            "true"
        );

        coinBonus += 18;

        localStorage.setItem(
            "coinBonus",
            coinBonus
        );

        updateStatsBonus();
        updateCoinAchievements();

        showAchievementUnlocked(
            "10B COINS",
            "+18% Coins"
        );

        saveGame();
    }
}

/* =========================
   CHECK CPS ACHIEVEMENTS
========================= */

function checkCPSAchievements() {

    // =========================
    // 100 CPS
    // =========================

    if (
        perSecond >= 100 &&
        !cps100AchievementUnlocked
    ) {

        cps100AchievementUnlocked = true;

        localStorage.setItem(
            "cps100AchievementUnlocked",
            "true"
        );

        cpsBonus += 2;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "100 CPS",
            "+2% CPS"
        );
    }


    // =========================
    // 500 CPS
    // =========================

    if (
        perSecond >= 500 &&
        !cps500AchievementUnlocked
    ) {

        cps500AchievementUnlocked = true;

        localStorage.setItem(
            "cps500AchievementUnlocked",
            "true"
        );

        cpsBonus += 4;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "500 CPS",
            "+4% CPS"
        );
    }


    // =========================
    // 800 CPS
    // =========================

    if (
        perSecond >= 800 &&
        !cps800AchievementUnlocked
    ) {

        cps800AchievementUnlocked = true;

        localStorage.setItem(
            "cps800AchievementUnlocked",
            "true"
        );

        cpsBonus += 6;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "800 CPS",
            "+6% CPS"
        );
    }


    // =========================
    // 1250 CPS
    // =========================

    if (
        perSecond >= 1250 &&
        !cps1250AchievementUnlocked
    ) {

        cps1250AchievementUnlocked = true;

        localStorage.setItem(
            "cps1250AchievementUnlocked",
            "true"
        );

        cpsBonus += 8;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "1250 CPS",
            "+8% CPS"
        );
    }


    // =========================
    // 1750 CPS
    // =========================

    if (
        perSecond >= 1750 &&
        !cps1750AchievementUnlocked
    ) {

        cps1750AchievementUnlocked = true;

        localStorage.setItem(
            "cps1750AchievementUnlocked",
            "true"
        );

        cpsBonus += 10;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "1750 CPS",
            "+10% CPS"
        );
    }


    // =========================
    // 2500 CPS
    // =========================

    if (
        perSecond >= 2500 &&
        !cps2500AchievementUnlocked
    ) {

        cps2500AchievementUnlocked = true;

        localStorage.setItem(
            "cps2500AchievementUnlocked",
            "true"
        );

        cpsBonus += 12;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "2500 CPS",
            "+12% CPS"
        );
    }


    // =========================
    // 3500 CPS
    // =========================

    if (
        perSecond >= 3500 &&
        !cps3500AchievementUnlocked
    ) {

        cps3500AchievementUnlocked = true;

        localStorage.setItem(
            "cps3500AchievementUnlocked",
            "true"
        );

        cpsBonus += 14;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "3500 CPS",
            "+14% CPS"
        );
    }


    // =========================
    // 4500 CPS
    // =========================

    if (
        perSecond >= 4500 &&
        !cps4500AchievementUnlocked
    ) {

        cps4500AchievementUnlocked = true;

        localStorage.setItem(
            "cps4500AchievementUnlocked",
            "true"
        );

        cpsBonus += 16;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "4500 CPS",
            "+16% CPS"
        );
    }


    // =========================
    // 6000 CPS
    // =========================

    if (
        perSecond >= 6000 &&
        !cps6000AchievementUnlocked
    ) {

        cps6000AchievementUnlocked = true;

        localStorage.setItem(
            "cps6000AchievementUnlocked",
            "true"
        );

        cpsBonus += 18;

        localStorage.setItem(
            "cpsBonus",
            cpsBonus
        );

        updateCPSAchievements();

        showAchievementUnlocked(
            "6000 CPS",
            "+18% CPS"
        );
    }

    // =========================
    // UPDATE TOTAL BONUS ONCE
    // =========================

    updateStatsBonus();

    saveGame();
}

// =========================
// FARMER ACHIEVEMENT FLAGS
// =========================

let farmers50AchievementUnlocked =
    localStorage.getItem("farmers50AchievementUnlocked") === "true";

let farmers125AchievementUnlocked =
    localStorage.getItem("farmers125AchievementUnlocked") === "true";

let farmers180AchievementUnlocked =
    localStorage.getItem("farmers180AchievementUnlocked") === "true";

let farmers275AchievementUnlocked =
    localStorage.getItem("farmers275AchievementUnlocked") === "true";

let farmers400AchievementUnlocked =
    localStorage.getItem("farmers400AchievementUnlocked") === "true";

let farmers600AchievementUnlocked =
    localStorage.getItem("farmers600AchievementUnlocked") === "true";

let farmers800AchievementUnlocked =
    localStorage.getItem("farmers800AchievementUnlocked") === "true";

let farmers950AchievementUnlocked =
    localStorage.getItem("farmers950AchievementUnlocked") === "true";

let farmers1100AchievementUnlocked =
    localStorage.getItem("farmers1100AchievementUnlocked") === "true";

    /* =========================
   UPDATE FARMER ACHIEVEMENTS
========================= */

function updateFarmerAchievements() {

    const achievement50 =
        document.getElementById("farmerAchievement50");

    const achievement125 =
        document.getElementById("farmerAchievement125");

    const achievement180 =
        document.getElementById("farmerAchievement180");

    const achievement275 =
        document.getElementById("farmerAchievement275");

    const achievement400 =
        document.getElementById("farmerAchievement400");

    const achievement600 =
        document.getElementById("farmerAchievement600");

    const achievement800 =
        document.getElementById("farmerAchievement800");

    const achievement950 =
        document.getElementById("farmerAchievement950");

    const achievement1100 =
        document.getElementById("farmerAchievement1100");


    if (achievement50 && farmers50AchievementUnlocked) {

        achievement50.classList.add("unlocked");

        achievement50.innerHTML = `
            <span>🏆</span>
            <b>50</b>
            <small>+25 CPS</small>
        `;
    }


    if (achievement125 && farmers125AchievementUnlocked) {

        achievement125.classList.add("unlocked");

        achievement125.innerHTML = `
            <span>🏆</span>
            <b>125</b>
            <small>+55 CPS</small>
        `;
    }


    if (achievement180 && farmers180AchievementUnlocked) {

        achievement180.classList.add("unlocked");

        achievement180.innerHTML = `
            <span>🏆</span>
            <b>180</b>
            <small>+90 CPS</small>
        `;
    }


    if (achievement275 && farmers275AchievementUnlocked) {

        achievement275.classList.add("unlocked");

        achievement275.innerHTML = `
            <span>🏆</span>
            <b>275</b>
            <small>+135 CPS</small>
        `;
    }


    if (achievement400 && farmers400AchievementUnlocked) {

        achievement400.classList.add("unlocked");

        achievement400.innerHTML = `
            <span>🏆</span>
            <b>400</b>
            <small>+185 CPS</small>
        `;
    }


    if (achievement600 && farmers600AchievementUnlocked) {

        achievement600.classList.add("unlocked");

        achievement600.innerHTML = `
            <span>🏆</span>
            <b>600</b>
            <small>+240 CPS</small>
        `;
    }


    if (achievement800 && farmers800AchievementUnlocked) {

        achievement800.classList.add("unlocked");

        achievement800.innerHTML = `
            <span>🏆</span>
            <b>800</b>
            <small>+300 CPS</small>
        `;
    }


    if (achievement950 && farmers950AchievementUnlocked) {

        achievement950.classList.add("unlocked");

        achievement950.innerHTML = `
            <span>🏆</span>
            <b>950</b>
            <small>+365 CPS</small>
        `;
    }


    if (achievement1100 && farmers1100AchievementUnlocked) {

        achievement1100.classList.add("unlocked");

        achievement1100.innerHTML = `
            <span>🏆</span>
            <b>1.1K</b>
            <small>+435 CPS</small>
        `;
    }
}

/* =========================================================
   ACHIEVEMENT NOTIFICATION QUEUE
========================================================= */

let achievementNotificationQueue = [];
let achievementNotificationShowing = false;
let achievementNotificationTimer = null;


/* =========================================================
   SHOW ACHIEVEMENT UNLOCKED
========================================================= */

function showAchievementUnlocked(name, reward) {

    const notification =
        document.getElementById("achievementNotification");

    const nameElement =
        document.getElementById("achievementNotificationName");

    const rewardElement =
        document.getElementById("achievementNotificationReward");

    if (!notification || !nameElement || !rewardElement) {
        return;
    }

    /* Add achievement to queue */

    achievementNotificationQueue.push({
        name: name,
        reward: reward
    });

    /* Start showing queue */

    processAchievementNotificationQueue();
}


/* =========================================================
   PROCESS ACHIEVEMENT QUEUE
========================================================= */

function processAchievementNotificationQueue() {

    /* Already showing one */

    if (achievementNotificationShowing) {
        return;
    }

    /* Nothing left in queue */

    if (achievementNotificationQueue.length === 0) {
        return;
    }

    const notification =
        document.getElementById("achievementNotification");

    const nameElement =
        document.getElementById("achievementNotificationName");

    const rewardElement =
        document.getElementById("achievementNotificationReward");

    if (!notification || !nameElement || !rewardElement) {
        achievementNotificationQueue = [];
        return;
    }

    /* Get next achievement */

    const achievement =
        achievementNotificationQueue.shift();

    achievementNotificationShowing = true;

    nameElement.textContent =
        achievement.name;

    rewardElement.textContent =
        achievement.reward;


    /* Reset animation */

    notification.classList.remove("show");

    void notification.offsetWidth;

    notification.classList.add("show");


    /* Clear previous timer */

    clearTimeout(
        achievementNotificationTimer
    );


    /* Show for 4 seconds */

    achievementNotificationTimer =
        setTimeout(() => {

            notification.classList.remove("show");

            /* Wait for hide animation */

            setTimeout(() => {

                achievementNotificationShowing = false;

                /* Show next achievement */

                processAchievementNotificationQueue();

            }, 300);

        }, 4000);
}

/* =========================
   CHECK FARMER ACHIEVEMENTS
========================= */

function checkFarmerAchievements() {

    // =========================
    // 50 FARMERS
    // =========================

    if (
        farmers >= 50 &&
        !farmers50AchievementUnlocked
    ) {

        farmers50AchievementUnlocked = true;

        localStorage.setItem(
            "farmers50AchievementUnlocked",
            "true"
        );

        perSecond += 25;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "50 FARMERS",
            "+25 CPS"
        );
    }


    // =========================
    // 125 FARMERS
    // =========================

    if (
        farmers >= 125 &&
        !farmers125AchievementUnlocked
    ) {

        farmers125AchievementUnlocked = true;

        localStorage.setItem(
            "farmers125AchievementUnlocked",
            "true"
        );

        perSecond += 55;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "125 FARMERS",
            "+55 CPS"
        );
    }


    // =========================
    // 180 FARMERS
    // =========================

    if (
        farmers >= 180 &&
        !farmers180AchievementUnlocked
    ) {

        farmers180AchievementUnlocked = true;

        localStorage.setItem(
            "farmers180AchievementUnlocked",
            "true"
        );

        perSecond += 90;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "180 FARMERS",
            "+90 CPS"
        );
    }


    // =========================
    // 275 FARMERS
    // =========================

    if (
        farmers >= 275 &&
        !farmers275AchievementUnlocked
    ) {

        farmers275AchievementUnlocked = true;

        localStorage.setItem(
            "farmers275AchievementUnlocked",
            "true"
        );

        perSecond += 135;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "275 FARMERS",
            "+135 CPS"
        );
    }


    // =========================
    // 400 FARMERS
    // =========================

    if (
        farmers >= 400 &&
        !farmers400AchievementUnlocked
    ) {

        farmers400AchievementUnlocked = true;

        localStorage.setItem(
            "farmers400AchievementUnlocked",
            "true"
        );

        perSecond += 185;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "400 FARMERS",
            "+185 CPS"
        );
    }


    // =========================
    // 600 FARMERS
    // =========================

    if (
        farmers >= 600 &&
        !farmers600AchievementUnlocked
    ) {

        farmers600AchievementUnlocked = true;

        localStorage.setItem(
            "farmers600AchievementUnlocked",
            "true"
        );

        perSecond += 240;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "600 FARMERS",
            "+240 CPS"
        );
    }


    // =========================
    // 800 FARMERS
    // =========================

    if (
        farmers >= 800 &&
        !farmers800AchievementUnlocked
    ) {

        farmers800AchievementUnlocked = true;

        localStorage.setItem(
            "farmers800AchievementUnlocked",
            "true"
        );

        perSecond += 300;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "800 FARMERS",
            "+300 CPS"
        );
    }


    // =========================
    // 950 FARMERS
    // =========================

    if (
        farmers >= 950 &&
        !farmers950AchievementUnlocked
    ) {

        farmers950AchievementUnlocked = true;

        localStorage.setItem(
            "farmers950AchievementUnlocked",
            "true"
        );

        perSecond += 365;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "950 FARMERS",
            "+365 CPS"
        );
    }


    // =========================
    // 1,100 FARMERS
    // =========================

    if (
        farmers >= 1100 &&
        !farmers1100AchievementUnlocked
    ) {

        farmers1100AchievementUnlocked = true;

        localStorage.setItem(
            "farmers1100AchievementUnlocked",
            "true"
        );

        perSecond += 435;

        updateFarmerAchievements();
        updateDisplay();

        showAchievementUnlocked(
            "1,100 FARMERS",
            "+435 CPS"
        );
    }


    // =========================
    // CHECK CPS AFTER FARMER BONUS
    // =========================

    checkCPSAchievements();

    // =========================
    // SAVE GAME
    // =========================

    saveGame();
}

function updateEnergyUpgradePrice() {

    const priceElement =
        document.getElementById("energyUpgradePrice");

    if (!priceElement) {
        return;
    }

    priceElement.textContent =
        formatNumber(energyUpgradeCost)+ " 🪙";
}

// =========================
// UPDATE ENERGY PRICE
// =========================

updateEnergyUpgradePrice();

    /* =========================
   COIN BONUS
========================= */

let coinBonus =
    Number(localStorage.getItem("coinBonus")) || 0;

    let boostedCoinsBonus =
    Number(localStorage.getItem("boostedCoinsBonus")) || 0;

function getTotalBonus() {

      return (
        Number(coinBonus || 0) +
        Number(boostedCoinsBonus || 0) +
        Number(soupBonus || 0) +
        Number(nightBonus || 0)
    );
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
   ENERGY FLAT BONUS
========================= */

let energyFlatBonus = Number(
    localStorage.getItem("energyFlatBonus")
);

if (isNaN(energyFlatBonus)) {
    energyFlatBonus = 0;
}


/* =========================
   ENERGY PERCENT BONUS
========================= */

let energyBonusPercent =
    Number(localStorage.getItem("energyBonusPercent")) || 0;


/* =========================
   MAX ENERGY
========================= */

let maxEnergy = Math.floor(
    (100 + energyFlatBonus) *
    (1 + energyBonusPercent / 100)
);


/* =========================
   ENERGY
========================= */

let energy = Number(
    localStorage.getItem("energy")
);

if (isNaN(energy)) {
    energy = maxEnergy;
}

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

const fieldMoney =
    document.getElementById("fieldMoney");

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

    const energyRefillCounter =
    document.getElementById("energyRefillCounter");

document.getElementById("tokens").textContent =
    formatNumber(tokens);

    const achievementFarmers =
    document.getElementById("achievementFarmers");

const farmerAchievements =
    document.getElementById("farmerAchievements");

const backFromFarmers =
    document.getElementById("backFromFarmers");

/* =========================================
   DAILY ENERGY REFILLS
========================================= */

const MAX_DAILY_ENERGY_REFILLS = 3;

let energyRefillsUsed =
    Number(
        localStorage.getItem("energyRefillsUsed")
    ) || 0;


/* =========================================
   UPDATE REFILL UI
========================================= */

function updateEnergyRefillButton() {

    const remaining =
        Math.max(
            0,
            MAX_DAILY_ENERGY_REFILLS -
            energyRefillsUsed
        );


    /* COUNTER */

    if (energyRefillCounter) {

        energyRefillCounter.textContent =
         "Refills " + remaining + "/3";

    }


    /* BUTTON */

    if (!energyPlus) return;


    if (remaining <= 0) {

        energyPlus.disabled = true;

        energyPlus.classList.add("disabled");

    } else {

        energyPlus.disabled = false;

        energyPlus.classList.remove("disabled");

    }

}


/* =========================================
   REFILL ENERGY
========================================= */

if (energyPlus) {

    energyPlus.addEventListener(
        "click",
        function () {

            if (
                energyRefillsUsed >=
                MAX_DAILY_ENERGY_REFILLS
            ) {
                return;
            }


            /* FULL ENERGY */

            energy = maxEnergy;


            /* CONSUME REFILL */

            energyRefillsUsed++;


            /* SAVE */

            localStorage.setItem(
                "energyRefillsUsed",
                energyRefillsUsed
            );

            localStorage.setItem(
                "energy",
                energy
            );


            /* UPDATE GAME */

            updateDisplay();


            /* UPDATE 3/3 → 2/3 → 1/3 → 0/3 */

            updateEnergyRefillButton();

        }
    );

}


/* INITIAL UI */

updateEnergyRefillButton();

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
    localStorage.setItem("cpsBonus", cpsBonus);
    localStorage.setItem("tapBonus", tapBonus);
    localStorage.setItem("tokens", tokens);
    localStorage.setItem("money", money);
    localStorage.setItem("power", power);
    localStorage.setItem("farmers", farmers);
    localStorage.setItem("perSecond", perSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("farmerCost", farmerCost);
    localStorage.setItem("energy", energy);
    localStorage.setItem("gems", gems);
    localStorage.setItem(
    "luckyCoinMultiplier",
    luckyCoinMultiplier
);
    localStorage.setItem(
        "luckyCoinMultiplierCost",
        luckyCoinMultiplierCost
    );
    /* STATS */
    localStorage.setItem(
        "totalCoinsEarned",
        totalCoinsEarned
    );

    localStorage.setItem(
        "totalTimePlayed",
        totalTimePlayed
    );

    localStorage.setItem(
    "luckyCoinChance",
    luckyCoinChance
);
localStorage.setItem(
    "coinsPerSecondMultiplier",
    coinsPerSecondMultiplier
);
localStorage.setItem(
    "energyUpgradeCost",
    energyUpgradeCost
);
localStorage.setItem(
    "energyFlatBonus",
    energyFlatBonus
);

localStorage.setItem(
    "riceSeeds",
    riceSeeds
);

localStorage.setItem(
    "potatoSeeds",
    potatoSeeds
);

localStorage.setItem(
    "cornSeeds",
    cornSeeds
);

localStorage.setItem(
    "rice",
    rice
);

localStorage.setItem(
    "potato",
    potato
);

localStorage.setItem(
    "corn",
    corn
);

localStorage.setItem(
    "fieldCrops",
    JSON.stringify(fieldCrops)
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

const statsTapBonus =
    document.getElementById("statsTapBonus");

if (statsTapBonus) {
    statsTapBonus.textContent =
        `+${Math.floor(Number(tapBonus) || 0)}%`;
}

const gemsDisplay =
    document.getElementById("gems");

if (gemsDisplay) {

    gemsDisplay.textContent =
        gems;

}
  moneyDisplay.textContent =
    formatNumber(money);

    if (fieldMoney) {
    fieldMoney.textContent =
        moneyDisplay.textContent;
}

   const totalTapPower =
    power * (1 + Number(tapBonus || 0) / 100);

if (powerDisplay) {
    powerDisplay.textContent = formatNumber(Math.floor(totalTapPower));
}

    farmersDisplay.textContent =
        farmers;

const totalBonus =
    Number(coinBonus || 0) +
    Number(boostedCoinsBonus || 0)+
    Number(soupBonus || 0)+
    Number(nightBonus || 0)
const totalBonusElement =
    document.getElementById("statsBonus");

if (totalBonusElement) {
    totalBonusElement.textContent =
        `+${Math.floor(Number(totalBonus))}%`;
}

const bonusMultiplier =
    1 + (totalBonus / 100);

document.getElementById("statsTapBonus").textContent =
    `+${Math.floor(Number(tapBonus) || 0)}%`;

const actualPerSecond =
    perSecond *
    bonusMultiplier *
    (1 + cpsBonus / 100);

perSecondDisplay.textContent =
    formatNumber(actualPerSecond);

    energyStat.textContent =
        energy;

    energyText.textContent =
    energy + " / " + maxEnergy;

   energyFill.style.width =
    (energy / maxEnergy * 100) + "%";

    upgradeCostDisplay.textContent =
        upgradeCost;

    farmerCostDisplay.textContent =
        farmerCost;

     const totalGemsBonusElement =
    document.getElementById("totalGemsBonus");

if (totalGemsBonusElement) {

    totalGemsBonusElement.textContent =
        `+${totalGemsBonus}%`;

}

// =========================
// 🍀 LUCKY COIN MULTIPLIER
// =========================

const luckyMultiplierStat =
    document.getElementById("luckyCoinMultiplierStat");

if (luckyMultiplierStat) {
    luckyMultiplierStat.textContent =
        luckyCoinMultiplier.toFixed(2) + "x";
}

// =========================
// 🍀 LUCKY COIN CHANCE
// =========================

const luckyChanceStat =
    document.getElementById("luckyCoinChanceStat");

if (luckyChanceStat) {

    luckyChanceStat.textContent =
        luckyCoinChance + "%";

}

}

/* =========================
   CORN CLICK
========================= */

cornBtn.addEventListener("click", function () {

    if (energy <= 0) {
        return;
    }

    // CALCULATE WHOLE-NUMBER TAP POWER
    const totalTapPower = Math.floor(
        power * (1 + Number(tapBonus || 0) / 100)
    );

    // ADD WHOLE NUMBER ONLY
    money += totalTapPower;

    totalCoinsEarned += totalTapPower;

    checkMilestoneReward();
    updateMilestoneProgress();

    checkCoinAchievements();

    countCoinQuest(totalTapPower);

    energy -= 1;

    // TOTAL CLICKS
    totalClicks++;

    localStorage.setItem(
        "totalClicks",
        totalClicks
    );

    // CHECK CLICK ACHIEVEMENTS
    checkClickAchievements();

    updateDisplay();

    saveGame();

    showFloatingCoin();

});


/* =========================
   FLOATING COIN
========================= */

function showFloatingCoin() {

    const text =
        document.createElement("span");

    const amount =
        Math.floor(
            power * (1 + Number(tapBonus || 0) / 100)
        );

    text.textContent =
        `+${formatNumber(amount)}`;

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
           CHECK CPS ACHIEVEMENTS
        ========================= */

        checkCPSAchievements();

     /* =========================
           CHECK FARMER ACHIEVEMENTS
        ========================= */

        checkFarmerAchievements();

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

    giveGems(1);


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
// 🍀 LUCKY COIN COST
// =========================

let luckyCoinCost =
    Number(localStorage.getItem("luckyCoinCost"));

if (!Number.isFinite(luckyCoinCost) || luckyCoinCost <= 0) {
    luckyCoinCost = 5000;
}

// =========================
// COINS SHOP
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
// FARMER INCOME
// =========================

const farmerIncome = [
    2,
    3,
    4,
    5,
    6
];


// =========================
// TAP POWER PRICES
// =========================

let tapPowerCosts =
    JSON.parse(
        localStorage.getItem("tapPowerCosts")
    );

if (
    !Array.isArray(tapPowerCosts) ||
    tapPowerCosts.length !== 5
) {

    tapPowerCosts = [
        100,
        250,
        500,
        1000,
        2500
    ];

    localStorage.setItem(
        "tapPowerCosts",
        JSON.stringify(tapPowerCosts)
    );
}


// =========================
// SHOW FARMER PRICES
// =========================

farmerShopItems.forEach(
    (button, index) => {

        // ONLY FARMERS
        if (!button.dataset.farmer) {
            return;
        }

        const farmerIndex =
            Number(button.dataset.farmer) - 1;

        const priceElement =
            button.querySelector("small");

        if (priceElement) {

          priceElement.textContent =
    formatNumber(shopFarmerCosts[farmerIndex])
    + " 🪙";
        }
    }
);


// =========================
// SHOW TAP POWER PRICES
// =========================

farmerShopItems.forEach(
    (button) => {

        // ONLY TAP POWER
        if (!button.dataset.power) {
            return;
        }

        const powerIndex =
            Number(button.dataset.power) - 2;

        const priceElement =
            button.querySelector("small");

        if (priceElement) {

          priceElement.textContent =
    formatNumber(tapPowerCosts[powerIndex])
    + " 🪙";
        }
    }
);


// =========================
// SHOP PURCHASES
// =========================

farmerShopItems.forEach(
    (button) => {

        button.addEventListener(
            "click",
            function () {

 // =========================
// 🍀 LUCKY COIN MULTIPLIER
// =========================

if (button.dataset.lucky) {

    const cost = luckyCoinMultiplierCost;

    if (money < cost) {
        return;
    }

    // PAY
    money -= cost;

    // INCREASE MULTIPLIER
    luckyCoinMultiplier =
        Number((luckyCoinMultiplier + 0.01).toFixed(2));

    // INCREASE PRICE
    luckyCoinMultiplierCost =
        Math.floor(cost * 1.5);

    console.log(
        "🍀 Multiplier:",
        luckyCoinMultiplier
    );

    console.log(
        "🍀 Next cost:",
        luckyCoinMultiplierCost
    );

    // UPDATE BUTTON
    const priceElement =
        button.querySelector("small");

    if (priceElement) {
        priceElement.textContent =
            luckyCoinMultiplierCost.toLocaleString() + " 🪙";
    }

    updateDisplay();
    saveGame();

// COMPLETE DAILY QUEST
completeLuckyCoinsQuest();

    return;
}

// =========================
// ENERGY UPGRADE
// =========================

if (button.dataset.energy) {

    const amount =
        Number(button.dataset.energy);

    const cost =
        energyUpgradeCost;


    // NOT ENOUGH COINS
    if (money < cost) {
        return;
    }


    // PAY
    money -= cost;


    // INCREASE ENERGY BONUS
    energyFlatBonus += amount;


    // INCREASE PRICE
    energyUpgradeCost =
        Math.floor(cost * 1.5);


    // CALCULATE MAX ENERGY
    maxEnergy = Math.floor(
        (100 + energyFlatBonus) *
        (1 + energyBonusPercent / 100)
    );


    // SAVE EVERYTHING
    saveGame();


    // UPDATE PRICE
    updateEnergyUpgradePrice();


    // UPDATE DISPLAY
    updateDisplay();

    // COMPLETE DAILY QUEST 
    completeEnergyUpgradeQuest();

    return;
}
                // =========================
                // TAP POWER UPGRADE
                // =========================

                if (button.dataset.power) {

                    const amount =
                        Number(button.dataset.power);

                    const powerIndex =
                        amount - 2;

                    const cost =
                        tapPowerCosts[powerIndex];


                    // NOT ENOUGH MONEY

                    if (money < cost) {
                        return;
                    }


                    // PAY

                   money -= cost;

power += amount;

// DAILY QUEST - TAP POWER I

if (amount === 2) {
    completeTapPower1Quest();
}

if (amount === 3) {
    completeTapPower2Quest();
}

if (amount === 4) {
    completeTapPower3Quest();
}

if (amount === 5) {
    completeTapPower4Quest();
}

if (amount === 6) {
    completeTapPower5Quest();
}

// INCREASE TAP POWER PRICE

tapPowerCosts[powerIndex] =
    Math.floor(cost * 1.5);


// SAVE TAP POWER PRICES

localStorage.setItem(
    "tapPowerCosts",
    JSON.stringify(tapPowerCosts)
);


updateDisplay();

saveGame();


// UPDATE PRICE ON BUTTON

const priceElement =
    button.querySelector("small");

if (priceElement) {

    priceElement.textContent =
        tapPowerCosts[powerIndex]
            .toLocaleString()
        + " 🪙";
}

return;
}

                // =========================
                // FARMER PURCHASE
                // =========================

                if (button.dataset.farmer) {

                    const index =
                        Number(button.dataset.farmer) - 1;

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
                    // DAILY QUESTS
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
// CHECK CPS ACHIEVEMENTS
// =========================

checkCPSAchievements();

                    // =========================
                    // INCREASE FARMER PRICE
                    // =========================

                    shopFarmerCosts[index] =
                        Math.floor(
                            cost * 1.5
                        );


                    // =========================
                    // SAVE FARMER PRICES
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
                    // UPDATE FARMER PRICE
                    // =========================

                    const priceElement =
                        button.querySelector("small");

                    if (priceElement) {

                      priceElement.textContent =
    formatNumber(shopFarmerCosts[index])
    + " 🪙";
                    }

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

    giveGems(1);


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

    giveGems(1);


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

    giveGems(1);


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

    giveGems(1);


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
   DAILY QUEST - BUY TAP POWER I
========================= */

const buyTapPower1Quest =
    document.getElementById("buyTapPower1Quest");

const tapPower1QuestProgress =
    document.getElementById("tapPower1QuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPower1QuestCompleted =
    localStorage.getItem(
        "tapPower1QuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPower1Quest() {

    if (
        !buyTapPower1Quest ||
        !tapPower1QuestProgress
    ) {
        return;
    }


    if (tapPower1QuestCompleted) {

        tapPower1QuestProgress.textContent =
            "1 / 1";

        buyTapPower1Quest.textContent =
            "✓ COMPLETED";

        buyTapPower1Quest.disabled =
            true;

        buyTapPower1Quest.classList.add(
            "completed"
        );

        return;
    }


    tapPower1QuestProgress.textContent =
        "0 / 1";

    buyTapPower1Quest.textContent =
        "0 / 1";

    buyTapPower1Quest.disabled =
        true;

    buyTapPower1Quest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeTapPower1Quest() {

    if (tapPower1QuestCompleted) {
        return;
    }


    tapPower1QuestCompleted = true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tapPower1QuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTapPower1Quest();
}


/* =========================
   INITIAL STATE
========================= */

updateTapPower1Quest();

/* =========================
   DAILY QUEST - BUY TAP POWER II
========================= */

const buyTapPower2Quest =
    document.getElementById("buyTapPower2Quest");

const tapPower2QuestProgress =
    document.getElementById("tapPower2QuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPower2QuestCompleted =
    localStorage.getItem(
        "tapPower2QuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPower2Quest() {

    if (
        !buyTapPower2Quest ||
        !tapPower2QuestProgress
    ) {
        return;
    }


    if (tapPower2QuestCompleted) {

        tapPower2QuestProgress.textContent =
            "1 / 1";

        buyTapPower2Quest.textContent =
            "✓ COMPLETED";

        buyTapPower2Quest.disabled =
            true;

        buyTapPower2Quest.classList.add(
            "completed"
        );

        return;
    }


    tapPower2QuestProgress.textContent =
        "0 / 1";

    buyTapPower2Quest.textContent =
        "0 / 1";

    buyTapPower2Quest.disabled =
        true;

    buyTapPower2Quest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeTapPower2Quest() {

    if (tapPower2QuestCompleted) {
        return;
    }


    tapPower2QuestCompleted = true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tapPower2QuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTapPower2Quest();
}


/* =========================
   INITIAL STATE
========================= */

updateTapPower2Quest();

/* =========================
   DAILY QUEST - BUY TAP POWER III
========================= */

const buyTapPower3Quest =
    document.getElementById("buyTapPower3Quest");

const tapPower3QuestProgress =
    document.getElementById("tapPower3QuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPower3QuestCompleted =
    localStorage.getItem(
        "tapPower3QuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPower3Quest() {

    if (
        !buyTapPower3Quest ||
        !tapPower3QuestProgress
    ) {
        return;
    }


    if (tapPower3QuestCompleted) {

        tapPower3QuestProgress.textContent =
            "1 / 1";

        buyTapPower3Quest.textContent =
            "✓ COMPLETED";

        buyTapPower3Quest.disabled =
            true;

        buyTapPower3Quest.classList.add(
            "completed"
        );

        return;
    }


    tapPower3QuestProgress.textContent =
        "0 / 1";

    buyTapPower3Quest.textContent =
        "0 / 1";

    buyTapPower3Quest.disabled =
        true;

    buyTapPower3Quest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeTapPower3Quest() {

    if (tapPower3QuestCompleted) {
        return;
    }


    tapPower3QuestCompleted = true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tapPower3QuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTapPower3Quest();
}


/* =========================
   INITIAL STATE
========================= */

updateTapPower3Quest();

/* =========================
   DAILY QUEST - BUY TAP POWER IV
========================= */

const buyTapPower4Quest =
    document.getElementById("buyTapPower4Quest");

const tapPower4QuestProgress =
    document.getElementById("tapPower4QuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPower4QuestCompleted =
    localStorage.getItem(
        "tapPower4QuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPower4Quest() {

    if (
        !buyTapPower4Quest ||
        !tapPower4QuestProgress
    ) {
        return;
    }


    if (tapPower4QuestCompleted) {

        tapPower4QuestProgress.textContent =
            "1 / 1";

        buyTapPower4Quest.textContent =
            "✓ COMPLETED";

        buyTapPower4Quest.disabled =
            true;

        buyTapPower4Quest.classList.add(
            "completed"
        );

        return;
    }


    tapPower4QuestProgress.textContent =
        "0 / 1";

    buyTapPower4Quest.textContent =
        "0 / 1";

    buyTapPower4Quest.disabled =
        true;

    buyTapPower4Quest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeTapPower4Quest() {

    if (tapPower4QuestCompleted) {
        return;
    }


    tapPower4QuestCompleted = true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tapPower4QuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTapPower4Quest();
}


/* =========================
   INITIAL STATE
========================= */

updateTapPower4Quest();

/* =========================
   DAILY QUEST - BUY TAP POWER V
========================= */

const buyTapPower5Quest =
    document.getElementById("buyTapPower5Quest");

const tapPower5QuestProgress =
    document.getElementById("tapPower5QuestProgress");


/* =========================
   LOAD QUEST
========================= */

let tapPower5QuestCompleted =
    localStorage.getItem(
        "tapPower5QuestCompleted"
    ) === "true";


/* =========================
   UPDATE QUEST
========================= */

function updateTapPower5Quest() {

    if (
        !buyTapPower5Quest ||
        !tapPower5QuestProgress
    ) {
        return;
    }


    if (tapPower5QuestCompleted) {

        tapPower5QuestProgress.textContent =
            "1 / 1";

        buyTapPower5Quest.textContent =
            "✓ COMPLETED";

        buyTapPower5Quest.disabled =
            true;

        buyTapPower5Quest.classList.add(
            "completed"
        );

        return;
    }


    tapPower5QuestProgress.textContent =
        "0 / 1";

    buyTapPower5Quest.textContent =
        "0 / 1";

    buyTapPower5Quest.disabled =
        true;

    buyTapPower5Quest.classList.remove(
        "completed"
    );
}


/* =========================
   COMPLETE QUEST
========================= */

function completeTapPower5Quest() {

    if (tapPower5QuestCompleted) {
        return;
    }


    tapPower5QuestCompleted = true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tapPower5QuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTapPower5Quest();
}


/* =========================
   INITIAL STATE
========================= */

updateTapPower5Quest();

function showLuckyAnnouncement() {

    const announcement =
        document.getElementById("luckyAnnouncement");

    if (!announcement) return;

    const luckyMultiplier =
        1.1 * luckyCoinMultiplier;

    announcement.textContent =
        "🍀 LUCKY! ×" +
        luckyMultiplier.toFixed(2) +
        " COINS!";

    announcement.classList.remove("show");

    void announcement.offsetWidth;

    announcement.classList.add("show");

    setTimeout(function () {
        announcement.classList.remove("show");
    }, 1200);
}

/* =========================
   PASSIVE INCOME
========================= */

setInterval(
    function () {

        if (perSecond > 0) {

            const totalBonus =
                Number(getTotalBonus()) || 0;

            const cpsMultiplier =
                1 + (cpsBonus / 100);

            const bonusMultiplier =
                1 + (totalBonus / 100);

            const passiveCoins =
                perSecond *
                bonusMultiplier *
                cpsMultiplier *
                coinsPerSecondMultiplier;

            let finalPassiveCoins =
                passiveCoins;


  if (Math.random() < 0.01) {

    finalPassiveCoins *=
        1.1 * luckyCoinMultiplier;

    console.log(
        "🍀 LUCKY! ×" +
        (1.1 * luckyCoinMultiplier).toFixed(2) +
        " COINS"
    );

    showLuckyAnnouncement();
}


            // =========================
            // GIVE COINS
            // =========================

            money += finalPassiveCoins;

            totalCoinsEarned += finalPassiveCoins;

            checkMilestoneReward();
            updateMilestoneProgress();

            checkCoinAchievements();

            countCoinQuest(finalPassiveCoins);

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

/* =========================================
   DAILY QUEST STATE
========================================= */

let clickQuestCount =
    Number(
        localStorage.getItem("clickQuestCount")
    ) || 0;

let clickQuestCompleted =
    localStorage.getItem("clickQuestCompleted") === "true";

let coinQuestCount =
    Number(
        localStorage.getItem("coinQuestCount")
    ) || 0;

let coinQuestCompleted =
    localStorage.getItem("coinQuestCompleted") === "true";

let tapPowerQuestCompleted =
    localStorage.getItem("tapPowerQuestCompleted") === "true";

let onlineQuestMinutes =
    Number(
        localStorage.getItem("onlineQuestMinutes")
    ) || 0;

let onlineQuestCompleted =
    localStorage.getItem("onlineQuestCompleted") === "true";

    /* =========================================
   DAILY QUEST DOM ELEMENTS
========================================= */

const click500Quest =
    document.getElementById("click500Quest");

const clickQuestProgress =
    document.getElementById("clickQuestProgress");


const coin10000Quest =
    document.getElementById("coin10000Quest");

const coinQuestProgress =
    document.getElementById("coinQuestProgress");


const online60Quest =
    document.getElementById("online60Quest");

const onlineQuestProgress =
    document.getElementById("onlineQuestProgress");

/* =========================================================
   STATS POPUP
========================================================= */

const statsButton = document.getElementById("statsButton");
const statsOverlay = document.getElementById("statsOverlay");
const closeStats =
    document.getElementById("closeStats");


console.log("STATS BUTTON =", statsButton);
console.log("STATS OVERLAY =", statsOverlay);
console.log("CLOSE STATS =", closeStats);

if (statsButton && statsOverlay) {

    statsButton.addEventListener("click", function () {

        updateStats();

        statsOverlay.classList.add("active");

    });

}


if (closeStats && statsOverlay) {

    closeStats.addEventListener("click", function (event) {

        event.stopPropagation();

        statsOverlay.classList.remove("active");

    });

}

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


    updateStats();

}, 1000);

/* =========================================================
   DAILY QUEST - BUY 1 ENERGY UPGRADE
========================================================= */

const buyEnergyUpgradeQuest =
    document.getElementById(
        "buyEnergyUpgradeQuest"
    );

const energyUpgradeQuestProgress =
    document.getElementById(
        "energyUpgradeQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let energyUpgradeQuestCompleted =
    localStorage.getItem(
        "energyUpgradeQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateEnergyUpgradeQuest() {

    if (
        !buyEnergyUpgradeQuest ||
        !energyUpgradeQuestProgress
    ) {
        return;
    }


    if (energyUpgradeQuestCompleted) {

        energyUpgradeQuestProgress.textContent =
            "1 / 1";

        buyEnergyUpgradeQuest.textContent =
            "✓ COMPLETED";

        buyEnergyUpgradeQuest.disabled =
            true;

        buyEnergyUpgradeQuest.classList.add(
            "completed"
        );

        return;
    }


    energyUpgradeQuestProgress.textContent =
        "0 / 1";

    buyEnergyUpgradeQuest.textContent =
        "0 / 1";

    buyEnergyUpgradeQuest.disabled =
        true;

    buyEnergyUpgradeQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeEnergyUpgradeQuest() {

    if (energyUpgradeQuestCompleted) {
        return;
    }


    energyUpgradeQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "energyUpgradeQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateEnergyUpgradeQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateEnergyUpgradeQuest();



/* =========================================================
   DAILY QUEST - BUY 1 LUCKY COINS
========================================================= */

const buyLuckyCoinsQuest =
    document.getElementById(
        "buyLuckyCoinsQuest"
    );

const luckyCoinsQuestProgress =
    document.getElementById(
        "luckyCoinsQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let luckyCoinsQuestCompleted =
    localStorage.getItem(
        "luckyCoinsQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateLuckyCoinsQuest() {

    if (
        !buyLuckyCoinsQuest ||
        !luckyCoinsQuestProgress
    ) {
        return;
    }


    if (luckyCoinsQuestCompleted) {

        luckyCoinsQuestProgress.textContent =
            "1 / 1";

        buyLuckyCoinsQuest.textContent =
            "✓ COMPLETED";

        buyLuckyCoinsQuest.disabled =
            true;

        buyLuckyCoinsQuest.classList.add(
            "completed"
        );

        return;
    }


    luckyCoinsQuestProgress.textContent =
        "0 / 1";

    buyLuckyCoinsQuest.textContent =
        "0 / 1";

    buyLuckyCoinsQuest.disabled =
        true;

    buyLuckyCoinsQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeLuckyCoinsQuest() {

    if (luckyCoinsQuestCompleted) {
        return;
    }


    luckyCoinsQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "luckyCoinsQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateLuckyCoinsQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateLuckyCoinsQuest();

/* =========================================================
   DAILY QUEST - BUY 1 TAP POWER FROM TOKENS SHOP
========================================================= */

const tokenTapPowerQuest =
    document.getElementById(
        "tokenTapPowerQuest"
    );

const tokenTapPowerQuestProgress =
    document.getElementById(
        "tokenTapPowerQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let tokenTapPowerQuestCompleted =
    localStorage.getItem(
        "tokenTapPowerQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateTokenTapPowerQuest() {

    if (
        !tokenTapPowerQuest ||
        !tokenTapPowerQuestProgress
    ) {
        return;
    }


    if (tokenTapPowerQuestCompleted) {

        tokenTapPowerQuestProgress.textContent =
            "1 / 1";

        tokenTapPowerQuest.textContent =
            "✓ COMPLETED";

        tokenTapPowerQuest.disabled =
            true;

        tokenTapPowerQuest.classList.add(
            "completed"
        );

        return;
    }


    tokenTapPowerQuestProgress.textContent =
        "0 / 1";

    tokenTapPowerQuest.textContent =
        "0 / 1";

    tokenTapPowerQuest.disabled =
        true;

    tokenTapPowerQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeTokenTapPowerQuest() {

    if (tokenTapPowerQuestCompleted) {
        return;
    }


    tokenTapPowerQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tokenTapPowerQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTokenTapPowerQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateTokenTapPowerQuest();



/* =========================================================
   DAILY QUEST - BUY 1 COINS PER SECOND
   FROM TOKENS SHOP
========================================================= */

const tokenCPSQuest =
    document.getElementById(
        "tokenCPSQuest"
    );

const tokenCPSQuestProgress =
    document.getElementById(
        "tokenCPSQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let tokenCPSQuestCompleted =
    localStorage.getItem(
        "tokenCPSQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateTokenCPSQuest() {

    if (
        !tokenCPSQuest ||
        !tokenCPSQuestProgress
    ) {
        return;
    }


    if (tokenCPSQuestCompleted) {

        tokenCPSQuestProgress.textContent =
            "1 / 1";

        tokenCPSQuest.textContent =
            "✓ COMPLETED";

        tokenCPSQuest.disabled =
            true;

        tokenCPSQuest.classList.add(
            "completed"
        );

        return;
    }


    tokenCPSQuestProgress.textContent =
        "0 / 1";

    tokenCPSQuest.textContent =
        "0 / 1";

    tokenCPSQuest.disabled =
        true;

    tokenCPSQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeTokenCPSQuest() {

    if (tokenCPSQuestCompleted) {
        return;
    }


    tokenCPSQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "tokenCPSQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateTokenCPSQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateTokenCPSQuest();


/* =========================================================
   DAILY QUEST - COLLECT 5 FALLING TOKENS
========================================================= */

const fallingTokenQuest =
    document.getElementById(
        "fallingTokenQuest"
    );

const fallingTokenQuestProgress =
    document.getElementById(
        "fallingTokenQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let fallingTokenQuestCount =
    Number(
        localStorage.getItem(
            "fallingTokenQuestCount"
        )
    ) || 0;

let fallingTokenQuestCompleted =
    localStorage.getItem(
        "fallingTokenQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateFallingTokenQuest() {

    if (
        !fallingTokenQuest ||
        !fallingTokenQuestProgress
    ) {
        return;
    }


    if (fallingTokenQuestCompleted) {

        fallingTokenQuestProgress.textContent =
            "5 / 5";

        fallingTokenQuest.textContent =
            "✓ COMPLETED";

        fallingTokenQuest.disabled =
            true;

        fallingTokenQuest.classList.add(
            "completed"
        );

        return;
    }


    fallingTokenQuestProgress.textContent =
        fallingTokenQuestCount + " / 5";

    fallingTokenQuest.textContent =
        fallingTokenQuestCount + " / 5";

    fallingTokenQuest.disabled =
        true;

    fallingTokenQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COLLECT FALLING TOKEN
========================================================= */

function collectFallingTokenForQuest() {

    if (fallingTokenQuestCompleted) {
        return;
    }


    fallingTokenQuestCount++;


    /* MAX 5 */

    if (fallingTokenQuestCount >= 5) {

        fallingTokenQuestCount = 5;

        fallingTokenQuestCompleted =
            true;


        /* GIVE 1 GEM */

        giveGems(1);


        localStorage.setItem(
            "fallingTokenQuestCompleted",
            "true"
        );

        localStorage.setItem(
            "gems",
            gems
        );
    }


    /* SAVE PROGRESS */

    localStorage.setItem(
        "fallingTokenQuestCount",
        fallingTokenQuestCount
    );


    updateDisplay();

    updateFallingTokenQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateFallingTokenQuest();

/* =========================================================
   DAILY QUEST - HARVEST 50 RICE
========================================================= */

const riceHarvestQuest =
    document.getElementById(
        "riceHarvestQuest"
    );

const riceHarvestQuestProgress =
    document.getElementById(
        "riceHarvestQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let riceHarvestQuestCount =
    Number(
        localStorage.getItem(
            "riceHarvestQuestCount"
        )
    ) || 0;

let riceHarvestQuestCompleted =
    localStorage.getItem(
        "riceHarvestQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateRiceHarvestQuest() {

    if (
        !riceHarvestQuest ||
        !riceHarvestQuestProgress
    ) {
        return;
    }


    if (riceHarvestQuestCompleted) {

        riceHarvestQuestProgress.textContent =
            "50 / 50";

        riceHarvestQuest.textContent =
            "✓ COMPLETED";

        riceHarvestQuest.disabled =
            true;

        riceHarvestQuest.classList.add(
            "completed"
        );

        return;
    }


    riceHarvestQuestProgress.textContent =
        riceHarvestQuestCount + " / 50";

    riceHarvestQuest.textContent =
        riceHarvestQuestCount + " / 50";

    riceHarvestQuest.disabled =
        true;

    riceHarvestQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   HARVEST RICE
========================================================= */

function collectRiceForQuest(amount = 1) {

    if (riceHarvestQuestCompleted) {
        return;
    }


    riceHarvestQuestCount +=
        amount;


    /* MAX 50 */

    if (riceHarvestQuestCount >= 50) {

        riceHarvestQuestCount = 50;

        riceHarvestQuestCompleted =
            true;


        /* GIVE 1 GEM */

        giveGems(1);


        localStorage.setItem(
            "riceHarvestQuestCompleted",
            "true"
        );

        localStorage.setItem(
            "gems",
            gems
        );
    }


    /* SAVE PROGRESS */

    localStorage.setItem(
        "riceHarvestQuestCount",
        riceHarvestQuestCount
    );


    updateDisplay();

    updateRiceHarvestQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateRiceHarvestQuest();

/* =========================================================
   DAILY QUEST - HARVEST 50 POTATO
========================================================= */

const potatoHarvestQuest =
    document.getElementById(
        "potatoHarvestQuest"
    );

const potatoHarvestQuestProgress =
    document.getElementById(
        "potatoHarvestQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let potatoHarvestQuestCount =
    Number(
        localStorage.getItem(
            "potatoHarvestQuestCount"
        )
    ) || 0;

let potatoHarvestQuestCompleted =
    localStorage.getItem(
        "potatoHarvestQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updatePotatoHarvestQuest() {

    if (
        !potatoHarvestQuest ||
        !potatoHarvestQuestProgress
    ) {
        return;
    }


    if (potatoHarvestQuestCompleted) {

        potatoHarvestQuestProgress.textContent =
            "50 / 50";

        potatoHarvestQuest.textContent =
            "✓ COMPLETED";

        potatoHarvestQuest.disabled =
            true;

        potatoHarvestQuest.classList.add(
            "completed"
        );

        return;
    }


    potatoHarvestQuestProgress.textContent =
        potatoHarvestQuestCount + " / 50";

    potatoHarvestQuest.textContent =
        potatoHarvestQuestCount + " / 50";

    potatoHarvestQuest.disabled =
        true;

    potatoHarvestQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   HARVEST POTATO
========================================================= */

function collectPotatoForQuest(amount = 1) {

    if (potatoHarvestQuestCompleted) {
        return;
    }


    potatoHarvestQuestCount +=
        amount;


    /* MAX 50 */

    if (potatoHarvestQuestCount >= 50) {

        potatoHarvestQuestCount = 50;

        potatoHarvestQuestCompleted =
            true;


        /* GIVE 1 GEM */

        giveGems(1);


        localStorage.setItem(
            "potatoHarvestQuestCompleted",
            "true"
        );

        localStorage.setItem(
            "gems",
            gems
        );
    }


    /* SAVE PROGRESS */

    localStorage.setItem(
        "potatoHarvestQuestCount",
        potatoHarvestQuestCount
    );


    updateDisplay();

    updatePotatoHarvestQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updatePotatoHarvestQuest();

/* =========================================================
   DAILY QUEST - HARVEST 50 CORN
========================================================= */

const cornHarvestQuest =
    document.getElementById(
        "cornHarvestQuest"
    );

const cornHarvestQuestProgress =
    document.getElementById(
        "cornHarvestQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let cornHarvestQuestCount =
    Number(
        localStorage.getItem(
            "cornHarvestQuestCount"
        )
    ) || 0;

let cornHarvestQuestCompleted =
    localStorage.getItem(
        "cornHarvestQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateCornHarvestQuest() {

    if (
        !cornHarvestQuest ||
        !cornHarvestQuestProgress
    ) {
        return;
    }


    if (cornHarvestQuestCompleted) {

        cornHarvestQuestProgress.textContent =
            "50 / 50";

        cornHarvestQuest.textContent =
            "✓ COMPLETED";

        cornHarvestQuest.disabled =
            true;

        cornHarvestQuest.classList.add(
            "completed"
        );

        return;
    }


    cornHarvestQuestProgress.textContent =
        cornHarvestQuestCount + " / 50";

    cornHarvestQuest.textContent =
        cornHarvestQuestCount + " / 50";

    cornHarvestQuest.disabled =
        true;

    cornHarvestQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   HARVEST CORN
========================================================= */

function collectCornForQuest(amount = 1) {

    if (cornHarvestQuestCompleted) {
        return;
    }


    cornHarvestQuestCount +=
        amount;


    /* MAX 50 */

    if (cornHarvestQuestCount >= 50) {

        cornHarvestQuestCount = 50;

        cornHarvestQuestCompleted =
            true;


        /* GIVE 1 GEM */

        giveGems(1);


        localStorage.setItem(
            "cornHarvestQuestCompleted",
            "true"
        );

        localStorage.setItem(
            "gems",
            gems
        );
    }


    /* SAVE PROGRESS */

    localStorage.setItem(
        "cornHarvestQuestCount",
        cornHarvestQuestCount
    );


    updateDisplay();

    updateCornHarvestQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateCornHarvestQuest();

/* =========================================================
   DAILY QUEST - BUY 1 MOON POWER
========================================================= */

const moonPowerQuest =
    document.getElementById(
        "moonPowerQuest"
    );

const moonPowerQuestProgress =
    document.getElementById(
        "moonPowerQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let moonPowerQuestCompleted =
    localStorage.getItem(
        "moonPowerQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateMoonPowerQuest() {

    if (
        !moonPowerQuest ||
        !moonPowerQuestProgress
    ) {
        return;
    }


    if (moonPowerQuestCompleted) {

        moonPowerQuestProgress.textContent =
            "1 / 1";

        moonPowerQuest.textContent =
            "✓ COMPLETED";

        moonPowerQuest.disabled =
            true;

        moonPowerQuest.classList.add(
            "completed"
        );

        return;
    }


    moonPowerQuestProgress.textContent =
        "0 / 1";

    moonPowerQuest.textContent =
        "0 / 1";

    moonPowerQuest.disabled =
        true;

    moonPowerQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeMoonPowerQuest() {

    if (moonPowerQuestCompleted) {
        return;
    }


    moonPowerQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "moonPowerQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateMoonPowerQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateMoonPowerQuest();

/* =========================================================
   DAILY QUEST - BUY 1 NIGHT INCOME
========================================================= */

const nightIncomeQuest =
    document.getElementById(
        "nightIncomeQuest"
    );

const nightIncomeQuestProgress =
    document.getElementById(
        "nightIncomeQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let nightIncomeQuestCompleted =
    localStorage.getItem(
        "nightIncomeQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateNightIncomeQuest() {

    if (
        !nightIncomeQuest ||
        !nightIncomeQuestProgress
    ) {
        return;
    }


    if (nightIncomeQuestCompleted) {

        nightIncomeQuestProgress.textContent =
            "1 / 1";

        nightIncomeQuest.textContent =
            "✓ COMPLETED";

        nightIncomeQuest.disabled =
            true;

        nightIncomeQuest.classList.add(
            "completed"
        );

        return;
    }


    nightIncomeQuestProgress.textContent =
        "0 / 1";

    nightIncomeQuest.textContent =
        "0 / 1";

    nightIncomeQuest.disabled =
        true;

    nightIncomeQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeNightIncomeQuest() {

    if (nightIncomeQuestCompleted) {
        return;
    }


    nightIncomeQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "nightIncomeQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateNightIncomeQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateNightIncomeQuest();

/* =========================================================
   DAILY QUEST - BUY RICE GROW TIME
========================================================= */

const riceGrowQuest =
    document.getElementById(
        "riceGrowQuest"
    );

const riceGrowQuestProgress =
    document.getElementById(
        "riceGrowQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let riceGrowQuestCompleted =
    localStorage.getItem(
        "riceGrowQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateRiceGrowQuest() {

    if (
        !riceGrowQuest ||
        !riceGrowQuestProgress
    ) {
        return;
    }


    if (riceGrowQuestCompleted) {

        riceGrowQuestProgress.textContent =
            "1 / 1";

        riceGrowQuest.textContent =
            "✓ COMPLETED";

        riceGrowQuest.disabled =
            true;

        riceGrowQuest.classList.add(
            "completed"
        );

        return;
    }


    riceGrowQuestProgress.textContent =
        "0 / 1";

    riceGrowQuest.textContent =
        "0 / 1";

    riceGrowQuest.disabled =
        true;

    riceGrowQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeRiceGrowQuest() {

    if (riceGrowQuestCompleted) {
        return;
    }


    riceGrowQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "riceGrowQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateRiceGrowQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateRiceGrowQuest();

/* =========================================================
   DAILY QUEST - BUY POTATO GROW TIME
========================================================= */

const potatoGrowQuest =
    document.getElementById(
        "potatoGrowQuest"
    );

const potatoGrowQuestProgress =
    document.getElementById(
        "potatoGrowQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let potatoGrowQuestCompleted =
    localStorage.getItem(
        "potatoGrowQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updatePotatoGrowQuest() {

    if (
        !potatoGrowQuest ||
        !potatoGrowQuestProgress
    ) {
        return;
    }


    if (potatoGrowQuestCompleted) {

        potatoGrowQuestProgress.textContent =
            "1 / 1";

        potatoGrowQuest.textContent =
            "✓ COMPLETED";

        potatoGrowQuest.disabled =
            true;

        potatoGrowQuest.classList.add(
            "completed"
        );

        return;
    }


    potatoGrowQuestProgress.textContent =
        "0 / 1";

    potatoGrowQuest.textContent =
        "0 / 1";

    potatoGrowQuest.disabled =
        true;

    potatoGrowQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completePotatoGrowQuest() {

    if (potatoGrowQuestCompleted) {
        return;
    }


    potatoGrowQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "potatoGrowQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updatePotatoGrowQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updatePotatoGrowQuest();

/* =========================================================
   DAILY QUEST - BUY CORN GROW TIME
========================================================= */

const cornGrowQuest =
    document.getElementById(
        "cornGrowQuest"
    );

const cornGrowQuestProgress =
    document.getElementById(
        "cornGrowQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let cornGrowQuestCompleted =
    localStorage.getItem(
        "cornGrowQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateCornGrowQuest() {

    if (
        !cornGrowQuest ||
        !cornGrowQuestProgress
    ) {
        return;
    }


    if (cornGrowQuestCompleted) {

        cornGrowQuestProgress.textContent =
            "1 / 1";

        cornGrowQuest.textContent =
            "✓ COMPLETED";

        cornGrowQuest.disabled =
            true;

        cornGrowQuest.classList.add(
            "completed"
        );

        return;
    }


    cornGrowQuestProgress.textContent =
        "0 / 1";

    cornGrowQuest.textContent =
        "0 / 1";

    cornGrowQuest.disabled =
        true;

    cornGrowQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeCornGrowQuest() {

    if (cornGrowQuestCompleted) {
        return;
    }


    cornGrowQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "cornGrowQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateCornGrowQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateCornGrowQuest();

/* =========================================================
   DAILY QUEST - BUY RICE SOUP
========================================================= */

const riceSoupQuest =
    document.getElementById(
        "riceSoupQuest"
    );

const riceSoupQuestProgress =
    document.getElementById(
        "riceSoupQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let riceSoupQuestCompleted =
    localStorage.getItem(
        "riceSoupQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateRiceSoupQuest() {

    if (
        !riceSoupQuest ||
        !riceSoupQuestProgress
    ) {
        return;
    }


    if (riceSoupQuestCompleted) {

        riceSoupQuestProgress.textContent =
            "1 / 1";

        riceSoupQuest.textContent =
            "✓ COMPLETED";

        riceSoupQuest.disabled =
            true;

        riceSoupQuest.classList.add(
            "completed"
        );

        return;
    }


    riceSoupQuestProgress.textContent =
        "0 / 1";

    riceSoupQuest.textContent =
        "0 / 1";

    riceSoupQuest.disabled =
        true;

    riceSoupQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeRiceSoupQuest() {

    if (riceSoupQuestCompleted) {
        return;
    }


    riceSoupQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "riceSoupQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateRiceSoupQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateRiceSoupQuest();

/* =========================================================
   DAILY QUEST - BUY POTATO SOUP
========================================================= */

const potatoSoupQuest =
    document.getElementById(
        "potatoSoupQuest"
    );

const potatoSoupQuestProgress =
    document.getElementById(
        "potatoSoupQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let potatoSoupQuestCompleted =
    localStorage.getItem(
        "potatoSoupQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updatePotatoSoupQuest() {

    if (
        !potatoSoupQuest ||
        !potatoSoupQuestProgress
    ) {
        return;
    }


    if (potatoSoupQuestCompleted) {

        potatoSoupQuestProgress.textContent =
            "1 / 1";

        potatoSoupQuest.textContent =
            "✓ COMPLETED";

        potatoSoupQuest.disabled =
            true;

        potatoSoupQuest.classList.add(
            "completed"
        );

        return;
    }


    potatoSoupQuestProgress.textContent =
        "0 / 1";

    potatoSoupQuest.textContent =
        "0 / 1";

    potatoSoupQuest.disabled =
        true;

    potatoSoupQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completePotatoSoupQuest() {

    if (potatoSoupQuestCompleted) {
        return;
    }


    potatoSoupQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "potatoSoupQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updatePotatoSoupQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updatePotatoSoupQuest();

/* =========================================================
   DAILY QUEST - BUY CORN SOUP
========================================================= */

const cornSoupQuest =
    document.getElementById(
        "cornSoupQuest"
    );

const cornSoupQuestProgress =
    document.getElementById(
        "cornSoupQuestProgress"
    );


/* =========================================================
   LOAD QUEST
========================================================= */

let cornSoupQuestCompleted =
    localStorage.getItem(
        "cornSoupQuestCompleted"
    ) === "true";


/* =========================================================
   UPDATE QUEST
========================================================= */

function updateCornSoupQuest() {

    if (
        !cornSoupQuest ||
        !cornSoupQuestProgress
    ) {
        return;
    }


    if (cornSoupQuestCompleted) {

        cornSoupQuestProgress.textContent =
            "1 / 1";

        cornSoupQuest.textContent =
            "✓ COMPLETED";

        cornSoupQuest.disabled =
            true;

        cornSoupQuest.classList.add(
            "completed"
        );

        return;
    }


    cornSoupQuestProgress.textContent =
        "0 / 1";

    cornSoupQuest.textContent =
        "0 / 1";

    cornSoupQuest.disabled =
        true;

    cornSoupQuest.classList.remove(
        "completed"
    );
}


/* =========================================================
   COMPLETE QUEST
========================================================= */

function completeCornSoupQuest() {

    if (cornSoupQuestCompleted) {
        return;
    }


    cornSoupQuestCompleted =
        true;


    /* GIVE 1 GEM */

    giveGems(1);


    /* SAVE */

    localStorage.setItem(
        "cornSoupQuestCompleted",
        "true"
    );

    localStorage.setItem(
        "gems",
        gems
    );


    updateDisplay();

    updateCornSoupQuest();
}


/* =========================================================
   INITIAL STATE
========================================================= */

updateCornSoupQuest();

/* =========================================
   UNIVERSAL DAILY QUEST RESET
   CENTRAL EUROPEAN TIME
========================================= */

const DAILY_QUEST_TIMEZONE = "Europe/Bratislava";


/* =========================================
   GET CURRENT CENTRAL EUROPEAN DATE
========================================= */

function getCentralEuropeDate() {

    return new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: DAILY_QUEST_TIMEZONE,
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    ).format(new Date());

}


/* =========================================
   RESET ALL DAILY QUESTS
========================================= */

function resetAllDailyQuests() {

    console.log(
        "RESETTING DAILY QUESTS - CENTRAL EUROPEAN MIDNIGHT"
    );

    /* RESET ENERGY REFILLS */

energyRefillsUsed = 0;

localStorage.setItem(
    "energyRefillsUsed",
    "0"
);

updateEnergyRefillButton();

    /* =====================================
       500 CLICKS
    ===================================== */

    clickQuestCount = 0;

    clickQuestCompleted = false;

    localStorage.setItem(
        "clickQuestCount",
        "0"
    );

    localStorage.setItem(
        "clickQuestCompleted",
        "false"
    );


    /* =====================================
       10,000 COINS
    ===================================== */

    coinQuestCount = 0;

    coinQuestCompleted = false;

    localStorage.setItem(
        "coinQuestCount",
        "0"
    );

    localStorage.setItem(
        "coinQuestCompleted",
        "false"
    );

    /* =====================================
       STAY ONLINE 60 MINUTES
    ===================================== */

    onlineQuestMinutes = 0;

    onlineQuestCompleted = false;

    localStorage.setItem(
        "onlineQuestMinutes",
        "0"
    );

    localStorage.setItem(
        "onlineQuestCompleted",
        "false"
    );

    /* =====================================
   BUY 1 ENERGY UPGRADE
===================================== */

energyUpgradeQuestCompleted = false;

localStorage.setItem(
    "energyUpgradeQuestCompleted",
    "false"
);


/* =====================================
   BUY 1 LUCKY COINS
===================================== */

luckyCoinsQuestCompleted = false;

localStorage.setItem(
    "luckyCoinsQuestCompleted",
    "false"
);

/* =====================================
   BUY 1 TAP POWER - TOKENS SHOP
===================================== */

tokenTapPowerQuestCompleted = false;

localStorage.setItem(
    "tokenTapPowerQuestCompleted",
    "false"
);


/* =====================================
   BUY 1 COINS PER SECOND - TOKENS SHOP
===================================== */

tokenCPSQuestCompleted = false;

localStorage.setItem(
    "tokenCPSQuestCompleted",
    "false"
);

/* =====================================
   COLLECT 5 FALLING TOKENS
===================================== */

fallingTokenQuestCount = 0;

fallingTokenQuestCompleted = false;

localStorage.setItem(
    "fallingTokenQuestCount",
    "0"
);

localStorage.setItem(
    "fallingTokenQuestCompleted",
    "false"
);


/* =====================================
   HARVEST 50 RICE
===================================== */

riceHarvestQuestCount = 0;

riceHarvestQuestCompleted = false;

localStorage.setItem(
    "riceHarvestQuestCount",
    "0"
);

localStorage.setItem(
    "riceHarvestQuestCompleted",
    "false"
);

/* =====================================
   HARVEST 50 POTATO
===================================== */

potatoHarvestQuestCount = 0;

potatoHarvestQuestCompleted = false;

localStorage.setItem(
    "potatoHarvestQuestCount",
    "0"
);

localStorage.setItem(
    "potatoHarvestQuestCompleted",
    "false"
);


/* =====================================
   HARVEST 50 CORN
===================================== */

cornHarvestQuestCount = 0;

cornHarvestQuestCompleted = false;

localStorage.setItem(
    "cornHarvestQuestCount",
    "0"
);

localStorage.setItem(
    "cornHarvestQuestCompleted",
    "false"
);

/* =====================================
   BUY 1 MOON POWER
===================================== */

moonPowerQuestCompleted = false;

localStorage.setItem(
    "moonPowerQuestCompleted",
    "false"
);


/* =====================================
   BUY 1 NIGHT INCOME
===================================== */

nightIncomeQuestCompleted = false;

localStorage.setItem(
    "nightIncomeQuestCompleted",
    "false"
);

/* =====================================
   BUY RICE GROW TIME
===================================== */

riceGrowQuestCompleted = false;

localStorage.setItem(
    "riceGrowQuestCompleted",
    "false"
);


/* =====================================
   BUY POTATO GROW TIME
===================================== */

potatoGrowQuestCompleted = false;

localStorage.setItem(
    "potatoGrowQuestCompleted",
    "false"
);

/* =====================================
   BUY CORN GROW TIME
===================================== */

cornGrowQuestCompleted = false;

localStorage.setItem(
    "cornGrowQuestCompleted",
    "false"
);


/* =====================================
   BUY RICE SOUP
===================================== */

riceSoupQuestCompleted = false;

localStorage.setItem(
    "riceSoupQuestCompleted",
    "false"
);

/* =====================================
   BUY POTATO SOUP
===================================== */

potatoSoupQuestCompleted = false;

localStorage.setItem(
    "potatoSoupQuestCompleted",
    "false"
);


/* =====================================
   BUY CORN SOUP
===================================== */

cornSoupQuestCompleted = false;

localStorage.setItem(
    "cornSoupQuestCompleted",
    "false"
);

    /* =====================================
       UPDATE ALL QUEST UI
    ===================================== */

    updateClick500Quest();

    updateCoin10000Quest();

    updateOnlineQuest();

updateEnergyUpgradeQuest();

updateLuckyCoinsQuest();

updateTokenTapPowerQuest();

updateTokenCPSQuest();

updateFallingTokenQuest();

updateRiceHarvestQuest();

updatePotatoHarvestQuest();

updateCornHarvestQuest();

updateMoonPowerQuest();

updateNightIncomeQuest();

updateRiceGrowQuest();

updatePotatoGrowQuest();

updateCornGrowQuest();

updateRiceSoupQuest();

updatePotatoSoupQuest();

updateCornSoupQuest();

    console.log(
        "ALL DAILY QUESTS RESET"
    );

}

/* =========================================
   CHECK DAILY RESET
========================================= */

function checkDailyQuestReset() {

    const today = getCentralEuropeDate();

    const savedDate =
        localStorage.getItem(
            "dailyQuestDate"
        );


    /* =====================================
       FIRST TIME USING NEW SYSTEM
    ===================================== */

    if (!savedDate) {

        localStorage.setItem(
            "dailyQuestDate",
            today
        );

        console.log(
            "Daily quest date initialized:",
            today
        );

        return;
    }


    /* =====================================
       NEW CENTRAL EUROPEAN DAY
    ===================================== */

    if (savedDate !== today) {

        resetAllDailyQuests();

        localStorage.setItem(
            "dailyQuestDate",
            today
        );

        console.log(
            "New daily quest day:",
            today
        );
    }

}


/* =========================================
   START DAILY QUEST SYSTEM
========================================= */

checkDailyQuestReset();

/* =========================================
   DAILY QUEST RESET COUNTDOWN
   CENTRAL EUROPEAN TIME
========================================= */

const dailyQuestCountdown =
    document.getElementById("dailyQuestCountdown");


function getNextCentralEuropeMidnight() {

    const now = new Date();

    const parts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Europe/Bratislava",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        ).formatToParts(now);


    let year;
    let month;
    let day;


    parts.forEach(part => {

        if (part.type === "year") {
            year = Number(part.value);
        }

        if (part.type === "month") {
            month = Number(part.value);
        }

        if (part.type === "day") {
            day = Number(part.value);
        }

    });


    /*
       Start from the next calendar day
       at 00:00 Central European time.
    */

    const nextDay =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day + 1,
                0,
                0,
                0
            )
        );


    /*
       Convert Central European midnight
       back to an actual timestamp.

       Europe/Bratislava is UTC+1 in winter
       and UTC+2 in summer.
    */

    const centralEuropeString =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Europe/Bratislava",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        ).format(nextDay);


    /*
       Instead of manually calculating CET/CEST,
       find the difference between the desired
       Central European date and the actual date.
    */

    let target =
        new Date(
            nextDay.toISOString()
        );


    return target;
}


function updateDailyQuestCountdown() {

    if (!dailyQuestCountdown) {
        return;
    }


    const now = new Date();


    /*
       Get today's date in Central Europe
    */

    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: "Europe/Bratislava",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        );


    const today =
        formatter.format(now);


    /*
       Find tomorrow's date
    */

    const tomorrow =
        new Date(
            now.getTime() +
            24 * 60 * 60 * 1000
        );


    const tomorrowParts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Europe/Bratislava",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        ).formatToParts(tomorrow);


    let year;
    let month;
    let day;


    tomorrowParts.forEach(part => {

        if (part.type === "year") {
            year = Number(part.value);
        }

        if (part.type === "month") {
            month = Number(part.value);
        }

        if (part.type === "day") {
            day = Number(part.value);
        }

    });


    /*
       Determine the UTC timestamp corresponding
       to midnight in Europe/Bratislava.
    */

    let guess =
        Date.UTC(
            year,
            month - 1,
            day,
            0,
            0,
            0
        );


    /*
       Find timezone offset dynamically.
    */

    const offsetParts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Europe/Bratislava",
                timeZoneName: "longOffset"
            }
        ).formatToParts(
            new Date(guess)
        );


    const offsetPart =
        offsetParts.find(
            part =>
                part.type === "timeZoneName"
        );


    const offsetString =
        offsetPart
            ? offsetPart.value
            : "GMT+01:00";


    const match =
        offsetString.match(
            /GMT([+-])(\d{2}):?(\d{2})/
        );


    let offsetMilliseconds =
        60 * 60 * 1000;


    if (match) {

        const sign =
            match[1] === "+"
                ? 1
                : -1;

        const hours =
            Number(match[2]);

        const minutes =
            Number(match[3]);

        offsetMilliseconds =
            sign *
            (
                (hours * 60 + minutes) *
                60 *
                1000
            );
    }


    const nextMidnight =
        guess -
        offsetMilliseconds;


    let difference =
        nextMidnight -
        now.getTime();


    /*
       If midnight has passed,
       immediately check/reset quests.
    */

    if (difference <= 0) {

        checkDailyQuestReset();

        difference =
            nextMidnight -
            Date.now();
    }


    const totalSeconds =
        Math.max(
            0,
            Math.floor(
                difference / 1000
            )
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


    dailyQuestCountdown.textContent =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


/*
   Update immediately
*/

updateDailyQuestCountdown();


/*
   Update every second
*/

setInterval(
    updateDailyQuestCountdown,
    1000
);

/* =========================
   UPDATE STATS
========================= */

function updateStats() {

/* =========================
   TOTAL % BONUS
========================= */

const statsBonusElement =
    document.getElementById("statsBonus");

if (statsBonusElement) {

     const totalBonus =
        Number(getTotalBonus()) || 0;

     statsBonusElement.textContent =
        `+${Math.floor(Number(getTotalBonus()) || 0)}%`;

}


    /* =========================
       TOTAL TIME PLAYED
    ========================= */

    const totalTimeElement =
        document.getElementById("totalTimePlayed");

    if (totalTimeElement) {

        const time =
            Number(localStorage.getItem("totalTimePlayed")) ||
            Number(totalTimePlayed) ||
            0;

        const hours =
            Math.floor(time / 3600);

        const minutes =
            Math.floor((time % 3600) / 60);

        const seconds =
            Math.floor(time % 60);

        totalTimeElement.textContent =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
    }


    /* =========================
       TOTAL COINS EARNED
    ========================= */

    const totalCoinsElement =
        document.getElementById("totalCoinsEarned");

    if (totalCoinsElement) {

        const coins =
            Number(localStorage.getItem("totalCoinsEarned")) ||
            Number(totalCoinsEarned) ||
            0;

        totalCoinsElement.textContent =
            formatNumber(coins);
    }


    /* =========================
       COINS PER SECOND
    ========================= */

    const coinsPerSecondElement =
        document.getElementById("statsPerSecond");

    if (coinsPerSecondElement) {

        const currentPerSecond =
            Number(perSecond) || 0;

        const multiplier =
            Number(coinsPerSecondMultiplier) || 1;

        const bonusMultiplier =
            1 + (Number(getTotalBonus()) || 0) / 100;

        const actualPerSecond =
            currentPerSecond *
              multiplier *
    bonusMultiplier;
   

        coinsPerSecondElement.textContent =
            actualPerSecond.toFixed(2);
    }


    /* =========================
       TAP POWER
    ========================= */

    const tapPowerElement =
        document.getElementById("statsTapPower");

    if (tapPowerElement) {

        const currentPower =
            Number(power) || 0;

        const currentTapBonus =
            Number(tapBonus) || 0;

        const totalTapPower =
            currentPower *
            (1 + currentTapBonus / 100);

        tapPowerElement.textContent =
            Math.floor(totalTapPower);
    }


  /* =========================
   TOTAL TAP % BONUS
========================= */

const tapBonusElement =
    document.getElementById("statsTapBonus");

if (tapBonusElement) {

    tapBonusElement.textContent =
        `+${Math.floor(Number(tapBonus) || 0)}%`;
}


    /* =========================
       TOTAL GEMS % BONUS
    ========================= */

    const gemsBonusElement =
        document.getElementById("totalGemsBonus");

    if (gemsBonusElement) {

        gemsBonusElement.textContent =
            `+${Number(totalGemsBonus) || 0}%`;
    }


    /* =========================
       LUCKY COIN MULTIPLIER
    ========================= */

    const luckyMultiplierElement =
        document.getElementById("luckyCoinMultiplierStat");

    if (luckyMultiplierElement) {

        luckyMultiplierElement.textContent =
            `${Number(luckyCoinMultiplier || 1).toFixed(2)}x`;
    }


    /* =========================
       LUCKY COIN CHANCE
    ========================= */

    const luckyChanceElement =
        document.getElementById("luckyCoinChanceStat");

    if (luckyChanceElement) {

        luckyChanceElement.textContent =
            `${Number(luckyCoinChance || 1)}%`;
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

if (!telegramInitData) {
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

    /* =========================================================
   CHECK PLAYER RESET VERSION
========================================================= */

const serverResetVersion =
    Number(data.resetVersion || 0);

const localResetVersion =
    Number(
        localStorage.getItem("resetVersion") || 0
    );

if (serverResetVersion > localResetVersion) {

    console.log(
        "🔄 PLAYER RESET DETECTED"
    );

    console.log(
        "Local reset version:",
        localResetVersion
    );

    console.log(
        "Server reset version:",
        serverResetVersion
    );

    /* =====================================================
       CLEAR LOCAL GAME PROGRESS
    ===================================================== */

    const keysToReset = [

        "money",
        "power",
        "farmers",
        "perSecond",
        "upgradeCost",
        "farmerCost",
        "energy",

        "gems",
        "tokens",

        "coinBonus",
        "boostedCoinsBonus",
        "cpsBonus",
        "tapBonus",

        "luckyCoinMultiplier",
        "luckyCoinMultiplierCost",
        "luckyCoinChance",

        "coinsPerSecondMultiplier",
        "energyUpgradeCost",
        "energyFlatBonus",

        "totalCoinsEarned",
        "totalTimePlayed",

        "riceSeeds",
        "potatoSeeds",
        "cornSeeds",

        "rice",
        "potato",
        "corn",

        "fieldCrops",
        "unlockedFieldPlots",

        "riceSoupLevel",
        "potatoSoupLevel",
        "cornSoupLevel",

        "riceGrowUpgrades",
        "potatoGrowUpgrades",
        "cornGrowUpgrades",

        "nightBonus",
        "soupBonus",

        "shopFarmerCosts",
        "tapPowerCosts"
    ];

    keysToReset.forEach(key => {
        localStorage.removeItem(key);
    });

    /* Save the new reset version */

    localStorage.setItem(
        "resetVersion",
        serverResetVersion
    );

    console.log(
        "✅ Local game progress cleared"
    );

    /* Reload game */

    location.reload();
}

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

    giveGems(1);


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

        giveGems(1);

   localStorage.setItem(
        "coinQuestCount",
        "10000"
    );

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
   UPDATE TAP POWER QUEST
========================= */



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

/* =========================================================
   SHOP BUTTONS
========================================================= */

const coinsShopButton =
    document.getElementById("coinsShopButton");

const coinsShop =
    document.getElementById("coinsShop");

const backToShop =
    document.getElementById("backToShop");


const gemsShopButton =
    document.getElementById("gemsShopButton");

const gemsShop =
    document.getElementById("gemsShop");

const backFromGemsShop =
    document.getElementById("backFromGemsShop");


const tokensShopButton =
    document.getElementById("tokensShopButton");

const tokensShop =
    document.getElementById("tokensShop");

const backFromTokensShop =
    document.getElementById("backFromTokensShop");


/* =========================================================
   HELPER — HIDE ALL SHOP PAGES
========================================================= */

function hideAllShopPages() {

    coinsShop.classList.add("hidden");

    gemsShop.classList.add("hidden");

    tokensShop.classList.add("hidden");

}


/* =========================================================
   HELPER — SHOW MAIN SHOP BUTTONS
========================================================= */

function showMainShopButtons() {

    document
        .querySelectorAll(".shop-button")
        .forEach(function (button) {

            button.style.display = "flex";

        });

}


/* =========================================================
   COINS SHOP
========================================================= */

coinsShopButton.addEventListener(
    "click",
    function () {

        /* Hide main buttons */

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "none";

            });


        /* Hide other shops */

        hideAllShopPages();


        /* Show Coins Shop */

        coinsShop.classList.remove("hidden");

    }
);


/* =========================================================
   BACK FROM COINS SHOP
========================================================= */

backToShop.addEventListener(
    "click",
    function () {

        coinsShop.classList.add("hidden");

        showMainShopButtons();

    }
);


/* =========================================================
   GEMS SHOP
========================================================= */

gemsShopButton.addEventListener(
    "click",
    function () {

        /* Hide main buttons */

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "none";

            });


        /* Hide other shops */

        hideAllShopPages();


        /* Show Gems Shop */

        gemsShop.classList.remove("hidden");

    }
);


/* =========================================================
   BACK FROM GEMS SHOP
========================================================= */

backFromGemsShop.addEventListener(
    "click",
    function () {

        gemsShop.classList.add("hidden");

        showMainShopButtons();

    }
);


/* =========================================================
   TOKENS SHOP
========================================================= */

tokensShopButton.addEventListener(
    "click",
    function () {

        /* Hide main buttons */

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "none";

            });


        /* Hide other shops */

        hideAllShopPages();


        /* Show Tokens Shop */

        tokensShop.classList.remove("hidden");

    }
);


/* =========================================================
   BACK FROM TOKENS SHOP
========================================================= */

backFromTokensShop.addEventListener(
    "click",
    function () {

        tokensShop.classList.add("hidden");

        showMainShopButtons();

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
    `+${boostedCoinsBonus}% / ${BOOSTED_COINS_MAX}%`;

  /* MAX LEVEL */

    if (boostedCoinsBonus >= BOOSTED_COINS_MAX) {

        boostedCoinsBonus =
            BOOSTED_COINS_MAX;

        boostedCoinsProgress.textContent =
            `+${BOOSTED_COINS_MAX}% / ${BOOSTED_COINS_MAX}%`;

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

            if (
                boostedCoinsBonus >=
                BOOSTED_COINS_MAX
            ) {
                return;
            }


            /* GEM CHECK */

            if (
                gems <
                BOOSTED_COINS_COST
            ) {
                return;
            }


            /* PAY */

            gems -=
                BOOSTED_COINS_COST;


            /* ADD +1% */

            boostedCoinsBonus += 1;

console.log("BOOSTED BONUS AFTER BUY:", boostedCoinsBonus);
            /* SAFETY */

            if (
                boostedCoinsBonus >
                BOOSTED_COINS_MAX
            ) {

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


            /* UPDATE */

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

/* =========================
   MAX ENERGY % - GEM SHOP
========================= */

const buyEnergyPercent =
    document.getElementById("buyEnergyPercent");

const energyPercentProgress =
    document.getElementById("energyPercentProgress");

const ENERGY_PERCENT_COST = 100;
const ENERGY_PERCENT_MAX = 50;


/* =========================
   UPDATE ENERGY SHOP
========================= */

function updateEnergyPercentShop() {

    if (
        !buyEnergyPercent ||
        !energyPercentProgress
    ) {
        return;
    }


    /* MAX */

    if (
        energyBonusPercent >=
        ENERGY_PERCENT_MAX
    ) {

        energyBonusPercent =
            ENERGY_PERCENT_MAX;

        energyPercentProgress.textContent =
            "+50% / 50%";

        buyEnergyPercent.textContent =
            "✓ MAX";

        buyEnergyPercent.disabled =
            true;

        buyEnergyPercent.classList.add(
            "completed"
        );

        return;
    }


    /* NORMAL */

    energyPercentProgress.textContent =
        "+" + energyBonusPercent + "% / 50%";

    buyEnergyPercent.textContent =
        "💎 100";

    buyEnergyPercent.disabled =
        gems < ENERGY_PERCENT_COST;

    buyEnergyPercent.classList.remove(
        "completed"
    );
}


/* =========================
   BUY ENERGY UPGRADE
========================= */

if (buyEnergyPercent) {

    buyEnergyPercent.addEventListener(
        "click",
        function () {

            /* MAX CHECK */

            if (
                energyBonusPercent >=
                ENERGY_PERCENT_MAX
            ) {
                return;
            }


            /* NOT ENOUGH GEMS */

            if (
                gems <
                ENERGY_PERCENT_COST
            ) {
                return;
            }


            /* PAY 100 GEMS */

            gems -=
                ENERGY_PERCENT_COST;


            /* +1% */

            energyBonusPercent += 1;


            /* MAX SAFETY */

            if (
                energyBonusPercent >
                ENERGY_PERCENT_MAX
            ) {

                energyBonusPercent =
                    ENERGY_PERCENT_MAX;
            }


            /* UPDATE MAX ENERGY */

          maxEnergy = Math.floor(
    (100 + energyFlatBonus) *
    (1 + energyBonusPercent / 100)
);


            /* SAVE */

            localStorage.setItem(
                "gems",
                gems
            );

            localStorage.setItem(
                "energyBonusPercent",
                energyBonusPercent
            );

            localStorage.setItem(
                "maxEnergy",
                maxEnergy
            );


            /* UPDATE */

            updateEnergyPercentShop();

            updateDisplay();

            saveGame();

        }
    );
}

/* =========================
   🍀 LUCKY COIN CHANCE
   - GEM SHOP
========================= */

const buyLuckyChance =
    document.getElementById("buyLuckyChance");

const luckyChanceProgress =
    document.getElementById("luckyChanceProgress");

const LUCKY_CHANCE_COST = 100;
const LUCKY_CHANCE_MAX = 80;

/* =========================
   UPDATE LUCKY CHANCE SHOP
========================= */

function updateLuckyChanceDisplay() {

    if (
        !buyLuckyChance ||
        !luckyChanceProgress
    ) {
        return;
    }


    /* MAX */

    if (
        luckyCoinChance >=
        LUCKY_CHANCE_MAX
    ) {

        luckyCoinChance =
            LUCKY_CHANCE_MAX;

        luckyChanceProgress.textContent =
            "80% / 80%";

        buyLuckyChance.textContent =
            "✓ MAX";

        buyLuckyChance.disabled =
            true;

        buyLuckyChance.classList.add(
            "completed"
        );

        return;
    }


    /* NORMAL */

    luckyChanceProgress.textContent =
        luckyCoinChance +
        "% / 80%";

    buyLuckyChance.textContent =
        "💎 100";

    buyLuckyChance.disabled =
        gems < LUCKY_CHANCE_COST;

    buyLuckyChance.classList.remove(
        "completed"
    );
}


/* =========================
   BUY LUCKY CHANCE
========================= */

if (buyLuckyChance) {

    buyLuckyChance.addEventListener(
        "click",
        function () {

            /* MAX */

            if (
                luckyCoinChance >=
                LUCKY_CHANCE_MAX
            ) {
                return;
            }


            /* NOT ENOUGH GEMS */

            if (
                gems <
                LUCKY_CHANCE_COST
            ) {
                return;
            }


            /* PAY 100 GEMS */

            gems -=
                LUCKY_CHANCE_COST;


            /* +1% CHANCE */

            luckyCoinChance += 1;


            /* MAX SAFETY */

            if (
                luckyCoinChance >
                LUCKY_CHANCE_MAX
            ) {
                luckyCoinChance =
                    LUCKY_CHANCE_MAX;
            }


            /* SAVE */

            localStorage.setItem(
                "gems",
                gems
            );

            localStorage.setItem(
                "luckyCoinChance",
                luckyCoinChance
            );


            /* UPDATE */

            updateLuckyChanceDisplay();

            updateDisplay();

            updateStats();

        }
    );
}


/* =========================
   INITIAL STATE
========================= */

updateLuckyChanceDisplay();

/* =========================
   INITIAL STATE
========================= */

updateEnergyPercentShop();

// =========================
// MAIN SHOP CLOSE BUTTON
// =========================

const closeShopButton =
    document.getElementById("closeShop");

if (closeShopButton && shopOverlay) {

    closeShopButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            // =========================
            // HIDE ALL SHOP PAGES
            // =========================

            if (coinsShop) {
                coinsShop.classList.add("hidden");
            }

            if (gemsShop) {
                gemsShop.classList.add("hidden");
            }

            if (tokensShop) {
                tokensShop.classList.add("hidden");
            }


            // =========================
            // SHOW MAIN SHOP BUTTONS
            // =========================

            document
                .querySelectorAll(".shop-button")
                .forEach(button => {

                    button.style.display = "flex";

                });


            // =========================
            // CLOSE MAIN SHOP
            // =========================

            shopOverlay.classList.add("hidden");

        }
    );

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

async function showCoinsLeaderboard() {

    leaderboardList.innerHTML = `
        <div class="leaderboard-loading">
            Loading...
        </div>
    `;

    try {

        const response = await fetch(
            "https://server-72ja.onrender.com/api/leaderboard/coins"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Failed to load leaderboard"
            );
        }

        leaderboardList.innerHTML = "";

        data.leaderboard.forEach(function(player, index) {

            const row =
                document.createElement("div");

            row.className =
                "leaderboard-row";

            row.innerHTML = `
                <span class="rank">
                    ${index + 1}
                </span>

                <span class="player-name">
                    ${player.username || "Farmer"}
                </span>

                <span class="player-coins">
                    💰 ${formatNumber(player.coins || 0)}
                </span>
            `;

            leaderboardList.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Coins leaderboard error:",
            error
        );

        leaderboardList.innerHTML = `
            <div class="leaderboard-loading">
                Failed to load leaderboard
            </div>
        `;
    }
}

/* =========================
   CLICKS
========================= */

async function showClicksLeaderboard() {

    leaderboardList.innerHTML = `
        <div class="leaderboard-loading">
            Loading...
        </div>
    `;

    try {

        const response = await fetch(
            "https://server-72ja.onrender.com/api/leaderboard/clicks"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Failed to load leaderboard"
            );
        }

        leaderboardList.innerHTML = "";

        data.leaderboard.forEach(function(player, index) {

            const row =
                document.createElement("div");

            row.className =
                "leaderboard-row";

            row.innerHTML = `
                <span class="rank">
                    ${index + 1}
                </span>

                <span class="player-name">
                    ${player.username || "Farmer"}
                </span>

                <span class="player-coins">
                    👆 ${formatNumber(player.total_clicks || 0)}
                </span>
            `;

            leaderboardList.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Clicks leaderboard error:",
            error
        );

        leaderboardList.innerHTML = `
            <div class="leaderboard-loading">
                Failed to load leaderboard
            </div>
        `;
    }
}

/* =========================
   GEMS
========================= */

async function showGemsLeaderboard() {

    leaderboardList.innerHTML = `
        <div class="leaderboard-loading">
            Loading...
        </div>
    `;

    try {

        const response = await fetch(
            "https://server-72ja.onrender.com/api/leaderboard/gems"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Failed to load leaderboard"
            );
        }

        leaderboardList.innerHTML = "";

        data.leaderboard.forEach(function(player, index) {

            const row =
                document.createElement("div");

            row.className =
                "leaderboard-row";

            row.innerHTML = `
                <span class="rank">
                    ${index + 1}
                </span>

                <span class="player-name">
                    ${player.username || "Farmer"}
                </span>

                <span class="player-coins">
                    💎 ${formatNumber(player.gems || 0)}
                </span>
            `;

            leaderboardList.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Gems leaderboard error:",
            error
        );

        leaderboardList.innerHTML = `
            <div class="leaderboard-loading">
                Failed to load leaderboard
            </div>
        `;
    }
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

                    coins: totalCoinsEarned,

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

/* =========================
   TON CONNECT
========================= */

const tonConnectUI =
    new TON_CONNECT_UI.TonConnectUI({

        manifestUrl:
            "https://pustulak0.github.io/Clickerfarm/tonconnect-manifest.json",

        buttonRootId:
            "ton-connect"

    });

/* =========================================================
   BUY GEMS WITH TON
========================================================= */

let tonPurchaseInProgress = false;


async function buyGemsWithTON(gemAmount) {

    if (tonPurchaseInProgress) {

        console.log(
            "⚠️ TON purchase already in progress."
        );

        return;

    }


    /* =========================
       CHECK WALLET
    ========================= */

    const wallet =
        tonConnectUI.wallet;


    if (!wallet) {

        alert(
            "❌ Please connect your TON mainnet wallet first."
        );

        return;
    }


    /* =========================
       CHECK MAINNET
    ========================= */

   if (
    wallet.account.chain !== "-239"
) {

    alert(
        "❌ Please connect a TON mainnet wallet."
    );

    return;
}


    /* =========================================================
       GEM PACKAGES
    ========================================================= */

    const packages = {

        100: {
            gems: 100,
            amount: "100000000"
        },

        250: {
            gems: 250,
            amount: "250000000"
        },

        500: {
            gems: 500,
            amount: "500000000"
        },

        1000: {
            gems: 1000,
            amount: "1000000000"
        }

    };


    const packageInfo =
        packages[gemAmount];


    if (!packageInfo) {

        alert(
            "❌ Invalid gem package."
        );

        return;
    }


    /* =========================
       RECIPIENT
    ========================= */

    const recipient =
        "UQCpw7eZvpK4EDAOh00wDDPMcY4bxNgoJyI5SWH-GnTiKUrx";


    /* =========================================================
       START PURCHASE LOCK
    ========================================================= */

    tonPurchaseInProgress = true;


    /* =========================
       SEND TRANSACTION
    ========================= */

    try {

        console.log(
            "BUY GEMS:",
            gemAmount
        );

        console.log(
            "Sending TON:",
            packageInfo.amount
        );

    console.log(
    "TON NETWORK:",
    "-239"
);
        console.log(
            "TON RECIPIENT:",
            recipient
        );

        console.log(
            "TON AMOUNT:",
            packageInfo.amount
        );

        console.log(
            "CONNECTED WALLET:",
            wallet.account.address
        );


        const transaction =
            await tonConnectUI.sendTransaction({

                validUntil:
                    Math.floor(
                        Date.now() / 1000
                    ) + 300,

                messages: [

                    {

                        address:
                            recipient,

                        amount:
                            packageInfo.amount

                    }

                ]

            });


        console.log(
            "TON TRANSACTION:",
            transaction
        );


        console.log(
            "BOC:",
            transaction.boc
        );


        if (!transaction.boc) {

            throw new Error(
                "Transaction BOC is missing."
            );

        }


        alert(
            "✅ Payment sent!\n\nChecking blockchain..."
        );


        /* =========================
           WAIT FOR BLOCKCHAIN
        ========================= */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    40000
                )
        );


        /* =========================================================
           VERIFY PAYMENT ON SERVER
        ========================================================= */

        const verifyResponse =
            await fetch(
                "https://server-72ja.onrender.com/api/verify-ton-payment",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            initData:
                                Telegram.WebApp.initData,

                            boc:
                                transaction.boc,

                            gemAmount:
                                gemAmount

                        })

                }
            );


        const verifyData =
            await verifyResponse.json();


        console.log(
            "TON VERIFICATION:",
            verifyData
        );


        /* =========================================================
           PAYMENT SUCCESS
        ========================================================= */

        if (
            verifyData.success &&
            verifyData.paid
        ) {

            console.log(
                "✅ PAYMENT VERIFIED"
            );


            /* =========================
               USE SERVER GEM BALANCE
            ========================= */

            gems =
                verifyData.gems;


            totalGemsEarned +=
                verifyData.gemsAdded;


            saveGame();

            updateDisplay();


            alert(
                `✅ Payment successful!\n\n💎 +${verifyData.gemsAdded} GEMS`
            );

        }

        else {

            alert(
                verifyData.error ||
                "⚠️ Payment could not be verified yet."
            );

        }

    }

    catch (error) {

    console.error(
        "TON PAYMENT ERROR:",
        error
    );

    alert(
        "❌ Transaction failed:\n\n" +
        (error?.message || error)
        );

    }

    finally {

        tonPurchaseInProgress = false;

    }

}

/* =========================================================
   BUY +5% TAP POWER WITH TON
========================================================= */

async function buyTapPowerWithTON() {

    if (tonPurchaseInProgress) {

        console.log(
            "⚠️ TON purchase already in progress."
        );

        return;

    }


    /* =========================
       CHECK WALLET
    ========================= */

    const wallet =
        tonConnectUI.wallet;


    if (!wallet) {

        alert(
            "❌ Please connect your TON mainnet wallet first."
        );

        return;
    }


    /* =========================
       CHECK MAINNET
    ========================= */

    if (
        wallet.account.chain !== "-239"
    ) {

        alert(
            "❌ Please connect a TON mainnet wallet."
        );

        return;
    }


    /* =========================
       TAP POWER PACKAGE
    ========================= */

    const amount =
        "100000000"; // 0.1 TON

    const tapBonus =
        5; // +5%


    /* =========================
       RECIPIENT
    ========================= */

    const recipient =
        "UQCpw7eZvpK4EDAOh00wDDPMcY4bxNgoJyI5SWH-GnTiKUrx";


    tonPurchaseInProgress = true;


    try {

        console.log(
            "BUY TAP POWER"
        );

        console.log(
            "Tap bonus:",
            "+" + tapBonus + "%"
        );

        console.log(
            "TON amount:",
            amount
        );


        /* =========================
           SEND TRANSACTION
        ========================= */

        const transaction =
            await tonConnectUI.sendTransaction({

                validUntil:
                    Math.floor(
                        Date.now() / 1000
                    ) + 300,

                messages: [

                    {

                        address:
                            recipient,

                        amount:
                            amount

                    }

                ]

            });


        console.log(
            "TON TRANSACTION:",
            transaction
        );


        if (!transaction.boc) {

            throw new Error(
                "Transaction BOC is missing."
            );

        }


        alert(
            "✅ Payment sent!\n\nChecking blockchain..."
        );


        /* =========================
           WAIT FOR BLOCKCHAIN
        ========================= */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    40000
                )
        );


        /* =========================
           VERIFY PAYMENT
        ========================= */

        const verifyResponse =
            await fetch(
                "https://server-72ja.onrender.com/api/verify-ton-payment",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            initData:
                                Telegram.WebApp.initData,

                            boc:
                                transaction.boc,

                            purchaseType:
                                "tap_power"

                        })

                }
            );


        const verifyData =
            await verifyResponse.json();


        console.log(
            "TON TAP POWER VERIFICATION:",
            verifyData
        );


        /* =========================
           PAYMENT SUCCESS
        ========================= */

        if (
            verifyData.success &&
            verifyData.paid
        ) {

            /*
             * SERVER IS THE SOURCE OF TRUTH.
             *
             * tapBonus is a percentage.
             *
             * Example:
             * 0% -> 5%
             * 5% -> 10%
             * 10% -> 15%
             */

            tapBonus =
                Number(
                    verifyData.tapBonus || 0
                );


            saveGame();

            updateDisplay();


            alert(
                `✅ Payment successful!\n\n⚡ +${verifyData.tapBonusAdded}% Tap Power`
            );

        }

        else {

            alert(
                verifyData.error ||
                "⚠️ Payment could not be verified yet."
            );

        }

    }

    catch (error) {

        console.error(
            "TON TAP POWER ERROR:",
            error
        );

        alert(
            "❌ Transaction failed:\n\n" +
            (error?.message || error)
        );

    }

    finally {

        tonPurchaseInProgress = false;

    }

}

/* =========================================================
   TON TAP POWER BUTTON
========================================================= */

const buyTapPowerTONButton =
    document.getElementById("buyTapPowerTON");

if (buyTapPowerTONButton) {

    buyTapPowerTONButton.onclick =
        async function () {

            if (
                buyTapPowerTONButton.disabled
            ) {
                return;
            }

            buyTapPowerTONButton.disabled =
                true;

            try {

                await buyTapPowerWithTON();

            } finally {

                buyTapPowerTONButton.disabled =
                    false;

            }

        };

}

/* =========================================================
   TON GEM SHOP BUTTONS
========================================================= */

const buy100GemsButton =
    document.getElementById("buy100Gems");

const buy250GemsButton =
    document.getElementById("buy250Gems");

const buy500GemsButton =
    document.getElementById("buy500Gems");

const buy1000GemsButton =
    document.getElementById("buy1000Gems");

if (buy100GemsButton) {

    buy100GemsButton.onclick = async function () {

        if (buy100GemsButton.disabled) {
            return;
        }

        buy100GemsButton.disabled = true;

        try {

            await buyGemsWithTON(100);

        } finally {

            buy100GemsButton.disabled = false;

        }

    };

}


if (buy250GemsButton) {

    buy250GemsButton.onclick = async function () {

        if (buy250GemsButton.disabled) {
            return;
        }

        buy250GemsButton.disabled = true;

        try {

            await buyGemsWithTON(250);

        } finally {

            buy250GemsButton.disabled = false;

        }

    };

}


if (buy500GemsButton) {

    buy500GemsButton.onclick = async function () {

        if (buy500GemsButton.disabled) {
            return;
        }

        buy500GemsButton.disabled = true;

        try {

            await buyGemsWithTON(500);

        } finally {

            buy500GemsButton.disabled = false;

        }

    };

}


if (buy1000GemsButton) {

    buy1000GemsButton.onclick = async function () {

        if (buy1000GemsButton.disabled) {
            return;
        }

        buy1000GemsButton.disabled = true;

        try {

            await buyGemsWithTON(1000);

        } finally {

            buy1000GemsButton.disabled = false;

        }

    };

}

/* =========================
   WALLET STATUS
========================= */

tonConnectUI.onStatusChange(
    function (wallet) {

        if (wallet) {

            console.log(
                "TON wallet connected!"
            );

            console.log(
                "Wallet address:",
                wallet.account.address
            );

            console.log(
                "TON network:",
                wallet.account.chain
            );

        }

        else {

            console.log(
                "TON wallet disconnected"
            );

        }

    }
);

// =========================
// ACHIEVEMENTS
// =========================

const achievementsButton =
    document.getElementById("achievementsButton");

const achievementsOverlay =
    document.getElementById("achievementsOverlay");

const closeAchievements =
    document.getElementById("closeAchievements");

const achievementCategories =
    document.getElementById("achievementCategories");

const achievementCoins =
    document.getElementById("achievementCoins");

const achievementCPS =
    document.getElementById("achievementCPS");

const coinsAchievements =
    document.getElementById("coinsAchievements");

const cpsAchievements =
    document.getElementById("cpsAchievements");

const backFromCoins =
    document.getElementById("backFromCoins");


// =========================
// OPEN ACHIEVEMENTS
// =========================

if (achievementsButton && achievementsOverlay) {

    achievementsButton.addEventListener("click", function () {

        console.log("ACHIEVEMENTS OPEN");

        // Move popup directly into BODY
        document.body.appendChild(achievementsOverlay);

        // Open popup
        achievementsOverlay.classList.add("active");

        // Show category buttons
        if (achievementCategories) {
            achievementCategories.style.display = "flex";
        }

        // Hide Coins
        if (coinsAchievements) {
            coinsAchievements.style.display = "none";
        }

        // Hide CPS
        if (cpsAchievements) {
            cpsAchievements.style.display = "none";
        }

    });

}


// =========================
// CLOSE ACHIEVEMENTS
// =========================

if (closeAchievements) {

    closeAchievements.addEventListener("click", function () {

        achievementsOverlay.classList.remove("active");

    });

}


// =========================
// COINS
// =========================

if (achievementCoins) {

    achievementCoins.addEventListener("click", function () {

        console.log("COINS BUTTON CLICKED");

        // Hide categories
        achievementCategories.style.display = "none";

        // Show Coins
        coinsAchievements.style.display = "grid";

        // Hide CPS
        cpsAchievements.style.display = "none";

    });

}


// =========================
// BACK FROM COINS
// =========================

if (backFromCoins) {

    backFromCoins.addEventListener("click", function () {

        console.log("BACK FROM COINS");

        // Hide Coins
        coinsAchievements.style.display = "none";

        // Show categories
        achievementCategories.style.display = "flex";

    });

}


// =========================
// CPS
// =========================

if (achievementCPS) {

    achievementCPS.addEventListener("click", function () {

        console.log("CPS BUTTON CLICKED");

        // Hide categories
        achievementCategories.style.display = "none";

        // Hide Coins
        coinsAchievements.style.display = "none";

        // Show CPS
        cpsAchievements.style.display = "block";

    });

}

/* =========================
   BACK FROM CPS
========================= */

const backFromCPS =
    document.getElementById("backFromCPS");

if (backFromCPS) {

    backFromCPS.addEventListener(
        "click",
        function () {

            console.log("BACK FROM CPS");

            // Hide CPS
            if (cpsAchievements) {
                cpsAchievements.style.display = "none";
            }

            // Show categories
            if (achievementCategories) {
                achievementCategories.style.display = "flex";
            }

        }
    );
}

function updateStatsBonus() {

    const element = document.getElementById("statsBonus");

    if (!element) {
        console.log("❌ statsBonus NOT FOUND");
        return;
    }

    const totalBonus =
        Number(coinBonus || 0) +
        Number(boostedCoinsBonus || 0) +
        Number(cpsBonus || 0)+
        Number(tapBonus || 0);
        Number(soupBonus || 0);
    element.textContent = `+${totalBonus}%`;

    console.log("✅ TOTAL BONUS UPDATED:", totalBonus);
}

// =========================
// CLICKS
// =========================

if (achievementClicks) {

    achievementClicks.addEventListener("click", function () {

        console.log("CLICKS BUTTON CLICKED");

        // Hide categories
        achievementCategories.style.display = "none";

        // Hide Coins
        coinsAchievements.style.display = "none";

        // Hide CPS
        cpsAchievements.style.display = "none";

        // Show Clicks
        clickAchievements.classList.add("active");

    });

}


// =========================
// BACK FROM CLICKS
// =========================

if (backFromClicks) {

    backFromClicks.addEventListener("click", function () {

        console.log("BACK FROM CLICKS");

        // Hide Clicks
        clickAchievements.classList.remove("active");

        // Show categories
        achievementCategories.style.display = "flex";

    });

}

updateCPSAchievements();
updateCoinAchievements();
updateClickAchievements();
updateStatsBonus();

function giveGems(amount) {

    const bonusMultiplier =
        1 + (totalGemsBonus / 100);

    const finalGems =
        Math.round(amount * bonusMultiplier);

    gems += finalGems;

    totalGemsEarned += finalGems;

    localStorage.setItem(
        "totalGemsEarned",
        totalGemsEarned
    );

    saveGame();
    updateDisplay();

    checkGemAchievements();
}

// =========================
// GEMS
// =========================

if (achievementGems) {

    achievementGems.addEventListener("click", function () {

        console.log("GEMS BUTTON CLICKED");

        // Hide categories
        achievementCategories.style.display = "none";

        // Hide Coins
        coinsAchievements.style.display = "none";

        // Hide CPS
        cpsAchievements.style.display = "none";

        // Hide Clicks
        clickAchievements.classList.remove("active");

        // Show Gems
        gemsAchievements.classList.add("active");

    });

}


// =========================
// BACK FROM GEMS
// =========================

if (backFromGems) {

    backFromGems.addEventListener("click", function () {

        console.log("BACK FROM GEMS");

        // Hide Gems
        gemsAchievements.classList.remove("active");

        // Show categories
        achievementCategories.style.display = "flex";

    });

}

updateGemAchievements();
checkGemAchievements();
updateFarmerAchievements();
checkFarmerAchievements();

// =========================
// FARMERS
// =========================

if (achievementFarmers) {

    achievementFarmers.addEventListener("click", function () {

        console.log("FARMERS BUTTON CLICKED");

        // Hide categories
        achievementCategories.style.display = "none";

        // Hide all achievement pages
        coinsAchievements.classList.remove("active");
        cpsAchievements.classList.remove("active");
        clickAchievements.classList.remove("active");
        gemsAchievements.classList.remove("active");
        farmerAchievements.classList.remove("active");

        // Show Farmers
        farmerAchievements.classList.add("active");

    });

}


// =========================
// BACK FROM FARMERS
// =========================

if (backFromFarmers) {

    backFromFarmers.addEventListener("click", function () {

        console.log("BACK FROM FARMERS");

        // Hide Farmers
        farmerAchievements.classList.remove("active");

        // Show categories
        achievementCategories.style.display = "flex";

    });

}

/* =========================================================
   DAILY CASE OPENING
========================================================= */

/* =========================================================
   DAILY CASE
========================================================= */

const caseOpeningSection =
    document.getElementById("caseOpeningSection");

const dailyCaseButton =
    document.getElementById("dailyCaseButton");

const closeCaseButton =
    document.getElementById("closeCaseButton");

const caseTrack =
    document.getElementById("caseTrack");

const openCaseButton =
    document.getElementById("openCaseButton");

const caseSpins =
    document.getElementById("caseSpins");

const caseResult =
    document.getElementById("caseResult");


/* =========================================================
   ONLY RUN IF CASE HTML EXISTS
========================================================= */

if (
    caseOpeningSection &&
    dailyCaseButton &&
    closeCaseButton &&
    caseTrack &&
    openCaseButton &&
    caseSpins &&
    caseResult
) {


    /* =====================================================
       REWARDS
    ===================================================== */

    const caseRewards = [

        {
            id: 1,
            type: "coins",
            amount: 2500000,
            text: "2.5M COINS",
            icon: "🪙",
            chance: 15
        },

        {
            id: 2,
            type: "coins",
            amount: 5000000,
            text: "5M COINS",
            icon: "🪙",
            chance: 10
        },

        {
            id: 3,
            type: "coins",
            amount: 7500000,
            text: "7.5M COINS",
            icon: "🪙",
            chance: 7.5
        },

        {
            id: 4,
            type: "coins",
            amount: 10000000,
            text: "10M COINS",
            icon: "🪙",
            chance: 5
        },

        {
            id: 5,
            type: "gems",
            amount: 25,
            text: "25 GEMS",
            icon: "💎",
            chance: 15
        },

        {
            id: 6,
            type: "gems",
            amount: 50,
            text: "50 GEMS",
            icon: "💎",
            chance: 10
        },

        {
            id: 7,
            type: "gems",
            amount: 75,
            text: "75 GEMS",
            icon: "💎",
            chance: 7.5
        },

        {
            id: 8,
            type: "gems",
            amount: 100,
            text: "100 GEMS",
            icon: "💎",
            chance: 5
        },

        {
            id: 9,
            type: "none",
            amount: 0,
            text: "NONE",
            icon: "❌",
            chance: 25
        }

    ];


    /* =====================================================
       SPINS
    ===================================================== */

    const MAX_CASE_SPINS = 3;

    let caseSpinsUsed =
        Number(
            localStorage.getItem(
                "caseSpinsUsed"
            )
        ) || 0;


    /* =====================================================
       DATE
    ===================================================== */

    function getBratislavaDate() {

        const parts =
            new Intl.DateTimeFormat(
                "en-GB",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).formatToParts(new Date());


        const year =
            parts.find(
                p => p.type === "year"
            ).value;

        const month =
            parts.find(
                p => p.type === "month"
            ).value;

        const day =
            parts.find(
                p => p.type === "day"
            ).value;


        return `${year}-${month}-${day}`;
    }


    /* =====================================================
       DAILY RESET
    ===================================================== */

    function checkCaseDailyReset() {

        const today =
            getBratislavaDate();

        const savedDate =
            localStorage.getItem(
                "caseResetDate"
            );


        if (savedDate !== today) {

            caseSpinsUsed = 0;


            localStorage.setItem(
                "caseSpinsUsed",
                "0"
            );


            localStorage.setItem(
                "caseResetDate",
                today
            );

        }

    }


    /* =====================================================
       UPDATE SPINS
    ===================================================== */

    function updateCaseSpins() {

        const remaining =
            MAX_CASE_SPINS -
            caseSpinsUsed;


        caseSpins.textContent =
            `SPINS: ${remaining} / ${MAX_CASE_SPINS}`;


        openCaseButton.disabled =
            remaining <= 0;

    }


    /* =====================================================
       CREATE CARD
    ===================================================== */

    function createCaseReward(reward) {

        const card =
            document.createElement("div");

        card.className =
            "case-reward";


        const icon =
            document.createElement("div");

        icon.className =
            "case-reward-icon";

        icon.textContent =
            reward.icon;


        const text =
            document.createElement("div");

        text.className =
            "case-reward-text";

        text.textContent =
            reward.text;


        card.appendChild(icon);

        card.appendChild(text);


        return card;
    }


    /* =====================================================
       BUILD TRACK
    ===================================================== */

    function buildCaseTrack() {

        caseTrack.innerHTML = "";


        for (
            let i = 0;
            i < 60;
            i++
        ) {

            const reward =
                caseRewards[
                    Math.floor(
                        Math.random() *
                        caseRewards.length
                    )
                ];


            caseTrack.appendChild(
                createCaseReward(reward)
            );

        }

    }


    /* =====================================================
       WEIGHTED RANDOM
    ===================================================== */

    function getRandomCaseReward() {

        const random =
            Math.random() * 100;

        let total = 0;


        for (
            const reward of caseRewards
        ) {

            total += reward.chance;


            if (
                random < total
            ) {

                return reward;

            }

        }


        return caseRewards[
            caseRewards.length - 1
        ];

    }


 /* =====================================================
   GIVE REWARD
===================================================== */

function giveCaseReward(reward) {

    if (reward.type === "coins") {

        money += reward.amount;

        // Count case coins toward coin achievements
        totalCoinsEarned += reward.amount;
    }

    if (reward.type === "gems") {

        gems += reward.amount;

        // Count case gems toward gem achievements
        totalGemsEarned += reward.amount;
    }

    saveGame();

    updateDisplay();

    // Check achievements after receiving case reward
    checkCoinAchievements();
    checkGemAchievements();

    updateCoinAchievements();
    updateGemAchievements();
}


    /* =====================================================
       OPEN CASE
    ===================================================== */

    openCaseButton.addEventListener(
        "click",
        function () {

            checkCaseDailyReset();


            if (
                caseSpinsUsed >=
                MAX_CASE_SPINS
            ) {

                return;

            }


            openCaseButton.disabled =
                true;


            caseResult.textContent =
                "";


            caseSpinsUsed++;


            localStorage.setItem(
                "caseSpinsUsed",
                caseSpinsUsed
            );


            updateCaseSpins();


            const winner =
                getRandomCaseReward();


            buildCaseTrack();


            const cards =
                caseTrack.children;


            const winnerIndex = 50;


            cards[winnerIndex].replaceWith(
                createCaseReward(winner)
            );


            const cardWidth =
                90 + 8;


            const windowWidth =
                document.querySelector(
                    ".case-window"
                ).clientWidth;


            const centerOffset =
                (windowWidth / 2) -
                (90 / 2);


            const targetX =
                -(
                    winnerIndex *
                    cardWidth
                ) +
                centerOffset;


            caseTrack.style.transition =
                "none";


            caseTrack.style.transform =
                "translateX(0px)";


            void caseTrack.offsetWidth;


            caseTrack.style.transition =
                "transform 5s cubic-bezier(0.08, 0.6, 0.12, 1)";


            caseTrack.style.transform =
                `translateX(${targetX}px)`;


            setTimeout(
                function () {

                    giveCaseReward(
                        winner
                    );


                    caseResult.textContent =
                        `YOU WON: ${winner.icon} ${winner.text}`;


                    updateCaseSpins();


                },
                5200
            );

        }
    );


    /* =====================================================
       OPEN POPUP
    ===================================================== */

    dailyCaseButton.addEventListener(
        "click",
        function () {

            checkCaseDailyReset();

            updateCaseSpins();

            caseOpeningSection.classList.add(
                "active"
            );

        }
    );


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    closeCaseButton.addEventListener(
        "click",
        function () {

            caseOpeningSection.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    checkCaseDailyReset();

    buildCaseTrack();

    updateCaseSpins();

}

/* =========================
   MILESTONES
========================= */

const milestonesButton =
    document.getElementById("milestonesButton");

const milestonesOverlay =
    document.getElementById("milestonesOverlay");

const closeMilestones =
    document.getElementById("closeMilestones");


/* OPEN MILESTONES */

milestonesButton.addEventListener("click", () => {

    milestonesOverlay.style.display = "flex";

});


/* CLOSE MILESTONES */

closeMilestones.addEventListener("click", () => {

    milestonesOverlay.style.display = "none";

});


/* CLOSE WHEN CLICKING OUTSIDE */

milestonesOverlay.addEventListener("click", (event) => {

    if (event.target === milestonesOverlay) {

        milestonesOverlay.style.display = "none";

    }

});

/* =========================================================
   MILESTONE PROGRESS
========================================================= */

const MILESTONE_TARGET = 50000000;

const milestoneBarFill =
    document.getElementById("milestoneBarFill");

const milestoneProgressText =
    document.getElementById("milestoneProgressText");


/* =========================================================
   UPDATE MILESTONE PROGRESS
========================================================= */

function updateMilestoneProgress() {

    if (
        !milestoneBarFill ||
        !milestoneProgressText
    ) {
        return;
    }


    /*
       Use TOTAL COINS EARNED.

       This means spending coins does NOT
       reduce the milestone progress.
    */

    const total =
        Number(totalCoinsEarned) || 0;


    /*
       How many coins have been earned
       toward the CURRENT 50M milestone.
    */

    const currentProgress =
        total % MILESTONE_TARGET;


    /*
       Percentage for vertical bar.
    */

    const percentage =
        (currentProgress / MILESTONE_TARGET) * 100;


    milestoneBarFill.style.height =
        `${percentage}%`;


    milestoneProgressText.textContent =
        `${formatMilestoneNumber(currentProgress)} / 50M`;

}


/* =========================================================
   FORMAT MILESTONE NUMBER
========================================================= */

function formatMilestoneNumber(number) {

    if (number >= 1000000) {

        return (
            (number / 1000000)
                .toFixed(1)
                .replace(".0", "")
            + "M"
        );

    }

    if (number >= 1000) {

        return (
            (number / 1000)
                .toFixed(1)
                .replace(".0", "")
            + "K"
        );

    }

    return Math.floor(number);

}

/* =========================================================
   CHECK MILESTONE REWARD
========================================================= */

function checkMilestoneReward() {

    const total =
        Number(totalCoinsEarned) || 0;


    const savedMilestones =
        Number(
            localStorage.getItem(
                "milestonesCompleted"
            )
        ) || 0;


    const earnedMilestones =
        Math.floor(
            total / MILESTONE_TARGET
        );


    if (
        earnedMilestones >
        savedMilestones
    ) {

        const difference =
            earnedMilestones -
            savedMilestones;


        /*
           +100 TAP POWER
           +100 COINS PER SECOND

           For EVERY completed 50M milestone.
        */

        power +=
            difference * 100;

        perSecond +=
            difference * 100;


        localStorage.setItem(
            "milestonesCompleted",
            earnedMilestones
        );


        saveGame();

        updateDisplay();

    }

}

/* =========================================================
   FALLING BONUS TOKEN
========================================================= */

let fallingTokenActive = false;


/* =========================================================
   SPAWN TOKEN
========================================================= */

function spawnFallingToken() {

    /*
       Prevent multiple tokens
    */

    if (fallingTokenActive) {
        return;
    }


    fallingTokenActive = true;


    /*
       CREATE TOKEN
    */

    const token =
        document.createElement("div");


    token.className =
        "falling-token";


    token.textContent =
        "🥮";


    /*
       RANDOM HORIZONTAL POSITION
    */

    const randomLeft =
    Math.random() * 90 + 5;

token.style.left =
    `${randomLeft}%`;

    document.body.appendChild(token);


    /*
       REMOVE AFTER 10 SECONDS
    */

    const removeToken =
        setTimeout(() => {

            if (token.parentNode) {

                token.remove();

            }


            fallingTokenActive =
                false;


        }, 10000);


    /*
       CLICK TOKEN
    */

    token.addEventListener(
        "click",
        function () {


            /*
               PREVENT DOUBLE CLICK
            */

            if (!fallingTokenActive) {
                return;
            }


            clearTimeout(removeToken);


            fallingTokenActive =
                false;


            /*
               GET TOKEN POSITION
            */

            const rect =
                token.getBoundingClientRect();


            /*
               REMOVE TOKEN
            */

            token.remove();


/* =========================
   GIVE TOKEN
========================= */

tokens += 1;

/* =========================
   DAILY QUEST
========================= */

collectFallingTokenForQuest();

localStorage.setItem(
    "tokens",
    tokens
);


/* =========================
   UPDATE TOKEN DISPLAY
========================= */

document.getElementById(
    "tokens"
).textContent =
    formatNumber(tokens);


/* =========================
   SAVE GAME
========================= */

saveGame();


            /*
               SHOW +1 COINS
            */

            const popup =
                document.createElement("div");


            popup.className =
                "token-reward-popup";


            popup.textContent =
                "+1 🥮";


            popup.style.left =
                `${rect.left}px`;


            popup.style.top =
                `${rect.top}px`;


            document.body.appendChild(
                popup
            );


            /*
               REMOVE POPUP
            */

            setTimeout(
                () => {

                    popup.remove();

                },
                1000
            );


        }
    );

}


/* =========================================================
   RANDOM TOKEN TIMER
========================================================= */

function scheduleFallingToken() {

    /*
       RANDOM TIME:
       2 TO 5 MINUTES
    */

    const delay =
        (
            Math.random() *
            (5 - 2) +
            2
        ) *
        60 *
        1000;


    setTimeout(
        () => {

            spawnFallingToken();

            scheduleFallingToken();

        },
        delay
    );

}


/* =========================================================
   START TOKEN SYSTEM
========================================================= */

scheduleFallingToken();

/* =========================================================
   TOKEN SHOP UPGRADES
========================================================= */

const buyTokenTapPower =
    document.getElementById("buyTokenTapPower");

const buyTokenCPS =
    document.getElementById("buyTokenCPS");



/* =========================================================
   BUY +10 TAP POWER
========================================================= */

buyTokenTapPower.addEventListener(
    "click",
    function () {

        /* NOT ENOUGH TOKENS */

        if (tokens < 10) {
            return;
        }


        /* REMOVE 10 TOKENS */

        tokens -= 10;


        /* +10 TAP POWER */

        power += 10;


        /* SAVE TOKENS */

        localStorage.setItem(
            "tokens",
            tokens
        );


        /* UPDATE TOKEN DISPLAY */

        document.getElementById(
            "tokens"
        ).textContent =
            formatNumber(tokens);


        /* UPDATE GAME */

        updateDisplay();

        saveGame();


        /* =================================================
           COMPLETE DAILY QUEST
        ================================================= */

        completeTokenTapPowerQuest();

    }
);



/* =========================================================
   BUY +10 CPS
========================================================= */

buyTokenCPS.addEventListener(
    "click",
    function () {

        /* NOT ENOUGH TOKENS */

        if (tokens < 10) {
            return;
        }


        /* REMOVE 10 TOKENS */

        tokens -= 10;


        /* +10 COINS PER SECOND */

        perSecond += 10;


        /* SAVE TOKENS */

        localStorage.setItem(
            "tokens",
            tokens
        );


        /* UPDATE TOKEN DISPLAY */

        document.getElementById(
            "tokens"
        ).textContent =
            formatNumber(tokens);


        /* UPDATE GAME */

        updateDisplay();

        saveGame();


        /* =================================================
           COMPLETE DAILY QUEST
        ================================================= */

        completeTokenCPSQuest();

    }
);

/* =========================================================
   FIELD
========================================================= */

const fieldButton = document.getElementById("fieldButton");
const fieldOverlay = document.getElementById("fieldOverlay");
const fieldReturnButton = document.getElementById("fieldReturnButton");


/* =========================================================
   OPEN FIELD
========================================================= */

if (fieldButton && fieldOverlay) {

    fieldButton.addEventListener("click", function () {

        console.log("FIELD CLICKED");

        fieldOverlay.style.setProperty(
            "display",
            "block",
            "important"
        );

        fieldOverlay.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        fieldOverlay.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        fieldOverlay.style.setProperty(
            "z-index",
            "999999999",
            "important"
        );

        console.log("ENTERING FIELD");

        console.log(
            "OVERLAY DISPLAY:",
            fieldOverlay.style.display
        );

        console.log(
            "OVERLAY COMPUTED:",
            window.getComputedStyle(fieldOverlay).display
        );

    });

}


/* =========================================================
   RETURN FROM FIELD
========================================================= */

if (fieldReturnButton && fieldOverlay) {

    fieldReturnButton.addEventListener("click", function () {

        console.log("RETURN BUTTON CLICKED");

        fieldOverlay.style.display = "none";

        console.log("FIELD CLOSED");

    });

}

/* =========================================================
   MARKET WINDOW
========================================================= */

const fieldMarketButton =
    document.getElementById("fieldMarketButton");

const marketWindow =
    document.getElementById("marketWindow");

const marketCloseButton =
    document.getElementById("marketCloseButton");


/* OPEN MARKET */

if (fieldMarketButton && marketWindow) {

    fieldMarketButton.addEventListener("click", function () {

        console.log("MARKET OPENED");

        marketWindow.style.display = "block";

    });

}


/* CLOSE MARKET */

if (marketCloseButton && marketWindow) {

    marketCloseButton.addEventListener("click", function () {

        console.log("MARKET CLOSED");

        marketWindow.style.display = "none";

    });

}

/* =========================================================
   BUY SEEDS
========================================================= */

const buyRiceSeed =
    document.getElementById("buyRiceSeed");

const buyPotatoSeed =
    document.getElementById("buyPotatoSeed");

const buyCornSeed =
    document.getElementById("buyCornSeed");


/* =========================================================
   BUY RICE SEED - 10,000
========================================================= */

if (buyRiceSeed) {

    buyRiceSeed.addEventListener(
        "click",
        function () {

            const cost = 10000;


            if (money < cost) {
                return;
            }


            money -= cost;

            riceSeeds += 1;


            saveGame();

            updateDisplay();

            updateInventory();

        }
    );

}


/* =========================================================
   BUY POTATO SEED - 20,000
========================================================= */

if (buyPotatoSeed) {

    buyPotatoSeed.addEventListener(
        "click",
        function () {

            const cost = 20000;


            if (money < cost) {
                return;
            }


            money -= cost;

            potatoSeeds += 1;


            saveGame();

            updateDisplay();

            updateInventory();

        }
    );

}


/* =========================================================
   BUY CORN SEED - 30,000
========================================================= */

if (buyCornSeed) {

    buyCornSeed.addEventListener(
        "click",
        function () {

            const cost = 30000;


            if (money < cost) {
                return;
            }


            money -= cost;

            cornSeeds += 1;


            saveGame();

            updateDisplay();

            updateInventory();

        }
    );

}

function updateFieldCoins() {

    const fieldCoinsAmount =
        document.getElementById("fieldCoinsAmount");

    if (!fieldCoinsAmount) return;

    fieldCoinsAmount.textContent =
        formatNumber(money);
}

/* =========================================================
   FIELD PLOTS
========================================================= */

const fieldPlots =
    document.getElementById("fieldPlots");

/* =========================================================
   CREATE 81 FIELD PLOTS
========================================================= */

if (fieldPlots) {

    fieldPlots.innerHTML = "";


    for (let i = 1; i <= 81; i++) {

        const plot =
            document.createElement("button");


        plot.className =
            "fieldPlot";


        plot.dataset.plot =
            i;


        /* =================================================
           PLOT PRICE
        ================================================= */

        const cost =
            i * 1000000;


        plot.dataset.cost =
            cost;


        /* =================================================
           UNLOCKED
        ================================================= */

        if (
            unlockedFieldPlots.includes(i)
        ) {

            plot.classList.add(
                "unlocked"
            );

            plot.innerHTML = `
                <span>🌱</span>
            `;

        }


        /* =================================================
           LOCKED
        ================================================= */

        else {

            plot.classList.add(
                "locked"
            );

            plot.innerHTML = `
                <span>🔒</span>
                <small>
                    ${formatNumber(cost)} 🪙
                </small>
            `;

        }


        fieldPlots.appendChild(
            plot
        );

    }

    /* =====================================================
       RESTORE SAVED FIELD STATE
    ====================================================== */

    updateFieldPlots();

}

/* =========================================================
   FIELD CLICK
========================================================= */

if (fieldPlots) {

    fieldPlots.addEventListener(
        "click",
        function (event) {

            const plot =
                event.target.closest(
                    ".fieldPlot"
                );

            if (!plot) {
                return;
            }


            const plotNumber =
                Number(
                    plot.dataset.plot
                );


            /* =================================================
               LOCKED PLOT
            ================================================= */

            if (
                plot.classList.contains(
                    "locked"
                )
            ) {

                const cost =
                    Number(
                        plot.dataset.cost
                    );


                /* NOT ENOUGH COINS */

                if (money < cost) {
                    return;
                }


                /* PAY */

                money -= cost;


                /* UNLOCK */

                plot.classList.remove(
                    "locked"
                );

                plot.classList.add(
                    "unlocked"
                );


                /* SAVE UNLOCKED PLOT */

                if (
                    !unlockedFieldPlots.includes(
                        plotNumber
                    )
                ) {

                    unlockedFieldPlots.push(
                        plotNumber
                    );

                }


                localStorage.setItem(
                    "unlockedFieldPlots",
                    JSON.stringify(
                        unlockedFieldPlots
                    )
                );


                /* SHOW EMPTY PLOT */

        saveGame();

updateDisplay();

updateFieldPlots();

return;
}

            /* =================================================
               UNLOCKED PLOT
            ================================================= */

            const crop =
                fieldCrops[plotNumber];


            /* =================================================
               CROP EXISTS
            ================================================= */

            if (crop) {

                if (
                    Date.now() >=
                    crop.readyAt
                ) {

                    harvestCrop(
                        plotNumber
                    );

                }

                return;
            }


            /* =================================================
               EMPTY UNLOCKED PLOT
            ================================================= */

         selectedPlantingPlot = plotNumber;

inventoryPopup.style.display = "block";

updateInventory();

        }
    );

}

/* =========================================================
   INVENTORY
========================================================= */

const fieldInventoryButton =
    document.getElementById(
        "fieldInventoryButton"
    );

const inventoryPopup =
    document.getElementById(
        "inventoryPopup"
    );

const closeInventoryButton =
    document.getElementById(
        "closeInventoryButton"
    );


/* OPEN INVENTORY */

if (
    fieldInventoryButton &&
    inventoryPopup
) {

    fieldInventoryButton.addEventListener(
        "click",
        function () {

            inventoryPopup.style.display =
                "block";

            updateInventory();

        }
    );

}


/* CLOSE INVENTORY */

if (
    closeInventoryButton &&
    inventoryPopup
) {

    closeInventoryButton.addEventListener(
        "click",
        function () {

            inventoryPopup.style.display =
                "none";

        }
    );

}

/* =========================================================
   UPDATE INVENTORY
========================================================= */

function updateInventory() {

    const inventoryRiceSeed =
        document.getElementById(
            "inventoryRiceSeed"
        );

    const inventoryPotatoSeed =
        document.getElementById(
            "inventoryPotatoSeed"
        );

    const inventoryCornSeed =
        document.getElementById(
            "inventoryCornSeed"
        );


    const inventoryRice =
        document.getElementById(
            "inventoryRice"
        );

    const inventoryPotato =
        document.getElementById(
            "inventoryPotato"
        );

    const inventoryCorn =
        document.getElementById(
            "inventoryCorn"
        );


    if (inventoryRiceSeed) {
        inventoryRiceSeed.textContent =
            riceSeeds;
    }


    if (inventoryPotatoSeed) {
        inventoryPotatoSeed.textContent =
            potatoSeeds;
    }


    if (inventoryCornSeed) {
        inventoryCornSeed.textContent =
            cornSeeds;
    }


    if (inventoryRice) {
        inventoryRice.textContent =
            rice;
    }


    if (inventoryPotato) {
        inventoryPotato.textContent =
            potato;
    }


    if (inventoryCorn) {
        inventoryCorn.textContent =
            corn;
    }

}

/* =========================================================
   INITIAL INVENTORY UPDATE
========================================================= */

updateInventory();

/* =========================================================
   INVENTORY SEED CLICK
========================================================= */

const inventoryRiceSeedItem =
    document.getElementById(
        "inventoryRiceSeedItem"
    );

const inventoryPotatoSeedItem =
    document.getElementById(
        "inventoryPotatoSeedItem"
    );

const inventoryCornSeedItem =
    document.getElementById(
        "inventoryCornSeedItem"
    );


/* =================================================
   RICE SEED
================================================= */

if (inventoryRiceSeedItem) {

    inventoryRiceSeedItem.addEventListener(
        "click",
        function () {

            if (
                selectedPlantingPlot === null
            ) {
                return;
            }


            plantCrop(
                selectedPlantingPlot,
                "rice"
            );


            selectedPlantingPlot =
                null;


            inventoryPopup.style.display =
                "none";

        }
    );

}


/* =================================================
   POTATO SEED
================================================= */

if (inventoryPotatoSeedItem) {

    inventoryPotatoSeedItem.addEventListener(
        "click",
        function () {

            if (
                selectedPlantingPlot === null
            ) {
                return;
            }


            plantCrop(
                selectedPlantingPlot,
                "potato"
            );


            selectedPlantingPlot =
                null;


            inventoryPopup.style.display =
                "none";

        }
    );

}


/* =================================================
   CORN SEED
================================================= */

if (inventoryCornSeedItem) {

    inventoryCornSeedItem.addEventListener(
        "click",
        function () {

            if (
                selectedPlantingPlot === null
            ) {
                return;
            }


            plantCrop(
                selectedPlantingPlot,
                "corn"
            );


            selectedPlantingPlot =
                null;


            inventoryPopup.style.display =
                "none";

        }
    );

}

/* =========================================================
   PLANT CROP
========================================================= */

function plantCrop(plotNumber, cropType) {

    /* ALREADY PLANTED */

    if (fieldCrops[plotNumber]) {
        return;
    }


    /* CHECK SEEDS */

    if (cropType === "rice") {

        if (riceSeeds <= 0) {
            return;
        }

        riceSeeds--;

    }


    if (cropType === "potato") {

        if (potatoSeeds <= 0) {
            return;
        }

        potatoSeeds--;

    }


    if (cropType === "corn") {

        if (cornSeeds <= 0) {
            return;
        }

        cornSeeds--;

    }


    /* SAVE CROP */

    fieldCrops[plotNumber] = {

        crop: cropType,

        plantedAt: Date.now(),

  readyAt:
            Date.now() +
            getCropGrowTime(cropType)

    };


    /* SAVE */

    saveGame();

    updateInventory();

    updateFieldPlots();

}

 /* =========================================================
   GET CROP GROW TIME
========================================================= */

function getCropGrowTime(cropType) {

    let growTime =
       3 * 60 * 60 * 1000;


    /* RICE */

    if (cropType === "rice") {

        growTime -=
            riceGrowUpgrades *
            60 *
            1000;

    }


    /* POTATO */

    if (cropType === "potato") {

        growTime -=
            potatoGrowUpgrades *
            60 *
            1000;

    }


    /* CORN */

    if (cropType === "corn") {

        growTime -=
            cornGrowUpgrades *
            60 *
            1000;

    }


    /* MINIMUM = 1 MINUTE */

    return Math.max(
        60 * 1000,
        growTime
    );

}

/* =========================================================
   UPDATE FIELD PLOTS
========================================================= */

function updateFieldPlots() {

    const plots =
        document.querySelectorAll(
            ".fieldPlot"
        );


    plots.forEach(function (plot) {

        const plotNumber =
            Number(
                plot.dataset.plot
            );


        /* =================================================
           LOCKED PLOT
        ================================================= */

        if (
            !unlockedFieldPlots.includes(
                plotNumber
            )
        ) {

            plot.classList.remove(
                "unlocked"
            );

            plot.classList.add(
                "locked"
            );


            const cost =
                Number(
                    plot.dataset.cost
                );


            plot.innerHTML = `
                <span>🔒</span>
                <small>
                    ${formatNumber(cost)} 🪙
                </small>
            `;


            plot.dataset.ready =
                "false";


            return;
        }


        /* =================================================
           UNLOCKED PLOT
        ================================================= */

        plot.classList.remove(
            "locked"
        );

        plot.classList.add(
            "unlocked"
        );


        const crop =
            fieldCrops[plotNumber];


        /* =================================================
           EMPTY PLOT
        ================================================= */

        if (!crop) {

            plot.innerHTML = `
                <span>🌱</span>
            `;


            plot.dataset.ready =
                "false";


            return;
        }


        /* =================================================
           CHECK GROWING / READY
        ================================================= */

        const ready =
            Date.now() >=
            crop.readyAt;


        plot.dataset.ready =
            ready
                ? "true"
                : "false";


        /* =================================================
           READY TO HARVEST
        ================================================= */

        if (ready) {

            if (
                crop.crop === "rice"
            ) {

                plot.innerHTML = `
                    <span>🌾</span>
                    <small>HARVEST</small>
                `;

            }


            else if (
                crop.crop === "potato"
            ) {

                plot.innerHTML = `
                    <span>🥔</span>
                    <small>HARVEST</small>
                `;

            }


            else if (
                crop.crop === "corn"
            ) {

                plot.innerHTML = `
                    <span>🌽</span>
                    <small>HARVEST</small>
                `;

            }

        }


        /* =================================================
           STILL GROWING
        ================================================= */

        else {

            if (
                crop.crop === "rice"
            ) {

                plot.innerHTML = `
                    <span>🌾</span>
                    <small>GROWING</small>
                `;

            }


            else if (
                crop.crop === "potato"
            ) {

                plot.innerHTML = `
                    <span>🥔</span>
                    <small>GROWING</small>
                `;

            }


            else if (
                crop.crop === "corn"
            ) {

                plot.innerHTML = `
                    <span>🌽</span>
                    <small>GROWING</small>
                `;

            }

        }

    });

}

/* =========================================================
   HARVEST CROP
========================================================= */

function harvestCrop(plotNumber) {

    const crop =
        fieldCrops[plotNumber];


    if (!crop) {
        return;
    }


    /* NOT READY */

    if (
        Date.now() <
        crop.readyAt
    ) {
        return;
    }


    /* SAVE CROP TYPE */

    const cropType =
        crop.crop;


    /* =================================================
       GIVE CROP
    ================================================= */

    if (cropType === "rice") {

        rice++;

 /* DAILY QUEST - HARVEST 50 RICE */

    collectRiceForQuest(1);

    }


    if (cropType === "potato") {

        potato++;

 collectPotatoForQuest(1);

    }


    if (cropType === "corn") {

        corn++;

collectCornForQuest(1);

    }


    /* =================================================
       SHOW +1 POPUP
    ================================================= */

    showFarmReward(
        plotNumber,
        cropType
    );


    /* =================================================
       REMOVE FROM FIELD
    ================================================= */

    delete fieldCrops[plotNumber];


    /* =================================================
       SAVE
    ================================================= */

    saveGame();


    /* =================================================
       UPDATE
    ================================================= */

    updateInventory();

    updateFieldPlots();

}


/* =========================================================
   UPDATE FIELD EVERY SECOND
========================================================= */

setInterval(
    function () {

        updateFieldPlots();

    },
    1000
);

/* =========================================================
   FARM REWARD POPUP
========================================================= */

function showFarmReward(
    plotNumber,
    cropType
) {

    const plot =
        document.querySelector(
            `.fieldPlot[data-plot="${plotNumber}"]`
        );


    if (!plot) {
        return;
    }


    const popup =
        document.createElement("div");


    popup.className =
        "farmRewardPopup";


    let icon = "";
    let name = "";


    if (cropType === "rice") {

        icon = "🍚";
        name = "RICE";

    }


    else if (cropType === "potato") {

        icon = "🥔";
        name = "POTATO";

    }


    else if (cropType === "corn") {

        icon = "🌽";
        name = "CORN";

    }


    popup.innerHTML = `
        +1 ${name} ${icon}
    `;


    document.body.appendChild(
        popup
    );


    const rect =
        plot.getBoundingClientRect();


    popup.style.left =
        `${rect.left + rect.width / 2}px`;


    popup.style.top =
        `${rect.top}px`;


    setTimeout(
        function () {

            popup.remove();

        },
        1000
    );

}

/* =========================================================
   FIELD SEEDS BUTTON
========================================================= */

const fieldSeedsButton =
    document.getElementById(
        "fieldSeedsButton"
    );

const seedsPopup =
    document.getElementById(
        "seedsPopup"
    );

const closeSeedsButton =
    document.getElementById(
        "closeSeedsButton"
    );


/* =========================================================
   OPEN SEEDS
========================================================= */

if (
    fieldSeedsButton &&
    seedsPopup
) {

    fieldSeedsButton.addEventListener(
        "click",
        function () {

            seedsPopup.style.display =
                "block";

        }
    );

}


/* =========================================================
   CLOSE SEEDS
========================================================= */

if (
    closeSeedsButton &&
    seedsPopup
) {

    closeSeedsButton.addEventListener(
        "click",
        function () {

            seedsPopup.style.display =
                "none";

        }
    );

}

/* =========================================================
   SEED GROW TIME UPGRADES
========================================================= */

const riceGrowUpgrade =
    document.getElementById(
        "riceGrowUpgrade"
    );

const potatoGrowUpgrade =
    document.getElementById(
        "potatoGrowUpgrade"
    );

const cornGrowUpgrade =
    document.getElementById(
        "cornGrowUpgrade"
    );

/* =========================================================
   RICE UPGRADE
========================================================= */

if (riceGrowUpgrade) {

    riceGrowUpgrade.addEventListener(
        "click",
        function () {

            /* MAX UPGRADES */

            if (
                riceGrowUpgrades >=
                MAX_SEED_GROW_UPGRADES
            ) {
                return;
            }


            /* NOT ENOUGH COINS */

            if (
                money <
                RICE_GROW_UPGRADE_COST
            ) {
                return;
            }


            /* PAY */

            money -=
                RICE_GROW_UPGRADE_COST;


            /* +1 RICE GROW UPGRADE */

            riceGrowUpgrades++;


            /* SAVE */

            localStorage.setItem(
                "riceGrowUpgrades",
                riceGrowUpgrades
            );


            /* UPDATE */

            saveGame();

            updateDisplay();

            updateSeedUpgrades();


            /* =================================================
               DAILY QUEST #11
            ================================================= */

            completeRiceGrowQuest();

        }
    );

}



/* =========================================================
   POTATO UPGRADE
========================================================= */

if (potatoGrowUpgrade) {

    potatoGrowUpgrade.addEventListener(
        "click",
        function () {

            /* MAX UPGRADES */

            if (
                potatoGrowUpgrades >=
                MAX_SEED_GROW_UPGRADES
            ) {
                return;
            }


            /* NOT ENOUGH COINS */

            if (
                money <
                POTATO_GROW_UPGRADE_COST
            ) {
                return;
            }


            /* PAY */

            money -=
                POTATO_GROW_UPGRADE_COST;


            /* +1 POTATO GROW UPGRADE */

            potatoGrowUpgrades++;


            /* SAVE */

            localStorage.setItem(
                "potatoGrowUpgrades",
                potatoGrowUpgrades
            );


            /* UPDATE */

            saveGame();

            updateDisplay();

            updateSeedUpgrades();


            /* =================================================
               DAILY QUEST #12
            ================================================= */

            completePotatoGrowQuest();

        }
    );

}

/* =========================================================
   CORN UPGRADE
========================================================= */

if (cornGrowUpgrade) {

    cornGrowUpgrade.addEventListener(
        "click",
        function () {

            if (
                cornGrowUpgrades >=
                MAX_SEED_GROW_UPGRADES
            ) {
                return;
            }


            if (
                money <
                CORN_GROW_UPGRADE_COST
            ) {
                return;
            }


            money -=
                CORN_GROW_UPGRADE_COST;


            cornGrowUpgrades++;


            localStorage.setItem(
                "cornGrowUpgrades",
                cornGrowUpgrades
            );


            saveGame();

            updateDisplay();

            updateSeedUpgrades();

            completeCornGrowQuest();
        }
    );

}

/* =========================================================
   UPDATE SEED UPGRADES
========================================================= */

function updateSeedUpgrades() {

    const riceInfo =
        document.getElementById(
            "riceGrowUpgradeInfo"
        );

    const potatoInfo =
        document.getElementById(
            "potatoGrowUpgradeInfo"
        );

    const cornInfo =
        document.getElementById(
            "cornGrowUpgradeInfo"
        );


    const riceCost =
        document.getElementById(
            "riceGrowUpgradeCost"
        );

    const potatoCost =
        document.getElementById(
            "potatoGrowUpgradeCost"
        );

    const cornCost =
        document.getElementById(
            "cornGrowUpgradeCost"
        );


    /* RICE */

    if (riceInfo) {

        riceInfo.textContent =
            `${riceGrowUpgrades} / 120 • -1 min each`;

    }


    if (riceCost) {

        riceCost.textContent =
            riceGrowUpgrades >= 120
                ? "MAX"
                : "1M 🪙";

    }


    /* POTATO */

    if (potatoInfo) {

        potatoInfo.textContent =
            `${potatoGrowUpgrades} / 120 • -1 min each`;

    }


    if (potatoCost) {

        potatoCost.textContent =
            potatoGrowUpgrades >= 120
                ? "MAX"
                : "2M 🪙";

    }


    /* CORN */

    if (cornInfo) {

        cornInfo.textContent =
            `${cornGrowUpgrades} / 120 • -1 min each`;

    }


    if (cornCost) {

        cornCost.textContent =
            cornGrowUpgrades >= 120
                ? "MAX"
                : "3M 🪙";

    }


    /* MAX CLASS */

    if (
        riceGrowUpgrades >= 120
    ) {

        riceGrowUpgrade.classList.add(
            "maxed"
        );

    }


    if (
        potatoGrowUpgrades >= 120
    ) {

        potatoGrowUpgrade.classList.add(
            "maxed"
        );

    }


    if (
        cornGrowUpgrades >= 120
    ) {

        cornGrowUpgrade.classList.add(
            "maxed"
        );

    }

}

/* =========================================================
   INITIAL SEED UPGRADE UPDATE
========================================================= */

updateSeedUpgrades();

/* =========================================================
   SEEDS UPGRADES POPUP
========================================================= */

const fieldSeedsUpgradesButton =
    document.getElementById(
        "fieldSeedsUpgradesButton"
    );

const seedsUpgradesPopup =
    document.getElementById(
        "seedsUpgradesPopup"
    );

const closeSeedsUpgradesButton =
    document.getElementById(
        "closeSeedsUpgradesButton"
    );


/* =========================================================
   OPEN SEEDS UPGRADES
========================================================= */

if (
    fieldSeedsUpgradesButton &&
    seedsUpgradesPopup
) {

    fieldSeedsUpgradesButton.addEventListener(
        "click",
        function () {

            seedsUpgradesPopup.style.display =
                "block";

            updateSeedUpgrades();

        }
    );

}


/* =========================================================
   CLOSE SEEDS UPGRADES
========================================================= */

if (
    closeSeedsUpgradesButton &&
    seedsUpgradesPopup
) {

    closeSeedsUpgradesButton.addEventListener(
        "click",
        function () {

            seedsUpgradesPopup.style.display =
                "none";

        }
    );

}

/* =========================================================
   SOUP UPGRADES
========================================================= */

/* =========================================================
   RICE SOUP
   COST: 100 RICE
========================================================= */

const riceSoupUpgrade =
    document.getElementById("riceSoupUpgrade");

if (riceSoupUpgrade) {

    riceSoupUpgrade.addEventListener(
        "click",
        function () {

            if (rice < 100) {
                return;
            }

            rice -= 100;

            riceSoupLevel++;

            /* +12 TAP POWER */
            power += 12;

            /* +1% TAP POWER */
            tapBonus += 1;

            localStorage.setItem(
                "riceSoupLevel",
                riceSoupLevel
            );

            saveGame();

            updateDisplay();
            updateInventory();
            updateSeedUpgrades();

            completeRiceSoupQuest();
        }
    );

}


/* =========================================================
   POTATO SOUP
   COST: 100 POTATO
========================================================= */

const potatoSoupUpgrade =
    document.getElementById(
        "potatoSoupUpgrade"
    );

if (potatoSoupUpgrade) {

    potatoSoupUpgrade.addEventListener(
        "click",
        function () {

            if (potato < 100) {
                return;
            }

            potato -= 100;

            potatoSoupLevel++;

            /* +12 CPS */
            perSecond += 12;

            /* +1% TOTAL BONUS */
            soupBonus += 1;

            localStorage.setItem(
                "potatoSoupLevel",
                potatoSoupLevel
            );

            localStorage.setItem(
                "soupBonus",
                soupBonus
            );

            saveGame();

            updateDisplay();
            updateInventory();
            updateSeedUpgrades();

            completePotatoSoupQuest();
        }
    );

}


/* =========================================================
   CORN SOUP
   COST: 100 CORN
========================================================= */

const cornSoupUpgrade =
    document.getElementById(
        "cornSoupUpgrade"
    );

if (cornSoupUpgrade) {

    cornSoupUpgrade.addEventListener(
        "click",
        function () {

            if (corn < 100) {
                return;
            }

            corn -= 100;

            cornSoupLevel++;

            /* +15 CPS */
            perSecond += 15;

            /* +0.5% TAP POWER */
            tapBonus += 0.5;

            /* +0.5% TOTAL BONUS */
            soupBonus += 0.5;

            localStorage.setItem(
                "cornSoupLevel",
                cornSoupLevel
            );

            localStorage.setItem(
                "soupBonus",
                soupBonus
            );

            saveGame();

            updateDisplay();
            updateInventory();
            updateSeedUpgrades();

            completeCornSoupQuest();
        }
    );

}
/*
const statsBonusElement =
    document.getElementById("statsBonus");

if (statsBonusElement) {

    const observer =
        new MutationObserver(function () {

            console.log(
                "🚨 statsBonus CHANGED TO:",
                statsBonusElement.textContent
            );

            console.trace();

        });

    observer.observe(
        statsBonusElement,
        {
            childList: true,
            characterData: true,
            subtree: true
        }
    );
}
*/
/* =========================================================
   DAY / NIGHT CYCLE
========================================================= */

const dayNightOverlay =
    document.getElementById(
        "dayNightOverlay"
    );


/* =========================================================
   NIGHT SHOP
========================================================= */

const nightShopButton =
    document.getElementById(
        "nightShopButton"
    );


/* =========================================================
   CYCLE DURATIONS
========================================================= */

const DAY_DURATION =
    12 * 60 * 1000;

const NIGHT_DURATION =
    12 * 60 * 1000;

const FULL_CYCLE =
    DAY_DURATION +
    NIGHT_DURATION;


/* =========================================================
   UPDATE DAY / NIGHT
========================================================= */

function updateDayNightCycle() {

    if (!dayNightOverlay) {
        return;
    }


    const cycleTime =
        Date.now() %
        FULL_CYCLE;


    let darkness = 0;


    /* =====================================================
       DAY
    ===================================================== */

    if (cycleTime < DAY_DURATION) {

        darkness = 0;


        /* NIGHT SHOP HIDDEN */

        if (nightShopButton) {

            nightShopButton.style.display =
                "none";

        }

    }


    /* =====================================================
       NIGHT
    ===================================================== */

    else {

        const nightProgress =
            (cycleTime - DAY_DURATION) /
            NIGHT_DURATION;


        /* =================================================
           SHOW NIGHT SHOP
        ================================================= */

        if (nightShopButton) {

            nightShopButton.style.display =
                "block";

        }


        /* =================================================
           SUNSET
        ================================================= */

        if (nightProgress < 0.5) {

            darkness =
                (nightProgress / 0.5) *
                0.55;

        }


        /* =================================================
           SUNRISE
        ================================================= */

        else {

            darkness =
                (
                    1 -
                    (
                        (nightProgress - 0.5) /
                        0.5
                    )
                ) *
                0.55;

        }

    }


    /* =====================================================
       APPLY DARKNESS
    ===================================================== */

    dayNightOverlay.style.background =
        `rgba(0, 0, 30, ${darkness})`;

}


/* =========================================================
   START CYCLE
========================================================= */

updateDayNightCycle();


setInterval(
    updateDayNightCycle,
    1000
);

/* =========================================================
   NIGHT SHOP
========================================================= */

const nightShopOverlay =
    document.getElementById("nightShopOverlay");

const closeNightShop =
    document.getElementById("closeNightShop");


/* =========================================================
   OPEN NIGHT SHOP
========================================================= */

if (nightShopButton && nightShopOverlay) {

    nightShopButton.addEventListener(
        "click",
        function () {

            nightShopOverlay.style.display =
                "flex";

        }
    );

}


/* =========================================================
   CLOSE NIGHT SHOP
========================================================= */

if (closeNightShop && nightShopOverlay) {

    closeNightShop.addEventListener(
        "click",
        function () {

            nightShopOverlay.style.display =
                "none";

        }
    );

}


/* =========================================================
   CLICK OUTSIDE
========================================================= */

if (nightShopOverlay) {

    nightShopOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                nightShopOverlay
            ) {

                nightShopOverlay.style.display =
                    "none";

            }

        }
    );

}

/* =========================================================
   NIGHT LILY CURRENCY
========================================================= */

let nightLilies =
    Number(
        localStorage.getItem("nightLilies")
    ) || 0;


/* =========================================================
   NIGHT LILY ELEMENT
========================================================= */

const nightLilyAmount =
    document.getElementById(
        "nightLilyAmount"
    );


/* =========================================================
   UPDATE NIGHT LILY DISPLAY
========================================================= */

function updateNightLilyDisplay() {

    const nightLilyAmount =
        document.getElementById(
            "nightLilyAmount"
        );

    if (!nightLilyAmount) {
        return;
    }

    nightLilyAmount.textContent =
        formatNumber(nightLilies);
}


/* =========================================================
   SAVE NIGHT LILIES
========================================================= */

function saveNightLilies() {

    localStorage.setItem(
        "nightLilies",
        nightLilies
    );

}


/* =========================================================
   CONVERT COINS → NIGHT LILY
========================================================= */

const convertNightLilyButton =
    document.getElementById(
        "convertNightLilyButton"
    );


if (convertNightLilyButton) {

    convertNightLilyButton.addEventListener(
        "click",
        function () {

            const conversionCost =
                1000000;


            /* NOT ENOUGH COINS */

            if (money < conversionCost) {

                convertNightLilyButton
                    .classList.add(
                        "notEnough"
                    );

                setTimeout(
                    function () {

                        convertNightLilyButton
                            .classList.remove(
                                "notEnough"
                            );

                    },
                    300
                );

                return;
            }


            /* PAY COINS */

            money -= conversionCost;


            /* GIVE NIGHT LILY */

            nightLilies += 1;


            /* SAVE */

            saveNightLilies();

            saveGame();


            /* UPDATE */

            updateNightLilyDisplay();

            updateDisplay();

        }
    );

}


/* =========================================================
   INITIAL NIGHT LILY DISPLAY
========================================================= */

updateNightLilyDisplay();

/* =========================================================
   NIGHT SHOP TABS
========================================================= */

const nightConvertTab =
    document.getElementById(
        "nightConvertTab"
    );

const nightItemsTab =
    document.getElementById(
        "nightShopItemsTab"
    );

const nightConvertPage =
    document.getElementById(
        "nightConvertPage"
    );

const nightItemsPage =
    document.getElementById(
        "nightItemsPage"
    );


/* =========================================================
   CONVERT PAGE
========================================================= */

if (
    nightConvertTab &&
    nightItemsTab &&
    nightConvertPage &&
    nightItemsPage
) {

    nightConvertTab.addEventListener(
        "click",
        function () {

            nightConvertPage.style.display =
                "block";

            nightItemsPage.style.display =
                "none";


            nightConvertTab.classList.add(
                "active"
            );

            nightItemsTab.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       SHOP PAGE
    ===================================================== */

    nightItemsTab.addEventListener(
        "click",
        function () {

            nightConvertPage.style.display =
                "none";

            nightItemsPage.style.display =
                "block";


            nightConvertTab.classList.remove(
                "active"
            );

            nightItemsTab.classList.add(
                "active"
            );

        }
    );

}

/* =========================================================
   NIGHT SHOP UPGRADES
========================================================= */


/* =========================
   TAP UPGRADE
========================= */

let nightTapUpgradeCost =
    Number(
        localStorage.getItem(
            "nightTapUpgradeCost"
        )
    ) || 10;


/* =========================
   CPS UPGRADE
========================= */

let nightCpsUpgradeCost =
    Number(
        localStorage.getItem(
            "nightCpsUpgradeCost"
        )
    ) || 10;


/* =========================
   LOAD LEVELS
========================= */

let nightTapUpgradeLevel =
    Number(
        localStorage.getItem(
            "nightTapUpgradeLevel"
        )
    ) || 0;


let nightCpsUpgradeLevel =
    Number(
        localStorage.getItem(
            "nightCpsUpgradeLevel"
        )
    ) || 0;


/* =========================
   BUTTONS
========================= */

const buyNightTapUpgrade =
    document.getElementById(
        "buyNightTapUpgrade"
    );

const buyNightCpsUpgrade =
    document.getElementById(
        "buyNightCpsUpgrade"
    );


/* =========================
   COST DISPLAYS
========================= */

const nightTapUpgradeCostDisplay =
    document.getElementById(
        "nightTapUpgradeCost"
    );

const nightCpsUpgradeCostDisplay =
    document.getElementById(
        "nightCpsUpgradeCost"
    );


/* =========================
   UPDATE UPGRADES
========================= */

function updateNightShopUpgrades() {

    if (nightTapUpgradeCostDisplay) {

        nightTapUpgradeCostDisplay.textContent =
            nightTapUpgradeCost;
    }


    if (nightCpsUpgradeCostDisplay) {

        nightCpsUpgradeCostDisplay.textContent =
            nightCpsUpgradeCost;
    }

}

/* =========================
   INITIAL PRICE DISPLAY
========================= */

updateNightShopUpgrades();

function updateNightShop() {

    const nightLilyAmount =
        document.getElementById("nightLilyAmount");

    if (nightLilyAmount) {

        nightLilyAmount.textContent =
            formatNumber(nightLilies);

    }

}

/* =========================
   BUY MOON POWER
========================= */

if (buyNightTapUpgrade) {

    buyNightTapUpgrade.addEventListener(
        "click",
        function () {

            /* NOT ENOUGH NIGHT LILIES */

            if (
                nightLilies <
                nightTapUpgradeCost
            ) {
                return;
            }


            /* PAY */

            nightLilies -=
                nightTapUpgradeCost;


            /* +20 BASE TAP POWER */

            power += 20;


            /* +1.5% TAP BONUS */

            tapBonus += 1.5;


            /* LEVEL */

            nightTapUpgradeLevel++;


            /* NEXT COST */

            nightTapUpgradeCost++;


            /* SAVE */

            localStorage.setItem(
                "nightLilies",
                nightLilies
            );

            localStorage.setItem(
                "nightTapUpgradeCost",
                nightTapUpgradeCost
            );

            localStorage.setItem(
                "nightTapUpgradeLevel",
                nightTapUpgradeLevel
            );

            localStorage.setItem(
                "tapBonus",
                tapBonus
            );


            /* UPDATE */

            saveGame();

            updateDisplay();

            updateStats();

            updateNightShop();

            updateNightShopUpgrades();


            /* =========================
               DAILY QUEST #9
            ========================= */

            completeMoonPowerQuest();

        }
    );

}



/* =========================
   BUY NIGHT INCOME
========================= */

if (buyNightCpsUpgrade) {

    buyNightCpsUpgrade.addEventListener(
        "click",
        function () {

            /* NOT ENOUGH NIGHT LILIES */

            if (
                nightLilies <
                nightCpsUpgradeCost
            ) {
                return;
            }


            /* PAY */

            nightLilies -=
                nightCpsUpgradeCost;


            /* +20 BASE CPS */

            perSecond += 20;


            /* +1.5% TOTAL BONUS */

            nightBonus += 1.5;


            /* LEVEL */

            nightCpsUpgradeLevel++;


            /* NEXT COST */

            nightCpsUpgradeCost++;


            /* SAVE */

            localStorage.setItem(
                "nightLilies",
                nightLilies
            );

            localStorage.setItem(
                "nightCpsUpgradeCost",
                nightCpsUpgradeCost
            );

            localStorage.setItem(
                "nightCpsUpgradeLevel",
                nightCpsUpgradeLevel
            );

            localStorage.setItem(
                "nightBonus",
                nightBonus
            );


            /* UPDATE */

            saveGame();

            updateDisplay();

            updateStats();

            updateNightShop();

            updateNightShopUpgrades();


            /* =========================
               DAILY QUEST #10
            ========================= */

            completeNightIncomeQuest();

        }
    );

}

/* =========================================================
   MONEY SHOP
========================================================= */

const moneyShopButton =
    document.getElementById("moneyShopButton");

const moneyShop =
    document.getElementById("moneyShop");

moneyShopButton.addEventListener(
    "click",
    function () {

        /* Hide main buttons */

        document
            .querySelectorAll(".shop-button")
            .forEach(function (button) {

                button.style.display = "none";

            });


        /* Hide other shops */

        hideAllShopPages();


        /* Show Money Shop */

        moneyShop.classList.remove("hidden");

    }
);


/* =========================================================
   BACK FROM MONEY SHOP
========================================================= */

backFromMoneyShop.addEventListener(
    "click",
    function () {

        moneyShop.classList.add("hidden");

        showMainShopButtons();

    }
);

/* =========================================================
   TON GEM SHOP BUTTONS
========================================================= */

document
    .getElementById("buy100Gems")
    ?.addEventListener(
        "click",
        function () {

            buyGemsWithTON(100);

        }
    );


document
    .getElementById("buy250Gems")
    ?.addEventListener(
        "click",
        function () {

            buyGemsWithTON(250);

        }
    );


document
    .getElementById("buy500Gems")
    ?.addEventListener(
        "click",
        function () {

            buyGemsWithTON(500);

        }
    );


document
    .getElementById("buy1000Gems")
    ?.addEventListener(
        "click",
        function () {

            buyGemsWithTON(1000);

        }
    );