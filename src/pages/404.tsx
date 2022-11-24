import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout
      description="该笔记尚未创建。">
      <main>
        <div className="container" style={{padding: "2rem"}}>
          <p>
            该笔记尚未创建。
          </p>
        </div>
        <hr/>
      </main>
    </Layout>
  );
}
