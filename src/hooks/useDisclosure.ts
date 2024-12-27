import { useState } from 'react';

type Callbacks = {
	onOpen?: () => void;
	onClose?: () => void;
};

type UseDisclosureReturnType = {
	isOpen: boolean;
	toggle: () => void;
	open: () => void;
	close: () => void;
};

export const useDisclosure = (
	initialState = false,
	callbacks: Callbacks = {}
): UseDisclosureReturnType => {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = () => {
		setIsOpen(true);
		callbacks?.onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		callbacks?.onClose?.();
	};

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	return { isOpen, toggle, open, close };
};
