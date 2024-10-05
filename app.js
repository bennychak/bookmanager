let currentPage = 1;
const itemsPerPage = 3;
let filteredBooks = books.sort(function(){
    return Math.random() - 0.5;
});
let isSearching = false;

window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};


function book_clc(){
    alert("书名前的字母标记了图书大类：\nA 马列毛邓理论\nB 哲学心理宗教\nC 社会科学总论\nD 政治法律相关\nE 军事战略相关\nF 经济管理金融\nG 文体教育传播\nH 语言文字学习\nI 各种文学相关\nJ 各种艺术相关\nK 历史地理传记\nN 自然科学总论\nO 数理科学化学\nP 天文地质海洋\nQ 生物科学人类\nR 医药卫生相关\nS 农林牧副渔业\nT 工业工程技术\nU 交通运输相关\nV 航空航天相关\nX 环境安全科学\nZ 丛书百科综合\n至于2个字母代表什么？搜索中国图书馆分类法（CLC），答案交给你来探索～");
}

function displayBooks(books) {
    const bookCards = document.getElementById('book-cards');
    bookCards.innerHTML = '';

    books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        const card_mark = book.book_cnClassification.slice(0,3).replace(/\d+/g, '').replace('-', '');
        card.innerHTML = `
            <h2><span class="card_mark" onclick="book_clc()">`+card_mark+`</span>${book.book_name}</h2>
            <div class="book-details">
                ${book.book_star ? `<p><strong>评级:</strong style="vertical-align:middle"> <span class="book-star">${createStars(book.book_star)}</span></p>` : ''}
                ${book.book_gettime ? `<p><strong>得到时间:</strong> ${book.book_gettime}</p>` : ''}
                <p><strong>得到价格:</strong> <big>${book.book_getprice}</big> <small>${book.book_getpricecurrent}</small></p>
                ${book.book_summary ? `<p><strong>简介:</strong> ${book.book_summary}</p>` : ''}
                ${book.book_dadsay ? `<p><strong>爸爸说:</strong> ${book.book_dadsay}</p>` : ''}
                ${book.book_momsay ? `<p><strong>妈妈说:</strong> ${book.book_momsay}</p>` : ''}
                <p><strong>作者:</strong> ${book.book_author}</p>
                <p><strong>出版:</strong> ${book.book_press}</p>
                <p><strong>定价:</strong> <big>${book.book_price}</big> <small>${book.book_pricecurrent}</small></p>
                ${book.book_presstime ? `<p><strong>版次:</strong> ${book.book_presstime}</p>` : ''}
                ${book.book_isbn ? `<p><strong>ISBN/书号:</strong> ${book.book_isbn}</p>` : ''}
                <p><strong>分类:</strong> ${book.book_class}</p>
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
    filteredBooks = books.sort(function(){
        return Math.random() - 0.5;
    });
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