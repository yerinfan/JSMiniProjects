// 창 로드 시 시작되는 익명함수
window.onload = function () {
    // startBtn에 #startBtn 버튼 변수 저장
    const startBtn = document.querySelector("#startBtn");

    // 클릭 이벤트 발생시 익명함수 실행
    startBtn.addEventListener("click", function () {
        const numberInput = document.querySelector("#numberInput");
        if (numberInput.value == "") {
            // 널인가?
            // 널일 경우, placeholder값을 size에 저장한다.
            size = numberInput.placeholder;
        }
        else {
            // 널이 아니면, numberInput 값을 size에 저장.
            size = numberInput.value;
        }
        // size를 콘솔에 출력
        console.log(size);

        // tableArea에 tableArea 클래스 선언?
        const tableArea = document.querySelector(".tableArea");
        // size * size 크기의 테이블 생성
        const cellHTML = '<table>\n'
            + ('\t<tr>' + '<td></td>'.repeat(size) + '</tr>').repeat(size)
            + '</table>';
        // HTML에 테이블 추가
        tableArea.innerHTML = cellHTML;

        // 모든 td쿼리를 tds변수에 선언
        const tds = document.querySelectorAll("td");

        // curLoc (현재위치) 랜덤 설정
        let curLoc = Math.floor(Math.random() * size * size);
        // 현재 위치 스타일 컬러를 violet으로 설정 
        tds[curLoc].style.backgroundColor = "violet";
        // curLoc 콘솔에 출력
        console.log(curLoc);

        // 키 입력 이벤트가 생길 때 실행되는 함수
        window.onkeydown = function (event) {
            // 만약 화살표 키코드가 아닐경우 리턴
            if (event.keyCode < 37 || event.keycode > 40) return;
            // 만약 화살표 키코드일 경우 white로 색변경, 
            tds[curLoc].style.backgroundColor = "white";
            // 행과 열을 선언
            let row = Math.floor(curLoc / size);
            let col = curLoc % size;

            // 무슨 화살표 키가 들어왔는가?
            switch (event.key) {
                // 좌
                case 'ArrowLeft':
                    // 열이 1열일 경우 col = size-1, 아니면 열에서 -1
                    curLoc += (col > 0 ? -1 : size-1);
                    break;
                // 우
                case 'ArrowRight':
                    // 열이 맨오른쪽(size -1)일 경우 col = 1, 아니면 -(size-1)
                    curLoc += (col < size-1) ? 1 : -(size-1);
                    break;
                // 상
                case 'ArrowUp':
                    // 행이 1행일 경우 같은 열 마지막 행으로, 아니면 한줄 위로
                    curLoc += (row > 0 ? -size : (size-1) * size);
                    break;
                // 하
                case 'ArrowDown':
                    // 행이 마지막 행일 경우 1행으로, 아니면 한줄 아래로
                    curLoc += Number((row < size-1) ? size : -(size-1)*size);
                    break;
                
            }
            // 콘솔에 현재위치 출력
            console.log(curLoc);

            // 현재위치 배경 violet 변경
            tds[curLoc].style.backgroundColor = "violet";
        }

    });
}
