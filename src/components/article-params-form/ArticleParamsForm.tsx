import {
	useEffect,
	useRef,
	useState,
	useCallback,
	SyntheticEvent,
} from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useDisclosure } from 'src/hooks/useDisclosure';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
	OptionType,
	formTitle,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface pageSettingChangeProps {
	initialStyles: ArticleStateType;
	newStyleSettings: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	newStyleSettings,
	initialStyles,
}: pageSettingChangeProps) => {
	const { isOpen, toggle, close } = useDisclosure(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const [settingValue, setValue] = useState<ArticleStateType>(initialStyles);

	useEffect(() => {
		const handleOutsideClickClose = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !asideRef.current?.contains(target)) {
				isOpen && close();
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleOutsideClickClose);
		}

		return () => {
			window.removeEventListener('mousedown', handleOutsideClickClose);
		};
	}, [close, isOpen]);

	const handleChange = useCallback(
		(field: keyof ArticleStateType) => (value: OptionType) =>
			setValue((prevValue) => ({ ...prevValue, [field]: value })),
		[]
	);

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		newStyleSettings(settingValue);
	};

	const handleClearStyle = () => {
		setValue(defaultArticleState);
		newStyleSettings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<fieldset className={styles.formContent}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={settingValue.fontFamilyOption}
							options={fontFamilyOptions}
							title={formTitle.fontFamilyOptionTitle}
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='radioFont'
							options={fontSizeOptions}
							selected={settingValue.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title={formTitle.fontSizeOptionTitle}
						/>
						<Select
							selected={settingValue.fontColor}
							options={fontColors}
							title={formTitle.fontColorTitle}
							onChange={handleChange('fontColor')}
						/>
						<Separator style={{ backgroundColor: '#D7D7D7' }} />
						<Select
							selected={settingValue.backgroundColor}
							options={backgroundColors}
							title={formTitle.backgroundColorTitle}
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							selected={settingValue.contentWidth}
							options={contentWidthArr}
							title={formTitle.contentWidthTitle}
							onChange={handleChange('contentWidth')}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClearStyle}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
