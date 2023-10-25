// scroll 했을 때 fixed header
window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    let windowTop = window.scrollY;

    if (windowTop > 0) {
        header.style.position = "fixed";
        header.style.top = "0";
    } else {
        header.style.position = "relative";
    }
});
// 백그라운드 컬러, 트랜지션 추가 필요

// scrollToTop

// darkmode control

const darkButton = document.querySelector(".button-darkmode");
const lightButton = document.querySelector(".button-lightmode");
darkButton.addEventListener("click", function () {
    this.style.opacity = "0";
    this.style.zIndex = "0";
    lightButton.style.opacity = "1";
    lightButton.style.zIndex = "1";
    document.body.classList.add("light-mode");
});
lightButton.addEventListener("click", function () {
    this.style.opacity = "0";
    this.style.zIndex = "0";
    darkButton.style.opacity = "1";
    darkButton.style.zIndex = "1";
    document.body.classList.remove("light-mode");
});
