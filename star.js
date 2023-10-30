// 별점을 줄수있는 함수입니다.
// html은 박스 및에 5개의 빈 별이 들어가있는 상태입니다.
// 박스에 클릭 이벤트 리스너를 달아줍니다.
// 문제점 svg요소를 클릭시 정상 작동하나 path부분을 클릭시 버그 발생..

function reviewStarReset(starBox, defaultStarCount) {
    const defaultHtml = ` <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>`;
    starBox.innerHTML = defaultHtml;
    defaultStarCount = 2;
}

function makeStars(score) {
    const printStarIndex = Math.floor(score / 2); // 평점은 8.6 이런식으로 들어와서 Math.floor를사용해 내려주고 별점은 5점만점으로 2를 나눠주었다.
    // 각 변수는 채워진 별과 빈별을 뜻한다.
    const printStar = `
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
                      </svg>`;
    const emptyStar = `
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
                      </svg>`;

    let result = ``;
    // 반복문을 사용하였다 별의 최대 갯수는 5개이므로 i는 1~5까지의 값을 가질 수 있으며 한사이클 돌때마다 +1된다.
    // i가 printStartIndex보다 작거나 같을때 result은 기존에 있던 값에 printStart를 추가하게 된다 (+= 더하고 할당하기)
    // 만약 i가 printStartIndex보다 크다면 emptyStar을 추가하게된다.
    for (let i = 1; i <= 5; i++) {
        if (i <= printStarIndex) {
            result += printStar;
        } else {
            result += emptyStar;
        }
    }
    return result;
}

function modifyStars(nthStar, starBox, changeStarCount) {

    if (nthStar.tagName === "path") {
        nthStar = nthStar.parentElement; // path 요소를 클릭했을 때 버그수정을 위해 부모인 svg 요소를 대상으로 변경
    }
    if (nthStar.tagName !== "svg") return; // div같은거 가끔 눌려서 그때마다 버그걸리는거 수정을 위해 조건 추가.

    const parentNodeList = Array.from(starBox.children); // 해당변수는 별을 담고있는 박스의 자식요소들을 가져옵니다.
    // html요소들은 htmlcollection이라는 요소로 배열처럼 생겼지만 배열이 아닙니다.
    // 그러므로 Array.from()안에 담아서 배열로 바꿔줍니다.(배열 메소드 사용하기 위해)

    const printIndex = parentNodeList.indexOf(nthStar); //indexOf라는 배열메소드를 사용하여 지금 클릭한 타겟이 몇번째 요소인지 찾습니다.
    //e라는건 이벤트로 e.target은 현재 이벤트가 일어난(클릭된 녀석)녀석입니다.
    changeStarCount = (printIndex + 1) * 2
    // 박스가 가진 별의 수만 큼 반복하는 함수를 실행하여 인덱스가 프린트인덱스보다 작거나 같으면 채워진 별을 innerHtml로 덮어주고
    // 아닌경우 빈별을 innerHtml로 덮어줍니다.
    parentNodeList.forEach((children, index) => {
        if (index <= printIndex) {
            parentNodeList[index].innerHTML = `
                                              
                                                <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
                                              `;
        } else {
            parentNodeList[index].innerHTML = `
                                                <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
                                              `;
        }
    });
    //수정한 별점을 반환해야 리뷰 데이터에 추가할 때 수정된 별점을 추가할 수 있음. 
    return changeStarCount;
}


export { reviewStarReset, makeStars, modifyStars }