import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageGustomSetting, setPageGustomSetting] =
		useState<ArticleStateType>(defaultArticleState);

	const applyPageCustomSetting = (setting: ArticleStateType) => {
		setPageGustomSetting(setting);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageGustomSetting.fontFamilyOption.value,
					'--font-size': pageGustomSetting.fontSizeOption.value,
					'--font-color': pageGustomSetting.fontColor.value,
					'--container-width': pageGustomSetting.contentWidth.value,
					'--bg-color': pageGustomSetting.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialStyles={pageGustomSetting}
				newStyleSettings={applyPageCustomSetting}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
