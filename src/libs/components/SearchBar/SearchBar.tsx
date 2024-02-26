/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils';
import { SearchParamsNames } from '../../constants';

import { Icon } from '../Icon';

import './SearchBar.scss';

type Props = {
  className: string
};

export const SearchBar: React.FC<Props> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get(SearchParamsNames.query) || '',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  const placeholder = `Search in ${pathname.split('/')[1]}`;

  const handleSetParams = (
    paramValue: string,
  ) => {
    const newParams = getSearchWith(
      { [SearchParamsNames.query]: paramValue || null },
      searchParams,
    );

    setSearchParams(newParams);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSetParams(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    if (value) {
      setValue('');
      searchParams.delete(SearchParamsNames.query);
      setSearchParams(searchParams);
    }

    inputRef.current?.focus();
  };

  useEffect(() => {
    setValue(searchParams.get(SearchParamsNames.query) || '');
  }, [searchParams]);

  return (
    <form
      className={cn('search-bar', className)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        className="search-bar__input"
        placeholder={placeholder}
        onChange={handleChange}
        ref={inputRef}
      />

      <button
        type="button"
        className="search-bar__button"
        onClick={() => handleReset()}
      >
        <Icon
          iconName={!value ? 'search' : 'close'}
          classNames="search-bar__icon"
          data-cy={value && 'searchDelete'}
        />
      </button>
    </form>
  );
};