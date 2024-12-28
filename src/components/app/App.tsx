import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import clsx from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [pageCustomSetting, setpageCustomSetting] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyPageCustomSetting = (setting: ArticleStateType) => {
		setpageCustomSetting(setting);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageCustomSetting.fontFamilyOption.value,
					'--font-size': pageCustomSetting.fontSizeOption.value,
					'--font-color': pageCustomSetting.fontColor.value,
					'--container-width': pageCustomSetting.contentWidth.value,
					'--bg-color': pageCustomSetting.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialStyles={pageCustomSetting}
				newStyleSettings={handleApplyPageCustomSetting}
			/>
			<Article />
		</main>
	);
};
