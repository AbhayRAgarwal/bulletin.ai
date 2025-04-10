document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navItems = document.querySelector('nav ul');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    document.querySelector('header .container').appendChild(mobileToggle);

    mobileToggle.addEventListener('click', function() {
        if (navItems.classList.contains('show')) {
            // Close menu
            navItems.classList.remove('show');
            mobileToggle.innerHTML = '☰';
            // Enable scrolling again
            document.body.style.overflow = '';
        } else {
            // Open menu
            navItems.classList.add('show');
            mobileToggle.innerHTML = '✕';
            // Disable scrolling when menu is open
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (navItems.classList.contains('show')) {
                navItems.classList.remove('show');
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navItems.classList.contains('show') && 
            !e.target.closest('nav') && 
            !e.target.closest('.mobile-toggle')) {
            navItems.classList.remove('show');
            mobileToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        }
    });

    // Form submission
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        // Create a success message div but keep it hidden initially
        const successContainer = document.createElement('div');
        successContainer.className = 'success-message';
        successContainer.style.display = 'none';
        waitlistForm.parentNode.appendChild(successContainer);
        
        waitlistForm.addEventListener('submit', function(e) {
            // Validate form before letting Netlify process it
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            const campus = document.getElementById('campus').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !role) {
                e.preventDefault();
                alert('Please fill out all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
            
            // If we reach here, form is valid
            // For Netlify forms, we let the form submit naturally, but we can also
            // capture the data and show our own success message

            // This will still backup the submission in localStorage
            const formData = {
                firstName,
                lastName,
                email,
                role,
                campus: campus || 'Not specified',
                timestamp: new Date().toISOString()
            };
            storeSubmission(formData);
            
            // Check if this is a direct submission, not a Netlify spa redirect
            if (window.location.search.indexOf('form-name') === -1) {
                // This will only be used if JavaScript intercepts the form submission
                // Netlify will still process the form normally on the server-side
                // This success message will appear if JavaScript is loaded before the Netlify redirect
                setTimeout(function() {
                    waitlistForm.style.display = 'none';
                    successContainer.innerHTML = `
                        <h3>Thank you for joining our waitlist, ${firstName}!</h3>
                        <p>We'll notify you when Bulletin.AI launches at ${campus || 'your campus'}.</p>
                    `;
                    successContainer.style.display = 'block';
                }, 1000);
            }
        });
        
        // Check for Netlify success query parameter
        // This handles when a user is redirected back after form submission
        if (window.location.search.includes('success=true')) {
            waitlistForm.style.display = 'none';
            successContainer.innerHTML = `
                <h3>Thank you for joining our waitlist!</h3>
                <p>We'll notify you when Bulletin.AI launches at your campus.</p>
            `;
            successContainer.style.display = 'block';
            
            // Remove the success parameter from URL
            const url = new URL(window.location);
            url.searchParams.delete('success');
            window.history.replaceState({}, '', url);
        }
    }

    // Store submission in localStorage as backup
    function storeSubmission(data) {
        // Get existing submissions or initialize empty array
        const existingSubmissions = JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
        
        // Add new submission
        existingSubmissions.push(data);
        
        // Save back to localStorage
        localStorage.setItem('waitlistSubmissions', JSON.stringify(existingSubmissions));
        
        console.log('Submission stored in localStorage:', data);
        console.log('Total submissions:', existingSubmissions.length);
    }
    
    // Admin function to export all submissions
    // You can call this from the browser console: exportWaitlistData()
    window.exportWaitlistData = function() {
        const submissions = JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
        
        if (submissions.length === 0) {
            console.log('No submissions found in localStorage.');
            return;
        }
        
        // Create CSV content
        let csvContent = 'First Name,Last Name,Email,Role,Campus,Timestamp\n';
        
        submissions.forEach(sub => {
            csvContent += `${sub.firstName},${sub.lastName},${sub.email},${sub.role},${sub.campus},"${sub.timestamp}"\n`;
        });
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'waitlist-submissions-local.csv');
        a.click();
        
        alert('NOTE: This only exports submissions stored in the local browser. For all form submissions, please check your Netlify Forms dashboard.');
    };

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .hero-cta-btn, .footer-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('nav ul');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        document.querySelector('.hamburger').classList.remove('active');
                    }
                }
            }
        });
    });

    // Admin link handler
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple password protection
            const password = prompt('Enter admin password:');
            if (password === 'bulletin2023') {
                exportWaitlistData();
            } else {
                alert('Incorrect password');
            }
        });
    }
}); 