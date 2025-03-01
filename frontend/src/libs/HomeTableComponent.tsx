import type { TableComponentProps } from "../types/TableComponent";

import { useEffect, useRef, useState } from "react";

import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from "@table-library/react-table-library/table";

import {
	HeaderCellSelect,
	CellSelect,
} from "@table-library/react-table-library/select";

const HomeTableComponent = ({
	columns,
	data,
	theme,
	select,
	emptyMessage,
}: TableComponentProps) => {
	const elementOneRef = useRef<HTMLDivElement | null>(null);
	const elementTwoRef = useRef<HTMLDivElement | null>(null);
	const [elementOneWidth, setElementOneWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			if (elementOneRef.current) {
				setElementOneWidth(elementOneRef.current.offsetWidth);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="bg-white p-1.5 rounded accent-blue-700 border border-line">
			<div className="overflow-x-auto">
				<Table
					data={data}
					theme={theme}
					select={select}
					layout={{ custom: true }}
					className="table"
				>
					{(tableList: any) => (
						<>
							<Header>
								<HeaderRow className="header-row">
									<HeaderCellSelect className="header-cell" />
									{columns.map((column: any, index: number) => (
										<HeaderCell key={index} className="header-cell">
											{column.label}
										</HeaderCell>
									))}
								</HeaderRow>
							</Header>
							<Body>
								{tableList.map((row: any, index: number) => (
									<Row item={row} key={index} className="row">
										<CellSelect item={row} />
										{columns.map((column: any, index: number) => (
											<Cell key={index} className="cell">
												{column.renderCell(row)}
											</Cell>
										))}
									</Row>
								))}
							</Body>
						</>
					)}
				</Table>
				{data.nodes.length === 0 ? (
					<>
						<div ref={elementOneRef} className="h-9"></div>
						<div
							ref={elementTwoRef}
							className="fixed flex justify-center items-center h-9 -mt-9"
							style={{ width: `${elementOneWidth}px` }}
						>
							<p>{emptyMessage}</p>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default HomeTableComponent;
