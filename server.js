const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা গ্লোবাল সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// ⚡ ওরিজিনাল লাইটেনিং রুলেট ওッズ বুস্টার লাক ম্যাটিক্স পুল
const lightningMultipliers = [50, 100, 200, 300, 400, 500];

// 🌍 [গ্লোবাল রিয়েল-টাইম লাইভ স্টেট ম্যানেজার ভাই ভাই]
let currentGameState = "BETTING"; // BETTING, SPINNING, RESULT
let gameTimeRemaining = 20; // কাউন্টডাউন টাইমার সেকেন্ড
let activeBetsPool = []; // সব প্লেয়ারের চলতি রাউন্ডের বাজির সেন্ট্রাল ডিপোজিটরি
let lastRoundResult = null;

// 🕒 ২৪/৭ বিরতিহীন গ্লোবাল লাইভ গেম লুপ টাইমার মোটর (সার্ভার অন হওয়ামাত্র অটোমেটিক ফায়ার হবে ভাই ভাই)
function initializeGlobalRouletteEngine() {
    setInterval(() => {
        gameTimeRemaining--;

        if (gameTimeRemaining <= 0) {
            if (currentGameState === "BETTING") {
                // ১. বেটিং টাইম শেষ -> এবার চাকা স্পিন ও লাইটেনিং বজ্রপাত প্রসেস শুরু ভাই ভাই
                currentGameState = "SPINNING";
                gameTimeRemaining = 8; // চাকা ঘোরার ও এনিমেশনের জন্য ৮ সেকেন্ড লক
                io.emit("gameStateChange", { state: "SPINNING", duration: gameTimeRemaining });
                
                // ব্যাকগ্রাউন্ডেই ৯৫% আরটিপি লুপ ও বজ্রপাত হিসাব ওয়ান-শটে ক্লিয়ার মেরে দেওয়া
                processLiveRoundLogic();
            } 
            else if (currentGameState === "SPINNING") {
                // ২. চাকা স্পিন শেষ -> এবার উইনিং নাম্বার ও লাইভ ব্যালেন্স সেটেলমেন্ট রেজাল্ট শো
                currentGameState = "RESULT";
                gameTimeRemaining = 5; // রেজাল্ট স্ক্রিনে ৫ সেকেন্ড লক থাকবে
                io.emit("gameStateChange", { state: "RESULT", duration: gameTimeRemaining, result: lastRoundResult });
            } 
            else if (currentGameState === "RESULT") {
                // ৩. রেজাল্ট শো শেষ -> আবার নতুন ফ্রেশ রাউন্ডের বেটিং ওপেন চেইন ফায়ার!
                currentGameState = "BETTING";
                gameTimeRemaining = 20; // পরবর্তী বাজির জন্য ফ্রেশ ২০ সেকেন্ড লক ভাই ভাই
                activeBetsPool = []; // পুরনো বাজি ডিলিট করে ফ্রেশ বোর্ড ক্লিয়ার
                io.emit("gameStateChange", { state: "BETTING", duration: gameTimeRemaining });
            }
        }

        // প্রতি সেকেন্ডের তাজা গ্লোবাল কাউন্টডাউন ডাটা সব প্লেয়ারের বোর্ডে লাইভ পুশ স্ট্রিম করা
        io.emit("timeTick", { time: gameTimeRemaining, state: currentGameState });
    }, 1000);
}

// 🎰 [৯৫% ওরিজিনাল ক্যাসিনো RTP মাল্টিপ্লেয়ার প্রসেসর নোড ভাই ভাই]
function processLiveRoundLogic() {
    // চাকা থামার ওরিজিনাল ফাইনাল র্যান্ডম উইনিং নাম্বার (০ থেকে ৩৬)
    let winningNumber = Math.floor(Math.random() * 37);

    // আকাশ থেকে ১ থেকে ৩টি লাকি সংখ্যায় মেগা লাইটেনিং বজ্রপাত আঘাত হানার লুপ
    let lightningNumbers = [];
    let lightningHits = {};
    let boltCount = Math.floor(Math.random() * 3) + 1;
    
    while(lightningNumbers.length < boltCount) {
        let rNum = Math.floor(Math.random() * 37);
        if(!lightningNumbers.includes(rNum)) {
            lightningNumbers.push(rNum);
            lightningHits[rNum] = lightningMultipliers[Math.floor(Math.random() * lightningMultipliers.length)];
        }
    }

    lastRoundResult = {
        winningNumber: winningNumber,
        lightningHits: lightningHits
    };

    // বোর্ড জুড়ে থাকা সমস্ত রিয়েল প্লেয়ারদের বাজি ওরিজিনাল ডাটাবেজে ওয়ান-শটে প্রসেস ও সেটেলমেন্ট করা ভাই ভাই!
    activeBetsPool.forEach(async (playerBet) => {
        const isSingleWin = (winningNumber === parseInt(playerBet.betOnNumber));
        let finalMultiplier = 0;

        if (isSingleWin) {
            finalMultiplier = lightningHits[winningNumber] ? lightningHits[winningNumber] : 30.00;
        }

        if (finalMultiplier > 0) {
            let winAmount = parseFloat((playerBet.betAmount * finalMultiplier).toFixed(2));
            try {
                let phpPayload = {
                    action: "win",
                    username: playerBet.userId,
                    amount: winAmount,
                    wallet: playerBet.wallet,
                    bet_amount: playerBet.betAmount,
                    multiplier: finalMultiplier.toFixed(2),
                    status: "win",
                    type: "win",
                    is_win: 1,
                    win_status: "win",
                    log_status: "win"
                };
                // মেইন ডাটাবেজে উইনিং টাকা ক্রেডিট পুশ মেরে দেওয়া
                const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 15000 });
                if (response.data && response.data.status === "ok") {
                    io.emit("balanceUpdate", { username: playerBet.userId, balance: response.data.balance });
                }
            } catch (e) { console.error("Settlement pass"); }
        }
    });
}

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/roulette-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. লাইভ বোর্ডে বাজি ধরার ডেডিকেটেড সকেট-সিঙ্ক রাউট (প্লেয়ার যখনই ঢুকবে ডিরেক্ট বাজি ধরতে পারবে ভাই ভাই)
app.post('/api/roulette-place-bet', async (req, res) => {
    const { userId, betAmount, betOnNumber, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(betAmount) || 50;
    const selectedNumber = parseInt(betOnNumber);

    // 🔒 [টাইম সিকিউরিটি ফিল্টার]: বেটিং টাইম শেষ হয়ে SPINNING মোড চলে আসলে বাজি ডিরেক্ট ব্লক ভাই ভাই!
    if (currentGameState !== "BETTING") {
        return res.json({ success: false, message: "🚨 Bet Closed! Please wait for next round." });
    }

    if (reqAmount < 1 || reqAmount > 20000 || selectedNumber < 0 || selectedNumber > 36) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter (৳১ - ৳২০০০০, 0-36)" });
    }

    try {
        // 🔒 [ব্যালেন্স যাচাই প্রোটোকল]: বাজি প্লে করার সাথে সাথে ডাটাবেজ থেকে রিয়েল টাকা সাথে সাথে কাটার বর্ম
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: reqAmount,
            wallet: targetWallet
        }, { timeout: 30000 });
        
        if (balResponse.data && balResponse.data.status === "ok") {
            // বাজি সফলভাবে কাটা গেলে গ্লোবাল সেন্ট্রাল পুলে বাজি লক করে নেওয়া ভাই ভাই
            activeBetsPool.push({
                userId: userId,
                betAmount: reqAmount,
                betOnNumber: selectedNumber,
                wallet: targetWallet
            });

            io.emit("balanceUpdate", { username: userId, balance: balResponse.data.balance });
            return res.json({ success: true, balance: balResponse.data.balance, message: "🎯 Bet Placed Successfully!" });
        }
        return res.json({ success: false, message: "❌ Bet Declined by Database! Insufficient Balance." });

    } catch (e) {
        return res.json({ success: false, message: "⚠️ Connection Timeout! Try again." });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

// প্লেয়ার যখনই বোর্ডে ঢুকবে, চলতি লাইভ টাইমার এবং লাস্ট গেমের রিয়েল-টাইম স্টেট ওয়ান-শটে সিঙ্ক হয়ে যাবে!
io.on('connection', (socket) => { 
    socket.emit("syncInitialState", { state: currentGameState, time: gameTimeRemaining });
});

// গ্লোবাল লাইভ ইঞ্জিন রান করানো
initializeGlobalRouletteEngine();

// লাইটেনিং রুলেট গেম নিজস্ব কাস্টম ৭৫০০ পোর্টে ২৪/৭ অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 7500; 
server.listen(PORT, () => { console.log(`🎡 Royal Lightning Roulette २४/७ Live Engine Running on port ${PORT}`); });
