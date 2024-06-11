const termsPerPage = 20;
let currentPage = 1;



function updateTermCount() {
    const totalTerms = localStorage.length;
    const termCountElement = document.getElementById('term-count');
    termCountElement.textContent = `Total Terms: ${totalTerms}`;
}

document.getElementById('term').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('definition').focus();
    }
});

document.getElementById('definition').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTerm();
    }
});

document.getElementById('search-term').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchTerm();
    }
});


function addTerm() {
    const term = document.getElementById('term').value.trim();
    const definition = document.getElementById('definition').value.trim();

    if (localStorage.getItem(term)) {
        alert('이미 존재하는 용어입니다.');
        return;
    }
    
    if (term && definition) {
        localStorage.setItem(term, definition);
        alert('용어가 추가되었습니다.');
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
        updateTermCount();
    } else if (!term && !definition) {
        alert('용어와 정의를 입력해주세요.');
    } else if (!term) {
        alert('용어를 입력해주세요.');
    } else if (!definition) {
        alert('정의를 입력해주세요.');
    }
}


function deleteTerm(term) {
    if (confirm("Are you sure you want to delete this?")) {
        localStorage.removeItem(term);
        viewAllTerms(currentPage);
        updateTermCount();
    }
}

function editTerm(term) {
    const newDefinition = prompt(`새로운 정의 입력 "${term}":`, localStorage.getItem(term));

    if (newDefinition !== null) {
        localStorage.setItem(term, newDefinition);
        viewAllTerms(currentPage);
    }
}

function viewAllTerms(page = 1) {
    currentPage = page;
    const termsList = document.getElementById('terms-list');
    termsList.innerHTML = '';

    const totalItems = localStorage.length;
    const totalPages = Math.ceil(totalItems / termsPerPage);

    const termCount = document.createElement('p');
    termCount.textContent = `전체 용어의 수 : ${totalItems}개`;
    termsList.appendChild(termCount); // Append the total term count within the terms list

    const start = (page - 1) * termsPerPage;
    const end = start + termsPerPage;

    for (let i = start; i < end && i < totalItems; i++) {
        const term = localStorage.key(i);
        const definition = localStorage.getItem(term);

        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${i + 1}. ${term}</strong>: ${definition}
        <button onclick="editTerm('${term}')"><i class="fas fa-pencil-alt"></i></button>
        <button onclick="deleteTerm('${term}')"><i class="fas fa-trash-alt"></i></button>`;

        termsList.appendChild(listItem);
    }

    renderPagination(totalPages);
}

function searchTerm() {
    const searchTerm = document.getElementById('search-term').value.trim();
    const definition = localStorage.getItem(searchTerm);

    const resultElement = document.getElementById('search-result');
    if (definition) {
        resultElement.textContent = `정의 : ${definition}`;
    } else {
        resultElement.textContent = '해당 용어를 찾을 수 없습니다.';
    }
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
