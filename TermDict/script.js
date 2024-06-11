const termsPerPage = 20;
let currentPage = 1;

document.getElementById('term').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTerm();
    }
});

document.getElementById('definition').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTerm();
    }
});

document.getElementById('search-term').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchTerm();
    }
});

function addTerm() {
    const term = document.getElementById('term').value.trim();
    const definition = document.getElementById('definition').value.trim();

    if (term && definition) {
        localStorage.setItem(term, definition);
        alert('용어가 추가되었습니다.');
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
    } else if (!term && !definition) {
        alert('용어와 정의를 입력해주세요.');
    } else if (!term) {
        alert('용어를 입력해주세요.');
    } else if (!definition) {
        alert('정의를 입력해주세요.');
    }
}

function searchTerm() {
    const searchTerm = document.getElementById('search-term').value.trim();
    const definition = localStorage.getItem(searchTerm);

    const resultElement = document.getElementById('search-result');
    if (definition) {
        resultElement.textContent = `정의: ${definition}`;
    } else {
        resultElement.textContent = '해당 용어를 찾을 수 없습니다.';
    }
}




function viewAllTerms(page = 1) {
    currentPage = page;
    const termsList = document.getElementById('terms-list');
    termsList.innerHTML = '';

    const totalItems = localStorage.length;
    const totalPages = Math.ceil(totalItems / termsPerPage);

    const start = (page - 1) * termsPerPage;
    const end = start + termsPerPage;

    for (let i = start; i < end && i < totalItems; i++) {
        const term = localStorage.key(i);
        const definition = localStorage.getItem(term);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${i + 1}. ${term}</strong><br>${definition}`;
        termsList.appendChild(listItem);
    }

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => viewAllTerms(i);
        if (i === currentPage) {
            pageButton.style.fontWeight = 'bold';
        }
        pagination.appendChild(pageButton);
    }
}
