# Bulletin.AI Landing Page

A responsive landing page for Bulletin.AI, a university-focused event discovery platform.

## Features

- Clean, modern design
- Responsive layout for all device sizes
- Interactive waitlist form with Netlify form integration
- Animated elements for better user engagement

## Netlify Deployment

This site is ready to deploy on Netlify. Follow these steps:

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Choose your repository
5. No build command is needed (leave blank)
6. Set publish directory to `.` (root directory)
7. Click "Deploy site"

### Custom Domain Setup

1. Go to your site settings in Netlify
2. Navigate to "Domain settings"
3. Click "Add custom domain"
4. Enter your domain name (e.g., bulletin.ai)
5. Follow the instructions to configure your DNS settings

### Accessing Form Submissions

1. In your Netlify dashboard, click "Forms"
2. Find "bulletin-waitlist" in the list
3. Click to view all submissions
4. You can export submissions as CSV

## Technologies Used

- HTML5
- CSS3 (with variables, flexbox, and grid)
- JavaScript (ES6+)
- SVG graphics
- Netlify Forms for submission handling

## Running the Project

Simply open the `index.html` file in a web browser to view the landing page.

For local development with auto-refresh, you can use a tool like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code.

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - Styling for the landing page
- `script.js` - JavaScript functionality
- `netlify.toml` - Netlify configuration
- SVG files:
  - `logo.svg` - Header logo
  - `logo-footer.svg` - Footer logo
  - `hero-image.svg` - Illustration for the hero section
  - `waitlist-image.svg` - Illustration for the waitlist section 