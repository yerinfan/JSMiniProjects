function addTerm() {
    const term = document.getElementById('term').value;
    const definition = document.getElementById('definition').value;

    if (term && definition) {
        localStorage.setItem(term, definition);
        alert('용어가 추가되었습니다.');
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
    } else {
        alert('용어와 정의를 입력해주세요.');
    }
}

function searchTerm() {
    const searchTerm = document.getElementById('search-term').value;
    const definition = localStorage.getItem(searchTerm);

    const resultElement = document.getElementById('search-result');
    if (definition) {
        resultElement.textContent = `정의: ${definition}`;
    } else {
        resultElement.textContent = '해당 용어를 찾을 수 없습니다.';
    }
}

function viewAllTerms() {
    const termsList = document.getElementById('terms-list');
    termsList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const term = localStorage.key(i);
        const definition = localStorage.getItem(term);
        const listItem = document.createElement('li');
        listItem.textContent = `${term}: ${definition}`;
        termsList.appendChild(listItem);
    }
}
