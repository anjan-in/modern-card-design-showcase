// Color switcher functionality
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;
        document.documentElement.style.setProperty('--primary-color', color);
        
        // Adjust secondary colors based on primary
        const darkerColor = adjustColor(color, -20);
        document.documentElement.style.setProperty('--secondary-color', color);
        
        // Update elements
        document.querySelectorAll('.pricing-card.featured .pricing-header').forEach(header => {
            header.style.backgroundColor = color;
        });
        
        document.querySelectorAll('.pricing-card.featured .btn').forEach(btn => {
            btn.style.backgroundColor = color;
        });
    });
});

// Function to adjust color brightness
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

// Animate cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.basic-card, .product-card, .profile-card, .feature-card, .testimonial-card, .pricing-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', () => {
    // Flip animation for product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-effect');
            
            // Add a slight rotation effect
            const randomRotation = (Math.random() * 2 - 1) * 1; // Random rotation between -1 and 1 degrees
            card.style.transform = `translateY(-5px) rotate(${randomRotation}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-effect');
            card.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateY(0)';
            } else {
                testimonial.style.opacity = '0.5';
                testimonial.style.transform = 'translateY(10px)';
            }
        });
    }
    
    // Initialize testimonial display
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pricing toggle functionality
    // const createPricingToggle = () => {
    //     const toggleContainer = document.createElement('div');
    //     toggleContainer.className = 'pricing-toggle';
    //     toggleContainer.innerHTML = `
    //         <span class="pricing-period active" data-period="monthly">Monthly</span>
    //         <label class="switch">
    //             <input type="checkbox" id="pricing-switch">
    //             <span class="slider round"></span>
    //         </label>
    //         <span class="pricing-period" data-period="yearly">Yearly</span>
    //     `;
        
    //     const pricingSection = document.querySelector('.section-title:nth-of-type(5)');
    //     pricingSection.parentNode.insertBefore(toggleContainer, pricingSection.nextSibling);
        
    //     // Add toggle functionality
    //     const pricingSwitch = document.getElementById('pricing-switch');
    //     const monthlyPrices = ['$9.99', '$19.99', '$49.99'];
    //     const yearlyPrices = ['$99.99', '$199.99', '$499.99'];
    //     const priceElements = document.querySelectorAll('.pricing-card .price');
        
    //     pricingSwitch.addEventListener('change', () => {
    //         const isYearly = pricingSwitch.checked;
            
    //         // Update prices
    //         priceElements.forEach((el, i) => {
    //             el.textContent = isYearly ? yearlyPrices[i] : monthlyPrices[i];
    //         });

    //         // Update period text
    //         document.querySelectorAll('.price-period').forEach(el => {
    //             el.textContent = isYearly ? 'per year' : 'per month';
    //         });

    //         // Update active state for labels
    //         document.querySelectorAll('.pricing-period').forEach(el => {
    //             if (el.dataset.period === (isYearly ? 'yearly' : 'monthly')) {
    //                 el.classList.add('active');
    //             } else {
    //                 el.classList.remove('active');
    //             }
    //         });

    //         // Add a discount badge for yearly plans
    //         const badges = document.querySelectorAll('.pricing-badge');
    //         badges.forEach(badge => badge.remove());
            
    //         if (isYearly) {
    //             document.querySelectorAll('.pricing-card').forEach(card => {
    //                 const badge = document.createElement('div');
    //                 badge.className = 'pricing-badge';
    //                 badge.textContent = 'Save 20%';
    //                 card.appendChild(badge);
    //             });
    //         }
    //     });
    // };

    // createPricingToggle();

    // Add filter functionality for cards
    // const addFilterOptions = () => {
    //     const filterContainer = document.createElement('div');
    //     filterContainer.className = 'filter-options';
    //     filterContainer.innerHTML = `
    //         <h3>Filter Card Types:</h3>
    //         <div class="filter-buttons">
    //             <button class="filter-btn active" data-filter="all">All</button>
    //             <button class="filter-btn" data-filter="basic-card">Basic</button>
    //             <button class="filter-btn" data-filter="product-card">Product</button>
    //             <button class="filter-btn" data-filter="profile-card">Profile</button>
    //             <button class="filter-btn" data-filter="feature-card">Feature</button>
    //             <button class="filter-btn" data-filter="testimonial-card">Testimonial</button>
    //             <button class="filter-btn" data-filter="pricing-card">Pricing</button>
    //         </div>
    //     `;
        
    //     const header = document.querySelector('header');
    //     header.appendChild(filterContainer);
        
    //     // Add filter functionality
    //     const filterButtons = document.querySelectorAll('.filter-btn');
        
    //     filterButtons.forEach(button => {
    //         button.addEventListener('click', () => {
    //             // Update active state
    //             filterButtons.forEach(btn => btn.classList.remove('active'));
    //             button.classList.add('active');
                
    //             const filterValue = button.dataset.filter;
                
    //             // Filter cards
    //             document.querySelectorAll('.card-grid > div').forEach(card => {
    //                 if (filterValue === 'all' || card.classList.contains(filterValue)) {
    //                     card.style.display = 'block';
    //                 } else {
    //                     card.style.display = 'none';
    //                 }
    //             });
                
    //             // Update section visibility
    //             document.querySelectorAll('.section-title').forEach(title => {
    //                 const sectionName = title.textContent.toLowerCase().split(' ')[0];
    //                 const relatedCards = document.querySelectorAll(`.${sectionName.replace('cards', 'card')}`);
                    
    //                 let hasVisibleCards = false;
    //                 relatedCards.forEach(card => {
    //                     if (card.style.display !== 'none') {
    //                         hasVisibleCards = true;
    //                     }
    //                 });
                    
    //                 title.style.display = filterValue === 'all' || hasVisibleCards ? 'block' : 'none';
                    
    //                 // Hide empty card grids
    //                 const nextElement = title.nextElementSibling;
    //                 if (nextElement && nextElement.classList.contains('card-grid')) {
    //                     nextElement.style.display = title.style.display;
    //                 }
    //             });
    //         });
    //     });
    // };

    // addFilterOptions();

    // Add search functionality
    // const addSearchBox = () => {
    //     const searchContainer = document.createElement('div');
    //     searchContainer.className = 'search-container';
    //     searchContainer.innerHTML = `
    //         <input type="text" class="search-box" placeholder="Search cards...">
    //     `;
        
    //     const filterOptions = document.querySelector('.filter-options');
    //     filterOptions.appendChild(searchContainer);
        
    //     const searchBox = document.querySelector('.search-box');
        
    //     searchBox.addEventListener('input', () => {
    //         const searchTerm = searchBox.value.toLowerCase();
            
    //         document.querySelectorAll('.card-grid > div').forEach(card => {
    //             const cardText = card.textContent.toLowerCase();
                
    //             if (cardText.includes(searchTerm)) {
    //                 card.style.display = 'block';
    //             } else {
    //                 card.style.display = 'none';
    //             }
    //         });
            
    //         // Update section visibility based on search
    //         document.querySelectorAll('.section-title').forEach(title => {
    //             const nextElement = title.nextElementSibling;
    //             if (nextElement && nextElement.classList.contains('card-grid')) {
    //                 const visibleCards = nextElement.querySelectorAll('div[style="display: block;"]');
    //                 title.style.display = visibleCards.length > 0 ? 'block' : 'none';
    //                 nextElement.style.display = visibleCards.length > 0 ? 'grid' : 'none';
    //             }
    //         });
    //     });
    // };

    // addSearchBox();

    // Add dark mode toggle
    // const addDarkModeToggle = () => {
    //     const darkModeToggle = document.createElement('div');
    //     darkModeToggle.className = 'dark-mode-toggle';
    //     darkModeToggle.innerHTML = `
    //         <span>☀️</span>
    //         <label class="switch dark-switch">
    //             <input type="checkbox" id="dark-mode-switch">
    //             <span class="slider round"></span>
    //         </label>
    //         <span>🌙</span>
    //     `;
        
    //     const header = document.querySelector('header');
    //     header.appendChild(darkModeToggle);
        
    //     const darkModeSwitch = document.getElementById('dark-mode-switch');
        
    //     darkModeSwitch.addEventListener('change', () => {
    //         document.body.classList.toggle('dark-theme', darkModeSwitch.checked);
            
    //         // Save preference to localStorage
    //         localStorage.setItem('darkMode', darkModeSwitch.checked);
    //     });
        
    //     // Check for saved preference
    //     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    //     darkModeSwitch.checked = savedDarkMode;
    //     document.body.classList.toggle('dark-theme', savedDarkMode);
    // };

    // addDarkModeToggle();

    // Add responsive navigation for mobile
    // const addMobileNavigation = () => {
    //     const mobileNav = document.createElement('div');
    //     mobileNav.className = 'mobile-nav';
    //     mobileNav.innerHTML = `
    //         <button class="menu-toggle">☰</button>
    //         <div class="mobile-menu">
    //             <a href="#" class="mobile-link">Home</a>
    //             <a href="#" class="mobile-link">Basic Cards</a>
    //             <a href="#" class="mobile-link">Product Cards</a>
    //             <a href="#" class="mobile-link">Profile Cards</a>
    //             <a href="#" class="mobile-link">Feature Cards</a>
    //             <a href="#" class="mobile-link">Testimonial Cards</a>
    //             <a href="#" class="mobile-link">Pricing Cards</a>
    //         </div>
    //     `;
        
    //     const container = document.querySelector('.container');
    //     container.insertBefore(mobileNav, container.firstChild);
        
    //     const menuToggle = document.querySelector('.menu-toggle');
    //     const mobileMenu = document.querySelector('.mobile-menu');
        
    //     menuToggle.addEventListener('click', () => {
    //         mobileMenu.classList.toggle('show-menu');
    //     });
        
    //     // Scroll to sections
    //     document.querySelectorAll('.mobile-link').forEach((link, index) => {
    //         if (index === 0) return; // Skip Home link
            
    //         link.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             const sectionTitle = document.querySelectorAll('.section-title')[index - 1];
    //             sectionTitle.scrollIntoView({ behavior: 'smooth' });
    //             mobileMenu.classList.remove('show-menu');
    //         });
    //     });
    // };
    
    // Only add mobile navigation if screen is small
    // if (window.innerWidth < 768) {
    //     addMobileNavigation();
    // }
});

// Main JavaScript functionality for Card Design Showcase
document.addEventListener('DOMContentLoaded', () => {
    // Color switcher functionality
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            document.documentElement.style.setProperty('--primary-color', color);
        });
    });

    // Basic card hover effects
    const cards = document.querySelectorAll('.basic-card, .product-card, .profile-card, .feature-card, .testimonial-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });

    // Add filter functionality
    const addFilterOptions = () => {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-options';
        filterContainer.innerHTML = `
            <h3>Filter Card Types:</h3>
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="basic-card">Basic</button>
                <button class="filter-btn" data-filter="product-card">Product</button>
                <button class="filter-btn" data-filter="profile-card">Profile</button>
                <button class="filter-btn" data-filter="feature-card">Feature</button>
                <button class="filter-btn" data-filter="testimonial-card">Testimonial</button>
                <button class="filter-btn" data-filter="pricing-card">Pricing</button>
            </div>
            <div class="search-container">
                <input type="text" class="search-box" placeholder="Search cards...">
            </div>
        `;
        
        const header = document.querySelector('header');
        header.appendChild(filterContainer);
        
        // Add filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                
                // Filter cards
                const allCards = document.querySelectorAll('.card-grid > div');
                allCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update section visibility
                document.querySelectorAll('.section-title').forEach(title => {
                    const sectionType = title.textContent.toLowerCase().split(' ')[0];
                    const sectionCards = document.querySelectorAll('.' + sectionType.replace('cards', 'card'));
                    
                    let hasVisibleCards = false;
                    if (filterValue === 'all') {
                        hasVisibleCards = true;
                    } else {
                        sectionCards.forEach(card => {
                            if (card.classList.contains(filterValue)) {
                                hasVisibleCards = true;
                            }
                        });
                    }
                    
                    // Show/hide the section title and its card grid
                    title.style.display = hasVisibleCards ? '' : 'none';
                    const nextElement = title.nextElementSibling;
                    if (nextElement && nextElement.classList.contains('card-grid')) {
                        nextElement.style.display = hasVisibleCards ? '' : 'none';
                    }
                });
            });
        });
        
        // Add search functionality
        const searchBox = document.querySelector('.search-box');
        
        searchBox.addEventListener('input', () => {
            const searchTerm = searchBox.value.toLowerCase();
            let hasResults = false;
            
            // Reset filter buttons when searching
            if (searchTerm.length > 0) {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
            }
            
            // Search through all cards
            document.querySelectorAll('.card-grid > div').forEach(card => {
                const cardText = card.textContent.toLowerCase();
                
                if (searchTerm === '' || cardText.includes(searchTerm)) {
                    card.style.display = '';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update section visibility based on search results
            document.querySelectorAll('.section-title').forEach(title => {
                const nextGrid = title.nextElementSibling;
                if (nextGrid && nextGrid.classList.contains('card-grid')) {
                    const visibleCards = Array.from(nextGrid.children).some(card => card.style.display !== 'none');
                    title.style.display = visibleCards ? '' : 'none';
                    nextGrid.style.display = visibleCards ? '' : 'none';
                }
            });
            
            // Show a message if no results
            let noResultsMsg = document.querySelector('.no-results-message');
            if (!hasResults && searchTerm.length > 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.innerHTML = '<p>No cards match your search. Try a different term.</p>';
                    document.querySelector('.container').appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    };
    
    // Add dark mode toggle
    const addDarkModeToggle = () => {
        const darkModeToggle = document.createElement('div');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = `
            <span>☀️</span>
            <label class="switch">
                <input type="checkbox" id="dark-mode-switch">
                <span class="slider round"></span>
            </label>
            <span>🌙</span>
        `;
        
        const header = document.querySelector('header');
        header.appendChild(darkModeToggle);
        
        const darkModeSwitch = document.getElementById('dark-mode-switch');
        
        // Check for saved preference first
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        darkModeSwitch.checked = savedDarkMode;
        document.body.classList.toggle('dark-theme', savedDarkMode);
        
        // Add event listener
        darkModeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme', darkModeSwitch.checked);
            localStorage.setItem('darkMode', darkModeSwitch.checked);
        });
    };
    
    // Add pricing toggle
    const addPricingToggle = () => {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'pricing-toggle';
        toggleContainer.innerHTML = `
            <span class="pricing-period active" data-period="monthly">Monthly</span>
            <label class="switch">
                <input type="checkbox" id="pricing-switch">
                <span class="slider round"></span>
            </label>
            <span class="pricing-period" data-period="yearly">Yearly</span>
        `;
        
        const pricingTitle = document.querySelector('.section-title:nth-of-type(5)');
        if (pricingTitle && pricingTitle.textContent.includes('Pricing')) {
            pricingTitle.parentNode.insertBefore(toggleContainer, pricingTitle.nextSibling);
            
            // Add toggle functionality
            const pricingSwitch = document.getElementById('pricing-switch');
            const monthlyPrices = ['$9.99', '$19.99', '$49.99'];
            const yearlyPrices = ['$99.99', '$199.99', '$499.99'];
            const priceElements = document.querySelectorAll('.pricing-card .price');
            const periodLabels = document.querySelectorAll('.pricing-toggle .pricing-period');
            
            pricingSwitch.addEventListener('change', () => {
                const isYearly = pricingSwitch.checked;
                
                // Update prices
                priceElements.forEach((el, i) => {
                    el.textContent = isYearly ? yearlyPrices[i] : monthlyPrices[i];
                });
                
                // Update period text
                document.querySelectorAll('.price-period').forEach(el => {
                    el.textContent = isYearly ? 'per year' : 'per month';
                });
                
                // Update active state for labels
                periodLabels.forEach(el => {
                    el.classList.toggle('active', el.dataset.period === (isYearly ? 'yearly' : 'monthly'));
                });
                
                // Add/remove discount badges
                const pricingCards = document.querySelectorAll('.pricing-card');
                pricingCards.forEach(card => {
                    let badge = card.querySelector('.pricing-badge');
                    
                    if (isYearly) {
                        if (!badge) {
                            badge = document.createElement('div');
                            badge.className = 'pricing-badge';
                            badge.textContent = 'Save 20%';
                            card.appendChild(badge);
                        }
                    } else if (badge) {
                        badge.remove();
                    }
                });
            });
            
            // Add click events for the period labels
            periodLabels.forEach(label => {
                label.addEventListener('click', () => {
                    pricingSwitch.checked = label.dataset.period === 'yearly';
                    pricingSwitch.dispatchEvent(new Event('change'));
                });
            });
        }
    };
    
    // Call all our setup functions
    addFilterOptions();
    addDarkModeToggle();
    addPricingToggle();
    
    // Add mobile navigation for small screens
    if (window.innerWidth < 768) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <button class="menu-toggle">☰</button>
            <div class="mobile-menu">
                <a href="#" class="mobile-link">Home</a>
                <a href="#basic-cards" class="mobile-link">Basic Cards</a>
                <a href="#product-cards" class="mobile-link">Product Cards</a>
                <a href="#profile-cards" class="mobile-link">Profile Cards</a>
                <a href="#feature-cards" class="mobile-link">Feature Cards</a>
                <a href="#testimonial-cards" class="mobile-link">Testimonial Cards</a>
                <a href="#pricing-cards" class="mobile-link">Pricing Cards</a>
            </div>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(mobileNav, container.firstChild);
        
        // Add IDs to section titles for navigation
        document.querySelectorAll('.section-title').forEach(title => {
            const id = title.textContent.toLowerCase().replace(' ', '-');
            title.id = id;
        });
        
        // Toggle mobile menu
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show-menu');
        });
    }
});