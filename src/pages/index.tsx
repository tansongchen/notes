import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type FeatureItem = {
  title: string;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '职业/工作',
    url: '/专业素养'
  },
  {
    title: '成长/学习',
    url: '/科学学习'
  },
  {
    title: '创造/兴趣',
    url: '/影像'
  },
];

function Feature({title, url}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--lg">
        <Link to={url}>
          <div className={styles.feature}>
            {title}
          </div>
        </Link>
      </div>
    </div>
  );
}

function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description="这里存放了我用 Obsidian 记录的笔记。">
      <HomepageHeader />
      <div className="container" style={{padding: "2rem"}}>
        <p>
          为什么用 Obsidian 记笔记？原子化的笔记让我们每次专注在一个概念上，用自己的话理清概念的内涵和外延，然后在概念之间建立丰富的联系，从而搭建起个人知识体系。
        </p>
        <p>
          为什么要做这样一个网站（又称个人维基百科、个人数字花园）？展现个人学识和志趣，便于和他人分享自己所学的知识，与志同道合的好友发生思想碰撞。相比于<a href="https://tansongchen.com" target="_blank">个人网站</a>上的内容来说，这种小型的输出难度更低，是有益的补充。
        </p>
        <p>
          下面是我目前的 Obsidian 知识库中依据大致领域分类的笔记导航链接。你也可以直接从侧边栏导航到各个项目。这些笔记只占到了目前的知识库中的较小一部分，更多笔记经过整理后也会陆续发上来。
        </p>
      </div>
      <hr/>
      <HomepageFeatures />
    </Layout>
  );
}
