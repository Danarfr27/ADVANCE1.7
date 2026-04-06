/**
 * WORM AI - Authentication Module (Lite Version)
 * Professional & Elegant - Direct Access Mode
 */

(function (global) {
  'use strict';

  // Device identification for session tracking
  const DeviceManager = {
    id: null,

    getId() {
      if (this.id) return this.id;
      
      try {
        this.id = localStorage.getItem('worm_device_id');
        if (!this.id) {
          this.id = `worm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
          localStorage.setItem('worm_device_id', this.id);
        }
      } catch (e) {
        this.id = `worm-temp-${Date.now()}`;
      }
      
      return this.id;
    },

    clear() {
      try {
        localStorage.removeItem('worm_device_id');
        localStorage.removeItem('worm_last_user');
      } catch (e) {}
      this.id = null;
    }
  };

  // Auth API - Always returns success for direct access
  const AuthAPI = {
    async login() {
      return { ok: true, role: 'operator' };
    },

    async logout() {
      DeviceManager.clear();
      sessionStorage.clear();
      try {
        await fetch('/api/logout', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId: DeviceManager.getId() })
        });
      } catch (e) {}
      window.location.reload();
    },

    async isAuthenticated() {
      return true;
    },

    async getUser() {
      return { 
        authenticated: true, 
        role: 'operator',
        deviceId: DeviceManager.getId()
      };
    },

    getDeviceId() {
      return DeviceManager.getId();
    }
  };

  // Expose to global
  global.auth = AuthAPI;

  // Auto-attach logout handler
  document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => AuthAPI.logout());
    }
  });

})(window);
