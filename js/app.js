(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) document.querySelector(".check").textContent = sessionStorage.getItem("money"); else {
        sessionStorage.setItem("money", 1e3);
        document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    if (document.querySelector(".game")) {
        write_bonus_count("bomb");
        write_bonus_count("anvil");
        write_bonus_count("circle");
    }
    if (document.querySelector(".mini-game")) {
        document.querySelector(".footer__coins").textContent = 50;
        sessionStorage.setItem("current-bet", 50);
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".footer__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet > 50) {
                sessionStorage.setItem("current-bet", current_bet - 50);
                document.querySelector(".footer__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".footer__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".footer__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".footer__button_bet")) if (+sessionStorage.getItem("money") >= +sessionStorage.getItem("current-bet")) {
            add_remove_className(".footer__button_bet", "_hold");
            add_remove_className(".footer__controls", "_hold");
            delete_money(current_bet(), ".check");
            remove_image();
            setTimeout((() => {
                start_mini_game();
            }), 1e3);
        } else no_money(".check");
        if (targetElement.closest(".win__button_play")) {
            document.querySelector(".win").classList.remove("_active");
            remove_image();
            add_remove_className(".footer__button_bet", "_hold");
            add_remove_className(".footer__controls", "_hold");
            remove_border();
        }
        if (document.querySelector(".shop") && document.querySelector(".shop").classList.contains("_active") && !targetElement.closest(".shop__body")) document.querySelector(".shop").classList.remove("_active");
        if (targetElement.closest(".bonuses__count_bomb") || targetElement.closest(".bonuses__count_anvil") || targetElement.closest(".bonuses__count_circle")) document.querySelector(".shop").classList.add("_active");
        if (targetElement.closest(".bonuses__button_bomb")) if (+sessionStorage.getItem("money") >= 3500) {
            delete_money(3500, ".check");
            sessionStorage.setItem("bonus-bomb", +sessionStorage.getItem("bonus-bomb") + 1);
            write_bonus_count("bomb");
        } else no_money(".check");
        if (targetElement.closest(".bonuses__button_anvil")) if (+sessionStorage.getItem("money") >= 5500) {
            delete_money(5500, ".check");
            sessionStorage.setItem("bonus-anvil", +sessionStorage.getItem("bonus-anvil") + 1);
            write_bonus_count("anvil");
        } else no_money(".check");
        if (targetElement.closest(".bonuses__button_circle")) if (+sessionStorage.getItem("money") >= 7500) {
            delete_money(7500, ".check");
            sessionStorage.setItem("bonus-circle", +sessionStorage.getItem("bonus-circle") + 1);
            write_bonus_count("circle");
        } else no_money(".check");
        if (targetElement.closest(".bonuses__bomb") && !targetElement.closest(".bonuses__count_bomb")) if (0 != +sessionStorage.getItem("bonus-bomb")) {
            sessionStorage.setItem("bonus-bomb", +sessionStorage.getItem("bonus-bomb") - 1);
            write_bonus_count("bomb");
        }
        if (targetElement.closest(".bonuses__anvil") && !targetElement.closest(".bonuses__count_anvil")) if (0 != +sessionStorage.getItem("bonus-anvil")) {
            sessionStorage.setItem("bonus-anvil", +sessionStorage.getItem("bonus-anvil") - 1);
            write_bonus_count("anvil");
        }
        if (targetElement.closest(".bonuses__circle") && !targetElement.closest(".bonuses__count_circle")) if (0 != +sessionStorage.getItem("bonus-circle")) {
            sessionStorage.setItem("bonus-circle", +sessionStorage.getItem("bonus-circle") - 1);
            write_bonus_count("circle");
        }
    }));
    function add_remove_className(block, className) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className); else document.querySelector(block).classList.add(className);
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelector(block).classList.add("_delete-money");
            document.querySelector(block).textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_delete-money");
        }), 1500);
    }
    function no_money(block) {
        document.querySelector(block).classList.add("_no-money");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_no-money");
        }), 1e3);
    }
    function current_bet() {
        return +sessionStorage.getItem("current-bet");
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim-add-money");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), 2e3);
    }
    function start_mini_game() {
        let number = get_numder();
        create_crystall(number);
        setTimeout((() => {
            document.querySelector(".win").classList.add("_active");
        }), 2e3);
    }
    function get_numder() {
        return get_random(0, 36);
    }
    function create_image(num1, num2, num3) {
        let image_1 = document.createElement("img");
        let image_2 = document.createElement("img");
        let image_3 = document.createElement("img");
        image_1.setAttribute("src", `img/mini-game/crystall-${num1}.png`);
        image_2.setAttribute("src", `img/mini-game/crystall-${num2}.png`);
        image_3.setAttribute("src", `img/mini-game/crystall-${num3}.png`);
        document.querySelector(".crystalls__item_1").append(image_1);
        document.querySelector(".crystalls__item_1").classList.add(`_bg-${num1}`);
        setTimeout((() => {
            document.querySelector(".crystalls__item_2").append(image_2);
            document.querySelector(".crystalls__item_2").classList.add(`_bg-${num2}`);
        }), 500);
        setTimeout((() => {
            document.querySelector(".crystalls__item_3").append(image_3);
            document.querySelector(".crystalls__item_3").classList.add(`_bg-${num3}`);
        }), 1e3);
    }
    function create_crystall(number) {
        let bet = current_bet();
        if (number >= 0 && number <= 19) {
            create_image(3, 3, 3);
            add_money(.01 * bet, ".check");
            write_count(.01 * bet, .01);
            add_border(1);
        } else if (number >= 20 && number <= 23) {
            create_image(3, 3, 4);
            add_money(2 * bet, ".check");
            write_count(2 * bet, 2);
            add_border(2);
        } else if (number >= 24 && number <= 26) {
            create_image(3, 3, 1);
            add_money(5 * bet, ".check");
            write_count(5 * bet, 5);
            add_border(3);
        } else if (number >= 27 && number <= 29) {
            create_image(3, 3, 5);
            add_money(10 * bet, ".check");
            write_count(10 * bet, 10);
            add_border(4);
        } else if (number >= 30 && number <= 31) {
            create_image(3, 3, 2);
            add_money(15 * bet, ".check");
            write_count(15 * bet, 15);
            add_border(5);
        } else if (number >= 32 && number <= 33) {
            create_image(3, 2, 1);
            add_money(32 * bet, ".check");
            write_count(32 * bet, 32);
            add_border(6);
        } else if (34 == number) {
            create_image(4, 2, 1);
            add_money(42 * bet, ".check");
            write_count(42 * bet, 42);
            add_border(7);
        } else if (35 == number) {
            create_image(1, 5, 4);
            add_money(53 * bet, ".check");
            write_count(53 * bet, 53);
            add_border(8);
        } else if (36 == number) {
            create_image(2, 5, 4);
            add_money(60 * bet, ".check");
            write_count(60 * bet, 60);
            add_border(9);
        }
    }
    function write_count(count, rate) {
        document.querySelector(".win__text").textContent = count;
        document.querySelector(".win__rate").textContent = `x${rate}`;
    }
    function add_border(number) {
        setTimeout((() => {
            document.querySelectorAll(".block-mini-game__box").forEach((el => {
                if (el.dataset.level == number) el.classList.add("_selected");
            }));
        }), 1200);
    }
    function remove_border() {
        document.querySelectorAll(".block-mini-game__box").forEach((el => {
            if (el.dataset.level) el.classList.remove("_selected");
        }));
    }
    function remove_image() {
        if (document.querySelector(".crystalls__item_1 img")) {
            document.querySelector(".crystalls__item_1 img").remove();
            document.querySelector(".crystalls__item_2 img").remove();
            document.querySelector(".crystalls__item_3 img").remove();
            if (document.querySelector(".crystalls__item_1").classList.contains("_bg-1")) document.querySelector(".crystalls__item_1").classList.remove("_bg-1"); else if (document.querySelector(".crystalls__item_1").classList.contains("_bg-2")) document.querySelector(".crystalls__item_1").classList.remove("_bg-2");
            if (document.querySelector(".crystalls__item_1").classList.contains("_bg-3")) document.querySelector(".crystalls__item_1").classList.remove("_bg-3");
            if (document.querySelector(".crystalls__item_1").classList.contains("_bg-4")) document.querySelector(".crystalls__item_1").classList.remove("_bg-4");
            if (document.querySelector(".crystalls__item_1").classList.contains("_bg-5")) document.querySelector(".crystalls__item_1").classList.remove("_bg-5");
            if (document.querySelector(".crystalls__item_2").classList.contains("_bg-1")) document.querySelector(".crystalls__item_2").classList.remove("_bg-1"); else if (document.querySelector(".crystalls__item_2").classList.contains("_bg-2")) document.querySelector(".crystalls__item_2").classList.remove("_bg-2");
            if (document.querySelector(".crystalls__item_2").classList.contains("_bg-3")) document.querySelector(".crystalls__item_2").classList.remove("_bg-3");
            if (document.querySelector(".crystalls__item_2").classList.contains("_bg-4")) document.querySelector(".crystalls__item_2").classList.remove("_bg-4");
            if (document.querySelector(".crystalls__item_2").classList.contains("_bg-5")) document.querySelector(".crystalls__item_2").classList.remove("_bg-5");
            if (document.querySelector(".crystalls__item_3").classList.contains("_bg-1")) document.querySelector(".crystalls__item_3").classList.remove("_bg-1"); else if (document.querySelector(".crystalls__item_3").classList.contains("_bg-2")) document.querySelector(".crystalls__item_3").classList.remove("_bg-2");
            if (document.querySelector(".crystalls__item_3").classList.contains("_bg-3")) document.querySelector(".crystalls__item_3").classList.remove("_bg-3");
            if (document.querySelector(".crystalls__item_3").classList.contains("_bg-4")) document.querySelector(".crystalls__item_3").classList.remove("_bg-4");
            if (document.querySelector(".crystalls__item_3").classList.contains("_bg-5")) document.querySelector(".crystalls__item_3").classList.remove("_bg-5");
        }
    }
    function write_bonus_count(bonus) {
        if (0 == +sessionStorage.getItem(`bonus-${bonus}`)) document.querySelector(`.bonuses__count_${bonus}`).textContent = "+"; else document.querySelector(`.bonuses__count_${bonus}`).textContent = sessionStorage.getItem(`bonus-${bonus}`);
    }
    let config = {
        containerColorBG: "#353336",
        contentColorBG: "#525053",
        countRows: 6,
        countCols: 5,
        offsetBorder: 10,
        borderRadius: 8,
        gemSize: 64,
        imagesCoin: [ "img/game/game-img-1.png", "img/game/game-img-2.png", "img/game/game-img-3.png", "img/game/game-img-4.png" ],
        gemClass: "gem",
        gemIdPrefix: "gem",
        gameStates: [ "pick", "switch", "revert", "remove", "refill" ],
        gameState: "",
        movingItems: 0,
        countScore: 0
    };
    let player = {
        selectedRow: -1,
        selectedCol: -1,
        posX: "",
        posY: ""
    };
    let components = {
        container: document.createElement("div"),
        content: document.createElement("div"),
        wrapper: document.createElement("div"),
        cursor: document.createElement("div"),
        score: document.createElement("div"),
        gems: new Array
    };
    initGame();
    function initGame() {
        document.body.style.margin = "0px";
        createContentPage();
        createWrapper();
        createCursor();
        createGrid();
        config.gameState = config.gameStates[0];
    }
    function createContentPage() {
        components.content.style.padding = config.offsetBorder + "px";
        components.content.style.width = config.gemSize * config.countCols + 2 * config.offsetBorder + "px";
        components.content.style.height = config.gemSize * config.countRows + 2 * config.offsetBorder + "px";
        document.querySelector(".block-game__field").append(components.content);
    }
    function createWrapper() {
        components.wrapper.style.position = "relative";
        components.wrapper.style.height = "100%";
        components.wrapper.addEventListener("click", (function(event) {
            handlerTab(event, event.target);
        }));
        components.content.append(components.wrapper);
    }
    function createCursor() {
        components.cursor.id = "marker";
        components.cursor.style.width = config.gemSize + "px";
        components.cursor.style.height = config.gemSize + "px";
        components.cursor.style.border = "2px solid white";
        components.cursor.style.borderRadius = "5px";
        components.cursor.style.position = "absolute";
        components.cursor.style.zIndex = "1";
        components.cursor.style.display = "none";
        components.wrapper.append(components.cursor);
    }
    function cursorShow() {
        components.cursor.style.display = "block";
    }
    function cursorHide() {
        components.cursor.style.display = "none";
    }
    function scoreInc(count) {
        if (count >= 4) count *= 2; else if (count >= 5) count = 2 * (count + 1); else if (count >= 6) count *= 2 * (count + 2);
        config.countScore += count;
        add_money(count, ".check");
        console.log(config.countScore);
    }
    function createGem(t, l, row, col, img) {
        let coin = document.createElement("div");
        coin.classList.add(config.gemClass);
        coin.id = config.gemIdPrefix + "_" + row + "_" + col;
        coin.style.position = "absolute";
        coin.style.top = t + "px";
        coin.style.left = l + "px";
        coin.style.width = config.gemSize + "px";
        coin.style.height = config.gemSize + "px";
        coin.style.border = "1p solid transparent";
        coin.style.backgroundImage = "url(" + img + ")";
        coin.style.backgroundSize = "100%";
        components.wrapper.append(coin);
    }
    function createGrid() {
        for (let i = 0; i < config.countRows; i++) {
            components.gems[i] = new Array;
            for (let j = 0; j < config.countCols; j++) components.gems[i][j] = -1;
        }
        for (let i = 0; i < config.countRows; i++) for (let j = 0; j < config.countCols; j++) {
            do {
                components.gems[i][j] = Math.floor(Math.random() * (3 - 0) + 0);
            } while (isStreak(i, j));
            createGem(i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[components.gems[i][j]]);
        }
    }
    function isStreak(row, col) {
        return isVerticalStreak(row, col) || isHorizontalStreak(row, col);
    }
    function isVerticalStreak(row, col) {
        let gemValue = components.gems[row][col];
        let streak = 0;
        let tmp = row;
        while (tmp > 0 && components.gems[tmp - 1][col] == gemValue) {
            streak++;
            tmp--;
        }
        tmp = row;
        while (tmp < config.countRows - 1 && components.gems[tmp + 1][col] == gemValue) {
            streak++;
            tmp++;
        }
        return streak > 1;
    }
    function isHorizontalStreak(row, col) {
        let gemValue = components.gems[row][col];
        let streak = 0;
        let tmp = col;
        while (tmp > 0 && components.gems[row][tmp - 1] == gemValue) {
            streak++;
            tmp--;
        }
        tmp = col;
        while (tmp < config.countCols - 1 && components.gems[row][tmp + 1] == gemValue) {
            streak++;
            tmp++;
        }
        return streak > 1;
    }
    function handlerTab(event, target) {
        if (target.classList.contains(config.gemClass) && config.gameStates[0]) {
            let row = parseInt(target.getAttribute("id").split("_")[1]);
            let col = parseInt(target.getAttribute("id").split("_")[2]);
            cursorShow();
            components.cursor.style.top = parseInt(target.style.top) + "px";
            components.cursor.style.left = parseInt(target.style.left) + "px";
            if (-1 == player.selectedRow) {
                player.selectedRow = row;
                player.selectedCol = col;
            } else if (1 == Math.abs(player.selectedRow - row) && player.selectedCol == col || 1 == Math.abs(player.selectedCol - col) && player.selectedRow == row) {
                cursorHide();
                config.gameState = config.gameStates[1];
                player.posX = col;
                player.posY = row;
                gemSwitch();
            } else {
                player.selectedRow = row;
                player.selectedCol = col;
            }
        }
    }
    function gemSwitch() {
        let yOffset = player.selectedRow - player.posY;
        let xOffset = player.selectedCol - player.posX;
        document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).classList.add("switch");
        document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).setAttribute("dir", "-1");
        document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).classList.add("switch");
        document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).setAttribute("dir", "1");
        $(".switch").each((function() {
            config.movingItems++;
            $(this).animate({
                left: "+=" + xOffset * config.gemSize * $(this).attr("dir"),
                top: "+=" + yOffset * config.gemSize * $(this).attr("dir")
            }, {
                duration: 250,
                complete: function() {
                    checkMoving();
                }
            });
            $(this).removeClass("switch");
        }));
        document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).setAttribute("id", "temp");
        document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).setAttribute("id", config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol);
        document.querySelector("#temp").setAttribute("id", config.gemIdPrefix + "_" + player.posY + "_" + player.posX);
        let temp = components.gems[player.selectedRow][player.selectedCol];
        components.gems[player.selectedRow][player.selectedCol] = components.gems[player.posY][player.posX];
        components.gems[player.posY][player.posX] = temp;
    }
    function checkMoving() {
        config.movingItems--;
        if (0 == config.movingItems) switch (config.gameState) {
          case config.gameStates[1]:
          case config.gameStates[2]:
            if (!isStreak(player.selectedRow, player.selectedCol) && !isStreak(player.posY, player.posX)) if (config.gameState != config.gameStates[2]) {
                config.gameState = config.gameStates[2];
                gemSwitch();
            } else {
                config.gameState = config.gameStates[0];
                player.selectedRow = -1;
                player.selectedCol = -1;
            } else {
                config.gameState = config.gameStates[3];
                if (isStreak(player.selectedRow, player.selectedCol)) removeGems(player.selectedRow, player.selectedCol);
                if (isStreak(player.posY, player.posX)) removeGems(player.posY, player.posX);
                gemFade();
            }
            break;

          case config.gameStates[3]:
            checkFalling();
            break;

          case config.gameStates[4]:
            placeNewGems();
            break;
        }
    }
    function removeGems(row, col) {
        let gemValue = components.gems[row][col];
        let tmp = row;
        document.querySelector("#" + config.gemIdPrefix + "_" + row + "_" + col).classList.add("remove");
        let countRemoveGem = document.querySelectorAll(".remove").length;
        if (isVerticalStreak(row, col)) {
            while (tmp > 0 && components.gems[tmp - 1][col] == gemValue) {
                document.querySelector("#" + config.gemIdPrefix + "_" + (tmp - 1) + "_" + col).classList.add("remove");
                components.gems[tmp - 1][col] = -1;
                tmp--;
                countRemoveGem++;
            }
            tmp = row;
            while (tmp < config.countRows - 1 && components.gems[tmp + 1][col] == gemValue) {
                document.querySelector("#" + config.gemIdPrefix + "_" + (tmp + 1) + "_" + col).classList.add("remove");
                components.gems[tmp + 1][col] = -1;
                tmp++;
                countRemoveGem++;
            }
        }
        if (isHorizontalStreak(row, col)) {
            tmp = col;
            while (tmp > 0 && components.gems[row][tmp - 1] == gemValue) {
                document.querySelector("#" + config.gemIdPrefix + "_" + row + "_" + (tmp - 1)).classList.add("remove");
                components.gems[row][tmp - 1] = -1;
                tmp--;
                countRemoveGem++;
            }
            tmp = col;
            while (tmp < config.countCols - 1 && components.gems[row][tmp + 1] == gemValue) {
                document.querySelector("#" + config.gemIdPrefix + "_" + row + "_" + (tmp + 1)).classList.add("remove");
                components.gems[row][tmp + 1] = -1;
                tmp++;
                countRemoveGem++;
            }
        }
        components.gems[row][col] = -1;
        scoreInc(countRemoveGem);
    }
    function gemFade() {
        $(".remove").each((function() {
            config.movingItems++;
            $(this).animate({
                opacity: 0
            }, {
                duration: 200,
                complete: function() {
                    $(this).remove();
                    checkMoving();
                }
            });
        }));
    }
    function checkFalling() {
        let fellDown = 0;
        for (let j = 0; j < config.countCols; j++) for (let i = config.countRows - 1; i > 0; i--) if (-1 == components.gems[i][j] && components.gems[i - 1][j] >= 0) {
            document.querySelector("#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j).classList.add("fall");
            document.querySelector("#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j).setAttribute("id", config.gemIdPrefix + "_" + i + "_" + j);
            components.gems[i][j] = components.gems[i - 1][j];
            components.gems[i - 1][j] = -1;
            fellDown++;
        }
        $(".fall").each((function() {
            config.movingItems++;
            $(this).animate({
                top: "+=" + config.gemSize
            }, {
                duration: 100,
                complete: function() {
                    $(this).removeClass("fall");
                    checkMoving();
                }
            });
        }));
        if (0 == fellDown) {
            config.gameState = config.gameStates[4];
            config.movingItems = 1;
            checkMoving();
        }
    }
    function placeNewGems() {
        let gemsPlaced = 0;
        for (let i = 0; i < config.countCols; i++) if (-1 == components.gems[0][i]) {
            components.gems[0][i] = Math.floor(Math.random() * (3 - 0) + 0);
            createGem(0, i * config.gemSize, 0, i, config.imagesCoin[components.gems[0][i]]);
            gemsPlaced++;
        }
        if (gemsPlaced) {
            config.gameState = config.gameStates[3];
            checkFalling();
        } else {
            let combo = 0;
            for (let i = 0; i < config.countRows; i++) for (let j = 0; j < config.countCols; j++) {
                if (j <= config.countCols - 3 && components.gems[i][j] == components.gems[i][j + 1] && components.gems[i][j] == components.gems[i][j + 2]) {
                    combo++;
                    removeGems(i, j);
                }
                if (i <= config.countRows - 3 && components.gems[i][j] == components.gems[i + 1][j] && components.gems[i][j] == components.gems[i + 2][j]) {
                    combo++;
                    removeGems(i, j);
                }
            }
            if (combo > 0) {
                config.gameState = config.gameStates[3];
                gemFade();
            } else {
                config.gameState = config.gameStates[0];
                player.selectedRow = -1;
            }
        }
    }
    window["FLS"] = true;
    isWebp();
})();