/**
 * Extends the docusaurus-plugin-copy-page-button so the "Copy page / Open in AI" 
 * functionality appears on every Docusaurus page (docs, blog, custom pages, homepage).
 * 
 * The official plugin only injects on docs pages (article / .theme-doc-markdown).
 * This client module fills the gap for everything else.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

if (ExecutionEnvironment.canUseDOM) {
  let root = null;
  let lastPath = location.pathname;

  const getPluginOptions = () => {
    return (typeof window !== 'undefined' && window.__COPY_PAGE_BUTTON_OPTIONS__) || {};
  };

  const findContentContainer = () => {
    // Prefer specific content areas, fall back to main
    return (
      document.querySelector('article') ||
      document.querySelector('.markdown') ||
      document.querySelector('.theme-doc-markdown') ||
      document.querySelector('[class*="docItemContainer"]') ||
      document.querySelector('main') ||
      document.querySelector('.container')
    );
  };

  const injectButton = () => {
    // Skip if the official plugin already injected one
    if (document.getElementById('copy-page-button-container')) {
      return;
    }

    const container = findContentContainer();
    if (!container) {
      return;
    }

    // Avoid injecting on pure listing / empty pages if desired, but user asked for all
    const buttonWrapper = document.createElement('div');
    buttonWrapper.id = 'copy-page-button-container';
    buttonWrapper.style.display = 'flex';
    buttonWrapper.style.justifyContent = 'flex-end';
    buttonWrapper.style.margin = '0 0 16px 0';
    buttonWrapper.style.padding = '8px 0';

    // Place at the top of the content
    container.insertBefore(buttonWrapper, container.firstChild);

    if (root) {
      try {
        root.unmount();
      } catch (e) {
        // ignore
      }
    }

    root = createRoot(buttonWrapper);
    const opts = getPluginOptions();
    root.render(
      React.createElement(CopyPageButton, {
        customStyles: opts.customStyles,
        enabledActions: opts.enabledActions,
        generateMarkdownRoutes: opts.generateMarkdownRoutes,
        markdownUrl: opts.markdownUrl,
        mcpServer: opts.mcpServer,
        labels: opts.labels,
      })
    );
  };

  const scheduleInject = () => {
    // Give Docusaurus a moment to render the page
    setTimeout(injectButton, 300);
    setTimeout(injectButton, 1000);
  };

  // Initial load
  if (document.readyState === 'complete') {
    scheduleInject();
  } else {
    window.addEventListener('load', scheduleInject);
  }

  // Client-side navigation
  const observer = new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      // Clean previous if any
      const existing = document.getElementById('copy-page-button-container');
      if (existing && root) {
        try {
          root.unmount();
        } catch (e) {}
        existing.remove();
        root = null;
      }
      scheduleInject();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Also listen to popstate
  window.addEventListener('popstate', scheduleInject);
}
