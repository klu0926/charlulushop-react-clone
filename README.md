# Charlulu Shop Frontend

Charlulu Shop Frontend is the front-end service for the Charlulu Shop. It provides a user interface for buyers to interact with the e-commerce features of the Charlulu Shop website.

> **⚠️ Important Note:** Please be aware that this project does not handle payment transactions. It is designed solely for order management and email notifications to both buyers and sellers.


## Table of Contents 📖

1. [Screenshots](#1-screenshots-)
2. [Features](#2-features-%EF%B8%8F)
3. [Technologies](#3-technologies-)
4. [Getting Started](#4-getting-started-)
5. [Contact Me](#5-contact-me-)

## 1. Screenshots 📷

![cover](/public/images/readme-cover.png)

![pictures](/public/images/readme-pages.png)



## 2. Features ⭐️

- **User Authentication:** Secure login and registration.
- **Product Browsing:** Browse available products with images, descriptions, prices, and stock information.
- **Shopping Cart:** Add, remove, and manage items in the shopping cart.
- **Order Placement:** Place orders for selected items with quantity selection and payment options.
- **Order Tracking:** View and track order status and history.
- **React Hash Router:** Utilize React Hash Router to simulate URL changes for enhanced user experience.
- **YouTube Integration:** Display the newest YouTube video from the seller's channel. The backend server fetches data from the YouTube API to provide the latest video.
- **Responsive Design:** Optimized for various screen sizes, including mobile and desktop devices.


## 3. Technologies 🤓

- **React:** Frontend library for building user interfaces.
- **React Router:** Routing library for navigating between pages.
- **SweetAlert2:** Library for customizable alerts and modals.
- **Vite:** Next-generation frontend tooling for development and build processes.

## 4. Getting Started 🚀

### Prerequisites

- Node.js installed on your machine.
- Clone and set up the [backend server](https://github.com/klu0926/charlulushop-backend) <-

### Installation

1. Clone the react repository:

```
git clone https://github.com/klu0926/charlulushop-react.git

```

2. Navigate to the project directory:

```
cd charlulushop-react

```

3. Install npm modules:

```
npm install
```

### Setting Up the API Server

Before running the application, you need to configure the API server URL in the `/src/data/url.js` file. Follow these steps:

1. Open the `/src/data/url.js` file in your code editor.
2. Depending on your environment, set the `server` variable to point to the API server URL. If you're deploying to GitHub Pages, use the Heroku URL. Otherwise, use the local server URL.

```javascript
const isGitHubPages = window.location.hostname === 'your github url'
const heroku = 'your sever url'
const localServer = 'your local testing port'
const base = '/charlulushop-react'

const url = {
  server: isGitHubPages ? heroku : localServer,
  client: base,
}
export default url
```

### Running the Application

```
npm run dev
```

### Deploy the Application

1. push the project to your repo
2. set up vite.config.js
3. git commit and run npm script

```
npm run deploy
```

## 5. Contact Me 👋
If you have any questions, feedback, or suggestions, feel free to reach out:

- **Email:** [lukuoyu@gmail.com](mailto:your.email@example.com)
- **GitHub:** [klu0926](https://github.com/klu0926)