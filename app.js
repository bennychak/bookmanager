let currentPage = 1;
const itemsPerPage = 3;
let filteredBooks = books.sort(function(){
    return Math.random() - 0.5;
});
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
                ${book.book_star ? `<p><strong>评级:</strong style="vertical-align:middle"> <span class="book-star">${createStars(book.book_star)}</span></p>` : ''}
                ${book.book_gettime ? `<p><strong>得到时间:</strong> ${book.book_gettime}</p>` : ''}
                ${book.book_summary ? `<p><strong>简介:</strong> ${book.book_summary}</p>` : ''}
                ${book.book_dadsay ? `<p><strong>爸爸说:</strong> ${book.book_dadsay}</p>` : ''}
                ${book.book_momsay ? `<p><strong>妈妈说:</strong> ${book.book_momsay}</p>` : ''}
                <p><strong>作者:</strong> ${book.book_author}</p>
                <p><strong>出版:</strong> ${book.book_press}</p>
                <p><strong>定价:</strong> ${book.book_price}(${book.book_pricecurrent})</p>
                <p><strong>版次:</strong> ${book.book_presstime}</p>
                <p><strong>分类:</strong> ${book.book_class}</p>
                <p><strong>ISBN/书号:</strong> ${book.book_isbn}</p>
                <p><strong>中国国家图书馆分类:</strong> ${book.book_cnClassification}</p>
                <p><strong>美国国会图书馆分类:</strong> ${book.book_usClassification}</p>
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
        searchResultTotal.textContent = `为你找到${totalItems}套书`;
        bookTotal.style.display = 'none';
        searchResultTotal.style.display = 'inline-block';
    } else {
        bookTotal.textContent = `已上架${totalItems}套图书`;
        bookTotal.style.display = 'inline-block';
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
        book.book_gettime.toString().includes(query) ||
        book.book_class.toLowerCase().includes(query) ||
        book.book_isbn.includes(query) ||
        book.book_cnClassification.toString().includes(query) ||
        book.book_usClassification.toString().includes(query)
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