"use client"

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error({error, reset}: {error: Error; reset: () => void;}) {

    const router = useRouter()

    useEffect(() => {
        console.error(error.message);
    }, [error])

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            <button onClick={() => {
                startTransition(() => {
                    router.refresh(); //현재 페이지에 필요한 서버 컴포넌트 next 서버에서 재요청
                    reset(); //에러 상태 초기화, 서버 컴포넌트를 다시 불러
                })
            }}>다시 시도</button>
        </div>
    )
}