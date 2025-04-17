window.onload = function () {
        // GLOBAL VARIABLES
        let WINDOW = document.getElementById("window");
        let CLOSE = document.getElementById("close");
        let MINIMIZE = document.getElementById("minimize");
        let FOLLOW = document.getElementById("follow");
        let RESTORE = new Object();
        let TIMER;
        let OPEN = false;
        let FRAMES = 0;

        function getRestore() {
                RESTORE = new Object();
                let computedStyle = window.getComputedStyle(WINDOW);

                RESTORE.border = WINDOW.style.border;
                RESTORE.backgroundColor = computedStyle.backgroundColor;
                RESTORE.borderRadius = computedStyle.borderRadius;
                RESTORE.padding = computedStyle.padding;
                RESTORE.boxShadow = computedStyle.boxShadow;
        }

        function showWindowUI (showElements) {
                const children = WINDOW.children;
                let command = "";
                if (showElements) {
                        command = "visible";
                } else {
                        command = "hidden";
                }

                for (child of children) {
                        // OF loop - Returns actual element
                        // IN loop - Returns index of elements
                        child.style.visibility = command;
                }
                
        }

        function showWindowDecor() {
                WINDOW.style.border = RESTORE.border; 
                WINDOW.style.backgroundColor = RESTORE.backgroundColor;
                WINDOW.style.borderRadius = RESTORE.borderRadius;
                WINDOW.style.padding = RESTORE.padding;
                WINDOW.style.boxShadow = RESTORE.boxShadow;
                WINDOW.style.visibility = "visible";
        }

        function hideWindowDecor() {
                WINDOW.style.border = "none";
                WINDOW.style.backgroundColor = "none";
                WINDOW.style.borderRadius = "0px";
                WINDOW.style.width = "0%";
                WINDOW.style.height = "0%";
                WINDOW.style.padding = "none";
                WINDOW.style.boxShadow = "none";
                WINDOW.style.visibility = "hidden";
        }

        function compare(value, comparison) {
                return parseFloat(value) >= parseFloat(comparison);
        }
        
        // MIN/ MAX HEIGHT
        function maxWidth() {
                return parseFloat(WINDOW.style.width) >= 100;
        }

        function maxHeight() {
                return parseFloat(WINDOW.style.height) >= 100;
        }

        function minWidth() {
                return parseFloat(WINDOW.style.width) <= 0.1;
        }

        function minHeight() {
                return parseFloat(WINDOW.style.height) <= 0.1;
        }


        function getIncrement () {
                // Gets the value to increment window animation based of frames elapsed
                // Necissary for ease-in/ out
                return FRAMES / 3.5;
                //return Math.pow((1/10), FRAMES - 2) + 5;
        }

        function openAnimation () {
                FRAMES += 1;

                if (maxHeight() && maxWidth()) {
                        clearInterval(TIMER); 
                }

                if (compare(WINDOW.style.width, 60) && compare(WINDOW.style.height, 30)) {
                        showWindowUI(true);
                }

                if (!maxHeight()) {
                        WINDOW.style.height = (parseFloat(WINDOW.style.height) + getIncrement()) + "%";
                }

                if (!maxWidth()) {
                        WINDOW.style.width = (parseFloat(WINDOW.style.width) + getIncrement()) + "%";
                }

        }

        function closeAnimation () {
                FRAMES += 1;

                if (minWidth() && minHeight()) {
                        hideWindowDecor();
                        WINDOW.style.visibility = "hidden";
                        showWindowUI(false);
                        OPEN = false;
                        clearInterval(TIMER);

                }

                if (!compare(WINDOW.style.width, 75) || !compare(WINDOW.style.height, 50)) {
                        showWindowUI(false);
                }

                if (!minHeight()) {
                        WINDOW.style.height = (parseFloat(WINDOW.style.height) - getIncrement()) + "%";
                }

                if (!minWidth()) {
                        WINDOW.style.width = (parseFloat(WINDOW.style.width) - getIncrement()) + "%";
                }
        }

        function openWindow () {
                if (!(event.ctrlKey && (event.key == "A" || event.key == "a"))) return;

                if (OPEN) return;
                OPEN = true;

                if (TIMER) {
                        clearInterval(TIMER);
                }

                showWindowUI(false);
                hideWindowDecor();
                WINDOW.style.width = "0%";
                WINDOW.style.height = "0%";

                showWindowDecor();
                
                FRAMES = 0;
                TIMER = setInterval(openAnimation, 15);
         }

        function closeWindow() {
                if (!OPEN) return;
                
                FRAMES = 0;
                TIMER = setInterval(closeAnimation, 15);
        }
        
        getRestore();
        hideWindowDecor();
        showWindowUI(false);

        document.addEventListener("keydown", openWindow);
        CLOSE.addEventListener("click", closeWindow);
        MINIMIZE.addEventListener("click", closeWindow);
        FOLLOW.addEventListener("click", function () {
                if (OPEN) {
                        console.log("Hello");
                        window.open("https://github.com/111nation");
                }
        });
}
