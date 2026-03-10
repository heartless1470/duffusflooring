# Duffus Flooring - Premium Flooring Solutions Website

A high-performance, visually stunning website designed for **Duffus Flooring**. This project features a "Modern Luxury" aesthetic, utilizing glassmorphism, parallax effects, and smooth scroll animations to create a premium user experience.
## Reviews backend (local)

I added a minimal reviews API under `server/` to accept reviews and optional image uploads.

- Start the server:

```bash
cd server
npm install
npm start
```

The API will run at `http://localhost:4000` by default with endpoints:

- `GET /api/reviews` — list saved reviews
- `POST /api/reviews` — multipart/form-data with fields `name`, `text`, `rating` and optional `image` file

Uploaded images are stored under `server/uploads` and reviews are persisted in `server/reviews.json`.

In development the React app expects the API at `http://localhost:4000`. You can change the base URL by setting `VITE_API_BASE` in your env.
# Duffus Flooring - Premium Flooring Solutions Website

A high-performance, visually stunning website designed for **Duffus Flooring**. This project features a "Modern Luxury" aesthetic, utilizing glassmorphism, parallax effects, and smooth scroll animations to create a premium user experience.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Key Features

*   **Modern Luxury Design**: A sophisticated Deep Navy (`#0A192F`) and Gold (`#D4AF37`) color palette.
*   **Glassmorphism UI**: Frosted glass effects on navigation, cards, and overlays for a contemporary look.
*   **Parallax Hero Section**: Immersive full-screen introductory section with depth and motion.
*   **Scroll Animations**: Integrated **AOS (Animate On Scroll)** library for smooth element entrance animations.
*   **Responsive Layout**: Fully responsive design that adapts seamlessly to mobile, tablet, and desktop screens.
*   **Interactive Components**:
    *   Sticky Header with scroll-triggered style changes.
    *   Service cards with hover lift and glow effects.
    *   Portfolio gallery with zoom and overlay interactions.
    *   Smooth scrolling navigation.

## 📂 Project Structure

```
dad-website/
├── css/
│   └── style.css           # Main stylesheet with variables and responsive styles
├── js/
│   └── script.js           # Logic for scroll effects, mobile menu, and animations
├── index.html              # Homepage with Hero, Featured Services, and About preview
├── about.html              # Company history, mission, and team details
├── services.html           # Detailed breakdown of flooring services
├── portfolio.html          # Gallery of past projects with hover effects
├── contact.html            # Contact form and business information
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

*   **HTML5**: Semantic markup for better SEO and accessibility.
*   **CSS3**:
    *   CSS Variables for easy theming.
    *   Flexbox & Grid for layout.
    *   `backdrop-filter` for glassmorphism.
*   **JavaScript (Vanilla)**:
    *   DOM manipulation for the mobile menu and sticky header.
*   **Libraries**:
    *   [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - For scroll animations.
    *   [Font Awesome](https://fontawesome.com/) - For vector icons.
    *   [Google Fonts](https://fonts.google.com/) - Using 'Inter' (Body) and 'Playfair Display' (Headings).

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/heartless1470/dad-website.git
    ```
2.  **Open the project:**
    Navigate to the project directory and open `index.html` in your web browser.
3.  **Local Development:**
    You can use a simple generic server like Live Server (VS Code Extension) to run the project locally.

## 🎨 Customization Guide

### colors
The color scheme is defined in `css/style.css` under the `:root` pseudo-class. Change these variables to update the theme globally:
```css
:root {
    --primary-color: #0A192F; /* Deep Navy */
    --accent-color: #D4AF37;  /* Gold */
    --text-light: #f4f4f4;    /* Off-white text */
    /* ... */
}
```

### Images
Currently, the website uses placeholder images from `placehold.co`. To customize:
1.  Place your project images in an `images/` directory.
2.  Update the `src` attributes in the HTML files:
    ```html
    <!-- Before -->
    <img src="https://placehold.co/600x400..." alt="...">

    <!-- After -->
    <img src="images/your-project-image.jpg" alt="Description">
    ```

### Text Content
Edit the HTML files directly to update the company story, services offered, and contact details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/dad-website/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ for Duffus Flooring.*
