function changeBannerColor(background, newBackgroundImg) {
    if (document.documentElement.classList.contains("light-mode")) {
        console.log("light-mode");
        background.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImg}'), linear-gradient(to right, #ffffff, rgba(255,255,255,0.9), rgba(0,0,0,0))`;
    } else {
        console.log("NOT light-mode");
        background.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImg}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;
    }
}



//모드 클릭 시 다크모드 또는 라이트 모드로 변함. 
//다크 버튼 클릭하면 라이트 모드로, 라이트 버튼을 누르면 다크 모드로! 

function changeMode(currentMode, switchMode, background, newBackgroundImg) {
    currentMode.style.opacity = "0";
    currentMode.style.zIndex = "0";
    switchMode.style.opacity = "1";
    switchMode.style.zIndex = "1";
    //바꾸려고 하는 모드가 라이트 모드이면 라이트 모드 클래스 추가, 그렇지 않으면 라이트 모드 클래스 제거

    if (switchMode.matches('.button-lightmode')) {
        document.documentElement.classList.add("light-mode");
    }
    else if (switchMode.matches('.button-darkmode')) {
        document.documentElement.classList.remove("light-mode");
    }

    changeBannerColor(background, newBackgroundImg);
}



export { changeMode }