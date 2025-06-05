// WRIT 40363 - Components Loader

document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('src/components/header.html')
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
        fetch('src/components/navigation.html')
            .then(response => response.text())
            .then(html => {
                navPlaceholder.innerHTML = html;
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
        fetch('src/components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});

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

    // Set active navigation state based on current page
    setActiveNavigation();
}

// Set active navigation state
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if this is the current page
        const linkPath = link.getAttribute('href');
        
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            if (link.getAttribute('data-page') === 'home') {
                link.classList.add('active');
            }
        } else if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
}
