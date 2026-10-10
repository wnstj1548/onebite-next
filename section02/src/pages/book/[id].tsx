import style from '@/pages/book/[id].module.css';
import {
    GetServerSidePropsContext,
    GetStaticPropsContext,
    InferGetServerSidePropsType,
    InferGetStaticPropsType
} from "next";
import fetchOneBooks from "@/lib/fetch-one-book";
import {useReducerWithReduxDevtools} from "next/dist/client/components/use-reducer-with-devtools";
import {useRouter} from "next/router";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//
//     const id = context.params!.id;
//     const book = await fetchOneBooks(Number(id));
//
//     return {
//         props: {
//             book,
//         },
//     }
// }

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params!.id;
    const book = await fetchOneBooks(Number(id));

    if(!book) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            book,
        },
    }
}

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id : "1"}},
            {params: {id : "2"}},
            {params: {id : "3"}},
        ],
        fallback: true,
    }
}

export default function Page({
    book
}: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter();

    if(router.isFallback) {
        return "로딩 중 입니다.";
    }

    if(!book) {
        return "문제가 발생했습니다. 다시 시도하세요."
    }

    const {
        id,
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl
    } = book;

    return <div className={style.container}>
        <div className={style.cover_img_container} style={{backgroundImage:`url('${coverImgUrl}')`}}>
            <img src={coverImgUrl}/>
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>{author} | {publisher}</div>
        <div className={style.description}>{description}</div>
    </div>;
}