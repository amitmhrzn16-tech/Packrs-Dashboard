// ─── Packrs Auth Guard ────────────────────
// Include this script in all dashboard pages.
// Redirects to login.html if not authenticated.
// Handles role-based access control.

(function() {
  if (sessionStorage.getItem('packrs_authenticated') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  var role = sessionStorage.getItem('packrs_role') || 'admin';
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Rider pages start with "rider-"
  var isRiderPage = currentPage.indexOf('rider-') === 0;

  // If rider tries to access admin pages, redirect to rider dashboard
  if (role === 'rider' && !isRiderPage) {
    window.location.href = 'rider-dashboard.html';
    return;
  }

  // If admin tries to access rider pages, redirect to admin dashboard
  if (role === 'admin' && isRiderPage) {
    window.location.href = 'index.html';
    return;
  }

  // Populate user info in sidebar/header if elements exist
  var name = sessionStorage.getItem('packrs_name') || 'User';
  var initials = sessionStorage.getItem('packrs_initials') || 'U';

  document.addEventListener('DOMContentLoaded', function() {
    // Update name elements
    var nameEls = document.querySelectorAll('.sidebar-user .user-info .name, .user-chip-name, .user-name');
    nameEls.forEach(function(el) { el.textContent = name; });

    // Update avatar/initials elements
    var avatarEls = document.querySelectorAll('.sidebar-user .avatar, .user-chip-avatar');
    avatarEls.forEach(function(el) { el.textContent = initials; });

    // Update role display
    var roleEls = document.querySelectorAll('.user-role, .sidebar-user .user-info .role');
    roleEls.forEach(function(el) { el.textContent = role.toUpperCase(); });

    // Wire up logout links
    document.querySelectorAll('[data-logout], .logout-link').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'login.html';
      });
    });
  });
})();
