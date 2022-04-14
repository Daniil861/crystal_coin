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
    if (document.querySelector(".mini-game")) {
        document.querySelector(".footer__coins").textContent = 0;
        sessionStorage.setItem("current-bet", 0);
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    document.documentElement.clientWidth;
    const window_height = document.documentElement.clientHeight;
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
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim-add-money");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_anim-add-money");
        }), delay_off);
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
            add_money(.01 * bet, ".check", 2500, 3500);
            write_count(.01 * bet, .01);
            add_border(1);
        } else if (number >= 20 && number <= 23) {
            create_image(3, 3, 4);
            add_money(2 * bet, ".check", 2500, 3500);
            write_count(2 * bet, 2);
            add_border(2);
        } else if (number >= 24 && number <= 26) {
            create_image(3, 3, 1);
            add_money(5 * bet, ".check", 2500, 3500);
            write_count(5 * bet, 5);
            add_border(3);
        } else if (number >= 27 && number <= 29) {
            create_image(3, 3, 5);
            add_money(10 * bet, ".check", 2500, 3500);
            write_count(10 * bet, 10);
            add_border(4);
        } else if (number >= 30 && number <= 31) {
            create_image(3, 3, 2);
            add_money(15 * bet, ".check", 2500, 3500);
            write_count(15 * bet, 15);
            add_border(5);
        } else if (number >= 32 && number <= 33) {
            create_image(3, 2, 1);
            add_money(32 * bet, ".check", 2500, 3500);
            write_count(32 * bet, 32);
            add_border(6);
        } else if (34 == number) {
            create_image(4, 2, 1);
            add_money(42 * bet, ".check", 2500, 3500);
            write_count(42 * bet, 42);
            add_border(7);
        } else if (35 == number) {
            create_image(1, 5, 4);
            add_money(53 * bet, ".check", 2500, 3500);
            write_count(53 * bet, 53);
            add_border(8);
        } else if (36 == number) {
            create_image(2, 5, 4);
            add_money(60 * bet, ".check", 2500, 3500);
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
    function check_bet() {
        let current_bet = +sessionStorage.getItem("current-bet");
        let current_bank = +sessionStorage.getItem("money");
        if (current_bet > current_bank) {
            sessionStorage.setItem("current-bet", 0);
            document.querySelector(".footer__coins").textContent = sessionStorage.getItem("current-bet");
        }
    }
    function write_bonus_count(bonus) {
        if (0 == +sessionStorage.getItem(`bonus-${bonus}`)) document.querySelector(`.bonuses__count_${bonus}`).textContent = "+"; else document.querySelector(`.bonuses__count_${bonus}`).textContent = sessionStorage.getItem(`bonus-${bonus}`);
    }
    let config = {
        countRows: 6,
        countCols: 5,
        offsetBorder: 10,
        gemSize: 63,
        imagesCoin: [ "img/game/game-img-1.png", "img/game/game-img-2.png", "img/game/game-img-3.png", "img/game/game-img-4.png" ],
        gemClass: "gem",
        gemClassHeart: "gem-heart",
        gemClassSnow: "gem-snow",
        gemIdPrefix: "gem",
        gameStates: [ "pick", "switch", "revert", "remove", "refill" ],
        gameState: "",
        movingItems: 0,
        countScore: 0,
        count_move: 0,
        crystall_cord_x: null,
        crystall_cord_y: null
    };
    let player = {
        selectedRow: -1,
        selectedCol: -1,
        posX: "",
        posY: ""
    };
    let delete_heart_count = 0;
    if (window_height <= 710) config.gemSize = 50;
    let components = {
        container: document.createElement("div"),
        content: document.createElement("div"),
        wrapper: document.createElement("div"),
        cursor: document.createElement("div"),
        score: document.createElement("div"),
        gems: new Array
    };
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    if (document.querySelector(".game")) {
        write_bonus_count("bomb");
        write_bonus_count("anvil");
        write_bonus_count("circle");
        if (!sessionStorage.getItem("active-game-level")) sessionStorage.setItem("active-game-level", 1); else if (2 == +sessionStorage.getItem("active-game-level")) document.querySelector(".footer-game__lable").textContent = "Level 2"; else if (3 == +sessionStorage.getItem("active-game-level")) document.querySelector(".footer-game__lable").textContent = "Level 3";
        if (sessionStorage.getItem("game-level-2")) document.querySelector(".levels__level_two").classList.remove("_not-active");
        if (sessionStorage.getItem("game-level-3")) document.querySelector(".levels__level_three").classList.remove("_not-active");
        document.body.classList.add("_hold");
        initGame();
        sessionStorage.setItem("hearts", 0);
        document.querySelector(".header-game__count-heart").textContent = sessionStorage.getItem("hearts");
        config.countScore = 0;
    }
    function handleTouchStart(e) {
        let targetElement = e.target;
        config.count_move = 0;
        if (targetElement.closest(".gem") || targetElement.closest(".gem-heart")) {
            let row = parseInt(targetElement.getAttribute("id").split("_")[1]);
            let col = parseInt(targetElement.getAttribute("id").split("_")[2]);
            player.selectedRow = row;
            player.selectedCol = col;
            config.crystall_cord_x = e.touches[0].clientX;
            config.crystall_cord_y = e.touches[0].clientY;
        }
    }
    function handleTouchEnd() {
        setTimeout((() => {
            player.selectedRow = -1;
            player.selectedCol = -1;
        }), 500);
    }
    function handleTouchMove(e) {
        if (config.count_move >= 1) return false;
        if (e.target.closest(".block-game__wrapper")) {
            config.count_move++;
            let crystall_cord_x2 = e.touches[0].clientX;
            let crystall_cord_y2 = e.touches[0].clientY;
            let xDiff = crystall_cord_x2 - config.crystall_cord_x;
            let yDiff = crystall_cord_y2 - config.crystall_cord_y;
            let row = player.selectedRow;
            let col = player.selectedCol;
            if (Math.abs(xDiff) > Math.abs(yDiff)) if (xDiff > 0) check_collision(col + 1, row); else check_collision(col - 1, row); else if (yDiff > 0) check_collision(col, row + 1); else check_collision(col, row - 1);
        }
    }
    function check_collision(col, row) {
        config.gameState = config.gameStates[1];
        player.posX = col;
        player.posY = row;
        gemSwitch();
    }
    function initGame() {
        createContentPage();
        createWrapper();
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
        components.wrapper.classList.add("block-game__wrapper");
        components.content.append(components.wrapper);
    }
    function scoreInc(count) {
        if (count >= 4) count *= 2; else if (count >= 5) count = 2 * (count + 1); else if (count >= 6) count *= 2 * (count + 2);
        config.countScore += count;
        add_money(count, ".check", 500, 1500);
        check_game_over();
    }
    function check_game_over() {
        if (1 == +sessionStorage.getItem("active-game-level") && config.countScore >= 2e3) {
            sessionStorage.setItem("game-level-2", true);
            document.querySelector(".levels__level_two").classList.remove("_not-active");
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
                write_level_win(1);
            }), 1e3);
        } else if (2 == +sessionStorage.getItem("active-game-level") && config.countScore >= 3e3 && +sessionStorage.getItem("hearts") >= 1) {
            sessionStorage.setItem("game-level-3", true);
            document.querySelector(".levels__level_three").classList.remove("_not-active");
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
                write_level_win(2);
            }), 1e3);
        } else if (3 == +sessionStorage.getItem("active-game-level")) if (config.countScore >= 5e3 && +sessionStorage.getItem("hearts") >= 1) setTimeout((() => {
            document.querySelector(".win").classList.add("_active");
            write_level_win(3);
        }), 1e3);
    }
    function write_level_win(level) {
        document.querySelector(".win__level").textContent = level;
        document.querySelector(".win__text_game").textContent = config.countScore;
    }
    function createGem(t, l, row, col, img) {
        let crystall = document.createElement("div");
        crystall.classList.add(config.gemClass);
        crystall.id = `${config.gemIdPrefix}_${row}_${col}`;
        crystall.style.top = `${t}px`;
        crystall.style.left = `${l}px`;
        crystall.style.backgroundImage = `url('${img}')`;
        components.wrapper.append(crystall);
    }
    function createGemHeart(t, l, row, col) {
        let crystall = document.createElement("div");
        crystall.classList.add(config.gemClassHeart);
        crystall.id = `${config.gemIdPrefix}_${row}_${col}`;
        crystall.style.top = `${t}px`;
        crystall.style.left = `${l}px`;
        components.wrapper.append(crystall);
    }
    function createGemSnow(t, l, row, col) {
        let crystall = document.createElement("div");
        crystall.classList.add(config.gemClassSnow);
        crystall.id = `${config.gemIdPrefix}_${row}_${col}`;
        crystall.style.top = `${t}px`;
        crystall.style.left = `${l}px`;
        components.wrapper.append(crystall);
    }
    function createGrid() {
        for (let i = 0; i < config.countRows; i++) {
            components.gems[i] = new Array;
            for (let j = 0; j < config.countCols; j++) components.gems[i][j] = -1;
        }
        for (let i = 0; i < config.countRows; i++) for (let j = 0; j < config.countCols; j++) {
            do {
                if (1 == +sessionStorage.getItem("active-game-level")) if (2 == i && 0 == j) components.gems[i][j] = 5; else if (2 == i && 4 == j) components.gems[i][j] = 5; else components.gems[i][j] = Math.floor(Math.random() * (3 - 0) + 0); else if (2 == +sessionStorage.getItem("active-game-level")) if (0 == i && 2 == j) components.gems[i][j] = 4; else if (2 == i && 4 == j) components.gems[i][j] = 5; else components.gems[i][j] = Math.floor(Math.random() * (3 - 0) + 0); else if (3 == +sessionStorage.getItem("active-game-level")) if (0 == i && 2 == j) components.gems[i][j] = 4; else if (2 == i && 2 == j) components.gems[i][j] = 5; else if (2 == i && 4 == j) components.gems[i][j] = 5; else if (3 == i && 0 == j) components.gems[i][j] = 5; else components.gems[i][j] = Math.floor(Math.random() * (3 - 0) + 0);
            } while (isStreak(i, j));
            if (1 == +sessionStorage.getItem("active-game-level")) if (2 == i && 0 == j) createGemSnow(2 * config.gemSize, 0 * config.gemSize, 2, 0); else if (2 == i && 4 == j) createGemSnow(2 * config.gemSize, 4 * config.gemSize, 2, 4); else createGem(i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[components.gems[i][j]]); else if (2 == +sessionStorage.getItem("active-game-level")) if (0 == i && 2 == j) createGemHeart(0 * config.gemSize, 2 * config.gemSize, 0, 2); else if (2 == i && 4 == j) createGemSnow(2 * config.gemSize, 4 * config.gemSize, 2, 4); else createGem(i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[components.gems[i][j]]); else if (3 == +sessionStorage.getItem("active-game-level")) if (0 == i && 2 == j) createGemHeart(0 * config.gemSize, 2 * config.gemSize, 0, 2); else if (2 == i && 2 == j) createGemSnow(2 * config.gemSize, 2 * config.gemSize, 2, 2); else if (2 == i && 4 == j) createGemSnow(2 * config.gemSize, 4 * config.gemSize, 2, 4); else if (3 == i && 0 == j) createGemSnow(3 * config.gemSize, 0 * config.gemSize, 3, 0); else createGem(i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[components.gems[i][j]]);
        }
    }
    function isStreak(row, col) {
        return isVerticalStreak(row, col) || isHorizontalStreak(row, col);
    }
    function isVerticalStreak(row, col) {
        if (-1 != row && -1 != col) {
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
        } else return false;
    }
    function isHorizontalStreak(row, col) {
        if (-1 != row && -1 != col) {
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
        } else return false;
    }
    function gemSwitch() {
        if (player.selectedRow >= 0 && player.selectedCol >= 0 && player.posY >= 0 && player.posX >= 0 && 5 != components.gems[player.posY][player.posX]) {
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
        } else return false;
    }
    function checkMoving() {
        config.movingItems--;
        if (0 == config.movingItems) {
            switch (config.gameState) {
              case config.gameStates[1]:
              case config.gameStates[2]:
                if (!isStreak(player.selectedRow, player.selectedCol) && !isStreak(player.posY, player.posX)) {
                    if (player.selectedRow >= 0 && player.selectedCol >= 0 && player.posY >= 0 && player.posX >= 0 && 4 != components.gems[player.posY][player.posX]) if (config.gameState != config.gameStates[2]) {
                        config.gameState = config.gameStates[2];
                        gemSwitch();
                    } else {
                        config.gameState = config.gameStates[0];
                        player.selectedRow = -1;
                        player.selectedCol = -1;
                    }
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
            if (0 == delete_heart_count) find_and_delete_heart();
        }
    }
    function find_and_delete_heart() {
        if (-1 != components.gems[5].indexOf(4)) {
            delete_heart_count++;
            config.movingItems++;
            document.querySelector(`.gem-heart`).classList.add("_anim");
            setTimeout((() => {
                document.querySelector(`.gem-heart`).remove();
                let number = components.gems[5].indexOf(4);
                components.gems[5][number] = Math.floor(Math.random() * (3 - 0) + 0);
                config.gameState = config.gameStates[3];
                createGem(5 * config.gemSize, number * config.gemSize, 5, number, config.imagesCoin[components.gems[5][number]]);
                checkMoving();
            }), 500);
            if (sessionStorage.getItem("hearts")) sessionStorage.setItem("hearts", +sessionStorage.getItem("hearts") + 1); else sessionStorage.setItem("hearts", 1);
            setTimeout((() => {
                document.querySelector(".header-game__count-heart").textContent = sessionStorage.getItem("hearts");
            }), 1e3);
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
    function get_bonus_bomb(block) {
        config.movingItems++;
        document.querySelector(".bonuses__bomb").classList.remove("_anim");
        let row = parseInt(block.getAttribute("id").split("_")[1]);
        let col = parseInt(block.getAttribute("id").split("_")[2]);
        let top_elem_1_row, top_elem_1_col, top_elem_2_row, top_elem_2_col, bottom_elem_1_row, bottom_elem_1_col, bottom_elem_2_row, bottom_elem_2_col, right_elem_1_row, right_elem_1_col, right_elem_2_row, right_elem_2_col, left_elem_1_row, left_elem_1_col, left_elem_2_row, left_elem_2_col;
        if (0 != row) {
            top_elem_1_row = row - 1;
            top_elem_1_col = col;
        }
        if (row >= 2) {
            top_elem_2_row = row - 2;
            top_elem_2_col = col;
        }
        if (row <= 4) {
            bottom_elem_1_row = row + 1;
            bottom_elem_1_col = col;
        }
        if (row <= 3) {
            bottom_elem_2_row = row + 2;
            bottom_elem_2_col = col;
        }
        if (col < 4) {
            right_elem_1_row = row;
            right_elem_1_col = col + 1;
        }
        if (col < 3) {
            right_elem_2_row = row;
            right_elem_2_col = col + 2;
        }
        if (0 != col) {
            left_elem_1_row = row;
            left_elem_1_col = col - 1;
        }
        if (col >= 2) {
            left_elem_2_row = row;
            left_elem_2_col = col - 2;
        }
        if (document.getElementById(`gem_${top_elem_1_row}_${top_elem_1_col}`)) {
            removeGems(top_elem_1_row, top_elem_1_col);
            document.getElementById(`gem_${top_elem_1_row}_${top_elem_1_col}`).remove();
        }
        if (document.getElementById(`gem_${top_elem_2_row}_${top_elem_2_col}`)) {
            removeGems(top_elem_2_row, top_elem_2_col);
            document.getElementById(`gem_${top_elem_2_row}_${top_elem_2_col}`).remove();
        }
        if (document.getElementById(`gem_${bottom_elem_1_row}_${bottom_elem_1_col}`)) {
            removeGems(bottom_elem_1_row, bottom_elem_1_col);
            document.getElementById(`gem_${bottom_elem_1_row}_${bottom_elem_1_col}`).remove();
        }
        if (document.getElementById(`gem_${bottom_elem_2_row}_${bottom_elem_2_col}`)) {
            removeGems(bottom_elem_2_row, bottom_elem_2_col);
            document.getElementById(`gem_${bottom_elem_2_row}_${bottom_elem_2_col}`).remove();
        }
        if (document.getElementById(`gem_${left_elem_1_row}_${left_elem_1_col}`)) {
            removeGems(left_elem_1_row, left_elem_1_col);
            document.getElementById(`gem_${left_elem_1_row}_${left_elem_1_col}`).remove();
        }
        if (document.getElementById(`gem_${left_elem_2_row}_${left_elem_2_col}`)) {
            removeGems(left_elem_2_row, left_elem_2_col);
            document.getElementById(`gem_${left_elem_2_row}_${left_elem_2_col}`).remove();
        }
        if (document.getElementById(`gem_${right_elem_1_row}_${right_elem_1_col}`)) {
            removeGems(right_elem_1_row, right_elem_1_col);
            document.getElementById(`gem_${right_elem_1_row}_${right_elem_1_col}`).remove();
        }
        if (document.getElementById(`gem_${right_elem_2_row}_${right_elem_2_col}`)) {
            removeGems(right_elem_2_row, right_elem_2_col);
            document.getElementById(`gem_${right_elem_2_row}_${right_elem_2_col}`).remove();
        }
        config.gameState = config.gameStates[3];
        checkMoving();
    }
    function get_bonus_anvil(block) {
        config.movingItems++;
        document.querySelector(".bonuses__anvil").classList.remove("_anim");
        let row = parseInt(block.getAttribute("id").split("_")[1]);
        removeGems(row, 0);
        document.getElementById(`gem_${row}_0`).remove();
        removeGems(row, 1);
        document.getElementById(`gem_${row}_1`).remove();
        removeGems(row, 2);
        document.getElementById(`gem_${row}_2`).remove();
        removeGems(row, 3);
        document.getElementById(`gem_${row}_3`).remove();
        removeGems(row, 4);
        document.getElementById(`gem_${row}_4`).remove();
        config.gameState = config.gameStates[3];
        checkMoving();
    }
    function get_bonus_circle(block) {
        config.movingItems++;
        document.querySelector(".bonuses__circle").classList.remove("_anim");
        let row = parseInt(block.getAttribute("id").split("_")[1]);
        let col = parseInt(block.getAttribute("id").split("_")[2]);
        let number_image = components.gems[row][col];
        for (let i = 0; i < components.gems.length; i++) for (let j = 0; j < components.gems[i].length; j++) if (components.gems[i][j] == number_image) {
            removeGems(i, j);
            document.getElementById(`gem_${i}_${j}`).remove();
        }
        config.gameState = config.gameStates[3];
        checkMoving();
    }
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
            if (current_bank - 50 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".footer__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
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
        if (targetElement.closest(".header-game__button-home") || targetElement.closest(".header__button-home")) {
            sessionStorage.removeItem("hearts");
            sessionStorage.removeItem("current-bet");
            sessionStorage.removeItem("active-game-level");
        }
        if (targetElement.closest(".win__button_play")) {
            document.querySelector(".win").classList.remove("_active");
            remove_image();
            add_remove_className(".footer__button_bet", "_hold");
            add_remove_className(".footer__controls", "_hold");
            remove_border();
            check_bet();
        }
        if (targetElement.closest(".win__button_home")) sessionStorage.removeItem("current-bet");
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
            targetElement.closest(".bonuses__bomb").classList.add("_anim");
        }
        if (targetElement.closest(".bonuses__anvil") && !targetElement.closest(".bonuses__count_anvil")) if (0 != +sessionStorage.getItem("bonus-anvil")) {
            sessionStorage.setItem("bonus-anvil", +sessionStorage.getItem("bonus-anvil") - 1);
            write_bonus_count("anvil");
            targetElement.closest(".bonuses__anvil").classList.add("_anim");
        }
        if (targetElement.closest(".bonuses__circle") && !targetElement.closest(".bonuses__count_circle")) if (0 != +sessionStorage.getItem("bonus-circle")) {
            sessionStorage.setItem("bonus-circle", +sessionStorage.getItem("bonus-circle") - 1);
            write_bonus_count("circle");
            targetElement.closest(".bonuses__circle").classList.add("_anim");
        }
        if (targetElement.closest(".block-game__wrapper") && document.querySelector(".bonuses__bomb").classList.contains("_anim")) {
            let elem = targetElement.closest(".gem");
            get_bonus_bomb(elem);
        }
        if (targetElement.closest(".block-game__wrapper") && document.querySelector(".bonuses__anvil").classList.contains("_anim")) {
            let elem = targetElement.closest(".gem");
            get_bonus_anvil(elem);
        }
        if (targetElement.closest(".block-game__wrapper") && document.querySelector(".bonuses__circle").classList.contains("_anim")) {
            let elem = targetElement.closest(".gem");
            get_bonus_circle(elem);
        }
        if (document.querySelector(".levels") && document.querySelector(".levels").classList.contains("_active") && !targetElement.closest(".levels__body")) document.querySelector(".levels").classList.remove("_active");
        if (targetElement.closest(".footer-game__lable")) {
            if (sessionStorage.getItem("game-level-2")) document.querySelector(".levels__level_two").classList.remove("_not-active"); else if (sessionStorage.getItem("game-level-3")) document.querySelector(".levels__level_three").classList.remove("_not-active");
            document.querySelector(".levels").classList.add("_active");
        }
        if (targetElement.closest(".levels__level_one")) {
            sessionStorage.setItem("active-game-level", 1);
            delete components.gems;
            document.querySelectorAll(".gem").forEach((el => el.remove()));
            if (document.querySelector(".gem-heart")) document.querySelector(".gem-heart").remove();
            document.querySelectorAll(".gem-snow").forEach((el => el.remove()));
            document.querySelector(".block-game__wrapper").remove();
            components.gems = [];
            setTimeout((() => {
                createWrapper();
                createGrid();
            }), 500);
            document.querySelector(".levels").classList.remove("_active");
            config.countScore = 0;
            sessionStorage.setItem("hearts", 0);
            document.querySelector(".footer-game__lable").textContent = "Level 1";
        }
        if (targetElement.closest(".levels__level_two") && sessionStorage.getItem("game-level-2")) {
            sessionStorage.setItem("active-game-level", 2);
            delete components.gems;
            document.querySelectorAll(".gem").forEach((el => el.remove()));
            if (document.querySelector(".gem-heart")) document.querySelector(".gem-heart").remove();
            document.querySelectorAll(".gem-snow").forEach((el => el.remove()));
            document.querySelector(".block-game__wrapper").remove();
            components.gems = [];
            setTimeout((() => {
                createWrapper();
                createGrid();
            }), 500);
            document.querySelector(".levels").classList.remove("_active");
            config.countScore = 0;
            sessionStorage.setItem("hearts", 0);
            document.querySelector(".footer-game__lable").textContent = "Level 2";
        }
        if (targetElement.closest(".levels__level_three") && sessionStorage.getItem("game-level-3")) {
            sessionStorage.setItem("active-game-level", 3);
            delete components.gems;
            document.querySelectorAll(".gem").forEach((el => el.remove()));
            if (document.querySelector(".gem-heart")) document.querySelector(".gem-heart").remove();
            document.querySelectorAll(".gem-snow").forEach((el => el.remove()));
            document.querySelector(".block-game__wrapper").remove();
            components.gems = [];
            setTimeout((() => {
                createWrapper();
                createGrid();
            }), 500);
            document.querySelector(".levels").classList.remove("_active");
            config.countScore = 0;
            sessionStorage.setItem("hearts", 0);
            document.querySelector(".footer-game__lable").textContent = "Level 3";
        }
        if (targetElement.closest(".win__button_levels")) {
            document.querySelector(".win").classList.remove("_active");
            setTimeout((() => {
                document.querySelector(".levels").classList.add("_active");
                config.countScore = 0;
                sessionStorage.setItem("hearts", 0);
            }), 500);
        }
        if (targetElement.closest(".win__button_game")) {
            document.querySelector(".win").classList.remove("_active");
            config.countScore = 0;
            sessionStorage.setItem("hearts", 0);
        }
    }));
    window["FLS"] = true;
    isWebp();
})();