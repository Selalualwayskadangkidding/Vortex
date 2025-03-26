//  TOGGLE
const darkmode = document.getElementById('mode').addEventListener('click',toggleDarkMode);
const logo = document.getElementById('mode')
const text = "MY NAME IS GENTA PRAWIRA D.";
let i = 0;
let speed = 150;
// Pastikan script Typed.js sudah dimuat dulu sebelum eksekusi
document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed('.name', {
        strings: ['Genta Prawira D.'], // 'strings' bukan 'string'
        typeSpeed: 100, // Kecepatan ketik
        backSpeed: 50, // Kecepatan hapus
        showCursor: true, // Biar ada kursor
        cursorChar: '|', // Karakter kursor
        loop: true // Biar teks diketik ulang terus
    });
});

// Tambahkan event listener untuk efek navbar saat scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }
    });
});

// Burger List
// Burger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.querySelector('.burger-icon');
    const navMenu = document.querySelector('.nav ul');

    burgerIcon.addEventListener('click', function() {
        burgerIcon.classList.toggle('open');
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerIcon.classList.remove('open');
            navMenu.classList.remove('active');
        });
    });
});


let reposData = [];
// Modifikasi fungsi toggleDarkMode
function toggleDarkMode() {
    const logo = document.getElementById('mode');
    logo.classList.add('rotate');

    document.body.classList.toggle('darkmode');

    if (document.body.classList.contains('darkmode')) {
        logo.textContent = 'light_mode';
    } else {
        logo.textContent = 'dark_mode';
    }

    // Hapus kelas rotate setelah animasi
    setTimeout(() => {
        logo.classList.remove('rotate');
    }, 500);
}

// Pastikan mode toggle berada di luar burger list
document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('mode');
    modeToggle.removeEventListener('click', toggleDarkMode);
    modeToggle.addEventListener('click', toggleDarkMode);
});

// Fetch API 
// Declare Variables
let api = [];
let responData = [];
let containerRecent = document.getElementById('container');
let containerButton = document.querySelector('.navigation-button')
let load = document.getElementById('loading');
let prevBtn = document.getElementById('prev');
let pageDisplay = document.getElementById('pageDisplay');
let nextBtn = document.getElementById('next');
let currentPage = 1;
let itemsPerPage = 3;
let prevClass = document.querySelector('.prev-class');
let nextClass = document.querySelector('.next-class');
function fetchData() {
    fetch('https://api.github.com/users/Selalualwayskadangkidding/repos')
    .then (response => response.json())
    .then(data => {
        load.innerHTML = `Loading`
        setTimeout(() => {
            console.log("Data dari API:", data);
        api = data;
        localStorage.setItem('api',JSON.stringify(api));
        displayData();
        load.innerHTML = ``;
        },2000)
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function displayData(data = api) {
    console.log("Memanggil displayData, Current Page:", currentPage);
    containerRecent.innerHTML = ``;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    currentData.forEach((item ) => {
        const div =document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<h1>${item.name}</h1>
        <p>${item.description}</p>`
        containerRecent.appendChild(div);
    })
    pageDisplay.textContent = `Halaman ${currentPage} Dari ${Math.ceil(api.length / itemsPerPage)}`;
    button();
    changePage();
}
function button(data = api) {
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    // Hitung halaman terakhir berdasarkan jumlah item
    const isLastPage = currentPage === Math.ceil(data.length / itemsPerPage);

    // Update tombol Previous
    prevBtn.disabled = currentPage === 1;
    if (prevBtn.disabled) {
        prevBtn.classList.add("disabled-prev");
        prevBtn.classList.remove("prev-class");
    } else {
        prevBtn.classList.remove("disabled-prev");
        prevBtn.classList.add("prev-class");
    }

    // Update tombol Next
    nextBtn.disabled = isLastPage;
    if (isLastPage) {
        nextBtn.classList.add("disabled-next");
        nextBtn.classList.remove("next-class");
    } else {
        nextBtn.classList.remove("disabled-next");
        nextBtn.classList.add("next-class");
    }

    // Debugging, cek apakah class sudah berubah
    console.log("Prev Class:", prevBtn.classList.value);
    console.log("Next Class:", nextBtn.classList.value);
}

function changePage() {
    containerRecent.style.opacity = 0;
    setTimeout(() => {
        containerRecent.style.opacity = 1;
    }, 300);
}


prevBtn.addEventListener('click',()=> {
    currentPage --;
    displayData();

});
nextBtn.addEventListener('click',()=>{
    currentPage ++;
    displayData();
});


// Filter Search In Pagination Recent Work
let search = document.getElementById('filterSearch');
function searchFilter() {
    const searchValue = search.value.toLowerCase();
    filteredData = api.filter ((item) => {
    return item.name.toLowerCase().includes(searchValue);
    });
    currentPage = 1;
    displayData(filteredData)
    button(filteredData)
}
function debounce(func,delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout (() => func.apply(this,args),delay);
    }
}
const debounceSearch = debounce(searchFilter,2000);
search.addEventListener('input',() => {
    load.innerText = `Loading ...`;
    load.innerText =``;
    debounceSearch();
});



fetchData();

