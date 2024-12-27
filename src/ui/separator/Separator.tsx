import styles from './index.module.scss';
import { CSSProperties } from 'react';

interface SeparatorProps {
	style?: CSSProperties;
}

export const Separator = ({ style }: SeparatorProps) => {
	return <div className={styles.separator} style={style}></div>;
};
