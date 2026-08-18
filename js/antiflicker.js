document.documentElement.style.opacity = "0";
opacityHandle = function () {
    document.documentElement.style.opacity = "1";
    clearTimeout(timeout);
}

timeout = setTimeout(opacityHandle, 2000);