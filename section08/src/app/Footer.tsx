import {BookData} from "@/types";

export default async function Footer() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        {cache : "force-cache"},
        )

    if(!response.ok){
        return <footer>제작 @kimjunseo</footer>
    }

    const books: BookData[] = await response.json();
    const count = books.length;

    return (
        <footer>
            <div>제작 @kimjunseo</div>
            <div>{count}개의 도서가 등록되어 있습니다.</div>
        </footer>
    )
}