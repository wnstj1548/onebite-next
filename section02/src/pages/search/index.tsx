import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout.";
import BookItem from '@/components/book-item'
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";

//SSR (컴포넌트보다 먼저 실행되서 컴포넌트에 필요한 데이터를 불러오는 용도)
// export const getServerSideProps: GetServerSideProps = async (
//     context: GetServerSidePropsContext
// ) => {
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);
//
//     return {
//         props: {
//             books,
//         },
//     }
// }

export default function Page() {

    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    useEffect(() => {
        if(q) {
            fetchSearchResult();
        }
    }, [q])

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    };

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book}/>
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return (
      <SearchableLayout>
          {page}
      </SearchableLayout>
    );
}