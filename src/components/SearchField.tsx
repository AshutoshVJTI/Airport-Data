import React, { useState } from 'react'
import { AutoComplete } from 'antd';
import Debounced from '../utils/Debounced'
import { SearchFieldProps, option } from '../types/@types';

const { Option } = AutoComplete;

const SearchField = (props: SearchFieldProps) => {
    const { label, data, setValue, placeholder } = props;
    const [options, setOptions] = useState<option[]>([]);
    const [searchString, setSearchString] = useState<string>("")

    function onSearch(searchText: string) {
        if (searchText === "") {
            setOptions([])
            return
        }
        // function isPresent(searchData: string) {
        //     return searchData.includes(searchText)
        // }
        const result = data.filter((item) => {
            const dataTosearch = JSON.parse(JSON.stringify(item))
            // return dataTosearch.search.some(isPresent)
            return dataTosearch.search.map((data: string) => data.includes(searchText)).includes(true)
        })
        console.log(result)
        const option = result.map((item) => {
            return { value: `${item.code}-${item.name}`, label: `${item.code}-${item.name}` }
        })
        setOptions(option)
    };

    const onSelect = (data: string) => {
        setValue(data);
    };

    const onChange = (data: string) => {
        setSearchString(data);
    };

    const debouncedSearch = Debounced(onSearch, 400)

    return (
        <div className='fiels'>
            <p>{label}</p>
            <AutoComplete
                value={searchString}
                options={options}
                className="w-80"
                onSelect={onSelect}
                onSearch={debouncedSearch}
                onChange={onChange}
                placeholder={placeholder}
                allowClear={true}
                onClear={() => setValue(null)}
            >
                {options?.map(({ label, value }, index) => (
                    <Option key={index} value={value}>
                        {label}
                    </Option>
                ))}
            </AutoComplete>
        </div>
    )
}

export default SearchField