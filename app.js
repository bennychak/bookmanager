let currentPage = 1;
const itemsPerPage = 3;
let filteredBooks = books.reverse();
let isSearching = false;

window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

let bookMark = {
    a: "A 马克思主义、列宁主义、毛泽东思想、邓小平理论",
    b: "B 哲学、宗教",
    c: "C 社会科学总论",
    d: "D 政治、法律",
    e: "E 军事",
    f: "F 经济",
    g: "G 文化、科学、教育、体育",
    h: "H 语言、文字",
    i: "I 文学",
    j: "J 艺术",
    k: "K 历史、地理",
    n: "N 自然科学总论",
    o: "O 数理科学和化学",
    p: "P 天文学、地球科学",
    q: "Q 生物科学",
    r: "R 医药、卫生",
    s: "S 农业科学",
    t: "T 工业技术",
    u: "U 交通运输",
    v: "V 航空、航天",
    x: "X 环境科学、安全科学",
    z: "Z 综合性图书"
}

function book_clc(mark,bookname,clc,lcc){
    mark = mark.slice(0,1).toLowerCase();
    alert("根据中国图书馆分类法，《"+bookname+"》属于如下分类：\n\n"+bookMark[mark]+"\n\n具体类别："+clc+"，对应美国国会图书馆类别："+lcc+"。");
}

function displayBooks(books) {
    const bookCards = document.getElementById('book-cards');
    bookCards.innerHTML = '';

    books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        const card_mark = book.book_cnClassification.slice(0,3).replace(/\d+/g, '').replace('-', '');
        card.innerHTML = `
            <h2><span class="card_mark" onclick="book_clc('`+card_mark+`','${book.book_name}','${book.book_cnClassification}','${book.book_usClassification}')">`+card_mark+`</span>${book.book_name}<label>Id.${book.id}</label></h2>
            <div class="book-details">
                <p><strong>主观评级:</strong style="vertical-align:middle"> <span class="book-star">${createStars(book.book_star)}</span></p>
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
        starHtml += `<svg fill="#f3b04b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
    for (let i = 0; i < 5 - stars; i++) {
        starHtml += `<svg fill="#dadada" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
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
        searchResultTotal.textContent = `为你找到${totalItems}部书`;
        bookTotal.style.display = 'none';
        searchResultTotal.style.display = 'inline-block';
    } else {
        bookTotal.textContent = `已上架${totalItems}部图书`;
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

function randomSearch() {
    for (let i = books.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // 选择一个随机索引
        [books[i], books[j]] = [books[j], books[i]];  // 交换两个元素的位置
    }
    filteredBooks = books;
    isSearching = false;
    currentPage = 1;
    displayBooks(filteredBooks);
    document.getElementById('search-input').value = '';
}

function sortSearch(){
    filteredBooks = books.sort((a, b) => b.id - a.id);
    isSearching = false;
    currentPage = 1;
    displayBooks(filteredBooks);
    document.getElementById('search-input').value = '';
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

const touchprev = document.getElementById("prev-page");
const touchnext = document.getElementById("next-page");
let intervalId;
let isLongPress = false;


touchprev.ontouchstart = function(event) {
    // 设置一个定时器，3秒后开始长按操作
    const longPressTimer = setTimeout(() => {
        isLongPress = true;
        intervalId = setInterval(() => {
           changePage(-1);
        }, 50); // 每50毫秒执行一次
    }, 1000); // 3000毫秒即3秒
    // 存储定时器ID以便后续清除
    event.target.dataset.longPressTimer = longPressTimer;
};
touchnext.ontouchstart = function(event) {
    // 设置一个定时器，3秒后开始长按操作
    const longPressTimer = setTimeout(() => {
        isLongPress = true;
        intervalId = setInterval(() => {
           changePage(1);
        }, 50); // 每50毫秒执行一次
    }, 1000); // 3000毫秒即3秒
    // 存储定时器ID以便后续清除
    event.target.dataset.longPressTimer = longPressTimer;
};

// 当用户手指离开屏幕时触发
touchprev.ontouchend = function(event) {
    // 清除定时器
    clearTimeout(event.target.dataset.longPressTimer);
    clearInterval(intervalId);
    isLongPress = false;
};
touchnext.ontouchend = function(event) {
    // 清除定时器
    clearTimeout(event.target.dataset.longPressTimer);
    clearInterval(intervalId);
    isLongPress = false;
};



// 初始化显示所有图书
displayBooks(books);
