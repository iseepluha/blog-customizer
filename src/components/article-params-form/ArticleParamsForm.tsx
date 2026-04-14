import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { useCloseOnOutsideClickOrEsc } from './hooks/useCloseOnOutsideClickOrEsc';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	initialValues: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	initialValues,
}: ArticleParamsFormProps) => {
	const [formIsOpen, setFormState] = useState(false);

	const [fontFamilySelected, setFontFamily] = useState(
		initialValues.fontFamilyOption
	);
	const [fontSizeSelected, setFontSize] = useState(
		initialValues.fontSizeOption
	);
	const [fontColorSelected, setFontColor] = useState(initialValues.fontColor);
	const [backgroundColorSelected, setBackgroundColor] = useState(
		initialValues.backgroundColor
	);
	const [contentWidthSelected, setContentWidth] = useState(
		initialValues.contentWidth
	);

	const asideRef = useRef(null);
	useCloseOnOutsideClickOrEsc({
		isOpenElement: formIsOpen,
		elementRef: asideRef,
		onClose: () => {
			setFormState(false);
		},
	});

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamilyOption: fontFamilySelected,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected,
			fontSizeOption: fontSizeSelected,
		});
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onReset();
	};

	return (
		<>
			<ArrowButton
				isOpen={formIsOpen}
				onClick={() => {
					setFormState((prevState) => !prevState);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<h1 className={styles.formTitle}>Задайте параметры</h1>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilySelected}
						onChange={setFontFamily}
						title={'Шрифт'}
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={fontSizeSelected}
						onChange={setFontSize}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={fontColorSelected}
						onChange={setFontColor}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColorSelected}
						onChange={setBackgroundColor}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidthSelected}
						onChange={setContentWidth}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
