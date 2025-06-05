// WRIT 40363 - Components Loader for Pages

document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('../components/header.html')
            .then(response => response.text())
            .then(html => {
                headerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }

    // Load navigation component
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('../components/navigation.html')
            .then(response => response.text())
            .then(html => {
                navPlaceholder.innerHTML = html;
                // Fix navigation paths for subdirectory pages
                fixNavigationPaths();
                // Initialize navigation after loading
                initializeNavigation();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
            });
    }

    // Load footer component
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});

// Fix navigation paths for pages in subdirectories
function fixNavigationPaths() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Convert root-relative paths to work from subdirectory
            if (href === 'index.html') {
                link.setAttribute('href', '../../index.html');
            } else if (href.startsWith('src/pages/')) {
                // Convert src/pages/file.html to ./file.html
                const filename = href.replace('src/pages/', '');
                link.setAttribute('href', filename);
            }
        }
    });
}

// Initialize navigation functionality after loading
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}
