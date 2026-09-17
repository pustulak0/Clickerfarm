/* =========================
   LOAD ENVIRONMENT
========================= */

require("dotenv").config();


/* =========================
   IMPORTS
========================= */
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { validate } = require("@telegram-apps/init-data-node");
const { default: TelegramBot } = require("node-telegram-bot-api");


const {
    Address,
    Cell,
    beginCell,
    storeMessage
} = require("@ton/core");

const {
    loadMessage
} = require("@ton/ton");
const { TonClient } = require("@ton/ton");

/* =========================
   ENVIRONMENT
========================= */

const BOT_TOKEN = process.env.BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

console.log(
    "Bot token loaded:",
    !!BOT_TOKEN
);

console.log(
    "Supabase URL loaded:",
    !!SUPABASE_URL
);

console.log(
    "Supabase key loaded:",
    !!SUPABASE_KEY
);


/* =========================
   SUPABASE
========================= */

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");


/* =========================
   TELEGRAM BOT
========================= */

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});
bot.on("polling_error", (error) => {
    console.error("Polling error:", error.message);
});

bot.on("error", (error) => {
    console.error("Bot error:", error.message);
});

bot.on("message", (msg) => {
    console.log(
        "MESSAGE RECEIVED:",
        msg.chat.id,
        msg.text
    );
});
console.log("Telegram bot started");


/* =========================
   EXPRESS SERVER
========================= */

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   VERIFY TELEGRAM INIT DATA
========================= */

function verifyTelegramUser(initData) {

    console.log(
        "Telegram initData received:",
        !!initData
    );

    if (!initData) {

        console.log(
            "❌ Telegram initData is missing"
        );

        return false;
    }

    console.log(
        "Telegram initData length:",
        initData.length
    );

    console.log(
        "BOT_TOKEN exists:",
        !!BOT_TOKEN
    );


    try {

        validate(
            initData,
            BOT_TOKEN
        );

        console.log(
            "✅ Telegram initData verified"
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Telegram verification failed:",
            error.message
        );

        return false;
    }
}

/* =========================
   GET USER FROM SUPABASE
========================= */

async function getUser(telegramId) {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", String(telegramId))
        .maybeSingle();

    if (error) {

        console.error(
            "Get user error:",
            error.message
        );

        throw error;
    }

    return data;
}


/* =========================
   CREATE USER
========================= */

async function createUser(
    telegramId,
    username
) {

    const referralCode =
        String(telegramId);

    const { data, error } =
        await supabase
            .from("users")
            .insert({
                telegram_id: String(telegramId),
                username: username || "",
                referral_code: referralCode,
                created_at: Date.now()
            })
            .select("*")
            .single();

    if (error) {

        console.error(
            "Create user error:",
            error.message
        );

        throw error;
    }

    return data;
}


/* =========================
   GET OR CREATE USER
========================= */

async function getOrCreateUser(
    telegramId,
    username
) {

    let user =
        await getUser(telegramId);

    if (!user) {

        user =
            await createUser(
                telegramId,
                username
            );
    }

    return user;
}


/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {

    res.send(
        "Clicker Farm server is running!"
    );

});


/* =========================
   CREATE / GET USER
========================= */

app.post("/api/user", async (req, res) => {

    try {

        const { initData } =
            req.body;
        
        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");


        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        const username =
            telegramUser.username || "";


        /* =========================
           GET / CREATE USER
        ========================= */

        const user =
            await getOrCreateUser(
                telegramId,
                username
            );

/* =====================================
   CHECK TODAY'S 10,000 COIN QUEST
===================================== */

const today =
    new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Europe/Bratislava",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    ).format(new Date());

const {
    data: coinQuestClaim,
    error: coinQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "earn10000Coins")
    .eq("claim_date", today)
    .maybeSingle();

if (coinQuestClaimError) {

    console.error(
        "Coin quest claim check error:",
        coinQuestClaimError
    );

}

const coinQuestCompleted =
    !!coinQuestClaim;

console.log("MOON POWER VALUES FROM SUPABASE:");
console.log(
    "night_tap_upgrade_cost:",
    user.night_tap_upgrade_cost
);

/* =========================================================
   ONLINE QUEST DAILY RESET
========================================================= */

let onlineQuestMinutes =
    Number(user.online_quest_minutes) || 0;

let onlineQuestDate =
    user.online_quest_date;


/* =========================
   RESET IF NEW DAY
========================= */

if (
    onlineQuestDate !== today
) {

    onlineQuestMinutes = 0;

    const {
        error: onlineResetError
    } = await supabase
        .from("users")
        .update({
            online_quest_minutes: 0,
            online_quest_date: today
        })
        .eq(
            "telegram_id",
            telegramId
        );

    if (onlineResetError) {

        console.error(
            "Online quest daily reset error:",
            onlineResetError
        );

    }

}

/* =====================================
   CHECK TODAY'S 60 MINUTE QUEST
===================================== */

const {
    data: onlineQuestClaim,
    error: onlineQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "online60")
    .eq("claim_date", today)
    .maybeSingle();

if (onlineQuestClaimError) {

    console.error(
        "Online quest claim check error:",
        onlineQuestClaimError
    );

}

const onlineQuestCompleted =
    !!onlineQuestClaim;

/* =====================================
   CHECK TODAY'S TOKEN TAP POWER QUEST
===================================== */

const {
    data: tokenTapPowerQuestClaim,
    error: tokenTapPowerQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tokenTapPower")
    .eq("claim_date", today)
    .maybeSingle();

if (tokenTapPowerQuestClaimError) {

    console.error(
        "Token Tap Power quest claim check error:",
        tokenTapPowerQuestClaimError
    );

}

const tokenTapPowerQuestCompleted =
    !!tokenTapPowerQuestClaim;

/* =====================================
   CHECK TODAY'S TOKEN CPS QUEST
===================================== */

const {
    data: tokenCPSQuestClaim,
    error: tokenCPSQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tokenCPS")
    .eq("claim_date", today)
    .maybeSingle();

if (tokenCPSQuestClaimError) {

    console.error(
        "Token CPS quest claim check error:",
        tokenCPSQuestClaimError
    );

}

const tokenCPSQuestCompleted =
    !!tokenCPSQuestClaim;

/* =====================================
   CHECK TODAY'S FALLING TOKEN
===================================== */

const {
    data: fallingTokensQuestClaim,
    error: fallingTokensQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "fallingTokens")
    .eq("claim_date", today)
    .maybeSingle();

if (fallingTokensQuestClaimError) {
    console.error(
        "Falling Tokens quest claim check error:",
        fallingTokensQuestClaimError
    );
}

const fallingTokensQuestCompleted =
    !!fallingTokensQuestClaim;

/* =====================================
   CHECK TODAY'S HARVEST 50 RICE
===================================== */

const {
    data: riceHarvestQuestClaim,
    error: riceHarvestQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "riceHarvest50")
    .eq("claim_date", today)
    .maybeSingle();

if (riceHarvestQuestClaimError) {
    console.error(
        "Rice harvest quest claim check error:",
        riceHarvestQuestClaimError
    );
}

const riceHarvestQuestCompleted =
    !!riceHarvestQuestClaim;

/* =====================================
   CHECK TODAY'S HARVEST 50 POTATO
===================================== */

const {
    data: potatoHarvestQuestClaim,
    error: potatoHarvestQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "potatoHarvest50")
    .eq("claim_date", today)
    .maybeSingle();

if (potatoHarvestQuestClaimError) {
    console.error(
        "Potato harvest quest claim check error:",
        potatoHarvestQuestClaimError
    );
}

const potatoHarvestQuestCompleted =
    !!potatoHarvestQuestClaim;

/* =====================================
   CHECK TODAY'S HARVEST 50 CORN
===================================== */

const {
    data: cornHarvestQuestClaim,
    error: cornHarvestQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "cornHarvest50")
    .eq("claim_date", today)
    .maybeSingle();

if (cornHarvestQuestClaimError) {
    console.error(
        "Corn harvest quest claim check error:",
        cornHarvestQuestClaimError
    );
}

const cornHarvestQuestCompleted =
    !!cornHarvestQuestClaim;

/* =====================================
   CHECK TODAY'S MOON POWER
===================================== */

const {
    data: moonPowerQuestClaim,
    error: moonPowerQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "moonPower")
    .eq("claim_date", today)
    .maybeSingle();

if (moonPowerQuestClaimError) {
    console.error(
        "Moon Power quest claim check error:",
        moonPowerQuestClaimError
    );
}

const moonPowerQuestCompleted =
    !!moonPowerQuestClaim;

/* =====================================
   CHECK TODAY'S NIGHT INCOME
===================================== */

const {
    data: nightIncomeQuestClaim,
    error: nightIncomeQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "nightIncome")
    .eq("claim_date", today)
    .maybeSingle();

if (nightIncomeQuestClaimError) {
    console.error(
        "Night Income quest claim check error:",
        nightIncomeQuestClaimError
    );
}

const nightIncomeQuestCompleted =
    !!nightIncomeQuestClaim;

/* =====================================
   CHECK TODAY'S RICE SOUP QUEST
===================================== */

const {
    data: riceSoupQuestClaim,
    error: riceSoupQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "riceSoup")
    .eq("claim_date", today)
    .maybeSingle();

if (riceSoupQuestClaimError) {
    console.error(
        "Rice Soup quest claim check error:",
        riceSoupQuestClaimError
    );
}

const riceSoupQuestCompleted =
    !!riceSoupQuestClaim;

/* =====================================
   CHECK TODAY'S POTATO SOUP QUEST
===================================== */

const {
    data: potatoSoupQuestClaim,
    error: potatoSoupQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "potatoSoup")
    .eq("claim_date", today)
    .maybeSingle();

if (potatoSoupQuestClaimError) {
    console.error(
        "Potato Soup quest claim check error:",
        potatoSoupQuestClaimError
    );
}

const potatoSoupQuestCompleted =
    !!potatoSoupQuestClaim;

/* =====================================
   CHECK TODAY'S CORN SOUP QUEST
===================================== */

const {
    data: cornSoupQuestClaim,
    error: cornSoupQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "cornSoup")
    .eq("claim_date", today)
    .maybeSingle();

if (cornSoupQuestClaimError) {
    console.error(
        "Corn Soup quest claim check error:",
        cornSoupQuestClaimError
    );
}

const cornSoupQuestCompleted =
    !!cornSoupQuestClaim;

/* =====================================
   CHECK TODAY'S 500 CLICKS QUEST
===================================== */

const {
    data: clickQuestClaim,
    error: clickQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "click500")
    .eq("claim_date", today)
    .maybeSingle();

if (clickQuestClaimError) {
    console.error(
        "Click 500 quest claim check error:",
        clickQuestClaimError
    );
}

const clickQuestCompleted =
    !!clickQuestClaim;

/* =====================================
   CHECK TODAY'S FARMER QUEST
===================================== */

const {
    data: farmerQuestClaim,
    error: farmerQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "farmer")
    .eq("claim_date", today)
    .maybeSingle();

if (farmerQuestClaimError) {

    console.error(
        "Farmer quest claim check error:",
        farmerQuestClaimError
    );

}

const farmerDailyQuestCompleted =
    !!farmerQuestClaim;

/* =====================================
   CHECK TODAY'S NEWBIE QUEST
===================================== */

const {
    data: newbieQuestClaim,
    error: newbieQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "newbie")
    .eq("claim_date", today)
    .maybeSingle();

if (newbieQuestClaimError) {

    console.error(
        "Newbie quest claim check error:",
        newbieQuestClaimError
    );

}

const newbieDailyQuestCompleted =
    !!newbieQuestClaim;

/* =====================================
   CHECK TODAY'S TAP POWER QUESTS
===================================== */

const {
    data: tapPower1QuestClaim,
    error: tapPower1QuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tapPower1")
    .eq("claim_date", today)
    .maybeSingle();

if (tapPower1QuestClaimError) {
    console.error(
        "Tap Power 1 quest claim check error:",
        tapPower1QuestClaimError
    );
}

const tapPower1QuestCompleted =
    !!tapPower1QuestClaim;


const {
    data: tapPower2QuestClaim,
    error: tapPower2QuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tapPower2")
    .eq("claim_date", today)
    .maybeSingle();

if (tapPower2QuestClaimError) {
    console.error(
        "Tap Power 2 quest claim check error:",
        tapPower2QuestClaimError
    );
}

const tapPower2QuestCompleted =
    !!tapPower2QuestClaim;


const {
    data: tapPower3QuestClaim,
    error: tapPower3QuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tapPower3")
    .eq("claim_date", today)
    .maybeSingle();

if (tapPower3QuestClaimError) {
    console.error(
        "Tap Power 3 quest claim check error:",
        tapPower3QuestClaimError
    );
}

const tapPower3QuestCompleted =
    !!tapPower3QuestClaim;


const {
    data: tapPower4QuestClaim,
    error: tapPower4QuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tapPower4")
    .eq("claim_date", today)
    .maybeSingle();

if (tapPower4QuestClaimError) {
    console.error(
        "Tap Power 4 quest claim check error:",
        tapPower4QuestClaimError
    );
}

const tapPower4QuestCompleted =
    !!tapPower4QuestClaim;


const {
    data: tapPower5QuestClaim,
    error: tapPower5QuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "tapPower5")
    .eq("claim_date", today)
    .maybeSingle();

if (tapPower5QuestClaimError) {
    console.error(
        "Tap Power 5 quest claim check error:",
        tapPower5QuestClaimError
    );
}

const tapPower5QuestCompleted =
    !!tapPower5QuestClaim;

/* =====================================
   CHECK TODAY'S ENERGY UPGRADE QUEST
===================================== */

const {
    data: energyUpgradeQuestClaim,
    error: energyUpgradeQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "energyUpgrade")
    .eq("claim_date", today)
    .maybeSingle();

if (energyUpgradeQuestClaimError) {

    console.error(
        "Energy upgrade quest claim check error:",
        energyUpgradeQuestClaimError
    );

}

const energyUpgradeQuestCompleted =
    !!energyUpgradeQuestClaim;

/* =====================================
   CHECK TODAY'S LUCKY COIN QUEST
===================================== */

const {
    data: luckyCoinsQuestClaim,
    error: luckyCoinsQuestClaimError
} = await supabase
    .from("daily_quest_claims")
    .select("id")
    .eq("telegram_id", telegramId)
    .eq("quest_id", "luckyCoins")
    .eq("claim_date", today)
    .maybeSingle();

if (luckyCoinsQuestClaimError) {

    console.error(
        "Lucky coin quest claim check error:",
        luckyCoinsQuestClaimError
    );

}

const luckyCoinsQuestCompleted =
    !!luckyCoinsQuestClaim;

/* =========================
   DAILY ENERGY REFILLS
   EUROPE / BRATISLAVA
========================= */

const todayBratislava =
    new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone:
                "Europe/Bratislava",

            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    ).format(new Date());

let serverEnergyRefillsUsed = 0;

if (
    user.energy_refills_date ===
    todayBratislava
) {

    serverEnergyRefillsUsed =
        Number(
            user.energy_refills_used
        ) || 0;

} else {

    serverEnergyRefillsUsed = 0;

}

/* =========================================================
   DAILY CASE RESET
========================================================= */

let serverDailyCaseSpinsUsed = 0;

if (
    user.daily_case_date ===
    todayBratislava
) {
    serverDailyCaseSpinsUsed =
        Number(
            user.daily_case_spins_used
        ) || 0;
} else {
    serverDailyCaseSpinsUsed = 0;
}

console.log(
    "night_tap_upgrade_level:",
    user.night_tap_upgrade_level
);

console.log("FARMER DATA:", {
    farmers: user.farmers,
    perSecond: user.per_second,
    farmerCosts: user.farmer_costs
});

console.log("TAP POWER DATA:", {
    tapPowerCosts: user.tap_power_costs
});

console.log("================================");
console.log("USER LOADED FROM SUPABASE");
console.log("Telegram ID:", user.telegram_id);
console.log("Referral Count:", user.referral_count);
console.log("Coin Bonus:", user.coin_bonus);
console.log("Stat Bonus:", user.stat_bonus);
console.log("Referred By:", user.referred_by);
console.log("================================");

console.log("🖱️ CLICK QUEST DATE DEBUG:", {
    today,
    storedClickQuestDate: user.click_quest_date,
    storedClickQuestCount: user.click_quest_count
});

res.json({
    success: true,
    user: user,

    referralLink:
        `https://t.me/ClickerFarmingbot?start=ref_${user.referral_code}`,

    referralCount:
        user.referral_count || 0,

    coinQuestCount:
    user.coin_quest_count || 0,

newbieDailyQuestCompleted:
    newbieDailyQuestCompleted,

tapPower1QuestCompleted:
    tapPower1QuestCompleted,

tapPower2QuestCompleted:
    tapPower2QuestCompleted,

tapPower3QuestCompleted:
    tapPower3QuestCompleted,

tapPower4QuestCompleted:
    tapPower4QuestCompleted,

tapPower5QuestCompleted:
    tapPower5QuestCompleted,

energyUpgradeQuestCompleted:
    energyUpgradeQuestCompleted,

onlineQuestMinutes:
    onlineQuestMinutes,

onlineQuestDate:
    onlineQuestDate,

onlineQuestCompleted:
    onlineQuestCompleted,

    coinQuestCompleted:
    coinQuestCompleted,

farmerDailyQuestCompleted:
    farmerDailyQuestCompleted,

luckyCoinsQuestCompleted:
    luckyCoinsQuestCompleted,

tokenCPSQuestCompleted:
    tokenCPSQuestCompleted,

tokenTapPowerQuestCompleted:
    tokenTapPowerQuestCompleted,

energyRefillsUsed:
    serverEnergyRefillsUsed,

dailyCaseSpinsUsed:
    serverDailyCaseSpinsUsed,

dailyCaseDate:
    user.daily_case_date,

clickQuestCount:
    user.click_quest_date === today
        ? Number(
            user.click_quest_count
          ) || 0
        : 0,

clickQuestCompleted:
    clickQuestCompleted,

    coinBonus:
        user.coin_bonus || 0,

    statBonus:
        user.stat_bonus || 0,

    tonBonus:
        user.ton_bonus || 0,

    cpsBonus:
        user.cps_bonus || 0,

    

    coins:
    user.coins || 0,

    tokenCPSQuestCompleted:
    tokenCPSQuestCompleted,

   fallingTokenQuestCount:
    user.falling_token_quest_date === today
        ? Number(
            user.falling_token_quest_count
          ) || 0
        : 0,

fallingTokensQuestCompleted:
    fallingTokensQuestCompleted,

riceSoupQuestCount:
    Number(
        user.rice_soup_quest_count
    ) || 0,

riceSoupQuestCompleted:
    riceSoupQuestCompleted,

potatoSoupQuestCount:
    Number(
        user.potato_soup_quest_count
    ) || 0,

cornSoupQuestCount:
    Number(
        user.corn_soup_quest_count
    ) || 0,

cornSoupQuestCompleted:
    cornSoupQuestCompleted,

potatoSoupQuestCompleted:
    potatoSoupQuestCompleted,

riceHarvestQuestCount:
    user.rice_harvest_quest_date === today
        ? Number(
            user.rice_harvest_quest_count
          ) || 0
        : 0,

    riceHarvestQuestCompleted:
    riceHarvestQuestCompleted,

potatoHarvestQuestCount:
    user.potato_harvest_quest_date === today
        ? Number(
            user.potato_harvest_quest_count
          ) || 0
        : 0,

potatoHarvestQuestCompleted:
    potatoHarvestQuestCompleted,

cornHarvestQuestCount:
    user.corn_harvest_quest_date === today
        ? Number(
            user.corn_harvest_quest_count
          ) || 0
        : 0,

moonPowerQuestCount:
    Number(
        user.moon_power_quest_count
    ) || 0,

nightIncomeQuestCount:
    Number(
        user.night_income_quest_count
    ) || 0,

nightIncomeQuestCompleted:
    nightIncomeQuestCompleted,

moonPowerQuestCompleted:
    moonPowerQuestCompleted,

cornHarvestQuestCompleted:
    cornHarvestQuestCompleted,

    tapBonus:
        user.tap_bonus || 0,

    nightTapUpgradeCost:
    user.night_tap_upgrade_cost || 10,

    nightTapUpgradeLevel:
    user.night_tap_upgrade_level || 0,

    tapPower:
    user.tap_power || 1,

    energyUpgradeCost:
    user.energy_upgrade_cost || 5000,

    luckyCoinMultiplier:
    user.lucky_coin_multiplier || 0,

    luckyCoinMultiplierCost:
    user.lucky_coin_multiplier_cost || 5000,

    nightLilies:
    user.night_lilies || 0,

    nightBonus: 
    user.night_bonus || 0,

    nightCpsUpgradeLevel:
    user.night_cps_upgrade_level || 0,

    nightCpsUpgradeCost:
    user.night_cps_upgrade_cost || 10,

    rice: 
    user.rice || 0,

    riceSeeds:
    user.rice_seeds || 0,

    potatoSeeds:
    user.potato_seeds || 0,

    cornSeeds:
    user.corn_seeds || 0,

    riceSoupLevel: 
    user.rice_soup_level || 0,

    fieldCrops:
    user.field_crops || {},

    unlockedFieldPlots:
    user.unlocked_field_plots || [],

    riceGrowUpgrades:
    user.rice_grow_upgrades || 0,

    potatoGrowUpgrades:
    user.potato_grow_upgrades || 0,

    cornGrowUpgrades:
    user.corn_grow_upgrades || 0,

    farmers: 
    user.farmers || 0,

    perSecond: 
    user.per_second || 0,

    tokenTapPowerQuestCompleted:
    tokenTapPowerQuestCompleted,

    farmerCosts: 
    user.farmer_costs || [100, 250, 500, 1000, 2500],

    tapPowerCosts:
    user.tap_power_costs ||  [100, 250, 500, 1000, 2500],

        gems:
        user.gems || 0,

    totalGemsEarned:
        user.total_gems_earned || 0,

    totalGemsBonus:
        user.total_gems_bonus || 0,

    gemsAchievement100:
        user.gems_achievement_100 || false,

    gemsAchievement250:
        user.gems_achievement_250 || false,

    gemsAchievement500:
        user.gems_achievement_500 || false,

    gemsAchievement1000:
        user.gems_achievement_1000 || false,

    gemsAchievement1750:
        user.gems_achievement_1750 || false,

    gemsAchievement3000:
        user.gems_achievement_3000 || false,

    gemsAchievement5000:
        user.gems_achievement_5000 || false,

    gemsAchievement7500:
        user.gems_achievement_7500 || false,

    gemsAchievement11000:
        user.gems_achievement_11000 || false,

/* =========================
   COIN ACHIEVEMENTS
========================= */

coinsAchievement1m:
    user.coins_achievement_1m || false,

coinsAchievement10m:
    user.coins_achievement_10m || false,

coinsAchievement25m:
    user.coins_achievement_25m || false,

coinsAchievement75m:
    user.coins_achievement_75m || false,

coinsAchievement225m:
    user.coins_achievement_225m || false,

coinsAchievement750m:
    user.coins_achievement_750m || false,

coinsAchievement1b:
    user.coins_achievement_1b || false,

coinsAchievement5b:
    user.coins_achievement_5b || false,

coinsAchievement10b:
    user.coins_achievement_10b || false,

    resetVersion:
        user.reset_version || 0
});
  

    } catch (error) {

        console.error(
            "API user error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   SAVE PLAYER STATS
========================= */

app.post("/api/stats", async (req, res) => {

    try {

        const {
            initData,
            totalClicks
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE TOTAL CLICKS
        ========================= */

        const safeClicks =
            Number(totalClicks);

        if (
            !Number.isFinite(safeClicks)
        ) {

            return res.status(400).json({
                error: "Invalid total clicks"
            });

        }


        /* =========================
           UPDATE TOTAL CLICKS ONLY
        ========================= */

        const { data, error } =
            await supabase
                .from("users")
                .update({

                    total_clicks:
                        safeClicks

                })
                .eq(
                    "telegram_id",
                    telegramId
                )
                .select("*")
                .single();


        if (error) {

            console.error(
                "Save stats error:",
                error
            );

            return res.status(500).json({
                error: "Failed to save stats"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "PLAYER STATS SAVED:",
            telegramId
        );

        console.log(
            "Total Clicks:",
            data.total_clicks
        );

        console.log(
            "Coins:",
            data.coins
        );

        console.log(
            "Gems:",
            data.gems
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            stats: {

                coins:
                    data.coins,

                totalClicks:
                    data.total_clicks,

                gems:
                    data.gems

            }

        });


    } catch (error) {

        console.error(
            "Stats API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   TAP POWER UPGRADE
========================= */

app.post("/api/tap-power", async (req, res) => {

    try {

        const {
            initData,
            amount
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE AMOUNT
        ========================= */

        const upgradeAmount =
            Number(amount);

        const allowedAmounts = [
            2,
            3,
            4,
            5,
            6
        ];

        if (
            !allowedAmounts.includes(
                upgradeAmount
            )
        ) {

            return res.status(400).json({
                error: "Invalid Tap Power amount"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "telegram_id",
                telegramId
            )
            .single();

        if (userError || !user) {

            console.error(
                "Tap Power user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           TAP POWER INDEX
        ========================= */

        const powerIndex =
            upgradeAmount - 2;


        /* =========================
           LOAD TAP POWER COSTS
        ========================= */

        let tapPowerCosts =
            user.tap_power_costs;


        if (
            !Array.isArray(
                tapPowerCosts
            ) ||
            tapPowerCosts.length !== 5
        ) {

            tapPowerCosts = [
                100,
                250,
                500,
                1000,
                2500
            ];

        }


        /* =========================
           CURRENT COST
        ========================= */

        const cost =
            Number(
                tapPowerCosts[powerIndex]
            );


        if (
            !Number.isFinite(cost) ||
            cost <= 0
        ) {

            return res.status(500).json({
                error:
                    "Invalid Tap Power cost"
            });

        }


        /* =========================
           CHECK COINS
        ========================= */

        const currentCoins =
            Number(user.coins || 0);


        if (currentCoins < cost) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }


        /* =========================
           CURRENT TAP POWER
        ========================= */

        const currentTapPower =
            Number(user.tap_power || 1);


        const newTapPower =
            currentTapPower +
            upgradeAmount;


        const newCoins =
            currentCoins -
            cost;


        /* =========================
           INCREASE PRICE
        ========================= */

        tapPowerCosts[powerIndex] =
            Math.floor(
                cost * 1.5
            );


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                tap_power:
                    newTapPower,

                tap_power_costs:
                    tapPowerCosts

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Tap Power update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to upgrade Tap Power"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "TAP POWER UPGRADE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Old Tap Power:",
            currentTapPower
        );

        console.log(
            "Upgrade:",
            upgradeAmount
        );

        console.log(
            "New Tap Power:",
            newTapPower
        );

        console.log(
            "Cost:",
            cost
        );

        console.log(
            "Next Cost:",
            tapPowerCosts[powerIndex]
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            tapPower:
                updatedUser.tap_power,

            coins:
                updatedUser.coins,

            tapPowerCosts:
                updatedUser.tap_power_costs,

            cost:
                cost,

            upgradeAmount:
                upgradeAmount

        });


    } catch (error) {

        console.error(
            "Tap Power API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   NORMAL TAP POWER UPGRADE
========================= */

app.post("/api/upgrade", async (req, res) => {

    try {

        const {
            initData
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");


        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "telegram_id",
                telegramId
            )
            .single();


        if (userError || !user) {

            console.error(
                "Upgrade user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentTapPower =
            Number(user.tap_power || 1);

        const currentUpgradeCost =
            Number(user.upgrade_cost || 50);


        /* =========================
           CHECK COINS
        ========================= */

        if (
            currentCoins <
            currentUpgradeCost
        ) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newTapPower =
            currentTapPower + 1;

        const newCoins =
            currentCoins -
            currentUpgradeCost;

        const newUpgradeCost =
            Math.floor(
                currentUpgradeCost * 1.5
            );


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                tap_power:
                    newTapPower,

                upgrade_cost:
                    newUpgradeCost

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Upgrade update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to upgrade Tap Power"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "NORMAL TAP POWER UPGRADE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Old Tap Power:",
            currentTapPower
        );

        console.log(
            "New Tap Power:",
            newTapPower
        );

        console.log(
            "Old Cost:",
            currentUpgradeCost
        );

        console.log(
            "New Cost:",
            newUpgradeCost
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            tapPower:
                updatedUser.tap_power,

            coins:
                updatedUser.coins,

            upgradeCost:
                updatedUser.upgrade_cost

        });


    } catch (error) {

        console.error(
            "Upgrade API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   MOON POWER UPGRADE
========================================================= */

app.post("/api/moon-power", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Moon Power user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentNightLilies =
            Number(user.night_lilies || 0);

        const currentCost =
            Number(user.night_tap_upgrade_cost || 10);

        const currentLevel =
            Number(user.night_tap_upgrade_level || 0);

        const currentTapPower =
            Number(user.tap_power || 1);

        const currentTapBonus =
            Number(user.tap_bonus || 0);


        /* =========================
           CHECK NIGHT LILIES
        ========================= */

        if (currentNightLilies < currentCost) {

            return res.status(400).json({
                error: "Not enough Night Lilies"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newNightLilies =
            currentNightLilies - currentCost;

        const newTapPower =
            currentTapPower + 20;

        const newTapBonus =
            currentTapBonus + 1.5;

        const newLevel =
            currentLevel + 1;

        const newCost =
            currentCost + 1;


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                night_lilies:
                    newNightLilies,

                tap_power:
                    newTapPower,

                tap_bonus:
                    newTapBonus,

                night_tap_upgrade_level:
                    newLevel,

                night_tap_upgrade_cost:
                    newCost

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Moon Power update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy Moon Power"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "MOON POWER PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Night Lilies spent:",
            currentCost
        );

        console.log(
            "Remaining Night Lilies:",
            newNightLilies
        );

        console.log(
            "New Tap Power:",
            newTapPower
        );

        console.log(
            "New Tap Bonus:",
            newTapBonus
        );

        console.log(
            "New Level:",
            newLevel
        );

        console.log(
            "Next Cost:",
            newCost
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            nightLilies:
                updatedUser.night_lilies,

            tapPower:
                updatedUser.tap_power,

            tapBonus:
                updatedUser.tap_bonus,

            nightTapUpgradeLevel:
                updatedUser.night_tap_upgrade_level,

            nightTapUpgradeCost:
                updatedUser.night_tap_upgrade_cost

        });


    } catch (error) {

        console.error(
            "Moon Power API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   CONVERT COINS → NIGHT LILY
========================= */

app.post("/api/night-lily", async (req, res) => {

    try {

        const {
            initData
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "telegram_id",
                telegramId
            )
            .single();


        if (userError || !user) {

            console.error(
                "Night Lily user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CONVERSION COST
        ========================= */

        const conversionCost =
            1000000;


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentNightLilies =
            Number(user.night_lilies || 0);


        /* =========================
           CHECK COINS
        ========================= */

        if (
            currentCoins <
            conversionCost
        ) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newCoins =
            currentCoins -
            conversionCost;

        const newNightLilies =
            currentNightLilies + 1;


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                night_lilies:
                    newNightLilies

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Night Lily update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to convert coins"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "NIGHT LILY CONVERSION"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Coins spent:",
            conversionCost
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "Night Lilies:",
            newNightLilies
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            nightLilies:
                updatedUser.night_lilies

        });


    } catch (error) {

        console.error(
            "Night Lily API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   TAP COINS
========================= */

app.post("/api/tap", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Tap user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           CALCULATE TAP POWER
        ========================= */

        const currentTapPower =
            Number(user.tap_power || 1);

        const currentTapBonus =
            Number(user.tap_bonus || 0);

        const totalTapPower =
            Math.floor(
                currentTapPower *
                (1 + currentTapBonus / 100)
            );

        /* =========================
           ADD COINS
        ========================= */

        const currentCoins = Number(user.coins || 0);
const currentTotalCoinsEarned =
    Number(user.total_coins_earned || 0);

const newCoins =
    currentCoins + totalTapPower;

const newTotalCoinsEarned =
    currentTotalCoinsEarned + totalTapPower;

/* =========================
   CHECK MILESTONES
========================= */

const MILESTONE_TARGET = 50000000;

const currentMilestones =
    Number(user.milestones_completed || 0);

const earnedMilestones =
    Math.floor(
        newTotalCoinsEarned / MILESTONE_TARGET
    );

const newMilestones =
    Math.max(
        currentMilestones,
        earnedMilestones
    );

const milestoneDifference =
    newMilestones - currentMilestones;

const newTapPower =
    Number(user.tap_power || 1) +
    (milestoneDifference * 100);

const newPerSecond =
    Number(user.per_second || 0) +
    (milestoneDifference * 100);

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
    coins: newCoins,
    total_coins_earned: newTotalCoinsEarned,
    milestones_completed: newMilestones,
    tap_power: newTapPower,
     per_second: newPerSecond
})
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Tap coin update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to add coins"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

     res.json({

    success: true,

    coins:
        updatedUser.coins,

    tapPower:
        updatedUser.tap_power,

    perSecond:
        updatedUser.per_second,

    tapAmount:
        totalTapPower,

    totalCoinsEarned:
        updatedUser.total_coins_earned

});

    } catch (error) {

        console.error(
            "Tap API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   TOKEN TAP POWER
========================= */

app.post("/api/token-tap-power", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Token Tap Power user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           CHECK TOKENS
        ========================= */

        const currentTokens =
            Number(user.tokens || 0);

        const currentTapPower =
            Number(user.tap_power || 1);

        if (currentTokens < 10) {

            return res.status(400).json({
                error: "Not enough tokens"
            });

        }

        /* =========================
           APPLY PURCHASE
        ========================= */

        const newTokens =
            currentTokens - 10;

        const newTapPower =
            currentTapPower + 10;

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                tokens: newTokens,
                tap_power: newTapPower
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Token Tap Power update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy Token Tap Power"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            tokens:
                updatedUser.tokens,

            tapPower:
                updatedUser.tap_power

        });

    } catch (error) {

        console.error(
            "Token Tap Power API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   BASIC FARMER
========================= */

app.post("/api/buy-basic-farmer", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "telegram_id",
                telegramId
            )
            .single();

        if (userError || !user) {

            console.error(
                "Basic farmer user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           GET BASIC FARMER COST
        ========================= */

        let farmerCosts =
            user.farmer_costs;

        if (typeof farmerCosts === "string") {

            try {

                farmerCosts =
                    JSON.parse(farmerCosts);

            } catch (error) {

                farmerCosts = null;

            }

        }

        if (!Array.isArray(farmerCosts)) {

            farmerCosts = [
                100
            ];

        }

        if (
            !Number.isFinite(
                Number(farmerCosts[0])
            )
        ) {

            farmerCosts[0] = 100;

        }

        const farmerCost =
            Number(farmerCosts[0]);

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentFarmers =
            Number(user.farmers || 0);

        const currentCps =
            Number(user.per_second || 0);

        /* =========================
           CHECK COINS
        ========================= */

        if (currentCoins < farmerCost) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }

        /* =========================
           APPLY BASIC FARMER
        ========================= */

        const newCoins =
            currentCoins - farmerCost;

        const newFarmers =
            currentFarmers + 1;

        const newCps =
            currentCps + 1;

        /* =========================
           NEXT BASIC FARMER PRICE
        ========================= */

        farmerCosts[0] =
            Math.floor(
                farmerCost * 1.5
            );

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                farmers:
                    newFarmers,

                per_second:
                    newCps,

                farmer_costs:
                    farmerCosts

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Basic farmer update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy basic farmer"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            farmers:
                updatedUser.farmers,

            perSecond:
                updatedUser.per_second,

            farmerCost:
                updatedUser.farmer_costs[0]

        });

    } catch (error) {

        console.error(
            "Basic farmer API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   FALLING TOKEN REWARD
========================================================= */

app.post("/api/falling-token", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Falling Token user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });
        }

        const currentTokens =
            Number(user.tokens || 0);

        const newTokens =
            currentTokens + 1;

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                tokens: newTokens
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Falling Token update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to give token"
            });
        }

        res.json({
            success: true,
            tokens: updatedUser.tokens
        });

    } catch (error) {

        console.error(
            "Falling Token API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });
    }
});

/* =========================================================
   RICE SOUP
========================================================= */

app.post("/api/rice-soup", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Rice Soup user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });
        }

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentRice =
            Number(user.rice || 0);

        const currentLevel =
            Number(user.rice_soup_level || 0);

        const currentTapPower =
            Number(user.tap_power || 1);

        const currentTapBonus =
            Number(user.tap_bonus || 0);

        /* =========================
           CHECK RICE
        ========================= */

        if (currentRice < 100) {

            return res.status(400).json({
                error: "Not enough Rice"
            });
        }

        /* =========================
           NEW VALUES
        ========================= */

        const newRice =
            currentRice - 100;

        const newLevel =
            currentLevel + 1;

        const newTapPower =
            currentTapPower + 12;

        const newTapBonus =
            currentTapBonus + 1;

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                rice: newRice,
                rice_soup_level: newLevel,
                tap_power: newTapPower,
                tap_bonus: newTapBonus
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Rice Soup update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy Rice Soup"
            });
        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            rice: updatedUser.rice,
            riceSoupLevel:
                updatedUser.rice_soup_level,
            tapPower:
                updatedUser.tap_power,
            tapBonus:
                updatedUser.tap_bonus
        });

    } catch (error) {

        console.error(
            "Rice Soup API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });
    }
});

/* =========================================================
   RICE HARVEST
========================================================= */

app.post("/api/rice-harvest", async (req, res) => {

    try {

        const {
            initData,
            plotNumber
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE PLOT
        ========================= */

        const plot =
            Number(plotNumber);

        if (
            !Number.isInteger(plot) ||
            plot < 1 ||
            plot > 81
        ) {

            return res.status(400).json({
                error: "Invalid field plot"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Rice harvest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           GET FIELD CROPS
        ========================= */

        const fieldCrops =
            user.field_crops &&
            typeof user.field_crops === "object"
                ? user.field_crops
                : {};


        /* =========================
           GET CROP
        ========================= */

        const crop =
            fieldCrops[plot];


        /* =========================
           CHECK CROP EXISTS
        ========================= */

        if (!crop) {

            return res.status(400).json({
                error: "No crop on this plot"
            });

        }


        /* =========================
           CHECK CROP TYPE
        ========================= */

        if (crop.crop !== "rice") {

            return res.status(400).json({
                error: "This plot does not contain Rice"
            });

        }


        /* =========================
           CHECK READY
        ========================= */

        const readyAt =
            Number(crop.readyAt);

        if (
            !Number.isFinite(readyAt) ||
            Date.now() < readyAt
        ) {

            return res.status(400).json({
                error: "Rice is not ready"
            });

        }


        /* =========================
           CURRENT RICE
        ========================= */

        const currentRice =
            Number(user.rice || 0);


        /* =========================
           ADD RICE
        ========================= */

        const newRice =
            currentRice + 1;


        /* =========================
           REMOVE CROP
        ========================= */

        const newFieldCrops = {
            ...fieldCrops
        };

        delete newFieldCrops[plot];


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                rice: newRice,
                field_crops: newFieldCrops
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Rice harvest update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to harvest Rice"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            rice:
                updatedUser.rice,

            fieldCrops:
                updatedUser.field_crops

        });


    } catch (error) {

        console.error(
            "Rice harvest API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   UNLOCK FIELD PLOT
========================================================= */

app.post("/api/unlock-field-plot", async (req, res) => {

    try {

        const { initData, plotNumber } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser = JSON.parse(userJson);
        const telegramId = String(telegramUser.id);

        /* =========================
           VALIDATE PLOT NUMBER
        ========================= */

        const plot = Number(plotNumber);

        if (!Number.isInteger(plot) || plot < 1 || plot > 81) {
            return res.status(400).json({
                error: "Invalid field plot"
            });
        }

        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        /* =========================
           FIELD PLOT COST
        ========================= */

        const cost = plot * 1000000;

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentUnlockedPlots =
            Array.isArray(user.unlocked_field_plots)
                ? user.unlocked_field_plots
                : [];

        /* =========================
           ALREADY UNLOCKED
        ========================= */

        if (currentUnlockedPlots.includes(plot)) {

            return res.status(400).json({
                error: "Field plot already unlocked"
            });

        }

        /* =========================
           CHECK COINS
        ========================= */

        if (currentCoins < cost) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }

        /* =========================
           UPDATE VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newUnlockedPlots = [
            ...currentUnlockedPlots,
            plot
        ];

        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    unlocked_field_plots: newUnlockedPlots
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();

        if (updateError) {

            console.error(
                "FIELD PLOT UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to unlock field plot"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            plotNumber: plot,

            cost: cost,

            coins: updatedUser.coins,

            unlockedFieldPlots:
                updatedUser.unlocked_field_plots

        });

    } catch (error) {

        console.error(
            "UNLOCK FIELD PLOT ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   PLANT CROP
========================================================= */

app.post("/api/plant-crop", async (req, res) => {

    try {

        const { initData, plotNumber, cropType } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser = JSON.parse(userJson);
        const telegramId = String(telegramUser.id);

        /* =========================
           VALIDATE PLOT
        ========================= */

        const plot = Number(plotNumber);

        if (!Number.isInteger(plot) || plot < 1 || plot > 81) {
            return res.status(400).json({
                error: "Invalid field plot"
            });
        }

        /* =========================
           VALIDATE CROP
        ========================= */

        const validCrops = [
            "rice",
            "potato",
            "corn"
        ];

        if (!validCrops.includes(cropType)) {
            return res.status(400).json({
                error: "Invalid crop type"
            });
        }

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        /* =========================
           GET FIELD DATA
        ========================= */

        const unlockedFieldPlots =
            Array.isArray(user.unlocked_field_plots)
                ? user.unlocked_field_plots
                : [];

        const fieldCrops =
            user.field_crops &&
            typeof user.field_crops === "object"
                ? user.field_crops
                : {};

        /* =========================
           CHECK PLOT UNLOCKED
        ========================= */

        if (!unlockedFieldPlots.includes(plot)) {

            return res.status(400).json({
                error: "Field plot is not unlocked"
            });

        }

        /* =========================
           CHECK PLOT EMPTY
        ========================= */

        if (fieldCrops[plot]) {

            return res.status(400).json({
                error: "Field plot already has a crop"
            });

        }

        /* =========================
           GET SEED COUNT
        ========================= */

        let seedColumn;

        if (cropType === "rice") {
            seedColumn = "rice_seeds";
        }

        if (cropType === "potato") {
            seedColumn = "potato_seeds";
        }

        if (cropType === "corn") {
            seedColumn = "corn_seeds";
        }

        const currentSeeds =
            Number(user[seedColumn] || 0);

        /* =========================
           CHECK SEEDS
        ========================= */

        if (currentSeeds <= 0) {

            return res.status(400).json({
                error: `Not enough ${cropType} seeds`
            });

        }

/* =========================
   GROW TIME
========================= */

const BASE_GROW_TIME =
    10 * 1000; // 10 seconds

const MIN_GROW_TIME =
    1 * 1000; // 1 second minimum

/* =========================
   GET SERVER UPGRADE
========================= */

let growUpgrades = 0;

if (cropType === "rice") {

    growUpgrades =
        Number(user.rice_grow_upgrades || 0);

}

if (cropType === "potato") {

    growUpgrades =
        Number(user.potato_grow_upgrades || 0);

}

if (cropType === "corn") {

    growUpgrades =
        Number(user.corn_grow_upgrades || 0);

}


/* =========================
   CALCULATE GROW TIME
========================= */

const GROW_TIME =
    Math.max(
        MIN_GROW_TIME,
        BASE_GROW_TIME -
        (
            growUpgrades *
            60 *
            1000
        )
    );


/* =========================
   PLANT TIME
========================= */

const plantedAt =
    Date.now();

const readyAt =
    plantedAt + GROW_TIME;

        /* =========================
           REMOVE SEED
        ========================= */

        const newSeeds =
            currentSeeds - 1;

        /* =========================
           ADD CROP
        ========================= */

        const newFieldCrops = {
            ...fieldCrops,

            [plot]: {
                crop: cropType,
                plantedAt: plantedAt,
                readyAt: readyAt
            }
        };

        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const updateData = {
            [seedColumn]: newSeeds,
            field_crops: newFieldCrops
        };

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update(updateData)
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "PLANT CROP UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to plant crop"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            plotNumber: plot,

            cropType: cropType,

            plantedAt: plantedAt,

            readyAt: readyAt,

            fieldCrops:
                updatedUser.field_crops,

            seeds:
                updatedUser[seedColumn]

        });

    } catch (error) {

        console.error(
            "PLANT CROP ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY RICE SEED
========================================================= */

app.post("/api/buy-rice-seed", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        /* =========================
           COST
        ========================= */

        const cost = 10000;


        const currentCoins =
            Number(user.coins || 0);

        const currentSeeds =
            Number(user.rice_seeds || 0);


        /* =========================
           CHECK COINS
        ========================= */

        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        /* =========================
           NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newSeeds =
            currentSeeds + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    rice_seeds: newSeeds
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "BUY RICE SEED UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy rice seed"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            riceSeeds:
                updatedUser.rice_seeds

        });


    } catch (error) {

        console.error(
            "BUY RICE SEED ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY POTATO SEED
========================================================= */

app.post("/api/buy-potato-seed", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        const cost = 20000;

        const currentCoins =
            Number(user.coins || 0);

        const currentSeeds =
            Number(user.potato_seeds || 0);


        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        const newCoins =
            currentCoins - cost;

        const newSeeds =
            currentSeeds + 1;


        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    potato_seeds: newSeeds
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "BUY POTATO SEED UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy potato seed"
            });
        }


        res.json({

            success: true,

            coins:
                updatedUser.coins,

            potatoSeeds:
                updatedUser.potato_seeds

        });


    } catch (error) {

        console.error(
            "BUY POTATO SEED ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY CORN SEED
========================================================= */

app.post("/api/buy-corn-seed", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        /* =========================
           COST
        ========================= */

        const cost = 30000;

        const currentCoins =
            Number(user.coins || 0);

        const currentSeeds =
            Number(user.corn_seeds || 0);


        /* =========================
           CHECK COINS
        ========================= */

        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        /* =========================
           NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newSeeds =
            currentSeeds + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    corn_seeds: newSeeds
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "BUY CORN SEED UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy corn seed"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            cornSeeds:
                updatedUser.corn_seeds

        });


    } catch (error) {

        console.error(
            "BUY CORN SEED ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY RICE GROW TIME UPGRADE
========================================================= */

app.post("/api/rice-grow-upgrade", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        /* =========================
           SETTINGS
        ========================= */

        const cost = 1000000;
        const maxUpgrades = 120;


        const currentCoins =
            Number(user.coins || 0);

        const currentUpgrades =
            Number(user.rice_grow_upgrades || 0);


        /* =========================
           MAX CHECK
        ========================= */

        if (currentUpgrades >= maxUpgrades) {
            return res.status(400).json({
                error: "Rice grow upgrade is already MAX"
            });
        }


        /* =========================
           COIN CHECK
        ========================= */

        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        /* =========================
           NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newUpgrades =
            currentUpgrades + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    rice_grow_upgrades: newUpgrades
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "RICE GROW UPGRADE UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy rice grow upgrade"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            riceGrowUpgrades:
                updatedUser.rice_grow_upgrades

        });


    } catch (error) {

        console.error(
            "RICE GROW UPGRADE ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY POTATO GROW TIME UPGRADE
========================================================= */

app.post("/api/potato-grow-upgrade", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        /* =========================
           SETTINGS
        ========================= */

        const cost = 2000000;
        const maxUpgrades = 120;

        const currentCoins =
            Number(user.coins || 0);

        const currentUpgrades =
            Number(user.potato_grow_upgrades || 0);


        /* =========================
           MAX CHECK
        ========================= */

        if (currentUpgrades >= maxUpgrades) {
            return res.status(400).json({
                error: "Potato grow upgrade is MAX"
            });
        }


        /* =========================
           COIN CHECK
        ========================= */

        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        /* =========================
           NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newUpgrades =
            currentUpgrades + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    potato_grow_upgrades: newUpgrades
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "POTATO GROW UPGRADE UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy potato grow upgrade"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            potatoGrowUpgrades:
                updatedUser.potato_grow_upgrades

        });


    } catch (error) {

        console.error(
            "POTATO GROW UPGRADE ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY CORN GROW TIME UPGRADE
========================================================= */

app.post("/api/corn-grow-upgrade", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        const params = new URLSearchParams(initData);
        const userJson = params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }


        /* =========================
           SETTINGS
        ========================= */

        const cost = 3000000;
        const maxUpgrades = 120;

        const currentCoins =
            Number(user.coins || 0);

        const currentUpgrades =
            Number(user.corn_grow_upgrades || 0);


        /* =========================
           MAX CHECK
        ========================= */

        if (currentUpgrades >= maxUpgrades) {
            return res.status(400).json({
                error: "Corn grow upgrade is MAX"
            });
        }


        /* =========================
           COIN CHECK
        ========================= */

        if (currentCoins < cost) {
            return res.status(400).json({
                error: "Not enough coins"
            });
        }


        /* =========================
           NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newUpgrades =
            currentUpgrades + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const { data: updatedUser, error: updateError } =
            await supabase
                .from("users")
                .update({
                    coins: newCoins,
                    corn_grow_upgrades: newUpgrades
                })
                .eq("telegram_id", telegramId)
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "CORN GROW UPGRADE UPDATE ERROR:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy corn grow upgrade"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            cornGrowUpgrades:
                updatedUser.corn_grow_upgrades

        });


    } catch (error) {

        console.error(
            "CORN GROW UPGRADE ERROR:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   POTATO HARVEST
========================================================= */

app.post("/api/potato-harvest", async (req, res) => {

    try {

        const {
            initData,
            plotNumber
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE PLOT
        ========================= */

        const plot =
            Number(plotNumber);

        if (
            !Number.isInteger(plot) ||
            plot < 1 ||
            plot > 81
        ) {

            return res.status(400).json({
                error: "Invalid field plot"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Potato harvest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           GET FIELD CROPS
        ========================= */

        const fieldCrops =
            user.field_crops &&
            typeof user.field_crops === "object"
                ? user.field_crops
                : {};


        /* =========================
           GET CROP
        ========================= */

        const crop =
            fieldCrops[plot];


        /* =========================
           CHECK CROP EXISTS
        ========================= */

        if (!crop) {

            return res.status(400).json({
                error: "No crop on this plot"
            });

        }


        /* =========================
           CHECK CROP TYPE
        ========================= */

        if (crop.crop !== "potato") {

            return res.status(400).json({
                error: "This plot does not contain Potato"
            });

        }


        /* =========================
           CHECK READY
        ========================= */

        const readyAt =
            Number(crop.readyAt);

        if (
            !Number.isFinite(readyAt) ||
            Date.now() < readyAt
        ) {

            return res.status(400).json({
                error: "Potato is not ready"
            });

        }


        /* =========================
           CURRENT POTATO
        ========================= */

        const currentPotato =
            Number(user.potato || 0);


        /* =========================
           ADD POTATO
        ========================= */

        const newPotato =
            currentPotato + 1;


        /* =========================
           REMOVE CROP
        ========================= */

        const newFieldCrops = {
            ...fieldCrops
        };

        delete newFieldCrops[plot];


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                potato: newPotato,
                field_crops: newFieldCrops
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Potato harvest update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to harvest Potato"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            potato:
                updatedUser.potato,

            fieldCrops:
                updatedUser.field_crops

        });


    } catch (error) {

        console.error(
            "Potato harvest API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   CORN HARVEST
========================================================= */

app.post("/api/corn-harvest", async (req, res) => {

    try {

        const {
            initData,
            plotNumber
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE PLOT
        ========================= */

        const plot =
            Number(plotNumber);

        if (
            !Number.isInteger(plot) ||
            plot < 1 ||
            plot > 81
        ) {

            return res.status(400).json({
                error: "Invalid field plot"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Corn harvest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           GET FIELD CROPS
        ========================= */

        const fieldCrops =
            user.field_crops &&
            typeof user.field_crops === "object"
                ? user.field_crops
                : {};


        /* =========================
           GET CROP
        ========================= */

        const crop =
            fieldCrops[plot];


        /* =========================
           CHECK CROP EXISTS
        ========================= */

        if (!crop) {

            return res.status(400).json({
                error: "No crop on this plot"
            });

        }


        /* =========================
           CHECK CROP TYPE
        ========================= */

        if (crop.crop !== "corn") {

            return res.status(400).json({
                error: "This plot does not contain Corn"
            });

        }


        /* =========================
           CHECK READY
        ========================= */

        const readyAt =
            Number(crop.readyAt);

        if (
            !Number.isFinite(readyAt) ||
            Date.now() < readyAt
        ) {

            return res.status(400).json({
                error: "Corn is not ready"
            });

        }


        /* =========================
           CURRENT CORN
        ========================= */

        const currentCorn =
            Number(user.corn || 0);


        /* =========================
           ADD CORN
        ========================= */

        const newCorn =
            currentCorn + 1;


        /* =========================
           REMOVE CROP
        ========================= */

        const newFieldCrops = {
            ...fieldCrops
        };

        delete newFieldCrops[plot];


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                corn: newCorn,
                field_crops: newFieldCrops
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Corn harvest update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to harvest Corn"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            corn:
                updatedUser.corn,

            fieldCrops:
                updatedUser.field_crops

        });


    } catch (error) {

        console.error(
            "Corn harvest API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   BUY FARMER
========================================================= */

app.post("/api/buy-farmer", async (req, res) => {

    try {

        const {
            initData,
            farmerIndex
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE FARMER
        ========================= */

        const index =
            Number(farmerIndex);


        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index > 4
        ) {

            return res.status(400).json({
                error: "Invalid farmer"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq(
                "telegram_id",
                telegramId
            )
            .single();


        if (userError || !user) {

            console.error(
                "Farmer purchase user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           FARMER COSTS
        ========================= */

        let farmerCosts =
            user.farmer_costs;

            console.log(
    "FARMER COSTS FROM SUPABASE:",
    farmerCosts
);

console.log(
    "FARMER COSTS TYPE:",
    typeof farmerCosts
);

console.log(
    "IS ARRAY:",
    Array.isArray(farmerCosts)
);

        if (!Array.isArray(farmerCosts)) {

            farmerCosts = [
                100,
                250,
                500,
                1000,
                2500
            ];

        }


        const cost =
            Number(farmerCosts[index]);


        if (
            !Number.isFinite(cost) ||
            cost <= 0
        ) {

            return res.status(500).json({
                error: "Invalid farmer cost"
            });

        }


        /* =========================
           CHECK COINS
        ========================= */

        const currentCoins =
            Number(user.coins || 0);


        if (currentCoins < cost) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }


        /* =========================
           FARMER INCOME
        ========================= */

        const farmerIncome = [
            2,
            3,
            4,
            5,
            6
        ];


        const income =
            farmerIncome[index];


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentFarmers =
            Number(user.farmers || 0);

        const currentCps =
            Number(user.per_second || 0);


        const newCoins =
            currentCoins - cost;

        const newFarmers =
            currentFarmers + 1;

        const newCps =
            currentCps + income;


        /* =========================
           NEXT FARMER PRICE
        ========================= */

        farmerCosts[index] =
            Math.floor(
                cost * 1.5
            );


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                farmers:
                    newFarmers,

                per_second:
                    newCps,

                farmer_costs:
                    farmerCosts

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Farmer purchase update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy farmer"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "FARMER PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Farmer:",
            index + 1
        );

        console.log(
            "Cost:",
            cost
        );

        console.log(
            "Income:",
            income
        );

        console.log(
            "New Farmers:",
            newFarmers
        );

        console.log(
            "New CPS:",
            newCps
        );

        console.log(
            "Next Cost:",
            farmerCosts[index]
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            farmers:
                updatedUser.farmers,

            perSecond:
                updatedUser.per_second,

            farmerCosts:
                updatedUser.farmer_costs,

            farmerIndex:
                index,

            income:
                income

        });

    } catch (error) {

        console.error(
            "Farmer purchase API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   TOKEN +10 CPS
========================= */

app.post("/api/token-cps", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Token CPS user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentTokens =
            Number(user.tokens || 0);

        const currentPerSecond =
            Number(user.per_second || 0);


        /* =========================
           CHECK TOKENS
        ========================= */

        if (currentTokens < 10) {

            return res.status(400).json({
                error: "Not enough tokens"
            });

        }


        /* =========================
           APPLY PURCHASE
        ========================= */

        const newTokens =
            currentTokens - 10;

        const newPerSecond =
            currentPerSecond + 10;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                tokens: newTokens,
                per_second: newPerSecond
            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Token CPS update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy Token CPS"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            tokens:
                updatedUser.tokens,

            perSecond:
                updatedUser.per_second

        });

    } catch (error) {

        console.error(
            "Token CPS API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   NIGHT INCOME +20 CPS
========================================================= */

app.post("/api/night-income", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Night Income user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentNightLilies =
            Number(user.night_lilies || 0);

        const currentCost =
            Number(user.night_cps_upgrade_cost || 10);

        const currentLevel =
            Number(user.night_cps_upgrade_level || 0);

        const currentNightBonus =
            Number(user.night_bonus || 0);

        const currentPerSecond =
            Number(user.per_second || 0);


        /* =========================
           CHECK NIGHT LILIES
        ========================= */

        if (currentNightLilies < currentCost) {

            return res.status(400).json({
                error: "Not enough Night Lilies"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newNightLilies =
            currentNightLilies - currentCost;

        const newPerSecond =
            currentPerSecond + 20;

        const newNightBonus =
            currentNightBonus + 1.5;

        const newLevel =
            currentLevel + 1;

        const newCost =
            currentCost + 1;


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                night_lilies:
                    newNightLilies,

                per_second:
                    newPerSecond,

                night_bonus:
                    newNightBonus,

                night_cps_upgrade_level:
                    newLevel,

                night_cps_upgrade_cost:
                    newCost

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Night Income update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to buy Night Income"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "NIGHT INCOME PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Night Lilies spent:",
            currentCost
        );

        console.log(
            "Remaining Night Lilies:",
            newNightLilies
        );

        console.log(
            "New Per Second:",
            newPerSecond
        );

        console.log(
            "New Night Bonus:",
            newNightBonus
        );

        console.log(
            "New Level:",
            newLevel
        );

        console.log(
            "Next Cost:",
            newCost
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            nightLilies:
                updatedUser.night_lilies,

            perSecond:
                updatedUser.per_second,

            nightBonus:
                updatedUser.night_bonus,

            nightCpsUpgradeLevel:
                updatedUser.night_cps_upgrade_level,

            nightCpsUpgradeCost:
                updatedUser.night_cps_upgrade_cost

        });


    } catch (error) {

        console.error(
            "Night Income API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   POTATO SOUP +12 CPS
========================================================= */

app.post("/api/potato-soup", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Potato Soup user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentPotato =
            Number(user.potato || 0);

        const currentLevel =
            Number(
                user.potato_soup_level || 0
            );

        const currentPerSecond =
            Number(
                user.per_second || 0
            );

        const currentSoupBonus =
            Number(
                user.soup_bonus || 0
            );


        /* =========================
           CHECK POTATO
        ========================= */

        if (currentPotato < 100) {

            return res.status(400).json({
                error: "Not enough Potato"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newPotato =
            currentPotato - 100;

        const newLevel =
            currentLevel + 1;

        const newPerSecond =
            currentPerSecond + 12;

        const newSoupBonus =
            currentSoupBonus + 1;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                potato:
                    newPotato,

                potato_soup_level:
                    newLevel,

                per_second:
                    newPerSecond,

                soup_bonus:
                    newSoupBonus

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Potato Soup update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy Potato Soup"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "POTATO SOUP PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Potato spent:",
            100
        );

        console.log(
            "Remaining Potato:",
            newPotato
        );

        console.log(
            "New Potato Soup Level:",
            newLevel
        );

        console.log(
            "New Per Second:",
            newPerSecond
        );

        console.log(
            "New Soup Bonus:",
            newSoupBonus
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            potato:
                updatedUser.potato,

            potatoSoupLevel:
                updatedUser.potato_soup_level,

            perSecond:
                updatedUser.per_second,

            soupBonus:
                updatedUser.soup_bonus

        });

    } catch (error) {

        console.error(
            "Potato Soup API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   CORN SOUP +15 CPS
========================================================= */

app.post("/api/corn-soup", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Corn Soup user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCorn =
            Number(user.corn || 0);

        const currentLevel =
            Number(
                user.corn_soup_level || 0
            );

        const currentPerSecond =
            Number(
                user.per_second || 0
            );

        const currentTapBonus =
            Number(
                user.tap_bonus || 0
            );

        const currentSoupBonus =
            Number(
                user.soup_bonus || 0
            );


        /* =========================
           CHECK CORN
        ========================= */

        if (currentCorn < 100) {

            return res.status(400).json({
                error: "Not enough Corn"
            });

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newCorn =
            currentCorn - 100;

        const newLevel =
            currentLevel + 1;

        const newPerSecond =
            currentPerSecond + 15;

        const newTapBonus =
            currentTapBonus + 0.5;

        const newSoupBonus =
            currentSoupBonus + 0.5;


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                corn:
                    newCorn,

                corn_soup_level:
                    newLevel,

                per_second:
                    newPerSecond,

                tap_bonus:
                    newTapBonus,

                soup_bonus:
                    newSoupBonus

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Corn Soup update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy Corn Soup"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "CORN SOUP PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Corn spent:",
            100
        );

        console.log(
            "Remaining Corn:",
            newCorn
        );

        console.log(
            "New Corn Soup Level:",
            newLevel
        );

        console.log(
            "New Per Second:",
            newPerSecond
        );

        console.log(
            "New Tap Bonus:",
            newTapBonus
        );

        console.log(
            "New Soup Bonus:",
            newSoupBonus
        );

        console.log(
            "=============================="
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            corn:
                updatedUser.corn,

            cornSoupLevel:
                updatedUser.corn_soup_level,

            perSecond:
                updatedUser.per_second,

            tapBonus:
                updatedUser.tap_bonus,

            soupBonus:
                updatedUser.soup_bonus

        });

    } catch (error) {

        console.error(
            "Corn Soup API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   GEM ACHIEVEMENTS
========================================================= */

app.post("/api/gem-achievements", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params = new URLSearchParams(initData);

        const userJson = params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser = JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           CURRENT VALUES
        ========================= */

        const totalGemsEarned =
            Number(user.total_gems_earned || 0);

        let totalGemsBonus =
            Number(user.total_gems_bonus || 0);

        const achievements = {

            100:
                Boolean(user.gems_achievement_100),

            250:
                Boolean(user.gems_achievement_250),

            500:
                Boolean(user.gems_achievement_500),

            1000:
                Boolean(user.gems_achievement_1000),

            1750:
                Boolean(user.gems_achievement_1750),

            3000:
                Boolean(user.gems_achievement_3000),

            5000:
                Boolean(user.gems_achievement_5000),

            7500:
                Boolean(user.gems_achievement_7500),

            11000:
                Boolean(user.gems_achievement_11000)

        };

        /* =========================
           ACHIEVEMENT REWARDS
        ========================= */

        const rewards = {

            100: 2,
            250: 4,
            500: 6,
            1000: 8,
            1750: 10,
            3000: 12,
            5000: 14,
            7500: 16,
            11000: 18

        };

        let newlyUnlocked = [];

        /* =========================
           CHECK ALL ACHIEVEMENTS
        ========================= */

        for (const threshold of Object.keys(rewards)) {

            const thresholdNumber =
                Number(threshold);

            if (
                totalGemsEarned >= thresholdNumber &&
                !achievements[thresholdNumber]
            ) {

                achievements[thresholdNumber] = true;

                totalGemsBonus +=
                    rewards[thresholdNumber];

                newlyUnlocked.push({
                    threshold: thresholdNumber,
                    reward: rewards[thresholdNumber]
                });

            }

        }

 /* =========================
   SAVE TO SUPABASE
========================= */

const {
    data: updatedUser,
    error: updateError
} = await supabase
    .from("users")
    .update({

        total_gems_bonus:
            totalGemsBonus,

        gems_achievement_100:
            achievements[100],

        gems_achievement_250:
            achievements[250],

        gems_achievement_500:
            achievements[500],

        gems_achievement_1000:
            achievements[1000],

        gems_achievement_1750:
            achievements[1750],

        gems_achievement_3000:
            achievements[3000],

        gems_achievement_5000:
            achievements[5000],

        gems_achievement_7500:
            achievements[7500],

        gems_achievement_11000:
            achievements[11000]

    })
    .eq(
        "telegram_id",
        telegramId
    )
    .select("*")
    .single();

if (updateError) {

    console.error(
        "Gem achievements update error:",
        updateError
    );

    return res.status(500).json({
        error:
            "Failed to update gem achievements"
    });

}

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            totalGemsEarned:
                updatedUser.total_gems_earned,

            totalGemsBonus:
                updatedUser.total_gems_bonus,

            achievements: {

                gems100:
                    updatedUser.gems_achievement_100,

                gems250:
                    updatedUser.gems_achievement_250,

                gems500:
                    updatedUser.gems_achievement_500,

                gems1000:
                    updatedUser.gems_achievement_1000,

                gems1750:
                    updatedUser.gems_achievement_1750,

                gems3000:
                    updatedUser.gems_achievement_3000,

                gems5000:
                    updatedUser.gems_achievement_5000,

                gems7500:
                    updatedUser.gems_achievement_7500,

                gems11000:
                    updatedUser.gems_achievement_11000

            },

            newlyUnlocked

        });

    } catch (error) {

        console.error(
            "Gem achievements API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   GIVE GEMS
========================================================= */

app.post("/api/give-gems", async (req, res) => {

    try {

        const { initData, amount } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           VALIDATE AMOUNT
        ========================= */

        const requestedAmount = Number(amount);

        if (
            !Number.isFinite(requestedAmount) ||
            requestedAmount <= 0
        ) {

            return res.status(400).json({
                error: "Invalid gem amount"
            });

        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentGems =
            Number(user.gems || 0);

        const currentTotalGemsEarned =
            Number(user.total_gems_earned || 0);

        const currentTotalGemsBonus =
            Number(user.total_gems_bonus || 0);

        /* =========================
           CALCULATE GEM BONUS
        ========================= */

        const bonusMultiplier =
            1 + (
                currentTotalGemsBonus / 100
            );

        const finalGems =
            Math.round(
                requestedAmount *
                bonusMultiplier
            );

        const newGems =
            currentGems + finalGems;

        const newTotalGemsEarned =
            currentTotalGemsEarned + finalGems;

        /* =========================
           ACHIEVEMENT REWARDS
        ========================= */

        const achievementData = {

            100: {
                column: "gems_achievement_100",
                reward: 2
            },

            250: {
                column: "gems_achievement_250",
                reward: 4
            },

            500: {
                column: "gems_achievement_500",
                reward: 6
            },

            1000: {
                column: "gems_achievement_1000",
                reward: 8
            },

            1750: {
                column: "gems_achievement_1750",
                reward: 10
            },

            3000: {
                column: "gems_achievement_3000",
                reward: 12
            },

            5000: {
                column: "gems_achievement_5000",
                reward: 14
            },

            7500: {
                column: "gems_achievement_7500",
                reward: 16
            },

            11000: {
                column: "gems_achievement_11000",
                reward: 18
            }

        };

        let newTotalGemsBonus =
            currentTotalGemsBonus;

        const achievementUpdates = {};

        const newlyUnlocked = [];

        for (
            const [threshold, achievement]
            of Object.entries(achievementData)
        ) {

            const alreadyUnlocked =
                Boolean(
                    user[achievement.column]
                );

            if (
                newTotalGemsEarned >= Number(threshold) &&
                !alreadyUnlocked
            ) {

                achievementUpdates[
                    achievement.column
                ] = true;

                newTotalGemsBonus +=
                    achievement.reward;

                newlyUnlocked.push({
                    threshold: Number(threshold),
                    reward: achievement.reward
                });

            }

        }

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                gems: newGems,

                total_gems_earned:
                    newTotalGemsEarned,

                total_gems_bonus:
                    newTotalGemsBonus,

                ...achievementUpdates

            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Give gems update error:",
                updateError
            );

            return res.status(500).json({
                error: "Failed to give gems"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            gems:
                updatedUser.gems,

            totalGemsEarned:
                updatedUser.total_gems_earned,

            totalGemsBonus:
                updatedUser.total_gems_bonus,

            finalGems,

            newlyUnlocked

        });

    } catch (error) {

        console.error(
            "Give gems API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   DAILY QUEST GEM REWARD
========================================================= */

app.post("/api/claim-daily-quest", async (req, res) => {

    try {

        const {
            initData,
            questId
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           CHECK QUEST ID
        ========================= */

        const allowedQuests = [

            "farmer",
            "newbie",
            "beginner",
            "intermediate",
            "expert",
            "master",
            "tapPower1",
            "tapPower2",
            "tapPower3",
            "tapPower4",
            "tapPower5",
            "luckyCoins",
            "energyUpgrade",
            "click500",
            "earn10000Coins",
            "online60",
            "tokenTapPower",
            "tokenCPS",
            "fallingTokens",
            "riceHarvest50",
            "potatoHarvest50",
            "cornHarvest50",
            "moonPower",
            "nightIncome",
            "riceSoup",
            "potatoSoup",
            "cornSoup"
            // Add the rest later.

        ];


        if (!allowedQuests.includes(questId)) {

            return res.status(400).json({
                error: "Invalid daily quest"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");


        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET BRATISLAVA DATE
        ========================= */

        const claimDate =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava"
                }
            ).format(new Date());


        /* =========================
           RECORD CLAIM FIRST
        ========================= */

        const {
            data: claim,
            error: claimError
        } = await supabase
            .from("daily_quest_claims")
            .insert({
                telegram_id:
                    telegramId,

                quest_id:
                    questId,

                claim_date:
                    claimDate
            })
            .select("id")
            .single();


        /* =========================
           CHECK CLAIM
        ========================= */

        if (claimError) {

            console.error(
                "Daily quest claim insert error:",
                claimError
            );


            /* =========================
               DUPLICATE CLAIM
            ========================= */

            if (
                claimError.code === "23505"
            ) {

                return res.status(400).json({
                    error:
                        "Quest already claimed today"
                });

            }


            return res.status(500).json({
                error:
                    "Failed to record quest"
            });

        }


        if (!claim) {

            return res.status(500).json({
                error:
                    "Failed to record quest"
            });

        }


        /* =========================
           GET CURRENT USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();


        if (userError || !user) {

            console.error(
                "Daily quest user error:",
                userError
            );

            return res.status(404).json({
                error:
                    "User not found"
            });

        }


        /* =========================
           CURRENT GEM VALUES
        ========================= */

        const requestedAmount = 1;

        const currentGems =
            Number(user.gems || 0);

        const currentTotalGemsEarned =
            Number(
                user.total_gems_earned || 0
            );

        const currentTotalGemsBonus =
            Number(
                user.total_gems_bonus || 0
            );


        /* =========================
           GEM BONUS
        ========================= */

        const bonusMultiplier =
            1 +
            (
                currentTotalGemsBonus / 100
            );


        const finalGems =
            Math.round(
                requestedAmount *
                bonusMultiplier
            );


        const newGems =
            currentGems +
            finalGems;


        const newTotalGemsEarned =
            currentTotalGemsEarned +
            finalGems;


        /* =========================
           CHECK GEM ACHIEVEMENTS
        ========================= */

        let newTotalGemsBonus =
            currentTotalGemsBonus;


        const achievementFlags = {

            100:
                Boolean(
                    user.gems_achievement_100
                ),

            250:
                Boolean(
                    user.gems_achievement_250
                ),

            500:
                Boolean(
                    user.gems_achievement_500
                ),

            1000:
                Boolean(
                    user.gems_achievement_1000
                ),

            1750:
                Boolean(
                    user.gems_achievement_1750
                ),

            3000:
                Boolean(
                    user.gems_achievement_3000
                ),

            5000:
                Boolean(
                    user.gems_achievement_5000
                ),

            7500:
                Boolean(
                    user.gems_achievement_7500
                ),

            11000:
                Boolean(
                    user.gems_achievement_11000
                )

        };


        const achievementRewards = {

            100: 2,
            250: 4,
            500: 6,
            1000: 8,
            1750: 10,
            3000: 12,
            5000: 14,
            7500: 16,
            11000: 18

        };


        let newlyUnlocked = [];


        for (
            const threshold of Object.keys(
                achievementRewards
            )
        ) {

            const thresholdNumber =
                Number(threshold);


            if (
                newTotalGemsEarned >=
                    thresholdNumber &&

                !achievementFlags[
                    thresholdNumber
                ]
            ) {

                achievementFlags[
                    thresholdNumber
                ] = true;


                newTotalGemsBonus +=
                    achievementRewards[
                        thresholdNumber
                    ];


                newlyUnlocked.push({

                    threshold:
                        thresholdNumber,

                    reward:
                        achievementRewards[
                            thresholdNumber
                        ]

                });

            }

        }


        /* =========================
           UPDATE USER
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                gems:
                    newGems,

                total_gems_earned:
                    newTotalGemsEarned,

                total_gems_bonus:
                    newTotalGemsBonus,

                gems_achievement_100:
                    achievementFlags[100],

                gems_achievement_250:
                    achievementFlags[250],

                gems_achievement_500:
                    achievementFlags[500],

                gems_achievement_1000:
                    achievementFlags[1000],

                gems_achievement_1750:
                    achievementFlags[1750],

                gems_achievement_3000:
                    achievementFlags[3000],

                gems_achievement_5000:
                    achievementFlags[5000],

                gems_achievement_7500:
                    achievementFlags[7500],

                gems_achievement_11000:
                    achievementFlags[11000]

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        /* =========================
           UPDATE FAILED
        ========================= */

        if (updateError) {

            console.error(
                "Daily quest gem update error:",
                updateError
            );

            /*
               IMPORTANT:

               The claim was already recorded.

               We do NOT award the gems again.

               The claim can be investigated/repaired
               separately if the user update fails.
            */

            return res.status(500).json({
                error:
                    "Quest recorded but reward failed"
            });

        }

/* =========================
   RESPONSE
========================= */

res.json({

    success: true,

    gems:
        updatedUser.gems,

    totalGemsEarned:
        updatedUser.total_gems_earned,

    totalGemsBonus:
        updatedUser.total_gems_bonus,

    gemsAchievement100:
        updatedUser.gems_achievement_100,

    gemsAchievement250:
        updatedUser.gems_achievement_250,

    gemsAchievement500:
        updatedUser.gems_achievement_500,

    gemsAchievement1000:
        updatedUser.gems_achievement_1000,

    gemsAchievement1750:
        updatedUser.gems_achievement_1750,

    gemsAchievement3000:
        updatedUser.gems_achievement_3000,

    gemsAchievement5000:
        updatedUser.gems_achievement_5000,

    gemsAchievement7500:
        updatedUser.gems_achievement_7500,

    gemsAchievement11000:
        updatedUser.gems_achievement_11000,

    newlyUnlocked

});


} catch (error) {

    console.error(
        "Daily quest API error:",
        error
    );


    res.status(500).json({
        error:
            "Server error"
    });

}

});

/* =========================================================
   LUCKY COIN MULTIPLIER
========================================================= */

app.post("/api/lucky-coin", async (req, res) => {

    try {

        const {
            initData
        } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                error: "Invalid Telegram data"
            });
        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {
            return res.status(400).json({
                error: "Telegram user not found"
            });
        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Lucky Coin user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });
        }

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentMultiplier =
            Number(
                user.lucky_coin_multiplier || 0
            );

        const cost =
            Number(
                user.lucky_coin_multiplier_cost || 5000
            );

        /* =========================
           CHECK COST
        ========================= */

        if (
            !Number.isFinite(cost) ||
            cost <= 0
        ) {

            return res.status(500).json({
                error:
                    "Invalid Lucky Coin cost"
            });
        }

        /* =========================
           CHECK COINS
        ========================= */

        if (currentCoins < cost) {

            return res.status(400).json({
                error: "Not enough coins"
            });
        }

        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newCoins =
            currentCoins - cost;

        const newMultiplier =
            Number(
                (
                    currentMultiplier + 0.01
                ).toFixed(2)
            );

        const newCost =
            Math.floor(
                cost * 1.5
            );

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                lucky_coin_multiplier:
                    newMultiplier,

                lucky_coin_multiplier_cost:
                    newCost

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Lucky Coin update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to upgrade Lucky Coin"
            });
        }

        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "LUCKY COIN UPGRADE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Old Multiplier:",
            currentMultiplier
        );

        console.log(
            "New Multiplier:",
            newMultiplier
        );

        console.log(
            "Cost:",
            cost
        );

        console.log(
            "Next Cost:",
            newCost
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "=============================="
        );

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            luckyCoinMultiplier:
                updatedUser.lucky_coin_multiplier,

            luckyCoinMultiplierCost:
                updatedUser.lucky_coin_multiplier_cost

        });

    } catch (error) {

        console.error(
            "Lucky Coin API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   ENERGY UPGRADE
========================================================= */

app.post("/api/energy-upgrade", async (req, res) => {

    try {

        const {
            initData,
            amount
        } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           VALIDATE AMOUNT
        ========================= */

        const upgradeAmount =
            Number(amount);

        if (
            !Number.isFinite(upgradeAmount) ||
            upgradeAmount <= 0
        ) {

            return res.status(400).json({
                error: "Invalid Energy upgrade amount"
            });

        }

        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Energy upgrade user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }

        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const currentEnergyFlatBonus =
            Number(
                user.energy_flat_bonus || 0
            );

        const currentEnergyUpgradeCost =
            Number(
                user.energy_upgrade_cost || 5000
            );

        /* =========================
           CHECK COST
        ========================= */

        if (
            !Number.isFinite(
                currentEnergyUpgradeCost
            ) ||
            currentEnergyUpgradeCost <= 0
        ) {

            return res.status(500).json({
                error:
                    "Invalid Energy upgrade cost"
            });

        }

        /* =========================
           CHECK COINS
        ========================= */

        if (
            currentCoins <
            currentEnergyUpgradeCost
        ) {

            return res.status(400).json({
                error: "Not enough coins"
            });

        }

        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newCoins =
            currentCoins -
            currentEnergyUpgradeCost;

        const newEnergyFlatBonus =
            currentEnergyFlatBonus +
            upgradeAmount;

        const newEnergyUpgradeCost =
            Math.floor(
                currentEnergyUpgradeCost * 1.5
            );

        const newMaxEnergy =
            100 +
            newEnergyFlatBonus;

        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                energy_flat_bonus:
                    newEnergyFlatBonus,

                energy_upgrade_cost:
                    newEnergyUpgradeCost

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();

        if (updateError) {

            console.error(
                "Energy upgrade update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to upgrade Energy"
            });

        }

        /* =========================
           LOG
        ========================= */

        console.log(
            "=============================="
        );

        console.log(
            "ENERGY UPGRADE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "Upgrade Amount:",
            upgradeAmount
        );

        console.log(
            "Old Energy Bonus:",
            currentEnergyFlatBonus
        );

        console.log(
            "New Energy Bonus:",
            newEnergyFlatBonus
        );

        console.log(
            "Old Cost:",
            currentEnergyUpgradeCost
        );

        console.log(
            "New Cost:",
            newEnergyUpgradeCost
        );

        console.log(
            "Max Energy:",
            newMaxEnergy
        );

        console.log(
            "Remaining Coins:",
            newCoins
        );

        console.log(
            "=============================="
        );

        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            energyFlatBonus:
                updatedUser.energy_flat_bonus,

            energyUpgradeCost:
                updatedUser.energy_upgrade_cost,

            maxEnergy:
                newMaxEnergy,

            upgradeAmount:
                upgradeAmount

        });

    } catch (error) {

        console.error(
            "Energy upgrade API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   COIN QUEST PROGRESS
========================================================= */

app.post("/api/coin-quest-progress", async (req, res) => {

    try {

        const {
            initData,
            coins
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE COINS
        ========================= */

        const earnedCoins =
            Number(coins);

        if (
            !Number.isFinite(earnedCoins) ||
            earnedCoins <= 0
        ) {

            return res.status(400).json({
                error: "Invalid coin amount"
            });

        }


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select(
                "coin_quest_count"
            )
            .eq(
                "telegram_id",
                telegramId
            )
            .single();

        if (userError || !user) {

            console.error(
                "Coin quest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT PROGRESS
        ========================= */

        const currentProgress =
            Number(
                user.coin_quest_count || 0
            );


        /* =========================
           ADD EARNED COINS
        ========================= */

        const newProgress =
            Math.min(
                currentProgress +
                earnedCoins,
                10000
            );


        /* =========================
           SAVE PROGRESS
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                coin_quest_count:
                    newProgress
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "coin_quest_count"
            )
            .single();

        if (updateError) {

            console.error(
                "Coin quest update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to update coin quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coinQuestCount:
                Number(
                    updatedUser.coin_quest_count
                )

        });


    } catch (error) {

        console.error(
            "Coin quest progress API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET DAILY COIN QUEST
========================================================= */

app.post("/api/reset-coin-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           RESET QUEST
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                coin_quest_count: 0
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "coin_quest_count"
            )
            .single();

        if (updateError) {

            console.error(
                "Coin quest reset error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to reset coin quest"
            });

        }

        console.log(
            "✅ DAILY COIN QUEST RESET:",
            telegramId
        );

        res.json({
            success: true,
            coinQuestCount:
                Number(
                    updatedUser.coin_quest_count
                ) || 0
        });

    } catch (error) {

        console.error(
            "Coin quest reset API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   ONLINE QUEST PROGRESS
========================================================= */

app.post("/api/online-quest-progress", async (req, res) => {

    try {

        const {
            initData,
            minutes
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE MINUTES
        ========================= */

        const earnedMinutes =
            Number(minutes);

        if (
            !Number.isFinite(earnedMinutes) ||
            earnedMinutes <= 0
        ) {

            return res.status(400).json({
                error: "Invalid minute amount"
            });

        }


        /* =========================
           SLOVAKIA DATE
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select(
                "online_quest_minutes, online_quest_date"
            )
            .eq(
                "telegram_id",
                telegramId
            )
            .single();


        if (
            userError ||
            !user
        ) {

            console.error(
                "Online quest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CHECK DAILY RESET
        ========================= */

        let currentMinutes = 0;

        if (
            user.online_quest_date === today
        ) {

            currentMinutes =
                Number(
                    user.online_quest_minutes
                ) || 0;

        } else {

            currentMinutes = 0;

        }


        /* =========================
           ADD MINUTES
        ========================= */

        const newMinutes =
            Math.min(
                currentMinutes +
                earnedMinutes,
                60
            );


        /* =========================
           SAVE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                online_quest_minutes:
                    newMinutes,

                online_quest_date:
                    today
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "online_quest_minutes, online_quest_date"
            )
            .single();


        if (updateError) {

            console.error(
                "Online quest update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to update online quest"
            });

        }


        console.log(
            "⏱️ ONLINE QUEST PROGRESS:",
            telegramId,
            newMinutes,
            today
        );


        res.json({

            success: true,

            onlineQuestMinutes:
                Number(
                    updatedUser.online_quest_minutes
                ),

            onlineQuestDate:
                updatedUser.online_quest_date

        });


    } catch (error) {

        console.error(
            "Online quest progress API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET ONLINE QUEST
========================================================= */

app.post("/api/reset-online-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                online_quest_minutes: 0
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "online_quest_minutes"
            )
            .single();

        if (updateError) {

            console.error(
                "Online quest reset error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to reset online quest"
            });

        }

        console.log(
            "⏱️ ONLINE QUEST RESET:",
            telegramId
        );

        res.json({
            success: true,
            onlineQuestMinutes:
                Number(
                    updatedUser.online_quest_minutes
                ) || 0
        });

    } catch (error) {

        console.error(
            "Online quest reset API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   FALLING TOKEN DAILY QUEST PROGRESS
========================================================= */

app.post("/api/falling-token-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });

        }

        /* =========================
           GET TODAY
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());

        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });

        }

        /* =========================
           CHECK QUEST DATE
        ========================= */

        const storedQuestDate =
            user.falling_token_quest_date;

        let currentCount = 0;

        if (
            storedQuestDate === today
        ) {

            currentCount =
                Number(
                    user.falling_token_quest_count
                ) || 0;

        } else {

            currentCount = 0;

        }

        /* =========================
           ADD PROGRESS
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                5
            );

        console.log(
            "🪙 FALLING QUEST UPDATE:",
            {
                telegramId,
                today,
                storedQuestDate,
                currentCount,
                addCount,
                newCount
            }
        );

        /* =========================
           SAVE PROGRESS + DATE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    falling_token_quest_count:
                        newCount,

                    falling_token_quest_date:
                        today
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Falling token quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });

        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            fallingTokenQuestCount:
                newCount
        });

    } catch (error) {

        console.error(
            "Falling token quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET FALLING TOKEN DAILY QUEST
========================================================= */

app.post("/api/reset-falling-token-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        /* =========================
           RESET COUNTER
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    falling_token_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Falling Token quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset quest"
            });
        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            fallingTokenQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Falling Token quest reset error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RICE HARVEST DAILY QUEST PROGRESS
========================================================= */

app.post("/api/rice-harvest-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET TODAY
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });

        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });

        }


        /* =========================
           CURRENT DAILY PROGRESS
        ========================= */

        const storedQuestDate =
            user.rice_harvest_quest_date;

        let currentCount = 0;

        if (
            storedQuestDate === today
        ) {

            currentCount =
                Number(
                    user.rice_harvest_quest_count
                ) || 0;

        } else {

            currentCount = 0;

        }


        /* =========================
           ADD PROGRESS
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                50
            );


        console.log(
            "🌾 RICE QUEST:",
            {
                telegramId,
                today,
                storedQuestDate,
                currentCount,
                addCount,
                newCount
            }
        );


        /* =========================
           SAVE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    rice_harvest_quest_count:
                        newCount,

                    rice_harvest_quest_date:
                        today
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Rice harvest quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            riceHarvestQuestCount:
                newCount

        });

    } catch (error) {

        console.error(
            "Rice harvest quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET RICE HARVEST DAILY QUEST
========================================================= */

app.post("/api/reset-rice-harvest-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        /* =========================
           RESET COUNTER
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    rice_harvest_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Rice harvest quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset quest"
            });
        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            riceHarvestQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Rice harvest quest reset error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   POTATO HARVEST DAILY QUEST PROGRESS
========================================================= */

app.post("/api/potato-harvest-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET TODAY
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });

        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });

        }


        /* =========================
           CURRENT DAILY PROGRESS
        ========================= */

        const storedQuestDate =
            user.potato_harvest_quest_date;

        let currentCount = 0;

        if (
            storedQuestDate === today
        ) {

            currentCount =
                Number(
                    user.potato_harvest_quest_count
                ) || 0;

        } else {

            currentCount = 0;

        }


        /* =========================
           ADD PROGRESS
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                50
            );


        console.log(
            "🥔 POTATO QUEST:",
            {
                telegramId,
                today,
                storedQuestDate,
                currentCount,
                addCount,
                newCount
            }
        );


        /* =========================
           SAVE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    potato_harvest_quest_count:
                        newCount,

                    potato_harvest_quest_date:
                        today
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Potato harvest quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            potatoHarvestQuestCount:
                newCount

        });

    } catch (error) {

        console.error(
            "Potato harvest quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET POTATO HARVEST DAILY QUEST
========================================================= */

app.post("/api/reset-potato-harvest-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    potato_harvest_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Potato harvest quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Potato quest"
            });
        }

        res.json({
            success: true
        });

    } catch (error) {

        console.error(
            "Potato harvest quest reset error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   CORN HARVEST DAILY QUEST PROGRESS
========================================================= */

app.post("/api/corn-harvest-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET TODAY
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });

        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });

        }


        /* =========================
           CURRENT DAILY PROGRESS
        ========================= */

        const storedQuestDate =
            user.corn_harvest_quest_date;

        let currentCount = 0;

        if (
            storedQuestDate === today
        ) {

            currentCount =
                Number(
                    user.corn_harvest_quest_count
                ) || 0;

        } else {

            currentCount = 0;

        }


        /* =========================
           ADD PROGRESS
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                50
            );


        console.log(
            "🌽 CORN QUEST:",
            {
                telegramId,
                today,
                storedQuestDate,
                currentCount,
                addCount,
                newCount
            }
        );


        /* =========================
           SAVE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    corn_harvest_quest_count:
                        newCount,

                    corn_harvest_quest_date:
                        today
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Corn harvest quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            cornHarvestQuestCount:
                newCount

        });

    } catch (error) {

        console.error(
            "Corn harvest quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================================================
   COMPLETE CORN HARVEST DAILY QUEST
========================================================= */

async function completeCornHarvestQuest() {

    if (cornHarvestQuestCompleted) {
        return;
    }

    if (!telegramInitData) {
        console.error(
            "Telegram initData missing"
        );
        return;
    }

    try {

        const response =
            await fetch(
                "https://server-72ja.onrender.com/api/claim-daily-quest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        initData:
                            telegramInitData,
                        questId:
                            "cornHarvest50"
                    })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            console.error(
                "Corn harvest quest claim failed:",
                data.error
            );
            return;
        }

        /* =========================
           LOAD SERVER GEM VALUES
        ========================= */

        gems =
            Number(data.gems) || 0;

        totalGemsEarned =
            Number(
                data.totalGemsEarned
            ) || 0;

        totalGemsBonus =
            Number(
                data.totalGemsBonus
            ) || 0;

        /* =========================
           MARK COMPLETED
        ========================= */

        cornHarvestQuestCompleted =
            true;

        updateDisplay();
        updateCornHarvestQuest();

    } catch (error) {

        console.error(
            "Corn harvest quest claim error:",
            error
        );
    }
}

/* =========================================================
   RESET CORN HARVEST DAILY QUEST
========================================================= */

app.post("/api/reset-corn-harvest-quest", async (req, res) => {

    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    corn_harvest_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Corn harvest quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Corn quest"
            });
        }

        res.json({
            success: true
        });

    } catch (error) {

        console.error(
            "Corn harvest quest reset error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   MOON POWER DAILY QUEST PROGRESS
========================================================= */

app.post("/api/moon-power-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        /* =========================
           LOAD USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });
        }

        /* =========================
           CALCULATE NEW COUNT
        ========================= */

        const currentCount =
            Number(
                user.moon_power_quest_count
            ) || 0;

        const newCount =
            Math.min(
                currentCount + addCount,
                1
            );

        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    moon_power_quest_count:
                        newCount
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Moon Power quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });
        }

        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            moonPowerQuestCount:
                newCount
        });

    } catch (error) {

        console.error(
            "Moon Power quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RESET MOON POWER DAILY QUEST
========================================================= */

app.post("/api/reset-moon-power-quest", async (req, res) => {
    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    moon_power_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Moon Power quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Moon Power quest"
            });
        }

        res.json({
            success: true,
            moonPowerQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Moon Power quest reset server error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   NIGHT INCOME DAILY QUEST PROGRESS
========================================================= */

app.post("/api/night-income-quest-progress", async (req, res) => {

    try {

        const { initData, count } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {

            return res.status(404).json({
                success: false,
                error: "User not found"
            });

        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });

        }


        /* =========================
           CURRENT QUEST COUNT
        ========================= */

        const currentCount =
            Number(
                user.night_income_quest_count
            ) || 0;


        /* =========================
           NEW QUEST COUNT
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                1
            );


        console.log(
            "🌙 NIGHT INCOME QUEST:",
            {
                telegramId,
                currentCount,
                addCount,
                newCount
            }
        );


        /* =========================
           SAVE QUEST PROGRESS
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    night_income_quest_count:
                        newCount
                })
                .eq(
                    "telegram_id",
                    telegramId
                );


        if (error) {

            console.error(
                "Night Income quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            nightIncomeQuestCount:
                newCount

        });


    } catch (error) {

        console.error(
            "Night Income quest progress error:",
            error
        );

        res.status(500).json({

            success: false,

            error: "Server error"

        });

    }

});

/* =========================================================
   RESET NIGHT INCOME DAILY QUEST
========================================================= */

app.post("/api/reset-night-income-quest", async (req, res) => {
    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    night_income_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Night Income quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Night Income quest"
            });
        }

        res.json({
            success: true,
            nightIncomeQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Night Income quest reset server error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RICE SOUP DAILY QUEST PROGRESS
========================================================= */

app.post("/api/rice-soup-quest-progress", async (req, res) => {
    try {

        const { initData, count } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

      const params =
    new URLSearchParams(initData);

const userJson =
    params.get("user");

if (!userJson) {
    return res.status(401).json({
        success: false,
        error: "Telegram user not found"
    });
}

const telegramUser =
    JSON.parse(userJson);

const telegramId =
    String(telegramUser.id);

        const user =
            await getUser(telegramId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });
        }

        const currentCount =
            Number(
                user.rice_soup_quest_count
            ) || 0;

        const newCount =
            Math.min(
                currentCount + addCount,
                1
            );

        const { error } =
            await supabase
                .from("users")
                .update({
                    rice_soup_quest_count:
                        newCount
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Rice Soup quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });
        }

        res.json({
            success: true,
            riceSoupQuestCount:
                newCount
        });

    } catch (error) {

        console.error(
            "Rice Soup quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RESET RICE SOUP DAILY QUEST
========================================================= */

app.post("/api/reset-rice-soup-quest", async (req, res) => {
    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    rice_soup_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Rice Soup quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Rice Soup quest"
            });
        }

        res.json({
            success: true,
            riceSoupQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Rice Soup quest reset server error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   POTATO SOUP DAILY QUEST PROGRESS
========================================================= */

app.post("/api/potato-soup-quest-progress", async (req, res) => {
    try {

        const { initData, count } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

const params =
    new URLSearchParams(initData);

const userJson =
    params.get("user");

if (!userJson) {
    return res.status(401).json({
        success: false,
        error: "Telegram user not found"
    });
}

const telegramUser =
    JSON.parse(userJson);

const telegramId =
    String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });
        }


        /* =========================
           CURRENT QUEST PROGRESS
        ========================= */

        const currentCount =
            Number(
                user.potato_soup_quest_count
            ) || 0;


        /* =========================
           ADD PROGRESS
           MAX = 1
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                1
            );


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    potato_soup_quest_count:
                        newCount
                })
                .eq(
                    "telegram_id",
                    telegramId
                );


        if (error) {

            console.error(
                "Potato Soup quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            potatoSoupQuestCount:
                newCount
        });

    } catch (error) {

        console.error(
            "Potato Soup quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RESET POTATO SOUP DAILY QUEST
========================================================= */

app.post("/api/reset-potato-soup-quest", async (req, res) => {
    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    potato_soup_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Potato Soup quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Potato Soup quest"
            });
        }

        res.json({
            success: true,
            potatoSoupQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Potato Soup quest reset server error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   CORN SOUP DAILY QUEST PROGRESS
========================================================= */

app.post("/api/corn-soup-quest-progress", async (req, res) => {
    try {

        const { initData, count } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

const params =
    new URLSearchParams(initData);

const userJson =
    params.get("user");

if (!userJson) {
    return res.status(401).json({
        success: false,
        error: "Telegram user not found"
    });
}

const telegramUser =
    JSON.parse(userJson);

const telegramId =
    String(telegramUser.id);

        /* =========================
           GET USER
        ========================= */

        const user =
            await getUser(telegramId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }


        /* =========================
           VALIDATE COUNT
        ========================= */

        const addCount =
            Number(count);

        if (
            !Number.isFinite(addCount) ||
            addCount <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid count"
            });
        }


        /* =========================
           CURRENT QUEST PROGRESS
        ========================= */

        const currentCount =
            Number(
                user.corn_soup_quest_count
            ) || 0;


        /* =========================
           ADD PROGRESS
           MAX = 1
        ========================= */

        const newCount =
            Math.min(
                currentCount + addCount,
                1
            );


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const { error } =
            await supabase
                .from("users")
                .update({
                    corn_soup_quest_count:
                        newCount
                })
                .eq(
                    "telegram_id",
                    telegramId
                );


        if (error) {

            console.error(
                "Corn Soup quest update error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update quest"
            });
        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({
            success: true,
            cornSoupQuestCount:
                newCount
        });

    } catch (error) {

        console.error(
            "Corn Soup quest progress error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   RESET CORN SOUP DAILY QUEST
========================================================= */

app.post("/api/reset-corn-soup-quest", async (req, res) => {
    try {

        const { initData } = req.body;

        if (!verifyTelegramUser(initData)) {
            return res.status(401).json({
                success: false,
                error: "Invalid Telegram initData"
            });
        }

        const telegramUser =
            getTelegramUser(initData);

        if (!telegramUser) {
            return res.status(401).json({
                success: false,
                error: "Telegram user not found"
            });
        }

        const telegramId =
            String(telegramUser.id);

        const { error } =
            await supabase
                .from("users")
                .update({
                    corn_soup_quest_count: 0
                })
                .eq(
                    "telegram_id",
                    telegramId
                );

        if (error) {

            console.error(
                "Corn Soup quest reset error:",
                error
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset Corn Soup quest"
            });
        }

        res.json({
            success: true,
            cornSoupQuestCount: 0
        });

    } catch (error) {

        console.error(
            "Corn Soup quest reset server error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

/* =========================================================
   CLICK 500 QUEST PROGRESS
========================================================= */

app.post("/api/click-quest-progress", async (req, res) => {

    try {

        const {
            initData,
            clicks
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           VALIDATE CLICKS
        ========================= */

        const earnedClicks =
            Number(clicks);

        if (
            !Number.isFinite(earnedClicks) ||
            earnedClicks <= 0
        ) {

            return res.status(400).json({
                error: "Invalid click amount"
            });

        }


        /* =========================
           GET TODAY
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Bratislava",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select(
                "click_quest_count, click_quest_date"
            )
            .eq(
                "telegram_id",
                telegramId
            )
            .single();

        if (userError || !user) {

            console.error(
                "Click quest user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT DAILY PROGRESS
        ========================= */

        const storedQuestDate =
            user.click_quest_date;

        let currentProgress = 0;

        if (
            storedQuestDate === today
        ) {

            currentProgress =
                Number(
                    user.click_quest_count
                ) || 0;

        } else {

            currentProgress = 0;

        }


        /* =========================
           ADD CLICKS
        ========================= */

        const newProgress =
            Math.min(
                currentProgress +
                earnedClicks,
                500
            );


        /* =========================
           SAVE PROGRESS
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                click_quest_count:
                    newProgress,

                click_quest_date:
                    today
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "click_quest_count, click_quest_date"
            )
            .single();

        if (updateError) {

            console.error(
                "Click quest update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to update click quest"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            clickQuestCount:
                Number(
                    updatedUser.click_quest_count
                ) || 0

        });


    } catch (error) {

        console.error(
            "Click quest progress API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   RESET DAILY CLICK 500 QUEST
========================================================= */

app.post("/api/reset-click-quest", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           RESET QUEST
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({
                click_quest_count: 0
            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select(
                "click_quest_count"
            )
            .single();

        if (updateError) {

            console.error(
                "Click quest reset error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to reset click quest"
            });

        }


        console.log(
            "✅ DAILY CLICK 500 QUEST RESET:",
            telegramId
        );


        res.json({

            success: true,

            clickQuestCount:
                Number(
                    updatedUser.click_quest_count
                ) || 0

        });

    } catch (error) {

        console.error(
            "Click quest reset API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   BUY BOOSTED COINS
========================= */

app.post("/api/buy-boosted-coins", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Boosted Coins user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentGems =
            Number(user.gems || 0);

        const currentBoostedCoinsBonus =
            Number(
                user.boosted_coins_bonus || 0
            );


        /* =========================
           SETTINGS
        ========================= */

        const COST = 100;

        const MAX_BONUS = 50;


        /* =========================
           MAX CHECK
        ========================= */

        if (
            currentBoostedCoinsBonus >=
            MAX_BONUS
        ) {

            return res.status(400).json({
                error: "Boosted Coins is already maxed"
            });

        }


        /* =========================
           GEM CHECK
        ========================= */

        if (currentGems < COST) {

            return res.status(400).json({
                error: "Not enough gems"
            });

        }


        /* =========================
           APPLY UPGRADE
        ========================= */

        const newGems =
            currentGems - COST;

        const newBoostedCoinsBonus =
            Math.min(
                currentBoostedCoinsBonus + 1,
                MAX_BONUS
            );


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                gems:
                    newGems,

                boosted_coins_bonus:
                    newBoostedCoinsBonus

            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Boosted Coins update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy Boosted Coins"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "BOOSTED COINS PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "New Gems:",
            updatedUser.gems
        );

        console.log(
            "New Boosted Coins Bonus:",
            updatedUser.boosted_coins_bonus
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            gems:
                updatedUser.gems,

            boostedCoinsBonus:
                updatedUser.boosted_coins_bonus

        });

    } catch (error) {

        console.error(
            "Boosted Coins API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   BUY COINS PER SECOND
   MULTIPLIER
========================= */

app.post("/api/buy-cps-multiplier", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "CPS Multiplier user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentGems =
            Number(user.gems || 0);

        const currentMultiplier =
            Number(
                user.coins_per_second_multiplier || 1
            );


        /* =========================
           SETTINGS
        ========================= */

        const COST = 100;

        const STEP = 0.01;

        const MAX_MULTIPLIER = 2;


        /* =========================
           MAX CHECK
        ========================= */

        if (
            currentMultiplier >=
            MAX_MULTIPLIER
        ) {

            return res.status(400).json({
                error:
                    "CPS multiplier is already maxed"
            });

        }


        /* =========================
           GEM CHECK
        ========================= */

        if (currentGems < COST) {

            return res.status(400).json({
                error: "Not enough gems"
            });

        }


        /* =========================
           APPLY UPGRADE
        ========================= */

        const newGems =
            currentGems - COST;

        const newMultiplier =
            Math.min(
                currentMultiplier + STEP,
                MAX_MULTIPLIER
            );


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                gems:
                    newGems,

                coins_per_second_multiplier:
                    newMultiplier

            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "CPS Multiplier update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy CPS multiplier"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "CPS MULTIPLIER PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "New Gems:",
            updatedUser.gems
        );

        console.log(
            "New CPS Multiplier:",
            updatedUser.coins_per_second_multiplier
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            gems:
                updatedUser.gems,

            coinsPerSecondMultiplier:
                updatedUser.coins_per_second_multiplier

        });

    } catch (error) {

        console.error(
            "CPS Multiplier API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   PASSIVE INCOME
========================= */

app.post("/api/passive-income", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Passive income user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentCoins =
            Number(user.coins || 0);

        const perSecond =
            Number(user.per_second || 0);

        const cpsBonus =
            Number(user.cps_bonus || 0);

        const coinBonus =
            Number(user.coin_bonus || 0);

        const boostedCoinsBonus =
            Number(user.boosted_coins_bonus || 0);

        const soupBonus =
            Number(user.soup_bonus || 0);

        const nightBonus =
            Number(user.night_bonus || 0);

        const tonBonus =
            Number(user.ton_bonus || 0);

        const multiplier =
            Number(
                user.coins_per_second_multiplier || 1
            );


        /* =========================
           CALCULATE CPS
        ========================= */

        const totalBonus =
            coinBonus +
            boostedCoinsBonus +
            soupBonus +
            nightBonus +
            tonBonus;

        const baseCPS =
            perSecond +
            cpsBonus;

        const finalCPS =
            baseCPS *
            (1 + totalBonus / 100) *
            multiplier;


        /* =========================
           TIME
        ========================= */

        const now =
            Date.now();

        let lastIncome =
            Number(
                user.last_passive_income_at
            );

        if (
            !Number.isFinite(lastIncome) ||
            lastIncome <= 0
        ) {
            lastIncome = now;
        }


        let elapsedSeconds =
            (now - lastIncome) / 1000;


        /* SAFETY LIMIT */

        if (elapsedSeconds < 0) {
            elapsedSeconds = 0;
        }

        if (elapsedSeconds > 60) {
            elapsedSeconds = 60;
        }


        /* =========================
           PASSIVE COINS
        ========================= */

        const passiveCoins =
            finalCPS *
            elapsedSeconds;


        const newCoins =
            currentCoins +
            passiveCoins;


        const newTotalCoinsEarned =
            Number(
                user.total_coins_earned || 0
            ) +
            passiveCoins;


        /* =========================
           MILESTONES
        ========================= */

        const MILESTONE_TARGET =
            50000000;

        const currentMilestones =
            Number(
                user.milestones_completed || 0
            );

        const earnedMilestones =
            Math.floor(
                newTotalCoinsEarned /
                MILESTONE_TARGET
            );

        const newMilestones =
            Math.max(
                currentMilestones,
                earnedMilestones
            );

        const milestoneDifference =
            newMilestones -
            currentMilestones;


        const newTapPower =
            Number(user.tap_power || 1) +
            (
                milestoneDifference *
                100
            );


        const newPerSecond =
            Number(user.per_second || 0) +
            (
                milestoneDifference *
                100
            );


        /* =========================
           SAVE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                coins:
                    newCoins,

                total_coins_earned:
                    newTotalCoinsEarned,

                milestones_completed:
                    newMilestones,

                tap_power:
                    newTapPower,

                per_second:
                    newPerSecond,

                last_passive_income_at:
                    now

            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Passive income update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to save passive income"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            coins:
                updatedUser.coins,

            totalCoinsEarned:
                updatedUser.total_coins_earned,

            milestonesCompleted:
                updatedUser.milestones_completed,

            tapPower:
                updatedUser.tap_power,

            perSecond:
                updatedUser.per_second,

            passiveCoins:
                passiveCoins

        });

    } catch (error) {

        console.error(
            "Passive income API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   BUY LUCKY COIN CHANCE
========================= */

app.post("/api/buy-lucky-chance", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           PARSE TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .single();

        if (userError || !user) {

            console.error(
                "Lucky Chance user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentGems =
            Number(user.gems || 0);

        const currentLuckyChance =
            Number(
                user.lucky_coin_chance || 1
            );


        /* =========================
           SETTINGS
        ========================= */

        const COST = 100;

        const STEP = 1;

        const MAX_CHANCE = 80;


        /* =========================
           MAX CHECK
        ========================= */

        if (
            currentLuckyChance >=
            MAX_CHANCE
        ) {

            return res.status(400).json({
                error:
                    "Lucky Coin Chance is already maxed"
            });

        }


        /* =========================
           GEM CHECK
        ========================= */

        if (currentGems < COST) {

            return res.status(400).json({
                error: "Not enough gems"
            });

        }


        /* =========================
           APPLY UPGRADE
        ========================= */

        const newGems =
            currentGems - COST;

        const newLuckyChance =
            Math.min(
                currentLuckyChance + STEP,
                MAX_CHANCE
            );


        /* =========================
           UPDATE SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                gems:
                    newGems,

                lucky_coin_chance:
                    newLuckyChance

            })
            .eq("telegram_id", telegramId)
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Lucky Chance update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy Lucky Coin Chance"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "LUCKY COIN CHANCE PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "New Gems:",
            updatedUser.gems
        );

        console.log(
            "New Lucky Chance:",
            updatedUser.lucky_coin_chance
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            gems:
                updatedUser.gems,

            luckyCoinChance:
                updatedUser.lucky_coin_chance

        });

    } catch (error) {

        console.error(
            "Lucky Chance API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   BUY ENERGY PERCENT
========================= */

app.post("/api/buy-energy-percent", async (req, res) => {

    try {

        const { initData } = req.body;

        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }

        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const { data: user, error: userError } =
            await supabase
                .from("users")
                .select("*")
                .eq("telegram_id", telegramId)
                .single();

        if (userError || !user) {

            console.error(
                "Energy Percent user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const currentGems =
            Number(user.gems || 0);

        const currentEnergyBonusPercent =
            Number(
                user.energy_bonus_percent || 0
            );


        /* =========================
           SETTINGS
        ========================= */

        const COST = 100;
        const STEP = 1;
        const MAX_PERCENT = 50;


        /* =========================
           MAX CHECK
        ========================= */

        if (
            currentEnergyBonusPercent >=
            MAX_PERCENT
        ) {

            return res.status(400).json({
                error:
                    "Max Energy is already maxed"
            });

        }


        /* =========================
           GEMS CHECK
        ========================= */

        if (currentGems < COST) {

            return res.status(400).json({
                error: "Not enough gems"
            });

        }


        /* =========================
           NEW VALUES
        ========================= */

        const newGems =
            currentGems - COST;

        const newEnergyBonusPercent =
            Math.min(
                currentEnergyBonusPercent + STEP,
                MAX_PERCENT
            );


        /* =========================
           UPDATE SERVER
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } =
            await supabase
                .from("users")
                .update({

                    gems: newGems,

                    energy_bonus_percent:
                        newEnergyBonusPercent

                })
                .eq(
                    "telegram_id",
                    telegramId
                )
                .select("*")
                .single();


        if (updateError) {

            console.error(
                "Energy Percent update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to buy Max Energy"
            });

        }


        /* =========================
           LOG
        ========================= */

        console.log(
            "MAX ENERGY PERCENT PURCHASE"
        );

        console.log(
            "Telegram ID:",
            telegramId
        );

        console.log(
            "New Gems:",
            updatedUser.gems
        );

        console.log(
            "New Energy Bonus Percent:",
            updatedUser.energy_bonus_percent
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            gems:
                updatedUser.gems,

            energyBonusPercent:
                updatedUser.energy_bonus_percent

        });

    } catch (error) {

        console.error(
            "Energy Percent API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================
   USE ENERGY REFILL
========================================= */

app.post("/api/use-energy-refill", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           TODAY
           EUROPE / BRATISLAVA
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        "Europe/Bratislava",

                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET REFILL STATE
        ========================= */

        const {
            data: user,
            error: userError
        } =
            await supabase
                .from("users")
                .select(
                    "energy_refills_used, energy_refills_date"
                )
                .eq(
                    "telegram_id",
                    telegramId
                )
                .single();


        if (userError || !user) {

            console.error(
                "Energy refill user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           DAILY RESET
        ========================= */

        let energyRefillsUsed = 0;

        if (
            user.energy_refills_date ===
            today
        ) {

            energyRefillsUsed =
                Number(
                    user.energy_refills_used
                ) || 0;

        }


        /* =========================
           MAX 3 REFILLS
        ========================= */

        if (
            energyRefillsUsed >= 3
        ) {

            return res.status(400).json({

                error:
                    "Daily energy refill limit reached",

                energyRefillsUsed:
                    energyRefillsUsed

            });

        }


        /* =========================
           USE REFILL
        ========================= */

        const newRefillCount =
            energyRefillsUsed + 1;


        /* =========================
           SAVE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } =
            await supabase
                .from("users")
                .update({

                    energy_refills_used:
                        newRefillCount,

                    energy_refills_date:
                        today

                })
                .eq(
                    "telegram_id",
                    telegramId
                )
                .select(
                    "energy_refills_used, energy_refills_date"
                )
                .single();


        if (updateError) {

            console.error(
                "Energy refill update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to save energy refill"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            energyRefillsUsed:
                Number(
                    updatedUser.energy_refills_used
                ),

            energyRefillsDate:
                updatedUser.energy_refills_date

        });


    } catch (error) {

        console.error(
            "Energy refill API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   DAILY CASE
========================================================= */

app.post("/api/daily-case", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           TODAY
           EUROPE / BRATISLAVA
        ========================= */

        const today =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        "Europe/Bratislava",

                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(new Date());


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } =
            await supabase
                .from("users")
                .select(
                    "coins, gems, total_coins_earned, total_gems_earned, daily_case_spins_used, daily_case_date"
                )
                .eq(
                    "telegram_id",
                    telegramId
                )
                .single();


        if (userError || !user) {

            console.error(
                "Daily Case user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CHECK DAILY SPINS
        ========================= */

        let spinsUsed = 0;

        if (
            user.daily_case_date ===
            today
        ) {

            spinsUsed =
                Number(
                    user.daily_case_spins_used
                ) || 0;

        }


        /* =========================
           MAX 3 SPINS
        ========================= */

        if (spinsUsed >= 3) {

            return res.status(400).json({

                error:
                    "Daily Case spins exhausted",

                caseSpinsUsed:
                    spinsUsed,

                caseSpinsRemaining:
                    0

            });

        }


        /* =========================
           REWARDS
        ========================= */

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


        /* =========================
           SERVER RANDOM REWARD
        ========================= */

        const random =
            Math.random() * 100;

        let totalChance = 0;

        let winner =
            caseRewards[
                caseRewards.length - 1
            ];


        for (
            const reward of caseRewards
        ) {

            totalChance +=
                reward.chance;

            if (
                random < totalChance
            ) {

                winner = reward;

                break;

            }

        }


        /* =========================
           CALCULATE NEW VALUES
        ========================= */

        const newSpinsUsed =
            spinsUsed + 1;

        let newCoins =
            Number(user.coins) || 0;

        let newGems =
            Number(user.gems) || 0;

        let newTotalCoinsEarned =
            Number(
                user.total_coins_earned
            ) || 0;

        let newTotalGemsEarned =
            Number(
                user.total_gems_earned
            ) || 0;

            console.log(
    "🎁 DAILY CASE TOTAL GEMS BEFORE REWARD:",
    newTotalGemsEarned
);

        /* =========================
           APPLY REWARD
        ========================= */

        if (
            winner.type ===
            "coins"
        ) {

            newCoins +=
                winner.amount;

            newTotalCoinsEarned +=
                winner.amount;

        }


        if (
            winner.type ===
            "gems"
        ) {

            newGems +=
                winner.amount;

            newTotalGemsEarned +=
                winner.amount;

    console.log(
        "🎁 DAILY CASE TOTAL GEMS AFTER REWARD:",
        newTotalGemsEarned
    );

        }

/* =========================
   CHECK GEM ACHIEVEMENTS
========================= */

let newTotalGemsBonus = 0;

const {
    data: achievementUser,
    error: achievementUserError
} = await supabase
    .from("users")
    .select(
        "total_gems_bonus, gems_achievement_100, gems_achievement_250, gems_achievement_500, gems_achievement_1000, gems_achievement_1750, gems_achievement_3000, gems_achievement_5000, gems_achievement_7500, gems_achievement_11000"
    )
    .eq(
        "telegram_id",
        telegramId
    )
    .single();

if (
    achievementUserError ||
    !achievementUser
) {

    console.error(
        "Daily Case achievement user error:",
        achievementUserError
    );

    return res.status(500).json({
        error:
            "Failed to load gem achievements"
    });

}

newTotalGemsBonus =
    Number(
        achievementUser.total_gems_bonus
    ) || 0;


const achievementFlags = {

    100:
        Boolean(
            achievementUser.gems_achievement_100
        ),

    250:
        Boolean(
            achievementUser.gems_achievement_250
        ),

    500:
        Boolean(
            achievementUser.gems_achievement_500
        ),

    1000:
        Boolean(
            achievementUser.gems_achievement_1000
        ),

    1750:
        Boolean(
            achievementUser.gems_achievement_1750
        ),

    3000:
        Boolean(
            achievementUser.gems_achievement_3000
        ),

    5000:
        Boolean(
            achievementUser.gems_achievement_5000
        ),

    7500:
        Boolean(
            achievementUser.gems_achievement_7500
        ),

    11000:
        Boolean(
            achievementUser.gems_achievement_11000
        )

};


const achievementRewards = {

    100: 2,
    250: 4,
    500: 6,
    1000: 8,
    1750: 10,
    3000: 12,
    5000: 14,
    7500: 16,
    11000: 18

};


let newlyUnlocked = [];


console.log(
    "🎁 DAILY CASE ACHIEVEMENT CHECK:",
    {
        totalGemsEarned:
            newTotalGemsEarned,

        gem100AlreadyUnlocked:
            achievementFlags[100],

        gem100Condition:
            newTotalGemsEarned >= 100
    }
);


for (
    const threshold of Object.keys(
        achievementRewards
    )
) {

    const thresholdNumber =
        Number(threshold);


    if (
        newTotalGemsEarned >=
            thresholdNumber &&

        !achievementFlags[
            thresholdNumber
        ]
    ) {

        console.log(
            "🏆 DAILY CASE GEM ACHIEVEMENT UNLOCKED:",
            thresholdNumber
        );


        achievementFlags[
            thresholdNumber
        ] = true;


        newTotalGemsBonus +=
            achievementRewards[
                thresholdNumber
            ];


        newlyUnlocked.push({

            threshold:
                thresholdNumber,

            reward:
                achievementRewards[
                    thresholdNumber
                ]

        });

    }

}

/* =========================
   SAVE TO SUPABASE
========================= */

const {
    data: updatedUser,
    error: updateError
} = await supabase
    .from("users")
    .update({

        coins:
            newCoins,

        gems:
            newGems,

        total_coins_earned:
            newTotalCoinsEarned,

        total_gems_earned:
            newTotalGemsEarned,

        total_gems_bonus:
            newTotalGemsBonus,

        gems_achievement_100:
            achievementFlags[100],

        gems_achievement_250:
            achievementFlags[250],

        gems_achievement_500:
            achievementFlags[500],

        gems_achievement_1000:
            achievementFlags[1000],

        gems_achievement_1750:
            achievementFlags[1750],

        gems_achievement_3000:
            achievementFlags[3000],

        gems_achievement_5000:
            achievementFlags[5000],

        gems_achievement_7500:
            achievementFlags[7500],

        gems_achievement_11000:
            achievementFlags[11000],

        daily_case_spins_used:
            newSpinsUsed,

        daily_case_date:
            today

    })
    .eq(
        "telegram_id",
        telegramId
    )
    .select("*")
    .single();

if (updateError) {

    console.error(
        "Daily Case update error:",
        updateError
    );

    return res.status(500).json({
        error:
            "Failed to save Daily Case"
    });

}


      /* =========================
   RESPONSE
========================= */

res.json({

    success: true,

    reward: winner,

    coins:
        Number(
            updatedUser.coins
        ),

    gems:
        Number(
            updatedUser.gems
        ),

    totalCoinsEarned:
        Number(
            updatedUser.total_coins_earned
        ),

    totalGemsEarned:
        Number(
            updatedUser.total_gems_earned
        ),

    totalGemsBonus:
        Number(
            updatedUser.total_gems_bonus
        ),

    gemsAchievement100:
        Boolean(
            updatedUser.gems_achievement_100
        ),

    gemsAchievement250:
        Boolean(
            updatedUser.gems_achievement_250
        ),

    gemsAchievement500:
        Boolean(
            updatedUser.gems_achievement_500
        ),

    gemsAchievement1000:
        Boolean(
            updatedUser.gems_achievement_1000
        ),

    gemsAchievement1750:
        Boolean(
            updatedUser.gems_achievement_1750
        ),

    gemsAchievement3000:
        Boolean(
            updatedUser.gems_achievement_3000
        ),

    gemsAchievement5000:
        Boolean(
            updatedUser.gems_achievement_5000
        ),

    gemsAchievement7500:
        Boolean(
            updatedUser.gems_achievement_7500
        ),

    gemsAchievement11000:
        Boolean(
            updatedUser.gems_achievement_11000
        ),

    newlyUnlocked:

        newlyUnlocked,

    caseSpinsUsed:
        Number(
            updatedUser.daily_case_spins_used
        ),

    caseSpinsRemaining:
        3 -
        Number(
            updatedUser.daily_case_spins_used
        ),

    caseDate:
        updatedUser.daily_case_date

});


    } catch (error) {

        console.error(
            "Daily Case API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================================================
   COIN ACHIEVEMENTS
========================================================= */

app.post("/api/coin-achievements", async (req, res) => {

    try {

        const { initData } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");

        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }

        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           GET USER
        ========================= */

        const {
            data: user,
            error: userError
        } = await supabase
            .from("users")
            .select(
                "total_coins_earned, total_coin_bonus, coins_achievement_1m, coins_achievement_10m, coins_achievement_25m, coins_achievement_75m, coins_achievement_225m, coins_achievement_750m, coins_achievement_1b, coins_achievement_5b, coins_achievement_10b"
            )
            .eq(
                "telegram_id",
                telegramId
            )
            .single();

        if (
            userError ||
            !user
        ) {

            console.error(
                "Coin achievements user error:",
                userError
            );

            return res.status(404).json({
                error: "User not found"
            });

        }


        /* =========================
           CURRENT VALUES
        ========================= */

        const totalCoinsEarned =
            Number(
                user.total_coins_earned
            ) || 0;

        let totalCoinBonus =
            Number(
                user.total_coin_bonus
            ) || 0;


        const achievements = {

            1000000:
                Boolean(
                    user.coins_achievement_1m
                ),

            10000000:
                Boolean(
                    user.coins_achievement_10m
                ),

            25000000:
                Boolean(
                    user.coins_achievement_25m
                ),

            75000000:
                Boolean(
                    user.coins_achievement_75m
                ),

            225000000:
                Boolean(
                    user.coins_achievement_225m
                ),

            750000000:
                Boolean(
                    user.coins_achievement_750m
                ),

            1000000000:
                Boolean(
                    user.coins_achievement_1b
                ),

            5000000000:
                Boolean(
                    user.coins_achievement_5b
                ),

            10000000000:
                Boolean(
                    user.coins_achievement_10b
                )

        };


        /* =========================
           ACHIEVEMENT REWARDS
        ========================= */

        const rewards = {

            1000000: 2,
            10000000: 4,
            25000000: 6,
            75000000: 8,
            225000000: 10,
            750000000: 12,
            1000000000: 14,
            5000000000: 16,
            10000000000: 18

        };


        let newlyUnlocked = [];


        /* =========================
           CHECK ALL ACHIEVEMENTS
        ========================= */

        for (
            const threshold of
            Object.keys(rewards)
        ) {

            const thresholdNumber =
                Number(threshold);


            if (
                totalCoinsEarned >=
                    thresholdNumber &&
                !achievements[
                    thresholdNumber
                ]
            ) {

                console.log(
                    "🏆 COIN ACHIEVEMENT UNLOCKED:",
                    thresholdNumber
                );


                achievements[
                    thresholdNumber
                ] = true;


                totalCoinBonus +=
                    rewards[
                        thresholdNumber
                    ];


                newlyUnlocked.push({

                    threshold:
                        thresholdNumber,

                    reward:
                        rewards[
                            thresholdNumber
                        ]

                });

            }

        }


        /* =========================
           SAVE TO SUPABASE
        ========================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase
            .from("users")
            .update({

                total_coin_bonus:
                    totalCoinBonus,

                coins_achievement_1m:
                    achievements[
                        1000000
                    ],

                coins_achievement_10m:
                    achievements[
                        10000000
                    ],

                coins_achievement_25m:
                    achievements[
                        25000000
                    ],

                coins_achievement_75m:
                    achievements[
                        75000000
                    ],

                coins_achievement_225m:
                    achievements[
                        225000000
                    ],

                coins_achievement_750m:
                    achievements[
                        750000000
                    ],

                coins_achievement_1b:
                    achievements[
                        1000000000
                    ],

                coins_achievement_5b:
                    achievements[
                        5000000000
                    ],

                coins_achievement_10b:
                    achievements[
                        10000000000
                    ]

            })
            .eq(
                "telegram_id",
                telegramId
            )
            .select("*")
            .single();


        if (updateError) {

            console.error(
                "Coin achievements update error:",
                updateError
            );

            return res.status(500).json({
                error:
                    "Failed to update coin achievements"
            });

        }


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            totalCoinsEarned:
                Number(
                    updatedUser.total_coins_earned
                ),

            totalCoinBonus:
                Number(
                    updatedUser.total_coin_bonus
                ),

            coinsAchievement1m:
                Boolean(
                    updatedUser.coins_achievement_1m
                ),

            coinsAchievement10m:
                Boolean(
                    updatedUser.coins_achievement_10m
                ),

            coinsAchievement25m:
                Boolean(
                    updatedUser.coins_achievement_25m
                ),

            coinsAchievement75m:
                Boolean(
                    updatedUser.coins_achievement_75m
                ),

            coinsAchievement225m:
                Boolean(
                    updatedUser.coins_achievement_225m
                ),

            coinsAchievement750m:
                Boolean(
                    updatedUser.coins_achievement_750m
                ),

            coinsAchievement1b:
                Boolean(
                    updatedUser.coins_achievement_1b
                ),

            coinsAchievement5b:
                Boolean(
                    updatedUser.coins_achievement_5b
                ),

            coinsAchievement10b:
                Boolean(
                    updatedUser.coins_achievement_10b
                ),

            newlyUnlocked

        });


    } catch (error) {

        console.error(
            "Coin achievements API error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});

/* =========================
   PROCESS REFERRAL
========================= */

app.post("/api/referral", async (req, res) => {

    try {

        const {
            initData,
            referralCode
        } = req.body;


        /* =========================
           VERIFY TELEGRAM
        ========================= */

        if (!verifyTelegramUser(initData)) {

            return res.status(401).json({
                error: "Invalid Telegram data"
            });

        }


        /* =========================
           GET TELEGRAM USER
        ========================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");


        if (!userJson) {

            return res.status(400).json({
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        /* =========================
           CHECK REFERRAL CODE
        ========================= */

        if (!referralCode) {

            return res.status(400).json({
                error: "Referral code is required"
            });

        }


        /* =========================
           PREVENT SELF REFERRAL
        ========================= */

        if (
            String(referralCode) ===
            telegramId
        ) {

            return res.status(400).json({
                error: "You cannot refer yourself"
            });

        }


        /* =========================
           FIND NEW USER
        ========================= */

        const newUser =
            await getUser(telegramId);


        if (!newUser) {

            return res.status(404).json({
                error: "User does not exist"
            });

        }


        /* =========================
           ALREADY REFERRED?
        ========================= */

        if (newUser.referred_by) {

            return res.status(400).json({
                error: "Referral already used"
            });

        }


        /* =========================
           FIND REFERRER
        ========================= */

        const { data: referrer, error: referrerError } =
            await supabase
                .from("users")
                .select("*")
                .eq(
                    "referral_code",
                    String(referralCode)
                )
                .maybeSingle();


        if (referrerError) {

            throw referrerError;

        }


        if (!referrer) {

            return res.status(404).json({
                error: "Referral code not found"
            });

        }


        /* =========================
           CONNECT USERS
        ========================= */

        const { error: updateUserError } =
            await supabase
                .from("users")
                .update({
                    referred_by:
                        referrer.telegram_id
                })
                .eq(
                    "telegram_id",
                    telegramId
                );


        if (updateUserError) {

            throw updateUserError;

        }


       /* =========================================================
   INCREASE REFERRAL COUNT + TOTAL BONUS
========================================================= */

const newReferralCount =
    Number(referrer.referral_count || 0) + 1;

const newCoinBonus =
    Number(referrer.coin_bonus || 0) + 1;

const { data: updatedReferrer, error: referralUpdateError } =
    await supabase
        .from("users")
        .update({

            referral_count:
                newReferralCount,

            coin_bonus:
                newCoinBonus

        })
        .eq(
            "telegram_id",
            referrer.telegram_id
        )
        .select("*")
        .single();

if (referralUpdateError) {

    throw referralUpdateError;

}


        if (countError) {

            throw countError;

        }

        /* =========================
           GET UPDATED REFERRER
        ========================= */

        console.log(
            `Referral registered: ${telegramId} -> ${referrer.telegram_id}`
        );


        /* =========================
           RESPONSE
        ========================= */

        res.json({

            success: true,

            message:
                "Referral successfully registered",

            referrer: {

                telegram_id:
                    updatedReferrer.telegram_id,

                referral_count:
                    updatedReferrer.referral_count,

                coin_bonus:
                    updatedReferrer.coin_bonus

            }

        });

    } catch (error) {

        console.error(
            "Referral error:",
            error
        );

        res.status(500).json({
            error: "Referral processing failed"
        });

    }

});


/* =========================
   TELEGRAM /START
========================= */

bot.onText(
    /^\/start(?:\s+(.+))?$/,
    async (msg, match) => {

        try {

            const telegramId =
                String(msg.from.id);

            const username =
                msg.from.username || "";

            const startParameter =
                match && match[1]
                    ? match[1]
                    : null;


            console.log(
                "User started bot:",
                telegramId,
                startParameter
            );


            /* =========================
               GET / CREATE USER
            ========================= */

            let user =
                await getOrCreateUser(
                    telegramId,
                    username
                );


            /* =========================
               CHECK REFERRAL
            ========================= */

            if (
                startParameter &&
                startParameter.startsWith("ref_")
            ) {

                const referralCode =
                    startParameter.substring(4);


                /* =========================
                   PREVENT SELF REFERRAL
                ========================= */

                if (
                    referralCode !== telegramId &&
                    !user.referred_by
                ) {


                    /* =========================
                       FIND REFERRER
                    ========================= */

                    const { data: referrer } =
                        await supabase
                            .from("users")
                            .select("*")
                            .eq(
                                "referral_code",
                                referralCode
                            )
                            .maybeSingle();


                    if (referrer) {


                        /* =========================
                           CONNECT USERS
                        ========================= */

                        await supabase
                            .from("users")
                            .update({
                                referred_by:
                                    referrer.telegram_id
                            })
                            .eq(
                                "telegram_id",
                                telegramId
                            );

/* =========================
   GET CURRENT REFERRER VALUES
========================= */

const currentReferrer =
    await getUser(referrer.telegram_id);

if (!currentReferrer) {

    throw new Error(
        "Referrer disappeared from database"
    );

}


/* =========================
   INCREASE REFERRAL STATS
========================= */

const newReferralCount =
    Number(currentReferrer.referral_count || 0) + 1;

const newCoinBonus =
    Number(currentReferrer.coin_bonus || 0) + 1;

const { data: updatedReferrer, error: referralUpdateError } =
    await supabase
        .from("users")
        .update({

            referral_count:
                newReferralCount,

            coin_bonus:
                newCoinBonus,

        })
        .eq(
            "telegram_id",
            referrer.telegram_id
        )
        .select("*")
        .single();


if (referralUpdateError) {

    console.error(
        "REFERRAL UPDATE ERROR:",
        referralUpdateError
    );

    throw referralUpdateError;

}


console.log(
    "================================"
);

console.log(
    "REFERRAL SUCCESSFULLY UPDATED"
);

console.log(
    "Referrer:",
    updatedReferrer.telegram_id
);

console.log(
    "Referral Count:",
    updatedReferrer.referral_count
);

console.log(
    "Coin Bonus:",
    updatedReferrer.coin_bonus
);

console.log(
    "Stat Bonus:",
    updatedReferrer.stat_bonus
);

console.log(
    "================================"
);
                        


                        console.log(
                            `Referral registered: ${telegramId} -> ${referrer.telegram_id}`
                        );

                    }

                }

            }


            /* =========================
               SEND GAME BUTTON
            ========================= */

            await bot.sendMessage(

                msg.chat.id,

                "🌾 Welcome to Clicker Farm!",

                {
                    reply_markup: {

                        inline_keyboard: [

                            [

                                {
                                    text:
                                        "🌽 PLAY CLICKER FARM",

                                    web_app: {

                                        url:
                                            "https://pustulak0.github.io/Clickerfarm/"

                                    }

                                }

                            ]

                        ]

                    }

                }

            );

        } catch (error) {

            console.error(
                "Telegram /start error:",
                error
            );

        }

    }
);

/* =========================
   LEADERBOARD
========================= */

app.get("/api/leaderboard/:type", async (req, res) => {

    try {

        const type = req.params.type;

        let column;

        if (type === "coins") {
            column = "coins";
        }

        else if (type === "clicks") {
            column = "total_clicks";
        }

        else if (type === "gems") {
            column = "gems";
        }

        else {
            return res.status(400).json({
                error: "Invalid leaderboard type"
            });
        }


        const { data, error } =
            await supabase
                .from("users")
                .select(
                    "username, coins, total_clicks, gems"
                )
                .order(
                    column,
                    { ascending: false }
                )
                .limit(100);


        if (error) {

            console.error(
                "Leaderboard error:",
                error
            );

            return res.status(500).json({
                error: "Failed to load leaderboard"
            });
        }


        res.json({
            success: true,
            leaderboard: data
        });

    }

    catch (error) {

        console.error(
            "Leaderboard server error:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });
    }

});

/* =========================================================
   TON PAYMENT VERIFICATION - testnet
========================================================= */

const MERCHANT_WALLET =
    "0QCeQ0jARgobOlQUuleG9jlzR6anqHizVvaP8Z7lj5XwBbe0";

const tonClient = new TonClient({
    endpoint:
        "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey:
        process.env.TONCENTER_API_KEY
});


/* =========================================================
   GEM PACKAGES
========================================================= */

const TON_GEM_PACKAGES = {

    "100": {
        gems: 100,
        amountNano: "100000000"
    },

    "250": {
        gems: 250,
        amountNano: "250000000"
    },

    "500": {
        gems: 500,
        amountNano: "500000000"
    },

    "1000": {
        gems: 1000,
        amountNano: "1000000000"
    }

};

/* =========================================================
   TON TAP POWER PACKAGE
========================================================= */

const TON_TAP_POWER_PACKAGE = {

    amountNano: "100000000", // 0.1 TON
    tapBonus: 5

};

/* =========================================================
   TON TOTAL BONUS PACKAGE
========================================================= */

const TON_TOTAL_BONUS_PACKAGE = {

    amountNano: "100000000",
    totalBonus: 5

};

/* =========================================================
   TON CPS + TOTAL BONUS PACKAGE
========================================================= */

const TON_CPS_TOTAL_BONUS_PACKAGE = {

    amountNano: "150000000", // 0.15 TON

    cpsBonus: 100,

    totalBonus: 5

};

/* =========================================================
   TON TAP POWER  + TOTAL POWER BONUS PACKAGE
========================================================= */

const TON_TAP_POWER_100_PACKAGE = {
    amountNano: "150000000", // 0.15 TON
    tapPower: 100,
    tapBonus: 5
};

/* =========================================================
   NORMALIZED TON CONNECT EXTERNAL MESSAGE HASH
========================================================= */

function getNormalizedExtMessageHash(message) {

    if (
        message.info.type !== "external-in"
    ) {

        throw new Error(
            `Message must be external-in, got ${message.info.type}`
        );

    }


    const info = {

        ...message.info,

        src: undefined,

        importFee: 0n

    };


    const normalizedMessage = {

        ...message,

        init: null,

        info: info

    };


    return beginCell()

        .store(

            storeMessage(

                normalizedMessage,

                {
                    forceRef: true
                }

            )

        )

        .endCell()

        .hash();

}


/* =========================================================
   FIND TRANSACTION FROM TON CONNECT BOC
========================================================= */

async function findTransactionByTonConnectBoc(
    boc
) {

    const cells =
        Cell.fromBoc(
            Buffer.from(
                boc,
                "base64"
            )
        );


    if (
        !cells ||
        cells.length === 0
    ) {

        throw new Error(
            "Invalid transaction BOC"
        );

    }


    const externalMessage =
        loadMessage(
            cells[0].beginParse()
        );


    if (
        externalMessage.info.type !==
        "external-in"
    ) {

        throw new Error(
            "TonConnect BOC is not an external-in message"
        );

    }


    const account =
        externalMessage.info.dest;


    const targetHash =
        getNormalizedExtMessageHash(
            externalMessage
        );


    let lt;
    let hash;


    for (
        let page = 0;
        page < 10;
        page++
    ) {

        const transactions =
            await tonClient.getTransactions(
                account,
                {
                    lt,
                    hash,
                    limit: 20,
                    archival: true
                }
            );


        if (
            transactions.length === 0
        ) {

            return null;

        }


        for (
            const transaction
            of transactions
        ) {

            if (
                !transaction.inMessage
            ) {

                continue;

            }


            if (
                transaction.inMessage.info.type !==
                "external-in"
            ) {

                continue;

            }


            let blockchainHash;

            try {

                blockchainHash =
                    getNormalizedExtMessageHash(
                        transaction.inMessage
                    );

            } catch {

                continue;

            }


            if (
                blockchainHash.equals(
                    targetHash
                )
            ) {

                return transaction;

            }

        }


        const last =
            transactions[
                transactions.length - 1
            ];


        lt =
            last.lt.toString();


        hash =
            last.hash().toString(
                "base64"
            );

    }


    return null;

}


/* =========================================================
   VERIFY TON PAYMENT
========================================================= */

app.post(
    "/api/verify-ton-payment",
    async (req, res) => {

        try {

           const {
    initData,
    boc,
    gemAmount,
    purchaseType
    } = req.body;

            console.log("");
            console.log("================================");
            console.log("TON PAYMENT VERIFICATION");
            console.log("================================");


            /* =================================================
               VERIFY TELEGRAM
            ================================================= */

            if (
                !verifyTelegramUser(
                    initData
                )
            ) {

                return res.status(401).json({

                    success: false,

                    paid: false,

                    error:
                        "Invalid Telegram data"

                });

            }

/* =================================================
   GET TELEGRAM USER
================================================= */

const params =
    new URLSearchParams(
        initData
    );

const userJson =
    params.get("user");

if (!userJson) {

    return res.status(400).json({

        success: false,
        paid: false,

        error:
            "Telegram user not found"

    });

}

const telegramUser =
    JSON.parse(userJson);

const telegramId =
    String(
        telegramUser.id
    );

/* =========================================================
   VALIDATE PURCHASE TYPE
========================================================= */

let packageInfo;
let purchaseIsTapPower = false;
let purchaseIsTapPower100 = false;
let purchaseIsTotalBonus = false;
let purchaseIsCpsTotalBonus = false;

/* =========================================================
   GEM PURCHASE
========================================================= */

if (
    purchaseType !== "tap_power" &&
    purchaseType !== "tap_power_100" &&
    purchaseType !== "total_bonus" &&
    purchaseType !== "cps_total_bonus"
) {

    packageInfo =
        TON_GEM_PACKAGES[
            String(gemAmount)
        ];

    if (!packageInfo) {

        return res.status(400).json({

            success: false,
            paid: false,

            error:
                "Invalid gem package"

        });

    }

}


/* =========================================================
   TAP POWER PURCHASE
========================================================= */

else if (
    purchaseType === "tap_power"
) {

    purchaseIsTapPower = true;

    packageInfo =
        TON_TAP_POWER_PACKAGE;

}


/* =========================================================
   TOTAL BONUS PURCHASE
========================================================= */

else if (
    purchaseType === "total_bonus"
) {

    purchaseIsTotalBonus = true;

    packageInfo =
        TON_TOTAL_BONUS_PACKAGE;

} 

/* =========================================================
   CPS + TOTAL BONUS PURCHASE
========================================================= */

else if (
    purchaseType === "cps_total_bonus"
) {

    purchaseIsCpsTotalBonus = true;

    packageInfo =
        TON_CPS_TOTAL_BONUS_PACKAGE;

}

/* =========================================================
   TAP POWER + TAP POWER BONUS PURCHASE
========================================================= */

else if (purchaseType === "tap_power_100") {
    purchaseIsTapPower100 = true;
    packageInfo = TON_TAP_POWER_100_PACKAGE;
}

/* =========================================================
   REQUIRED PAYMENT AMOUNT
========================================================= */

const requiredAmount =
    BigInt(
        packageInfo.amountNano
    );


console.log(
    "Telegram ID:",
    telegramId
);

console.log(
    "Purchase type:",
    purchaseIsTapPower
        ? "TAP POWER"
        : purchaseIsTapPower100
            ? "TAP POWER +100"
            : purchaseIsTotalBonus
                ? "TOTAL BONUS"
                : purchaseIsCpsTotalBonus
                    ? "CPS + TOTAL BONUS"
                    : "GEMS"
);

console.log(
    "Required TON:",
    packageInfo.amountNano
);

if (purchaseIsTapPower) {

    console.log(
        "Tap bonus:",
        packageInfo.tapBonus + "%"
    );
}
else if (purchaseIsTapPower100) {

    console.log(
        "Tap power added:",
        "+" + packageInfo.tapPower
    );

    console.log(
        "Tap bonus added:",
        "+" + packageInfo.tapBonus + "%"
    );

}
else if (purchaseIsTotalBonus) {

    console.log(
        "Total bonus:",
        packageInfo.totalBonus + "%"
    );

}
else if (purchaseIsCpsTotalBonus) {

    console.log(
        "CPS bonus:",
        "+" + packageInfo.cpsBonus
    );

    console.log(
        "Total bonus:",
        "+" + packageInfo.totalBonus + "%"
    );

}
else {

    console.log(
        "Gem package:",
        packageInfo.gems
    );

}



/* =================================================
   VALIDATE BOC
================================================= */
          
            if (!boc) {

                return res.status(400).json({

                    success: false,

                    paid: false,

                    error:
                        "Missing transaction BOC"

                });

            }


            /* =================================================
               FIND TRANSACTION
            ================================================= */

            let foundTransaction;


            try {

                foundTransaction =
                    await findTransactionByTonConnectBoc(
                        boc
                    );

            } catch (error) {

                console.error(
                    "TON transaction search error:",
                    error
                );

                return res.status(400).json({

                    success: false,

                    paid: false,

                    error:
                        "Could not process TON transaction"

                });

            }


            /* =================================================
               TRANSACTION NOT FOUND
            ================================================= */

            if (
                !foundTransaction
            ) {

                console.log(
                    "❌ Transaction not found"
                );

                return res.json({

                    success: false,

                    paid: false,

                    message:
                        "Transaction not found yet"

                });

            }


            /* =================================================
               GET TRANSACTION HASH
            ================================================= */

            const transactionHash =
                foundTransaction
                    .hash()
                    .toString("base64");


            console.log(
                "Transaction hash:",
                transactionHash
            );

 /* =========================================================
   VERIFY ACTUAL BLOCKCHAIN PAYMENT
========================================================= */

const merchantAddress =
    Address.parse(MERCHANT_WALLET);


/*
 * The destination of the TonConnect external message
 * is the wallet that signed/sent the transaction.
 *
 * This comes from the blockchain BOC.
 * We do NOT trust the browser for the sender.
 */
const blockchainSender =
    foundTransaction.inMessage.info.dest;


console.log(
    "Blockchain sender wallet:",
    blockchainSender.toString()
);


let paymentFound = false;
let paymentSender = null;
let paymentAmount = null;
let paymentDestination = null;


/* =========================================================
   CHECK OUTGOING INTERNAL MESSAGES
========================================================= */

for (
    const message of foundTransaction.outMessages.values()
) {

    if (
        message.info.type !== "internal"
    ) {
        continue;
    }


    /*
     * Ignore bounced messages.
     */
    if (
        message.info.bounced
    ) {
        continue;
    }


    const source =
        message.info.src;

    const destination =
        message.info.dest;

    const value =
        message.info.value.coins;


    console.log(
        "Outgoing source:",
        source.toString()
    );

    console.log(
        "Outgoing destination:",
        destination.toString()
    );

    console.log(
        "Outgoing amount:",
        value.toString()
    );


    /*
     * The outgoing message must originate
     * from the wallet that signed the TonConnect
     * transaction.
     */
    const senderMatches =
        source.equals(
            blockchainSender
        );


    /*
     * Destination MUST be our merchant wallet.
     */
    const destinationMatches =
        destination.equals(
            merchantAddress
        );


    /*
     * Amount MUST be at least the package price.
     */
    const amountMatches =
        value >= requiredAmount;


    console.log(
        "Sender matches:",
        senderMatches
    );

    console.log(
        "Destination matches:",
        destinationMatches
    );

    console.log(
        "Amount matches:",
        amountMatches
    );


    if (
        senderMatches &&
        destinationMatches &&
        amountMatches
    ) {

        paymentFound = true;

        paymentSender =
            source.toString();

        paymentAmount =
            value.toString();

        paymentDestination =
            destination.toString();

        break;
    }
}


/* =========================================================
   PAYMENT NOT VALID
========================================================= */

if (
    !paymentFound
) {

    console.log(
        "❌ No valid payment to merchant wallet"
    );

    return res.status(400).json({
        success: false,
        paid: false,
        error:
            "No valid payment to merchant wallet"
    });

}
           
/* =========================================================
   ATOMIC PURCHASE + GEM AWARD
========================================================= */

const {
    data: purchaseResult,
    error: purchaseError
} = await supabase.rpc(
    "process_ton_purchase",
    {
        p_transaction_hash:
            transactionHash,

        p_telegram_id:
            telegramId,

        p_sender:
            paymentSender,

        p_amount_nano:
            paymentAmount,

        p_gems:
            purchaseIsTapPower ||
            purchaseIsTapPower100 ||
            purchaseIsTotalBonus ||
            purchaseIsCpsTotalBonus
                ? 0
                : packageInfo.gems,

        p_purchase_type:
            purchaseIsTapPower
                ? "tap_power"
                : purchaseIsTapPower100
                    ? "tap_power_100"
                    : purchaseIsTotalBonus
                        ? "total_bonus"
                        : purchaseIsCpsTotalBonus
                            ? "cps_total_bonus"
                            : "gems",

        p_tap_bonus:
            purchaseIsTapPower ||
            purchaseIsTapPower100
                ? packageInfo.tapBonus
                : 0,

        p_tap_power:
            purchaseIsTapPower100
                ? packageInfo.tapPower
                : 0,

        p_cps_bonus:
            purchaseIsCpsTotalBonus
                ? packageInfo.cpsBonus
                : 0,

        p_total_bonus:
            purchaseIsTotalBonus ||
            purchaseIsCpsTotalBonus
                ? packageInfo.totalBonus
                : 0
    }
);

/* =========================================================
   DATABASE ERROR
========================================================= */

if (
    purchaseError
) {

    console.error(
        "Atomic TON purchase error:",
        purchaseError
    );

    return res.status(500).json({
        success: false,
        paid: false,
        error:
            "Failed to process purchase"
    });

}


/* =========================================================
   TRANSACTION ALREADY USED
========================================================= */

if (
    purchaseResult.already_processed
) {

    console.log(
        "❌ Transaction already processed"
    );

    return res.status(400).json({
        success: false,
        paid: false,
        error:
            "Transaction already used"
    });

}


/* =========================================================
   SUCCESS
========================================================= */

console.log("");
console.log("================================");
console.log("✅ TON PAYMENT VERIFIED");
console.log("================================");

console.log(
    "Telegram ID:",
    telegramId
);

console.log(
    "Sender:",
    paymentSender
);

console.log(
    "Merchant:",
    paymentDestination
);

console.log(
    "Amount:",
    paymentAmount
);

console.log(
    "Gems added:",
    packageInfo.gems
);

console.log(
    "New gems:",
    purchaseResult.gems
);

console.log(
    "Transaction:",
    transactionHash
);

console.log("================================");
console.log("");

return res.json({

    success: true,

    paid: true,

  purchaseType:
    purchaseIsTapPower
        ? "tap_power"
        : purchaseIsTapPower100
            ? "tap_power_100"
            : purchaseIsTotalBonus
                ? "total_bonus"
                : purchaseIsCpsTotalBonus
                    ? "cps_total_bonus"
                    : "gems",
    /* =========================
       GEMS
    ========================= */

    gemsAdded:
        purchaseIsTapPower ||
        purchaseIsTotalBonus ||
        purchaseIsCpsTotalBonus
            ? 0
            : packageInfo.gems,

    gems:
        purchaseResult.gems ?? null,

/* =========================
   TAP POWER
========================= */

tapBonusAdded:
    purchaseIsTapPower ||
    purchaseIsTapPower100
        ? packageInfo.tapBonus
        : 0,

tapBonus:
    purchaseResult.tap_bonus ?? null,

tapPowerAdded:
    purchaseIsTapPower100
        ? packageInfo.tapPower
        : 0,

tapPower:
    purchaseResult.tap_power ?? null,

    /* =========================
       CPS BONUS
    ========================= */

    cpsBonusAdded:
        purchaseIsCpsTotalBonus
            ? packageInfo.cpsBonus
            : 0,

    cpsBonus:
        purchaseResult.cps_bonus ?? null,


    /* =========================
       TOTAL BONUS
    ========================= */

    totalBonusAdded:
        purchaseIsTotalBonus ||
        purchaseIsCpsTotalBonus
            ? packageInfo.totalBonus
            : 0,

    totalBonus:
        purchaseResult.ton_bonus ?? null,


    /* =========================
       TRANSACTION
    ========================= */

    transaction:
        transactionHash,

    amount:
        paymentAmount,

    destination:
        paymentDestination,

    sender:
        paymentSender

});

        } catch (error) {

            console.error(
                "TON PAYMENT VERIFICATION ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                paid: false,
                error:
                    "Server error during TON payment verification"
            });

        }

    }
);

/* =========================================================
   TADS REWARDED ADS WEBHOOK
========================================================= */

app.post("/api/tads/webhook", async (req, res) => {

    try {

        console.log("");
        console.log("================================");
        console.log("TADS WEBHOOK RECEIVED");
        console.log("================================");

        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        console.log("================================");
        console.log("");

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        console.error(
            "TADS WEBHOOK ERROR:",
            error
        );

        return res.status(500).json({
            success: false
        });

    }

});

/* =========================================================
   TADS REWARD CLAIM
========================================================= */

app.post("/api/tads/reward", async (req, res) => {

    try {

        console.log("");
        console.log("================================");
        console.log("TADS REWARD CLAIM");
        console.log("================================");


        /* =================================================
           GET REQUEST DATA
        ================================================= */

        const {
            initData,
            rewardType
        } = req.body;


        console.log(
            "Reward type:",
            rewardType
        );


        /* =================================================
           VERIFY TELEGRAM
        ================================================= */

        if (!verifyTelegramUser(initData)) {

            console.log(
                "❌ Invalid Telegram data"
            );

            return res.status(401).json({
                success: false,
                error: "Invalid Telegram data"
            });

        }


        /* =================================================
           GET TELEGRAM USER
        ================================================= */

        const params =
            new URLSearchParams(initData);

        const userJson =
            params.get("user");


        if (!userJson) {

            return res.status(400).json({
                success: false,
                error: "Telegram user not found"
            });

        }


        const telegramUser =
            JSON.parse(userJson);

        const telegramId =
            String(telegramUser.id);


        console.log(
            "Telegram ID:",
            telegramId
        );


        /* =================================================
           VALIDATE REWARD TYPE
        ================================================= */

        if (
            rewardType !== "power"
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid reward type"
            });

        }


        /* =================================================
           GET PLAYER
        ================================================= */

        const {
            data: user,
            error: userError
        } = await supabase

            .from("users")

            .select(
                "telegram_id, tap_power, upgrade_cost"
            )

            .eq(
                "telegram_id",
                telegramId
            )

            .maybeSingle();


        if (userError) {

            console.error(
                "TADS GET USER ERROR:",
                userError
            );

            return res.status(500).json({
                success: false,
                error: "Failed to get player"
            });

        }


        if (!user) {

            return res.status(404).json({
                success: false,
                error: "Player not found"
            });

        }


        /* =================================================
           CURRENT VALUES
        ================================================= */

        const currentPower =
    Number(user.tap_power) || 0;

        const currentUpgradeCost =
            Number(user.upgrade_cost) || 0;


        console.log(
            "Current Power:",
            currentPower
        );

        console.log(
            "Current Upgrade Cost:",
            currentUpgradeCost
        );


        /* =================================================
           CALCULATE REWARD
        ================================================= */

        const newPower =
            currentPower + 1;

        const newUpgradeCost =
            Math.floor(
                currentUpgradeCost * 1.5
            );


        console.log(
            "New Power:",
            newPower
        );

        console.log(
            "New Upgrade Cost:",
            newUpgradeCost
        );


        /* =================================================
           UPDATE SUPABASE
        ================================================= */

        const {
            data: updatedUser,
            error: updateError
        } = await supabase

            .from("users")

          .update({
    tap_power:
        newPower,
    upgrade_cost:
        newUpgradeCost
})

            .eq(
                "telegram_id",
                telegramId
            )

            .select(
                "telegram_id, tap_power, upgrade_cost"
            )
            
            .single();


        /* =================================================
           CHECK UPDATE ERROR
        ================================================= */

        if (updateError) {

            console.error(
                "TADS UPDATE USER ERROR:",
                updateError
            );

            return res.status(500).json({
                success: false,
                error: "Failed to update player"
            });

        }


        /* =================================================
           SUCCESS
        ================================================= */

        console.log(
            "✅ TADS REWARD GRANTED"
        );

        console.log(
            "Power:",
            updatedUser.power
        );

        console.log(
            "Upgrade Cost:",
            updatedUser.upgrade_cost
        );


       return res.json({

    success: true,

    telegramId:
        telegramId,

    power:
        updatedUser.tap_power,

    upgradeCost:
        updatedUser.upgrade_cost

});


    } catch (error) {

        console.error(
            "TADS REWARD ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================================================
   ADMIN - RESET PLAYER
========================================================= */

app.post("/api/admin/reset-player", async (req, res) => {

    try {

        /* =========================
           ADMIN SECURITY
        ========================= */

        const adminKey = req.headers["x-admin-key"];

        if (
            !adminKey ||
            adminKey !== process.env.ADMIN_RESET_KEY
        ) {
            return res.status(403).json({
                success: false,
                error: "Unauthorized"
            });
        }


        /* =========================
           GET TELEGRAM ID
        ========================= */

        const { telegramId } = req.body;

        if (!telegramId) {
            return res.status(400).json({
                success: false,
                error: "telegramId is required"
            });
        }

        const id = String(telegramId);


        /* =========================
           GET CURRENT USER
        ========================= */

        const { data: user, error: getError } =
            await supabase
                .from("users")
                .select("telegram_id, username, reset_version")
                .eq("telegram_id", id)
                .maybeSingle();

        if (getError) {

            console.error(
                "RESET GET USER ERROR:",
                getError
            );

            return res.status(500).json({
                success: false,
                error: "Failed to find player"
            });
        }


        if (!user) {

            return res.status(404).json({
                success: false,
                error: "Player not found"
            });
        }


        /* =========================
           NEW RESET VERSION
        ========================= */

        const newResetVersion =
            Number(user.reset_version || 0) + 1;


        /* =========================
           COMPLETE PLAYER RESET
        ========================= */

        const { data: updatedUser, error: resetError } =
            await supabase
                .from("users")
                .update({

                    /* GAME CURRENCIES */
                    coins: 0,
                    gems: 0,

                    /* GAME PROGRESS */
                    total_clicks: 0,

                    /* REFERRALS */
                    referral_count: 0,
                    coin_bonus: 0,
                    stat_bonus: 0,
                    referred_by: null,

                    /* RESET VERSION */
                    reset_version: newResetVersion

                })
                .eq(
                    "telegram_id",
                    id
                )
                .select("*")
                .single();


        if (resetError) {

            console.error(
                "RESET PLAYER ERROR:",
                resetError
            );

            return res.status(500).json({
                success: false,
                error: "Failed to reset player"
            });
        }


        /* =========================
           SUCCESS LOG
        ========================= */

        console.log("");
        console.log("================================");
        console.log("PLAYER COMPLETELY RESET");
        console.log("Telegram ID:", id);
        console.log("Username:", user.username);
        console.log(
            "Old Reset Version:",
            user.reset_version || 0
        );
        console.log(
            "New Reset Version:",
            newResetVersion
        );
        console.log("================================");
        console.log("");


        /* =========================
           RESPONSE
        ========================= */

        return res.json({

            success: true,

            message:
                "Player completely reset",

            telegramId:
                id,

            resetVersion:
                newResetVersion

        });

    } catch (error) {

        console.error(
            "ADMIN RESET ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Server error"
        });

    }

});

/* =========================
   START SERVER
========================= */

app.listen(PORT, "0.0.0.0", () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);