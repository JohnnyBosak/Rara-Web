window.onload = function () {
    // Existing hamburger menu code:
    const menuBtn = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-nav");
    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle("is-active");
        mobileMenu.classList.toggle("is-active");
    });

    // Get the login element.
    const loginLink = document.getElementById('login');

    // Fetch the logged-in user (if any) and update the login link.
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          // Remove the href so the login link doesn't automatically redirect.
          loginLink.removeAttribute("href");

          // Construct the avatar URL.
          const avatarUrl = data.user.avatar
            ? `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/0.png`;
          
          // Replace the login link content with the avatar image.
          loginLink.innerHTML = `<img src="${avatarUrl}" alt="Avatar" width="30" height="30" style="border-radius:50%; cursor: pointer;">`;
          
          // Create the dropdown menu element.
          const userMenu = document.createElement('div');
          userMenu.id = 'userMenu';
          userMenu.className = 'user-menu';
          // Initially hide the menu.
          userMenu.style.display = 'none';
          // Populate the menu with list items.
          userMenu.innerHTML = `
            <ul>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/settings">Settings</a></li>
              <li><a href="/logout" id="logoutLink">Logout</a></li>
            </ul>
          `;
          // Append the dropdown menu right after the login element.
          loginLink.parentNode.appendChild(userMenu);

          // Toggle the dropdown menu when the avatar is clicked.
          loginLink.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent the click from bubbling up.
            e.preventDefault();  // Prevent any default action.
            userMenu.style.display = (userMenu.style.display === 'none') ? 'block' : 'none';
          });

          // Ensure that clicking the Logout link works properly.
          const logoutLink = document.getElementById('logoutLink');
          logoutLink.addEventListener('click', function (e) {
            // Stop the dropdown menu's document-level click handler from interfering.
            e.stopPropagation();
            // Let the browser follow the href to /logout.
          });

          // Hide the dropdown when clicking anywhere else on the document.
          document.addEventListener('click', function () {
            userMenu.style.display = 'none';
          });
        } else {
          // User is not logged in: attach click listener to redirect to login.
          loginLink.addEventListener('click', function () {
            window.location.href = '/login';
          });
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
}
