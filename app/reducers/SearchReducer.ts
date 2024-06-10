export const initialState: SearchState = {
	search: "",
	page: 1,
	totalPages: 1,
};

export type SearchState = {
	search: string;
	page: number;
	totalPages: number;
};

export enum SearchActionTypes {
	SEARCH = "SEARCH",
	PAGE = "PAGE",
	TOTAL_PAGES = "TOTAL_PAGES",
	INCREMENT = "INCREMENT",
	DECREMENT = "DECREMENT",
}

export type SearchAction = {
	type: SearchActionTypes;
	payload?: string | number;
};

// Note: Making a reducer for this is overkill, but it is fun to try it out
export const searchReducer = (
	state: SearchState,
	action: SearchAction
): SearchState => {
	switch (action.type) {
		case SearchActionTypes.SEARCH:
			return { ...state, search: action.payload as string, page: 1 };
		case SearchActionTypes.PAGE:
			return { ...state, page: action.payload as number };
		case SearchActionTypes.TOTAL_PAGES:
			return { ...state, totalPages: action.payload as number };
		case SearchActionTypes.INCREMENT:
			return { ...state, page: state.page + 1 };
		case SearchActionTypes.DECREMENT:
			return { ...state, page: state.page - 1 };
		default:
			return state;
	}
};
