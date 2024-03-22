import { useMemo, useState } from 'react';

import { SearchIcon, StarIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { z } from 'zod';

import { LinkWithRouter } from '@shared/components';
import { useGlobalContext } from '@shared/hooks';
import { formatPrice, getCryptoImageUrl } from '@shared/utils';

import { cryptoCurrencySchema } from '../../schemas';

type CryptoCurrency = z.infer<typeof cryptoCurrencySchema>;

type Props = {
  data: CryptoCurrency[];
};

const isNumericItems = ['priceUsd', 'changePercent24Hr', 'marketCapUsd'];

const filterDataBySearchValue = (data: CryptoCurrency[], searchValue: string) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  return data.filter(
    ({ name, symbol }) =>
      name.toLowerCase().includes(lowerCaseSearchValue) || symbol.toLowerCase().includes(lowerCaseSearchValue),
  );
};

const CryptoTable = ({ data }: Props) => {
  const { cryptoWatchList, onCryptoWatchListItemToggle } = useGlobalContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState('');

  const columnHelper = createColumnHelper<CryptoCurrency>();

  const filteredData = useMemo(() => filterDataBySearchValue(data, searchValue), [data, searchValue]);

  const columns = [
    columnHelper.accessor('rank', {
      header: () => '#',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: (info) => (
        <HStack as={LinkWithRouter} href={info.row.original.id}>
          <Image borderRadius="full" boxSize="24px" src={getCryptoImageUrl(info.getValue())} alt={info.getValue()} />
          <span>{info.getValue()}</span>
        </HStack>
      ),
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => <LinkWithRouter href={info.row.original.id}>{info.getValue()}</LinkWithRouter>,
    }),
    columnHelper.accessor('priceUsd', {
      header: 'Price (USD)',
      cell: (info) => formatPrice(Number(info.getValue())),
    }),
    columnHelper.accessor('changePercent24Hr', {
      header: 'Change (24Hr)',
      cell: (info) => {
        const numberChangePercent24Hr = Number(info.getValue());

        return (
          <chakra.span
            color={numberChangePercent24Hr < 0 ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-green-500)'}
          >
            {numberChangePercent24Hr.toFixed(2)}%
          </chakra.span>
        );
      },
    }),
    columnHelper.accessor('marketCapUsd', {
      header: 'Market Cap (USD)',
      cell: (info) => formatPrice(Number(info.getValue())),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.600" />
        </InputLeftElement>
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Bitcoin or BTC..."
        />
      </InputGroup>
      <Spacer height={4} />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Top 100 Cryptocurrencies</TableCaption>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isNumericCell = isNumericItems.includes(header.id);

                  const columnSorted = header.column.getIsSorted();

                  return (
                    <Th key={header.id} onClick={header.column.getToggleSortingHandler()} isNumeric={isNumericCell}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {columnSorted ? (
                        <chakra.span pl="2">
                          {columnSorted === 'desc' ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )}
                        </chakra.span>
                      ) : null}
                    </Th>
                  );
                })}
                <Th isNumeric />
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const isNumericCell = isNumericItems.includes(cell.column.id);

                  return (
                    <Td key={cell.id} isNumeric={isNumericCell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  );
                })}
                <Td isNumeric>
                  <IconButton
                    size="sm"
                    onClick={() =>
                      onCryptoWatchListItemToggle({
                        id: row.original.id,
                        name: row.original.name,
                        symbol: row.original.symbol,
                        rank: Number(row.original.rank),
                      })
                    }
                    isRound
                    aria-label="Add to watch list"
                    icon={
                      <StarIcon
                        color={
                          cryptoWatchList.find((item) => item.symbol === row.original.symbol)
                            ? 'var(--chakra-colors-yellow-400)'
                            : undefined
                        }
                      />
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CryptoTable;
