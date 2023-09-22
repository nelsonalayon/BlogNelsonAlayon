import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <div className={ utilStyles.maxHeight }>
        <Image
          priority
          src={postData.image}
          height={10}
          width={1000}
          alt={postData.title}
          layout="responsive"
        />  

        </div>
        
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <a href={postData.webPage} target="blank">Go to the page</a>
        </article>
      </Layout>
    );
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
