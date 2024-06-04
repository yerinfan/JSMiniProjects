// 웹페이지가 로드될 때 = 익명함수 실행
window.onload = function () {
    // 버튼노드 = 첫번째 버튼 요소 
    const btnNode = document.querySelector("button");
    // 버튼노드 클릭 이벤트 발생시 시작되는 익명함수
    btnNode.addEventListener("click", function() {
        
        // 단넘버 = #danInput에서 받은 value를 저장한다.
        const danNum = document.querySelector("#danInput").value;
        // 단넘버 출력
        console.log(danNum);
    
        // if (danNum == Null) return;

        // #danNumber 쿼리에 HTML로 %d단 출력 
        document.querySelector("#danNumber").innerHTML = `${danNum}단`;
        
        // #resultNode에 #result 요소 저장
        const resultNode = document.querySelector("#result");
        let result = "";
        for (let i = 1; i <= 9; i++) {
            // 구구단 시트
            result += `${danNum} x ${i} = ${String(danNum * i).padStart(2,' ')}<br>`;
        } 
        // padStart == 5글자인데 10글자에 넣고 싶다. 그럼 앞에다가 공백 잘 넣어줌 
        // padEnd 뒤에다가 패딩할거야? 공백으로 숫자단위
        // css에 html 공백삭제되는 어떤 방어시스템이있다.

        // HTML로 result 출력
        resultNode.innerHTML = result;
        // displayArea 클래스를 블럭으로 display
        document.querySelector(".displayArea").style.display = "block";
    });
}
