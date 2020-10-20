import Layout from "@theme/Layout";
import React from "react";

const Playground = React.lazy(() => import("./Playground"));
export default function Play() {
    const isSSR = typeof window === "undefined";
    return (
        <Layout title="Playground">
            {!isSSR && (
                <React.Suspense fallback={<div />}>
                    <Playground />
                </React.Suspense>
            )}
        </Layout>
    );
}
