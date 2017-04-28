((window, document) => {
    "use strict";

    let countdown;
    let holes;
    let current;
    let restartButton;
    let startButton;
    let scoreText;

    class Timer {
        constructor() {
            this.count = 0;
            this.counter = 0;
        }

        set() {
            this.counter = window.setInterval(() => {
                if (this.count <= 0) {
                    window.clearInterval(this.counter);
                    current.classList.remove("mole");
                    const list = document.body.classList;
                    list.remove("ready");
                    list.add("lost");
                    current = null;
                    return;
                }
                this.count--;
                countdown.innerText = (this.count * 10) + "ms";
            }, 10);
        }

        reset() {
            this.count = 100;
            if (this.counter) {
                window.clearInterval(this.counter);
            }
            return this;
        }
    }

    class Score {
        constructor() {
            this.value = 0;
        }

        _update() {
            scoreText.innerText = this.value;
        }

        addOne() {
            this.value += 1;
            this._update();
        }

        reset() {
            this.value = 0;
            this._update();
        }

        get() {
            return this.value;
        }
    }

    const timer = new Timer();
    const score = new Score();

    document.addEventListener("DOMContentLoaded", () => {
        const yard = document.getElementById("yard");
        holes = document.getElementsByClassName("hole");
        startButton = document.getElementById("start-button");
        scoreText = document.getElementById("score");
        countdown = document.getElementById("countdown");

        yard.addEventListener("click", event => {
            const target = event.target;
            if (target.classList.contains("mole")) {
                clickedMole(event.target);
            }
        });

        startButton.addEventListener("click", () => {
            showMole();
            score.reset();
        });
    });

    function clickedMole(mole) {
        mole.classList.remove("mole");
        timer.reset();
        score.addOne();
        if (score.get() == 5) {
            const list = document.body.classList;
            list.add("won");
            list.remove("ready");
            return;
        }
        showMole();
    }

    function showMole() {
        const list = document.body.classList;
        list.add("ready");
        list.remove("won");
        list.remove("lost");
        const timeout = Math.floor(Math.random() * 3000);
        window.setTimeout(() => {
            const index = Math.floor(Math.random() * 8);
            current = holes.item(index);
            current.classList.add("mole");
            timer.reset().set();
        }, timeout);
    }

})(window, window.document);
