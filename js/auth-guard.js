/**
 * WORM AI - Authentication Guard (Lite Version)
 * Professional & Elegant - No Login Required
 * 
 * This version bypasses authentication for direct access
 * while maintaining session tracking for analytics
 */

(function () {
  'use strict';

  // Session tracking for analytics (non-blocking)
  const SessionTracker = {
    sessionId: null,
    startTime: Date.now(),

    init() {
      this.sessionId = this.generateSessionId();
      this.storeSession();
    },

    generateSessionId() {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 10);
      return `worm_${timestamp}_${random}`;
    },

    storeSession() {
      try {
        sessionStorage.setItem('worm_session_id', this.sessionId);
        sessionStorage.setItem('worm_session_start', this.startTime.toString());
      } catch (e) {
        // Silent fail for privacy mode
      }
    },

    getSessionInfo() {
      return {
        id: this.sessionId,
        startTime: this.startTime,
        duration: Date.now() - this.startTime
      };
    }
  };

  // Initialize session on load
  SessionTracker.init();

  // Expose to global for other modules
  window.WormSession = SessionTracker;

  // Always authenticated - direct access
  window.auth = {
    isAuthenticated: async () => true,
    getUser: async () => ({ role: 'operator', name: 'Guest' }),
    logout: async () => {
      sessionStorage.clear();
      window.location.reload();
    }
  };

  // Reveal app immediately
  document.body.style.display = 'block';
  document.body.style.opacity = '1';
  document.body.style.pointerEvents = 'auto';

  console.log('%c[WORM AI] Session initialized', 'color: #00ff88; font-family: monospace;');

})();
