"use client";


import DetailSuggest from "@/app/(with-header-footer)/detailSuggest/DetailSuggest";

export default async function DetailSuggestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <DetailSuggest id={id} />;
}