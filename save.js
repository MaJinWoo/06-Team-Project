// 6,7번 진우님
// 6. 로컬스토리지에 영화리스트를 저장하는 함수
// 7. 로컬스토리지에 클릭된카드의 id를 저장하는 함수

window.localStorage.setItem("movie", JSON.stringify(movieLists));

function cardClick(){
    window.localStorage.setItem("clickedID",id);
    console.log(window.localStorage.getItem("clickedID"));
    console.log(window.localStorage.length);
  }
card.addEventListener('click',cardClick);