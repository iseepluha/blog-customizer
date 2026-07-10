import { CSSProperties, useState } from 'react';

import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				initialValues={articleState}
			/>
			<Article />
		</main>
	);
};
