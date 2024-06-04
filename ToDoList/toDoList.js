window.onload = function() {
    const savedTodoList = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodoList) {
        for (let i = 0; i < savedTodoList.length; i++){
            console.log(savedTodoList[i]);
            addTodoList(savedTodoList[i]); // 전달인자로 전달하다
        }
    }
    const todoInput = document.querySelector("#todoInput");
    const addBtn = document.querySelector("#addBtn");
    todoInput.addEventListener("keydown", function(){

    });
    addBtn.addEventListener("click", function() {
        if (todoInput.value != "") addTodoList();
    });
}



function saveItems() { // 로컬에 데이터 저장하기

	const saveItems = []; // 빈 배열 할당
    const listArea = document.querySelector(".listArea")
	for (let node of listArea.children) {
        textNode = node.querySelector('span');
	    const todoObj = {
	        todo: textNode.textContent,
	        check: textNode.classList.contains('check')
	    };
	    saveItems.push(todoObj);
	}
	console.log(JSON.stringify(saveItems));
	
	localStorage.setItem('todolist', JSON.stringify(saveItems));
}

function addTodoList(savedTodo) {
    if (savedTodo) {
        console.log(savedTodo)
    } else 
        console.log(todoInput.value);

    const listArea = document.querySelector(".listArea");
    // createElement로 한 이유 편집쉽게 하려고
    const liNode = document.createElement("li");
    const checkBtn = document.createElement("button");
    // 마음대로 수정할수있는 텍스트로 
    const todoText = document.createElement("span");
    const delBtn = document.createElement("button");

    // 리스트의 자식 노드
    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);
    if (savedTodo) {
       todoText.innerText = savedTodo.todo;
       if (savedTodo.check){
            todoText.classList.add("check");
            checkBtn.innerHTML = "✔";
       }
    } else {
        todoText.innerText = todoInput.value;
        todoInput.value = "";
    }
    delBtn.innerText = "X"

    // 버튼 클래스
    checkBtn.classList.add("checkBtn");
    // 텍스트 클래스
    todoText.classList.add("todoText");
    //  버튼 클래스 (다 수정 쉽게 하려고)
    delBtn.classList.add("delBtn");
    saveItems();

    // 체크 버튼에도 이벤트 리스너, 다시 누르면 체크 해제까지 해야지
    checkBtn.addEventListener("click", function() {
        if (checkBtn.innerHTML == "") {
            checkBtn.innerHTML = "✔";
        }
        else {
            checkBtn.innerHTML = "";
        }
        // 체크라는 클래스에있다.(css에서) 이게 활성화되면 찍찍이 생김 토글로해도되고 add랑 빼기로 해도됨.
        todoText.classList.toggle("check");
        saveItems();
    })

    // 이벤트 핸들러를 붙일때 이미 li노드가 있어서 핸들러가 붙어있는 노드만 지움
    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveItems();
    })

    console.log(listArea.lastChild);
}