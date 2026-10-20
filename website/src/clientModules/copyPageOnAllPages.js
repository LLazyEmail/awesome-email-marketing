/**
 * Extends the docusaurus-plugin-copy-page-button so the "Copy page / Open in AI"
 * functionality appears on every Docusaurus page.
 *
 * Placement preference:
 * 1. Inside / next to the breadcrumbs section (docs pages)
 * 2. A clean top header row that mimics the breadcrumbs area (other pages)
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

  const findBreadcrumbs = () =>
    document.querySelector('.theme-doc-breadcrumbs') ||
    document.querySelector('nav[aria-label="Breadcrumbs"]') ||
    document.querySelector('.breadcrumbs__link')?.closest('nav');

  const findContentContainer = () =>
    document.querySelector('article') ||
    document.querySelector('.markdown') ||
    document.querySelector('.theme-doc-markdown') ||
    document.querySelector('[class*="docItemContainer"]') ||
    document.querySelector('main') ||
    document.querySelector('.container');

  const createButtonWrapper = () => {
    const wrapper = document.createElement('div');
    wrapper.id = 'copy-page-button-container';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'flex-end';
    wrapper.style.flexShrink = '0';
    wrapper.style.marginLeft = 'auto';
    return wrapper;
  };

  const injectButton = () => {
    // Remove any previous injection from this module
    const existing = document.getElementById('copy-page-button-container');
    if (existing) {
      if (root) {
        try { root.unmount(); } catch (e) {}
        root = null;
      }
      existing.remove();
    }

    const breadcrumbs = findBreadcrumbs();
    const content = findContentContainer();

    let targetParent = null;
    let insertBefore = null;

    if (breadcrumbs) {
      // Place the button in the same section as breadcrumbs
      // Make the breadcrumbs container a flex row so the button sits on the right
      const nav = breadcrumbs.closest('nav') || breadcrumbs;
      if (nav && nav.parentElement) {
        nav.parentElement.style.display = 'flex';
        nav.parentElement.style.alignItems = 'center';
        nav.parentElement.style.justifyContent = 'space-between';
        nav.parentElement.style.flexWrap = 'wrap';
        nav.parentElement.style.gap = '12px';
        targetParent = nav.parentElement;
        insertBefore = nav.nextSibling;
      }
    }

    if (!targetParent && content) {
      // Fallback: create a breadcrumbs-like header row at the top of content
      const headerRow = document.createElement('div');
      headerRow.className = 'copy-page-header-row';
      headerRow.style.display = 'flex';
      headerRow.style.alignItems = 'center';
      headerRow.style.justifyContent = 'flex-end';
      headerRow.style.marginBottom = '16px';
      headerRow.style.minHeight = '32px';

      content.insertBefore(headerRow, content.firstChild);
      targetParent = headerRow;
    }

    if (!targetParent) return;

    const buttonWrapper = createButtonWrapper();
    if (insertBefore) {
      targetParent.insertBefore(buttonWrapper, insertBefore);
    } else {
      targetParent.appendChild(buttonWrapper);
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
    setTimeout(injectButton, 200);
    setTimeout(injectButton, 800);
  };

  if (document.readyState === 'complete') {
    scheduleInject();
  } else {
    window.addEventListener('load', scheduleInject);
  }

  const observer = new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      scheduleInject();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('popstate', scheduleInject);
}
