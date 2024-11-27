let Window_properties = {
        width,
        height
}

function resetAnim() {
        let Window = document.getElementById("window");
        
        original_width = Window.style.width;
        original_height = Window.style.height;

        Window.style.width = "0";
        Window.style.height = "0";
        
        for (let i = 0; i < Window.children.length; i++) {
                Window.children[i].style.display = "none";
        }
}


window.onload = function () {
        resetAnim();
};
