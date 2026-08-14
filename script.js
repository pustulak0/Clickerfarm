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

    /* =========================
   COIN BONUS
========================= */

let coinBonus =
    Number(localStorage.getItem("coinBonus")) || 0;
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
    localStorage.setItem("money", money);
    localStorage.setItem("power", power);
    localStorage.setItem("farmers", farmers);
    localStorage.setItem("perSecond", perSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("farmerCost", farmerCost);
    localStorage.setItem("energy", energy);

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
   UPDATE UI
========================= */

function updateDisplay() {

    moneyDisplay.textContent =
        Math.floor(money).toLocaleString();

    powerDisplay.textContent =
        power;

    farmersDisplay.textContent =
        farmers;

    perSecondDisplay.textContent =
        perSecond;

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

energy -= 1;



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

        farmerCost =
            Math.floor(farmerCost * 1.5);

        updateDisplay();

        saveGame();
    }
);


/* =========================
   PASSIVE INCOME
========================= */

setInterval(
    function () {

        if (perSecond > 0) {

          const bonusMultiplier =
    1 + (coinBonus / 100);

const passiveCoins =
    perSecond * bonusMultiplier;

money += passiveCoins;

totalCoinsEarned += passiveCoins;

updateDisplay();

saveGame();
        }

    },
    1000
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

setInterval(function () {

    totalTimePlayed++;

    localStorage.setItem(
        "totalTimePlayed",
        totalTimePlayed
    );

    updateStats();

}, 1000);
/* =========================
   UPDATE STATS
========================= */

function updateStats() {
const statsBonusElement =
    document.getElementById("statsBonus");

if (statsBonusElement) {

    statsBonusElement.textContent =
        "+" + coinBonus + "%";

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
            Math.floor(totalCoinsEarned)
                .toLocaleString();

    }


    /* Coins per second */

    if (coinsPerSecondElement) {

        coinsPerSecondElement.textContent =
            perSecond;

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

async function connectTelegramUser() {

    /* Check if Telegram is available */

    if (!window.Telegram || !window.Telegram.WebApp) {

        console.log("Not running inside Telegram.");

        return;

    }


    const tg = window.Telegram.WebApp;


    /* Tell Telegram the Mini App is ready */

    tg.ready();


    /* Expand the Mini App */

    tg.expand();


    /* Get Telegram's secure initialization data */

    const initData = tg.initData;


    if (!initData) {

        console.log(
            "Telegram initData not available."
        );

        return;

    }


    console.log(
        "Telegram data received."
    );


    try {

       fetch(
    "http://localhost:3000/api/user",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            initData: initData
        })
    }
)
.then(response => response.json())
.then(data => {

    if (!data.success) {
        console.error("User loading failed:", data.error);
        return;
    }

    console.log("User loaded:", data.user);

    // REAL referral link from server
    referralLink.textContent =
        data.referralLink;

    // REAL referral count from server
    referralCount.textContent =
        data.referralCount;

})
.catch(error => {

    console.error(
        "Server connection error:",
        error
    );

});


        const data =
            await response.json();


        if (!response.ok) {

            console.log(
                "Server rejected Telegram user:",
                data
            );

            return;

        }


        console.log(
            "Telegram user connected:",
            data.user
        );


        /* Save Telegram user locally */

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


/* Start connection */

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
                "YOUR_SERVER_URL/api/user",
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