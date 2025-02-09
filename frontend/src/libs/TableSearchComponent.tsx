import { Dispatch, SetStateAction } from "react";
import { Search } from "@mui/icons-material";

type TableSearchComponentProps = {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
};

const TableSearchComponent = ({
	search,
	setSearch,
}: TableSearchComponentProps) => {
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	return (
		<label
			htmlFor="search"
			className="w-1/2 p-1.5 rounded-full flex flex-row bg-white border border-line"
		>
			<div className="flex justify-center items-center w-[38px]">
				<Search />
			</div>
			<input
				id="search"
				type="text"
				value={search}
				onChange={handleSearch}
				className="h-full w-[calc(100%-38px)] focus:outline-none px-3"
			/>
		</label>
	);
};

export default TableSearchComponent;
