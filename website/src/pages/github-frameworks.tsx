import type {ReactNode} from 'react';
import {Redirect} from '@docusaurus/router';

/**
 * Old / guessed short URL. Canonical page lives under docs.
 * https://llazyemail.github.io/awesome-email-marketing/github-frameworks
 */
export default function GithubFrameworksRedirect(): ReactNode {
  return <Redirect to="/docs/development/github-frameworks" />;
}
