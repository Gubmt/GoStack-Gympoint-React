import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

export default function Page({ page, lastPage, nextPage, prevPage }) {
  return (
    <Container>
      <div>
        <button
          className="prev"
          disabled={page === 1}
          type="submit"
          onClick={prevPage}
        >
          <MdKeyboardArrowLeft size="32px" />
        </button>
        <span className="pageNumber">{page}</span>
        <button
          className="next"
          disabled={lastPage}
          type="submit"
          onClick={nextPage}
        >
          <MdKeyboardArrowRight size="32px" />
        </button>
      </div>
    </Container>
  );
}
