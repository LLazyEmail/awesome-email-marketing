import type {ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import RelatedResources from '@site/src/components/RelatedResources';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();

  return (
    <>
      <RelatedResources docId={metadata.id} />
      <Footer {...props} />
    </>
  );
}
