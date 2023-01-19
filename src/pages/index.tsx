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
          欢迎来到我的个人数字花园！我是谭淞宸。
        </p>
        <p>
          2015 年，在 Stanford 大学举办的数字学习研究网络会议上，Mike Caufield 发表了主题演讲<a href="https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/" target="_blank">「花园与溪流：一种技术的田园牧歌」</a>，系统地反思了 Web 2.0 时代以博客和社交媒体为主的个人内容生产，批判了以「溪流」（时间线）为基本逻辑的内容生产降低了内容的多样性、不利于对一定主题的系统理解及对人类总体知识的贡献。八年以来，越来越多的人开始采用「花园」范式在属于自己的互联网一角耕耘，其特点在于以根据内容的逻辑联系而非时间线发布内容，通过超链接和索引等方式使读者可以以自己的路径浏览网站内容，如同在花园中漫步；并且这些内容在初次发布之后还会不断修改、丰富、完善，如同在花园中散播许多种子，随着时间静静等待他们生根发芽，最后长成参天大树。
        </p>
        <p>
          而对我个人来说，我将在这里发布我平时使用 Obsidian 记录的笔记、想法、摘录等，是对以时间线组织起来的个人网站<a href="https://tansongchen.com" target="_blank">众妙斋</a>的有益的补充。这些笔记虽然不是精心打磨过的文章，但是能够更好地展现个人学识和志趣，展现自己对一个主题的认识过程，与志同道合的好友发生思想碰撞。下面是我目前的 Obsidian 仓库中依据大致领域分类的笔记导航链接。你也可以直接从侧边栏导航到各个项目。这些笔记只占到了目前的仓库中的较小一部分，更多笔记经过整理后也会陆续发上来。
        </p>
      </div>
      <hr/>
      <HomepageFeatures />
    </Layout>
  );
}
