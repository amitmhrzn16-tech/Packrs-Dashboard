// ─── Packrs Auth Guard ────────────────────
// Include this script in all dashboard pages.
// Redirects to login.html if not authenticated.

(function() {
  if (sessionStorage.getItem('packrs_authenticated') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // Populate user info in sidebar/header if elements exist
  var name = sessionStorage.getItem('packrs_name') || 'User';
  var initials = sessionStorage.getItem('packrs_initials') || 'U';
  var role = sessionStorage.getItem('packrs_role') || 'admin';
  var roleLabels = {
    admin: 'Admin',
    subadmin: 'Sub Admin',
    vendor: 'Vendor',
    rider: 'Rider',
    finance: 'Finance',
    finance_head: 'Finance Head'
  };

  // Update sidebar user info
  document.addEventListener('DOMContentLoaded', function() {
    var nameEls = document.querySelectorAll('.sidebar-user .user-info .name, .user-chip-name');
    nameEls.forEach(function(el) { el.textContent = name; });

    var roleEls = document.querySelectorAll('.sidebar-user .user-info .role, .user-chip-role');
    roleEls.forEach(function(el) { el.textContent = roleLabels[role] || role; });

    var avatarEls = document.querySelectorAll('.sidebar-user .avatar, .user-chip-avatar');
    avatarEls.forEach(function(el) { el.textContent = initials; });

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
