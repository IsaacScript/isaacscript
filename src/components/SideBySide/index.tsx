import React from "react";
import styles from "./styles.module.scss";

export function SideBySide({ children }: { children: React.ReactNode }) {
    const count = React.Children.count(children);
    if (count !== 2) {
        throw new Error(`Invalid SideBySide children count: ${count}`);
    }

    const [left, right] = React.Children.toArray(children);
    return (
        <div className={styles.sideBySide}>
            {left}
            {right}
        </div>
    );
}
