// 헤더 고정시키는 함수
function fixedHeader(header, scrollTopButton) {
    let windowTop = window.scrollY;

    if (windowTop > 0) {
        header.style.position = "fixed";
        header.style.top = "0";
    } else {
        header.style.position = "relative";
    }

    if (window.scrollY > 200) {
        scrollTopButton.style.opacity = "1";
    } else {
        scrollTopButton.style.opacity = "0";
    }
}

function scrollTo(coordinate) {
    //위로 가는 버튼을 클릭하면 맨위로 이동하고 전체리뷰 버튼 클릭 시 전체 리뷰로 스크롤링
    window.scrollTo({
        top: coordinate,
        behavior: "smooth",
    });
}

export { fixedHeader, scrollTo }