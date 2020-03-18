import React, { Fragment } from 'react';

const Search = ({url}) => {
    return (
        <Fragment>
            당신이 검색한 키워드는 "{url.query.keyword}" 입니다.
        </Fragment>
    );
};

export default Search;