// ─── Packrs Auth Guard ────────────────────
// Include this script in all dashboard pages.
// Redirects to login.html if not authenticated.
// Supports role-based routing (admin vs vendor).

(function() {
  if (sessionStorage.getItem('packrs_authenticated') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  var role = sessionStorage.getItem('packrs_role') || 'admin';
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Role-based access control
  var isVendorPage = currentPage.indexOf('vendor-') === 0;
  if (role === 'vendor' && !isVendorPage && currentPage !== 'login.html') {
    window.location.href = 'vendor-dashboard.html';
    return;
  }
  if (role === 'admin' && isVendorPage) {
    window.location.href = 'index.html';
    return;
  }

  // Populate user info in sidebar/header if elements exist
  var name = sessionStorage.getItem('packrs_name') || 'User';
  var initials = sessionStorage.getItem('packrs_initials') || 'U';
  // Update sidebar user info
  document.addEventListener('DOMContentLoaded', function() {
    var nameEls = document.querySelectorAll('.sidebar-user .user-info .name, .user-chip-name, .user-name');
    nameEls.forEach(function(el) { el.textContent = name; });

    var avatarEls = document.querySelectorAll('.sidebar-user .avatar, .user-chip-avatar');
    avatarEls.forEach(function(el) { el.textContent = initials; });

    // Also update .avatar elements that show initials in header
    document.querySelectorAll('header .avatar').forEach(function(el) {
      if (el.textContent.trim().length <= 3) el.textContent = initials;
    });

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
