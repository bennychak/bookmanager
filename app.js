let currentPage = 1;
const itemsPerPage = 5;
let filteredBooks = books;
let isSearching = false;

function displayBooks(books) {
    const bookCards = document.getElementById('book-cards');
    bookCards.innerHTML = '';

    books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h2>${book.book_name}</h2>
            <div class="book-details">
                <p><strong>作者:</strong> ${book.book_author}</p>
                <p><strong>出版社:</strong> ${book.book_press}</p>
                <p><strong>获取时间:</strong> ${book.book_gettime}</p>
                <p><strong>分类:</strong> ${book.book_class}</p>
                <p><strong>ISBN:</strong> ${book.book_isbn}</p>
                <p><strong>中图分类号:</strong> ${book.book_cnClassification}</p>
                <p><strong>LCC分类号:</strong> ${book.book_usClassification}</p>
                ${book.book_note ? `<p><strong>备注:</strong> ${book.book_note}</p>` : ''}
                ${book.book_dadsay ? `<p><strong>爸爸说:</strong> ${book.book_dadsay}</p>` : ''}
                ${book.book_momsay ? `<p><strong>妈妈说:</strong> ${book.book_momsay}</p>` : ''}
                <div class="book-star">${createStars(book.book_star)}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            toggleCardDetails(card);
        });
        bookCards.appendChild(card);
    });

    updatePagination();
}

function createStars(stars) {
    let starHtml = '';
    for (let i = 0; i < stars; i++) {
        starHtml += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
    return starHtml;
}

function updatePagination() {
    const totalItems = filteredBooks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageInfo = document.getElementById('page-info');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const bookTotal = document.getElementById('book-total');
    const searchResultTotal = document.getElementById('search-result-total');

    if (isSearching) {
        searchResultTotal.textContent = `搜索结果数: ${totalItems}`;
        bookTotal.style.display = 'none';
        searchResultTotal.style.display = 'block';
    } else {
        bookTotal.textContent = `总图书数: ${totalItems}`;
        bookTotal.style.display = 'block';
        searchResultTotal.style.display = 'none';
    }

    pageInfo.textContent = `${currentPage} / ${totalPages}`;

    if (currentPage === 1) {
        prevPageButton.disabled = true;
    } else {
        prevPageButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextPageButton.disabled = true;
    } else {
        nextPageButton.disabled = false;
    }

    if (totalPages > 1) {
        document.getElementById('back-to-top').style.display = 'block';
    } else {
        document.getElementById('back-to-top').style.display = 'none';
    }
}

function changePage(direction) {
    currentPage += direction;
    displayBooks(filteredBooks);
}

function searchBooks() {
    const query = document.getElementById('search-input').value.toLowerCase();
    filteredBooks = books.filter(book => 
        book.book_name.toLowerCase().includes(query) ||
        book.book_press.toLowerCase().includes(query) ||
        book.book_author.toLowerCase().includes(query) ||
        book.book_gettime.includes(query) ||
        book.book_class.toLowerCase().includes(query) ||
        book.book_isbn.includes(query) ||
        book.book_cnClassification.includes(query) ||
        book.book_usClassification.includes(query) ||
        book.book_star.toString().includes(query)
    );

    isSearching = true;
    currentPage = 1;
    displayBooks(filteredBooks);
}

function resetSearch() {
    filteredBooks = books;
    isSearching = false;
    currentPage = 1;
    displayBooks(filteredBooks);
    document.getElementById('search-input').value = '';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCardDetails(card) {
    const allCards = document.querySelectorAll('.book-card');
    allCards.forEach(c => c.classList.remove('expanded'));
    card.classList.add('expanded');
}

// 初始化显示所有图书
displayBooks(books);

// 监听滚动事件，显示/隐藏回到顶部按钮
window.addEventListener('scroll', () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});